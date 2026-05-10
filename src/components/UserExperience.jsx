import './UserExperience.css'

export default function UserExperience() {
  return (
    <section className="section ux-section">
      <div className="container">
        <div className="ux-inner reveal">
          <div className="ux-text">
            <div className="ux-badge">User Experience</div>
            <h2 className="ux-heading">Designed for the Field</h2>
            <p className="ux-body">
              From day one, SCOUT was built with the operator in mind. Farmers and agronomists
              shouldn't need a manual to sample soil; so we invested in a clean, intuitive frontend that lets
              anyone plan a sampling route, dispatch the robot, and review results from a tablet
              or phone. The same engineering care that went into the hardware went into making
              sure a first-time user can have SCOUT collecting samples in under five minutes. A support team 
              is also available to assist with any questions or issues, ensuring a smooth experience from setup to sample collection.
            </p>
            <p className="ux-body">
              Our interface gives you real-time feedback on probe depth, moisture readings, and
              sample storage status accessible from your phone, so you can get back to the work that matters.
            </p>
            <a
              href="/ui"
              className="ux-btn"
            >
              Explore the User Interface →
            </a>
          </div>

          <div className="ux-visual">
            <div className="ux-card">
              <div className="ux-card-dot green" />
              <div className="ux-card-dot yellow" />
              <div className="ux-card-dot red" />
              <div className="ux-mockup">
                <div className="mock-header">SCOUT Dashboard</div>
                <div className="mock-grid">
                  <div className="mock-stat">
                    <span className="mock-val">7.2 <span className="mock-unit">MPH</span></span>
                    <span className="mock-lbl">Speed</span>
                  </div>
                  <div className="mock-stat">
                    <span className="mock-val">8 <span className="mock-unit">in</span></span>
                    <span className="mock-lbl">Probe depth</span>
                  </div>
                  <div className="mock-stat">
                    <span className="mock-val">34 <span className="mock-unit">%</span></span>
                    <span className="mock-lbl">Moisture</span>
                  </div>
                  <div className="mock-stat">
                    <span className="mock-val">6 <span className="mock-unit">/10</span></span>
                    <span className="mock-lbl">Samples</span>
                  </div>
                </div>
                <div className="mock-bar-label">Route progress</div>
                <div className="mock-progress">
                  <div className="mock-progress-fill" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="ux-footer">
          <p>SCOUT — JOACH Team 8 · Columbia University Senior Design · 2026</p>
        </div>
      </div>
    </section>
  )
}
