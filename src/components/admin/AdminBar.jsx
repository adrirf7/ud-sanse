import { useState } from 'react';
import { Shield, RotateCcw, LogOut, Upload, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { useData } from '../../context/DataContext';
import { syncToGitHub } from '../../utils/githubSync';

export default function AdminBar() {
  const { isAdmin, logout } = useAdmin();
  const { noticias, proximosPartidos, clasificacion, resultados, resetAll } = useData();
  const [syncState, setSyncState] = useState('idle'); // idle | loading | ok | error
  const [errorMsg, setErrorMsg] = useState('');

  if (!isAdmin) return null;

  const handleReset = () => {
    if (confirm('¿Restaurar todos los datos al estado original? Se perderán los cambios.')) {
      resetAll();
      setSyncState('idle');
    }
  };

  const handlePublish = async () => {
    setSyncState('loading');
    setErrorMsg('');
    const result = await syncToGitHub({ noticias, proximosPartidos, clasificacion, resultados });
    if (result.ok) {
      setSyncState('ok');
      setTimeout(() => setSyncState('idle'), 4000);
    } else {
      setSyncState('error');
      setErrorMsg(result.error);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[150] bg-[#1a0000]/95 backdrop-blur-md border-t border-blue-600/30 py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Estado */}
        <div className="flex items-center gap-2 text-blue-400">
          <Shield size={15} />
          <span className="text-xs font-bold tracking-widest uppercase">Modo Admin activo</span>
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        </div>

        {/* Acciones */}
        <div className="flex items-center gap-2">
          {/* Feedback sync */}
          {syncState === 'ok' && (
            <span className="flex items-center gap-1.5 text-xs text-green-400">
              <CheckCircle size={13} /> Publicado correctamente
            </span>
          )}
          {syncState === 'error' && (
            <span className="flex items-center gap-1.5 text-xs text-red-400" title={errorMsg}>
              <AlertCircle size={13} /> Error al publicar
            </span>
          )}

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-colors"
          >
            <RotateCcw size={12} />
            Restaurar datos
          </button>

          <button
            onClick={handlePublish}
            disabled={syncState === 'loading'}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-green-700/40 hover:bg-green-600/60 border border-green-500/40 rounded-full transition-colors disabled:opacity-50"
          >
            {syncState === 'loading'
              ? <><Loader size={12} className="animate-spin" /> Publicando...</>
              : <><Upload size={12} /> Publicar cambios</>}
          </button>

          <button
            onClick={logout}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/30 rounded-full transition-colors"
          >
            <LogOut size={12} />
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
}
