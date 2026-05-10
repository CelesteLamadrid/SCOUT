import { useState } from 'react'
import './ComponentCarousel.css'

const COMPONENTS = [
  {
    name: 'Movement System',
    media: '/movement.gif',
    type: 'gif',
    description:
      'Clip of full-speed drive down the hallway — demonstrates SCOUT\'s 7+ MPH capability and highlights the limited turning radius at high speeds.',
  },
  {
    name: 'Probe Deployment System',
    media: '/probe_test.gif',
    type: 'gif',
    description:
      'Stepper motor rotates the lead screw for translational motion, driving the probe into the ground and retracting it. It first calibrates at the top for depth consistency. (4× Speed)',
  },
  {
    name: 'Preliminary Testing Capabilities',
    media: '/moisture_sensor.png',
    type: 'image',
    description:
      'A moisture sensor is attached to the probe and wired to the control box for real-time, in-ground sensing before moisture can change during storage or transport.',
  },
  {
    name: 'Soil Transfer System',
    media: '/actuator_test.gif',
    type: 'gif',
    description:
      'The linear actuator moves the gripper in and out to position the collection cup under the probe as each core is collected. (4× Speed)',
  },
  {
    name: 'Rotating Sample Storage System',
    media: '/sample_storage.gif',
    type: 'gif',
    description:
      'Stepper motor drives the spur gear system to precisely rotate storage cups into position with the gripper — one rotation per completed sample.',
  },
  {
    name: 'Control Box',
    media: '/control_box.HEIC',
    type: 'image',
    description:
      'The control box neatly houses all electronics — Arduino, motor controllers, and wiring — providing organised protection and easy access for maintenance.',
  },
]

export default function ComponentCarousel() {
  const [active, setActive] = useState(0)
  const comp = COMPONENTS[active]

  const prev = () => setActive(i => (i - 1 + COMPONENTS.length) % COMPONENTS.length)
  const next = () => setActive(i => (i + 1) % COMPONENTS.length)

  return (
    <section className="section carousel-section">
      <div className="container">
        <h2 className="section-heading reveal">Components in Action</h2>

        <div className="carousel-tabs reveal">
          {COMPONENTS.map((c, i) => (
            <button
              key={i}
              className={`carousel-tab ${active === i ? 'active' : ''}`}
              onClick={() => setActive(i)}
            >
              <span className="tab-num">0{i + 1}</span>
              <span className="tab-name">{c.name}</span>
            </button>
          ))}
        </div>

        <div className="carousel-card reveal">
          <div className="carousel-media-wrap">
            <img
              key={active}
              src={comp.media}
              alt={comp.name}
              className="carousel-media"
            />
          </div>

          <div className="carousel-info">
            <div className="carousel-index">0{active + 1} / 06</div>
            <h3 className="carousel-name">{comp.name}</h3>
            <p className="carousel-desc">{comp.description}</p>

            <div className="carousel-nav">
              <button className="carousel-arrow" onClick={prev} aria-label="Previous">
                ←
              </button>
              <div className="carousel-dots">
                {COMPONENTS.map((_, i) => (
                  <button
                    key={i}
                    className={`carousel-dot ${active === i ? 'active' : ''}`}
                    onClick={() => setActive(i)}
                    aria-label={`Go to ${COMPONENTS[i].name}`}
                  />
                ))}
              </div>
              <button className="carousel-arrow" onClick={next} aria-label="Next">
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
