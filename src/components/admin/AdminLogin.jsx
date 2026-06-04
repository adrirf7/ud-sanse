import { useState } from 'react';
import { Shield, Eye, EyeOff } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export default function AdminLogin() {
  const { login, setShowLogin } = useAdmin();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const ok = login(password);
    if (!ok) { setError(true); setPassword(''); }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={() => setShowLogin(false)} />
      <div className="relative z-10 w-full max-w-sm bg-[#140303] border border-white/10 rounded-2xl shadow-2xl p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mb-4">
            <Shield size={24} className="text-blue-400" />
          </div>
          <h2 className="font-display text-2xl text-white tracking-wider">ACCESO ADMIN</h2>
          <p className="text-gray-500 text-xs mt-1">Solo personal autorizado</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <input
              type={show ? 'text' : 'password'}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false); }}
              autoFocus
              className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-colors pr-10 ${error ? 'border-red-500/60' : 'border-white/10'}`}
            />
            <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {error && <p className="text-red-400 text-xs text-center">Contraseña incorrecta</p>}

          <button type="submit" className="py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-full transition-all duration-200 hover:scale-105 active:scale-95">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
