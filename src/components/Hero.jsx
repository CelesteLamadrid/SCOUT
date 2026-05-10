import './Hero.css'

const teamMembers = [
  'Hannah Dutton',
  'Al Sherbatov',
  'Celeste Lamadrid',
  'Omar Mansour',
  'Joe Malloy',
]

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <div className="hero-subtitle">Automatic Soil Sampling</div>
          <h1 className="hero-title">SCOUT</h1>
          <div className="hero-divider" />
          <p className="hero-team-label">
            Designed and created by <strong>JOACH (Team 8)</strong> for the{' '}
            <span>Columbia University Senior Design Course</span>
          </p>
          <ul className="hero-team-list">
            {teamMembers.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </div>
        <div className="hero-logo">
          <img src="/SCOUT_logo.png" alt="SCOUT Logo" />
        </div>
      </div>
      <div className="hero-scroll-indicator">
        <div className="hero-scroll-dot" />
        <span>Scroll to explore</span>
      </div>
    </section>
  )
}
