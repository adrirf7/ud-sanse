import { X } from 'lucide-react';

export default function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg bg-[#140303] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/8">
          <h3 className="font-display text-xl text-white tracking-wider">{title}</h3>
          <button onClick={onClose} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
            <X size={18} className="text-gray-400" />
          </button>
        </div>
        <div className="p-6 max-h-[80vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

export function Field({ label, children }) {
  return (
    <div className="mb-4">
      <label className="block text-xs text-gray-400 tracking-widest uppercase mb-1.5">{label}</label>
      {children}
    </div>
  );
}

export const inputCls = 'w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-colors [color-scheme:dark]';
export const selectCls = 'w-full bg-[#1e0505] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-colors cursor-pointer appearance-none [color-scheme:dark]';

export function SaveBtn({ onClick, loading }) {
  return (
    <div className="flex justify-end gap-3 mt-6">
      <button
        onClick={onClick}
        disabled={loading}
        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-full transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50"
      >
        Guardar
      </button>
    </div>
  );
}
