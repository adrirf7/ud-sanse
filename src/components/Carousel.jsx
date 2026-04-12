import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    image: 'https://picsum.photos/seed/stadium1/1920/800',
    tag: 'Casa de la UD Sanse',
    title: 'ESTADIO MATAPIÑONERA',
    subtitle: 'Un fortín en San Sebastián de los Reyes donde el equipo defiende cada partido con orgullo.',
  },
  {
    id: 2,
    image: 'https://picsum.photos/seed/football42/1920/800',
    tag: '2ª Posición · 53 Puntos',
    title: 'TEMPORADA 2025/26',
    subtitle: 'Segunda RFEF · Grupo 5 · Una temporada histórica en busca del ascenso.',
  },
  {
    id: 3,
    image: 'https://picsum.photos/seed/crowd77/1920/800',
    tag: 'Siempre con el equipo',
    title: 'LA AFICIÓN SANSERA',
    subtitle: 'La unión es nuestra fuerza. Los aficionados, el motor que impulsa a este club.',
  },
  {
    id: 4,
    image: 'https://picsum.photos/seed/sport55/1920/800',
    tag: 'Temporada histórica',
    title: 'EL ASCENSO ES NUESTRO',
    subtitle: 'Luchando partido a partido por regresar a las categorías de élite del fútbol español.',
  },
  {
    id: 5,
    image: 'https://picsum.photos/seed/youth88/1920/800',
    tag: 'Pruebas abiertas 2026/27',
    title: 'CANTERA SANSERA',
    subtitle: 'Formando los talentos del mañana. El futuro del club empieza desde la base.',
  },
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [paused, next]);

  return (
    <div
      className="relative w-full overflow-hidden bg-black"
      style={{ height: 'clamp(300px, 55vw, 640px)' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
            loading={i === 0 ? 'eager' : 'lazy'}
          />
          {/* Dark overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 w-full pt-16">
              <div
                className={`transition-all duration-700 delay-150 ${
                  i === current ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                }`}
              >
                {/* Tag badge */}
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-800/50 border border-red-500/50 text-red-200 text-xs font-semibold tracking-widest uppercase mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                  {slide.tag}
                </span>

                {/* Title */}
                <h2 className="font-display text-[clamp(2.4rem,6.5vw,5.5rem)] leading-none text-white tracking-wider mb-4 drop-shadow-2xl">
                  {slide.title}
                </h2>

                {/* Subtitle */}
                <p className="text-gray-200 text-sm sm:text-base lg:text-lg font-light tracking-wide max-w-xl leading-relaxed drop-shadow-lg">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Left arrow */}
      <button
        onClick={prev}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-red-700/70 border border-white/20 hover:border-red-500/50 flex items-center justify-center text-white transition-all duration-300 hover:scale-105"
        aria-label="Diapositiva anterior"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Right arrow */}
      <button
        onClick={next}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-red-700/70 border border-white/20 hover:border-red-500/50 flex items-center justify-center text-white transition-all duration-300 hover:scale-105"
        aria-label="Diapositiva siguiente"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current
                ? 'w-8 h-2.5 bg-red-500 shadow-lg shadow-red-500/50'
                : 'w-2.5 h-2.5 bg-white/35 hover:bg-white/65'
            }`}
            aria-label={`Ir a diapositiva ${i + 1}`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute top-20 right-5 sm:right-8 z-20 text-xs text-white/50 font-mono tracking-wider select-none">
        {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
      </div>

      {/* Bottom red accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-600 to-transparent z-20" />
    </div>
  );
}
