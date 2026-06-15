import { Navigate, Route, Routes } from 'react-router-dom'
import LoadingScreen from './components/LoadingScreen'
import DashboardNav from './components/DashboardNav'
import Hero from './components/Hero'
import CoupleIntro from './components/CoupleIntro'
import Events from './components/Events'
import Schedule from './components/Schedule'
import Venue from './components/Venue'
import RSVP from './components/RSVP'
import Gallery from './components/Gallery'
import Family from './components/Family'
import DressCode from './components/DressCode'
import Gifts from './components/Gifts'
import MusicToggle from './components/MusicToggle'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'

export default function App() {
  return (
    <>
      <LoadingScreen />
      <DashboardNav />
      <main>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/couple" element={<CoupleIntro />} />
          <Route path="/events" element={<Events />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/venue" element={<Venue />} />
          <Route path="/rsvp" element={<RSVP />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/family" element={<Family />} />
          <Route path="/dress-code" element={<DressCode />} />
          <Route path="/gifts" element={<Gifts />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <MusicToggle />
      <BackToTop />
    </>
  )
}
