import './Overview.css'

export default function Overview() {
  return (
    <section className="section overview-section">
      <div className="container">
        <div className="overview-box reveal">
          <div className="overview-badge">Project Overview</div>
          <p className="overview-text">
            For agricultural production, probe-based soil sampling is an important step towards
            optimal production of crops. Farmers typically use laborious hand-sampling methods
            which take up a lot of time and effort. This is why we developed{' '}
            <strong>SCOUT</strong>, a robot that can follow a preprogrammed path and collect
            the desired samples without human intervention. It can also do some preliminary
            testing such as collecting soil moisture data.
          </p>
          <p className="overview-text">
            Various motors and actuator systems along with an onboard computer implement
            control for movement, probe deployment, sample collection, and storage.
          </p>
          <div className="overview-stats">
            <div className="overview-stat">
              <span className="stat-value">7+ MPH</span>
              <span className="stat-label">Top Speed</span>
            </div>
            <div className="overview-stat">
              <span className="stat-value">10 Samples</span>
              <span className="stat-label">Storage Capacity</span>
            </div>
            <div className="overview-stat">
              <span className="stat-value">15 Cores</span>
              <span className="stat-label">Per Sample</span>
            </div>
            <div className="overview-stat">
              <span className="stat-value">&lt;$1,500</span>
              <span className="stat-label">Build Cost</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
