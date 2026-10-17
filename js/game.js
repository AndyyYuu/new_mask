/* 第十一号失主 · 引擎
 * 一个很小的调查式视觉小说引擎：
 *   房间（可调查物）→ 特写 → 物品卡 → 手札（先写自己的，再看到他的）→ 反推（圈线索 / 出示铁盒里的东西）
 * 剧情全部写在 story.js 里，这里不含任何剧情文字。
 */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const el = (html) => { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const wait = (ms) => new Promise((r) => setTimeout(r, FAST ? 0 : ms));
  const FAST = /[?&]fast=1/.test(location.search);
  const REDUCED = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 存档：只在本机浏览器里 ---------- */
  const SAVE = 'eleventh-owner-v1';
  const fresh = () => ({ scene: 'chat', flags: {}, items: [], answers: {}, seen: {}, log: [], sound: true });
  let S = fresh();
  const store = {
    load() { try { const t = localStorage.getItem(SAVE); return t ? JSON.parse(t) : null; } catch (e) { return null; } },
    save() { try { localStorage.setItem(SAVE, JSON.stringify(S)); } catch (e) { /* 存不了就算了，照常玩 */ } },
    clear() { try { localStorage.removeItem(SAVE); } catch (e) { /* 同上 */ } }
  };

  /* ---------- 声音 ---------- */
  const AUDIO = window.AUDIO_BASE || 'assets/audio/';
  const SFX = { click: 'compat/ui-click.mp3', found: 'compat/evidence-found.mp3', unlock: 'compat/unlock.mp3', wrong: 'compat/wrong-evidence.mp3' };
  const sounds = {}; let bgm = null, actx = null, hiss = null;
  function sfx(name) {
    if (!S.sound || !SFX[name]) return;
    try { const a = sounds[name] || (sounds[name] = new Audio(AUDIO + SFX[name])); a.currentTime = 0; a.volume = name === 'click' ? 0.35 : 0.55; a.play().catch(() => {}); } catch (e) { /* 没声音也能玩 */ }
  }
  function music(on) {
    try {
      if (!bgm) { bgm = new Audio(AUDIO + 'music/investigation-mystery.mp3'); bgm.loop = true; bgm.volume = 0.2; }
      if (on && S.sound) bgm.play().catch(() => {}); else bgm.pause();
    } catch (e) { /* 同上 */ }
  }
  const duck = (v) => { if (bgm) bgm.volume = v; };
  const tape = {
    start() {
      duck(0.04);
      if (!S.sound) return;
      try {
        actx = actx || new (window.AudioContext || window.webkitAudioContext)();
        const len = actx.sampleRate * 2, buf = actx.createBuffer(1, len, actx.sampleRate), d = buf.getChannelData(0);
        for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * 0.6;
        const src = actx.createBufferSource(); src.buffer = buf; src.loop = true;
        const hp = actx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 1800;
        const g = actx.createGain(); g.gain.value = 0.035;
        src.connect(hp).connect(g).connect(actx.destination); src.start();
        hiss = { src, g };
      } catch (e) { hiss = null; }
    },
    hum() {
      if (!S.sound || !actx) return;
      try {
        [392, 440, 494, 440].forEach((f, i) => {
          const o = actx.createOscillator(), g = actx.createGain(), t = actx.currentTime + i * 0.42;
          o.type = 'sine'; o.frequency.value = f;
          g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.07, t + 0.06); g.gain.linearRampToValueAtTime(0, t + 0.4);
          o.connect(g).connect(actx.destination); o.start(t); o.stop(t + 0.42);
        });
      } catch (e) { /* 同上 */ }
    },
    stop() {
      try { if (hiss) { hiss.src.stop(); hiss = null; } } catch (e) { hiss = null; }
      sfx('unlock'); duck(0.2);
    }
  };

  /* ---------- 页面骨架 ---------- */
  const app = $('#app');
  app.innerHTML = `${Art.sprite}
    <header id="top"><div class="place" id="place"></div><div class="known" id="known" aria-label="关于失主，现在知道的"></div>
      <div class="topbtns"><button class="tbtn" id="b-log">回看</button><button class="tbtn" id="b-set">设置</button></div></header>
    <main id="view"><div id="scene"></div><div class="pan-tip">左右滑动看整个房间</div><div id="close" hidden></div><div id="book" hidden></div><div id="portrait" hidden></div><div id="sheet" class="sheet" hidden></div></main>
    <footer id="panel">
      <div id="dialog" class="idle"><div class="who" hidden></div><p class="text"></p><div class="choices"></div><button class="next" aria-label="继续"></button></div>
      <div id="tray" aria-label="铁盒里的东西"></div>
    </footer>
    <div id="cover" hidden></div>`;
  const view = $('#view'), sceneEl = $('#scene'), closeEl = $('#close'), bookEl = $('#book'), sheetEl = $('#sheet'), coverEl = $('#cover');
  const dlg = $('#dialog'), whoEl = $('.who', dlg), textEl = $('.text', dlg), choicesEl = $('.choices', dlg), nextEl = $('.next', dlg);
  const trayEl = $('#tray'), portraitEl = $('#portrait');

  let busy = false, advance = null, picking = null, closeId = null;
  const setBusy = (b) => { busy = b; app.classList.toggle('busy', b); };
  const story = () => window.Story;
  const scene = () => story().scenes[S.scene];
  const is = (k) => !!S.flags[k];
  const flag = (k, v = true) => { S.flags[k] = v; applyFlags(); };
  const has = (id) => S.items.includes(id);

  /* ---------- 对白 ---------- */
  const SPEAKERS = { n: { name: '', cls: 'narr' }, you: { name: '你', cls: 'you' }, lead: { name: '负责人', cls: 'npc', side: 'left' }, mate: { name: '室友', cls: 'npc', side: 'right' }, tape: { name: '磁带 R-17', cls: 'tape' },
    fox: { name: '狐狸学姐', cls: 'npc', side: 'right' }, zhou: { name: '老周', cls: 'npc', side: 'left' }, lin: { name: '小林', cls: 'npc', side: 'right' } };
  let portraitWho = null;
  /* 立绘：每个角色有几张姿势图（assets/chars/角色_姿势.webp）。
   * 台词第三项写姿势，比如 ['lin', '不了。', 'no']；写成 'fox:sad' 可以在旁白时亮出别人的立绘。
   * 不写就沿用这个角色上一次的姿势。 */
  const POSE_DEFAULT = { lin: 'box', fox: 'box', zhou: 'smile', mate: 'curious', lead: 'bag' };
  let poses = {}, portraitKey = null;
  const poseSrc = (who, pose) => `${window.CHAR_BASE || 'assets/chars/'}${who}_${pose}.webp`;
  function setPortrait(who, pose) {
    let show = who;
    if (pose && pose.includes(':')) { [show, pose] = pose.split(':'); }
    const sp = SPEAKERS[show];
    if (sp && sp.side) {
      if (pose) poses[show] = pose;
      const p = poses[show] || POSE_DEFAULT[show], key = show + '_' + p;
      if (portraitKey !== key) { portraitEl.innerHTML = `<img src="${poseSrc(show, p)}" alt="">`; portraitKey = key; portraitWho = show; }
      portraitEl.className = sp.side; portraitEl.hidden = false;
    } else if (portraitWho) portraitEl.classList.add('dim');
  }
  function clearPortrait() { portraitEl.hidden = true; portraitWho = null; portraitKey = null; portraitEl.innerHTML = ''; }
  function say(who, text, pose) {
    const sp = SPEAKERS[who] || SPEAKERS.n;
    S.log.push([sp.name, text]); if (S.log.length > 160) S.log.shift();
    setPortrait(who, pose);
    dlg.className = sp.cls; whoEl.textContent = sp.name; whoEl.hidden = !sp.name;
    choicesEl.innerHTML = ''; nextEl.hidden = false; nextEl.classList.remove('ready');
    return new Promise((res) => {
      let i = 0, done = false, timer = null;
      const finish = () => { clearInterval(timer); textEl.textContent = text; done = true; nextEl.classList.add('ready'); };
      advance = () => { if (!done) return finish(); advance = null; nextEl.classList.remove('ready'); sfx('click'); res(); };
      if (FAST || REDUCED) finish();
      else { textEl.textContent = ''; timer = setInterval(() => { i += 1; textEl.textContent = text.slice(0, i); if (i >= text.length) finish(); }, 26); }
    });
  }
  async function talk(lines) { for (const [who, text, pose] of lines) await say(who, text, pose); }
  function choose(prompt, opts) {
    advance = null; dlg.className = 'narr'; whoEl.hidden = true; nextEl.hidden = true; textEl.textContent = prompt || '';
    return new Promise((res) => {
      choicesEl.innerHTML = '';
      opts.forEach((o) => {
        const b = el(`<button class="choice${o.ghost ? ' ghost' : ''}">${esc(o.t)}</button>`);
        b.onclick = (e) => { e.stopPropagation(); sfx('click'); choicesEl.innerHTML = ''; S.log.push(['你选了', o.t]); res(o.id); };
        choicesEl.append(b);
      });
      const f = $('.choice', choicesEl); if (f && !('ontouchstart' in window)) f.focus({ preventScroll: true });
    });
  }
  /* 从铁盒里出示一样东西 */
  function pick(prompt) {
    advance = null; dlg.className = 'narr'; whoEl.textContent = '出示'; whoEl.hidden = false; nextEl.hidden = true;
    textEl.textContent = prompt + '（从下面选一样）'; choicesEl.innerHTML = '';
    trayEl.classList.add('select');
    return new Promise((res) => { picking = (id) => { picking = null; trayEl.classList.remove('select'); res(id); }; });
  }
  async function present(prompt, correct, wrong) {
    for (;;) {
      const id = await pick(prompt);
      if (id === correct) { sfx('found'); return id; }
      sfx('wrong'); await say('n', (wrong && wrong[id]) || '不是这个。');
    }
  }
  /* 圈线索：在一段话里点出关键的那个词 */
  function circle(prompt, parts, wrong) {
    advance = null; dlg.className = 'narr'; whoEl.textContent = '圈线索'; whoEl.hidden = false; nextEl.hidden = true; choicesEl.innerHTML = '';
    textEl.textContent = prompt;
    return new Promise((res) => {
      const draw = () => {
        sheetEl.innerHTML = `<div class="slip"><p class="q">${esc(prompt)}</p><p class="lines">${parts.map((p) => typeof p === 'string' ? esc(p).replace(/\n/g, '<br>') : `<button class="tok" data-k="${p.k}">${esc(p.t)}</button>`).join('')}</p></div>`;
        sheetEl.hidden = false;
        $$('.tok', sheetEl).forEach((b) => { b.onclick = async () => {
          const p = parts.find((x) => x.k === b.dataset.k);
          if (p.ok) { sfx('found'); sheetEl.hidden = true; sheetEl.innerHTML = ''; return res(p.k); }
          sfx('wrong'); b.classList.add('no'); sheetEl.hidden = true;
          await say('n', wrong[p.k] || '不是这个。');
          dlg.className = 'narr'; whoEl.textContent = '圈线索'; whoEl.hidden = false; nextEl.hidden = true; textEl.textContent = prompt; advance = null;
          sheetEl.hidden = false;
        }; });
      };
      draw();
    });
  }

  /* 空闲：显示当前要做的事 */
  function idle() {
    advance = null; clearPortrait();
    dlg.className = 'idle'; whoEl.hidden = true; nextEl.hidden = true;
    const sc = scene(); const goal = sc && sc.goal ? sc.goal() : '';
    textEl.innerHTML = goal ? `<b>现在</b>　${esc(goal)}` : '';
    choicesEl.innerHTML = '';
    if (!sc || sc.noExplore) return;
    const b1 = el('<button class="choice ghost">调查清单</button>'), b2 = el('<button class="choice ghost">想一想</button>');
    b1.onclick = (e) => { e.stopPropagation(); openList(); };
    b2.onclick = (e) => { e.stopPropagation(); runHint(); };
    choicesEl.append(b1, b2);
    if (closeId) { const b3 = el('<button class="choice ghost">退后</button>'); b3.onclick = (e) => { e.stopPropagation(); closeCloseup(); settle(); }; choicesEl.append(b3); }
  }

  /* ---------- 画面与可调查物 ---------- */
  function applyFlags() {
    $$('[data-if],[data-unless]', view).forEach((n) => {
      const ok = (!n.dataset.if || is(n.dataset.if)) && (!n.dataset.unless || !is(n.dataset.unless));
      n.style.display = ok ? '' : 'none';
    });
    $$('.hs', view).forEach((n) => { const ctx = n.closest('#close') ? closeId : S.scene; n.classList.toggle('seen', !!S.seen[ctx + ':' + n.dataset.hs]); });
  }
  function bindHots(root, ctxOf) {
    $$('.hs', root).forEach((n) => {
      const go = (e) => { e.stopPropagation(); if (dragged) return; onHot(ctxOf(), n.dataset.hs); };
      n.addEventListener('click', go);
      n.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(e); } });
    });
  }
  function renderScene() {
    const sc = scene();
    $('#place').textContent = sc.place || '';
    sceneEl.innerHTML = sc.art ? Art.scenes[sc.art]() : Art.scenes.blank();
    sceneEl.classList.toggle('pan', !!sc.art && !sc.noPan);
    if (sc.html) sceneEl.insertAdjacentHTML('beforeend', sc.html());
    bindHots(sceneEl, () => S.scene);
    applyFlags(); renderTray(); renderKnown();
    requestAnimationFrame(() => { sceneEl.scrollLeft = (sceneEl.scrollWidth - sceneEl.clientWidth) * (sc.focus ?? 0.5); });
  }
  function handlers(ctx) { return ctx === S.scene ? scene().hs : story().closeups[ctx].hs; }
  async function onHot(ctx, id) {
    if (busy) return;
    const fn = (handlers(ctx) || {})[id]; if (!fn) return;
    setBusy(true); sfx('click'); S.seen[ctx + ':' + id] = true;
    await fn();
    await settle();
  }
  /* 一步做完之后：刷新画面、存档、看这一间是不是可以结束了 */
  async function settle() {
    setBusy(true); applyFlags(); renderTray(); renderKnown(); store.save();
    const sc = scene();
    if (sc.check && !closeId) await sc.check();
    applyFlags(); renderTray(); renderKnown(); store.save();
    idle(); setBusy(false);
  }
  function openCloseup(id) {
    closeId = id; const c = story().closeups[id];
    closeEl.innerHTML = Art.closeups[c.art || id]() + '<button class="xbtn">退后</button>';
    closeEl.hidden = false;
    $('.xbtn', closeEl).onclick = (e) => { e.stopPropagation(); if (busy) return; closeCloseup(); settle(); };
    bindHots(closeEl, () => closeId); applyFlags();
  }
  function closeCloseup() { closeId = null; closeEl.hidden = true; closeEl.innerHTML = ''; }
  function openList() {
    if (busy) return;
    const ctx = closeId || S.scene, root = closeId ? closeEl : sceneEl;
    const items = $$('.hs', root).filter((n) => n.style.display !== 'none');
    sheetEl.innerHTML = `<div class="listbox"><h2>${closeId ? '眼前' : '这间屋子里'}</h2></div>`;
    const box = $('.listbox', sheetEl);
    items.forEach((n) => { const b = el(`<button class="choice${n.classList.contains('key') ? '' : ' ghost'}">${esc(n.getAttribute('aria-label'))}</button>`); b.onclick = () => { closeSheet(); onHot(ctx, n.dataset.hs); }; box.append(b); });
    const c = el('<button class="choice ghost">关上</button>'); c.onclick = closeSheet; box.append(c);
    sheetEl.hidden = false;
  }
  function closeSheet() { sheetEl.hidden = true; sheetEl.innerHTML = ''; }
  async function runHint() {
    if (busy) return; setBusy(true);
    const sc = scene(); const lines = (sc.hint && sc.hint()) || [['n', '我再看一圈。']];
    await talk(lines); await settle();
  }

  /* ---------- 铁盒（物品栏） ---------- */
  function renderTray(fresh) {
    const defs = story().items;
    trayEl.innerHTML = S.items.length ? '<span class="tray-label">铁 盒</span>' : '';
    S.items.forEach((id) => {
      const d = defs[id];
      const b = el(`<button class="tile${fresh === id ? ' new' : ''}" title="${esc(d.name)}"><span class="pic">${Art.icon(d.icon)}</span><span class="nm">${esc(d.short || d.name)}</span></button>`);
      b.onclick = async (e) => {
        e.stopPropagation();
        if (picking) return picking(id);
        if (busy) return;
        setBusy(true); sfx('click');
        const ctxDef = closeId ? story().closeups[closeId] : scene();
        const used = ctxDef && ctxDef.use ? await ctxDef.use(id) : false;
        if (used) { await settle(); return; }
        if (id === 'notebook') await book.browse(); else await card(id, false);
        await settle();
      };
      trayEl.append(b);
    });
  }
  function card(id, isNew) {
    const d = story().items[id];
    const desc = typeof d.desc === 'function' ? d.desc() : d.desc;
    sheetEl.innerHTML = `<div class="card"><div class="big">${Art.icon(d.icon)}</div><div class="eyebrow">${isNew ? '放 进 铁 盒' : '铁 盒 里 的 东 西'}</div><h2>${esc(d.name)}</h2><p>${esc(desc)}</p><button class="choice">${isNew ? '收好' : '放回去'}</button></div>`;
    sheetEl.hidden = false; advance = null;
    return new Promise((res) => { const b = $('.choice', sheetEl); b.onclick = () => { sfx('click'); closeSheet(); res(); }; if (!('ontouchstart' in window)) b.focus({ preventScroll: true }); });
  }
  async function give(id) {
    if (has(id)) return;
    S.items.push(id); sfx('found'); renderTray(id);
    await card(id, true);
  }
  function drop(id) { S.items = S.items.filter((x) => x !== id); renderTray(); }

  /* ---------- 关于他：声音 → 姓 → 名字 → 本人 ---------- */
  function renderKnown() {
    const k = story().known(); const box = $('#known');
    box.innerHTML = k.show ? k.rows.map((r) => `<span class="${r.on ? 'on' : ''}">${esc(r.on ? r.chip : r.label + ' ？')}</span>`).join('') : '';
  }

  /* ---------- 手札 ---------- */
  const book = {
    tabs: [['fly', '扉页'], ['notes1', '他的记录 一'], ['notes2', '他的记录 二'], ['four', '最后四页'], ['about', '关于他']],
    html(page, o = {}) {
      const B = story().book;
      if (page === 'fly') return `<div class="page fly"><p>${(typeof B.fly === 'function' ? B.fly() : B.fly).map(esc).join('<br>')}</p></div>`;
      if (page === 'notes1' || page === 'notes2') {
        const p = B[page];
        return `<div class="page"><h3>${esc(p.head)}</h3><ul class="entries">${p.rows.map((r) => `<li class="${o.mark === r[0] ? 'hit' : ''}"><i>${esc(r[0])}</i><span>${esc(r[1])}</span></li>`).join('')}</ul></div>`;
      }
      if (page === 'about') {
        const k = story().known();
        return `<div class="page about"><h3>关于他，现在知道的</h3>${k.rows.map((r) => `<div class="rowk${r.on ? '' : ' off'}"><b>${esc(r.label)}</b><span>${esc(r.on ? r.text : '还不知道。')}</span></div>`).join('')}</div>`;
      }
      if (page === 'four') return `<div class="page q4"><h3>最后四页</h3>${[1, 2, 3, 4].map((n) => this.q(n, {})).join('')}</div>`;
      const n = +page.slice(1);
      return `<div class="page q4">${this.q(n, { big: true, edit: o.edit })}</div>`;
    },
    q(n, o) {
      const p = story().book.pages[n], mine = S.answers[n], his = p.his && p.his();
      let own = '';
      if (o.edit) own = `<div class="mine"><span class="lab">先写我自己的 · 记在我手机里</span><textarea id="answer-${n}" maxlength="400" placeholder="${esc(p.hintText)}"></textarea>
          <div class="row"><button id="answer-ok-${n}">写好了</button><button class="ghost" id="answer-skip-${n}">这页先留白</button></div><p class="note">只存在这台设备的浏览器里，不会上传。</p></div>`;
      else if (mine !== undefined) own = `<div class="mine"><span class="lab">我的 · 记在我手机里</span><p>${mine ? esc(mine) : '（我也没写出来。）'}</p></div>`;
      return `<div class="qpage${o.big ? ' big' : ''}"><span class="no">最后四页 · 之${"一二三四"[n - 1]}</span><p class="head">${esc(p.head)}</p>${p.trace}
        ${his ? `<p class="his">${esc(his)}</p>` : '<p class="blank">他的：一个字没填。</p>'}${own}</div>`;
    },
    show(page, o = {}) {
      const tabs = o.free ? `<div class="book-tabs">${this.tabs.map(([id, t]) => `<button data-p="${id}" class="${id === page ? 'on' : ''}">${t}</button>`).join('')}<button class="shut">合上</button></div>` : `<div class="book-tabs"><span style="color:var(--cream);font-family:var(--f-ui);font-size:13px;letter-spacing:.2em">手 札</span></div>`;
      bookEl.innerHTML = `<div class="book">${tabs}${this.html(page, o)}</div>`;
      bookEl.hidden = false;
    },
    hide() { bookEl.hidden = true; bookEl.innerHTML = ''; },
    /* 自由翻看 */
    browse() {
      advance = null; dlg.className = 'idle'; whoEl.hidden = true; nextEl.hidden = true; choicesEl.innerHTML = ''; textEl.textContent = '翻看手札。';
      return new Promise((res) => {
        const open = (p) => {
          this.show(p, { free: true });
          $$('.book-tabs [data-p]', bookEl).forEach((b) => { b.onclick = () => { sfx('click'); open(b.dataset.p); }; });
          $('.shut', bookEl).onclick = () => { sfx('click'); this.hide(); res(); };
        };
        open('fly');
      });
    },
    /* 先写自己的 */
    ask(n) {
      advance = null; dlg.className = 'narr'; whoEl.textContent = '手札'; whoEl.hidden = false; nextEl.hidden = true; choicesEl.innerHTML = '';
      textEl.textContent = '先拿自己去猜。写下来，或者留白，都能继续。';
      this.show('p' + n, { edit: true });
      return new Promise((res) => {
        const ta = $('#answer-' + n, bookEl);
        const done = (v) => { S.answers[n] = v; S.log.push(['我的第 ' + n + ' 页', v || '（留白）']); sfx('click'); this.show('p' + n); store.save(); res(v); };
        $('#answer-ok-' + n, bookEl).onclick = () => { const v = ta.value.trim(); if (!v) { ta.focus(); ta.placeholder = '还没写。想留白的话，点右边那个。'; return; } done(v); };
        $('#answer-skip-' + n, bookEl).onclick = () => done('');
      });
    }
  };

  /* 关键物的一句话：被忽略的人留下的东西 */
  function note(title, line) {
    advance = null; dlg.className = 'idle'; whoEl.hidden = true; nextEl.hidden = true; choicesEl.innerHTML = ''; textEl.textContent = '';
    sheetEl.innerHTML = `<div class="caption"><span class="eyebrow">${esc(title)}</span><p>${esc(line)}</p><button class="choice">继续</button></div>`;
    sheetEl.hidden = false; sfx('found');
    return new Promise((res) => { const b = $('.choice', sheetEl); b.onclick = () => { sfx('click'); closeSheet(); res(); }; if (!('ontouchstart' in window)) b.focus({ preventScroll: true }); });
  }

  /* 给人看一样东西（比如别人的手机），点带 data-close 的按钮关上 */
  function sheet(html) {
    advance = null; dlg.className = 'idle'; whoEl.hidden = true; nextEl.hidden = true; choicesEl.innerHTML = ''; textEl.textContent = '';
    sheetEl.innerHTML = html; sheetEl.hidden = false;
    return new Promise((res) => { $('[data-close]', sheetEl).onclick = () => { sfx('click'); closeSheet(); res(); }; });
  }

  /* ---------- 转场、封面、结尾 ---------- */
  function transition(title, sub) {
    return new Promise((res) => {
      const t = el(`<div class="transition"><div><h2>${esc(title)}</h2><p>${esc(sub || '')}</p></div></div>`);
      view.append(t); let gone = false;
      const out = () => { if (gone) return; gone = true; t.remove(); res(); };
      t.onclick = out; setTimeout(out, FAST ? 0 : 2400);
    });
  }
  async function go(id, title, sub) {
    setBusy(true); closeCloseup(); book.hide(); closeSheet(); clearPortrait();
    S.scene = id; store.save(); poses = {};
    advance = null; dlg.className = 'idle'; textEl.textContent = ''; choicesEl.innerHTML = ''; whoEl.hidden = true;
    if (title) { renderScene(); await transition(title, sub); } else renderScene();
    const sc = scene(), first = !is('in.' + id);
    if (sc.enter) await sc.enter(first);
    S.flags['in.' + id] = true;
    await settle();
  }
  function cover(html, wire) {
    coverEl.innerHTML = `<div class="cover-box">${html}</div>`;
    coverEl.hidden = false; wire(coverEl);
  }
  function title() {
    const saved = store.load();
    const canResume = saved && saved.scene && story().scenes[saved.scene] && saved.scene !== 'chat';
    cover(`<svg class="tin" viewBox="0 0 120 120" aria-hidden="true"><use href="#it-box"/></svg>
      <p class="eyebrow">旧 礼 堂 · 寄 存 柜</p><h1>第十一号失主</h1>
      <p>毕业季，旧礼堂明早清空。十一号柜里有一个没写名字的铁盒。</p>
      <div class="btns">${canResume ? '<button class="cbtn" id="c-go">接着上次</button><button class="cbtn ghost" id="c-new">从头开始</button>' : '<button class="cbtn" id="c-new">开始</button>'}</div>
      <p class="fine">一个开场，四个房间。你写下的话只存在这台设备的浏览器里。</p>`, (root) => {
      const start = (resume) => {
        if (resume) { S = Object.assign(fresh(), saved); } else { S = fresh(); store.clear(); }
        coverEl.hidden = true; coverEl.innerHTML = ''; music(true); go(S.scene);
      };
      const g = $('#c-go', root); if (g) g.onclick = () => start(true);
      $('#c-new', root).onclick = () => start(false);
    });
  }
  function ending() {
    const k = story().known(); music(true);
    const c = story().endCard();
    cover(`<p class="eyebrow">${esc(c.eyebrow)}</p><h1>${esc(c.title)}</h1>
      <p>${esc(c.text)}</p>
      <div class="endlist">${k.rows.map((r) => `<span class="${r.on ? 'on' : ''}">${esc(r.on ? r.chip : r.label + ' ？')}</span>`).join('')}</div>
      <div class="btns"><button class="cbtn" id="c-book">翻看手札</button><button class="cbtn ghost" id="c-new">从头再来</button></div>`, (root) => {
      $('#c-book', root).onclick = async () => { coverEl.hidden = true; setBusy(true); await book.browse(); setBusy(false); ending(); };
      $('#c-new', root).onclick = () => { store.clear(); S = fresh(); title(); };
    });
  }

  /* ---------- 回看、设置 ---------- */
  $('#b-log').onclick = () => {
    if (!sheetEl.hidden) return;
    sheetEl.innerHTML = `<div class="listbox"><h2>回看</h2>${S.log.slice(-60).map(([w, t]) => `<p class="logline">${w ? `<b>${esc(w)}</b>` : ''}${esc(t)}</p>`).join('') || '<p class="logline">还没有对话。</p>'}</div>`;
    const c = el('<button class="choice ghost">关上</button>'); c.onclick = closeSheet; $('.listbox', sheetEl).append(c);
    sheetEl.hidden = false; const lb = $('.listbox', sheetEl); lb.scrollTop = lb.scrollHeight;
  };
  $('#b-set').onclick = () => {
    if (!sheetEl.hidden) return;
    const draw = (confirming) => {
      sheetEl.innerHTML = `<div class="listbox"><h2>设置</h2>
        <button class="choice ghost" id="s-sound">声音：${S.sound ? '开' : '关'}</button>
        ${confirming ? '<p class="logline">进度和你写下的话都会清空。确定吗？</p><button class="choice" id="s-yes">清空，从头开始</button><button class="choice ghost" id="s-no">不了</button>' : '<button class="choice ghost" id="s-reset">从头开始</button>'}
        <button class="choice ghost" id="s-close">关上</button></div>`;
      $('#s-sound', sheetEl).onclick = () => { S.sound = !S.sound; music(S.sound); store.save(); draw(confirming); };
      $('#s-close', sheetEl).onclick = closeSheet;
      if (confirming) { $('#s-yes', sheetEl).onclick = () => { store.clear(); S = fresh(); try { location.reload(); } catch (e) { closeSheet(); title(); } }; $('#s-no', sheetEl).onclick = () => draw(false); }
      else $('#s-reset', sheetEl).onclick = () => draw(true);
    };
    draw(false); sheetEl.hidden = false;
  };

  /* ---------- 输入 ---------- */
  let dragged = false, downX = 0;
  // 只有按住拖动房间才算“拖动”，单纯移动鼠标不算；在任何地方按下都会重置
  view.addEventListener('pointerdown', (e) => { downX = e.clientX; dragged = false; }, true);
  sceneEl.addEventListener('pointermove', (e) => { if (e.buttons && Math.abs(e.clientX - downX) > 10) dragged = true; });
  const tap = () => { if (advance) advance(); };
  dlg.addEventListener('click', tap);
  view.addEventListener('click', (e) => { if (e.target.closest('.sheet,.phone,.xbtn,.transition,.book-tabs,.mine,.caption')) return; tap(); });
  document.addEventListener('keydown', (e) => {
    if (e.target.matches('textarea,input')) return;
    if ((e.key === 'Enter' || e.key === ' ') && advance && !e.target.closest('button,.hs')) { e.preventDefault(); tap(); }
    if (e.key === 'Escape') { if (!sheetEl.hidden && !picking && !$('.slip,.card', sheetEl)) closeSheet(); else if (closeId && !busy) { closeCloseup(); settle(); } }
  });

  /* ---------- 给剧情用的接口 ---------- */
  window.G = {
    get S() { return S; }, say, talk, choose, present, circle, give, drop, has, is, flag, go, wait, sfx, tape,
    openCloseup, closeCloseup, book, ending, sheet, note, view, sceneEl, closeEl, el, esc
  };
  ['lin_box','lin_surprise','lin_read','lin_no','lin_bowl','lin_shy','fox_box','fox_gasp','fox_sad','fox_call','fox_phone','fox_point','zhou_wipe','zhou_glasses','zhou_bowl','zhou_smile','mate_shrug','mate_curious','mate_wave','lead_bag','lead_tie','lead_me','lead_smile','lead_shout'].forEach((k) => { const i = new Image(); i.src = `${window.CHAR_BASE || 'assets/chars/'}${k}.webp`; });
  title();
  if (window.claude && window.claude.hot && window.claude.hot.snapshot) window.claude.hot.snapshot(() => { store.save(); return {}; });
})();
