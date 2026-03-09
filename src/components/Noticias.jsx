import { useRef, useEffect, useState } from 'react';
import { CalendarDays, Tag, ChevronRight, Plus } from 'lucide-react';
import { noticias } from '../data/mockData';

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

const categoryColors = {
  Cantera:     'bg-green-500/15 text-green-400 border-green-500/25',
  Comunicado:  'bg-yellow-500/15 text-yellow-400 border-yellow-500/25',
  Plantilla:   'bg-blue-500/15 text-blue-400 border-blue-500/25',
  Club:        'bg-purple-500/15 text-purple-400 border-purple-500/25',
  Crónica:     'bg-orange-500/15 text-orange-400 border-orange-500/25',
};

function CategoryBadge({ categoria }) {
  const cls = categoryColors[categoria] ?? 'bg-white/10 text-gray-400 border-white/15';
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${cls}`}>
      <Tag size={10} />
      {categoria}
    </span>
  );
}

function FeaturedCard({ noticia, visible }) {
  return (
    <div className={`fade-up ${visible ? 'visible' : ''} news-card group relative rounded-2xl overflow-hidden cursor-pointer`}>
      <div className="news-img-wrap aspect-[16/9] sm:aspect-[16/8]">
        <img
          src={noticia.imagen}
          alt={noticia.titulo}
          className="news-img w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-1.5 h-5 rounded-full bg-blue-500" />
          <CategoryBadge categoria={noticia.categoria} />
        </div>
        <h3 className="news-card-title text-xl sm:text-2xl font-bold text-white leading-snug mb-3 line-clamp-3">
          {noticia.titulo}
        </h3>
        <p className="text-gray-300 text-sm leading-relaxed line-clamp-2 mb-4">{noticia.resumen}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <CalendarDays size={12} />
            <span>{noticia.fecha}</span>
          </div>
          <span className="flex items-center gap-1 text-blue-400 text-sm font-medium group-hover:gap-2 transition-all">
            Leer más <ChevronRight size={14} />
          </span>
        </div>
      </div>
    </div>
  );
}

function SmallCard({ noticia, delay, visible }) {
  return (
    <div className={`fade-up delay-${delay} ${visible ? 'visible' : ''} news-card group glass rounded-2xl overflow-hidden border border-white/5 hover:border-blue-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/20 cursor-pointer flex flex-col`}>
      <div className="news-img-wrap h-44 flex-shrink-0">
        <img
          src={noticia.imagen}
          alt={noticia.titulo}
          className="news-img w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <CategoryBadge categoria={noticia.categoria} />
          <span className="text-xs text-gray-500">{noticia.fecha}</span>
        </div>
        <h3 className="news-card-title text-sm font-bold text-white leading-snug flex-1 line-clamp-3 mb-3">
          {noticia.titulo}
        </h3>
        <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 mb-4">{noticia.resumen}</p>
        <span className="flex items-center gap-1 text-blue-400 text-xs font-medium mt-auto group-hover:gap-2 transition-all">
          Leer más <ChevronRight size={12} />
        </span>
      </div>
    </div>
  );
}

export default function Noticias() {
  const [sectionRef, visible] = useInView();
  const [filter, setFilter] = useState('Todos');

  const categorias = ['Todos', ...Array.from(new Set(noticias.map((n) => n.categoria)))];
  const filtradas = filter === 'Todos' ? noticias : noticias.filter((n) => n.categoria === filter);
  const destacada = filtradas[0];
  const resto = filtradas.slice(1);

  return (
    <section id="noticias" ref={sectionRef} className="py-24 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px section-divider" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`fade-up ${visible ? 'visible' : ''} flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10`}>
          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-blue-400 mb-3 block">
              Actualidad Sansera
            </span>
            <h2 className="font-display text-5xl sm:text-6xl text-white tracking-wider">
              NOTICIAS
            </h2>
          </div>

          {/* Admin placeholder */}
          <button
            disabled
            title="Próximamente disponible"
            className="flex items-center gap-2 px-5 py-2.5 glass text-gray-500 text-sm font-medium rounded-full border border-white/10 cursor-not-allowed"
          >
            <Plus size={15} />
            Añadir noticia
            <span className="text-xs bg-blue-600/20 text-blue-400 border border-blue-500/25 px-1.5 py-0.5 rounded-full">Pronto</span>
          </button>
        </div>

        {/* Category filter */}
        <div className={`fade-up delay-1 ${visible ? 'visible' : ''} flex flex-wrap gap-2 mb-10`}>
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                filter === cat
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                  : 'glass text-gray-400 hover:text-white border border-white/5 hover:border-blue-500/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtradas.length > 0 ? (
          <>
            {/* Featured */}
            {destacada && <div className="mb-8">
              <FeaturedCard noticia={destacada} visible={visible} />
            </div>}

            {/* Grid rest */}
            {resto.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {resto.map((n, i) => (
                  <SmallCard key={n.id} noticia={n} delay={Math.min(i + 1, 5)} visible={visible} />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="glass rounded-2xl p-16 text-center border border-white/5">
            <p className="text-gray-400">No hay noticias en esta categoría todavía.</p>
          </div>
        )}

        {/* Placeholder banner */}
        <div className={`fade-up delay-3 ${visible ? 'visible' : ''} mt-12 glass rounded-2xl border border-dashed border-blue-500/25 p-8 text-center`}>
          <div className="w-12 h-12 rounded-full bg-blue-600/15 border border-blue-500/25 flex items-center justify-center mx-auto mb-4">
            <Plus size={22} className="text-blue-400" />
          </div>
          <h3 className="text-white font-semibold mb-2">Panel de administración de noticias</h3>
          <p className="text-gray-400 text-sm max-w-md mx-auto">
            Próximamente podrás añadir, editar y publicar noticias directamente desde aquí sin necesidad de código.
          </p>
        </div>
      </div>
    </section>
  );
}
