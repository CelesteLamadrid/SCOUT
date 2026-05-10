import './WhyThisProblem.css'

export default function WhyThisProblem() {
  return (
    <section className="section why-section">
      <div className="container">
        <h2 className="section-heading why-heading reveal">Why This Problem?</h2>

        <div className="why-content reveal">
          <p className="why-intro">
            We were initially motivated by the realization that engineers were spending time on
            soil sampling (a time-consuming, comparatively menial task) when their skills could
            be better utilized elsewhere.
          </p>

          <div className="why-grid">
            <div className="why-card">
              <div className="why-card-icon">⏱</div>
              <h4>Manual sampling is slow</h4>
              <p>
                The video by Radicle Agronomics demonstrates that manual collection takes far
                longer even for just a few samples.{' '}
                <a href="https://radicle.ag/products/geopress" target="_blank" rel="noreferrer">
                  radicle.ag →
                </a>
              </p>
            </div>

            <div className="why-card">
              <div className="why-card-icon">🔬</div>
              <h4>Sensors improve data accuracy</h4>
              <p>
                Recent research highlights integration of moisture, pH, and NPK sensors with
                robots to provide real-time data, reducing dependence on lab results.{' '}
                <a href="https://link.springer.com/article/10.1007/s44430-025-00006-0" target="_blank" rel="noreferrer">
                  Springer →
                </a>
              </p>
            </div>

            <div className="why-card">
              <div className="why-card-icon">⚠️</div>
              <h4>Human error in field collection</h4>
              <p>
                Studies document how inadequate equipment cleaning and mislabeled bags introduce
                significant error in field collection.{' '}
                <a href="https://nepis.epa.gov/Exe/ZyNET.exe/9101YBA2.TXT" target="_blank" rel="noreferrer">
                  EPA →
                </a>
              </p>
            </div>

            <div className="why-card">
              <div className="why-card-icon">💬</div>
              <h4>Existing solutions don't pencil out</h4>
              <p>
                According to farmers on the NewAgTalk forum:{' '}
                <em>"you're probably breaking even at best over paying someone to do it."</em>{' '}
                — cz4586
              </p>
            </div>
          </div>

          <div className="why-comparison">
            <h3 className="why-comparison-heading">How SCOUT compares</h3>
            <div className="comparison-grid">
              <div className="comparison-card competitor">
                <div className="comparison-label">Mobile Robotic Platform (MRP)</div>
                <ul>
                  <li>Limited testing capability</li>
                  <li>Very limited storage capacity</li>
                  <li>No moisture sensing</li>
                </ul>
                <a href="http://hdl.handle.net/10492/4000" target="_blank" rel="noreferrer" className="comparison-link">
                  Reference →
                </a>
              </div>

              <div className="comparison-card competitor">
                <div className="comparison-label">WINTEX 1000</div>
                <ul>
                  <li>Requires active human operator</li>
                  <li>Full ATV needed to operate</li>
                  <li>Incredibly expensive</li>
                </ul>
                <a href="https://wintexagro.com/products/wintex-1000/" target="_blank" rel="noreferrer" className="comparison-link">
                  wintexagro.com →
                </a>
              </div>

              <div className="comparison-card scout-card">
                <div className="comparison-label">SCOUT</div>
                <ul>
                  <li>10 samples × 15 cores capacity</li>
                  <li>Real-time moisture data collection</li>
                  <li>Fully autonomous & battery powered</li>
                  <li>Under $1,500 to construct</li>
                  <li>Expandable onboard testing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
