import './index.css'
import Navbar from './components/Navbar'
import Carousel from './components/Carousel'
import Hero from './components/Hero'
import Partidos from './components/Partidos'
import Clasificacion from './components/Clasificacion'
import Cantera from './components/Cantera'
import Noticias from './components/Noticias'
import Footer from './components/Footer'
import AdminBar from './components/admin/AdminBar'
import AdminLogin from './components/admin/AdminLogin'
import { AdminProvider } from './context/AdminContext'
import { DataProvider } from './context/DataContext'
import { useAdmin } from './context/AdminContext'

function AppContent() {
  const { showLogin } = useAdmin();
  return (
    <div className="min-h-screen bg-sanse-navy text-white pb-14">
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
      <AdminBar />
      {showLogin && <AdminLogin />}
    </div>
  );
}

function App() {
  return (
    <DataProvider>
      <AdminProvider>
        <AppContent />
      </AdminProvider>
    </DataProvider>
  );
}

export default App
