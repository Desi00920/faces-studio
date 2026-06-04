import Carousel3D from '../sections/Carousel3D'
import FogOverlay from '../sections/FogOverlay'
import Hero from '../sections/Hero'
import About from '../sections/About'
import Treatments from '../sections/Treatments'
import AddOns from '../sections/AddOns'
import FarfallaGallery from '../sections/FarfallaGallery'
import MethodenInfo from '../sections/MethodenInfo'
import Gutscheine from '../sections/Gutscheine'
import Contact from '../sections/Contact'
import GoogleReviews from '../sections/GoogleReviews'
import GoogleMap from '../sections/GoogleMap'

export default function Home() {
  return (
    <>
      <Carousel3D />
      <FogOverlay />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <About />
        <Treatments />
        <AddOns />
        <FarfallaGallery />
        <MethodenInfo />
        <Gutscheine />
        <Contact />
        <GoogleReviews />
        <GoogleMap />
      </div>
    </>
  )
}
