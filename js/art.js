/* 第十一号失主 · 美术
 * 全部用 SVG 画成：石板蓝的墙、木头与黄铜、金色细边框、颗粒质感。
 * 重要物品只画一次（<symbol>），场景、铁盒栏、物品卡、特写全部引用同一张图，
 * 所以它在任何地方看起来都是同一件东西。
 */
(function () {
  const C = {
    wall: '#46566b', wallL: '#56677f', wallD: '#2b3545', floor: '#273040', line: '#1f2733',
    woodD: '#4a3426', wood: '#6e4a31', woodL: '#8c6442', ochre: '#b58a4e',
    brass: '#c8a566', gold: '#e6d3a1', cream: '#eadfc8', paper: '#d9ccb0',
    red: '#a4453d', redD: '#7c2f2c', teal: '#5e9ea6', tealL: '#8cc7cc', tealD: '#3c747b',
    pink: '#d6a39a', ink: '#23242b', grey: '#7f8ea3', olive: '#7b7a4e', mustard: '#c79a3f',
    skin: '#e3bf9d', skinD: '#cfa581'
  };

  /* ---------- 全局定义：渐变、网点、硬阴影、物品图 ---------- */
  const star = (cx, cy, r, fill) => {
    const k = r * 0.24;
    return `<path d="M${cx} ${cy - r}L${cx + k} ${cy - k}L${cx + r} ${cy}L${cx + k} ${cy + k}L${cx} ${cy + r}L${cx - k} ${cy + k}L${cx - r} ${cy}L${cx - k} ${cy - k}Z" fill="${fill}"/>`;
  };

  const symbols = `
  <symbol id="it-notebook" viewBox="0 0 120 120">
    <g transform="rotate(-7 60 60)">
      <rect x="31" y="15" width="66" height="94" rx="4" fill="${C.paper}"/>
      <rect x="26" y="11" width="66" height="94" rx="5" fill="${C.red}"/>
      <rect x="26" y="11" width="11" height="94" rx="4" fill="${C.redD}"/>
      <rect x="79" y="11" width="5" height="94" fill="${C.ink}"/>
      <rect x="43" y="28" width="30" height="22" rx="2" fill="${C.cream}"/>
      <line x1="47" y1="42" x2="69" y2="42" stroke="#8a7a60" stroke-width="1.6"/>
      <path d="M26 96h66" stroke="${C.redD}" stroke-width="1.5" opacity=".6"/>
    </g>
  </symbol>
  <symbol id="it-cassette" viewBox="0 0 120 120">
    <g transform="rotate(4 60 60)">
      <rect x="10" y="28" width="100" height="66" rx="6" fill="#f3ead6" stroke="${C.ink}" stroke-width="2.5"/>
      <rect x="18" y="35" width="84" height="34" rx="3" fill="${C.teal}"/>
      <rect x="22" y="38" width="76" height="13" rx="1.5" fill="#f5eedd"/>
      <text x="60" y="48.5" text-anchor="middle" class="t-hand" font-size="11" fill="${C.ink}">R-17</text>
      <rect x="36" y="54" width="48" height="13" rx="6.5" fill="${C.ink}"/>
      <circle cx="46" cy="60.5" r="4.6" fill="${C.cream}"/><circle cx="74" cy="60.5" r="4.6" fill="${C.cream}"/>
      <circle cx="46" cy="60.5" r="1.6" fill="${C.ink}"/><circle cx="74" cy="60.5" r="1.6" fill="${C.ink}"/>
      <path d="M33 94l6-15h42l6 15z" fill="${C.paper}"/>
      <circle cx="17" cy="35" r="2" fill="#b9ab8c"/><circle cx="103" cy="35" r="2" fill="#b9ab8c"/>
      <circle cx="17" cy="87" r="2" fill="#b9ab8c"/><circle cx="103" cy="87" r="2" fill="#b9ab8c"/>
    </g>
  </symbol>
  <symbol id="it-button" viewBox="0 0 120 120">
    <circle cx="60" cy="60" r="40" fill="${C.ink}"/>
    <circle cx="60" cy="60" r="40" fill="none" stroke="#3b3c46" stroke-width="5"/>
    <circle cx="60" cy="60" r="31" fill="none" stroke="#3b3c46" stroke-width="1.5"/>
    ${star(60, 60, 27, C.brass)}
    <circle cx="53" cy="60" r="4.2" fill="#0d0e12"/><circle cx="67" cy="60" r="4.2" fill="#0d0e12"/>
    <path d="M67 60l7-5 4 6 8-7 5 5 8-3" fill="none" stroke="${C.cream}" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M97 54l5 4-3 5z" fill="${C.cream}"/>
  </symbol>
  <symbol id="it-ticket" viewBox="0 0 120 120">
    <g transform="rotate(-8 60 60)">
      <path d="M13 36h66a5 5 0 0 0 10 0h18a5 5 0 0 1 5 5v40a5 5 0 0 1-5 5H89a5 5 0 0 0-10 0H13a5 5 0 0 1-5-5V41a5 5 0 0 1 5-5z" fill="${C.pink}" stroke="${C.redD}" stroke-width="1.6"/>
      <path d="M84 43v36" stroke="${C.redD}" stroke-width="1.6" stroke-dasharray="3 3"/>
      <text x="17" y="54" class="t-serif" font-size="11" font-weight="700" fill="${C.redD}">海滨专线</text><text x="66" y="54" class="t-mono" font-size="9" fill="${C.ink}">6.14</text>
      <path d="M17 66q6-6 12 0t12 0 12 0 12 0" fill="none" stroke="${C.tealD}" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M17 75q6-6 12 0t12 0 12 0 12 0" fill="none" stroke="${C.tealD}" stroke-width="2.4" stroke-linecap="round" opacity=".55"/>
      <circle cx="98" cy="61" r="8" fill="none" stroke="${C.redD}" stroke-width="1.6" stroke-dasharray="2 2.4"/>
    </g>
  </symbol>
  <symbol id="it-box" viewBox="0 0 120 120">
    <rect x="12" y="40" width="96" height="56" rx="7" fill="${C.tealD}"/>
    <rect x="9" y="30" width="102" height="26" rx="7" fill="${C.teal}"/>
    <rect x="9" y="49" width="102" height="5" fill="${C.tealD}" opacity=".55"/>
    <ellipse cx="60" cy="43" rx="24" ry="8" fill="${C.cream}"/>
    <path d="M22 86l5-4 3 5M92 62l4 3" stroke="#b0764a" stroke-width="2.4" stroke-linecap="round" fill="none"/>
    <text x="60" y="80" text-anchor="middle" class="t-display" font-size="15" fill="${C.gold}">11</text>
  </symbol>
  <symbol id="it-deck" viewBox="0 0 200 120">
    <rect x="6" y="14" width="188" height="96" rx="8" fill="#33313a"/>
    <rect x="6" y="14" width="188" height="14" rx="7" fill="#45424d"/>
    <rect x="22" y="36" width="100" height="44" rx="4" fill="#15161b"/>
    <rect x="30" y="42" width="84" height="32" rx="3" fill="#2a2b33"/>
    <circle cx="52" cy="58" r="9" fill="#15161b"/><circle cx="92" cy="58" r="9" fill="#15161b"/>
    <circle cx="52" cy="58" r="3" fill="${C.grey}"/><circle cx="92" cy="58" r="3" fill="${C.grey}"/>
    <rect x="134" y="38" width="46" height="16" rx="2" fill="#15161b"/>
    <text x="157" y="50.5" text-anchor="middle" class="t-mono" font-size="11" fill="${C.tealL}">000</text>
    <circle class="deck-lamp" cx="176" cy="68" r="5" fill="#5b3a36"/>
    <rect x="134" y="62" width="30" height="5" rx="2.5" fill="#55525e"/><rect x="134" y="71" width="30" height="5" rx="2.5" fill="#55525e"/>
    <g fill="${C.cream}"><rect x="24" y="88" width="20" height="14" rx="2"/><rect x="48" y="88" width="20" height="14" rx="2"/><rect x="72" y="88" width="20" height="14" rx="2"/><rect x="96" y="88" width="20" height="14" rx="2"/></g>
    <path d="M55 91l8 4-8 4z" fill="${C.red}"/>
  </symbol>
  <symbol id="it-pencil" viewBox="0 0 120 120">
    <g transform="rotate(-38 60 60)">
      <rect x="14" y="52" width="74" height="16" fill="${C.mustard}"/>
      <rect x="14" y="52" width="74" height="5" fill="#dcb45c"/>
      <path d="M88 52l20 8-20 8z" fill="${C.cream}"/><path d="M101 57.2l7 2.8-7 2.8z" fill="${C.ink}"/>
      <rect x="6" y="52" width="10" height="16" rx="3" fill="${C.pink}"/><rect x="14" y="52" width="5" height="16" fill="${C.grey}"/>
    </g>
  </symbol>
  <symbol id="it-radio" viewBox="0 0 200 130">
    <path d="M150 22L182 2" stroke="${C.grey}" stroke-width="3" stroke-linecap="round"/>
    <rect x="8" y="20" width="184" height="100" rx="10" fill="${C.ochre}"/>
    <rect x="8" y="20" width="184" height="16" rx="8" fill="#c79d60"/>
    <rect x="18" y="42" width="84" height="68" rx="6" fill="${C.woodD}"/>
    <g stroke="${C.ochre}" stroke-width="3.2" stroke-linecap="round"><path d="M28 54h64M28 64h64M28 74h64M28 84h64M28 94h64"/></g>
    <rect x="112" y="44" width="70" height="24" rx="3" fill="${C.cream}"/>
    <g stroke="${C.woodD}" stroke-width="1.4"><path d="M120 50v6M130 50v6M140 50v6M150 50v6M160 50v6M170 50v6"/></g>
    <path d="M144 46v20" stroke="${C.red}" stroke-width="2.4"/>
    <circle cx="126" cy="92" r="11" fill="${C.woodD}"/><circle cx="166" cy="92" r="11" fill="${C.woodD}"/>
    <path d="M126 92l6-7M166 92l-2-9" stroke="${C.cream}" stroke-width="2.4" stroke-linecap="round"/>
    <rect x="140" y="76" width="34" height="9" rx="1.5" fill="${C.cream}" transform="rotate(-4 157 80)"/>
  </symbol>
  <symbol id="it-label" viewBox="0 0 120 120">
    <g transform="rotate(3 60 60)">
      <rect x="18" y="14" width="84" height="94" rx="3" fill="#f3ead6" stroke="${C.woodD}" stroke-width="2"/>
      <rect x="19" y="15" width="82" height="17" rx="2" fill="${C.paper}"/>
      <text x="60" y="27.5" text-anchor="middle" class="t-serif" font-size="10" font-weight="700" fill="${C.woodD}">维修记录</text>
      <g class="t-hand" font-size="12" fill="${C.ink}"><text x="26" y="48">3.02 修。</text><text x="26" y="64">4.17 修。</text><text x="26" y="80">5.29 修。</text></g>
      <text x="26" y="99" class="t-hand" font-size="13" fill="${C.ink}">林</text>
      <rect x="42" y="88" width="50" height="14" rx="3" fill="#b9ab8c" opacity=".75"/>
    </g>
  </symbol>
  <symbol id="it-poster" viewBox="0 0 120 120">
    <g transform="rotate(-3 60 60)">
      <rect x="24" y="8" width="72" height="104" fill="${C.cream}"/>
      <rect x="29" y="13" width="62" height="78" fill="#232c3d"/>
      ${star(76, 30, 11, C.gold)}
      <path d="M46 91c-2-26 4-40 12-46 9 4 16 20 15 46z" fill="${C.red}"/>
      <circle cx="58" cy="40" r="7" fill="${C.skin}"/>
      <circle cx="50" cy="52" r="4.2" fill="${C.ink}"/><circle cx="50" cy="52" r="1.6" fill="${C.brass}"/>
      <rect x="34" y="97" width="52" height="4" fill="${C.woodD}"/><rect x="42" y="104" width="36" height="2.5" fill="${C.woodD}" opacity=".6"/>
    </g>
  </symbol>
  <symbol id="it-hanger" viewBox="0 0 120 120">
    <path d="M60 30c0-10 12-10 12-18a12 12 0 1 0-24 0" fill="none" stroke="${C.brass}" stroke-width="4" stroke-linecap="round"/>
    <path d="M60 30L14 62h92z" fill="none" stroke="${C.woodL}" stroke-width="7" stroke-linejoin="round"/>
    <path d="M60 62v12" stroke="${C.cream}" stroke-width="1.6"/>
    <rect x="34" y="74" width="52" height="30" rx="3" fill="${C.cream}" transform="rotate(-4 60 89)"/>
    <text x="60" y="87" text-anchor="middle" class="t-serif" font-size="9" font-weight="700" fill="${C.woodD}" transform="rotate(-4 60 89)">主角服</text>
    <text x="60" y="98" text-anchor="middle" class="t-serif" font-size="8" fill="${C.redD}" transform="rotate(-4 60 89)">在后台</text>
  </symbol>`;

  const sprite = `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden">
  <defs>
    <radialGradient id="wallg" cx="42%" cy="40%" r="78%">
      <stop offset="0" stop-color="${C.wallL}"/><stop offset=".55" stop-color="${C.wall}"/><stop offset="1" stop-color="${C.wallD}"/>
    </radialGradient>
    <pattern id="dots" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#101620" opacity=".2"/></pattern>
    <pattern id="dotsL" width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r=".9" fill="#fff" opacity=".1"/></pattern>
    <filter id="sh" x="-12%" y="-12%" width="124%" height="130%">
      <feOffset in="SourceAlpha" dx="-10" dy="13" result="o"/><feFlood flood-color="#141a26" flood-opacity=".46"/><feComposite in2="o" operator="in" result="s"/>
      <feMerge><feMergeNode in="s"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="shs" x="-12%" y="-12%" width="124%" height="130%">
      <feOffset in="SourceAlpha" dx="-5" dy="6" result="o"/><feFlood flood-color="#141a26" flood-opacity=".42"/><feComposite in2="o" operator="in" result="s"/>
      <feMerge><feMergeNode in="s"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="6"/>
    </filter>
    ${symbols}
  </defs></svg>`;

  /* ---------- 通用零件 ---------- */
  const frame = (w, h) => {
    const m = 30, r = 26, m2 = 40, r2 = 20;
    const p = (m, r) => `M${m + r} ${m}H${w - m - r}a${r} ${r} 0 0 0 ${r} ${r}V${h - m - r}a${r} ${r} 0 0 0 ${-r} ${r}H${m + r}a${r} ${r} 0 0 0 ${-r} ${-r}V${m + r}a${r} ${r} 0 0 0 ${r} ${-r}Z`;
    const fl = (x, y) => `<g transform="translate(${x} ${y})"><circle cx="-7" cy="0" r="6.5"/><circle cx="7" cy="0" r="6.5"/><circle cx="0" cy="-7" r="6.5"/><circle cx="0" cy="7" r="6.5"/><circle r="3" fill="${C.wallD}"/></g>`;
    return `<g class="frame" pointer-events="none"><path d="${p(m, r)}" fill="none" stroke="${C.gold}" stroke-width="3" opacity=".9"/>
      <path d="${p(m2, r2)}" fill="none" stroke="${C.gold}" stroke-width="1.3" opacity=".7"/>
      <g fill="${C.gold}">${fl(m, m)}${fl(w - m, m)}${fl(m, h - m)}${fl(w - m, h - m)}</g></g>`;
  };
  const wall = (w, h, floorY) => `<rect width="${w}" height="${h}" fill="url(#wallg)"/>
    <rect x="0" y="${floorY}" width="${w}" height="${h - floorY}" fill="${C.floor}"/>
    <rect x="0" y="${floorY - 14}" width="${w}" height="14" fill="${C.line}"/>
    <rect width="${w}" height="${h}" fill="url(#dots)"/>`;
  const plate = (x, y, w, h, text, fs) => `<g filter="url(#shs)"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5" fill="#6b5433"/>
    <rect x="${x + 5}" y="${y + 5}" width="${w - 10}" height="${h - 10}" rx="3" fill="none" stroke="${C.brass}" stroke-width="1.6"/>
    <text x="${x + w / 2}" y="${y + h / 2 + fs * 0.36}" text-anchor="middle" class="t-display" font-size="${fs}" fill="${C.gold}">${text}</text></g>`;
  const lamp = (x, y) => `<g filter="url(#sh)"><rect x="${x - 3}" y="0" width="6" height="${y}" fill="${C.ink}"/>
    <path d="M${x - 44} ${y + 14}L${x - 34} ${y}h68l10 14z" fill="#3a3530"/><rect x="${x - 38}" y="${y + 14}" width="76" height="74" fill="#4d4435"/>
    <g fill="${C.gold}" opacity=".85"><rect x="${x - 30}" y="${y + 22}" width="16" height="58"/><rect x="${x - 8}" y="${y + 22}" width="16" height="58"/><rect x="${x + 14}" y="${y + 22}" width="16" height="58"/></g>
    <path d="M${x - 38} ${y + 88}h76l-24 22h-28z" fill="#3a3530"/></g>`;
  /* 可调查物：art 是它的画，box 是点击范围，key 表示重要物品（金色星标 + 金边） */
  const H = (id, label, art, box, o = {}) => {
    const [x, y, w, h] = box;
    const mx = o.mx ?? x + w - 6, my = o.my ?? y + 6;
    const cond = (o.iff ? ` data-if="${o.iff}"` : '') + (o.unless ? ` data-unless="${o.unless}"` : '');
    const mark = o.key
      ? `<g class="mark" transform="translate(${mx} ${my})"><circle r="19" fill="${C.ink}" stroke="${C.gold}" stroke-width="2.5"/>${star(0, 0, 13, C.gold)}</g>`
      : `<g class="mark" transform="translate(${mx} ${my})"><circle r="11" fill="${C.ink}" opacity=".75"/><circle r="5" fill="${C.gold}"/></g>`;
    return `<g class="hs${o.key ? ' key' : ''}" data-hs="${id}" tabindex="0" role="button" aria-label="${label}"${cond}>
      ${art}<rect class="ring" x="${x}" y="${y}" width="${w}" height="${h}" rx="12"/><rect class="hit" x="${x}" y="${y}" width="${w}" height="${h}" rx="12"/>${mark}</g>`;
  };
  const svg = (w, h, inner, cls) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" class="${cls || 'scene-svg'}" preserveAspectRatio="xMidYMid meet">${inner}</svg>`;
  const U = (id, x, y, w, h, extra = '') => `<use href="#${id}" x="${x}" y="${y}" width="${w}" height="${h}" ${extra}/>`;

  /* ---------- 空墙：标题页、群聊、转场用 ---------- */
  function blank() {
    return svg(1600, 900, `<rect width="1600" height="900" fill="url(#wallg)"/><rect width="1600" height="900" fill="url(#dots)"/>` + lamp(250, 60) + frame(1600, 900));
  }

  /* ---------- 场景一：寄存处 ---------- */
  function lockers() {
    const x0 = 300, y0 = 150, cw = 190, ch = 150;
    let s = wall(1600, 900, 790);
    s += lamp(190, 70) + plate(700, 56, 200, 56, '寄 存 处', 26);
    s += `<g filter="url(#sh)"><rect x="${x0 - 16}" y="${y0 - 16}" width="${cw * 5 + 32}" height="${ch * 4 + 32}" rx="8" fill="${C.woodD}"/></g>`;
    const named = { 3: 1, 8: 1, 17: 1, 5: 1, 19: 1 };
    const door = (n, x, y) => {
      const tint = (n * 7) % 3 === 0 ? C.woodL : (n % 2 ? C.wood : '#7a5437');
      return `<rect x="${x + 7}" y="${y + 7}" width="${cw - 14}" height="${ch - 14}" rx="5" fill="${tint}"/>
        <rect x="${x + 20}" y="${y + 56}" width="${cw - 40}" height="${ch - 80}" rx="3" fill="none" stroke="${C.woodD}" stroke-width="2" opacity=".45"/>
        <rect x="${x + cw / 2 - 34}" y="${y + 17}" width="68" height="30" rx="4" fill="#6b5433"/>
        <rect x="${x + cw / 2 - 30}" y="${y + 21}" width="60" height="22" rx="2" fill="none" stroke="${C.brass}" stroke-width="1.2"/>
        <text x="${x + cw / 2}" y="${y + 39}" text-anchor="middle" class="t-display" font-size="19" fill="${C.gold}">${n}</text>
        <circle cx="${x + cw - 30}" cy="${y + ch / 2 + 14}" r="7" fill="${C.brass}"/>
        <g stroke="${C.woodD}" stroke-width="3" stroke-linecap="round" opacity=".55"><path d="M${x + 40} ${y + ch - 38}h44M${x + 40} ${y + ch - 28}h44"/></g>
        ${named[n] ? `<rect x="${x + 34}" y="${y + 66}" width="62" height="24" rx="2" fill="${C.cream}" transform="rotate(${n % 2 ? -3 : 2} ${x + 65} ${y + 78})"/><path d="M${x + 42} ${y + 80}q8-9 14 0t14-2 12 1" fill="none" stroke="${C.ink}" stroke-width="2" stroke-linecap="round"/>` : ''}`;
    };
    let doors = '';
    for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) {
      const n = r * 5 + c + 1, x = x0 + c * cw, y = y0 + r * ch;
      if (n === 11 || n === 3 || n === 14) continue;
      doors += door(n, x, y);
    }
    s += doors;
    // 3 号：有名字
    s += H('l3', '三号柜', door(3, x0 + 2 * cw, y0), [x0 + 2 * cw + 4, y0 + 4, cw - 8, ch - 8]);
    // 14 号：没名字
    s += H('l14', '十四号柜', door(14, x0 + 3 * cw, y0 + 2 * ch), [x0 + 3 * cw + 4, y0 + 2 * ch + 4, cw - 8, ch - 8]);
    // 11 号：没上锁，门虚掩
    const x = x0, y = y0 + 2 * ch;
    const l11 = `<rect x="${x + 7}" y="${y + 7}" width="${cw - 14}" height="${ch - 14}" rx="5" fill="#161b25"/>
      <g data-unless="boxOut"><rect x="${x + 96}" y="${y + 84}" width="74" height="50" rx="5" fill="${C.tealD}"/><rect x="${x + 93}" y="${y + 76}" width="80" height="20" rx="5" fill="${C.teal}"/><ellipse cx="${x + 133}" cy="${y + 86}" rx="18" ry="6" fill="${C.cream}"/></g>
      <path d="M${x + 7} ${y + 7}l96 12v${ch - 38}l-96 12z" fill="${C.woodL}"/>
      <rect x="${x + 22}" y="${y + 26}" width="62" height="28" rx="4" fill="#6b5433"/><rect x="${x + 26}" y="${y + 30}" width="54" height="20" rx="2" fill="none" stroke="${C.gold}" stroke-width="1.6"/>
      <text x="${x + 53}" y="${y + 47}" text-anchor="middle" class="t-display" font-size="19" fill="${C.gold}">11</text>
      <circle cx="${x + 88}" cy="${y + ch / 2 + 10}" r="6" fill="${C.brass}"/>`;
    s += H('l11', '十一号柜', l11, [x + 4, y + 4, cw - 8, ch - 8], { key: true });
    // 左边：有名字的放这
    const keep = `<g filter="url(#sh)"><path d="M150 560l10-190" stroke="${C.red}" stroke-width="9" stroke-linecap="round"/><path d="M158 372q-16-12-8-28" fill="none" stroke="${C.ink}" stroke-width="7" stroke-linecap="round"/>
      <rect x="62" y="590" width="190" height="200" fill="#a8845a"/><path d="M62 590l-18-38h190l18 38z" fill="#b99468"/>
      <rect x="92" y="640" width="130" height="62" rx="3" fill="${C.cream}"/><text x="157" y="682" text-anchor="middle" class="t-hand" font-size="34" fill="${C.ink}">有名字</text></g>`;
    s += H('keep', '左边的纸箱', keep, [44, 380, 226, 410]);
    // 右边：告示 + 垃圾袋
    const notice = `<g filter="url(#shs)" transform="rotate(2 1420 300)"><rect x="1330" y="200" width="190" height="210" fill="${C.cream}"/>
      <circle cx="1425" cy="214" r="7" fill="${C.red}"/>
      <text x="1425" y="262" text-anchor="middle" class="t-serif" font-size="25" font-weight="700" fill="${C.redD}">明早 8:00</text>
      <text x="1425" y="298" text-anchor="middle" class="t-serif" font-size="25" font-weight="700" fill="${C.redD}">施工进场</text>
      <path d="M1352 322h146" stroke="${C.woodD}" stroke-width="1.5"/>
      <text x="1425" y="354" text-anchor="middle" class="t-serif" font-size="19" fill="${C.ink}">无人认领的物品</text>
      <text x="1425" y="382" text-anchor="middle" class="t-serif" font-size="19" fill="${C.ink}">今日统一清理</text></g>`;
    s += H('notice', '告示', notice, [1322, 192, 206, 226]);
    const bag = `<g filter="url(#sh)"><path d="M1330 790c-26-70 4-150 60-172 20-8 14-36 34-38s18 26 40 34c62 24 84 110 60 176z" fill="${C.ink}"/>
      <path d="M1410 584c8-18 26-18 30 0" fill="none" stroke="#3b3c46" stroke-width="6" stroke-linecap="round"/>
      <path d="M1380 660q30 40 10 110M1470 650q-14 60 10 120" fill="none" stroke="#3b3c46" stroke-width="4" stroke-linecap="round"/></g>`;
    s += H('bag', '垃圾袋', bag, [1316, 560, 226, 232]);
    return svg(1600, 900, s + frame(1600, 900));
  }

  /* ---------- 场景一 b：铁盒里的四样东西 ---------- */
  function box() {
    let s = `<rect width="1600" height="900" fill="url(#wallg)"/><rect width="1600" height="900" fill="url(#dots)"/>`;
    s += lamp(1380, 40) + plate(110, 70, 250, 60, '十 一 号 柜', 26);
    // 桌面
    s += `<rect x="0" y="330" width="1600" height="570" fill="${C.wood}"/><rect x="0" y="330" width="1600" height="16" fill="${C.woodL}"/>
      <g stroke="${C.woodD}" stroke-width="3" opacity=".3" stroke-linecap="round"><path d="M60 420h380M700 392h520M1180 860h340M90 850h460M520 610h60"/></g>
      <rect x="0" y="330" width="1600" height="570" fill="url(#dots)"/>`;
    // 打开的铁盒
    s += `<g filter="url(#sh)"><g transform="rotate(-14 250 330)"><rect x="96" y="210" width="330" height="210" rx="16" fill="${C.teal}"/>
        <rect x="110" y="224" width="302" height="182" rx="10" fill="none" stroke="${C.gold}" stroke-width="2.5" opacity=".8"/>
        <ellipse cx="261" cy="315" rx="92" ry="50" fill="${C.cream}"/>
        <text x="261" y="308" text-anchor="middle" class="t-display" font-size="30" fill="${C.tealD}">曲 奇</text>
        <text x="261" y="340" text-anchor="middle" class="t-serif" font-size="17" fill="${C.woodD}">净含量 400 克</text></g>
      <rect x="80" y="470" width="380" height="250" rx="16" fill="${C.tealD}"/><rect x="100" y="490" width="340" height="210" rx="8" fill="#2a565c"/>
      <path d="M96 700l14-10 10 14M430 500l12 8" stroke="#b0764a" stroke-width="6" stroke-linecap="round" fill="none"/></g>`;
    // 衬布
    s += `<g filter="url(#sh)"><rect x="520" y="400" width="1000" height="410" rx="10" fill="${C.cream}" transform="rotate(-1 1020 600)"/></g>`;
    const tag = (x, t) => `<g filter="url(#shs)"><rect x="${x - 62}" y="742" width="124" height="38" rx="4" fill="#6b5433"/><rect x="${x - 57}" y="747" width="114" height="28" rx="2" fill="none" stroke="${C.brass}" stroke-width="1.3"/><text x="${x}" y="770" text-anchor="middle" class="t-display" font-size="20" fill="${C.gold}">${t}</text></g>`;
    const item = (id, sym, label, x, y, w, cx) => H(id, label, `<g filter="url(#sh)">${U(sym, x, y, w, w)}</g>${tag(cx, label)}`, [cx - 115, 430, 230, 360], { key: true, mx: cx + 96, my: 448 });
    s += item('notebook', 'it-notebook', '手札', 540, 440, 290, 670);
    s += item('cassette', 'it-cassette', '磁带', 795, 465, 250, 915);
    s += item('button', 'it-button', '纽扣', 1070, 500, 180, 1160);
    s += item('ticket', 'it-ticket', '车票', 1280, 470, 250, 1400);
    return svg(1600, 900, s + frame(1600, 900));
  }

  /* ---------- 场景二：灯光间 ---------- */
  function booth() {
    let s = wall(1600, 900, 800);
    s += plate(690, 44, 220, 54, '灯 光 间', 26);
    // 窗：往下看得到舞台
    s += `<g filter="url(#sh)"><rect x="372" y="118" width="856" height="322" rx="6" fill="${C.woodD}"/></g>
      <rect x="390" y="134" width="820" height="290" fill="#1a2130"/>
      <path d="M470 424l84-104h492l84 104z" fill="#5b4132"/><path d="M554 320h492" stroke="#3d2b21" stroke-width="4"/>
      <path d="M800 134l-150 250h300z" fill="${C.gold}" opacity=".13"/><ellipse cx="800" cy="384" rx="150" ry="22" fill="${C.gold}" opacity=".22"/>
      <rect x="390" y="134" width="78" height="290" fill="${C.redD}"/><rect x="1132" y="134" width="78" height="290" fill="${C.redD}"/>
      <g stroke="#5e2321" stroke-width="5"><path d="M412 134v290M440 134v290M1154 134v290M1184 134v290"/></g>
      <g fill="#3d2b21"><rect x="720" y="352" width="26" height="30"/><rect x="752" y="346" width="26" height="36"/><rect x="786" y="352" width="26" height="30"/><rect x="900" y="356" width="60" height="26"/></g>
      <path d="M800 134v290M390 280h820" stroke="${C.woodD}" stroke-width="8"/>
      <rect x="390" y="134" width="820" height="290" fill="url(#dotsL)"/>`;
    s += H('window', '窗外的舞台', '', [392, 136, 816, 286], { mx: 1180, my: 160 });
    // 吊着的灯
    s += `<g filter="url(#sh)"><rect x="150" y="0" width="8" height="96" fill="${C.ink}"/><g transform="rotate(28 154 150)"><rect x="112" y="96" width="84" height="120" rx="12" fill="#33313a"/><rect x="104" y="204" width="100" height="22" rx="4" fill="#45424d"/><ellipse cx="154" cy="228" rx="44" ry="9" fill="${C.gold}" opacity=".6"/></g></g>`;
    // 左墙的带子架
    let tapes = `<g filter="url(#sh)"><rect x="70" y="420" width="250" height="16" fill="${C.woodD}"/>`;
    const tc = [C.teal, C.pink, C.ochre, C.cream, C.red, C.grey, C.teal, C.olive, C.pink, C.cream, C.ochre, C.teal, C.grey, C.red, C.cream, C.pink];
    tc.forEach((c, i) => { tapes += `<rect x="${82 + i * 14}" y="${350 + (i % 3) * 3}" width="12" height="${70 - (i % 3) * 3}" fill="${c}"/>`; });
    tapes += `</g><g filter="url(#sh)"><circle cx="128" cy="500" r="5" fill="${C.brass}"/><circle cx="128" cy="536" r="38" fill="none" stroke="${C.ink}" stroke-width="12"/><circle cx="128" cy="536" r="22" fill="none" stroke="#3b3c46" stroke-width="7"/></g>`;
    s += H('tapes', '架上的伴奏带', tapes, [64, 336, 262, 104], { mx: 316, my: 344 });
    // 桌子
    s += `<g filter="url(#sh)"><rect x="150" y="560" width="1300" height="34" fill="${C.woodL}"/><rect x="180" y="594" width="1240" height="120" fill="${C.wood}"/>
      <rect x="190" y="714" width="26" height="86" fill="${C.woodD}"/><rect x="1384" y="714" width="26" height="86" fill="${C.woodD}"/></g>
      <g fill="none" stroke="${C.woodD}" stroke-width="3" opacity=".5"><rect x="220" y="612" width="300" height="84" rx="4"/><rect x="560" y="612" width="300" height="84" rx="4"/></g>
      <circle cx="370" cy="654" r="8" fill="${C.brass}"/><circle cx="710" cy="654" r="8" fill="${C.brass}"/>`;
    // 调光台
    let con = `<g filter="url(#sh)"><path d="M228 560l34-118h476l34 118z" fill="#2c2f38"/><path d="M262 442h476l6 20H256z" fill="#3b3e49"/>`;
    const fc = [C.red, C.cream, C.cream, C.teal, C.cream, C.pink, C.cream, C.cream, C.mustard, C.cream, C.cream, C.teal];
    const fy = [0, 18, 30, 8, 24, 30, 12, 30, 20, 30, 30, 30];
    for (let i = 0; i < 12; i++) { const fx = 290 + i * 34; con += `<path d="M${fx} 474v72" stroke="#15161b" stroke-width="5" stroke-linecap="round"/><rect x="${fx - 9}" y="${478 + fy[i] * 1.8}" width="18" height="12" rx="2" fill="${fc[i]}"/>`; }
    con += `<circle cx="716" cy="510" r="15" fill="${C.red}"/><circle cx="716" cy="510" r="5" fill="${C.ink}"/></g>`;
    s += H('console', '调光台', con, [234, 440, 532, 122], { mx: 752, my: 452 });
    // 色纸
    const gels = `<g filter="url(#shs)"><g transform="translate(840 556)">${[C.teal, C.pink, C.mustard, C.red, C.tealL].map((c, i) => `<rect x="-11" y="-108" width="22" height="108" rx="3" fill="${c}" transform="rotate(${-34 + i * 17})"/>`).join('')}<circle r="9" fill="${C.brass}"/></g></g>`;
    s += H('gels', '色纸样本', gels, [772, 444, 136, 118], { mx: 900, my: 452 });
    // 笔筒
    const cup = `<g filter="url(#shs)"><g transform="rotate(-8 962 500)"><rect x="950" y="418" width="11" height="90" fill="${C.mustard}"/><path d="M950 418l5.5-16 5.5 16z" fill="${C.cream}"/></g>
      <g transform="rotate(7 986 500)"><rect x="980" y="430" width="11" height="80" fill="${C.mustard}"/><rect x="980" y="422" width="11" height="10" rx="3" fill="${C.pink}"/></g>
      <rect x="968" y="440" width="8" height="70" fill="${C.tealD}"/>
      <path d="M936 492h74l-6 68h-62z" fill="${C.cream}"/><path d="M938 512h70" stroke="${C.red}" stroke-width="7"/></g>`;
    s += H('cup', '笔筒', cup, [926, 396, 94, 168], { key: true, mx: 1016, my: 404, unless: 'hasPencil' });
    s += `<g data-if="hasPencil" filter="url(#shs)"><rect x="968" y="440" width="8" height="70" fill="${C.tealD}"/><g transform="rotate(7 986 500)"><rect x="980" y="430" width="11" height="80" fill="${C.mustard}"/><rect x="980" y="422" width="11" height="10" rx="3" fill="${C.pink}"/></g><path d="M936 492h74l-6 68h-62z" fill="${C.cream}"/><path d="M938 512h70" stroke="${C.red}" stroke-width="7"/></g>`;
    // 卡带机 + 电线
    s += `<path data-unless="power" d="M1330 520c60 10 70 60 60 130s-90 120-190 150" fill="none" stroke="${C.ink}" stroke-width="7" stroke-linecap="round"/>
      <g data-unless="power"><rect x="1150" y="806" width="56" height="26" rx="5" fill="${C.ink}" transform="rotate(-14 1178 819)"/><path d="M1146 824l-18 6M1148 834l-18 6" stroke="${C.brass}" stroke-width="5" stroke-linecap="round"/></g>
      <path data-if="power" d="M1330 520c70 10 80 80 40 150s-110 86-176 92" fill="none" stroke="${C.ink}" stroke-width="7" stroke-linecap="round"/>`;
    const deck = `<g filter="url(#sh)">${U('it-deck', 1050, 386, 300, 180)}</g><circle data-if="power" cx="1314" cy="488" r="15" fill="#ff7a5a" opacity=".5" filter="url(#glow)"/><circle data-if="power" cx="1314" cy="488" r="7.5" fill="#ff8a66"/>`;
    s += H('deck', '卡带机', deck, [1054, 400, 292, 164], { key: true, mx: 1340, my: 404 });
    // 桌下的插线板
    const strip = `<g filter="url(#shs)"><rect x="1010" y="752" width="210" height="40" rx="8" fill="${C.cream}"/>
      <g fill="${C.ink}"><rect x="1070" y="764" width="5" height="16"/><rect x="1084" y="764" width="5" height="16"/><rect x="1120" y="764" width="5" height="16"/><rect x="1134" y="764" width="5" height="16"/></g>
      <rect data-unless="power" x="1022" y="762" width="30" height="20" rx="3" fill="#5b3a36"/><rect data-if="power" x="1022" y="762" width="30" height="20" rx="3" fill="#ff7a5a"/>
      <g data-if="power"><rect x="1160" y="744" width="44" height="30" rx="5" fill="${C.ink}"/></g>
      <path d="M1010 772c-60 0-80 10-120 28" fill="none" stroke="${C.cream}" stroke-width="6" stroke-linecap="round"/></g>`;
    s += H('strip', '桌下的插线板', strip, [1000, 730, 232, 92], { mx: 1226, my: 738 });
    // 门
    s += `<g filter="url(#sh)"><rect x="1462" y="230" width="110" height="570" fill="${C.wood}"/><rect x="1480" y="262" width="74" height="120" fill="#1a2130"/><circle cx="1484" cy="540" r="9" fill="${C.brass}"/></g>`;
    return svg(1600, 900, s + frame(1600, 900));
  }

  /* ---------- 场景三：道具间 ---------- */
  function props() {
    let s = wall(1600, 900, 800);
    s += plate(120, 44, 220, 54, '道 具 间', 26);
    // 钟：五点二十
    const clock = `<g filter="url(#sh)"><circle cx="860" cy="120" r="62" fill="${C.brass}"/><circle cx="860" cy="120" r="52" fill="${C.cream}"/>
      <g stroke="${C.woodD}" stroke-width="4" stroke-linecap="round"><path d="M860 74v10M860 156v10M814 120h10M896 120h10"/></g>
      <path d="M860 120l10 26" stroke="${C.ink}" stroke-width="7" stroke-linecap="round"/><path d="M860 120l34 20" stroke="${C.ink}" stroke-width="4.5" stroke-linecap="round"/><circle cx="860" cy="120" r="6" fill="${C.red}"/></g>`;
    s += H('clock', '墙上的钟', clock, [792, 52, 136, 136], { mx: 924, my: 66 });
    // 架子
    s += `<g filter="url(#sh)"><rect x="80" y="170" width="20" height="630" fill="${C.woodD}"/><rect x="660" y="170" width="20" height="630" fill="${C.woodD}"/>
      <rect x="80" y="170" width="600" height="18" fill="${C.woodD}"/><rect x="80" y="338" width="600" height="18" fill="${C.woodD}"/><rect x="80" y="508" width="600" height="18" fill="${C.woodD}"/><rect x="80" y="678" width="600" height="18" fill="${C.woodD}"/></g>
      <rect x="100" y="188" width="560" height="612" fill="#1c2431" opacity=".35"/>`;
    // 顶层：月亮、王冠、灯笼
    const junkTop = `<g filter="url(#shs)"><path d="M190 322a64 64 0 1 1 0-124 50 50 0 1 0 0 124z" fill="${C.cream}"/>
      <path d="M330 338l-10-70 34 34 26-50 26 50 34-34-10 70z" fill="${C.brass}"/><circle cx="380" cy="252" r="8" fill="${C.red}"/>
      <rect x="520" y="218" width="84" height="120" rx="20" fill="${C.red}"/><g stroke="${C.redD}" stroke-width="4"><path d="M542 218v120M562 218v120M582 218v120"/></g><rect x="540" y="206" width="44" height="14" fill="${C.ink}"/></g>`;
    s += H('junkTop', '架子顶层', junkTop, [116, 192, 520, 144], { mx: 632, my: 200 });
    // 第二层：断腿椅子、干掉的漆
    const junkMid = `<g filter="url(#shs)"><g transform="rotate(9 250 440)"><rect x="176" y="368" width="14" height="140" fill="${C.woodL}"/><rect x="262" y="368" width="14" height="78" fill="${C.woodL}"/><rect x="176" y="374" width="100" height="13" fill="${C.woodL}"/><rect x="176" y="398" width="100" height="10" fill="${C.woodL}"/>
        <path d="M170 440h124l14 16H170z" fill="${C.ochre}"/><rect x="294" y="456" width="13" height="52" fill="${C.woodL}"/><rect x="216" y="456" width="12" height="20" fill="${C.woodL}"/><path d="M216 476l14-4-2 8z" fill="${C.cream}"/></g>
      <path d="M470 400h130l-10 108H480z" fill="${C.grey}"/><ellipse cx="535" cy="400" rx="65" ry="13" fill="#9aa8ba"/><ellipse cx="535" cy="400" rx="52" ry="8" fill="${C.teal}"/>
      <path d="M580 404c8 30-4 44 6 70" fill="none" stroke="${C.teal}" stroke-width="12" stroke-linecap="round"/><path d="M470 400c0-50 130-50 130 0" fill="none" stroke="${C.ink}" stroke-width="4"/></g>`;
    s += H('junkMid', '架子第二层', junkMid, [116, 362, 520, 144], { mx: 632, my: 370 });
    // 第三层：收音机在最里面，被假花箱子挡着
    const radio = `<g filter="url(#sh)">${U('it-radio', 410, 548, 220, 143)}</g>`;
    s += H('radio', '旧收音机', radio, [404, 540, 232, 140], { key: true, mx: 632, my: 548, iff: 'boxMoved' });
    s += `<g data-unless="boxMoved">${U('it-radio', 410, 548, 220, 143)}</g><g data-unless="boxMoved"><path d="M612 552l44-74" stroke="${C.grey}" stroke-width="4" stroke-linecap="round"/><circle cx="656" cy="478" r="5" fill="${C.grey}"/></g>`;
    const flowerBox = (dx) => `<g filter="url(#sh)" transform="translate(${dx} 0)">
      <g><path d="M440 560q-6-34 10-46" stroke="${C.olive}" stroke-width="6" fill="none"/><path d="M500 560q4-46-8-62" stroke="${C.olive}" stroke-width="6" fill="none"/><path d="M560 560q10-32 0-52" stroke="${C.olive}" stroke-width="6" fill="none"/><path d="M606 562q12-22 14-40" stroke="${C.olive}" stroke-width="6" fill="none"/>
      <circle cx="452" cy="506" r="24" fill="${C.pink}"/><circle cx="452" cy="506" r="9" fill="${C.mustard}"/><circle cx="490" cy="486" r="27" fill="${C.red}"/><circle cx="490" cy="486" r="10" fill="${C.mustard}"/>
      <circle cx="560" cy="500" r="25" fill="${C.cream}"/><circle cx="560" cy="500" r="9" fill="${C.mustard}"/><circle cx="622" cy="512" r="22" fill="${C.tealL}"/><circle cx="622" cy="512" r="8" fill="${C.mustard}"/></g>
      <rect x="396" y="548" width="258" height="130" fill="#a8845a"/><rect x="396" y="548" width="258" height="18" fill="#b99468"/>
      <rect x="470" y="592" width="110" height="52" rx="3" fill="${C.cream}"/><text x="525" y="630" text-anchor="middle" class="t-hand" font-size="34" fill="${C.ink}">假花</text></g>`;
    s += H('flowers', '假花箱子', flowerBox(0), [392, 468, 266, 212], { mx: 652, my: 476, unless: 'boxMoved' });
    s += `<g data-if="boxMoved">${flowerBox(-286)}</g>`;
    s += `<g data-unless="boxMoved" filter="url(#shs)"><rect x="130" y="610" width="150" height="68" rx="6" fill="${C.redD}"/><rect x="130" y="610" width="150" height="16" rx="6" fill="${C.red}"/><rect x="186" y="598" width="38" height="14" rx="4" fill="${C.ink}"/></g>`;
    // 底层：绳子、箱子
    s += `<g filter="url(#shs)"><circle cx="180" cy="752" r="38" fill="none" stroke="${C.ochre}" stroke-width="14"/><circle cx="180" cy="752" r="20" fill="none" stroke="#9c7640" stroke-width="8"/>
      <rect x="300" y="716" width="150" height="84" fill="#a8845a"/><rect x="470" y="730" width="170" height="70" fill="#97764f"/></g>`;
    // 海报
    const poster = `<g filter="url(#sh)" transform="rotate(-2 880 400)"><rect x="752" y="218" width="256" height="368" fill="${C.cream}"/>
      <rect x="768" y="234" width="224" height="268" fill="#232c3d"/>${star(942, 286, 34, C.gold)}
      <path d="M826 502c-8-92 14-150 46-170 34 14 58 78 54 170z" fill="${C.red}"/><circle cx="872" cy="318" r="25" fill="${C.skin}"/><path d="M848 312c0-34 48-34 48-2-14-10-32-10-48 2z" fill="#b8643a"/>
      <circle cx="842" cy="362" r="14" fill="${C.ink}"/>${star(842, 362, 9, C.brass)}
      <text x="880" y="538" text-anchor="middle" class="t-display" font-size="30" fill="${C.woodD}">借星的人</text>
      <rect x="800" y="552" width="160" height="5" fill="${C.woodD}" opacity=".6"/><rect x="826" y="566" width="108" height="4" fill="${C.woodD}" opacity=".4"/>
      <rect x="744" y="210" width="34" height="18" fill="${C.gold}" opacity=".8" transform="rotate(-40 761 219)"/><rect x="982" y="210" width="34" height="18" fill="${C.gold}" opacity=".8" transform="rotate(40 999 219)"/></g>`;
    s += H('poster', '墙上的旧海报', poster, [744, 208, 272, 388], { key: true, mx: 1010, my: 222 });
    // 戏服架
    let rack = `<g filter="url(#sh)"><rect x="1070" y="246" width="470" height="12" rx="6" fill="${C.brass}"/><rect x="1084" y="246" width="12" height="554" fill="${C.woodD}"/><rect x="1514" y="246" width="12" height="554" fill="${C.woodD}"/><rect x="1056" y="788" width="68" height="12" fill="${C.woodD}"/><rect x="1486" y="788" width="68" height="12" fill="${C.woodD}"/>`;
    const cos = [C.grey, C.grey, C.olive, C.pink];
    cos.forEach((c, i) => {
      const cx = 1150 + i * 82;
      rack += `<path d="M${cx} 258v14" stroke="${C.brass}" stroke-width="4"/><path d="M${cx - 34} 292l34-20 34 20z" fill="none" stroke="${C.woodL}" stroke-width="6" stroke-linejoin="round"/>
        <path d="M${cx - 36} 292h72l10 300h-92z" fill="${c}"/><path d="M${cx - 36} 292l-12 150 18 4 6-110z" fill="${c}"/><path d="M${cx + 36} 292l12 150-18 4-6-110z" fill="${c}"/>
        <path d="M${cx - 30} 300l22 2-4 150-34 10z" fill="${C.redD}"/>
        <circle cx="${cx - 20}" cy="308" r="10" fill="${C.ink}"/>${star(cx - 20, 308, 6.5, C.brass)}
        <path d="M${cx - 46} 592h92" stroke="${C.gold}" stroke-width="5"/>`;
    });
    rack += `<path d="M1482 258v14" stroke="${C.brass}" stroke-width="4"/><path d="M1448 292l34-20 34 20z" fill="none" stroke="${C.woodL}" stroke-width="6" stroke-linejoin="round"/>
      <path d="M1482 292v26" stroke="${C.cream}" stroke-width="2"/><rect x="1446" y="318" width="72" height="46" rx="4" fill="${C.cream}" transform="rotate(-5 1482 341)"/>
      <path d="M1458 336h48M1458 350h34" stroke="${C.woodD}" stroke-width="4" stroke-linecap="round" transform="rotate(-5 1482 341)"/></g>`;
    s += H('rack', '戏服架', rack, [1066, 236, 478, 566], { key: true, mx: 1538, my: 250 });
    // 地上的纸箱
    s += `<g filter="url(#sh)"><rect x="760" y="670" width="200" height="130" fill="#a8845a"/><rect x="760" y="670" width="200" height="20" fill="#b99468"/><rect x="800" y="716" width="120" height="50" rx="3" fill="${C.cream}"/><text x="860" y="752" text-anchor="middle" class="t-hand" font-size="32" fill="${C.ink}">待清理</text></g>`;
    return svg(1600, 900, s + frame(1600, 900));
  }

  /* ---------- 特写：卡带机 ---------- */
  function deckClose() {
    let s = `<rect width="1000" height="720" fill="url(#wallg)"/><rect width="1000" height="720" fill="url(#dots)"/>
      <rect x="0" y="600" width="1000" height="120" fill="${C.woodL}"/><rect x="0" y="600" width="1000" height="12" fill="#a57a52"/>`;
    s += `<g filter="url(#sh)"><rect x="80" y="110" width="840" height="500" rx="26" fill="#33313a"/><rect x="80" y="110" width="840" height="56" rx="26" fill="#45424d"/></g>
      <text x="124" y="148" class="t-display" font-size="24" fill="${C.gold}" opacity=".85">CASSETTE  DECK</text>
      <g fill="#e9e3d6" opacity=".16"><circle cx="210" cy="230" r="6"/><circle cx="640" cy="196" r="4"/><circle cx="880" cy="470" r="5"/><circle cx="130" cy="520" r="4"/><circle cx="760" cy="560" r="6"/><circle cx="420" cy="590" r="4"/></g>`;
    // 带仓
    const well = `<rect x="150" y="196" width="500" height="262" rx="14" fill="#15161b"/>
      <g data-unless="tapeIn"><circle cx="300" cy="320" r="34" fill="#2a2b33"/><circle cx="500" cy="320" r="34" fill="#2a2b33"/><circle cx="300" cy="320" r="10" fill="${C.grey}"/><circle cx="500" cy="320" r="10" fill="${C.grey}"/>
        <text x="400" y="424" text-anchor="middle" class="t-serif" font-size="20" fill="${C.grey}">空的带仓</text></g>
      <g data-if="tapeIn"><rect x="180" y="214" width="440" height="226" rx="14" fill="${C.cream}"/>
        <rect x="204" y="232" width="392" height="130" rx="8" fill="${C.teal}"/><rect x="220" y="244" width="360" height="42" rx="4" fill="#f5eedd"/>
        <text x="400" y="276" text-anchor="middle" class="t-hand" font-size="34" fill="${C.ink}">R-17　5.29</text>
        <rect x="262" y="296" width="276" height="58" rx="29" fill="${C.ink}"/>
        <g class="reel reel-l"><circle cx="310" cy="325" r="23" fill="${C.cream}"/><circle cx="310" cy="325" r="7" fill="${C.ink}"/><path d="M310 304v10M292 336l8-5M328 336l-8-5" stroke="${C.ink}" stroke-width="4" stroke-linecap="round"/></g>
        <g class="reel reel-r"><circle cx="490" cy="325" r="23" fill="${C.cream}"/><circle cx="490" cy="325" r="7" fill="${C.ink}"/><path d="M490 304v10M472 336l8-5M508 336l-8-5" stroke="${C.ink}" stroke-width="4" stroke-linecap="round"/></g>
        <path d="M260 440l22-56h236l22 56z" fill="${C.paper}"/>
        <path data-unless="wind1" d="M300 404q30 86 100 60t100-60" fill="none" stroke="#5b3320" stroke-width="7" stroke-linecap="round"/>
        <path data-if="wind1" data-unless="wind2" d="M300 404q40 54 100 38t100-38" fill="none" stroke="#5b3320" stroke-width="7" stroke-linecap="round"/>
        <path data-if="wind2" data-unless="taut" d="M300 404q50 22 100 16t100-16" fill="none" stroke="#5b3320" stroke-width="7" stroke-linecap="round"/>
        <path data-if="taut" d="M300 404h200" fill="none" stroke="#5b3320" stroke-width="7" stroke-linecap="round"/></g>`;
    s += H('well', '带仓', well, [150, 196, 500, 290], { key: true, mx: 640, my: 206 });
    // 铅笔（卷带时出现）
    s += `<g data-if="hasPencil" data-unless="taut" pointer-events="none" filter="url(#shs)"><g data-if="tapeIn" transform="rotate(-52 310 325)"><rect x="300" y="317" width="190" height="16" fill="${C.mustard}"/><rect x="300" y="317" width="190" height="5" fill="#dcb45c"/><rect x="484" y="317" width="18" height="16" rx="4" fill="${C.pink}"/></g></g>`;
    // 计数器 + 指示灯
    s += `<rect x="700" y="204" width="170" height="64" rx="6" fill="#15161b"/><text id="deck-count" x="785" y="250" text-anchor="middle" class="t-mono" font-size="40" fill="${C.tealL}">000</text>
      <text x="785" y="296" text-anchor="middle" class="t-serif" font-size="17" fill="${C.grey}">计 数</text>`;
    const lampArt = `<circle cx="785" cy="372" r="22" fill="#5b3a36"/><g data-if="power"><circle cx="785" cy="372" r="40" fill="#ff7a5a" opacity=".5" filter="url(#glow)"/><circle cx="785" cy="372" r="22" fill="#ff8a66"/></g>
      <text x="785" y="430" text-anchor="middle" class="t-serif" font-size="17" fill="${C.grey}">电 源</text>`;
    s += H('lamp', '电源指示灯', lampArt, [730, 330, 110, 112], { mx: 836, my: 338 });
    // 按键
    const key = (x, icon) => `<rect x="${x}" y="496" width="104" height="72" rx="8" fill="${C.cream}"/><rect x="${x}" y="552" width="104" height="16" rx="8" fill="${C.paper}"/>${icon}`;
    s += `<g filter="url(#shs)">${key(160, `<path d="M222 520l-18 12 18 12zM204 520l-18 12 18 12z" fill="${C.ink}"/>`)}${key(398, `<rect x="436" y="518" width="28" height="28" fill="${C.ink}"/>`)}${key(517, `<path d="M569 546h-28l14-18zM541 550h28v5h-28z" fill="${C.ink}"/>`)}</g>`;
    s += H('play', '播放键', `<g filter="url(#shs)">${key(279, `<path d="M320 516l28 16-28 16z" fill="${C.red}"/>`)}</g>`, [272, 488, 118, 88], { key: true, mx: 384, my: 494 });
    return svg(1000, 720, s + frame(1000, 720), 'close-svg');
  }

  /* ---------- 特写：收音机与维修标签 ---------- */
  function radioClose() {
    let s = `<rect width="1000" height="720" fill="url(#wallg)"/><rect width="1000" height="720" fill="url(#dots)"/>
      <rect x="0" y="560" width="1000" height="160" fill="${C.woodD}"/><rect x="0" y="560" width="1000" height="14" fill="${C.wood}"/>`;
    const radio = `<g filter="url(#sh)">${U('it-radio', 40, 150, 620, 403)}</g>
      <g fill="#e9e3d6" opacity=".2"><circle cx="150" cy="250" r="6"/><circle cx="330" cy="236" r="4"/><circle cx="560" cy="420" r="5"/><circle cx="250" cy="500" r="5"/><circle cx="470" cy="244" r="4"/></g>`;
    s += H('dust', '收音机', radio, [50, 196, 600, 366], { mx: 76, my: 222 });
    s += `<path d="M560 420L700 360" stroke="${C.gold}" stroke-width="2" stroke-dasharray="6 6"/>`;
    const label = `<g filter="url(#sh)" transform="rotate(2 820 360)"><rect x="680" y="110" width="280" height="480" rx="6" fill="${C.cream}"/><rect x="680" y="110" width="280" height="60" rx="6" fill="${C.paper}"/>
      <circle cx="820" cy="128" r="7" fill="${C.wallD}"/>
      <text x="820" y="158" text-anchor="middle" class="t-serif" font-size="26" font-weight="700" fill="${C.woodD}">维 修 记 录</text>
      <g class="t-hand" font-size="32" fill="${C.ink}"><text x="704" y="222">3.02　修。</text><text x="704" y="286">4.17　修。</text><text x="704" y="350">5.29　修。</text></g>
      <g stroke="${C.paper}" stroke-width="2"><path d="M700 240h240M700 304h240M700 368h240M700 444h240"/></g>
      <text x="704" y="424" class="t-hand" font-size="27" fill="${C.ink}">试听留在 R-17</text>
      <text x="704" y="500" class="t-serif" font-size="20" fill="${C.woodD}">维修人</text>
      <text x="704" y="552" class="t-hand" font-size="44" fill="${C.ink}">林</text>
      <path d="M760 514c40-10 110 0 170 4l-4 40c-60 6-120 2-168-2z" fill="#b9ab8c" opacity=".85"/><path d="M770 530h150M778 544h120" stroke="#a09272" stroke-width="5" stroke-linecap="round" opacity=".7"/></g>`;
    s += H('label', '维修标签', label, [676, 104, 290, 494], { key: true, mx: 958, my: 116 });
    return svg(1000, 720, s + frame(1000, 720), 'close-svg');
  }

  /* ---------- 特写：海报 ---------- */
  function posterClose() {
    let s = `<rect width="1000" height="720" fill="url(#wallg)"/><rect width="1000" height="720" fill="url(#dots)"/>`;
    s += `<g filter="url(#sh)"><rect x="210" y="40" width="580" height="640" fill="${C.cream}"/></g>
      <rect x="236" y="66" width="528" height="452" fill="#232c3d"/><rect x="236" y="66" width="528" height="452" fill="url(#dotsL)"/>
      <text x="262" y="104" class="t-serif" font-size="20" fill="${C.gold}" letter-spacing="4">话剧社 · 春季公演</text>`;
    s += H('pstar', '海报上的星', star(650, 190, 74, C.gold), [576, 116, 148, 148], { mx: 716, my: 126 });
    s += `<path d="M360 518c-18-170 30-280 96-318 70 26 120 150 110 318z" fill="${C.red}"/>
      <path d="M430 518c-6-120 6-200 30-250 30 40 44 140 40 250z" fill="${C.redD}"/>
      <circle cx="458" cy="176" r="48" fill="${C.skin}"/><path d="M412 166c0-66 92-66 92-4-28-20-62-20-92 4z" fill="#b8643a"/>
      <path d="M438 182q8 6 16 0M468 182q8 6 16 0" fill="none" stroke="${C.ink}" stroke-width="3" stroke-linecap="round"/>
      <path d="M392 262l-70 96 24 16 66-70z" fill="${C.red}"/>`;
    const clasp = `<circle cx="398" cy="262" r="34" fill="${C.ink}"/><circle cx="398" cy="262" r="34" fill="none" stroke="#3b3c46" stroke-width="5"/>${star(398, 262, 23, C.brass)}<circle cx="392" cy="262" r="3.6" fill="#0d0e12"/><circle cx="404" cy="262" r="3.6" fill="#0d0e12"/>`;
    s += H('clasp', '主角肩上的扣子', clasp, [352, 216, 92, 92], { key: true, mx: 438, my: 222 });
    const credits = `<text x="500" y="578" text-anchor="middle" class="t-display" font-size="52" fill="${C.woodD}">借 星 的 人</text>
      <path d="M262 600h476" stroke="${C.woodD}" stroke-width="2"/>
      <text x="500" y="634" text-anchor="middle" class="t-serif" font-size="21" fill="${C.ink}">主演　胡黎　　导演　陈望　　灯光　许知夏</text>
      <text x="500" y="662" text-anchor="middle" class="t-serif" font-size="17" fill="${C.woodD}">旧礼堂 · 每晚七点半</text>`;
    s += H('credits', '海报下方的名单', credits, [246, 532, 508, 140], { mx: 748, my: 544 });
    return svg(1000, 720, s + frame(1000, 720), 'close-svg');
  }

  /* ---------- 特写：戏服架 ---------- */
  function rackClose() {
    let s = `<rect width="1000" height="720" fill="url(#wallg)"/><rect width="1000" height="720" fill="url(#dots)"/>`;
    s += `<g filter="url(#sh)"><rect x="40" y="86" width="920" height="16" rx="8" fill="${C.brass}"/></g>`;
    const cos = [[C.grey, '侍卫 甲'], [C.grey, '侍卫 乙'], [C.olive, '学者'], [C.pink, '卖花人']];
    cos.forEach(([c, name], i) => {
      const cx = 150 + i * 180;
      const art = `<g filter="url(#sh)"><path d="M${cx} 100v26" stroke="${C.brass}" stroke-width="6"/><path d="M${cx - 62} 166l62-40 62 40z" fill="none" stroke="${C.woodL}" stroke-width="10" stroke-linejoin="round"/>
        <path d="M${cx - 66} 166h132l14 470h-160z" fill="${c}"/><path d="M${cx - 66} 166l-20 250 30 6 10-180z" fill="${c}"/><path d="M${cx + 66} 166l20 250-30 6-10-180z" fill="${c}"/>
        <path d="M${cx - 56} 178l40 4-8 250-58 18z" fill="${C.redD}"/><path d="M${cx - 80} 636h160" stroke="${C.gold}" stroke-width="7"/>
        <circle cx="${cx - 38}" cy="196" r="20" fill="${C.ink}"/><circle cx="${cx - 38}" cy="196" r="20" fill="none" stroke="#3b3c46" stroke-width="3"/>${star(cx - 38, 196, 13.5, C.brass)}
        <rect x="${cx + 4}" y="560" width="58" height="26" rx="3" fill="${C.cream}"/><text x="${cx + 33}" y="579" text-anchor="middle" class="t-serif" font-size="14" fill="${C.woodD}">${name}</text></g>
        <g data-if="c${i + 1}"><circle cx="${cx - 38}" cy="196" r="29" fill="none" stroke="${C.gold}" stroke-width="3"/><path d="M${cx - 8} 180l8 9 15-18" fill="none" stroke="${C.gold}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></g>`;
      s += H('c' + (i + 1), name + '的戏服', art, [cx - 86, 110, 172, 540], { mx: cx + 70, my: 130 });
    });
    const empty = `<g filter="url(#sh)"><path d="M870 100v26" stroke="${C.brass}" stroke-width="6"/><path d="M808 166l62-40 62 40z" fill="none" stroke="${C.woodL}" stroke-width="10" stroke-linejoin="round"/>
      <path d="M870 166v60" stroke="${C.cream}" stroke-width="3"/>
      <g transform="rotate(-5 870 290)"><rect x="786" y="226" width="168" height="130" rx="6" fill="${C.cream}"/><circle cx="870" cy="242" r="6" fill="${C.wallD}"/>
        <text x="870" y="296" text-anchor="middle" class="t-serif" font-size="34" font-weight="700" fill="${C.woodD}">主角服</text>
        <text x="870" y="336" text-anchor="middle" class="t-hand" font-size="30" fill="${C.redD}">在后台</text></g></g>`;
    s += H('tag', '空衣架上的挂牌', empty, [780, 110, 180, 260], { key: true, mx: 954, my: 130 });
    return svg(1000, 720, s + frame(1000, 720), 'close-svg');
  }

  /* ---------- 人物 ---------- */
  const face = (cx, cy, smile) => `<path d="M${cx - 30} ${cy}q9 7 18 0M${cx + 12} ${cy}q9 7 18 0" fill="none" stroke="${C.ink}" stroke-width="4" stroke-linecap="round"/>
    <path d="M${cx - 10} ${cy + 34}q10 ${smile} 20 0" fill="none" stroke="#8a4a3c" stroke-width="4" stroke-linecap="round"/>`;
  function lead() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 520" class="portrait-svg"><g filter="url(#sh)">
      <path d="M40 520c0-150 60-210 160-210s160 60 160 210z" fill="${C.olive}"/>
      <path d="M160 312l40 70 40-70z" fill="${C.cream}"/><path d="M178 318l22 150 22-150" fill="none" stroke="${C.red}" stroke-width="5"/>
      <rect x="176" y="440" width="48" height="60" rx="5" fill="${C.cream}"/><rect x="186" y="452" width="28" height="22" fill="${C.grey}"/>
      <rect x="172" y="250" width="56" height="74" rx="20" fill="${C.skinD}"/>
      <ellipse cx="200" cy="190" rx="84" ry="96" fill="${C.skin}"/>
      <path d="M112 196c-14-110 60-146 100-136 62 6 96 54 78 130-10-52-48-74-96-70-44 2-70 30-82 76z" fill="${C.ink}"/>
      ${face(200, 196, 2)}
      <path d="M160 178h28M214 178h28" stroke="${C.ink}" stroke-width="4" stroke-linecap="round"/>
      <g transform="rotate(8 310 420)"><rect x="250" y="340" width="130" height="170" rx="6" fill="${C.woodL}"/><rect x="262" y="360" width="106" height="140" fill="${C.cream}"/><rect x="290" y="330" width="50" height="22" rx="4" fill="${C.grey}"/>
      <path d="M274 386h80M274 408h80M274 430h60M274 452h74" stroke="${C.grey}" stroke-width="4"/></g></g></svg>`;
  }
  function mate() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 520" class="portrait-svg"><g filter="url(#sh)">
      <path d="M96 330c-30-150 10-250 104-250s134 100 104 250z" fill="#5a3a2a"/>
      <path d="M50 520c0-140 56-200 150-200s150 60 150 200z" fill="${C.mustard}"/>
      <path d="M150 326q50 40 100 0l-8 26q-42 26-84 0z" fill="#b08430"/>
      <rect x="174" y="262" width="52" height="70" rx="20" fill="${C.skinD}"/>
      <ellipse cx="200" cy="200" rx="80" ry="92" fill="${C.skin}"/>
      <path d="M118 210c-16-100 40-140 82-136 60 0 100 50 82 136-8-50-22-76-52-90-34 30-84 34-112 90z" fill="#5a3a2a"/>
      ${face(200, 212, 8)}
      <circle cx="150" cy="234" r="12" fill="${C.pink}" opacity=".55"/><circle cx="250" cy="234" r="12" fill="${C.pink}" opacity=".55"/>
      <g transform="rotate(-10 120 430)"><rect x="92" y="372" width="62" height="112" rx="9" fill="${C.ink}"/><rect x="99" y="382" width="48" height="84" rx="3" fill="${C.tealL}"/></g>
      <ellipse cx="128" cy="470" rx="30" ry="20" fill="${C.skin}"/></g></svg>`;
  }

  /* ---------- 后两间的人物 ---------- */
  const bustWrap = (inner, a) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 520" ${a || 'class="portrait-svg"'}><g filter="url(#sh)">${inner}</g></svg>`;
  const foxIn = `<path d="M262 128c84 6 104 104 70 196-8-70-34-108-78-128z" fill="#b8643a"/>
      <path d="M50 520c0-140 56-200 150-200s150 60 150 200z" fill="#3f5b4f"/>
      <path d="M156 322l44 74 44-74z" fill="${C.cream}"/><path d="M150 324l50 90 50-90" fill="none" stroke="#2f463c" stroke-width="10"/>
      <rect x="174" y="262" width="52" height="70" rx="20" fill="${C.skinD}"/>
      <ellipse cx="200" cy="200" rx="80" ry="92" fill="${C.skin}"/>
      <path d="M118 208c-14-106 44-142 86-138 60 0 98 50 80 134-12-56-40-86-80-94-30 28-66 46-86 98z" fill="#b8643a"/>
      <circle cx="268" cy="118" r="13" fill="${C.red}"/>
      ${face(200, 212, 5)}<circle cx="150" cy="236" r="11" fill="${C.pink}" opacity=".5"/><circle cx="250" cy="236" r="11" fill="${C.pink}" opacity=".5"/>`;
  const zhouIn = `<path d="M44 520c0-146 60-204 156-204s156 58 156 204z" fill="${C.grey}"/>
      <path d="M150 318l10 40h80l10-40" fill="none" stroke="${C.cream}" stroke-width="12"/><path d="M128 356h144l22 164H106z" fill="${C.cream}"/>
      <rect x="170" y="420" width="60" height="44" rx="4" fill="none" stroke="${C.paper}" stroke-width="5"/>
      <rect x="172" y="256" width="56" height="74" rx="20" fill="${C.skinD}"/>
      <ellipse cx="200" cy="192" rx="84" ry="94" fill="${C.skin}"/>
      <path d="M114 190c-10-102 60-132 96-128 58 4 94 52 76 126-14-42-44-66-88-64-40 2-66 22-84 66z" fill="#3a3530"/>
      <g fill="none" stroke="${C.ink}" stroke-width="5"><circle cx="168" cy="200" r="24"/><circle cx="232" cy="200" r="24"/><path d="M192 200h16M144 198l-28-8M256 198l28-8"/></g>
      ${face(200, 200, 3)}`;
  const linIn = `<ellipse cx="200" cy="318" rx="118" ry="52" fill="#4d626d"/>
      <path d="M40 520c0-150 62-206 160-206s160 56 160 206z" fill="#5d7480"/>
      <path d="M176 330v70M224 330v70" stroke="${C.cream}" stroke-width="5" stroke-linecap="round"/>
      <rect x="172" y="258" width="56" height="74" rx="20" fill="${C.skinD}"/>
      <ellipse cx="200" cy="194" rx="82" ry="92" fill="${C.skin}"/>
      <path d="M112 200c-22-70 6-128 50-128 10-20 44-22 58-6 46-12 92 30 74 124-10-40-30-62-60-70-20 14-42 10-58 0-30 12-52 40-64 80z" fill="${C.ink}"/>
      ${face(200, 204, 7)}
      <path d="M292 452l44-10 6 30-44 12z" fill="#a8845a" opacity=".9"/>`;
  const fox = (a) => bustWrap(foxIn, a), zhou = (a) => bustWrap(zhouIn, a), lin = (a) => bustWrap(linIn, a);
  const starBtn = (cx, cy, r, bright) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${C.ink}"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#3b3c46" stroke-width="${Math.max(2, r * 0.13)}"/>${star(cx, cy, r * 0.68, bright ? '#f2d98d' : C.brass)}<circle cx="${cx - r * 0.17}" cy="${cy}" r="${r * 0.1}" fill="#0d0e12"/><circle cx="${cx + r * 0.17}" cy="${cy}" r="${r * 0.1}" fill="#0d0e12"/>`;

  /* ---------- 场景四：后台 ---------- */
  function backstage() {
    let s = wall(1600, 900, 800);
    s += plate(110, 44, 200, 54, '后 台', 26);
    // 化妆镜
    let mirror = `<g filter="url(#sh)"><rect x="110" y="150" width="440" height="330" rx="8" fill="${C.woodD}"/></g><rect x="134" y="174" width="392" height="282" fill="#6f8298"/><path d="M134 380l200-206h80L134 456z" fill="#fff" opacity=".1"/>`;
    for (let i = 0; i < 7; i++) mirror += `<circle cx="${152 + i * 59}" cy="162" r="10" fill="${i === 2 || i === 5 ? '#fff3c9' : C.gold}"/>`;
    for (let i = 0; i < 4; i++) mirror += `<circle cx="122" cy="${220 + i * 66}" r="10" fill="${C.gold}"/><circle cx="538" cy="${220 + i * 66}" r="10" fill="${C.gold}"/>`;
    s += H('mirror', '化妆镜', mirror, [112, 150, 436, 330], { mx: 544, my: 160 });
    s += `<g filter="url(#sh)"><rect x="80" y="540" width="520" height="30" fill="${C.woodL}"/><rect x="100" y="570" width="24" height="230" fill="${C.woodD}"/><rect x="556" y="570" width="24" height="230" fill="${C.woodD}"/><rect x="124" y="570" width="432" height="70" fill="${C.wood}"/></g>
      <g filter="url(#shs)"><rect x="420" y="486" width="26" height="54" rx="6" fill="${C.pink}"/><rect x="456" y="500" width="22" height="40" rx="5" fill="${C.tealL}"/><ellipse cx="520" cy="530" rx="34" ry="10" fill="${C.cream}"/></g>`;
    const sewing = `<g filter="url(#shs)"><rect x="170" y="486" width="170" height="54" rx="6" fill="${C.redD}"/><path d="M170 486l14-52h170l-14 52z" fill="${C.red}"/><path d="M210 486a34 26 0 0 1 68 0z" fill="${C.pink}"/>
      <g stroke="${C.cream}" stroke-width="3" stroke-linecap="round"><path d="M226 470l-10-26M246 462l2-30M262 470l14-22"/></g><circle cx="216" cy="444" r="4" fill="${C.gold}"/><circle cx="248" cy="432" r="4" fill="${C.teal}"/><circle cx="276" cy="448" r="4" fill="${C.cream}"/>
      <rect x="186" y="506" width="60" height="22" rx="2" fill="none" stroke="${C.gold}" stroke-width="2"/><rect x="262" y="506" width="60" height="22" rx="2" fill="none" stroke="${C.gold}" stroke-width="2"/></g>`;
    s += H('sewing', '针线盒', sewing, [162, 424, 198, 118], { mx: 356, my: 432 });
    // 学姐
    const foxArt = (window.Figures ? window.Figures.fox('x="650" y="170" width="262" height="656"') : fox('x="610" y="356" width="330" height="429"')) + `<g filter="url(#sh)"><rect x="590" y="680" width="230" height="120" fill="#a8845a"/><rect x="590" y="680" width="230" height="20" fill="#b99468"/><rect x="800" y="716" width="170" height="84" fill="#97764f"/>
      <rect x="640" y="722" width="110" height="46" rx="3" fill="${C.cream}"/><text x="695" y="756" text-anchor="middle" class="t-hand" font-size="30" fill="${C.ink}">胡黎</text></g>`;
    s += H('fox', '收拾东西的学姐', foxArt, [690, 190, 190, 500], { key: true, mx: 870, my: 204 });
    // 主角服
    const cos = `<g filter="url(#sh)"><rect x="1036" y="560" width="10" height="230" fill="${C.ink}"/><path d="M990 800l51-30 51 30z" fill="${C.ink}"/><rect x="1028" y="250" width="26" height="34" rx="8" fill="${C.woodL}"/>
      <path d="M960 290q81-26 162 0l16 280h-194z" fill="${C.cream}"/><path d="M960 290l-52 330 86 14 18-300z" fill="${C.red}"/><path d="M1122 290l52 330-86 14-18-300z" fill="${C.red}"/>
      <path d="M990 286q51 30 102 0" fill="none" stroke="${C.redD}" stroke-width="10"/>${starBtn(974, 302, 17, true)}${starBtn(1108, 302, 17)}</g>`;
    s += H('costume', '人台上的主角服', cos, [900, 244, 282, 560], { key: true, mx: 1176, my: 256 });
    // 合照墙
    let board = `<g filter="url(#sh)"><rect x="1220" y="140" width="310" height="300" rx="6" fill="${C.woodD}"/></g><rect x="1234" y="154" width="282" height="272" fill="#a8845a"/>`;
    [[1250, 166, -4], [1346, 172, 3], [1438, 164, -2], [1244, 266, 2], [1338, 274, -3], [1432, 268, 4], [1340, 356, 0]].forEach(([x, y, r], i) => {
      const h = i === 6 ? 58 : 84;
      board += `<g transform="rotate(${r} ${x + 34} ${y + 40})"><rect x="${x}" y="${y}" width="72" height="${h}" fill="${C.cream}"/><rect x="${x + 6}" y="${y + 6}" width="60" height="${h - 26}" fill="#232c3d"/><circle cx="${x + 36}" cy="${y + 26}" r="7" fill="${C.red}"/><circle cx="${x + 20}" cy="${y + 30}" r="5" fill="${C.skin}"/><circle cx="${x + 52}" cy="${y + 30}" r="5" fill="${C.skin}"/><circle cx="${x + 36}" cy="${y + 3}" r="4" fill="${C.gold}"/></g>`;
    });
    s += H('photos', '墙上的合照', board, [1222, 142, 306, 296], { key: true, mx: 1524, my: 152 });
    // 三脚架
    const tripod = `<g filter="url(#sh)"><path d="M1380 560l-70 240M1380 560l70 240M1380 560v240" stroke="${C.ink}" stroke-width="9" stroke-linecap="round"/><rect x="1330" y="496" width="100" height="68" rx="8" fill="${C.ink}"/><circle cx="1380" cy="530" r="22" fill="#3b3c46"/><circle cx="1380" cy="530" r="11" fill="${C.tealL}"/>
      <rect x="1420" y="470" width="54" height="46" fill="${C.mustard}" transform="rotate(8 1447 493)"/><text x="1447" y="500" text-anchor="middle" class="t-hand" font-size="20" fill="${C.ink}" transform="rotate(8 1447 493)">15 秒</text></g>`;
    s += H('tripod', '三脚架', tripod, [1300, 462, 190, 340], { mx: 1486, my: 470 });
    return svg(1600, 900, s + frame(1600, 900));
  }

  /* ---------- 特写：主角服的肩 ---------- */
  function costumeClose() {
    let s = `<rect width="1000" height="720" fill="url(#wallg)"/><rect width="1000" height="720" fill="url(#dots)"/>`;
    s += `<g filter="url(#sh)"><rect x="470" y="96" width="60" height="90" rx="18" fill="${C.woodL}"/><path d="M270 236q230-76 460 0l44 484H226z" fill="${C.cream}"/>
      <path d="M270 236l-120 484h220l40-420z" fill="${C.red}"/><path d="M730 236l120 484H630l-40-420z" fill="${C.red}"/>
      <path d="M340 222q160 86 320 0" fill="none" stroke="${C.redD}" stroke-width="22"/></g>
      <g stroke="${C.redD}" stroke-width="5" opacity=".5"><path d="M250 420l-60 300M330 440l-20 280M750 420l60 300M670 440l20 280"/></g>`;
    const collar = `<rect x="456" y="246" width="88" height="42" rx="4" fill="#f3ead6" stroke="${C.woodD}" stroke-width="2"/><text x="500" y="277" text-anchor="middle" class="t-hand" font-size="28" fill="${C.ink}">胡黎</text>`;
    s += H('collar', '领口的名字', collar, [440, 232, 120, 70], { mx: 556, my: 240 });
    s += H('newBtn', '左肩的纽扣', starBtn(330, 262, 40, true) + `<path d="M306 240q10-12 26-12" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".7"/>`, [284, 216, 92, 92], { mx: 372, my: 222 });
    s += H('oldBtn', '右肩的纽扣', starBtn(670, 262, 40), [624, 216, 92, 92], { mx: 712, my: 222 });
    const seam = `<path d="M262 330q40 22 96 10" fill="none" stroke="${C.redD}" stroke-width="5" stroke-dasharray="9 7"/>
      <path data-unless="seamMatched" d="M298 346l24-13 9 20z" fill="${C.ink}" stroke="${C.cream}" stroke-width="2"/><path d="M322 340q20 26 8 54" fill="none" stroke="${C.ink}" stroke-width="2.5"/>
      <g data-if="seamMatched">${U('it-button', 262, 312, 96, 96)}</g>`;
    s += H('seam', '左肩的衣缝', seam, [250, 316, 130, 96], { key: true, mx: 376, my: 322 });
    return svg(1000, 720, s + frame(1000, 720), 'close-svg');
  }

  /* ---------- 特写：合照墙 ---------- */
  function photosClose() {
    let s = `<rect width="1000" height="720" fill="url(#wallg)"/><rect width="1000" height="720" fill="url(#dots)"/>
      <g filter="url(#sh)"><rect x="50" y="50" width="900" height="620" rx="8" fill="${C.woodD}"/></g><rect x="70" y="70" width="860" height="580" fill="#a8845a"/><rect x="70" y="70" width="860" height="580" fill="url(#dots)"/>`;
    const cols = [C.grey, C.olive, C.pink, C.mustard, C.tealL, C.grey];
    const photo = (x, y, rot, n, hand) => {
      let p = `<g transform="rotate(${rot} ${x + 90} ${y + 110})" filter="url(#shs)"><rect x="${x}" y="${y}" width="180" height="${hand ? 214 : 220}" fill="${C.cream}"/><rect x="${x + 12}" y="${y + 12}" width="156" height="150" fill="#232c3d"/>`;
      const k = hand ? 3 : 5 + (n % 2);
      for (let i = 0; i < k; i++) { const px = x + 30 + i * (hand ? 30 : 126 / (k - 1)), py = y + 74 + ((i + n) % 2) * 10; if (!hand && i === Math.floor(k / 2)) continue; p += `<path d="M${px - 14} ${y + 162}q0-52 14-52t14 52z" fill="${cols[(i + n) % 6]}"/><circle cx="${px}" cy="${py + 26}" r="11" fill="${C.skin}"/>`; }
      const hx = hand ? x + 118 : x + 90;
      p += `<path d="M${hx - 22} ${y + 162}q0-70 22-70t22 70z" fill="${C.red}"/><circle cx="${hx}" cy="${y + 80}" r="13" fill="${C.skin}"/><path d="M${hx - 13} ${y + 76}q13-20 26 0-13-6-26 0z" fill="#b8643a"/>${starBtn(hx + 16, y + 104, 7)}`;
      if (hand) p += `<path d="M${x + 168} ${y + 128}l-22-16-10 4 2 12 26 14z" fill="${C.skin}"/><path d="M${x + 168} ${y + 122}h-12v26h12z" fill="#5d7480"/><path d="M${x + 138} ${y + 116}l-8-10" stroke="${C.cream}" stroke-width="2.5" stroke-linecap="round"/>`;
      p += `<path d="M${x + 30} ${y + 188}h${hand ? 80 : 120}" stroke="${C.woodD}" stroke-width="3" opacity=".5"/><circle cx="${x + 90}" cy="${y + 4}" r="7" fill="${n % 2 ? C.gold : C.red}"/></g>`;
      return p;
    };
    const tick = (f, x, y) => `<g data-if="${f}"><circle cx="${x}" cy="${y}" r="18" fill="${C.ink}"/><path d="M${x - 8} ${y}l6 7 11-14" fill="none" stroke="${C.gold}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></g>`;
    s += H('row1', '第一排的四张', photo(96, 92, -3, 0) + photo(302, 100, 2, 1) + photo(508, 90, -2, 2) + photo(716, 100, 3, 3) + tick('r1', 500, 330), [88, 84, 820, 250], { mx: 902, my: 96 });
    s += H('ph5', '第五张', photo(150, 388, 2, 4) + tick('ph5', 240, 630), [142, 380, 196, 240], { mx: 334, my: 392 });
    s += H('ph6', '第六张', photo(400, 396, -2, 5) + tick('ph6', 490, 636), [392, 388, 196, 240], { mx: 584, my: 400 });
    s += H('ph7', '第七张', photo(660, 390, 3, 6, true), [652, 382, 196, 236], { mx: 844, my: 394 });
    return svg(1000, 720, s + frame(1000, 720), 'close-svg');
  }

  /* ---------- 场景五：后厨 ---------- */
  function kitchen() {
    let s = wall(1600, 900, 800);
    s += plate(110, 44, 200, 54, '后 厨', 26) + lamp(760, 40) + `<ellipse cx="760" cy="200" rx="260" ry="150" fill="${C.gold}" opacity=".07"/>`;
    // 冰箱
    const fridge = `<g filter="url(#sh)"><rect x="110" y="230" width="250" height="570" rx="12" fill="#c9d8d3"/><path d="M110 430h250" stroke="#9fb3ad" stroke-width="6"/><rect x="326" y="290" width="12" height="90" rx="6" fill="#8fa29d"/><rect x="326" y="470" width="12" height="120" rx="6" fill="#8fa29d"/></g>
      <g filter="url(#shs)"><rect x="150" y="268" width="104" height="132" fill="${C.cream}" transform="rotate(-3 202 334)"/><g transform="rotate(-3 202 334)" stroke="${C.woodD}" stroke-width="3" opacity=".6"><path d="M164 296h76M164 316h76M164 336h60M164 364h44"/></g><circle cx="204" cy="272" r="9" fill="${C.red}"/>
      <rect x="272" y="330" width="40" height="40" fill="${C.mustard}" transform="rotate(6 292 350)"/><circle cx="170" cy="500" r="10" fill="${C.teal}"/></g>`;
    s += H('fridge', '冰箱', fridge, [112, 232, 246, 566], { key: true, mx: 352, my: 244 });
    // 墙上的菜谱
    const recipe = `<g filter="url(#shs)" transform="rotate(2 485 322)"><rect x="410" y="232" width="150" height="180" fill="${C.cream}"/><circle cx="485" cy="244" r="7" fill="${C.red}"/><g stroke="${C.ink}" stroke-width="3" opacity=".6" stroke-linecap="round"><path d="M426 276h110M426 298h96M426 320h110M426 342h80"/></g><path d="M426 388h64" stroke="${C.redD}" stroke-width="2" stroke-linecap="round"/><ellipse cx="532" cy="384" rx="18" ry="13" fill="${C.ochre}" opacity=".35"/></g>`;
    s += H('recipe', '墙上的菜谱', recipe, [402, 224, 168, 198], { mx: 566, my: 232 });
    // 老周
    s += H('zhou', '系围裙的人', window.Figures ? window.Figures.zhou('x="836" y="150" width="248" height="620"') : zhou('x="810" y="262" width="290" height="377"'), [870, 166, 180, 394], { key: true, mx: 1044, my: 180 });
    // 台面、灶、锅
    s += `<g filter="url(#sh)"><rect x="400" y="560" width="740" height="28" fill="${C.woodL}"/><rect x="420" y="588" width="700" height="212" fill="${C.wood}"/></g>
      <g fill="none" stroke="${C.woodD}" stroke-width="3" opacity=".5"><rect x="440" y="610" width="210" height="170" rx="4"/><rect x="664" y="610" width="210" height="170" rx="4"/><rect x="888" y="610" width="212" height="170" rx="4"/></g>`;
    const pot = `<g filter="url(#shs)"><rect x="540" y="536" width="240" height="26" rx="4" fill="${C.ink}"/><path d="M572 446h176l-8 92H580z" fill="${C.grey}"/><rect x="560" y="434" width="200" height="16" rx="8" fill="#9aa8ba"/><rect x="646" y="420" width="28" height="16" rx="6" fill="${C.ink}"/><rect x="544" y="468" width="30" height="12" rx="6" fill="${C.ink}"/><rect x="746" y="468" width="30" height="12" rx="6" fill="${C.ink}"/></g>
      <g fill="none" stroke="${C.cream}" stroke-width="5" stroke-linecap="round" opacity=".5" class="steam"><path d="M620 404q-16-22 0-44t0-44"/><path d="M660 396q-16-22 0-44t0-44"/><path d="M700 404q-16-22 0-44t0-44"/></g>`;
    s += H('pot', '灶上的锅', pot, [536, 300, 250, 264], { mx: 782, my: 430 });
    const bowl = (x, y, c) => `<path d="M${x - 34} ${y - 30}h68q0 30-34 30t-34-30z" fill="${C.cream}"/><path d="M${x - 34} ${y - 30}h68" stroke="${c || C.teal}" stroke-width="5"/>`;
    s += `<g data-if="tableSet" filter="url(#shs)">${bowl(450, 560, C.red)}${bowl(540, 560)}<path d="M436 520q-8-12 0-22M470 518q-8-12 0-22" fill="none" stroke="${C.cream}" stroke-width="3" stroke-linecap="round" opacity=".6"/></g>`;
    // 碗柜
    let cup = `<g filter="url(#sh)"><rect x="1190" y="160" width="340" height="480" rx="6" fill="${C.woodD}"/><rect x="1190" y="650" width="340" height="150" fill="${C.wood}"/></g><rect x="1208" y="178" width="304" height="444" fill="#2a3340"/>
      <g fill="${C.woodD}"><rect x="1208" y="310" width="304" height="12"/><rect x="1208" y="456" width="304" height="12"/></g>
      <g filter="url(#shs)"><rect x="1310" y="228" width="100" height="82" fill="#f3ead6"/><path d="M1360 228v82M1310 268h100" stroke="${C.red}" stroke-width="7"/></g>`;
    [[1260, 456], [1360, 456], [1460, 456], [1310, 622], [1410, 622]].forEach(([x, y]) => { cup += bowl(x, y); });
    cup += `<circle cx="1360" cy="724" r="8" fill="${C.brass}"/>`;
    s += H('cupboard', '碗柜', cup, [1192, 162, 336, 476], { key: true, mx: 1524, my: 172 });
    return svg(1600, 900, s + frame(1600, 900));
  }

  /* ---------- 特写：碗柜 ---------- */
  function cupboardClose() {
    let s = `<rect width="1000" height="720" fill="${C.woodD}"/><rect x="40" y="40" width="920" height="640" fill="#2a3340"/><rect width="1000" height="720" fill="url(#dots)"/>
      <g fill="${C.wood}"><rect x="40" y="236" width="920" height="18"/><rect x="40" y="456" width="920" height="18"/><rect x="40" y="662" width="920" height="18"/></g>`;
    const sealed = `<g filter="url(#sh)"><rect x="400" y="84" width="200" height="152" rx="4" fill="#f3ead6"/><path d="M500 84v152M400 160h200" stroke="${C.red}" stroke-width="12"/><path d="M500 160c-30-44-64-22-44 0-20 22 14 44 44 0zM500 160c30-44 64-22 44 0 20 22-14 44-44 0z" fill="${C.red}"/></g>`;
    s += H('sealed', '最上层没拆封的碗', sealed, [384, 70, 232, 170], { key: true, mx: 610, my: 82 });
    const names = ['狐狸', '老周', '阿澈', '陈望', '知夏'];
    [[220, 456], [500, 456], [780, 456], [360, 662], [640, 662]].forEach(([x, y], i) => {
      const f = 'b' + (i + 1);
      const art = `<g data-unless="${f}" filter="url(#shs)"><path d="M${x - 92} ${y - 86}h184q0 78-92 78t-92-78z" fill="${C.cream}"/><path d="M${x - 92} ${y - 86}h184" stroke="${C.teal}" stroke-width="10"/><rect x="${x - 30}" y="${y - 10}" width="60" height="10" fill="${C.paper}"/></g>
        <g data-if="${f}" filter="url(#shs)"><circle cx="${x}" cy="${y - 84}" r="80" fill="${C.cream}"/><circle cx="${x}" cy="${y - 84}" r="80" fill="none" stroke="${C.teal}" stroke-width="8"/><circle cx="${x}" cy="${y - 84}" r="46" fill="none" stroke="${C.paper}" stroke-width="7"/>
        <text x="${x}" y="${y - 70}" text-anchor="middle" class="t-hand" font-size="38" fill="${C.ink}">${names[i]}</text></g>`;
      s += H(f, `第 ${i + 1} 只碗`, art, [x - 100, y - 170, 200, 172], { mx: x + 92, my: y - 160 });
    });
    return svg(1000, 720, s + frame(1000, 720), 'close-svg');
  }

  /* ---------- 特写：冰箱门 ---------- */
  function fridgeClose() {
    let s = `<rect width="1000" height="720" fill="#c9d8d3"/><rect width="1000" height="720" fill="url(#dots)"/><rect x="900" y="120" width="30" height="480" rx="15" fill="#8fa29d"/>`;
    const slip = `<g filter="url(#sh)" transform="rotate(-2 440 370)"><rect x="240" y="90" width="400" height="560" fill="#f3ead6"/><circle cx="440" cy="104" r="16" fill="${C.red}"/>
      <text x="440" y="176" text-anchor="middle" class="t-serif" font-size="34" font-weight="700" fill="${C.woodD}">器 材 归 还 单</text><path d="M270 198h340" stroke="${C.woodD}" stroke-width="2"/>
      <g class="t-serif" font-size="25" fill="${C.ink}"><text x="276" y="248">追光灯</text><text x="560" y="248">2 台</text><text x="276" y="296">音箱</text><text x="560" y="296">1 只</text><text x="276" y="344">折叠椅</text><text x="548" y="344">12 把</text><text x="276" y="392">延长线</text><text x="560" y="392">3 卷</text></g>
      <path d="M270 420h340" stroke="${C.woodD}" stroke-width="2"/>
      <text x="276" y="474" class="t-serif" font-size="22" fill="${C.woodD}">归还日期</text><text x="400" y="478" class="t-hand" font-size="42" fill="${C.redD}">6.14</text>
      <text x="276" y="546" class="t-serif" font-size="22" fill="${C.woodD}">归还人</text><text x="400" y="552" class="t-hand" font-size="46" fill="${C.ink}">林拾</text>
      <circle cx="548" cy="560" r="46" fill="none" stroke="${C.red}" stroke-width="4" opacity=".7"/><text x="548" y="570" text-anchor="middle" class="t-serif" font-size="24" font-weight="700" fill="${C.red}" opacity=".7">已还清</text></g>`;
    s += H('slip', '发黄的归还单', slip, [232, 82, 420, 580], { key: true, mx: 646, my: 96 });
    const note = `<g filter="url(#shs)" transform="rotate(5 770 250)"><rect x="690" y="170" width="170" height="160" fill="${C.mustard}"/><text x="775" y="236" text-anchor="middle" class="t-hand" font-size="30" fill="${C.ink}">汤在锅里</text><text x="775" y="276" text-anchor="middle" class="t-hand" font-size="30" fill="${C.ink}">自己盛</text><text x="820" y="314" text-anchor="middle" class="t-hand" font-size="24" fill="${C.woodD}">周</text></g>`;
    s += H('note', '黄色便签', note, [684, 162, 184, 180], { mx: 862, my: 172 });
    return svg(1000, 720, s + frame(1000, 720), 'close-svg');
  }

  window.Art = {
    C, sprite,
    scenes: { blank, lockers, box, booth, props, backstage, kitchen },
    closeups: { deck: deckClose, radio: radioClose, poster: posterClose, rack: rackClose, costume: costumeClose, photos: photosClose, cupboard: cupboardClose, fridge: fridgeClose },
    portraits: window.Figures || { lead, mate, fox, zhou, lin },
    icon: (id, cls) => `<svg viewBox="0 0 120 120" class="${cls || 'icon'}" aria-hidden="true"><use href="#${id}"/></svg>`
  };
})();
