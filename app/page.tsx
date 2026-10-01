import GoogleReviews from "./GoogleReviews";
import HeroSlides from "./HeroSlides";
import ProjectGallery from "./ProjectGallery";
import AboutSlideshow from "./AboutSlideshow";
import EstimateForm from "./EstimateForm";
import ServiceGallery from "./ServiceGallery";


export default function HomePage() {
  return (
    <>
      <header className="header">
        <div className="container nav">
          <a className="brand" href="#top">
            <img className="brandLogo" src="/images/shams-logo.webp" alt="Shams Home Improvement logo" />
            <span><strong>Shams Home Improvement</strong><small>Atlanta Remodeling & Renovation</small></span>
          </a>
          <nav className="links">
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a href="#work">Our Work</a>
            <a href="#reviews">Reviews</a>
            <a href="#estimate">Free Estimate</a>
            <a href="#contact">Contact</a>
          </nav>
          <a className="button small" href="tel:+14046356502">Call 404-635-6502</a>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <HeroSlides />
          <img className="heroWatermark" src="/images/shams-watermark.webp" alt="" aria-hidden="true" />
          <div className="container heroInner">
            <p className="eyebrow">Metro Atlanta Home Improvement</p>
            <h1><span className="heroAccent">Quality work.</span><br/><span className="heroTagline">Built to last.</span></h1>
            <p className="lead">From bathroom renovations and tile work to decks, covered porches, repairs, painting, plumbing and electrical improvements, we help homeowners transform their spaces with dependable workmanship.</p>
            <div className="actions">
              <a className="button" href="#estimate">Request a Free Estimate</a>
              <a className="button outline" href="#services">View Services</a>
            </div>
            <div className="trust"><span>✓ Remodeling</span><span>✓ Repairs</span><span>✓ Metro Atlanta</span></div>
          </div>
        </section>

        <section className="section intro">
          <div className="container split">
            <div><p className="eyebrow">Shams Home Improvement</p><h2>One reliable team for your home projects.</h2></div>
            <div><p>Since 2016, we have helped homeowners with remodeling, repairs and handyman projects. We focus on clear communication, careful work and a finished result you can feel good about.</p><a className="textLink" href="#contact">Tell us about your project →</a></div>
          </div>
        </section>

        <section className="section services" id="services">
          <div className="container">
            <p className="eyebrow">What We Do</p>
            <h2>Home improvement services</h2>
            <p className="sectionCopy">Practical solutions for renovations, upgrades and repairs throughout your home.</p>
            <ServiceGallery />
          </div>
        </section>

        <section className="section" id="about">
          <div className="container split">
            <AboutSlideshow />
            <div>
              <p className="eyebrow">Why Choose Us</p>
              <h2>Good craftsmanship starts with doing the job right.</h2>
              <p>Shams Home Improvement handles projects ranging from bathrooms, tile and flooring to painting, carpentry, decks and covered porches. We treat your home with respect and pay attention to the finishing details.</p>
              <div className="features"><p>✓ Clear communication</p><p>✓ Attention to detail</p><p>✓ Versatile experience</p></div>
              <a className="button dark" href="tel:+14046356502">Talk About Your Project</a>
            </div>
          </div>
        </section>

        <section className="section work" id="work">
          <div className="container">
            <p className="eyebrow">Our Work</p>
            <h2>Recent projects</h2>
            <p className="sectionCopy">Explore the photos from each project, including the work in progress and finished results.</p>
            <ProjectGallery />
          </div>
        </section>

        <section className="section process">
          <div className="container">
            <p className="eyebrow">Simple Process</p>
            <h2>From idea to finished project</h2>
            <div className="steps"><article><h3>Contact Us</h3><p>Call or email and tell us what you need.</p></article><article><h3>Get an Estimate</h3><p>We review the project and discuss the work involved.</p></article><article><h3>We Get to Work</h3><p>Your project is completed carefully and professionally.</p></article></div>
          </div>
        </section>

        <section className="cta" id="contact">
          <div className="container split">
            <div><p className="eyebrow">Ready to Get Started?</p><h2>Ready to improve your home?</h2><p>Call, text or email to tell us about your project and request a free estimate in the Metro Atlanta area.</p></div>
            <div className="contact">
              <a href="tel:+14046356502"><small>CALL</small><strong>404-635-6502</strong></a>
              <a href="sms:+14046356502"><small>TEXT</small><strong>404-635-6502</strong></a>
              <div><small>SERVICE AREA</small><strong>Metro Atlanta</strong></div>
              <a href="https://shamshomeimprovement.com/"><small>WEBSITE</small><strong>ShamsHomeImprovement.com</strong></a>
            </div>
          </div>
        </section>

        <section className="section estimateSection" id="estimate"><div className="container"><EstimateForm /></div></section>

        <section className="section reviews" id="reviews">
          <div className="container">
            <p className="eyebrow">Customer Reviews</p>
            <h2>What customers say</h2>
            <GoogleReviews />
            <div className="reviewCard" style={{ maxWidth: 860, border: "1px solid rgba(36,51,61,.12)", borderTop: "4px solid var(--accent)" }}>
              <span style={{ color: "var(--muted)", fontSize: 13, fontWeight: 700 }}>Share your experience on Google</span>
              <h3 style={{ fontSize: "clamp(24px,4vw,34px)", lineHeight: 1.2, margin: "14px 0" }}>Worked with us? We’d love to hear from you.</h3>
              <p style={{ color: "var(--muted)", maxWidth: 620 }}>Your honest feedback helps other homeowners get to know Shams Home Improvement. Tell us about your project and your experience with our team.</p>
              <a className="button dark" href="https://g.page/r/CVK0xJQOsZTXEBM/review" target="_blank" rel="noopener noreferrer" style={{ marginTop: 14 }}>Leave a Google Review <span aria-hidden="true" style={{ marginLeft: 10 }}>↗</span></a>
              <p style={{ color: "var(--muted)", fontSize: 13, marginBottom: 0 }}>Opens Google in a new tab. Sign in to your Google account to leave a review.</p>
            </div>
          </div>
        </section>
      </main>

      <footer><div className="container footer"><strong>Shams Home Improvement</strong><span>Bathrooms • Tile • Flooring • Repairs • Carpentry • Decks • Covered Porches</span><span>© 2026 Shams Home Improvement</span></div></footer>
      <div className="mobileBar"><a href="tel:+14046356502">Call Now</a><a href="sms:+14046356502">Text Us</a></div>
    </>
  );
}
