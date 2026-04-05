import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SectionDivider from './components/SectionDivider'
import CoupleIntro from './components/CoupleIntro'
import StoryTimeline from './components/StoryTimeline'
import Events from './components/Events'
import Schedule from './components/Schedule'
import Venue from './components/Venue'
import RSVP from './components/RSVP'
import Gallery from './components/Gallery'
import Family from './components/Family'
import DressCode from './components/DressCode'
import Gifts from './components/Gifts'
import MusicToggle from './components/MusicToggle'
import Hashtag from './components/Hashtag'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'

export default function App() {
  return (
    <>
      <LoadingScreen />
      <Navbar />
      <main>
        <Hero />
        <SectionDivider />
        <CoupleIntro />
        <SectionDivider variant="minimal" />
        <StoryTimeline />
        <SectionDivider />
        <Events />
        <SectionDivider variant="minimal" />
        <Schedule />
        <SectionDivider />
        <Venue />
        <SectionDivider variant="minimal" />
        <RSVP />
        <SectionDivider />
        <Gallery />
        <SectionDivider variant="minimal" />
        <Family />
        <SectionDivider variant="minimal" />
        <DressCode />
        <SectionDivider />
        <Gifts />
        <Hashtag />
        <SectionDivider variant="minimal" />
        <FAQ />
        <SectionDivider variant="minimal" />
        <Contact />
      </main>
      <Footer />
      <MusicToggle />
      <BackToTop />
    </>
  )
}
