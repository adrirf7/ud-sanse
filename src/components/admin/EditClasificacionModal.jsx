import { useState } from 'react';
import Modal, { Field, inputCls, selectCls, SaveBtn } from './Modal';

export default function EditClasificacionModal({ equipo, onSave, onClose }) {
  const [form, setForm] = useState({ ...equipo, formaStr: equipo.forma.join(',') });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSave = () => {
    const forma = form.formaStr.toUpperCase().split(',').map(s => s.trim()).filter(s => ['W','D','L'].includes(s));
    onSave({ ...form, pj: +form.pj, g: +form.g, e: +form.e, p: +form.p, gf: +form.gf, gc: +form.gc, pts: +form.pts, forma });
    onClose();
  };

  return (
    <Modal title={`EDITAR · ${equipo.equipo}`} onClose={onClose}>
      <div className="grid grid-cols-4 gap-3">
        <Field label="PJ"><input type="number" min="0" className={inputCls} value={form.pj} onChange={(e) => set('pj', e.target.value)} /></Field>
        <Field label="G"><input type="number" min="0" className={inputCls} value={form.g} onChange={(e) => set('g', e.target.value)} /></Field>
        <Field label="E"><input type="number" min="0" className={inputCls} value={form.e} onChange={(e) => set('e', e.target.value)} /></Field>
        <Field label="P"><input type="number" min="0" className={inputCls} value={form.p} onChange={(e) => set('p', e.target.value)} /></Field>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <Field label="GF"><input type="number" min="0" className={inputCls} value={form.gf} onChange={(e) => set('gf', e.target.value)} /></Field>
        <Field label="GC"><input type="number" min="0" className={inputCls} value={form.gc} onChange={(e) => set('gc', e.target.value)} /></Field>
        <Field label="Pts"><input type="number" min="0" className={inputCls} value={form.pts} onChange={(e) => set('pts', e.target.value)} /></Field>
      </div>
      <Field label="Posición">
        <input type="number" min="1" className={inputCls} value={form.pos} onChange={(e) => set('pos', +e.target.value)} />
      </Field>
      <Field label="Forma (W, D o L separados por coma)">
        <input className={inputCls} value={form.formaStr} onChange={(e) => set('formaStr', e.target.value)} placeholder="W,D,W,L,W" />
        <p className="text-xs text-gray-600 mt-1">W = victoria · D = empate · L = derrota</p>
      </Field>
      <Field label="Zona">
        <select className={selectCls} value={form.tipo ?? ''} onChange={(e) => set('tipo', e.target.value || null)}>
          <option value="">Sin zona</option>
          <option value="promotion">Ascenso directo</option>
          <option value="playoff">Play-off ascenso</option>
          <option value="relegation">Descenso</option>
        </select>
      </Field>
      <SaveBtn onClick={handleSave} />
    </Modal>
  );
}
