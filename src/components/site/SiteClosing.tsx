export function SiteClosing() {
  return (
    <>
      <section className="casora-closing-cta" aria-labelledby="casora-closing-title">
        <div className="casora-closing-cta__inner">
          <p className="casora-closing-cta__eyebrow">Ready to grow?</p>
          <h2 id="casora-closing-title">
            Let&rsquo;s make the
            <br />
            next move count.
          </h2>
          <a href="/contact-us/">Talk to Casora</a>
        </div>
      </section>

      <footer id="site-footer" className="casora-site-footer">
        <div className="casora-site-footer__inner">
          <div className="casora-site-footer__grid">
            <div className="casora-site-footer__brand">
              <a href="/" aria-label="Casora Digital home">
                <img src="/assets/casora-header-logo.png" alt="Casora Digital" />
              </a>
              <p>Purposeful brands, useful products and digital systems built to move ideas forward.</p>
            </div>

            <nav aria-label="Explore">
              <h3>Explore</h3>
              <a href="/work/">Work</a>
              <a href="/services/">Services</a>
              <a href="/about-us/">About</a>
            </nav>

            <nav aria-label="Connect">
              <h3>Connect</h3>
              <a href="/contact-us/">Start a project</a>
              <a href="/pricing/">Pricing</a>
              <a href="/news/">Ideas</a>
            </nav>

            <nav aria-label="Services">
              <h3>Services</h3>
              <a href="/services/web-design/">Web design</a>
              <a href="/services/graphic-design/">Brand design</a>
              <a href="/services/software-development/">Software</a>
            </nav>
          </div>

          <div className="casora-site-footer__base">
            <span>© 2026 Casora Digital</span>
            <span>Intelligence. Innovation. Impact.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
