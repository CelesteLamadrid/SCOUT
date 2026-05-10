import { useEffect } from 'react'
import Hero from './components/Hero'
import Overview from './components/Overview'
import ModelViewer from './components/ModelViewer'
import ComponentCarousel from './components/ComponentCarousel'
import WhyThisProblem from './components/WhyThisProblem'
import Experiments from './components/Experiments'
import UserExperience from './components/UserExperience'

export default function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible')
      }),
      { threshold: 0.12 }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div>
      <Hero />
      <Overview />
      <ModelViewer />
      <ComponentCarousel />
      <WhyThisProblem />
      <Experiments />
      <UserExperience />
    </div>
  )
}
