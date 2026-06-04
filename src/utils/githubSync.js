const OWNER = import.meta.env.VITE_GITHUB_OWNER;
const REPO  = import.meta.env.VITE_GITHUB_REPO;
const TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const FILE  = 'src/data/mockData.js';
const API   = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE}`;

function toBase64(str) {
  const bytes = new TextEncoder().encode(str);
  const bin = Array.from(bytes).map(b => String.fromCharCode(b)).join('');
  return btoa(bin);
}

function buildFileContent({ resultados, proximosPartidos, clasificacion, noticias }) {
  const s = (v) => JSON.stringify(v, null, 2);
  return `// ─── RESULTADOS ─────────────────────────────────────────────────────────────
export const resultados = ${s(resultados)};

// ─── PRÓXIMOS PARTIDOS ───────────────────────────────────────────────────────
export const proximosPartidos = ${s(proximosPartidos)};

// ─── CLASIFICACIÓN ───────────────────────────────────────────────────────────
export const clasificacion = ${s(clasificacion)};

// ─── NOTICIAS ────────────────────────────────────────────────────────────────
export const noticias = ${s(noticias)};
`;
}

export async function syncToGitHub(data) {
  if (!TOKEN || !OWNER || !REPO) {
    return { ok: false, error: 'Faltan variables de entorno (VITE_GITHUB_OWNER, VITE_GITHUB_REPO, VITE_GITHUB_TOKEN)' };
  }

  const headers = {
    Authorization: `Bearer ${TOKEN}`,
    'Content-Type': 'application/json',
    Accept: 'application/vnd.github+json',
  };

  // Obtener SHA actual del archivo
  const infoRes = await fetch(API, { headers });
  if (!infoRes.ok) return { ok: false, error: `No se pudo leer el archivo en GitHub (${infoRes.status})` };
  const { sha } = await infoRes.json();

  // Subir contenido actualizado
  const content = toBase64(buildFileContent(data));
  const updateRes = await fetch(API, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      message: 'chore: actualizar datos desde panel admin',
      content,
      sha,
    }),
  });

  if (!updateRes.ok) {
    const err = await updateRes.json().catch(() => ({}));
    return { ok: false, error: err.message || `Error ${updateRes.status}` };
  }

  return { ok: true };
}
