import Image from "next/image";

export function HomeTestimonial() {
  return (
    <section
      className="casora-testimonial-slot"
      aria-labelledby="casora-testimonial-quote"
    >
      <div className="casora-testimonial">
        <Image
          className="casora-testimonial__media"
          src="/assets/generated/testimonial-services-studio-v1.png"
          alt=""
          fill
          sizes="100vw"
          unoptimized
        />
        <div className="casora-testimonial__shade" aria-hidden="true" />
        <div className="casora-testimonial__inner">
          <div className="casora-testimonial__quote-block">
            <svg
              className="casora-testimonial__mark"
              viewBox="0 0 52 40"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M4 4h18v15H12c0 6 3.5 10.5 9 13l-4.5 5C8 33 4 26.5 4 17V4Zm27 0h18v15H39c0 6 3.5 10.5 9 13l-4.5 5C35 33 31 26.5 31 17V4Z" />
            </svg>
            <blockquote id="casora-testimonial-quote">
              Clear communication, thoughtful design and dependable delivery
              made a complex digital project feel focused from beginning to end.
            </blockquote>
          </div>

          <div className="casora-testimonial__identity">
            <span className="casora-testimonial__avatar" aria-hidden="true">
              <svg viewBox="0 0 32 32" fill="none">
                <circle
                  cx="16"
                  cy="11"
                  r="6"
                  fill="currentColor"
                  opacity=".8"
                />
                <path
                  d="M5 29c.7-7.5 4.4-11 11-11s10.3 3.5 11 11H5Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <span>
              <strong>Casora project partner</strong>
              <small>Digital product collaboration</small>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
