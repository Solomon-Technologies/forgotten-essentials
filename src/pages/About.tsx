import { Link } from 'react-router-dom';
import './About.css';

export default function About() {
  return (
    <main className="about">
      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>Our Story</h1>
          <p>Where timeless style meets conscious consumption</p>
        </div>
      </section>

      {/* Story */}
      <section className="about-story">
        <div className="story-grid">
          <div className="story-image">
            <img
              src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80"
              alt="Vintage clothing rack"
            />
          </div>
          <div className="story-content">
            <h2>A Passion for the Past</h2>
            <p>
              CURATED was born from a simple belief: the most beautiful pieces have
              already been made. We're dedicated to giving exceptional vintage and
              pre-loved clothing a second life, connecting discerning shoppers with
              garments that tell a story.
            </p>
            <p>
              Every item in our collection is hand-selected for its quality, condition,
              and timeless appeal. From rare designer finds to everyday classics, we
              believe in the magic of pieces that have stood the test of time.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="about-values">
        <h2>What We Stand For</h2>
        <div className="values-grid">
          <div className="value-card">
            <h3>Sustainability</h3>
            <p>
              Fashion is one of the world's largest polluters. By choosing vintage
              and pre-loved, you're making a conscious choice to reduce waste and
              extend the lifecycle of beautiful garments.
            </p>
          </div>
          <div className="value-card">
            <h3>Quality</h3>
            <p>
              We only source pieces that meet our rigorous standards. Every garment
              is inspected, authenticated when applicable, and photographed to show
              its true condition.
            </p>
          </div>
          <div className="value-card">
            <h3>Individuality</h3>
            <p>
              In a world of fast fashion and mass production, vintage pieces offer
              something truly unique. Express your personal style with one-of-a-kind
              finds you won't see everywhere.
            </p>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="about-process">
        <div className="process-grid">
          <div className="process-content">
            <h2>Our Curation Process</h2>
            <div className="process-steps">
              <div className="process-step">
                <span className="step-number">01</span>
                <div className="step-content">
                  <h4>Source</h4>
                  <p>We work with trusted suppliers, estates, and individual consignors to find exceptional pieces.</p>
                </div>
              </div>
              <div className="process-step">
                <span className="step-number">02</span>
                <div className="step-content">
                  <h4>Inspect</h4>
                  <p>Every item undergoes a thorough quality check and authentication process.</p>
                </div>
              </div>
              <div className="process-step">
                <span className="step-number">03</span>
                <div className="step-content">
                  <h4>Prepare</h4>
                  <p>Items are professionally cleaned and carefully photographed.</p>
                </div>
              </div>
              <div className="process-step">
                <span className="step-number">04</span>
                <div className="step-content">
                  <h4>Present</h4>
                  <p>We provide detailed descriptions, measurements, and condition notes for informed shopping.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="process-image">
            <img
              src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80"
              alt="Clothing curation process"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <h2>Ready to Explore?</h2>
        <p>Discover your next favorite piece in our carefully curated collection.</p>
        <Link to="/shop" className="btn-primary">Shop the Collection</Link>
      </section>
    </main>
  );
}
