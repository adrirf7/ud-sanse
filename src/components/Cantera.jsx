import escudo from '../assets/img/Escudo_UDSanse.png';
import campoBg from '../assets/img/campo-udSanse.jpg';

export default function Cantera() {
  return (
    <section id="cantera" className="relative overflow-hidden py-16">
      {/* Foto del campo como fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${campoBg})` }}
      />
      {/* Overlay oscuro para legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0202]/92 via-[#1a0404]/85 to-[#2a0606]/90" />

      {/* Vignette lateral */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-sanse-navy to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-sanse-navy to-transparent pointer-events-none" />

      {/* Decorative blobs */}
      <div className="absolute top-[-80px] left-[-80px] w-[420px] h-[420px] rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-60px] right-[-60px] w-[360px] h-[360px] rounded-full bg-blue-800/10 blur-3xl pointer-events-none" />

      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-600/50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Escudo */}
        <div className="relative inline-flex items-center justify-center mb-8">
          <div className="absolute w-[220px] h-[220px] rounded-full border border-blue-600/15" style={{ animation: 'spin 30s linear infinite' }} />
          <div className="absolute w-[180px] h-[180px] rounded-full border border-blue-600/10" style={{ animation: 'spin 20s linear infinite reverse' }} />
          <div className="absolute w-36 h-36 rounded-full bg-blue-600/10 blur-2xl" />
          <img src={escudo} alt="Escudo UD Sanse Cantera" className="relative w-36 h-36 object-contain drop-shadow-[0_0_40px_rgba(204,0,0,0.5)]" />
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-300 text-xs font-semibold tracking-widest uppercase mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          Temporada 2025/26
        </div>

        {/* Título */}
        <h2 className="font-display text-[clamp(4rem,12vw,8rem)] leading-none text-white tracking-wider mb-4">
          CAN<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">TERA</span>
        </h2>

        <div className="section-divider mb-6 max-w-xs mx-auto" />

        {/* Descripción */}
        <p className="text-gray-300 text-lg font-light leading-relaxed mb-10 max-w-md mx-auto">
          Tu sueño empieza aquí. Únete a la familia del Sanse y demuestra lo que vales.
        </p>

        {/* Botones */}
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="https://www.ud-sanse.com/2025/06/07/ya-disponible-las-inscripciones-para-la-temporada-25-26-de-la-cantera-ud-sanse/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-blue-600/30"
          >
            Únete
          </a>
          <a
            href="https://www.ud-sanse.com/elementor-4198/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 glass text-white font-semibold rounded-full transition-all duration-300 hover:bg-white/10 hover:scale-105 active:scale-95 border border-white/15"
          >
            Solicitar Prueba
          </a>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-600/50 to-transparent" />
    </section>
  );
}
