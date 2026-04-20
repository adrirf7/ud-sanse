import './index.css'
import Navbar from './components/Navbar'
import Carousel from './components/Carousel'
import Hero from './components/Hero'
import Partidos from './components/Partidos'
import Clasificacion from './components/Clasificacion'
import Cantera from './components/Cantera'
import Noticias from './components/Noticias'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-sanse-navy text-white">
      <Navbar />
      <main>
        <Carousel />
        <Hero />
        <Partidos />
        <Clasificacion />
        <Cantera />
        <Noticias />
      </main>
      <Footer />
    </div>
  )
}

export default App

