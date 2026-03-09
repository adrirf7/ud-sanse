import { Calendar, MapPin, ChevronDown } from 'lucide-react';

const nextMatch = {
  fecha: "15 Mar 2026",
  hora: "12:00h",
  local: "Las Palmas Atlético",
  visitante: "UD Sanse",
  estadio: 'Anexo "Gran Canaria"',
  competicion: "2ª RFEF · J27",
};

export default function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex flex-col justify-center overflow-hidden hero-gradient">
      {/* Decorative particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="particle-1 absolute top-[15%] left-[8%] w-64 h-64 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="particle-2 absolute bottom-[20%] right-[6%] w-80 h-80 rounded-full bg-blue-800/10 blur-3xl" />
        <div className="particle-3 absolute top-[50%] left-[50%] w-96 h-96 rounded-full bg-blue-500/5 blur-3xl -translate-x-1/2 -translate-y-1/2" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        {/* Top vignette */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-sanse-navy/60 to-transparent" />
        {/* Bottom vignette */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-sanse-navy to-transparent" />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 flex flex-col lg:flex-row items-center gap-16 lg:gap-12">
        {/* Left: Title */}
        <div className="flex-1 text-center lg:text-left">
          {/* Badge */}
          <div className="reveal-1 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-300 text-xs font-semibold tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Segunda RFEF · Temporada 2025/26
          </div>

          {/* Club name */}
          <h1 className="reveal-2 font-display text-[clamp(4rem,14vw,9rem)] leading-none text-white tracking-wider mb-4">
            UD{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">
              SANSE
            </span>
          </h1>

          {/* Tagline */}
          <p className="reveal-3 text-lg sm:text-xl text-gray-300 font-light tracking-widest uppercase mb-10">
            La Unión es Nuestra Fuerza
          </p>

          {/* CTA buttons */}
          <div className="reveal-4 flex flex-wrap gap-4 justify-center lg:justify-start">
            <a
              href="#resultados"
              className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-blue-600/30"
            >
              Ver Resultados
            </a>
            <a
              href="#noticias"
              className="px-8 py-3.5 glass text-white font-semibold rounded-full transition-all duration-300 hover:bg-white/10 hover:scale-105 active:scale-95 border border-white/15"
            >
              Últimas Noticias
            </a>
          </div>

          {/* Quick stats */}
          <div className="reveal-4 mt-12 flex flex-wrap gap-8 justify-center lg:justify-start">
            {[
              { label: 'Puntos', value: '53', color: 'text-blue-300' },
              { label: 'Posición', value: '2º', color: 'text-yellow-300' },
              { label: 'Jornada', value: '26', color: 'text-blue-300' },
            ].map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <div className={`font-display text-4xl ${stat.color}`}>{stat.value}</div>
                <div className="text-xs text-gray-400 tracking-widest uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Next match card */}
        <div className="reveal-3 flex-shrink-0 w-full max-w-sm">
          <div className="glass rounded-2xl p-6 border border-blue-500/20 upcoming-pulse shadow-2xl shadow-blue-900/30">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-bold tracking-widest uppercase text-blue-400">
                Próximo Partido
              </span>
              <span className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded-full">
                {nextMatch.competicion}
              </span>
            </div>

            {/* Teams */}
            <div className="flex items-center justify-between gap-4 mb-6">
              <TeamBadge name={nextMatch.local} />
              <div className="text-center flex-shrink-0">
                <div className="vs-glow font-display text-3xl text-blue-300 leading-none">VS</div>
              </div>
              <TeamBadge name={nextMatch.visitante} highlight />
            </div>

            {/* Info */}
            <div className="section-divider mb-4" />
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Calendar size={14} className="text-blue-400 flex-shrink-0" />
                <span>{nextMatch.fecha} · {nextMatch.hora}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <MapPin size={14} className="text-blue-400 flex-shrink-0" />
                <span>{nextMatch.estadio}</span>
              </div>
            </div>

            {/* Buy ticket button */}
            <a
              href="https://sanse.deporges.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 block text-center py-3 bg-blue-600/80 hover:bg-blue-600 text-white text-sm font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02]"
            >
              Comprar Entradas
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-500 animate-bounce">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown size={16} />
      </div>
    </section>
  );
}

function TeamBadge({ name, highlight }) {
  const initials = name
    .split(' ')
    .filter((w) => w.length > 2)
    .slice(0, 2)
    .map((w) => w[0])
    .join('');

  return (
    <div className="flex flex-col items-center gap-2 flex-1">
      <div
        className={`w-14 h-14 rounded-full flex items-center justify-center text-sm font-bold border-2 ${
          highlight
            ? 'bg-blue-600/30 border-blue-400/60 text-white'
            : 'bg-white/5 border-white/10 text-gray-300'
        }`}
      >
        {initials}
      </div>
      <span className={`text-xs font-medium text-center leading-tight ${highlight ? 'text-white' : 'text-gray-400'}`}>
        {name}
      </span>
    </div>
  );
}
