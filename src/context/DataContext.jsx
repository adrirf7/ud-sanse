import { createContext, useContext, useState } from 'react';
import {
  noticias as defaultNoticias,
  proximosPartidos as defaultProximos,
  clasificacion as defaultClasificacion,
  resultados as defaultResultados,
} from '../data/mockData';

const DataContext = createContext(null);

function load(key, def) {
  try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : def; } catch { return def; }
}
function save(key, val) { localStorage.setItem(key, JSON.stringify(val)); }

export function DataProvider({ children }) {
  const [noticias, _setNoticias] = useState(() => load('sanse_noticias', defaultNoticias));
  const [proximosPartidos, _setProximos] = useState(() => load('sanse_proximos', defaultProximos));
  const [clasificacion, _setClasificacion] = useState(() => load('sanse_clasificacion', defaultClasificacion));
  const [resultados, _setResultados] = useState(() => load('sanse_resultados', defaultResultados));

  const setNoticias = (v) => { _setNoticias(v); save('sanse_noticias', v); };
  const setProximos = (v) => { _setProximos(v); save('sanse_proximos', v); };
  const setClasificacion = (v) => { _setClasificacion(v); save('sanse_clasificacion', v); };
  const setResultados = (v) => { _setResultados(v); save('sanse_resultados', v); };

  const resetAll = () => {
    _setNoticias(defaultNoticias); localStorage.removeItem('sanse_noticias');
    _setProximos(defaultProximos); localStorage.removeItem('sanse_proximos');
    _setClasificacion(defaultClasificacion); localStorage.removeItem('sanse_clasificacion');
    _setResultados(defaultResultados); localStorage.removeItem('sanse_resultados');
  };

  return (
    <DataContext.Provider value={{ noticias, setNoticias, proximosPartidos, setProximos, clasificacion, setClasificacion, resultados, setResultados, resetAll }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
