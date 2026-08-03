/* ==========================================================================
   Boss of the Block — simulation engine
   A 14-day lemonade & hot dog stand for young founders.
   ========================================================================== */
(function () {
'use strict';

/* ───────────────────────────── config ───────────────────────────── */

/* Names and descriptions for everything below live in i18n.js, keyed by id. */
var SUPPLIES = {
  lemons:   { emoji:'🍋', pack:10, packPrice:3.00,  spoil:0.12, makes:'lemonade' },
  sugar:    { emoji:'🥄', pack:20, packPrice:2.00,  spoil:0.00, makes:'lemonade' },
  cups:     { emoji:'🥤', pack:25, packPrice:2.00,  spoil:0.00, makes:'lemonade' },
  ice:      { emoji:'🧊', pack:20, packPrice:1.00,  spoil:0.60, makes:'lemonade' },
  sausages: { emoji:'🌭', pack:10, packPrice:11.00, spoil:0.18, makes:'hotdog'   },
  buns:     { emoji:'🥖', pack:10, packPrice:3.50,  spoil:0.25, makes:'hotdog'   },
  toppings: { emoji:'🧅', pack:20, packPrice:4.00,  spoil:0.06, makes:'hotdog'   }
};
var SUP_KEYS = Object.keys(SUPPLIES);

var RECIPES = {
  lemonade: [
    { parts:{ lemons:1, sugar:1, cups:1, ice:1 }, sat:0.78, fair:0.86 },
    { parts:{ lemons:2, sugar:2, cups:1, ice:1 }, sat:1.00, fair:1.00 },
    { parts:{ lemons:3, sugar:3, cups:1, ice:2 }, sat:1.18, fair:1.24 }
  ],
  hotdog: [
    { parts:{ sausages:1, buns:1 },             sat:0.80, fair:0.86 },
    { parts:{ sausages:1, buns:1, toppings:1 }, sat:1.00, fair:1.00 },
    { parts:{ sausages:1, buns:1, toppings:3 }, sat:1.18, fair:1.26 }
  ]
};

var PRODUCTS = {
  lemonade: { emoji:'🥤', baseFair:2.00, cls:'prod-lem' },
  hotdog:   { emoji:'🌭', baseFair:3.50, cls:'prod-dog' }
};

var UPGRADES = [
  { id:'sign',     emoji:'🪧', cost:35 },
  { id:'register', emoji:'💵', cost:30 },
  { id:'cooler',   emoji:'🧊', cost:40 },
  { id:'bunbox',   emoji:'🍞', cost:25 },
  { id:'grill',    emoji:'🔥', cost:70 },
  { id:'umbrella', emoji:'⛱️', cost:55 }
];

/* translated-label accessors */
function supName(k) { return t('sup.' + k + '.name'); }
function supUnit(k) { return t('sup.' + k + '.unit'); }
function prodName(p) { return t('prod.' + p + '.name'); }
function upgName(id) { return t('upg.' + id + '.name'); }
function upgDesc(id) { return t('upg.' + id + '.desc'); }

var WEATHER = {
  scorching:{ emoji:'🥵', t:[95,103], traffic:1.16, lem:0.94, dog:0.30, lemFair:1.20, dogFair:0.90, sky:['#FFC978','#FFEDD0'] },
  hot:      { emoji:'☀️', t:[86,94],  traffic:1.26, lem:0.80, dog:0.42, lemFair:1.12, dogFair:0.97, sky:['#7FCDF2','#DFF4FF'] },
  warm:     { emoji:'🌤️', t:[76,85],  traffic:1.10, lem:0.62, dog:0.55, lemFair:1.00, dogFair:1.00, sky:['#8FD3F4','#E4F6FF'] },
  mild:     { emoji:'⛅', t:[66,75],  traffic:0.94, lem:0.45, dog:0.66, lemFair:0.92, dogFair:1.05, sky:['#A9D6EC','#E8F3F8'] },
  cloudy:   { emoji:'☁️', t:[58,68],  traffic:0.78, lem:0.32, dog:0.74, lemFair:0.86, dogFair:1.09, sky:['#B9C4CE','#E6EBEF'] },
  rainy:    { emoji:'🌧️', t:[52,62],  traffic:0.46, lem:0.22, dog:0.64, lemFair:0.82, dogFair:1.06, sky:['#8C99A6','#C9D3DA'] }
};
function wName(k) { return t('w.' + k); }

var EVENTS = [
  { id:'parade', emoji:'🎉', traffic:1.85 },
  { id:'game',   emoji:'⚾', traffic:1.50, dog:1.35 },
  { id:'trip',   emoji:'🎒', traffic:1.42, lem:1.30 },
  { id:'market', emoji:'🧺', traffic:1.32, supplyOff:0.80 },
  { id:'truck',  emoji:'🚚', traffic:0.66 },
  { id:'quiet',  emoji:'😴', traffic:0.70 },
  { id:'heat',   emoji:'📰', traffic:1.10, lem:1.40 }
];

var DOW = [1.24, 1.18, 0.84, 0.86, 0.92, 0.95, 1.08];

var DIFFS = {
  easy:   { cash:200, goal:425, rent:10, sens:0.95 },
  normal: { cash:150, goal:475, rent:12, sens:1.15 },
  hard:   { cash:100, goal:525, rent:12, sens:1.25 }
};

var TOTAL_DAYS   = 14;
var BASE_TRAFFIC = 22;
var BASE_CAP     = 40;
var STAFF_COST   = 25;
var STAFF_CAP    = 35;
var SAVE_KEY     = 'bossOfTheBlock.save.v1';

/* ───────────────────────────── helpers ───────────────────────────── */

var $  = function (s, r) { return (r || document).querySelector(s); };
var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
var clamp = function (v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; };
var round2 = function (v) { return Math.round(v * 100) / 100; };

function money(n, force) {
  var neg = n < -0.004;
  var s = '$' + Math.abs(n).toFixed(2);
  return neg ? '−' + s : (force && n > 0.004 ? '+' + s : s);
}
function money0(n) {
  var neg = n < -0.5;
  return (neg ? '−$' : '$') + Math.round(Math.abs(n)).toLocaleString();
}
function pct(n) { return Math.round(n * 100) + '%'; }

/* deterministic PRNG so a given season replays identically */
function mulberry(seed) {
  var a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    var t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function pick(rng, arr) { return arr[Math.floor(rng() * arr.length)]; }

/* ───────────────────────────── state ───────────────────────────── */

var S = null;
var sim = null;

function newState(name, diff) {
  var seed = (Date.now() ^ (Math.random() * 1e9)) >>> 0;
  var rng = mulberry(seed);
  var d = DIFFS[diff];

  return {
    seed: seed,
    name: name,
    diff: diff,
    day: 1,
    cash: d.cash,
    rep: 50,
    awareness: 0,
    season: buildSeason(rng),
    stock: zeroStock(),
    prices: { lemonade: 2.00, hotdog: 3.50 },
    recipe: { lemonade: 1, hotdog: 1 },
    order: zeroStock(),
    marketing: 0,
    staff: false,
    upgrades: [],
    history: [],
    spent: 0,
    earned: 0
  };
}

function zeroStock() {
  var o = {};
  SUP_KEYS.forEach(function (k) { o[k] = 0; });
  return o;
}

function buildSeason(rng) {
  var pool = ['warm','warm','hot','hot','mild','warm','hot','scorching','mild','cloudy','warm','hot','rainy','mild'];
  /* shuffle but keep day 1 friendly */
  for (var i = pool.length - 1; i > 1; i--) {
    var j = 1 + Math.floor(rng() * i);
    var t = pool[i]; pool[i] = pool[j]; pool[j] = t;
  }
  pool[0] = 'warm';

  var days = [];
  for (var d = 0; d < TOTAL_DAYS; d++) {
    var w = WEATHER[pool[d]];
    var ev = null;
    if (d >= 1 && rng() < 0.42) {
      ev = pick(rng, EVENTS);
      if (ev.id === 'heat' && w.lem < 0.6) ev = null;      /* no heat advisory when it is cold */
      if (ev && ev.id === 'quiet' && d < 3) ev = null;      /* let them find their feet */
    }
    days.push({
      key: pool[d],
      temp: Math.round(w.t[0] + rng() * (w.t[1] - w.t[0])),
      dowIdx: d % 7,
      event: ev,
      noise: 0.90 + rng() * 0.20
    });
  }
  return days;
}

/* ───────────────────────────── derived numbers ───────────────────────────── */

function unitPrice(k) { return SUPPLIES[k].packPrice / SUPPLIES[k].pack; }

function recipeOf(prod) { return RECIPES[prod][S.recipe[prod]]; }

function unitCost(prod, lvl) {
  var r = RECIPES[prod][lvl === undefined ? S.recipe[prod] : lvl];
  var c = 0;
  for (var k in r.parts) c += r.parts[k] * unitPrice(k);
  return round2(c);
}

/* how many units the given stock can build */
function buildable(prod, stock) {
  var r = recipeOf(prod), n = Infinity;
  for (var k in r.parts) n = Math.min(n, Math.floor((stock[k] || 0) / r.parts[k]));
  return n === Infinity ? 0 : n;
}

function stockAfterOrder() {
  var o = {};
  SUP_KEYS.forEach(function (k) { o[k] = S.stock[k] + S.order[k] * SUPPLIES[k].pack; });
  return o;
}

function bulkRate(packs) { return packs >= 10 ? 0.15 : packs >= 5 ? 0.10 : 0; }

function orderCost() {
  var day = S.season[S.day - 1];
  var off = (day.event && day.event.supplyOff) ? day.event.supplyOff : 1;
  var gross = 0, net = 0;
  SUP_KEYS.forEach(function (k) {
    var packs = S.order[k];
    if (!packs) return;
    var g = packs * SUPPLIES[k].packPrice * off;
    gross += g;
    net += g * (1 - bulkRate(packs));
  });
  return { gross: round2(gross), net: round2(net), saved: round2(gross - net) };
}

function capacity() {
  var c = BASE_CAP;
  if (S.staff) c += STAFF_CAP;
  if (has('register')) c += 15;
  if (has('grill')) c += 25;
  return c;
}
function has(id) { return S.upgrades.indexOf(id) !== -1; }

function fairPrice(prod) {
  var day = S.season[S.day - 1];
  var w = WEATHER[day.key];
  var base = PRODUCTS[prod].baseFair;
  var wf = prod === 'lemonade' ? w.lemFair : w.dogFair;
  var repF = 0.90 + (S.rep / 100) * 0.20;
  return base * recipeOf(prod).fair * wf * repF;
}

function fixedCosts() {
  return DIFFS[S.diff].rent + (S.staff ? STAFF_COST : 0) + S.marketing;
}

/* Core demand model. `noise` = 1 for the planning estimate. */
function demandFor(prod, noise) {
  var day = S.season[S.day - 1];
  var w = WEATHER[day.key];
  var ev = day.event;

  var traffic = BASE_TRAFFIC * w.traffic * DOW[day.dowIdx];
  if (ev) traffic *= ev.traffic;
  if (has('sign')) traffic *= 1.15;

  traffic *= 1 + 0.50 * (1 - Math.exp(-S.marketing / 20)) + S.awareness * 0.20;
  traffic *= 0.72 + (S.rep / 100) * 0.56;
  traffic *= noise;

  var interest = prod === 'lemonade' ? w.lem : w.dog;
  if (ev && ev[prod === 'lemonade' ? 'lem' : 'dog']) interest *= ev[prod === 'lemonade' ? 'lem' : 'dog'];

  var fair = fairPrice(prod);
  var price = S.prices[prod];
  var pf = clamp(1 - ((price - fair) / fair) * DIFFS[S.diff].sens, 0.02, 1.55);
  var qf = 0.85 + recipeOf(prod).sat * 0.15;

  return Math.max(0, traffic * interest * pf * qf);
}

/* Run a full day. noiseOn=false gives the deterministic planning estimate. */
function runDay(noiseOn) {
  var day = S.season[S.day - 1];
  var stock = stockAfterOrder();
  var cap = capacity();

  var want = { lemonade: demandFor('lemonade', noiseOn ? day.noise : 1),
               hotdog:   demandFor('hotdog',   noiseOn ? day.noise : 1) };

  var able = { lemonade: buildable('lemonade', stock), hotdog: buildable('hotdog', stock) };

  /* stock limit first, then the service-capacity ceiling shared between products */
  var sold = { lemonade: Math.min(Math.round(want.lemonade), able.lemonade),
               hotdog:   Math.min(Math.round(want.hotdog),   able.hotdog) };

  var lostCap = 0;
  var total = sold.lemonade + sold.hotdog;
  if (total > cap) {
    var keep = cap / total;
    lostCap = total - cap;
    sold.lemonade = Math.floor(sold.lemonade * keep);
    sold.hotdog   = Math.floor(sold.hotdog * keep);
  }

  var lostStock = Math.max(0, Math.round(want.lemonade) - sold.lemonade) +
                  Math.max(0, Math.round(want.hotdog) - sold.hotdog) - lostCap;
  lostStock = Math.max(0, lostStock);

  /* consume ingredients */
  var left = {};
  SUP_KEYS.forEach(function (k) { left[k] = stock[k]; });
  ['lemonade', 'hotdog'].forEach(function (p) {
    var r = recipeOf(p);
    for (var k in r.parts) left[k] -= r.parts[k] * sold[p];
  });
  SUP_KEYS.forEach(function (k) { left[k] = Math.max(0, left[k]); });

  var revenue = round2(sold.lemonade * S.prices.lemonade + sold.hotdog * S.prices.hotdog);
  var cogsL = round2(sold.lemonade * unitCost('lemonade'));
  var cogsD = round2(sold.hotdog * unitCost('hotdog'));

  /* overnight spoilage on what is left */
  var waste = 0, kept = {};
  SUP_KEYS.forEach(function (k) {
    var rate = SUPPLIES[k].spoil;
    if (has('cooler') && k === 'ice') rate = 0.20;
    if (has('cooler') && k === 'lemons') rate = 0.04;
    if (has('bunbox') && k === 'buns') rate = 0.08;
    var lose = Math.floor(left[k] * rate);
    waste += lose * unitPrice(k);
    kept[k] = left[k] - lose;
  });
  waste = round2(waste);

  var fixed = fixedCosts();
  var gross = round2(revenue - cogsL - cogsD);
  var net = round2(gross - fixed - waste);

  /* reputation */
  var repDelta = 0, served = sold.lemonade + sold.hotdog;
  if (served > 0) {
    ['lemonade', 'hotdog'].forEach(function (p) {
      if (!sold[p]) return;
      var value = recipeOf(p).sat * (fairPrice(p) / S.prices[p]);
      repDelta += (clamp(value, 0.4, 1.6) - 1) * 13 * (sold[p] / served);
    });
  } else repDelta -= 2;
  var missed = lostStock + lostCap;
  var missRate = missed / Math.max(1, served + missed);
  if (missRate > 0.05) repDelta -= Math.min(7, missRate * 13);
  /* word of mouth: serve nearly everyone who showed up and the block starts to notice */
  else if (served > 0 && repDelta > -0.5) repDelta += 1.2;
  if (repDelta > 0 && has('umbrella')) repDelta *= 1.5;
  repDelta = clamp(repDelta, -11, 9);

  return {
    day: S.day, sold: sold, want: want, cap: cap, able: able,
    lostStock: lostStock, lostCap: lostCap,
    revenue: revenue, cogsL: cogsL, cogsD: cogsD, cogs: round2(cogsL + cogsD),
    gross: gross, rent: DIFFS[S.diff].rent, staff: S.staff ? STAFF_COST : 0,
    marketing: S.marketing, waste: waste, fixed: fixed, net: net,
    repDelta: repDelta, kept: kept,
    prices: { lemonade: S.prices.lemonade, hotdog: S.prices.hotdog },
    recipe: { lemonade: S.recipe.lemonade, hotdog: S.recipe.hotdog },
    weather: day.key, event: day.event ? day.event.id : null,
    supplySpend: orderCost().net
  };
}

/* ───────────────────────────── screens ───────────────────────────── */

function show(id) {
  $$('.screen').forEach(function (s) { s.classList.toggle('is-active', s.id === id); });
  window.scrollTo({ top: 0, behavior: 'instant' in document.body.style ? 'instant' : 'auto' });
}

function toast(msg, kind) {
  var t = document.createElement('div');
  t.className = 'toast' + (kind ? ' ' + kind : '');
  t.textContent = msg;
  $('#toastStack').appendChild(t);
  setTimeout(function () {
    t.style.transition = 'opacity .3s, transform .3s';
    t.style.opacity = '0'; t.style.transform = 'translateY(10px)';
    setTimeout(function () { t.remove(); }, 320);
  }, 2300);
}

/* ───────────────────────────── start screen ───────────────────────────── */

var chosenDiff = 'easy';

function initStart() {
  $$('#difficulty .seg-btn').forEach(function (b) {
    b.addEventListener('click', function () {
      chosenDiff = b.dataset.diff;
      $$('#difficulty .seg-btn').forEach(function (o) {
        o.classList.toggle('is-on', o === b);
        o.setAttribute('aria-checked', o === b ? 'true' : 'false');
      });
    });
  });

  $('#btnStart').addEventListener('click', function () {
    var n = $('#standName').value.trim() || t('start.defaultName');
    S = newState(n, chosenDiff);
    startDay();
  });

  $$('.lang-btn').forEach(function (b) {
    b.addEventListener('click', function () { switchLang(b.dataset.lang); });
  });

  $('#btnHowStart').addEventListener('click', openHow);
  $('#btnHow').addEventListener('click', openHow);
  $('#howClose').addEventListener('click', closeHow);
  $('#howGo').addEventListener('click', closeHow);
  $('#howModal').addEventListener('click', function (e) { if (e.target === $('#howModal')) closeHow(); });

  $('#btnMenu').addEventListener('click', openMenu);
  $('#menuClose').addEventListener('click', closeMenu);
  $('#menuModal').addEventListener('click', function (e) { if (e.target === $('#menuModal')) closeMenu(); });
  $('#btnNewStand').addEventListener('click', newStand);
  $('#btnRestartSame').addEventListener('click', restartSeason);
  $('#btnRename').addEventListener('click', function () {
    var n = $('#renameInput').value.trim();
    if (!n) return;
    S.name = n;
    $('#tbStandName').textContent = n;
    $('#signText').textContent = n.length > 18 ? n.slice(0, 17) + '…' : n;
    save();
    closeMenu();
    toast(t('sm.renamed', { name: n }), 'good');
  });
  $('#renameInput').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') { e.preventDefault(); $('#btnRename').click(); }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeHow(); closeMenu(); }
  });

  offerResume();
}

function openHow()  { $('#howModal').hidden = false; }
function closeHow() { $('#howModal').hidden = true; }

function openMenu() {
  $('#renameInput').value = S ? S.name : '';
  $('#menuProgress').textContent = S
    ? t('sm.progress', { day: S.day, total: TOTAL_DAYS, cash: money0(S.cash) })
    : '';
  markLangButtons();
  $('#menuModal').hidden = false;
}

function markLangButtons() {
  $$('.lang-btn').forEach(function (b) {
    b.classList.toggle('is-on', b.dataset.lang === LANG);
  });
}

/* swap language without losing the game in progress */
function switchLang(code) {
  if (code === LANG) return;
  setLang(code);
  applyStaticStrings();
  markLangButtons();
  if (S) {
    buildMenu(); buildSupplies(); buildUpgrades();
    renderPlan();
    if ($('#screen-report').classList.contains('is-active') && S.history.length) {
      renderReport(S.history[S.history.length - 1]);
    }
    if ($('#screen-finale').classList.contains('is-active')) renderFinale();
  } else {
    $$('#screen-start .btn-go').forEach(function (b) { b.remove(); });
    offerResume();
  }
}
function closeMenu() { $('#menuModal').hidden = true; }

/* back to the title screen for a fresh name and difficulty */
function newStand() {
  clearSave();
  S = null;
  closeMenu();
  $$('#screen-start .btn-go').forEach(function (b) { b.remove(); });
  $('#standName').value = '';
  show('screen-start');
}

/* same name and difficulty, season rerolled from day 1 */
function restartSeason() {
  var name = S.name, diff = S.diff;
  clearSave();
  S = newState(name, diff);
  closeMenu();
  toast(t('sm.restarted'));
  startDay();
}

function offerResume() {
  var raw;
  try { raw = localStorage.getItem(SAVE_KEY); } catch (e) { return; }
  if (!raw) return;
  var save;
  try { save = JSON.parse(raw); } catch (e) { return; }
  if (!save || !save.name || save.day > TOTAL_DAYS) return;

  var btn = document.createElement('button');
  btn.className = 'btn btn-go btn-xl btn-block';
  btn.textContent = t('start.continue', { name: save.name, day: save.day });
  btn.addEventListener('click', function () { S = save; startDay(); });
  $('#btnStart').parentNode.insertBefore(btn, $('#btnStart'));
}

function save() {
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(S)); } catch (e) { /* private mode */ }
}
function clearSave() {
  try { localStorage.removeItem(SAVE_KEY); } catch (e) {}
}

/* ───────────────────────────── plan screen ───────────────────────────── */

function startDay() {
  S.order = zeroStock();
  S.marketing = 0;
  S.staff = false;      /* the helper is hired one day at a time */
  save();
  buildPlanStatic();
  renderPlan();
  show('screen-plan');
}

function buildPlanStatic() {
  $('#tbStandName').textContent = S.name;
  $('#tbDayTotal').textContent = TOTAL_DAYS;
  $('#signText').textContent = S.name.length > 18 ? S.name.slice(0, 17) + '…' : S.name;
  buildMenu();
  buildSupplies();
  buildUpgrades();

  var mk = $('#mkSlider');
  if (!mk.dataset.bound) {
    mk.dataset.bound = '1';
    mk.addEventListener('input', function () { S.marketing = +mk.value; renderPlan(); });
    $('#stToggle').addEventListener('click', function () { S.staff = !S.staff; renderPlan(); });
    $('#btnOpen').addEventListener('click', openStand);
    $$('[data-auto]').forEach(function (b) {
      b.addEventListener('click', function () { autoStock(b.dataset.auto); });
    });
  }
}

function buildMenu() {
  var g = $('#menuGrid');
  g.innerHTML = '';
  ['lemonade', 'hotdog'].forEach(function (p) {
    var P = PRODUCTS[p];
    var el = document.createElement('div');
    el.className = 'prod ' + P.cls;
    el.innerHTML =
      '<div class="prod-head"><span class="prod-emoji">' + P.emoji + '</span>' +
        '<div><div class="prod-name">' + prodName(p) + '</div>' +
        '<div class="prod-sub">' + t('prod.' + p + '.sub') + '</div></div></div>' +
      '<div class="rec-label">' + t('menu.recipe') + '</div>' +
      '<div class="rec-opts" data-rec="' + p + '"></div>' +
      '<div class="price-row">' +
        '<button class="step" data-price="' + p + '" data-dir="-1" aria-label="' + t('menu.lowerPrice') + '">−</button>' +
        '<div class="price-mid"><div class="price-k">' + t('menu.yourPrice') + '</div>' +
        '<div class="price-v" id="pv-' + p + '">$0</div></div>' +
        '<button class="step" data-price="' + p + '" data-dir="1" aria-label="' + t('menu.raisePrice') + '">+</button>' +
      '</div>' +
      '<div class="econ">' +
        '<div><span>' + t('menu.costs') + '</span><b id="uc-' + p + '">$0</b></div>' +
        '<div><span>' + t('menu.keep') + '</span><b id="up-' + p + '">$0</b></div>' +
        '<div><span>' + t('menu.margin') + '</span><b id="um-' + p + '">0%</b></div>' +
      '</div>' +
      '<div class="demand-meter"><div class="dm-track"><div class="dm-fill" id="dm-' + p + '"></div></div>' +
      '<div class="dm-txt" id="dt-' + p + '"></div></div>';
    g.appendChild(el);

    var ro = $('.rec-opts', el);
    RECIPES[p].forEach(function (r, i) {
      var b = document.createElement('button');
      b.className = 'rec-btn';
      b.dataset.lvl = i;
      b.innerHTML = '<b>' + t('rec.' + p + '.' + i + '.name') + '</b>' +
                    '<small>' + money(unitCost(p, i)) + '</small>';
      b.addEventListener('click', function () { S.recipe[p] = i; renderPlan(); });
      ro.appendChild(b);
    });
  });

  $$('[data-price]').forEach(function (b) {
    b.addEventListener('click', function () {
      var p = b.dataset.price;
      S.prices[p] = clamp(round2(S.prices[p] + (+b.dataset.dir) * 0.25), 0.25, 12);
      renderPlan();
    });
  });
}

function buildSupplies() {
  var g = $('#supplyGrid');
  g.innerHTML = '';
  SUP_KEYS.forEach(function (k) {
    var s = SUPPLIES[k];
    var el = document.createElement('div');
    el.className = 'sup';
    el.id = 'sup-' + k;
    el.innerHTML =
      '<div class="sup-top"><span class="sup-emoji">' + s.emoji + '</span>' +
        '<div><div class="sup-name">' + supName(k) + '</div>' +
        '<div class="sup-price">' + t('sup.perPack', { price: money(s.packPrice), n: s.pack }) + '</div></div>' +
        (s.spoil >= 0.10 ? '<span class="sup-spoil" id="sp-' + k + '"></span>' : '') +
      '</div>' +
      '<div class="sup-ctrl">' +
        '<button class="step" data-sup="' + k + '" data-dir="-1" aria-label="' +
          t('sup.buyLess', { name: supName(k) }) + '">−</button>' +
        '<div class="sup-qty"><b id="oq-' + k + '">0</b><small id="ol-' + k + '"></small></div>' +
        '<button class="step" data-sup="' + k + '" data-dir="1" aria-label="' +
          t('sup.buyMore', { name: supName(k) }) + '">+</button>' +
      '</div>' +
      '<div class="sup-have"><span>' + t('sup.inCart') + '</span><b id="oh-' + k + '">0</b></div>';
    g.appendChild(el);
  });

  $$('[data-sup]').forEach(function (b) {
    b.addEventListener('click', function () {
      var k = b.dataset.sup;
      S.order[k] = clamp(S.order[k] + (+b.dataset.dir), 0, 40);
      renderPlan();
    });
  });
}

function buildUpgrades() {
  var g = $('#upgradeGrid');
  g.innerHTML = '';
  UPGRADES.forEach(function (u) {
    var owned = has(u.id);
    var el = document.createElement('div');
    el.className = 'upg' + (owned ? ' owned' : '');
    el.innerHTML =
      '<div class="upg-top"><span class="upg-emoji">' + u.emoji + '</span>' +
      '<div class="upg-name">' + upgName(u.id) + '</div></div>' +
      '<div class="upg-desc">' + upgDesc(u.id) + '</div>';
    if (owned) {
      el.insertAdjacentHTML('beforeend', '<div class="upg-own">' + t('grow.owned') + '</div>');
    } else {
      var b = document.createElement('button');
      b.className = 'btn btn-soft btn-sm';
      b.textContent = t('grow.buy', { price: money0(u.cost) });
      b.disabled = S.cash < u.cost;
      b.addEventListener('click', function () { buyUpgrade(u); });
      el.appendChild(b);
    }
    g.appendChild(el);
  });
}

function buyUpgrade(u) {
  if (S.cash < u.cost) return;
  S.cash -= u.cost;
  S.spent += u.cost;
  S.upgrades.push(u.id);
  toast(t('grow.installed', { emoji: u.emoji, name: upgName(u.id) }), 'good');
  buildUpgrades();
  renderPlan();
  save();
}

function autoStock(level) {
  var mult = level === 'light' ? 0.65 : level === 'heavy' ? 1.45 : 1.0;
  var target = { lemonade: Math.ceil(demandFor('lemonade', 1) * mult),
                 hotdog:   Math.ceil(demandFor('hotdog', 1) * mult) };

  var need = zeroStock();
  ['lemonade', 'hotdog'].forEach(function (p) {
    var r = recipeOf(p);
    for (var k in r.parts) need[k] += r.parts[k] * target[p];
  });

  SUP_KEYS.forEach(function (k) {
    var short = Math.max(0, need[k] - S.stock[k]);
    S.order[k] = Math.min(40, Math.ceil(short / SUPPLIES[k].pack));
  });
  renderPlan();
  toast(t('sup.autoDone', { kind: t('sup.kind.' + level) }));
}

/* ───────────────────────────── plan rendering ───────────────────────────── */

function renderPlan() {
  var day = S.season[S.day - 1];
  var w = WEATHER[day.key];

  /* topbar */
  $('#tbDay').textContent = S.day;
  $('#tbCash').textContent = money0(S.cash);
  $('#tbRepVal').textContent = Math.round(S.rep);
  $('#tbRepFill').style.width = S.rep + '%';
  $('#tbRepFace').textContent = S.rep >= 80 ? '🤩' : S.rep >= 62 ? '😀' : S.rep >= 42 ? '🙂' : S.rep >= 25 ? '😕' : '😞';

  var dots = $('#dayDots');
  if (dots.childElementCount !== TOTAL_DAYS) {
    dots.innerHTML = '';
    for (var i = 0; i < TOTAL_DAYS; i++) dots.appendChild(document.createElement('i'));
  }
  $$('#dayDots i').forEach(function (el, i) {
    el.className = '';
    if (i < S.history.length) el.className = 'done' + (S.history[i].net < 0 ? ' lost' : '');
    else if (i === S.day - 1) el.className = 'now';
  });

  /* forecast */
  $('#fcEmoji').textContent = w.emoji;
  $('#fcWeather').textContent = wName(day.key);
  $('#fcTemp').textContent = temp(day.temp) + ' · ' + t('dow.' + day.dowIdx);

  var crowd = w.traffic * DOW[day.dowIdx] * (day.event ? day.event.traffic : 1);
  $('#fcCrowd').lastElementChild.textContent = t(
    crowd >= 1.7 ? 'crowd.packed' : crowd >= 1.25 ? 'crowd.busy' :
    crowd >= 0.95 ? 'crowd.steady' : crowd >= 0.7 ? 'crowd.slow' : 'crowd.dead');

  var lemPull = w.lem * (day.event && day.event.lem ? day.event.lem : 1);
  var dogPull = w.dog * (day.event && day.event.dog ? day.event.dog : 1);
  $('#fcThirst').lastElementChild.textContent = t(
    lemPull > dogPull * 1.25 ? 'thirst.lem' : dogPull > lemPull * 1.25 ? 'thirst.dog' : 'thirst.both');

  var tm = S.day < TOTAL_DAYS ? S.season[S.day] : null;
  $('#fcTomorrow').lastElementChild.textContent =
    tm ? WEATHER[tm.key].emoji + ' ' + wName(tm.key) : t('fc.lastDay');

  var fe = $('#fcEvent');
  if (day.event) {
    fe.hidden = false;
    fe.innerHTML = day.event.emoji + '  <b>' + t('ev.' + day.event.id + '.name') + '</b> — ' +
                   t('ev.' + day.event.id + '.text');
  } else fe.hidden = true;

  /* menu */
  ['lemonade', 'hotdog'].forEach(function (p) {
    $$('[data-rec="' + p + '"] .rec-btn').forEach(function (b, i) {
      b.classList.toggle('is-on', i === S.recipe[p]);
    });
    var cost = unitCost(p), price = S.prices[p], keep = round2(price - cost);
    $('#pv-' + p).textContent = money(price);
    $('#uc-' + p).textContent = money(cost);
    $('#up-' + p).textContent = money(keep);
    $('#up-' + p).className = keep > 0 ? 'pos' : 'neg';
    $('#um-' + p).textContent = price > 0 ? pct(keep / price) : '—';
    $('#um-' + p).className = keep > 0 ? 'pos' : 'neg';

    var fair = fairPrice(p);
    var ratio = price / fair;
    var fill = clamp((1.6 - ratio) / 1.1, 0, 1);
    $('#dm-' + p).style.width = (fill * 100).toFixed(0) + '%';
    $('#dt-' + p).innerHTML = t(
      ratio > 1.30 ? 'demand.veryHigh' :
      ratio > 1.12 ? 'demand.high' :
      ratio > 0.92 ? 'demand.fair' :
      ratio > 0.75 ? 'demand.low' : 'demand.veryLow');

    $$('[data-price="' + p + '"]').forEach(function (b) {
      b.disabled = (+b.dataset.dir === -1 && price <= 0.25) || (+b.dataset.dir === 1 && price >= 12);
    });
  });

  /* supplies */
  var oc = orderCost();
  var afterStock = stockAfterOrder();
  SUP_KEYS.forEach(function (k) {
    var s = SUPPLIES[k], packs = S.order[k];
    $('#oq-' + k).textContent = packs;
    $('#ol-' + k).textContent = t(packs === 1 ? 'sup.pack' : 'sup.packs');
    $('#oh-' + k).textContent = afterStock[k] + ' ' + supUnit(k);
    $('#sup-' + k).classList.toggle('has', packs > 0);
    var badge = $('#sp-' + k);
    if (badge) {
      var rate = s.spoil;
      if (k === 'ice' && has('cooler')) rate = 0.20;
      if (k === 'buns' && has('bunbox')) rate = 0.08;
      badge.textContent = t('sup.spoils', { pct: pct(rate) });
    }
    if (packs >= 5) $('#ol-' + k).textContent = t('sup.packs') + ' · −' + pct(bulkRate(packs));
  });

  $('#sfBasket').textContent = money(oc.gross);
  $('#sfBulk').textContent = oc.saved > 0 ? '−' + money(oc.saved) : money(0);
  var after = round2(S.cash - oc.net);
  $('#sfAfter').textContent = money(after);
  $('#sfAfter').className = after < 0 ? 'neg' : '';

  /* growth */
  $('#mkVal').textContent = money0(S.marketing);
  $('#mkSlider').value = S.marketing;
  var lift = 0.50 * (1 - Math.exp(-S.marketing / 20));
  $('#mkNote').innerHTML = S.marketing === 0
    ? t('grow.mk.none')
    : t('grow.mk.some', { pct: pct(lift) });

  var st = $('#stToggle');
  st.setAttribute('aria-checked', S.staff ? 'true' : 'false');
  $('.toggle-txt', st).textContent = t(S.staff ? 'grow.staff.on' : 'grow.staff.off');
  $('#stNote').innerHTML = t('grow.staff.note', {
    alone: nDe(capacity() - (S.staff ? STAFF_CAP : 0), t('unit.customers')), extra: STAFF_CAP });

  $$('#upgradeGrid .btn').forEach(function (b, i) {
    var list = UPGRADES.filter(function (u) { return !has(u.id); });
    if (list[i]) b.disabled = S.cash - oc.net < list[i].cost;
  });

  renderProjection(oc, afterStock);
}

function renderProjection(oc, afterStock) {
  var est = runDay(false);
  var costs = round2(oc.net + fixedCosts());

  /* break-even: how many average items must be sold to cover today's outlay */
  var mix = est.want.lemonade + est.want.hotdog;
  var avgProfit = mix > 0
    ? ((est.want.lemonade * (S.prices.lemonade - unitCost('lemonade'))) +
       (est.want.hotdog   * (S.prices.hotdog   - unitCost('hotdog')))) / mix
    : 0;
  var be = avgProfit > 0.01 ? Math.ceil((fixedCosts()) / avgProfit) : 0;

  $('#beNum').textContent = avgProfit > 0.01 ? be : '∞';
  $('#beSub').textContent = t('plan.beSub', { v: money(fixedCosts()) });
  $('#planBE').title = t('plan.beTip', { v: money(avgProfit) });

  $('#prSupplies').textContent = money(oc.net);
  $('#prRent').textContent = money(DIFFS[S.diff].rent);
  $('#prStaff').textContent = money(S.staff ? STAFF_COST : 0);
  $('#prMarketing').textContent = money(S.marketing);
  $('#prTotal').textContent = money(costs);

  $('#canLem').textContent = buildable('lemonade', afterStock);
  $('#canDog').textContent = buildable('hotdog', afterStock);
  $('#canCap').textContent = capacity();

  var box = $('#planEst') || $('.plan-est');
  box.classList.toggle('neg', est.net < 0);
  $('#peVal').textContent = money(est.net, true);
  $('#peBand').textContent = t('plan.estBand', {
    lo: money(est.net - Math.abs(est.revenue) * 0.14),
    hi: money(est.net + Math.abs(est.revenue) * 0.14) });

  /* warnings */
  var warn = [];
  if (round2(S.cash - oc.net) < 0) warn.push(['e', '💸', t('warn.broke')]);
  ['lemonade', 'hotdog'].forEach(function (p) {
    if (S.prices[p] <= unitCost(p)) {
      warn.push(['e', '⚠️', t('warn.belowCost', { name: prodName(p).toLowerCase() })]);
    }
  });
  if (est.lostStock > 2) warn.push(['w', '📦', t('warn.stockout', { n: nDe(Math.round(est.lostStock), t('unit.customers')) })]);
  if (est.lostCap > 2) warn.push(['w', '⏱️', t('warn.capacity', { n: Math.round(est.lostCap) })]);
  var leftoverVal = 0;
  SUP_KEYS.forEach(function (k) {
    var used = 0;
    ['lemonade', 'hotdog'].forEach(function (p) {
      var r = recipeOf(p);
      if (r.parts[k]) used += r.parts[k] * Math.round(est.want[p]);
    });
    leftoverVal += Math.max(0, afterStock[k] - used) * unitPrice(k) * (SUPPLIES[k].spoil || 0);
  });
  if (leftoverVal > 4) warn.push(['w', '🗑️', t('warn.waste', { v: money(leftoverVal) })]);
  if (!warn.length && est.net > 0) warn.push(['g', '✅', t('warn.ok')]);

  $('#planWarn').innerHTML = warn.map(function (x) {
    return '<li class="' + x[0] + '"><span>' + x[1] + '</span><span>' + x[2] + '</span></li>';
  }).join('');

  $('#btnOpen').disabled = round2(S.cash - oc.net) < 0;
}

/* ───────────────────────────── the day itself ───────────────────────────── */

function openStand() {
  var oc = orderCost();
  if (round2(S.cash - oc.net) < 0) return;

  var cashStart = S.cash;                 /* before a single cent is spent today */
  S.cash = round2(S.cash - oc.net);
  S.spent = round2(S.spent + oc.net);
  SUP_KEYS.forEach(function (k) { S.stock[k] += S.order[k] * SUPPLIES[k].pack; });
  S.order = zeroStock();

  var result = runDay(true);
  /* runDay reads the cart, which is now empty — record the real spend here */
  result.supplySpend = oc.net;
  result.cashStart = cashStart;
  startSim(result);
}

/* ───────────────────────────── animated day ───────────────────────────── */

function startSim(res) {
  show('screen-sim');

  var w = WEATHER[res.weather];
  $('#skyTop').setAttribute('stop-color', w.sky[0]);
  $('#skyBottom').setAttribute('stop-color', w.sky[1]);
  var wet = res.weather === 'rainy', grey = wet || res.weather === 'cloudy';
  $('#sunGroup').style.opacity = grey ? 0 : 1;
  buildClouds(grey ? 5 : res.weather === 'warm' || res.weather === 'mild' ? 2 : 0);
  buildRain(wet);

  $('#simTicker').innerHTML = '';
  $('#simLem').textContent = '0';
  $('#simDog').textContent = '0';
  $('#simRev').textContent = '$0.00';
  $('#peopleGroup').innerHTML = '';
  $('#popGroup').innerHTML = '';

  var total = res.sold.lemonade + res.sold.hotdog;
  var queue = [];
  for (var i = 0; i < res.sold.lemonade; i++) queue.push('lemonade');
  for (var j = 0; j < res.sold.hotdog; j++) queue.push('hotdog');
  /* shuffle buyers, then sprinkle in the ones who walk away */
  var r = mulberry(S.seed + S.day * 977);
  for (var k = queue.length - 1; k > 0; k--) {
    var m = Math.floor(r() * (k + 1)); var t = queue[k]; queue[k] = queue[m]; queue[m] = t;
  }
  var walkers = Math.min(30, Math.max(6, total));
  var perWalker = total > 0 ? total / walkers : 0;

  sim = {
    res: res, r: r, t0: performance.now(), dur: 9000,
    total: total, queue: queue, spawned: 0, walkers: walkers, perWalker: perWalker,
    soldL: 0, soldD: 0, rev: 0, people: [], nextSpawn: 0, done: false, skipped: false,
    missed: res.lostStock + res.lostCap, missedShown: 0, ticks: {}
  };

  $('#btnSkip').onclick = function () { finishSim(); };

  /* rAF stops in a hidden tab. This makes sure the day always closes. */
  sim.watchdog = setInterval(function () {
    if (!sim) return;
    if (performance.now() - sim.t0 > sim.dur + 4000) finishSim();
  }, 500);

  lastFrame = 0;
  requestAnimationFrame(simFrame);
}

function buildClouds(n) {
  var g = $('#cloudGroup');
  g.innerHTML = '';
  g.style.opacity = n ? 1 : 0;
  for (var i = 0; i < n; i++) {
    var x = 40 + i * 190 + (i % 2) * 60, y = 44 + (i % 3) * 34, s = 0.75 + (i % 3) * 0.22;
    g.insertAdjacentHTML('beforeend',
      '<g transform="translate(' + x + ',' + y + ') scale(' + s + ')" opacity=".9">' +
      '<ellipse cx="0" cy="0" rx="42" ry="22" fill="#fff"/>' +
      '<ellipse cx="30" cy="6" rx="32" ry="17" fill="#fff"/>' +
      '<ellipse cx="-28" cy="7" rx="27" ry="15" fill="#fff"/></g>');
  }
}

function buildRain(on) {
  var g = $('#rainGroup');
  g.innerHTML = '';
  g.style.opacity = on ? 1 : 0;
  if (!on) return;
  for (var i = 0; i < 60; i++) {
    var x = Math.random() * 900, y = Math.random() * 420;
    g.insertAdjacentHTML('beforeend',
      '<line x1="' + x + '" y1="' + y + '" x2="' + (x - 5) + '" y2="' + (y + 15) + '" stroke="#CFE6F5" stroke-width="2" opacity=".65">' +
      '<animateTransform attributeName="transform" type="translate" from="0 -60" to="0 420" dur="' +
      (0.7 + Math.random() * 0.5) + 's" repeatCount="indefinite"/></line>');
  }
}

var SHIRTS = ['#EF5A3C','#4A9BE8','#2F9E44','#6C4FD8','#E87BA4','#F2A81D','#14A38B','#D9534F'];
var SKINS  = ['#F3C9A0','#E0A878','#C08552','#8D5524','#FFDFC4','#A9714B'];

function spawnWalker(buys, type) {
  var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  var r = sim.r;
  var shirt = SHIRTS[Math.floor(r() * SHIRTS.length)];
  var skin  = SKINS[Math.floor(r() * SKINS.length)];
  var kid = r() < 0.45;
  var s = kid ? 0.78 : 1;
  g.setAttribute('class', 'walker');
  g.innerHTML =
    '<g transform="scale(' + s + ')">' +
    '<ellipse cx="0" cy="2" rx="13" ry="4" fill="#33261A" opacity=".13"/>' +
    '<rect x="-4" y="-14" width="3.5" height="14" rx="1.6" fill="#4A3524"/>' +
    '<rect x="1" y="-14" width="3.5" height="14" rx="1.6" fill="#4A3524"/>' +
    '<rect x="-10" y="-34" width="20" height="22" rx="8" fill="' + shirt + '"/>' +
    '<circle cx="0" cy="-43" r="10" fill="' + skin + '"/>' +
    '<path d="M-10 -46 a10 10 0 0 1 20 0 z" fill="#3A2A1C" opacity=".85"/>' +
    '<g class="carry" opacity="0"></g></g>';

  var w = {
    el: g, x: 960, y: 372 + Math.floor(r() * 16), buys: buys, type: type,
    speed: 105 + r() * 45, state: 'in', wait: 0, bob: r() * 6.28
  };
  $('#peopleGroup').appendChild(g);
  sim.people.push(w);
}

function giveItem(w) {
  var c = $('.carry', w.el);
  if (!c) return;
  c.innerHTML = w.type === 'lemonade'
    ? '<g transform="translate(11,-30)"><path d="M-4 -7 h8 l-1.2 11 h-5.6 z" fill="#FFD75E" stroke="#E2A400" stroke-width="1.4"/></g>'
    : '<g transform="translate(11,-28)"><rect x="-5" y="-3" width="11" height="6" rx="3" fill="#F2C27E"/><rect x="-4" y="-1.6" width="9" height="3" rx="1.5" fill="#E05C3E"/></g>';
  c.setAttribute('opacity', '1');
}

function popMoney(x, amount) {
  var t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  t.setAttribute('class', 'pop');
  t.setAttribute('x', x);
  t.setAttribute('y', 330);
  t.setAttribute('text-anchor', 'middle');
  t.textContent = '+' + money(amount);
  $('#popGroup').appendChild(t);
  var start = performance.now();
  (function rise(now) {
    var p = (now - start) / 1100;
    if (p >= 1) { t.remove(); return; }
    t.setAttribute('y', 330 - p * 52);
    t.setAttribute('opacity', 1 - p * p);
    requestAnimationFrame(rise);
  })(start);
}

function addTick(txt) {
  var d = document.createElement('div');
  d.className = 'tick';
  d.innerHTML = txt;
  var box = $('#simTicker');
  box.appendChild(d);
  while (box.childElementCount > 3) box.firstElementChild.remove();
}

var lastFrame = 0;
function simFrame(now) {
  if (!sim) return;
  if (sim.skipped) { finishSim(); return; }

  var dt = Math.min(0.05, (now - (lastFrame || now)) / 1000);
  lastFrame = now;
  var p = clamp((now - sim.t0) / sim.dur, 0, 1);

  $('#simBarFill').style.width = (p * 100) + '%';
  var mins = 10 * 60 + p * 7 * 60;
  var hh = Math.floor(mins / 60), mm = Math.floor(mins % 60);
  $('#simClock').textContent = LANG === 'ro'
    ? hh + ':' + (mm < 10 ? '0' : '') + mm
    : (hh > 12 ? hh - 12 : hh) + ':' + (mm < 10 ? '0' : '') + mm + (hh >= 12 ? ' PM' : ' AM');

  /* spawn */
  if (sim.spawned < sim.walkers && p < 0.94 && now >= sim.nextSpawn) {
    var buys = sim.queue.length > 0;
    var type = buys ? sim.queue[0] : null;
    spawnWalker(buys, type);
    sim.spawned++;
    sim.nextSpawn = now + (sim.dur * 0.9) / sim.walkers * (0.6 + sim.r() * 0.8);
  }

  /* move */
  for (var i = sim.people.length - 1; i >= 0; i--) {
    var w = sim.people[i];
    w.bob += dt * 9;
    if (w.state === 'in') {
      w.x -= w.speed * dt;
      if (w.x <= 470) {
        if (w.buys) { w.state = 'wait'; w.wait = 0.45 + sim.r() * 0.3; }
        else { w.state = 'out'; }
      }
    } else if (w.state === 'wait') {
      w.wait -= dt;
      if (w.wait <= 0) {
        w.state = 'out';
        sellOne(w);
      }
    } else {
      w.x -= w.speed * dt;
      if (w.x < -60) { w.el.remove(); sim.people.splice(i, 1); continue; }
    }
    var bob = w.state === 'wait' ? 0 : Math.sin(w.bob) * 1.6;
    w.el.setAttribute('transform', 'translate(' + w.x.toFixed(1) + ',' + (w.y + bob).toFixed(1) + ')');
  }

  /* keep the counters in step with elapsed time even if walkers lag */
  var targetL = Math.round(sim.res.sold.lemonade * p);
  var targetD = Math.round(sim.res.sold.hotdog * p);
  if (sim.soldL < targetL - 3) { sim.soldL = targetL - 3; }
  if (sim.soldD < targetD - 3) { sim.soldD = targetD - 3; }
  paintHud();

  /* missed-customer notes */
  if (sim.missed > 0 && p > 0.55 && !sim.ticks.missed) {
    sim.ticks.missed = 1;
    if (sim.res.lostStock > 2) addTick(t('sim.soldOut', { n: nDe(Math.round(sim.res.lostStock), t('unit.people')) }));
    else if (sim.res.lostCap > 2) addTick(t('sim.queue', { n: Math.round(sim.res.lostCap) }));
  }
  if (p > 0.25 && !sim.ticks.q) {
    sim.ticks.q = 1;
    addTick(t(sim.total > 25 ? 'sim.busy' : sim.total > 10 ? 'sim.steady' : 'sim.quiet'));
  }

  if (p >= 1 && sim.people.length === 0) { finishSim(); return; }
  if (p >= 1 && now - sim.t0 > sim.dur + 3000) { finishSim(); return; }
  requestAnimationFrame(simFrame);
}

function sellOne(w) {
  if (!sim.queue.length) return;
  var type = sim.queue.shift();
  w.type = type;
  giveItem(w);
  /* one walker on screen can stand in for a small group of real customers */
  var count = Math.max(1, Math.round(sim.perWalker));
  var groupL = 0, groupD = 0;
  for (var i = 0; i < count - 1 && sim.queue.length; i++) {
    var extra = sim.queue.shift();
    if (extra === 'lemonade') groupL++; else groupD++;
  }
  if (type === 'lemonade') groupL++; else groupD++;

  sim.soldL = Math.min(sim.res.sold.lemonade, sim.soldL + groupL);
  sim.soldD = Math.min(sim.res.sold.hotdog, sim.soldD + groupD);
  popMoney(470, groupL * sim.res.prices.lemonade + groupD * sim.res.prices.hotdog);
  paintHud();
}

function paintHud() {
  sim.rev = round2(sim.soldL * sim.res.prices.lemonade + sim.soldD * sim.res.prices.hotdog);
  $('#simLem').textContent = sim.soldL;
  $('#simDog').textContent = sim.soldD;
  $('#simRev').textContent = money(sim.rev);
}

function finishSim() {
  if (!sim || sim.done) return;
  sim.done = true;
  clearInterval(sim.watchdog);
  var res = sim.res;
  sim = null;
  closeDay(res);
}

/* ───────────────────────────── closing the books ───────────────────────────── */

function closeDay(res) {
  S.cash = round2(S.cash + res.revenue - res.fixed);
  res.cashEnd = S.cash;
  S.earned = round2(S.earned + res.revenue);
  S.spent = round2(S.spent + res.fixed);
  S.stock = res.kept;
  S.rep = clamp(round2(S.rep + res.repDelta), 5, 100);
  S.awareness = clamp(S.awareness * 0.5 + S.marketing / 100, 0, 0.6);
  S.history.push(res);
  save();
  renderReport(res);
  show('screen-report');
}

function renderReport(res) {
  $('#rpDay').textContent = res.day;

  $('#rpTitle').textContent = t(
    res.net > 45 ? 'rp.title.great' : res.net > 15 ? 'rp.title.good' :
    res.net > 0  ? 'rp.title.ok'    : res.net > -12 ? 'rp.title.small' : 'rp.title.bad');
  $('#rpProfit').textContent = money(res.net, true);
  $('#rpHero').classList.toggle('neg', res.net < 0);
  var margin = res.revenue > 0 ? res.net / res.revenue : 0;
  $('#rpProfitSub').textContent = res.revenue > 0
    ? t('rp.profitSubPct', { n: nDe(Math.round(margin * 100), t('unit.cents')) })
    : t('rp.noSales');

  /* P&L */
  var rows = [];
  rows.push(['head', t('pnl.in'), '']);
  rows.push(['', prodName('lemonade') + ' &nbsp;<small>' +
    t('pnl.each', { n: res.sold.lemonade, v: money(res.prices.lemonade) }) + '</small>',
    money(res.sold.lemonade * res.prices.lemonade)]);
  rows.push(['', prodName('hotdog') + ' &nbsp;<small>' +
    t('pnl.each', { n: res.sold.hotdog, v: money(res.prices.hotdog) }) + '</small>',
    money(res.sold.hotdog * res.prices.hotdog)]);
  rows.push(['sum', t('pnl.revenue'), money(res.revenue)]);

  rows.push(['head', t('pnl.cogs'), '']);
  rows.push(['', t('pnl.cogsLem') + ' <span class="why">' +
    t('pnl.cogsWhyLem', { n: res.sold.lemonade, v: money(unitCostOf(res, 'lemonade')) }) + '</span>',
    '<span class="neg">' + money(-res.cogsL) + '</span>']);
  rows.push(['', t('pnl.cogsDog') + ' <span class="why">' +
    t('pnl.cogsWhyDog', { n: res.sold.hotdog, v: money(unitCostOf(res, 'hotdog')) }) + '</span>',
    '<span class="neg">' + money(-res.cogsD) + '</span>']);
  rows.push(['sum', t('pnl.gross'), money(res.gross)]);

  rows.push(['head', t('pnl.fixed'), '']);
  rows.push(['', t('pnl.rent'), '<span class="neg">' + money(-res.rent) + '</span>']);
  if (res.staff)     rows.push(['', t('pnl.staff'), '<span class="neg">' + money(-res.staff) + '</span>']);
  if (res.marketing) rows.push(['', t('pnl.marketing'), '<span class="neg">' + money(-res.marketing) + '</span>']);
  if (res.waste)     rows.push(['', t('pnl.waste') + ' <span class="why">' + t('pnl.wasteWhy') + '</span>',
    '<span class="neg">' + money(-res.waste) + '</span>']);
  rows.push(['total', t('pnl.net'),
    '<span class="' + (res.net >= 0 ? 'pos' : 'neg') + '">' + money(res.net, true) + '</span>']);

  $('#pnlBody').innerHTML = rows.map(function (r) {
    return '<tr class="' + r[0] + '"><td>' + r[1] + '</td><td>' + r[2] + '</td></tr>';
  }).join('');

  /* cash, step by step — this must tie out exactly, or the numbers lose all trust */
  var cf = [
    [t('cf.start'), money(res.cashStart), ''],
    [t('cf.supplies'), money(-res.supplySpend), 'neg'],
    [t('cf.revenue'), money(res.revenue, true), 'pos'],
    [t('cf.rent'), money(-res.rent), 'neg']
  ];
  if (res.staff)     cf.push([t('cf.staff'), money(-res.staff), 'neg']);
  if (res.marketing) cf.push([t('cf.marketing'), money(-res.marketing), 'neg']);
  cf.push([t('cf.end'), money(res.cashEnd), 'tot']);

  $('#cashFlow').innerHTML = cf.map(function (r) {
    return '<tr class="' + (r[2] === 'tot' ? 'cf-total' : '') + '"><td>' + r[0] +
           '</td><td class="' + (r[2] === 'tot' ? '' : r[2]) + '">' + r[1] + '</td></tr>';
  }).join('');

  var stockVal = 0;
  SUP_KEYS.forEach(function (k) { stockVal += res.kept[k] * unitPrice(k); });
  var rd = res.repDelta;
  var repTxt = Math.abs(rd) < 0.05
    ? '<span style="color:var(--ink-3)">' + t('cf.unchanged') + '</span>'
    : rd > 0 ? '<span style="color:var(--good-ink)">▲ +' + rd.toFixed(1) + '</span>'
             : '<span style="color:var(--bad)">▼ −' + Math.abs(rd).toFixed(1) + '</span>';
  /* profit and cash rarely match — say why, in plain words */
  var cashMoved = round2(res.cashEnd - res.cashStart);
  var gap = round2(res.net - cashMoved);
  var why = '';
  if (Math.abs(gap) >= 1) {
    why = t(gap > 0 ? 'cf.gapUp' : 'cf.gapDown', {
      profit: money(res.net, true), cash: money(cashMoved, true), gap: money(Math.abs(gap)) });
  }
  $('#cashLine').innerHTML = t('cf.repLine', { rep: repTxt, v: money(stockVal) }) + why;

  renderMoneyFlow(res);
  renderCoach(res);
  drawProfitChart($('#chartHolder'), S.history);

  $('#btnNextDay').textContent = t(S.day >= TOTAL_DAYS ? 'rp.finish' : 'rp.next');
}

function unitCostOf(res, prod) {
  var r = RECIPES[prod][res.recipe[prod]], c = 0;
  for (var k in r.parts) c += r.parts[k] * unitPrice(k);
  return round2(c);
}

function renderMoneyFlow(res) {
  var costs = [
    { k: t('mf.ingredients'), v: res.cogs,      c: 'var(--dv-1)' },
    { k: t('mf.rent'),        v: res.rent,      c: 'var(--dv-2)' },
    { k: t('mf.staff'),       v: res.staff,     c: 'var(--dv-3)' },
    { k: t('mf.marketing'),   v: res.marketing, c: 'var(--dv-4)' },
    { k: t('mf.waste'),       v: res.waste,     c: 'var(--dv-waste)' }
  ].filter(function (s) { return s.v > 0.004; });

  var costTotal = round2(costs.reduce(function (a, s) { return a + s.v; }, 0));
  var segs, total, hint, note = '';

  if (res.net >= 0) {
    /* costs + profit add up to exactly the revenue */
    segs = costs.concat([{ k: t('mf.profit'), v: res.net, c: 'var(--dv-5)' }]);
    total = res.revenue || 1;
    hint = t('mf.hintProfit', { v: money(res.revenue) });
  } else {
    /* costs overshot revenue, so the bar shows the spending instead */
    segs = costs;
    total = costTotal || 1;
    hint = t('mf.hintLoss', { spent: money(costTotal), got: money(res.revenue) });
    note = '<li style="color:var(--bad)"><i style="background:var(--bad)"></i>' + t('mf.short') +
           '<b>' + money(-res.net) + '</b><em></em></li>';
  }

  $('#mfHint').innerHTML = hint;

  $('#moneyFlow').innerHTML = segs.map(function (s) {
    var share = s.v / total;
    return '<div class="mf-seg" style="flex:' + s.v + ' 1 0;background:' + s.c + '">' +
           (share > 0.12 ? '<span>' + Math.round(share * 100) + '%</span>' : '') + '</div>';
  }).join('');

  $('#mfLegend').innerHTML = segs.map(function (s) {
    return '<li><i style="background:' + s.c + '"></i>' + s.k +
           '<b>' + money(s.v) + '</b><em>' + Math.round((s.v / total) * 100) + '%</em></li>';
  }).join('') + note;
}

/* ───────────────────────────── Coach Ollie ───────────────────────────── */

function renderCoach(res) {
  var tip = null, term = null;
  var margin = res.revenue > 0 ? res.net / res.revenue : 0;
  var sold = res.sold.lemonade + res.sold.hotdog;

  var priceHigh = null, priceLow = null;
  ['lemonade', 'hotdog'].forEach(function (p) {
    var fair = PRODUCTS[p].baseFair * RECIPES[p][res.recipe[p]].fair *
               (p === 'lemonade' ? WEATHER[res.weather].lemFair : WEATHER[res.weather].dogFair);
    var ratio = res.prices[p] / fair;
    if (ratio > 1.22) priceHigh = p;
    if (ratio < 0.72) priceLow = p;
  });

  if (res.revenue === 0) {
    tip = t('coach.nothing'); term = t('coach.nothing.t');
  } else if (res.lostStock > 3) {
    var missedMoney = res.lostStock * ((res.prices.lemonade + res.prices.hotdog) / 2);
    tip = t('coach.stockout', { n: nDe(Math.round(res.lostStock), t('unit.customers')), v: money(missedMoney) });
    term = t('coach.stockout.t');
  } else if (res.lostCap > 3) {
    tip = t('coach.capacity', { n: nDe(Math.round(res.lostCap), t('unit.people')),
      cost: money(STAFF_COST), cap: nDe(STAFF_CAP, t('unit.customers')) });
    term = t('coach.capacity.t');
  } else if (res.waste > 6) {
    tip = t('coach.waste', { v: money(res.waste) }); term = t('coach.waste.t');
  } else if (priceHigh && margin < 0.30) {
    tip = t('coach.priceHigh', { name: prodName(priceHigh).toLowerCase() });
    term = t('coach.priceHigh.t');
  } else if (priceLow) {
    tip = t('coach.priceLow', { name: prodName(priceLow).toLowerCase() });
    term = t('coach.priceLow.t');
  } else if (res.net < 0) {
    tip = t('coach.loss', { v: money(-res.net),
      why: t(res.gross < res.fixed ? 'coach.loss.whyFixed' : 'coach.loss.whyCogs') });
    term = t('coach.loss.t');
  } else if (res.marketing > 0 && res.marketing > res.net * 0.6) {
    tip = t('coach.mkROI', { spent: money(res.marketing), net: money(res.net) });
    term = t('coach.mkROI.t');
  } else if (res.staff && res.net < 20) {
    tip = t('coach.staff', { cost: money(res.staff), n: nDe(sold, t('unit.customers')) }); term = t('coach.staff.t');
  } else if (margin > 0.40 && res.net > 25) {
    tip = t('coach.great', { n: nDe(Math.round(margin * 100), t('unit.cents')) }); term = t('coach.great.t');
  } else {
    tip = t('coach.steady'); term = t('coach.steady.t');
  }

  $('#coachTxt').innerHTML = tip;
  $('#coachTerm').innerHTML = term;
}

/* ───────────────────────────── profit chart ───────────────────────────── */

function drawProfitChart(holder, history) {
  var W = 640, H = 210, padL = 40, padR = 10, padT = 14, padB = 26;
  var iw = W - padL - padR, ih = H - padT - padB;

  var vals = history.map(function (h) { return h.net; });
  var max = Math.max(10, Math.max.apply(null, vals.concat([0])));
  var min = Math.min(0, Math.min.apply(null, vals.concat([0])));
  var span = (max - min) || 1;
  var y0 = padT + ih * (max / span);                       /* the zero line */
  var slot = iw / TOTAL_DAYS;
  var bw = Math.min(26, slot * 0.62);

  function yOf(v) { return padT + ih * ((max - v) / span); }

  var svg = ['<svg class="chart-svg" viewBox="0 0 ' + W + ' ' + H +
             '" role="img" aria-label="' + t('chart.title') + '">'];

  /* recessive gridlines */
  [max, (max + min) / 2, min].forEach(function (g) {
    if (Math.abs(g) < 0.01 && g !== 0) return;
    svg.push('<line class="ct-grid" x1="' + padL + '" y1="' + yOf(g).toFixed(1) + '" x2="' + (W - padR) + '" y2="' + yOf(g).toFixed(1) + '"/>');
    svg.push('<text class="ct-lab" x="' + (padL - 7) + '" y="' + (yOf(g) + 4).toFixed(1) + '" text-anchor="end">' + money0(g) + '</text>');
  });
  svg.push('<line class="ct-base" x1="' + padL + '" y1="' + y0.toFixed(1) + '" x2="' + (W - padR) + '" y2="' + y0.toFixed(1) + '"/>');

  for (var d = 0; d < TOTAL_DAYS; d++) {
    var cx = padL + slot * (d + 0.5);
    svg.push('<text class="ct-lab" x="' + cx.toFixed(1) + '" y="' + (H - 8) + '" text-anchor="middle">' + (d + 1) + '</text>');
    if (d >= history.length) continue;

    var v = history[d].net;
    var top = v >= 0 ? yOf(v) : y0;
    var h = Math.max(2.5, Math.abs(yOf(v) - y0));
    var col = v >= 0 ? 'var(--good)' : 'var(--bad)';
    /* 4px rounded data-end, square against the baseline */
    var r = Math.min(4, h / 2);
    svg.push('<rect class="ct-bar" x="' + (cx - bw / 2).toFixed(1) + '" y="' + top.toFixed(1) +
             '" width="' + bw.toFixed(1) + '" height="' + h.toFixed(1) + '" rx="' + r.toFixed(1) +
             '" fill="' + col + '" data-d="' + d + '"/>');
    if (v >= 0) svg.push('<rect x="' + (cx - bw / 2).toFixed(1) + '" y="' + (y0 - Math.min(r, h)).toFixed(1) +
             '" width="' + bw.toFixed(1) + '" height="' + Math.min(r, h).toFixed(1) + '" fill="' + col + '"/>');
    else svg.push('<rect x="' + (cx - bw / 2).toFixed(1) + '" y="' + y0.toFixed(1) +
             '" width="' + bw.toFixed(1) + '" height="' + Math.min(r, h).toFixed(1) + '" fill="' + col + '"/>');

    svg.push('<rect class="ct-hit" x="' + (cx - slot / 2).toFixed(1) + '" y="' + padT + '" width="' + slot.toFixed(1) +
             '" height="' + ih + '" data-tip="' + d + '"/>');
  }
  svg.push('</svg>');

  holder.className = 'chart-holder chart-wrap';
  holder.innerHTML = svg.join('');

  var tip = document.createElement('div');
  tip.className = 'chart-tip';
  tip.style.display = 'none';
  holder.appendChild(tip);

  $$('.ct-hit', holder).forEach(function (hit) {
    hit.addEventListener('mouseenter', function () {
      var h = history[+hit.dataset.tip];
      var box = holder.getBoundingClientRect();
      var r = hit.getBoundingClientRect();
      tip.style.display = 'block';
      tip.style.left = (r.left - box.left + r.width / 2) + 'px';
      tip.style.top = (r.top - box.top + 24) + 'px';
      tip.innerHTML = t('chart.tipDay', { d: h.day }) + ' · ' + WEATHER[h.weather].emoji + '<br>' +
        t('chart.tipProfit', { v: money(h.net, true) }) + '<br>' +
        '<span style="opacity:.7">' + t('chart.tipItems', { n: nDe(h.sold.lemonade + h.sold.hotdog, t('unit.items')) }) + '</span>';
    });
    hit.addEventListener('mouseleave', function () { tip.style.display = 'none'; });
  });
}

/* ───────────────────────────── finale ───────────────────────────── */

function nextDay() {
  if (S.day >= TOTAL_DAYS) { renderFinale(); show('screen-finale'); clearSave(); return; }
  S.day++;
  startDay();
}

function renderFinale() {
  var goal = DIFFS[S.diff].goal;
  var won = S.cash >= goal;
  var profits = S.history.map(function (h) { return h.net; });
  var totalProfit = round2(profits.reduce(function (a, b) { return a + b; }, 0));
  var best = S.history.reduce(function (a, b) { return b.net > a.net ? b : a; }, S.history[0]);
  var items = S.history.reduce(function (a, h) { return a + h.sold.lemonade + h.sold.hotdog; }, 0);
  var waste = round2(S.history.reduce(function (a, h) { return a + h.waste; }, 0));

  $('#finEmoji').textContent = won ? '🏆' : S.cash >= goal * 0.7 ? '🌟' : '🍋';
  $('#finTitle').textContent = t(won ? 'fin.won' : S.cash >= goal * 0.7 ? 'fin.close' : 'fin.done');
  $('#finSub').innerHTML = t(won ? 'fin.wonSub' : 'fin.lostSub',
    { name: S.name, cash: money0(S.cash), goal: money0(goal) });

  $('#finStats').innerHTML = [
    [t('fin.stat.cash'), money0(S.cash), won ? 'var(--good-ink)' : 'var(--ink)'],
    [t('fin.stat.profit'), money0(totalProfit), totalProfit >= 0 ? 'var(--good-ink)' : 'var(--bad)'],
    [t('fin.stat.items'), items.toLocaleString(), 'var(--ink)'],
    [t('fin.stat.best'), money0(best ? best.net : 0) +
      ' <small>' + t('fin.stat.bestDay', { d: best ? best.day : 1 }) + '</small>', 'var(--ink)'],
    [t('fin.stat.rep'), Math.round(S.rep) + ' / 100', 'var(--ink)'],
    [t('fin.stat.waste'), money0(waste), waste > 30 ? 'var(--bad)' : 'var(--ink)']
  ].map(function (s) {
    return '<div class="fstat"><span>' + s[0] + '</span><b style="color:' + s[2] + '">' + s[1] + '</b></div>';
  }).join('');

  drawProfitChart($('#finChart'), S.history);

  var everyDayProfit = profits.every(function (v) { return v > 0; });
  var badges = [
    ['🎯', 'goal',   won],
    ['📈', 'green',  everyDayProfit],
    ['⭐', 'fav',    S.rep >= 85],
    ['💥', 'big',    profits.some(function (v) { return v >= 60; })],
    ['♻️', 'waste',  waste < 25],
    ['🏗️', 'empire', S.upgrades.length >= 3],
    ['🧠', 'pricer',
      S.history.length && (totalProfit / Math.max(1, S.history.reduce(function (a, h) { return a + h.revenue; }, 0))) > 0.30]
  ];
  $('#finBadges').innerHTML = badges.map(function (b) {
    return '<div class="badge' + (b[2] ? ' got' : '') + '"><span class="badge-em">' + b[0] + '</span>' +
           '<div><b>' + t('badge.' + b[1] + '.name') + '</b>' +
           '<small>' + t('badge.' + b[1] + '.desc') + '</small></div></div>';
  }).join('');
}

/* ───────────────────────────── boot ───────────────────────────── */

$('#btnNextDay').addEventListener('click', nextDay);
$('#btnReplay').addEventListener('click', newStand);
applyStaticStrings();
markLangButtons();
initStart();

})();
