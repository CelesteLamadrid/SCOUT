import { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF, Html, Environment } from '@react-three/drei'
import { Vector3, Box3 } from 'three'
import gsap from 'gsap'
import './ModelViewer.css'

/* ─── Component data ─────────────────────────────────────────── */
const COMPONENTS = [
  {
    name: 'Movement System',
    description:
      'Two powered motors allow SCOUT to reach over 7 MPH — sufficient speed to complete sampling of the average plot in a day. The 10-inch wheel hub motors are rated at 350 W / 36 V, placing SCOUT in the low-voltage Electric Vehicle (EV) category per ISO 6469.',
  },
  {
    name: 'Probe Deployment System',
    description:
      'The rail and probe accommodate the standard 8″ sampling depth with ¾″ ID (NC State AG-439-40). A stepper motor and lead screw can penetrate up to 300 psi compacted soil — the USDA root-growth limit — delivering 246 N of axial force at 0.45 N·m torque via T = FL / 2πη.',
  },
  {
    name: 'Preliminary Testing Capabilities',
    description:
      'A soil moisture sensor mounted on the probe collects real-time moisture data while the probe is still in the ground — the optimal moment, since moisture changes during storage and transport to the lab.',
  },
  {
    name: 'Soil Transfer System',
    description:
      'Each cup holds up to 15 cores (UCONN College of Agriculture standard). A 24 V linear actuator with a PLA gripper positions the cup under the probe as it rises, then retracts it into the storage system.',
  },
  {
    name: 'Rotating Sample Storage System',
    description:
      'A stepper motor drives a spur gear on a lazy-susan bearing for precise cup rotation. Once a cup is filled, the system advances to place the next empty cup in front of the gripper — capacity for 10 complete samples.',
  },
  {
    name: 'Control Box',
    description:
      'All electronics — Arduino, motor controllers, and wiring — are neatly routed through a single control box for organisation, protection, and ease of maintenance.',
  },
]

/* ─── Default config ──────────────────────────────────────────── */
const DEFAULT_CONFIG = {
  hotspots: [
    { position: [-1.2, -0.8, 0.8], camera: { position: [-3, -1, 2.5],  target: [-1, -0.5, 0] } },
    { position: [0,    1.6,  0],   camera: { position: [0, 3.5, 3],    target: [0, 1.2, 0] } },
    { position: [0.4,  0.8, -0.8], camera: { position: [1.5, 1.5, -3], target: [0.3, 0.8, -0.5] } },
    { position: [1.2,  0,   0.3],  camera: { position: [3.5, 0.5, 1],  target: [1, 0, 0] } },
    { position: [1,    0,   1.2],  camera: { position: [3, 0, 3.5],    target: [0.8, 0, 0.8] } },
    { position: [-0.5, 0.6, 1],    camera: { position: [-2, 1.5, 3],   target: [-0.3, 0.4, 0.8] } },
  ],
  defaultCamera: { position: [4, 2.5, 4], target: [0, 0, 0] },
}

function loadConfig() {
  try {
    const raw = localStorage.getItem('scout-model-config')
    return raw ? JSON.parse(raw) : DEFAULT_CONFIG
  } catch {
    return DEFAULT_CONFIG
  }
}

/* ─── 3D model — sets orbit center to model's bounding box center */
function ScoutModel({ controlsRef, modelCenterRef }) {
  const { scene } = useGLTF('/System_Assembly.glb')

  useEffect(() => {
    const box = new Box3().setFromObject(scene)
    const center = new Vector3()
    box.getCenter(center)

    // Store the center so the rest of the app can use it for "return home"
    modelCenterRef.current = center.clone()

    const controls = controlsRef.current
    if (!controls) return
    controls.target.copy(center)
    controls.update()
  }, [scene]) // eslint-disable-line

  return <primitive object={scene} />
}

/* ─── Smooth camera animation ─────────────────────────────────── */
function CameraController({ targetView, controlsRef }) {
  const { camera } = useThree()

  useEffect(() => {
    if (!targetView) return
    const controls = controlsRef.current
    if (!controls) return

    const fromPos = camera.position.clone()
    const fromTarget = controls.target.clone()
    const toPos = new Vector3(...targetView.position)
    const toTarget = new Vector3(...targetView.target)

    const proxy = { t: 0 }
    gsap.killTweensOf(proxy)
    gsap.to(proxy, {
      t: 1,
      duration: 1.6,
      ease: 'power3.inOut',
      onUpdate() {
        camera.position.lerpVectors(fromPos, toPos, proxy.t)
        controls.target.lerpVectors(fromTarget, toTarget, proxy.t)
        controls.update()
      },
    })
  }, [targetView]) // eslint-disable-line

  return null
}

/* ─── Hotspot dot ─────────────────────────────────────────────── */
function Hotspot({ position, index, isActive, isConfigMode, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Html position={position} zIndexRange={[100, 0]} style={{ pointerEvents: 'none' }}>
      <div
        className={`hotspot-wrapper ${isActive ? 'active' : ''} ${isConfigMode ? 'config' : ''}`}
        style={{ pointerEvents: 'all' }}
        onClick={(e) => { e.stopPropagation(); onClick(index) }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className={`hotspot-dot ${hovered || isActive ? 'hovered' : ''}`}>
          <span className="hotspot-num">{index + 1}</span>
        </div>
        <div className={`hotspot-label ${hovered || isActive ? 'visible' : ''}`}>
          {COMPONENTS[index].name}
        </div>
      </div>
    </Html>
  )
}

/* ─── Info panel (shown when a hotspot is active, config closed) ─ */
function InfoPanel({ index, onClose }) {
  return (
    <div className={`info-panel ${index !== null ? 'open' : ''}`}>
      {index !== null && <>
        <button className="info-close" onClick={onClose}>✕</button>
        <div className="info-num">0{index + 1}</div>
        <h3 className="info-title">{COMPONENTS[index].name}</h3>
        <p className="info-desc">{COMPONENTS[index].description}</p>
      </>}
    </div>
  )
}

/* ─── Config side panel ───────────────────────────────────────── */
function ConfigPanel({ config, setConfig, controlsRef, cameraRef, onClose }) {
  const [local, setLocal] = useState(() => JSON.parse(JSON.stringify(config)))
  const [saved, setSaved] = useState(false)

  const captureView = (i) => {
    const cam = cameraRef.current
    const ctrl = controlsRef.current
    if (!cam || !ctrl) return
    const round = (v) => parseFloat(v.toFixed(3))
    const next = JSON.parse(JSON.stringify(local))
    next.hotspots[i].camera = {
      position: [round(cam.position.x), round(cam.position.y), round(cam.position.z)],
      target:   [round(ctrl.target.x),  round(ctrl.target.y),  round(ctrl.target.z)],
    }
    setLocal(next)
    setSaved(false)
  }

  const captureDefault = () => {
    const cam = cameraRef.current
    const ctrl = controlsRef.current
    if (!cam || !ctrl) return
    const round = (v) => parseFloat(v.toFixed(3))
    const next = JSON.parse(JSON.stringify(local))
    next.defaultCamera = {
      position: [round(cam.position.x), round(cam.position.y), round(cam.position.z)],
      target:   [round(ctrl.target.x),  round(ctrl.target.y),  round(ctrl.target.z)],
    }
    setLocal(next)
    setSaved(false)
  }

  const updatePos = (i, ai, val) => {
    const next = JSON.parse(JSON.stringify(local))
    next.hotspots[i].position[ai] = parseFloat(val) || 0
    setLocal(next)
    setSaved(false)
  }

  const save = () => {
    localStorage.setItem('scout-model-config', JSON.stringify(local))
    setConfig(local)
    setSaved(true)
  }

  const reset = () => {
    localStorage.removeItem('scout-model-config')
    setConfig(DEFAULT_CONFIG)
    setLocal(JSON.parse(JSON.stringify(DEFAULT_CONFIG)))
    setSaved(false)
  }

  return (
    <div className="config-panel">
      <div className="config-panel-header">
        <span>⚙ Configuration</span>
        <button className="config-close" onClick={onClose}>✕</button>
      </div>

      <p className="config-hint">
        Orbit the model to the desired view, then click <strong>Capture</strong>.
        Adjust XYZ to reposition a hotspot dot.
      </p>

      <div className="config-section-label">Default (full) view</div>
      <button className="config-btn-full" onClick={captureDefault}>
        Capture Current View
      </button>

      <div className="config-list">
        {COMPONENTS.map((comp, i) => (
          <div key={i} className="config-item">
            <div className="config-item-header">
              <span className="config-num">0{i + 1}</span>
              <strong>{comp.name}</strong>
            </div>
            <div className="config-axes">
              {['X', 'Y', 'Z'].map((axis, ai) => (
                <label key={axis} className="axis-label">
                  {axis}
                  <input
                    type="number"
                    step="0.1"
                    value={local.hotspots[i].position[ai]}
                    onChange={e => updatePos(i, ai, e.target.value)}
                  />
                </label>
              ))}
              <button className="config-btn-capture" onClick={() => captureView(i)}>
                Capture
              </button>
            </div>
            <div className="config-cam-preview">
              [{local.hotspots[i].camera.position.map(v => v.toFixed(1)).join(', ')}]
              → [{local.hotspots[i].camera.target.map(v => v.toFixed(1)).join(', ')}]
            </div>
          </div>
        ))}
      </div>

      <div className="config-actions">
        <button className="config-btn-reset" onClick={reset}>Reset</button>
        <button className={`config-btn-save ${saved ? 'saved' : ''}`} onClick={save}>
          {saved ? '✓ Saved' : 'Save'}
        </button>
      </div>
    </div>
  )
}

/* ─── Scene ───────────────────────────────────────────────────── */
function Scene({ config, activeHotspot, setActiveHotspot, targetView, setTargetView, isConfigMode, controlsRef, modelCenterRef }) {
  const handleHotspotClick = (i) => {
    const hs = config.hotspots[i]
    setActiveHotspot(i)
    setTargetView({ position: hs.camera.position, target: hs.camera.target, key: Date.now() })
  }

  const handleBgClick = () => {
    if (activeHotspot !== null) {
      setActiveHotspot(null)
      const def = config.defaultCamera
      // Always return orbit to the true model center, not config's [0,0,0]
      const center = modelCenterRef.current
      setTargetView({
        position: def.position,
        target: center ? [center.x, center.y, center.z] : def.target,
        key: Date.now(),
      })
    }
  }

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} castShadow />
      <directionalLight position={[-3, 2, -4]} intensity={0.4} />
      <pointLight position={[0, 4, 0]} intensity={0.6} color="#acd2ba" />

      <Suspense fallback={null}>
        <ScoutModel controlsRef={controlsRef} modelCenterRef={modelCenterRef} />
        <Environment preset="forest" />
      </Suspense>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, 0]} onClick={handleBgClick}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial transparent opacity={0} />
      </mesh>

      {config.hotspots.map((hs, i) => (
        <Hotspot
          key={i}
          index={i}
          position={hs.position}
          isActive={activeHotspot === i}
          isConfigMode={isConfigMode}
          onClick={handleHotspotClick}
        />
      ))}

      <CameraController targetView={targetView} controlsRef={controlsRef} />

      <OrbitControls
        ref={controlsRef}
        enablePan
        enableZoom
        minDistance={0.2}
        maxDistance={20}
        makeDefault
      />
    </>
  )
}

/* ─── Main export ─────────────────────────────────────────────── */
export default function ModelViewer() {
  const [config, setConfig] = useState(loadConfig)
  const [activeHotspot, setActiveHotspot] = useState(null)
  const [targetView, setTargetView] = useState(null)
  const [isConfigMode, setIsConfigMode] = useState(false)
  const controlsRef = useRef()
  const cameraRef = useRef()
  const modelCenterRef = useRef(null)

  // Triple-click the hidden gear icon to open config
  const clickCount = useRef(0)
  const clickTimer = useRef(null)

  const handleGearClick = () => {
    clickCount.current += 1
    if (clickTimer.current) clearTimeout(clickTimer.current)
    clickTimer.current = setTimeout(() => { clickCount.current = 0 }, 600)
    if (clickCount.current >= 3) {
      clickCount.current = 0
      clearTimeout(clickTimer.current)
      setIsConfigMode(true)
    }
  }

  const defCam = config.defaultCamera

  return (
    <section className="section model-section">
      <div className="container">
        <h2 className="section-heading reveal">Explore SCOUT in 3D</h2>
        <p className="model-hint reveal">
          Click any numbered dot to focus on that component and learn more.
        </p>
      </div>

      <div className={`model-stage ${isConfigMode ? 'config-open' : ''}`}>
        {/* Canvas */}
        <div className="canvas-wrapper reveal">
          <Canvas
            camera={{ position: defCam.position, fov: 45 }}
            shadows
            gl={{ antialias: true }}
            onCreated={({ camera }) => { cameraRef.current = camera }}
          >
            <Scene
              config={config}
              activeHotspot={activeHotspot}
              setActiveHotspot={setActiveHotspot}
              targetView={targetView}
              setTargetView={setTargetView}
              isConfigMode={isConfigMode}
              controlsRef={controlsRef}
              modelCenterRef={modelCenterRef}
            />
          </Canvas>

          <div className="canvas-instructions">
            <span>Drag to rotate</span>
            <span>·</span>
            <span>Scroll to zoom</span>
            <span>·</span>
            <span>Click a dot to focus</span>
          </div>

          {/* Hidden triple-click trigger — nearly invisible gear icon */}
          <button
            className="config-trigger"
            onClick={handleGearClick}
            aria-label="Configuration"
            title=""
          >
            ⚙
          </button>
        </div>

        {/* Right panel: info OR config */}
        {isConfigMode ? (
          <ConfigPanel
            config={config}
            setConfig={setConfig}
            controlsRef={controlsRef}
            cameraRef={cameraRef}
            onClose={() => setIsConfigMode(false)}
          />
        ) : (
          <InfoPanel
            index={activeHotspot}
            onClose={() => {
              setActiveHotspot(null)
              const def = config.defaultCamera
              const center = modelCenterRef.current
              setTargetView({
                position: def.position,
                target: center ? [center.x, center.y, center.z] : def.target,
                key: Date.now(),
              })
            }}
          />
        )}
      </div>
    </section>
  )
}
