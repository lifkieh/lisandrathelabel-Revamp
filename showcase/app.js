/* Showcase shell — vanilla, tanpa build step, tanpa dependency.
   Fitur: pill selector, viewport switcher (lebar iframe px NYATA), mode banding,
   deep link (#id / #compare=a,b), panel catatan (dari versions.json), dan
   navigasi keyboard.
   File di showcase/versions/ TIDAK pernah disentuh — semuanya lewat iframe. */

'use strict';

const state = {
  data: null,
  active: null,          // id versi (mode satu-versi)
  viewport: 'desktop',   // desktop | tablet | mobile
  compareMode: false,    // toggle "Bandingkan"
  compare: [],           // [idA, idB] maksimal 2
  notesOpen: false,
};

// Lebar viewport (mode satu-versi). null = 100% (desktop). Angka = width iframe NYATA.
// Tablet = 1024, BUKAN 820: breakpoint mobile mockup di 860px, jadi 820px sudah masuk
// layout mobile dan tombol Tablet akan jadi duplikat Mobile. 1024px membuat tiga tombol
// menghasilkan tiga layout berbeda. Lihat docs/02-conventions.md.
const VIEWPORTS = {
  desktop: null,
  tablet: 1024,
  mobile: 390,
};

// Lebar per-iframe di mode banding. Selalu px nyata — termasuk desktop, memakai lebar
// desktop representatif (1280) supaya media query dokumen menyala sebagai desktop.
// Sengaja BUKAN 50% / flex:1: lebar dikecilkan = media query salah = sama seperti scale().
const COMPARE_WIDTHS = {
  desktop: 1280,
  tablet: 1024,
  mobile: 390,
};

const el = {
  brand: document.getElementById('brand'),
  pills: document.getElementById('pills'),
  frame: document.getElementById('frame'),
  singleView: document.getElementById('single-view'),
  compareView: document.getElementById('compare-view'),
  openTab: document.getElementById('open-tab'),
  viewport: document.getElementById('viewport'),
  compareToggle: document.getElementById('compare-toggle'),
  notes: document.getElementById('notes'),
  notesToggle: document.getElementById('notes-toggle'),
  hint: document.getElementById('compare-hint'),
};

function versionById(id) {
  return state.data.versions.find(v => v.id === id) || null;
}

function versionIndex(id) {
  return state.data.versions.findIndex(v => v.id === id);
}

function fileUrl(v) {
  return VERSIONS_DIR + v.file;
}

/* Opsional: ?offline=1 memuat salinan hasil showcase/fetch-assets.sh (gambar lokal).
   Default memuat versi asli dari versions/. Lihat showcase/README.md. */
const OFFLINE = new URLSearchParams(location.search).get('offline') === '1';
const VERSIONS_DIR = OFFLINE ? 'versions-offline/' : 'versions/';

/* ---- Render ---------------------------------------------------------- */

function render() {
  el.pills.classList.toggle('is-compare', state.compareMode);
  el.compareToggle.setAttribute('aria-pressed', state.compareMode ? 'true' : 'false');

  if (state.compareMode) renderCompare();
  else renderSingle();

  renderPills();
  renderNotes();
  applyViewport();
  updateOpenTab();
  updateHint();
}

function renderSingle() {
  el.singleView.hidden = false;
  el.compareView.hidden = true;

  const v = versionById(state.active);
  if (!v) return;
  const url = fileUrl(v);
  if (el.frame.getAttribute('src') !== url) el.frame.setAttribute('src', url);
  el.frame.setAttribute('title', 'Pratinjau ' + v.label + ' — ' + v.sublabel);
}

function renderCompare() {
  el.singleView.hidden = true;
  el.compareView.hidden = false;

  // Bangun ulang pane hanya bila daftar versi berubah, supaya iframe tidak reload
  // (dan kehilangan posisi scroll) tiap kali panel/viewport berubah.
  const wantKey = state.compare.join('|');
  if (el.compareView.dataset.key === wantKey) return;
  el.compareView.dataset.key = wantKey;
  el.compareView.innerHTML = '';

  state.compare.forEach(id => {
    const v = versionById(id);
    if (!v) return;
    const pane = document.createElement('div');
    pane.className = 'pane';

    const head = document.createElement('div');
    head.className = 'pane-head';
    head.innerHTML = '<b>' + v.label + '</b> — ' + v.sublabel;

    const frame = document.createElement('iframe');
    frame.className = 'frame';
    frame.setAttribute('src', fileUrl(v));
    frame.setAttribute('title', 'Pratinjau ' + v.label + ' — ' + v.sublabel);

    pane.appendChild(head);
    pane.appendChild(frame);
    el.compareView.appendChild(pane);
  });
}

function renderPills() {
  const selected = state.compareMode ? state.compare : [state.active];
  el.pills.querySelectorAll('.pill').forEach(btn => {
    const on = selected.indexOf(btn.dataset.id) !== -1;
    btn.setAttribute('aria-selected', on ? 'true' : 'false');
    btn.tabIndex = on ? 0 : -1;
  });
  el.pills.setAttribute('aria-multiselectable', state.compareMode ? 'true' : 'false');
}

function applyViewport() {
  const vp = state.viewport;

  // Mode satu-versi
  const w = VIEWPORTS[vp];
  if (w === null) {
    el.frame.style.width = '100%';
    el.frame.classList.remove('is-framed');
  } else {
    el.frame.style.width = w + 'px';
    el.frame.classList.add('is-framed');
  }

  // Mode banding: tiap iframe pakai lebar px nyata (termasuk desktop)
  const cw = COMPARE_WIDTHS[vp];
  el.compareView.querySelectorAll('.frame').forEach(f => {
    f.style.width = cw + 'px';
    f.classList.add('is-framed');
  });

  el.viewport.querySelectorAll('.seg-btn').forEach(btn => {
    btn.setAttribute('aria-pressed', btn.dataset.vp === vp ? 'true' : 'false');
  });
}

function notesBlock(v) {
  const n = v.notes || {};
  const list = (arr) => (arr && arr.length)
    ? '<ul>' + arr.map(x => '<li>' + escapeHtml(x) + '</li>').join('') + '</ul>'
    : '<p>—</p>';

  return '' +
    '<div class="notes-block">' +
      '<h2>' + escapeHtml(v.label) + '</h2>' +
      '<p class="notes-sub">' + escapeHtml(v.sublabel) + '</p>' +
      (n.summary ? '<p>' + escapeHtml(n.summary) + '</p>' : '') +
      '<h3>Yang ditambahkan</h3>' + list(n.added) +
      '<h3>Perkiraan effort</h3>' + '<p>' + escapeHtml(n.effort || '—') + '</p>' +
      '<h3>Risiko</h3>' + list(n.risks) +
    '</div>';
}

function renderNotes() {
  el.notes.hidden = !state.notesOpen;
  el.notesToggle.setAttribute('aria-pressed', state.notesOpen ? 'true' : 'false');
  if (!state.notesOpen) return;

  const ids = state.compareMode ? state.compare : [state.active];
  el.notes.innerHTML = ids
    .map(id => versionById(id))
    .filter(Boolean)
    .map(notesBlock)
    .join('');
}

function updateOpenTab() {
  const id = state.compareMode ? state.compare[0] : state.active;
  const v = versionById(id);
  el.openTab.setAttribute('href', v ? fileUrl(v) : '#');
}

function updateHint() {
  if (state.compareMode && state.compare.length < 2) {
    el.hint.hidden = false;
    el.hint.textContent = 'Mode banding: pilih ' + (2 - state.compare.length) +
      ' versi lagi (terpilih ' + state.compare.length + '/2).';
  } else {
    el.hint.hidden = true;
  }
}

/* ---- Aksi ------------------------------------------------------------ */

function setActive(id, opts) {
  if (!versionById(id)) return;
  const updateHash = !opts || opts.updateHash !== false;
  state.active = id;
  render();
  if (updateHash) writeHash();
}

function setViewport(vp) {
  if (!(vp in VIEWPORTS)) return;
  state.viewport = vp;
  applyViewport();
}

function toggleCompare(opts) {
  const updateHash = !opts || opts.updateHash !== false;
  state.compareMode = !state.compareMode;
  if (state.compareMode) {
    // Awali dengan versi aktif + versi tetangga sebagai kandidat kedua
    const i = Math.max(0, versionIndex(state.active));
    const next = state.data.versions[(i + 1) % state.data.versions.length];
    state.compare = [state.active, next.id].filter((x, idx, a) => a.indexOf(x) === idx);
  } else {
    state.active = state.compare[0] || state.active;
    state.compare = [];
  }
  render();
  if (updateHash) writeHash();
}

function toggleCompareMember(id) {
  if (!versionById(id)) return;
  const i = state.compare.indexOf(id);
  if (i !== -1) {
    if (state.compare.length > 1) state.compare.splice(i, 1); // sisakan minimal 1
  } else {
    state.compare.push(id);
    if (state.compare.length > 2) state.compare.shift();      // FIFO, maksimal 2
  }
  render();
  writeHash();
}

function onPillClick(id) {
  if (state.compareMode) toggleCompareMember(id);
  else setActive(id);
}

function toggleNotes() {
  state.notesOpen = !state.notesOpen;
  renderNotes();
}

/* ---- Deep link ------------------------------------------------------- */

let suppressHashChange = false;

function writeHash() {
  const want = (state.compareMode && state.compare.length === 2)
    ? '#compare=' + state.compare[0] + ',' + state.compare[1]
    : '#' + state.active;
  if ('#' + location.hash.replace(/^#/, '') === want) return;
  suppressHashChange = true;
  location.hash = want;
}

function parseHash() {
  const raw = location.hash.replace(/^#/, '');
  if (!raw) return null;

  if (raw.indexOf('compare=') === 0) {
    const ids = raw.slice('compare='.length).split(',').map(s => s.trim());
    const valid = ids.filter(id => versionById(id));
    if (valid.length === 2) return { mode: 'compare', ids: valid };
    if (valid.length === 1) return { mode: 'single', id: valid[0] };
    return null;
  }
  if (versionById(raw)) return { mode: 'single', id: raw };
  return null;
}

function routeFromHash() {
  const route = parseHash();
  if (!route) {
    state.compareMode = false;
    state.compare = [];
    setActive(state.data.versions[0].id, { updateHash: false });
    return;
  }
  if (route.mode === 'single') {
    state.compareMode = false;
    state.compare = [];
    setActive(route.id, { updateHash: false });
    return;
  }
  // compare
  state.compareMode = true;
  state.compare = route.ids;
  state.active = route.ids[0];
  render();
}

/* ---- Keyboard -------------------------------------------------------- */

function isTypingTarget() {
  const a = document.activeElement;
  if (!a) return false;
  const tag = a.tagName;
  // Fokus di dalam iframe (konten versi) -> jangan bajak tombol
  if (tag === 'IFRAME') return true;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true;
  if (a.isContentEditable) return true;
  return false;
}

function onKey(e) {
  if (e.metaKey || e.ctrlKey || e.altKey) return;
  if (isTypingTarget()) return;

  const versions = state.data.versions;

  // Angka 1..N -> lompat langsung
  if (e.key >= '1' && e.key <= '9') {
    const idx = parseInt(e.key, 10) - 1;
    if (idx < versions.length) {
      e.preventDefault();
      jumpTo(versions[idx].id);
    }
    return;
  }

  if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
    e.preventDefault();
    const currentId = state.compareMode ? state.compare[state.compare.length - 1] : state.active;
    let i = versionIndex(currentId);
    i += (e.key === 'ArrowRight') ? 1 : -1;
    i = (i + versions.length) % versions.length;
    jumpTo(versions[i].id);
  }
}

// Pindah versi lewat keyboard: hormati mode aktif.
function jumpTo(id) {
  if (state.compareMode) toggleCompareMember(id);
  else setActive(id);
}

/* ---- Util ------------------------------------------------------------ */

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ---- Init ------------------------------------------------------------ */

function buildPills() {
  el.pills.innerHTML = '';
  state.data.versions.forEach(v => {
    const btn = document.createElement('button');
    btn.className = 'pill';
    btn.type = 'button';
    btn.role = 'tab';
    btn.dataset.id = v.id;
    btn.setAttribute('aria-selected', 'false');
    btn.tabIndex = -1;
    btn.innerHTML =
      '<span class="pill-label">' + escapeHtml(v.label) + '</span>' +
      '<span class="pill-sub">' + escapeHtml(v.sublabel) + '</span>';
    btn.addEventListener('click', () => onPillClick(v.id));
    el.pills.appendChild(btn);
  });
}

async function init() {
  const res = await fetch('versions.json');
  if (!res.ok) throw new Error('Gagal memuat versions.json: ' + res.status);
  state.data = await res.json();

  el.brand.textContent = state.data.brand + ' · Showcase';
  document.title = 'Showcase — ' + state.data.brand;

  buildPills();

  el.viewport.querySelectorAll('.seg-btn').forEach(btn => {
    btn.addEventListener('click', () => setViewport(btn.dataset.vp));
  });
  el.compareToggle.addEventListener('click', () => toggleCompare());
  el.notesToggle.addEventListener('click', toggleNotes);
  window.addEventListener('keydown', onKey);
  window.addEventListener('hashchange', () => {
    if (suppressHashChange) { suppressHashChange = false; return; }
    routeFromHash();
  });

  routeFromHash();   // buka sesuai hash awal (deep link), fallback versi pertama
}

init().catch(err => {
  document.body.insertAdjacentHTML('afterbegin',
    '<pre style="color:#b91c1c;padding:16px;white-space:pre-wrap">' + err.message +
    '\n\nBuka lewat server lokal (mis. python3 -m http.server), bukan file://, ' +
    'karena fetch() diblokir di file://.</pre>');
});
