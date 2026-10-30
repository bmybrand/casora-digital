window.phunkSiteToken="2zUh5UkLa0JrDAy-Yoq0QA";
/*!
 * Phunk cookieless analytics snippet.
 *
 * Loaded via `<script async src="/embed/track.js?s=<siteToken>"></script>`.
 * The serving route prepends `window.phunkSiteToken = '<token>';` so the token is
 * always available even when the script tag is rewritten by a tag manager.
 *
 * Wire format (must match `/api/analytics/ingest`):
 *
 *   {
 *     siteToken:   string,
 *     sessionId:   string (uuid v4),
 *     meta?:       { referrer, userAgent, screenWidth, locale, utm:{...} },
 *     events:      Array<{
 *       type:      'page_view' | 'click' | 'scroll' | 'heartbeat' | 'custom',
 *       ts:        number,                  // Date.now()
 *       path?:     string,                  // window.location.pathname
 *       duration?: number,                  // active-time ms (page_view on unload)
 *       target?:   string,                  // tagName#id.class.list (<=60 chars)
 *       depth?:    number,                  // 0.25 | 0.5 | 0.75 | 1.0
 *       name?:     string,                  // custom event name
 *       payload?:  object                   // custom event payload
 *     }>
 *   }
 *
 * Design notes:
 *  - Cookieless: session id lives in `sessionStorage` and dies with the tab.
 *  - Explicit opt-out honoured up front: the snippet bails before binding any
 *    listeners if `localStorage.phunk_optout` is set. Nothing is sent, ever.
 *  - `navigator.doNotTrack` is NOT honoured. DNT was never ratified, Safari
 *    removed it, and browser defaults are inconsistent (Brave on, Firefox
 *    opt-in). Our posture is cookieless + first-party + no PII, which is the
 *    same position taken by Plausible / Fathom / Umami. See
 *    docs/features/client-analytics-snippet.md for the privacy rationale.
 *  - SPA-aware: `history.pushState`, `replaceState`, and `popstate` all
 *    re-fire a `page_view` and reset the scroll-depth + active-time state.
 *  - Active-time: counted only while `document.visibilityState === 'visible'`.
 *    Sent as `duration` on the trailing `page_view` we emit on `pagehide`.
 *  - Unload flush: `pagehide` uses `navigator.sendBeacon` (works during the
 *    bfcache hand-off on iOS Safari). Falls back to `fetch(..., {keepalive:true})`.
 *  - Click instrumentation is opt-in via `[data-phunk]` to keep noise low.
 *    `data-phunk="event-name"` upgrades the click to a `custom` event.
 *  - ES2017 only. No external dependencies. No build step required.
 */
(function () {
  'use strict';

  // --- Opt-out gate -------------------------------------------------------

  var w = window;
  var d = document;
  var nav = navigator;

  // Explicit per-user opt-out only. `navigator.doNotTrack` is intentionally
  // not consulted — see the design notes block above.
  try {
    if (w.localStorage && w.localStorage.getItem('phunk_optout') === '1') return;
  } catch (_) { /* localStorage may throw in sandboxed iframes */ }

  // --- Configuration ------------------------------------------------------

  function currentScript() {
    if (d.currentScript) return d.currentScript;
    var scripts = d.getElementsByTagName('script');
    return scripts[scripts.length - 1] || null;
  }

  var scriptEl = currentScript();
  var siteToken =
    (scriptEl && scriptEl.getAttribute('data-site-token')) ||
    w.phunkSiteToken ||
    null;

  if (!siteToken) return;

  function deriveEndpoint() {
    if (!scriptEl) return '/api/analytics/ingest';
    var src = scriptEl.getAttribute('src') || '';
    // Strip `/embed/track.js?s=...` (or legacy `/embed/<token>.js`) to get
    // the origin where the ingest endpoint lives.
    var m = src.match(/^(.*?)\/embed\/track\.js(?:\?.*)?$/);
    if (!m) m = src.match(/^(.*?)\/embed\/[^/]+\.js(?:\?.*)?$/);
    if (m) return m[1] + '/api/analytics/ingest';
    try {
      var u = new URL(src, w.location.href);
      return u.origin + '/api/analytics/ingest';
    } catch (_) {
      return '/api/analytics/ingest';
    }
  }
  var endpoint = deriveEndpoint();

  // --- Session id (uuid v4) -----------------------------------------------

  function uuidv4() {
    var b = new Uint8Array(16);
    (w.crypto || w.msCrypto).getRandomValues(b);
    b[6] = (b[6] & 0x0f) | 0x40;
    b[8] = (b[8] & 0x3f) | 0x80;
    var h = [];
    for (var i = 0; i < 256; i++) h[i] = (i + 0x100).toString(16).slice(1);
    return (
      h[b[0]] + h[b[1]] + h[b[2]] + h[b[3]] + '-' +
      h[b[4]] + h[b[5]] + '-' +
      h[b[6]] + h[b[7]] + '-' +
      h[b[8]] + h[b[9]] + '-' +
      h[b[10]] + h[b[11]] + h[b[12]] + h[b[13]] + h[b[14]] + h[b[15]]
    );
  }

  var sessionId;
  var firstSendThisSession = false;
  try {
    sessionId = w.sessionStorage.getItem('phunk_sid');
    if (!sessionId) {
      sessionId = uuidv4();
      w.sessionStorage.setItem('phunk_sid', sessionId);
    }
    if (!w.sessionStorage.getItem('phunk_seen')) {
      firstSendThisSession = true;
      w.sessionStorage.setItem('phunk_seen', '1');
    }
  } catch (_) {
    // sessionStorage blocked: degrade to per-pageload session.
    sessionId = uuidv4();
    firstSendThisSession = true;
  }

  // --- Session meta (sent once) -------------------------------------------

  function parseUtm() {
    try {
      var p = new URL(w.location.href).searchParams;
      var keys = ['source', 'medium', 'campaign', 'term', 'content'];
      var out = {};
      var hit = false;
      for (var i = 0; i < keys.length; i++) {
        var v = p.get('utm_' + keys[i]);
        if (v) { out[keys[i]] = v.slice(0, 200); hit = true; }
      }
      return hit ? out : undefined;
    } catch (_) { return undefined; }
  }

  function buildMeta() {
    return {
      referrer: d.referrer ? d.referrer.slice(0, 500) : undefined,
      userAgent: (nav.userAgent || '').slice(0, 500),
      screenWidth: w.screen && w.screen.width ? w.screen.width : undefined,
      locale: nav.language || undefined,
      utm: parseUtm(),
    };
  }

  // --- Active-time + scroll-depth state -----------------------------------

  var currentPath = w.location.pathname;
  var pageEnteredAt = Date.now();
  var activeMs = 0;
  var lastVisibleTick = d.visibilityState === 'visible' ? Date.now() : 0;
  var sentDepths = {}; // depth-fraction -> true, reset per page_view

  function flushVisibleTick() {
    if (lastVisibleTick) {
      activeMs += Date.now() - lastVisibleTick;
      lastVisibleTick = d.visibilityState === 'visible' ? Date.now() : 0;
    }
  }

  function resetForNewPage(path) {
    flushVisibleTick();
    currentPath = path;
    pageEnteredAt = Date.now();
    activeMs = 0;
    lastVisibleTick = d.visibilityState === 'visible' ? Date.now() : 0;
    sentDepths = {};
  }

  // --- Buffer + transport -------------------------------------------------

  var buffer = [];
  var MAX_BUFFER = 50;

  function enqueue(ev) {
    buffer.push(ev);
    if (buffer.length >= MAX_BUFFER) flush(false);
  }

  function flush(isUnload) {
    if (!buffer.length) return;
    var events = buffer;
    buffer = [];
    var body = {
      siteToken: siteToken,
      sessionId: sessionId,
      events: events,
    };
    if (firstSendThisSession) {
      body.meta = buildMeta();
      firstSendThisSession = false;
    }
    var json = JSON.stringify(body);
    if (isUnload && nav.sendBeacon) {
      try {
        var blob = new Blob([json], { type: 'application/json' });
        if (nav.sendBeacon(endpoint, blob)) return;
      } catch (_) { /* fall through */ }
    }
    try {
      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: json,
        keepalive: true,
        credentials: 'omit',
        mode: 'cors',
      }).catch(function () { /* swallow — analytics must never throw */ });
    } catch (_) { /* fetch unavailable */ }
  }

  function emit(ev) {
    enqueue(ev);
    if (ev.type !== 'heartbeat') flush(false);
  }

  // --- Event builders -----------------------------------------------------

  function pageView(extra) {
    var ev = { type: 'page_view', ts: Date.now(), path: currentPath };
    if (extra && typeof extra.duration === 'number') ev.duration = extra.duration;
    return ev;
  }

  function buildSelector(el) {
    if (!el || el.nodeType !== 1) return '';
    var s = (el.tagName || '').toLowerCase();
    if (el.id) s += '#' + String(el.id).replace(/[^a-zA-Z0-9_-]/g, '');
    if (el.className && typeof el.className === 'string') {
      var parts = el.className.split(/\s+/);
      var max = parts.length < 4 ? parts.length : 4;
      for (var i = 0; i < max; i++) {
        var c = parts[i].replace(/[^a-zA-Z0-9_-]/g, '');
        if (c) s += '.' + c;
      }
    }
    return s.length > 60 ? s.slice(0, 60) : s;
  }

  function findPhunkAncestor(el) {
    var node = el;
    for (var i = 0; node && i < 8; i++) {
      if (node.nodeType === 1 && node.hasAttribute && node.hasAttribute('data-phunk')) return node;
      node = node.parentNode;
    }
    return null;
  }

  // --- Listeners ----------------------------------------------------------

  // Initial page_view.
  emit(pageView());

  // SPA route detection.
  function onRouteChange() {
    var newPath = w.location.pathname;
    if (newPath === currentPath) return;
    // Flush the outgoing page first with its accumulated active time.
    flushVisibleTick();
    emit({ type: 'page_view', ts: Date.now(), path: currentPath, duration: activeMs });
    resetForNewPage(newPath);
    emit(pageView());
  }

  ['pushState', 'replaceState'].forEach(function (method) {
    var orig = history[method];
    if (typeof orig === 'function') {
      history[method] = function () {
        var r = orig.apply(this, arguments);
        setTimeout(onRouteChange, 0);
        return r;
      };
    }
  });
  w.addEventListener('popstate', function () { setTimeout(onRouteChange, 0); });

  // Click on `[data-phunk]` elements only.
  d.addEventListener('click', function (e) {
    var hit = findPhunkAncestor(e.target);
    if (!hit) return;
    var label = hit.getAttribute('data-phunk');
    var selector = buildSelector(hit);
    if (label && label.length > 0) {
      emit({
        type: 'custom',
        ts: Date.now(),
        path: currentPath,
        name: label.slice(0, 80),
        target: selector,
      });
    } else {
      emit({ type: 'click', ts: Date.now(), path: currentPath, target: selector });
    }
  }, true);

  // Scroll-depth (throttled with rAF; bounded to 4 emits per page).
  var scrollScheduled = false;
  function checkScrollDepth() {
    scrollScheduled = false;
    var doc = d.documentElement;
    var body = d.body || { scrollTop: 0, scrollHeight: 0 };
    var scrollTop = (w.pageYOffset || doc.scrollTop || body.scrollTop || 0);
    var viewport = w.innerHeight || doc.clientHeight || 0;
    var height = Math.max(
      doc.scrollHeight || 0,
      body.scrollHeight || 0,
      doc.offsetHeight || 0
    );
    if (height <= viewport) return;
    var frac = (scrollTop + viewport) / height;
    var marks = [0.25, 0.5, 0.75, 1.0];
    for (var i = 0; i < marks.length; i++) {
      var m = marks[i];
      if (frac >= m && !sentDepths[m]) {
        sentDepths[m] = true;
        emit({ type: 'scroll', ts: Date.now(), path: currentPath, depth: m });
      }
    }
  }
  w.addEventListener('scroll', function () {
    if (scrollScheduled) return;
    scrollScheduled = true;
    if (w.requestAnimationFrame) w.requestAnimationFrame(checkScrollDepth);
    else setTimeout(checkScrollDepth, 100);
  }, { passive: true });

  // Visibility tracking for active-time.
  d.addEventListener('visibilitychange', function () {
    if (d.visibilityState === 'visible') {
      lastVisibleTick = Date.now();
    } else {
      flushVisibleTick();
    }
  });

  // Heartbeat every 30s while visible.
  setInterval(function () {
    if (d.visibilityState !== 'visible') return;
    enqueue({ type: 'heartbeat', ts: Date.now(), path: currentPath });
    flush(false);
  }, 30000);

  // Unload flush — `pagehide` fires for bfcache on iOS Safari where `unload`
  // doesn't. We emit a trailing page_view carrying total active time so the
  // server can record session/page duration without further reconciliation.
  function onPageHide() {
    flushVisibleTick();
    enqueue({ type: 'page_view', ts: Date.now(), path: currentPath, duration: activeMs });
    flush(true);
  }
  w.addEventListener('pagehide', onPageHide);
  // `beforeunload` is a belt-and-braces fallback for desktop browsers that
  // discard the page without firing `pagehide`.
  w.addEventListener('beforeunload', onPageHide);

  // --- Public API ---------------------------------------------------------

  w.phunk = function (name, payload) {
    if (typeof name !== 'string' || !name) return;
    var ev = {
      type: 'custom',
      ts: Date.now(),
      path: currentPath,
      name: name.slice(0, 80),
    };
    if (payload && typeof payload === 'object') ev.payload = payload;
    emit(ev);
  };
})();
