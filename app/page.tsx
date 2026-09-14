const services = [
  ["Bathroom Remodeling", "Walk-in showers, tub-to-shower conversions, tile surrounds, vanities, shower doors and complete bathroom updates."],
  ["Tile & Flooring", "Tile installation, flooring, laundry rooms, backsplashes, carpet replacement and finish work."],
  ["Plumbing", "Faucets, sinks, garbage disposals, fixtures and common residential plumbing repairs."],
  ["Electrical", "Ceiling fans, light fixtures, outlets, switches, breakers and common residential electrical improvements."],
  ["Painting & Repairs", "Interior and exterior painting, drywall, rotten wood replacement, pressure washing and repairs."],
  ["Carpentry & Doors", "Trim, baseboards, interior and exterior doors, framing and custom carpentry improvements."],
  ["Decks", "Deck repairs, replacement, rebuilding and exterior wood work."],
  ["Covered Porches", "Covered porch projects from framing and roofing through flooring, trim, paint and finishing."],
  ["Countertops & Cabinets", "Countertop replacement, cabinet changes and kitchen cabinet or vanity painting."],
];

const projects = [
  "Bathroom Remodeling",
  "Walk-In Shower",
  "Covered Porch",
  "Back Deck Replacement & Repairs",
];

export default function HomePage() {
  return (
    <>
      <header className="header">
        <div className="container nav">
          <a className="brand" href="#top">
            <span className="brandMark">SH</span>
            <span><strong>Shams Home Improvement</strong><small>Atlanta Remodeling & Renovation</small></span>
          </a>
          <nav className="links">
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a href="#work">Our Work</a>
            <a href="#reviews">Reviews</a>
            <a href="#contact">Contact</a>
          </nav>
          <a className="button small" href="tel:+14046356502">Call 404-635-6502</a>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="container heroInner">
            <p className="eyebrow">Metro Atlanta Home Improvement</p>
            <h1>Quality work.<br/><span>Built to last.</span></h1>
            <p className="lead">From bathroom renovations and tile work to decks, covered porches, repairs, painting, plumbing and electrical improvements, we help homeowners transform their spaces with dependable workmanship.</p>
            <div className="actions">
              <a className="button" href="tel:+14046356502">Call for a Free Estimate</a>
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
            <div className="grid">{services.map(([title, text], i) => <article className="card" key={title}><span>{String(i + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
          </div>
        </section>

        <section className="section" id="about">
          <div className="container split">
            <div className="photoPlaceholder"><span>PROJECT PHOTOS</span><small>Your completed-project gallery will be added here.</small></div>
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
            <div className="projectGrid">{projects.map((project) => <div className="project" key={project}><span>{project}</span></div>)}</div>
          </div>
        </section>

        <section className="section process">
          <div className="container">
            <p className="eyebrow">Simple Process</p>
            <h2>From idea to finished project</h2>
            <div className="steps"><article><b>1</b><h3>Contact Us</h3><p>Call or email and tell us what you need.</p></article><article><b>2</b><h3>Get an Estimate</h3><p>We review the project and discuss the work involved.</p></article><article><b>3</b><h3>We Get to Work</h3><p>Your project is completed carefully and professionally.</p></article></div>
          </div>
        </section>

        <section className="cta" id="contact">
          <div className="container split">
            <div><p className="eyebrow">Ready to Get Started?</p><h2>Ready to improve your home?</h2><p>Call, text or email to tell us about your project and request a free estimate in the Metro Atlanta area.</p></div>
            <div className="contact">
              <a href="tel:+14046356502"><small>CALL</small><strong>404-635-6502</strong></a>
              <a href="sms:+14046356502"><small>TEXT</small><strong>404-635-6502</strong></a>
              <div><small>SERVICE AREA</small><strong>Metro Atlanta</strong></div>
              <div><small>WEBSITE</small><strong>ShamsHomeImprovement.com</strong></div>
            </div>
          </div>
        </section>

        <section className="section reviews" id="reviews">
          <div className="container">
            <p className="eyebrow">Customer Reviews</p>
            <h2>What customers say</h2>
            <div className="reviewCard"><div>★★★★★</div><h3>Reviews coming soon</h3><p>This section is ready for verified feedback from Shams Home Improvement customers.</p></div>
          </div>
        </section>
      </main>

      <footer><div className="container footer"><strong>Shams Home Improvement</strong><span>Bathrooms • Tile • Flooring • Repairs • Carpentry • Decks • Covered Porches</span><span>© 2026 Shams Home Improvement</span></div></footer>
      <div className="mobileBar"><a href="tel:+14046356502">Call Now</a><a href="sms:+14046356502">Text Us</a></div>
    </>
  );
}