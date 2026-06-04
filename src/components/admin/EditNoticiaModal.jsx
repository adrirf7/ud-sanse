import { useState } from 'react';
import Modal, { Field, inputCls, selectCls, SaveBtn } from './Modal';

const CATEGORIAS = ['Cantera', 'Comunicado', 'Plantilla', 'Club', 'Crónica'];

// dd/mm/yyyy  →  yyyy-mm-dd  (para input type="date")
function toInputDate(str) {
  if (!str) return '';
  const [d, m, y] = str.split('/');
  return `${y}-${m}-${d}`;
}

// yyyy-mm-dd  →  dd/mm/yyyy  (formato de la app)
function fromInputDate(str) {
  if (!str) return '';
  const [y, m, d] = str.split('-');
  return `${d}/${m}/${y}`;
}

function todayInputDate() {
  const now = new Date();
  const d = String(now.getDate()).padStart(2, '0');
  const m = String(now.getMonth() + 1).padStart(2, '0');
  return `${now.getFullYear()}-${m}-${d}`;
}

export default function EditNoticiaModal({ noticia, onSave, onClose }) {
  const isNew = !noticia;
  const [form, setForm] = useState(noticia ?? {
    titulo: '', resumen: '', fecha: fromInputDate(todayInputDate()), categoria: 'Club', imagen: '', destacada: false,
  });

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSave = () => {
    if (!form.titulo.trim()) return;
    onSave({ ...form, id: form.id ?? Date.now() });
    onClose();
  };

  return (
    <Modal title={isNew ? 'NUEVA NOTICIA' : 'EDITAR NOTICIA'} onClose={onClose}>
      <Field label="Título">
        <input className={inputCls} value={form.titulo} onChange={(e) => set('titulo', e.target.value)} placeholder="Título de la noticia" />
      </Field>
      <Field label="Resumen">
        <textarea className={`${inputCls} h-24 resize-none`} value={form.resumen} onChange={(e) => set('resumen', e.target.value)} placeholder="Texto breve..." />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Fecha">
          <input
            type="date"
            className={`${inputCls} cursor-pointer`}
            value={toInputDate(form.fecha)}
            onChange={(e) => set('fecha', fromInputDate(e.target.value))}
          />
        </Field>
        <Field label="Categoría">
          <select className={selectCls} value={form.categoria} onChange={(e) => set('categoria', e.target.value)}>
            {CATEGORIAS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>
      </div>
      <Field label="URL de imagen">
        <input className={inputCls} value={form.imagen} onChange={(e) => set('imagen', e.target.value)} placeholder="https://..." />
      </Field>
      <Field label="Destacada">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={form.destacada} onChange={(e) => set('destacada', e.target.checked)} className="w-4 h-4 accent-red-600" />
          <span className="text-sm text-gray-300">Mostrar como noticia principal</span>
        </label>
      </Field>
      <SaveBtn onClick={handleSave} />
    </Modal>
  );
}
