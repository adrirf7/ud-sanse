import { useState } from 'react';
import Modal, { Field, inputCls, selectCls, SaveBtn } from './Modal';

const DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

export default function EditPartidoModal({ partido, onSave, onClose, isResultado }) {
  const isNew = !partido;

  const defaultPartido = isResultado
    ? { local: '', visitante: '', fecha: '', jornada: '', golLocal: 0, golVisitante: 0, estadio: '', resultado: 'win', competicion: '2ª RFEF · Grupo 5' }
    : { local: '', visitante: '', fecha: '', dia: 'Domingo', hora: '', jornada: '', estadio: '', ciudad: '', competicion: '2ª RFEF · Grupo 5', esLocal: false };

  const [form, setForm] = useState(partido ?? defaultPartido);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSave = () => {
    if (!form.local.trim() || !form.visitante.trim()) return;
    onSave({ ...form, id: form.id ?? Date.now() });
    onClose();
  };

  return (
    <Modal title={isNew ? (isResultado ? 'NUEVO RESULTADO' : 'NUEVO PARTIDO') : (isResultado ? 'EDITAR RESULTADO' : 'EDITAR PARTIDO')} onClose={onClose}>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Equipo local">
          <input className={inputCls} value={form.local} onChange={(e) => set('local', e.target.value)} placeholder="Equipo local" />
        </Field>
        <Field label="Equipo visitante">
          <input className={inputCls} value={form.visitante} onChange={(e) => set('visitante', e.target.value)} placeholder="Equipo visitante" />
        </Field>
      </div>

      {isResultado ? (
        <div className="grid grid-cols-3 gap-4">
          <Field label="Goles local">
            <input type="number" min="0" className={inputCls} value={form.golLocal} onChange={(e) => set('golLocal', +e.target.value)} />
          </Field>
          <Field label="Goles visitante">
            <input type="number" min="0" className={inputCls} value={form.golVisitante} onChange={(e) => set('golVisitante', +e.target.value)} />
          </Field>
          <Field label="Resultado">
            <select className={selectCls} value={form.resultado} onChange={(e) => set('resultado', e.target.value)}>
              <option value="win">Victoria</option>
              <option value="draw">Empate</option>
              <option value="loss">Derrota</option>
            </select>
          </Field>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <Field label="Hora">
            <input className={inputCls} value={form.hora} onChange={(e) => set('hora', e.target.value)} placeholder="18:00h" />
          </Field>
          <Field label="Día">
            <select className={selectCls} value={form.dia} onChange={(e) => set('dia', e.target.value)}>
              {DIAS.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </Field>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <Field label="Fecha">
          <input className={inputCls} value={form.fecha} onChange={(e) => set('fecha', e.target.value)} placeholder="dd/mm/aaaa" />
        </Field>
        <Field label="Jornada">
          <input className={inputCls} value={form.jornada} onChange={(e) => set('jornada', e.target.value)} placeholder="J27" />
        </Field>
      </div>

      <Field label="Estadio">
        <input className={inputCls} value={form.estadio} onChange={(e) => set('estadio', e.target.value)} placeholder="Nombre del estadio" />
      </Field>

      {!isResultado && (
        <Field label="¿Es partido en casa?">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.esLocal} onChange={(e) => set('esLocal', e.target.checked)} className="w-4 h-4 accent-red-600" />
            <span className="text-sm text-gray-300">Partido en Matapiñonera</span>
          </label>
        </Field>
      )}

      <SaveBtn onClick={handleSave} />
    </Modal>
  );
}
