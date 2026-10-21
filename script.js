'use strict';

/* ============================================================
   1. データ（予定や動画を追加・修正するときは、ここだけ編集します）
   ============================================================ */

// サイトの更新情報（ロゴの下に流れます）。新しいものを先頭に追加してください。
// 表示されるのは先頭から UPDATES_SHOWN 件だけです。href はページ内リンク（任意）。
const UPDATES = [
  { date: '2026-10-21', text: 'メンバーの公式プロフィールへのリンクと、和田颯のYouTube「ハヤテと○○」を追加しました', href: '#members' },
  { date: '2026-10-20', text: '最新動画を「うららか」Dance Performance Videoに更新しました', href: '#latest-mv' },
  { date: '2026-10-20', text: 'サイトのデザインをリニューアルしました' },
];
const UPDATES_SHOWN = 3;

// 日程データを最後に確認した日（カレンダー下に表示されます）
const DATA_CHECKED = '2026年10月19日';

// 最新動画（id は YouTube の動画ID。youtu.be/ や watch?v= の後ろの文字列）
// 先頭の動画が最初に表示されます。新しい動画は先頭に追加してください。
const VIDEOS = [
  { id: 'ZnvP0DWBgWY', title: 'うららか', kind: 'Dance Performance Video', date: '2026年10月16日公開', note: 'フジテレビ系木曜劇場『波うららかに、めおと日和』主題歌。作詞・作曲は花村想太と小池竜暉（GENIC）、振付はShow-hey。' },
  { id: 'XRVcv9ZBTYE', title: 'アンリミテッド', kind: 'Music Video', date: '2026年7月17日公開', note: 'キリンビール「のどごし＜生＞」CMソング。作詞・作曲は工藤大輝と花村想太。' },
  { id: 'YLpP_abIUcc', title: 'アンリミテッド', kind: 'Dance Performance Video', date: '2026年8月3日公開', note: '振付は和田颯とgash!（Beat Buddy Boi）。MVでは見られないダンスをフルサイズで楽しめます。' },
  { id: 'EF1hQ9Q26Ks', title: 'アンリミテッド', kind: 'Music Video - Behind The Scenes', date: '2026年7月24日公開', note: 'MVの撮影の裏側を収めたビハインド映像です。' },
];

// 種類の表示名（type の値と対応）
const TYPE_META = {
  hallA: { label: 'ホールツアー Side A',            short: 'Side A',        filter: 'Side A' },
  hallB: { label: 'ホールツアー Side B (a-i side)', short: 'Side B',        filter: 'Side B (a-i side)' },
  dome:  { label: 'ドームツアー',                   short: 'ドーム',        filter: 'ドーム' },
  fest:  { label: 'フェス・イベント',               short: 'フェス',        filter: 'フェス・イベント' },
};
const TYPE_ORDER = ['hallA', 'hallB', 'dome', 'fest'];

const HALL_TITLE = 'Da-iCE DAY HALL PHASE 2026';
const DOME_TITLE = 'Da-iCE DAY DOME PHASE 2027';

// ホールツアー用の書き方を短くするヘルパー
const hall = (date, side, pref, venue, open, start) => ({
  date, type: side === 'A' ? 'hallA' : 'hallB', title: HALL_TITLE, pref, venue, open, start,
});

// 予定一覧。date は 'YYYY-MM-DD'、open / start は開場・開演時刻。
// 新しい予定は { date, type, title, pref, venue, open, start, note? } の形で追加してください。
const SCHEDULE = [
  // Da-iCE DAY HALL PHASE 2026（全22公演。Side A / Side B (a-i side) が11公演ずつ）
  hall('2026-10-13', 'A', '大阪',   'グランキューブ大阪 メインホール',                 '18:00', '19:00'),
  hall('2026-10-14', 'B', '大阪',   'グランキューブ大阪 メインホール',                 '17:30', '18:30'),
  hall('2026-10-21', 'B', '岐阜',   '長良川国際会議場 メインホール',                   '17:30', '18:30'),
  hall('2026-10-22', 'A', '愛知',   '愛知県芸術劇場 大ホール',                         '17:30', '18:30'),
  hall('2026-10-25', 'A', '福岡',   '福岡サンパレス',                                   '16:30', '17:30'),
  hall('2026-10-27', 'B', '大分',   'iichikoグランシアタ',                             '17:30', '18:30'),
  hall('2026-10-29', 'B', '和歌山', '和歌山県民文化会館 大ホール',                     '17:30', '18:30'),
  hall('2026-11-02', 'A', '神奈川', 'よこすか芸術劇場',                                '17:30', '18:30'),
  hall('2026-11-04', 'A', '埼玉',   '大宮ソニックシティ 大ホール',                     '17:30', '18:30'),
  hall('2026-11-06', 'B', '愛媛',   '愛媛県県民文化会館 メインホール',                 '17:30', '18:30'),
  hall('2026-11-08', 'A', '京都',   'ロームシアター京都 メインホール',                 '16:30', '17:30'),
  hall('2026-11-17', 'A', '東京',   '東京ガーデンシアター',                            '18:00', '19:00'),
  hall('2026-11-18', 'B', '東京',   '東京ガーデンシアター',                            '17:30', '18:30'),
  hall('2026-11-24', 'A', '香川',   'レクザムホール',                                  '17:30', '18:30'),
  hall('2026-11-26', 'A', '石川',   '本多の森 北電ホール',                             '17:30', '18:30'),
  hall('2026-11-29', 'B', '宮城',   '仙台サンプラザホール',                            '16:30', '17:30'),
  hall('2026-12-01', 'B', '岡山',   '倉敷市民会館',                                    '17:30', '18:30'),
  hall('2026-12-03', 'B', '長野',   'ホクト文化ホール（長野県県民文化会館）大ホール',  '17:30', '18:30'),
  hall('2026-12-05', 'B', '群馬',   '高崎芸術劇場 大劇場',                             '16:30', '17:30'),
  hall('2026-12-07', 'A', '広島',   '広島文化学園HBGホール',                           '17:30', '18:30'),
  hall('2026-12-10', 'B', '千葉',   '市川市文化会館 大ホール',                         '17:30', '18:30'),
  hall('2026-12-15', 'A', '北海道', '札幌文化芸術劇場 hitaru',                         '17:30', '18:30'),

  // フェス
  {
    date: '2026-11-22', type: 'fest', chip: 'ドリフェス',
    title: '15th Anniversary テレビ朝日ドリームフェスティバル2026',
    pref: '神奈川', venue: 'Kアリーナ横浜', open: '13:30', start: '15:00',
    note: 'Da-iCEの出演は22日（日）です。開場・開演時刻は予定のため、変更される場合があります。',
  },

  // Da-iCE DAY DOME PHASE 2027（グループ初のドームツアー）
  { date: '2027-02-04', type: 'dome', title: DOME_TITLE, pref: '東京', venue: '東京ドーム',       open: '16:00', start: '18:00' },
  { date: '2027-02-13', type: 'dome', title: DOME_TITLE, pref: '大阪', venue: '京セラドーム大阪', open: '15:00', start: '17:00' },
  { date: '2027-02-14', type: 'dome', title: DOME_TITLE, pref: '大阪', venue: '京セラドーム大阪', open: '13:00', start: '15:00' },
];

/* ============================================================
   2. 共通ヘルパー
   ============================================================ */

const REDUCE_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土'];
const HEADER_OFFSET = 62;

const pad = n => String(n).padStart(2, '0');
const keyOf = (y, m, d) => `${y}-${pad(m)}-${pad(d)}`; // m は 1〜12
const parseKey = key => { const [y, m, d] = key.split('-').map(Number); return { y, m, d }; };
const weekdayOf = key => { const { y, m, d } = parseKey(key); return new Date(y, m - 1, d).getDay(); };
const fmtDateJa = key => { const { m, d } = parseKey(key); return `${m}月${d}日（${WEEKDAYS[weekdayOf(key)]}）`; };
const todayKey = () => { const t = new Date(); return keyOf(t.getFullYear(), t.getMonth() + 1, t.getDate()); };
const daysUntil = key => {
  const { y, m, d } = parseKey(key);
  const t = new Date();
  const today = new Date(t.getFullYear(), t.getMonth(), t.getDate());
  return Math.round((new Date(y, m - 1, d) - today) / 86400000);
};

// 日付順・開演順に並べ、カレンダー用のラベルを補う
const EVENTS = SCHEDULE
  .map(e => ({
    ...e,
    chip: e.chip || ({ hallA: 'A ', hallB: 'B ', dome: 'ドーム ' }[e.type] || '') + e.pref,
  }))
  .sort((a, b) => (a.date === b.date ? a.start.localeCompare(b.start) : a.date.localeCompare(b.date)));

// 今日以降でいちばん近い予定（すべて終了している場合は最後の予定）
const nextEvent = () => EVENTS.find(e => e.date >= todayKey()) || EVENTS[EVENTS.length - 1];

// DOMを組み立てる小さなヘルパー
function h(tag, props = {}, ...kids) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (v == null || v === false) continue;
    if (k === 'class') el.className = v;
    else if (k === 'text') el.textContent = v;
    else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2), v);
    else el.setAttribute(k, v === true ? '' : v);
  }
  kids.flat().forEach(c => {
    if (c == null || c === false) return;
    el.append(c.nodeType ? c : document.createTextNode(c));
  });
  return el;
}

/* ============================================================
   2.5 更新情報ティッカー（ロゴの下を右から左へ流れる）
   initNav より前に呼び、ページ内リンクにもスムーズスクロールが効くようにする
   ============================================================ */

function initNews() {
  const box = document.getElementById('news-ticker');
  const track = document.getElementById('news-ticker-track');
  if (!box || !track || !UPDATES.length) return;

  const fmt = key => key.replace(/-/g, '.');
  const items = UPDATES.slice(0, UPDATES_SHOWN);

  // copy=true は切れ目なく流すための複製（読み上げ・タブ移動の対象外）
  const group = copy => items.map((u, i) => h('li', { class: `news-item${i === 0 ? ' is-latest' : ''}`, 'aria-hidden': copy ? 'true' : null },
    h('time', { class: 'news-date', datetime: u.date, text: fmt(u.date) }),
    u.href
      ? h('a', { class: 'news-text', href: u.href, tabindex: copy ? '-1' : null, text: u.text })
      : h('span', { class: 'news-text', text: u.text })));

  track.replaceChildren(...group(false));
  box.hidden = false;

  if (REDUCE_MOTION) { box.classList.add('is-static'); return; }

  track.append(...group(true));
  // 文字数が変わっても同じ速さ（約60px/秒）で流れるように、長さから時間を決める
  const setSpeed = () => { track.style.setProperty('--ticker-dur', `${Math.max(18, track.scrollWidth / 2 / 60)}s`); };
  setSpeed();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(setSpeed);
}

/* ============================================================
   3. ナビゲーション・スムーズスクロール
   ============================================================ */

function initNav() {
  const btn = document.getElementById('nav-hamburger');
  const nav = document.getElementById('mobile-nav');
  const close = () => {
    if (!nav) return;
    nav.classList.remove('open');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  };

  if (btn && nav) {
    btn.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const target = id ? document.getElementById(id) : null;
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
      window.scrollTo({ top: Math.max(0, top), behavior: REDUCE_MOTION ? 'auto' : 'smooth' });
      close();
    });
  });
}

/* ============================================================
   4. カレンダー
   ============================================================ */

function initCalendar() {
  const grid = document.getElementById('cal-grid');
  if (!grid || !EVENTS.length) return null;

  const $ = id => document.getElementById(id);
  const labelEl = $('cal-month'), prevBtn = $('cal-prev'), nextBtn = $('cal-next'), jumpBtn = $('cal-jump');
  const filtersEl = $('cal-filters'), detailEl = $('cal-detail');
  const agendaEl = $('cal-agenda'), countEl = $('agenda-count');

  const monthIdx = key => { const { y, m } = parseKey(key); return y * 12 + (m - 1); };
  const minIdx = monthIdx(EVENTS[0].date);
  const maxIdx = monthIdx(EVENTS[EVENTS.length - 1].date);

  const first = nextEvent();
  const state = { idx: monthIdx(first.date), selected: first.date, filter: 'all' };

  const visible = () => (state.filter === 'all' ? EVENTS : EVENTS.filter(e => e.type === state.filter));
  const monthEvents = () => visible().filter(e => monthIdx(e.date) === state.idx);

  // 表示中の月で選択日が無効なら、近い予定を自動で選ぶ
  function ensureSelection() {
    const list = monthEvents();
    if (list.some(e => e.date === state.selected)) return;
    const pick = list.find(e => e.date >= todayKey()) || list[0];
    state.selected = pick ? pick.date : null;
  }

  /* --- 絞り込みボタン（最初に1回だけ作る） --- */
  function buildFilters() {
    const types = TYPE_ORDER.filter(t => EVENTS.some(e => e.type === t));
    const make = (value, text) => h('button', {
      type: 'button',
      class: `chip-btn${value === 'all' ? '' : ' t-' + value}`,
      'data-value': value,
      'aria-pressed': String(state.filter === value),
      onclick: () => setFilter(value),
    }, value !== 'all' && h('span', { class: 'swatch', 'aria-hidden': 'true' }), text);
    filtersEl.replaceChildren(make('all', 'すべて'), ...types.map(t => make(t, TYPE_META[t].filter)));
  }

  function setFilter(value) {
    state.filter = value;
    filtersEl.querySelectorAll('.chip-btn').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.value === value)));
    // 表示中の月に該当する予定がなければ、いちばん近い該当月へ移動する
    if (!monthEvents().length) {
      const list = visible();
      const pick = list.find(e => e.date >= todayKey()) || list[list.length - 1];
      if (pick) state.idx = monthIdx(pick.date);
    }
    ensureSelection();
    renderAll();
  }

  /* --- 月カレンダー --- */
  function renderGrid() {
    const { y, m } = { y: Math.floor(state.idx / 12), m: (state.idx % 12) + 1 };
    const lead = new Date(y, m - 1, 1).getDay();
    const days = new Date(y, m, 0).getDate();
    const today = todayKey();

    const byDate = new Map();
    monthEvents().forEach(e => byDate.set(e.date, [...(byDate.get(e.date) || []), e]));

    const empty = () => h('div', { class: 'cal-cell is-empty', 'aria-hidden': 'true' });
    const cells = [];
    for (let i = 0; i < lead; i++) cells.push(empty());

    for (let d = 1; d <= days; d++) {
      const key = keyOf(y, m, d);
      const list = byDate.get(key) || [];
      const dow = (lead + d - 1) % 7;
      const has = list.length > 0;
      cells.push(h(has ? 'button' : 'div', {
        class: ['cal-cell', has && 'has-event', key === today && 'is-today', key === state.selected && 'is-selected',
                key < today && 'is-past', dow === 0 && 'is-sun', dow === 6 && 'is-sat'].filter(Boolean).join(' '),
        type: has ? 'button' : null,
        'data-date': key,
        'aria-label': has ? `${m}月${d}日 ${list.length}件の予定` : null,
        'aria-pressed': has ? String(key === state.selected) : null,
        'aria-current': key === today ? 'date' : null,
        onclick: has ? () => select(key) : null,
      },
      h('span', { class: 'cal-date', text: d }),
      has && h('span', { class: 'cal-chips' },
        list.map(e => h('span', { class: `cal-chip t-${e.type}` }, h('span', { class: 'cal-chip-text', text: e.chip }))))));
    }
    while (cells.length % 7) cells.push(empty());
    grid.replaceChildren(...cells);

    labelEl.textContent = `${y}年${m}月`;
    prevBtn.disabled = state.idx <= minIdx;
    nextBtn.disabled = state.idx >= maxIdx;
  }

  /* --- 選択日の詳細 --- */
  function renderDetail() {
    if (!state.selected) {
      detailEl.replaceChildren(
        h('h3', { class: 'cal-detail-date', text: 'この月の予定' }),
        h('p', { class: 'detail-empty', text: '表示できる予定がありません。別の月を選ぶか、絞り込みを「すべて」に戻してください。' }));
      return;
    }
    const today = todayKey();
    const list = visible().filter(e => e.date === state.selected);
    detailEl.replaceChildren(
      h('h3', { class: 'cal-detail-date', text: fmtDateJa(state.selected) }),
      ...(list.length
        ? list.map(e => h('article', { class: `detail-event t-${e.type}` },
            h('div', { class: 'detail-tags' },
              h('span', { class: 'tag', text: TYPE_META[e.type].label }),
              e.date === today && h('span', { class: 'tag tag-today', text: '本日' }),
              e.date < today && h('span', { class: 'tag tag-past', text: '終了' })),
            h('h4', { text: e.title }),
            h('p', { class: 'detail-venue', text: `${e.pref}　${e.venue}` }),
            h('p', { class: 'detail-time', text: `開場 ${e.open}　開演 ${e.start}` }),
            e.note && h('p', { class: 'detail-note', text: e.note })))
        : [h('p', { class: 'detail-empty', text: 'この日の予定はありません。色の付いた日を選んでください。' })]));
  }

  /* --- 月の予定一覧 --- */
  function renderAgenda() {
    const list = monthEvents();
    countEl.textContent = list.length ? `${list.length}件` : '';
    if (!list.length) {
      agendaEl.replaceChildren(h('li', { class: 'agenda-empty', text: 'この月の予定は登録されていません。' }));
      return;
    }
    const today = todayKey();
    agendaEl.replaceChildren(...list.map(e => h('li', {},
      h('button', {
        type: 'button',
        class: ['agenda-item', `t-${e.type}`, e.date < today && 'is-past', e.date === state.selected && 'is-selected'].filter(Boolean).join(' '),
        'data-date': e.date,
        'aria-pressed': String(e.date === state.selected),
        onclick: () => select(e.date),
      },
      h('span', { class: 'agenda-date' }, h('b', { text: parseKey(e.date).d }), h('small', { text: WEEKDAYS[weekdayOf(e.date)] })),
      h('span', { class: 'agenda-body' },
        h('span', { class: 'agenda-venue', text: e.venue }),
        h('span', { class: 'agenda-meta' },
          h('span', { class: 'tag', text: TYPE_META[e.type].short }),
          h('span', { text: e.pref }),
          h('span', { text: `${e.start}開演` })))))));
  }

  // 選択だけを変えるときは、再描画せずに見た目だけ更新する（キーボードのフォーカスを保つ）
  function markSelected() {
    grid.querySelectorAll('.cal-cell[data-date]').forEach(c => {
      const on = c.dataset.date === state.selected;
      c.classList.toggle('is-selected', on);
      if (c.tagName === 'BUTTON') c.setAttribute('aria-pressed', String(on));
    });
    agendaEl.querySelectorAll('.agenda-item').forEach(b => {
      const on = b.dataset.date === state.selected;
      b.classList.toggle('is-selected', on);
      b.setAttribute('aria-pressed', String(on));
    });
    const sel = agendaEl.querySelector('.agenda-item.is-selected');
    if (sel && agendaEl.scrollHeight > agendaEl.clientHeight + 1) {
      const top = sel.offsetTop, bottom = top + sel.offsetHeight;
      if (top < agendaEl.scrollTop || bottom > agendaEl.scrollTop + agendaEl.clientHeight) {
        agendaEl.scrollTop = Math.max(0, top - 8);
      }
    }
  }

  function select(key) {
    state.selected = key;
    markSelected();
    renderDetail();
  }

  function renderAll() {
    renderGrid();
    renderDetail();
    renderAgenda();
  }

  function changeMonth(delta) {
    const next = state.idx + delta;
    if (next < minIdx || next > maxIdx) return;
    state.idx = next;
    ensureSelection();
    renderAll();
  }

  // 指定した日の月へ移動して選択する（ヒーローの「次の公演」から呼ばれる）
  function jumpTo(key) {
    if (state.filter !== 'all' && !visible().some(e => e.date === key)) {
      state.filter = 'all';
      filtersEl.querySelectorAll('.chip-btn').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.value === 'all')));
    }
    state.idx = monthIdx(key);
    state.selected = key;
    renderAll();
  }

  prevBtn.addEventListener('click', () => changeMonth(-1));
  nextBtn.addEventListener('click', () => changeMonth(1));
  jumpBtn.addEventListener('click', () => jumpTo(nextEvent().date));

  const checked = $('data-checked');
  if (checked) checked.textContent = DATA_CHECKED;

  buildFilters();
  renderAll();
  return { jumpTo };
}

/* ============================================================
   5. ヒーロー（次の公演・ドームまでのカウントダウン）
   ============================================================ */

function initHero(cal) {
  const link = document.getElementById('next-show');
  const ev = nextEvent();
  if (link && ev && ev.date >= todayKey()) {
    document.getElementById('next-date').textContent = fmtDateJa(ev.date);
    document.getElementById('next-venue').textContent = `${ev.pref}　${ev.venue}　${ev.start}開演`;
    link.hidden = false;
    if (cal) link.addEventListener('click', () => cal.jumpTo(ev.date));
  }

  const dome = EVENTS.find(e => e.type === 'dome');
  const box = document.getElementById('dome-count');
  if (box && dome) {
    const days = daysUntil(dome.date);
    if (days > 0) {
      box.querySelector('b').textContent = days;
      box.hidden = false;
    } else if (days === 0) {
      box.textContent = '本日、東京ドーム公演です。';
      box.hidden = false;
    }
  }
}

/* ============================================================
   6. 動画プレーヤー
   YouTubeの埋め込みは、ページのアドレス（Referer）が届かないと
   「エラー153」で再生できません。index.html をダブルクリックして
   開いたとき（file://）がこれに当たります。その場合はサムネイルから
   YouTubeへ移動する表示に切り替えます。
   ============================================================ */

function initVideos() {
  const frame = document.getElementById('video-frame');
  const listEl = document.getElementById('video-list');
  if (!frame || !listEl || !VIDEOS.length) return;

  const canEmbed = location.protocol === 'http:' || location.protocol === 'https:';
  const titleEl = document.getElementById('video-title');
  const metaEl = document.getElementById('video-meta');
  const noteEl = document.getElementById('video-note');
  const openEl = document.getElementById('video-open');

  let current = VIDEOS[0];
  let playing = false;

  const watchUrl = v => `https://www.youtube.com/watch?v=${v.id}`;
  const fullTitle = v => `${v.title} ${v.kind}`;

  function showPoster() {
    playing = false;
    const a = h('a', {
      class: 'video-poster', href: watchUrl(current), target: '_blank', rel: 'noopener',
      'aria-label': `${fullTitle(current)}を再生`,
    },
    h('img', { src: `https://i.ytimg.com/vi/${current.id}/hqdefault.jpg`, alt: '' }),
    h('span', { class: 'play-btn', 'aria-hidden': 'true' }),
    h('span', { class: 'video-poster-title', text: fullTitle(current) }));
    if (canEmbed) a.addEventListener('click', e => { e.preventDefault(); play(); });
    frame.replaceChildren(a);
  }

  function play() {
    playing = true;
    frame.replaceChildren(h('iframe', {
      src: `https://www.youtube.com/embed/${current.id}?autoplay=1&rel=0`,
      title: fullTitle(current),
      allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
      referrerpolicy: 'strict-origin-when-cross-origin',
      allowfullscreen: true,
    }));
  }

  function renderInfo() {
    titleEl.textContent = fullTitle(current);
    metaEl.textContent = [current.date, current.note].filter(Boolean).join('　');
    openEl.href = watchUrl(current);
    listEl.querySelectorAll('.video-pick').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.id === current.id)));
  }

  function choose(v) {
    const wasPlaying = playing;
    current = v;
    showPoster();
    if (wasPlaying && canEmbed) play();
    renderInfo();
  }

  listEl.replaceChildren(...VIDEOS.map(v => h('li', {},
    h('button', { type: 'button', class: 'video-pick', 'data-id': v.id, 'aria-pressed': 'false', onclick: () => choose(v) },
      h('img', { src: `https://i.ytimg.com/vi/${v.id}/mqdefault.jpg`, alt: '', loading: 'lazy' }),
      h('span', { class: 'video-pick-text' },
        h('span', { class: 'video-pick-title', text: v.title }),
        h('span', { class: 'video-pick-kind', text: v.kind }),
        h('span', { class: 'video-pick-date', text: v.date }))))));

  noteEl.hidden = canEmbed;
  if (!canEmbed) {
    noteEl.textContent =
      'いまはパソコン内のファイルとして開いているため、YouTubeの仕様（エラー153）でこのページ内では再生できません。' +
      '映像をクリックするとYouTubeが開きます。Webに公開するか、ローカルサーバー（例：python3 -m http.server）で開くと、ここで再生できます。';
  }

  showPoster();
  renderInfo();
}

/* ============================================================
   7. ダイス（ドラッグで回せます。5面＝メンバー、6面目＝ファン）
   ============================================================ */

function initDice() {
  const scene = document.getElementById('dice-scene');
  const dice = document.getElementById('dice');
  if (!scene || !dice) return;

  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const BASE_SPEED = REDUCE_MOTION ? 0 : 16; // 度/秒
  let rx = -22, ry = -32, speed = BASE_SPEED;
  let dragging = false, lastX = 0, lastY = 0, lastT = 0, prev = performance.now();

  const apply = () => { dice.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`; };

  function frame(now) {
    const dt = Math.min(0.05, (now - prev) / 1000);
    prev = now;
    if (!dragging) {
      ry += speed * dt;
      speed += (BASE_SPEED - speed) * Math.min(1, dt * 2);
    }
    apply();
    requestAnimationFrame(frame);
  }

  scene.addEventListener('pointerdown', e => {
    dragging = true;
    lastX = e.clientX; lastY = e.clientY; lastT = performance.now();
    scene.classList.add('is-drag');
    try { scene.setPointerCapture(e.pointerId); } catch (_) { /* 未対応ブラウザは無視 */ }
  });
  scene.addEventListener('pointermove', e => {
    if (!dragging) return;
    const now = performance.now();
    const dx = e.clientX - lastX, dy = e.clientY - lastY;
    ry += dx * 0.6;
    rx = clamp(rx - dy * 0.5, -80, 80);
    speed = clamp((dx / Math.max(1, now - lastT)) * 600, -360, 360);
    lastX = e.clientX; lastY = e.clientY; lastT = now;
    apply();
  });
  const end = () => { dragging = false; scene.classList.remove('is-drag'); };
  scene.addEventListener('pointerup', end);
  scene.addEventListener('pointercancel', end);

  apply();
  if (!REDUCE_MOTION) requestAnimationFrame(frame);
}

/* ============================================================
   8. ひし形のタイル（背景キャンバス。ロゴのタイルをモチーフに、白が中心でたまに赤）
   ============================================================ */

function initSparkles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas || !canvas.getContext) return;
  const ctx = canvas.getContext('2d');
  let w = 0, h2 = 0, items = [], prev = performance.now();

  const spawn = anywhere => ({
    x: Math.random() * w,
    y: anywhere ? Math.random() * h2 : h2 + 12,
    r: 1.5 + Math.random() * 2.5,
    vy: 4 + Math.random() * 9,
    drift: (Math.random() - 0.5) * 4,
    phase: Math.random() * Math.PI * 2,
    twinkle: 0.5 + Math.random() * 1.2,
    color: Math.random() < 0.12 ? '#d6101e' : '#f4f2ee',
  });

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const widthChanged = window.innerWidth !== w;
    w = window.innerWidth; h2 = window.innerHeight;
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h2 * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // スマホでアドレスバーが出入りしただけ（高さだけ変化）のときは作り直さない
    if (widthChanged || !items.length) {
      const count = Math.round(Math.min(30, (w * h2) / 40000));
      items = Array.from({ length: count }, () => spawn(true));
    }
  }

  // ロゴのタイルと同じ、45度回した小さな四角
  function sparkle(p, alpha) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.moveTo(0, -p.r);
    ctx.lineTo(p.r, 0);
    ctx.lineTo(0, p.r);
    ctx.lineTo(-p.r, 0);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function draw(now, step) {
    const dt = Math.min(0.05, (now - prev) / 1000);
    prev = now;
    ctx.clearRect(0, 0, w, h2);
    items.forEach((p, i) => {
      if (step) {
        p.y -= p.vy * dt;
        p.x += p.drift * dt;
        if (p.y < -12) items[i] = spawn(false);
      }
      const alpha = 0.15 + 0.4 * (0.5 + 0.5 * Math.sin(now / 1000 * p.twinkle + p.phase));
      sparkle(p, alpha);
    });
  }

  resize();
  window.addEventListener('resize', resize);

  if (REDUCE_MOTION) { draw(prev, false); return; }
  const loop = now => { draw(now, true); requestAnimationFrame(loop); };
  requestAnimationFrame(loop);
}

/* ============================================================
   起動
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNews();
  initNav();
  const cal = initCalendar();
  initHero(cal);
  initVideos();
  initDice();
  initSparkles();
});
