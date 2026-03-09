import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone, ExternalLink } from 'lucide-react';

const socialLinks = [
  { icon: Facebook, href: 'https://www.facebook.com/people/UD-Sanse', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com/UDSanse', label: 'Twitter / X' },
  { icon: Instagram, href: 'https://www.instagram.com/u.d.sanse/', label: 'Instagram' },
  { icon: Youtube, href: 'https://www.youtube.com/@udsanse6371/videos', label: 'YouTube' },
];

const quickLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Resultados', href: '#resultados' },
  { label: 'Clasificación', href: '#clasificacion' },
  { label: 'Noticias', href: '#noticias' },
  { label: 'Compra tu entrada', href: 'https://sanse.deporges.com/', external: true },
];

const clubLinks = [
  { label: 'Historia del Club', href: 'https://www.ud-sanse.com/el-club/historia/', external: true },
  { label: 'Cantera 2025/26', href: 'https://www.ud-sanse.com/', external: true },
  { label: 'Estadio Matapiñonera', href: '#inicio' },
];

export default function Footer() {
  return (
    <footer className="relative bg-sanse-dark border-t border-white/5 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-blue-900/10 blur-3xl translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top: main content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-16 border-b border-white/5">
          
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-900 border-2 border-blue-400/40 flex items-center justify-center glow-blue">
                <span className="font-display text-white text-sm tracking-wider">UDS</span>
              </div>
              <div>
                <span className="font-display text-white text-2xl tracking-widest block leading-none">UD SANSE</span>
                <span className="text-xs text-blue-400/70 tracking-widest uppercase">Desde 1973</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Unión Deportiva San Sebastián de los Reyes. Segunda RFEF, Grupo 5. La unión es nuestra fuerza.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full glass border border-white/10 hover:border-blue-500/40 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 hover:-translate-y-0.5"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-widest uppercase mb-5">Navegación</h4>
            <ul className="space-y-3">
              {quickLinks.map(({ label, href, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-blue-300 transition-colors group"
                  >
                    <span className="w-1 h-1 rounded-full bg-blue-600/50 group-hover:bg-blue-400 transition-colors" />
                    {label}
                    {external && <ExternalLink size={10} className="opacity-50" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Club links */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-widest uppercase mb-5">El Club</h4>
            <ul className="space-y-3">
              {clubLinks.map(({ label, href, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-blue-300 transition-colors group"
                  >
                    <span className="w-1 h-1 rounded-full bg-blue-600/50 group-hover:bg-blue-400 transition-colors" />
                    {label}
                    {external && <ExternalLink size={10} className="opacity-50" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-widest uppercase mb-5">Contacto</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:info@ud-sanse.com"
                  className="flex items-start gap-3 text-sm text-gray-400 hover:text-blue-300 transition-colors"
                >
                  <Mail size={15} className="text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>info@ud-sanse.com</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin size={15} className="text-blue-500 mt-0.5 flex-shrink-0" />
                <span>Estadio Municipal Matapiñonera<br />San Sebastián de los Reyes, Madrid</span>
              </li>
            </ul>

            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@ud.sanse"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 px-4 py-2 glass border border-white/10 hover:border-pink-500/30 text-gray-400 hover:text-pink-300 text-xs font-medium rounded-full transition-all duration-300"
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.5a8.27 8.27 0 0 0 4.83 1.55V6.6a4.85 4.85 0 0 1-1.06-.09z"/>
              </svg>
              TikTok · @ud.sanse
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <span>© {new Date().getFullYear()} UD Sanse · Todos los derechos reservados</span>
          <span className="text-center">
            Diseño web moderno · Segunda RFEF Grupo 5 · Temporada 2025/26
          </span>
          <span>Conectado con API oficial próximamente</span>
        </div>
      </div>
    </footer>
  );
}
