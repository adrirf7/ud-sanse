import { useState, useRef, useEffect } from 'react';
import { Calendar, MapPin, Clock, ChevronRight } from 'lucide-react';
import { resultados, proximosPartidos } from '../data/mockData';

function useInView(threshold = 0.15) {
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

function ResultadoBadge({ resultado }) {
  const map = { win: ['V', 'result-win'], draw: ['E', 'result-draw'], loss: ['D', 'result-loss'] };
  const [label, cls] = map[resultado] ?? ['?', 'text-gray-400'];
  return (
    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold border border-current/30 bg-current/10 ${cls}`}>
      {label}
    </span>
  );
}

function ResultCard({ partido, delay }) {
  const esSanse = (nombre) => nombre.toLowerCase().includes('sanse');
  const esSanseLocal = esSanse(partido.local);
  const resultado = partido.resultado;

  return (
    <div className={`fade-up delay-${delay} glass rounded-2xl p-5 hover:border-blue-500/30 border border-white/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/20`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-gray-500 font-medium">{partido.jornada} · {partido.competicion}</span>
        <span className="text-xs font-semibold text-gray-400">{partido.fecha}</span>
      </div>

      {/* Match */}
      <div className="flex items-center gap-3">
        {/* Local */}
        <div className={`flex-1 text-right ${esSanseLocal ? 'text-white font-semibold' : 'text-gray-400'}`}>
          <TeamAvatar name={partido.local} right />
        </div>

        {/* Score */}
        <div className="flex-shrink-0 flex items-center gap-1">
          <ScoreBox score={partido.golLocal} isWin={esSanseLocal && resultado === 'win'} />
          <span className="text-gray-600 text-sm font-bold">:</span>
          <ScoreBox score={partido.golVisitante} isWin={!esSanseLocal && resultado === 'win'} />
        </div>

        {/* Visitante */}
        <div className={`flex-1 text-left ${!esSanseLocal ? 'text-white font-semibold' : 'text-gray-400'}`}>
          <TeamAvatar name={partido.visitante} />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <MapPin size={11} />
          <span>{partido.estadio}</span>
        </div>
        <ResultadoBadge resultado={resultado} />
      </div>
    </div>
  );
}

function ScoreBox({ score, isWin }) {
  return (
    <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg font-display font-bold ${
      isWin ? 'bg-blue-600/30 text-white border border-blue-500/40' : 'bg-white/5 text-gray-300 border border-white/10'
    }`}>
      {score}
    </div>
  );
}

function TeamAvatar({ name, right }) {
  const initials = name.split(' ').filter(w => w.length > 2).slice(0, 2).map(w => w[0]).join('') || name.slice(0, 2).toUpperCase();
  return (
    <div className={`flex items-center gap-2 ${right ? 'flex-row-reverse' : ''}`}>
      <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-gray-300 flex-shrink-0">
        {initials}
      </div>
      <span className="text-sm truncate max-w-[90px]">{name}</span>
    </div>
  );
}

function ProximoCard({ partido, delay }) {
  return (
    <div className={`fade-up delay-${delay} glass rounded-2xl p-5 border ${
      partido.destacado
        ? 'border-blue-500/40 glow-blue'
        : 'border-white/5 hover:border-blue-500/20'
    } transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/20 relative overflow-hidden`}>
      {partido.destacado && (
        <div className="absolute top-3 right-3 text-xs font-bold text-blue-300 bg-blue-600/20 border border-blue-500/30 px-2 py-0.5 rounded-full">
          Partido Destacado
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-gray-500 font-medium">{partido.jornada} · {partido.competicion}</span>
      </div>

      {/* Teams */}
      <div className="flex items-center gap-4 mb-5">
        <div className="flex-1 text-right">
          <TeamAvatar name={partido.local} right />
        </div>
        <div className="flex-shrink-0 flex flex-col items-center">
          <span className="vs-glow font-display text-2xl text-blue-300">VS</span>
        </div>
        <div className="flex-1 text-left">
          <TeamAvatar name={partido.visitante} />
        </div>
      </div>

      {/* Info grid */}
      <div className="section-divider mb-3" />
      <div className="grid grid-cols-1 gap-1.5">
        <InfoRow icon={<Calendar size={12} />} text={`${partido.dia}, ${partido.fecha}`} />
        <InfoRow icon={<Clock size={12} />} text={partido.hora} />
        <InfoRow icon={<MapPin size={12} />} text={partido.estadio} />
      </div>

      {partido.esLocal && (
        <a
          href="https://sanse.deporges.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex items-center justify-center gap-2 py-2.5 bg-blue-600/80 hover:bg-blue-600 text-white text-xs font-semibold rounded-xl transition-all duration-300"
        >
          Comprar Entrada <ChevronRight size={13} />
        </a>
      )}
    </div>
  );
}

function InfoRow({ icon, text }) {
  return (
    <div className="flex items-center gap-2 text-xs text-gray-400">
      <span className="text-blue-400">{icon}</span>
      <span>{text}</span>
    </div>
  );
}

export default function Partidos() {
  const [tab, setTab] = useState('resultados');
  const [sectionRef, visible] = useInView();

  useEffect(() => {
    if (!visible) return;
    const els = document.querySelectorAll('#resultados .fade-up');
    els.forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 80);
    });
  }, [visible, tab]);

  const handleTab = (t) => {
    setTab(t);
    // Re-trigger animations for new tab content
    setTimeout(() => {
      const els = document.querySelectorAll('#resultados .fade-up');
      els.forEach((el) => el.classList.remove('visible'));
      els.forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 80 + 50);
      });
    }, 50);
  };

  return (
    <section id="resultados" ref={sectionRef} className="py-24 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px section-divider" />
        <div className="absolute bottom-0 left-0 right-0 h-px section-divider" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className={`fade-up ${visible ? 'visible' : ''} text-center mb-12`}>
          <span className="text-xs font-bold tracking-widest uppercase text-blue-400 mb-3 block">
            Segunda RFEF · Grupo 5
          </span>
          <h2 className="font-display text-5xl sm:text-6xl text-white tracking-wider mb-4">
            RESULTADOS &amp; PARTIDOS
          </h2>
          <div className="mx-auto w-20 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
        </div>

        {/* Tabs */}
        <div className={`fade-up delay-1 ${visible ? 'visible' : ''} flex justify-center mb-10`}>
          <div className="glass rounded-full p-1 flex gap-1">
            {[
              { key: 'resultados', label: 'Últimos Resultados' },
              { key: 'proximos', label: 'Próximos Partidos' },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => handleTab(key)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  tab === key
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tab === 'resultados'
            ? resultados.map((p, i) => (
                <ResultCard key={p.id} partido={p} delay={Math.min(i + 1, 5)} />
              ))
            : proximosPartidos.map((p, i) => (
                <ProximoCard key={p.id} partido={p} delay={Math.min(i + 1, 5)} />
              ))}
        </div>
      </div>
    </section>
  );
}
