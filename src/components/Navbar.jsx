import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import escudo from '../assets/img/Escudo_UDSanse.png';

const navItems = [
  { label: 'Inicio', href: '#inicio' },
  {
    label: 'Club',
    dropdown: [
      { label: 'Historia', href: 'https://www.ud-sanse.com/el-club/historia/', external: true },
      { label: 'Organigrama', href: 'https://www.ud-sanse.com/el-club/organigrama/', external: true },
      { label: 'Instalaciones', href: 'https://www.ud-sanse.com/el-club/instalaciones/', external: true },
      { label: 'Cantera', href: '#cantera' },
    ],
  },
  {
    label: 'Primer Equipo',
    dropdown: [
      { label: 'Primera Plantilla', href: 'https://www.ud-sanse.com/primer-equipo/primera-plantilla/', external: true },
      { label: 'Cuerpo Técnico', href: 'https://www.ud-sanse.com/primer-equipo/cuerpo-tecnico/', external: true },
      { label: 'Resultados', href: '#resultados' },
      { label: 'Clasificación', href: '#clasificacion' },
    ],
  },
  { label: 'Noticias', href: '#noticias' },
  { label: 'Tienda', href: 'https://www.ud-sanse.com/tienda/', external: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const closeTimer = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (label) => {
    clearTimeout(closeTimer.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
    setMobileExpanded(null);
    setActiveDropdown(null);
  };

  const toggleMobile = (label) =>
    setMobileExpanded((prev) => (prev === label ? null : label));

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'navbar-solid py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#inicio" className="flex items-center gap-3 group" onClick={handleLinkClick}>
          <div className="w-10 h-10 flex items-center justify-center">
            <img src={escudo} alt="Escudo UD Sanse" className="w-full h-full object-contain" />
          </div>
          <div className="hidden sm:block">
            <span className="font-display text-white text-xl tracking-widest">UD SANSE</span>
            <p className="text-xs text-blue-400/70 tracking-widest uppercase leading-none">San Sebastián de los Reyes</p>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) =>
            item.dropdown ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                <button className="relative flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 group">
                  {item.label}
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`}
                  />
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-blue-500 rounded transition-all duration-300 group-hover:w-3/4" />
                </button>

                {/* Dropdown panel */}
                {activeDropdown === item.label && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 rounded-xl overflow-hidden shadow-2xl shadow-black/40 border border-white/8 navbar-solid">
                    {item.dropdown.map((sub) => (
                      <a
                        key={sub.label}
                        href={sub.href}
                        target={sub.external ? '_blank' : undefined}
                        rel={sub.external ? 'noopener noreferrer' : undefined}
                        onClick={handleLinkClick}
                        className="block px-5 py-3 text-sm text-gray-300 hover:text-white hover:bg-blue-600/20 transition-colors duration-150"
                      >
                        {sub.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                onClick={handleLinkClick}
                className="relative px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 group"
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-blue-500 rounded transition-all duration-300 group-hover:w-3/4" />
              </a>
            )
          )}

          <a
            href="https://sanse.deporges.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Comprar Entradas
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Menú"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden menu-slide navbar-solid border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navItems.map((item) =>
              item.dropdown ? (
                <div key={item.label}>
                  <button
                    onClick={() => toggleMobile(item.label)}
                    className="w-full flex items-center justify-between px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors font-medium"
                  >
                    {item.label}
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${mobileExpanded === item.label ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {mobileExpanded === item.label && (
                    <div className="ml-4 mt-1 flex flex-col gap-1 border-l border-blue-600/30 pl-4">
                      {item.dropdown.map((sub) => (
                        <a
                          key={sub.label}
                          href={sub.href}
                          target={sub.external ? '_blank' : undefined}
                          rel={sub.external ? 'noopener noreferrer' : undefined}
                          onClick={handleLinkClick}
                          className="px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                        >
                          {sub.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  onClick={handleLinkClick}
                  className="px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors font-medium"
                >
                  {item.label}
                </a>
              )
            )}
            <a
              href="https://sanse.deporges.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg text-center transition-colors"
            >
              Comprar Entradas
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
