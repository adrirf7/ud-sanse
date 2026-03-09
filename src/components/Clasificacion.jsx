import { useRef, useEffect, useState } from 'react';
import { TrendingUp, Minus, TrendingDown } from 'lucide-react';
import { clasificacion } from '../data/mockData';

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function FormaCircle({ result }) {
  const map = {
    W: 'bg-green-500/20 text-green-400 border-green-500/30',
    D: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    L: 'bg-red-500/20 text-red-400 border-red-500/30',
  };
  return (
    <span className={`inline-flex w-5 h-5 items-center justify-center rounded-full text-[10px] font-bold border ${map[result] ?? 'bg-white/5 text-gray-500 border-white/10'}`}>
      {result === 'W' ? 'V' : result === 'D' ? 'E' : 'D'}
    </span>
  );
}

function PosIcon({ tipo }) {
  if (tipo === 'promotion') return <TrendingUp size={12} className="text-green-400" />;
  if (tipo === 'playoff') return <Minus size={12} className="text-yellow-400" />;
  if (tipo === 'relegation') return <TrendingDown size={12} className="text-red-400" />;
  return null;
}

export default function Clasificacion() {
  const [sectionRef, visible] = useInView();
  const [showAll, setShowAll] = useState(false);

  const displayed = showAll ? clasificacion : clasificacion.slice(0, 10);

  return (
    <section id="clasificacion" ref={sectionRef} className="py-24 bg-sanse-dark relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px section-divider" />
        <div className="absolute bottom-0 left-0 right-0 h-px section-divider" />
        <div className="absolute -top-px left-0 right-0 h-48 bg-gradient-to-b from-sanse-navy to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`fade-up ${visible ? 'visible' : ''} text-center mb-12`}>
          <span className="text-xs font-bold tracking-widest uppercase text-blue-400 mb-3 block">
            Temporada 2025/26
          </span>
          <h2 className="font-display text-5xl sm:text-6xl text-white tracking-wider mb-4">
            CLASIFICACIÓN
          </h2>
          <p className="text-gray-400 text-sm">Segunda RFEF · Grupo 5</p>
          <div className="mx-auto mt-4 w-20 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
        </div>

        {/* Legend */}
        <div className={`fade-up delay-1 ${visible ? 'visible' : ''} flex flex-wrap justify-center gap-6 mb-8 text-xs`}>
          {[
            { dot: 'bg-green-500', label: 'Ascenso directo' },
            { dot: 'bg-yellow-500', label: 'Play-off ascenso' },
            { dot: 'bg-red-500', label: 'Descenso' },
          ].map(({ dot, label }) => (
            <div key={label} className="flex items-center gap-2 text-gray-400">
              <span className={`w-2.5 h-2.5 rounded-full ${dot}`} />
              {label}
            </div>
          ))}
        </div>

        {/* Table wrapper */}
        <div className={`fade-up delay-2 ${visible ? 'visible' : ''} glass rounded-2xl border border-white/5 overflow-hidden`}>
          {/* Table header */}
          <div className="hidden sm:grid grid-cols-[40px_1fr_40px_40px_40px_40px_40px_40px_60px_auto] gap-2 px-4 py-3 text-xs font-bold uppercase tracking-widest text-gray-500 border-b border-white/5">
            <span className="text-center">#</span>
            <span>Equipo</span>
            <span className="text-center">PJ</span>
            <span className="text-center">G</span>
            <span className="text-center">E</span>
            <span className="text-center">P</span>
            <span className="text-center">GF</span>
            <span className="text-center">GC</span>
            <span className="text-center font-bold text-gray-300">Pts</span>
            <span className="text-right">Forma</span>
          </div>

          {/* Rows */}
          {displayed.map((eq, i) => {
            const rowCls = eq.esEquipo ? 'table-highlight' : (eq.tipo ? `pos-${eq.tipo}` : '');
            return (
              <div
                key={eq.equipo}
                style={{ transitionDelay: visible ? `${(i + 3) * 60}ms` : '0ms' }}
                className={`fade-up ${visible ? 'visible' : ''} grid grid-cols-[32px_1fr_auto] sm:grid-cols-[40px_1fr_40px_40px_40px_40px_40px_40px_60px_auto] gap-2 items-center px-4 py-3 border-b border-white/5 last:border-0 transition-colors duration-200 hover:bg-white/[0.03] ${rowCls} ${eq.esEquipo ? '' : ''}`}
              >
                {/* Pos */}
                <div className="flex items-center justify-center gap-1">
                  <PosIcon tipo={eq.tipo} />
                  <span className={`text-sm font-bold ${eq.esEquipo ? 'text-blue-300' : 'text-gray-400'}`}>
                    {eq.pos}
                  </span>
                </div>

                {/* Equipo */}
                <div className="flex items-center gap-2 min-w-0">
                  <div className={`w-7 h-7 rounded-full border flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
                    eq.esEquipo ? 'bg-blue-600/30 border-blue-400/50 text-white' : 'bg-white/5 border-white/10 text-gray-400'
                  }`}>
                    {eq.equipo.split(' ').filter(w => w.length > 2).slice(0, 2).map(w => w[0]).join('') || eq.equipo.slice(0, 2).toUpperCase()}
                  </div>
                  <span className={`text-sm truncate ${eq.esEquipo ? 'text-white font-bold' : 'text-gray-200'}`}>
                    {eq.equipo}
                    {eq.esEquipo && (
                      <span className="hidden sm:inline ml-2 text-xs text-blue-400 font-normal">(Tú)</span>
                    )}
                  </span>
                </div>

                {/* Mobile: Pts only */}
                <div className="sm:hidden text-right">
                  <span className={`text-base font-bold ${eq.esEquipo ? 'text-blue-300' : 'text-white'}`}>{eq.pts}</span>
                  <span className="text-xs text-gray-500 ml-1">pts</span>
                </div>

                {/* Desktop stats */}
                <span className="hidden sm:block text-center text-sm text-gray-400">{eq.pj}</span>
                <span className="hidden sm:block text-center text-sm text-green-400/80">{eq.g}</span>
                <span className="hidden sm:block text-center text-sm text-yellow-400/80">{eq.e}</span>
                <span className="hidden sm:block text-center text-sm text-red-400/80">{eq.p}</span>
                <span className="hidden sm:block text-center text-sm text-gray-400">{eq.gf}</span>
                <span className="hidden sm:block text-center text-sm text-gray-400">{eq.gc}</span>
                <span className={`hidden sm:block text-center text-base font-extrabold ${eq.esEquipo ? 'text-blue-300' : 'text-white'}`}>
                  {eq.pts}
                </span>

                {/* Forma */}
                <div className="hidden sm:flex gap-1 justify-end">
                  {eq.forma.map((r, j) => (
                    <FormaCircle key={j} result={r} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Show more/less */}
        <div className={`fade-up delay-3 ${visible ? 'visible' : ''} flex justify-center mt-6`}>
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2.5 glass border border-white/10 hover:border-blue-500/30 text-gray-300 hover:text-white text-sm font-medium rounded-full transition-all duration-300 hover:bg-blue-600/10"
          >
            {showAll ? 'Ver menos' : `Ver todos los equipos (${clasificacion.length})`}
          </button>
        </div>

        {/* Note */}
        <p className="text-center text-xs text-gray-600 mt-4">
          Datos actualizados a la jornada 26 · Próximamente conectado a la API oficial
        </p>
      </div>
    </section>
  );
}
