import Link from 'next/link';
import { Plane, Globe, Calendar, DollarSign } from 'lucide-react';
import styles from './landing.module.css';

export default function LandingPage() {
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <Plane className={styles.logoIcon} />
          <span className={styles.logoText}>Traveloop</span>
        </div>
        <div className={styles.navActions}>
          <Link href="/login" className="btn-secondary">Log in</Link>
          <Link href="/signup" className="btn-primary">Sign up</Link>
        </div>
      </nav>

      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            Personalized Travel Planning <br/>
            <span className={styles.highlight}>Made Easy</span>
          </h1>
          <p className={styles.subtitle}>
            Dream, design, and organize your trips with ease. Discover cities, plan itineraries, and budget effectively.
          </p>
          <div className={styles.cta}>
            <Link href="/signup" className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
              Start Planning Now
            </Link>
          </div>
        </div>
      </header>

      <section className={styles.features}>
        <div className={styles.featureCard}>
          <div className={styles.featureIconWrapper}><Globe size={32} /></div>
          <h3>Discover Destinations</h3>
          <p>Explore global cities and find activities that match your vibe.</p>
        </div>
        <div className={styles.featureCard}>
          <div className={styles.featureIconWrapper}><Calendar size={32} /></div>
          <h3>Build Itineraries</h3>
          <p>Create visual timelines for your multi-city adventures.</p>
        </div>
        <div className={styles.featureCard}>
          <div className={styles.featureIconWrapper}><DollarSign size={32} /></div>
          <h3>Track Budgets</h3>
          <p>Stay on top of your travel expenses with visual breakdowns.</p>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>&copy; 2026 Traveloop. Built for the Hackathon.</p>
      </footer>
    </div>
  );
}
