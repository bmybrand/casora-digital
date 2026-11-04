export function SiteClosing() {
  return (
    <>
      <section className="casora-closing-cta" aria-labelledby="casora-closing-title">
        <div className="container-large">
          <div
            data-w-id="5e90a721-54cf-6f17-1c78-7353063fc75b"
            className="home_cta_card"
          >
            <h2 id="casora-closing-title" className="heading_standard">
              Let&rsquo;s get to <span className="span_gradient">work.</span>
            </h2>
            <p>
              We&rsquo;re ready to get started on your next creative project. All you need to do
              is hit the button below.
            </p>
            <a href="/contact-us/" className="button is-secondary w-button">
              Talk to us
            </a>
            <img
              src="/assets/casora-mark-white-blue-circle.png"
              loading="lazy"
              alt=""
              className="graphic_brand-logo is-footer"
            />
          </div>
        </div>
      </section>

      <footer id="site-footer" className="casora-site-footer">
        <div className="casora-site-footer__inner">
          <div className="casora-site-footer__grid">
            <div className="casora-site-footer__brand">
              <a href="/" aria-label="Casora Digital home">
                <img src="/assets/casora-footer-logo.png" alt="Casora Digital — Intelligence. Innovation. Impact." />
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
              <a href="/news/">Ideas</a>
            </nav>

            <nav aria-label="Services">
              <h3>Services</h3>
              <a href="/services/custom-software-development/">Custom software</a>
              <a href="/services/cloud-solutions/">Cloud solutions</a>
              <a href="/services/ai-machine-learning/">AI &amp; machine learning</a>
              <a href="/services/digital-transformation/">Digital transformation</a>
              <a href="/services/it-consulting/">IT consulting</a>
              <a href="/services/managed-services/">Managed services</a>
            </nav>
          </div>

          <div className="casora-site-footer__base">
            <span>&copy; 2026 Casora Digital</span>
            <div className="casora-site-footer__legal">
              <a href="https://www.casoradigital.com/privacy-policy">Privacy Policy</a>
              <a href="https://www.casoradigital.com/terms-and-conditions">
                Terms &amp; Conditions
              </a>
            </div>
            <span>Intelligence. Innovation. Impact.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
