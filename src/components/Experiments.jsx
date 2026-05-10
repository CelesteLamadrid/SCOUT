import './Experiments.css'

export default function Experiments() {
  return (
    <section className="section experiments-section">
      <div className="container">
        <h2 className="section-heading reveal">Simulations &amp; Experiments</h2>
        <p className="experiments-intro reveal">
          Key analyses and calculations used to evaluate design constraints and drive component decisions.
        </p>

        <div className="experiments-grid">
          {/* 1 */}
          <div className="experiment-card reveal">
            <div className="exp-num">01</div>
            <div className="exp-body">
              <h3>Von Mises Stress Analysis — Support Plate</h3>
              <p>
                FEA was performed to determine the minimum plate thickness required to prevent
                yielding under load. The maximum simulated stress was <strong>2.117 MPa</strong>,
                well within the material yield strength of <strong>276 MPa</strong> — a safety
                factor of over 130×.
              </p>
              <div className="exp-image-wrap">
                <img src="/plate_stress.png" alt="Von Mises stress analysis on support plate" />
                <div className="exp-image-caption">Von Mises stress distribution — support plate FEA</div>
              </div>
            </div>
          </div>

          {/* 2 */}
          <div className="experiment-card reveal">
            <div className="exp-num">02</div>
            <div className="exp-body">
              <h3>Motor Sizing — Probe Lead Screw</h3>
              <p>
                The probe must penetrate up to <strong>300 psi</strong> compacted soil (USDA root
                limit). Given the probe geometry, this translates to <strong>246 N</strong> of axial
                force. Using an 8 mm/rev lead screw at 70% efficiency:
              </p>
              <div className="exp-formula">
                <span>T = FL / 2πη</span>
                <span className="exp-formula-result">= 0.45 N·m</span>
              </div>
              <p>
                This requires at minimum a <strong>NEMA 23</strong> motor. Since max-load conditions
                were not expected during prototype testing, a NEMA 17 (already on hand) was used,
                significantly cutting costs.{' '}
                <a
                  href="https://media.pbclinear.com/pdfs/pbc-linear-data-sheets/data-sheet-stepper-motor-support.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  Motor datasheet →
                </a>
              </p>
            </div>
          </div>

          {/* 3 */}
          <div className="experiment-card reveal">
            <div className="exp-num">03</div>
            <div className="exp-body">
              <h3>Sample Cup Sizing Calculation</h3>
              <p>
                One core has a volume of <strong>6.28 in³</strong>, so a full 15-core sample
                occupies <strong>94 in³</strong>. Cup geometry was also constrained by the
                need to fit under the probe before soil is pushed out as it rises, yielding:
              </p>
              <div className="exp-specs">
                <div className="exp-spec">
                  <span className="spec-val">2 in</span>
                  <span className="spec-lbl">Radius</span>
                </div>
                <div className="exp-spec">
                  <span className="spec-val">4.5 in</span>
                  <span className="spec-lbl">Height</span>
                </div>
                <div className="exp-spec">
                  <span className="spec-val">94 in³</span>
                  <span className="spec-lbl">Capacity</span>
                </div>
              </div>
              <p>
                The maximum weight of a soil-filled cup was then used to size the <strong>24 V
                linear actuator</strong> for the soil transfer system.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
