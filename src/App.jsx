import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Partidos from './components/Partidos'
import Clasificacion from './components/Clasificacion'
import Noticias from './components/Noticias'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-sanse-navy text-white">
      <Navbar />
      <main>
        <Hero />
        <Partidos />
        <Clasificacion />
        <Noticias />
      </main>
      <Footer />
    </div>
  )
}

export default App

