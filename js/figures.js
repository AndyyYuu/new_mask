/* 第十一号失主 · 人物全身立绘（400x1000，描边 + 赛璐璐暗部）。初稿，之后可以整体换成画师/生图的 PNG。 */
(function () {
// 全身立绘 400x1000：深色描边 + 一层赛璐璐暗部（光从左上来），头约占身高 1/8
const OL = '#2a1e24', SK = '#f1d3bd', SKS = '#dcae95', SKD = '#c48b74', LINE = '#4e3430';
const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
// 肢体：沿中线三个点 [x,y,宽]，输出底色 + 右侧暗部 + 描边
function limb(p, fill, shade, opt = {}) {
  const ed = p.map((q, i) => { const a = p[Math.max(0, i - 1)], b = p[Math.min(p.length - 1, i + 1)]; let dx = b[0] - a[0], dy = b[1] - a[1]; const l = Math.hypot(dx, dy); dx /= l; dy /= l; const nx = -dy, ny = dx; return [[q[0] - nx * q[2] / 2, q[1] - ny * q[2] / 2], [q[0] + nx * q[2] / 2, q[1] + ny * q[2] / 2]]; });
  // 让“左边”始终在画面左侧
  const L = ed.map((e) => e[0][0] <= e[1][0] ? e[0] : e[1]), R = ed.map((e) => e[0][0] <= e[1][0] ? e[1] : e[0]);
  const f = (a) => a.map((v) => v.toFixed(1)).join(' ');
  const base = `M${f(L[0])}Q${f(L[1])} ${f(L[2])}L${f(R[2])}Q${f(R[1])} ${f(R[0])}Z`;
  const t = opt.shadeT ?? 0.55, M = L.map((l, i) => lerp(l, R[i], t));
  const sh = `M${f(M[0])}Q${f(M[1])} ${f(M[2])}L${f(R[2])}Q${f(R[1])} ${f(R[0])}Z`;
  return `<path d="${base}" fill="${fill}" stroke="${OL}" stroke-width="2.6" stroke-linejoin="round"/><path d="${sh}" fill="${shade}"/>`;
}
const fist = (x, y, r = 0) => `<g transform="translate(${x} ${y}) rotate(${r})"><path d="M-11-12C-2-17 10-14 13-5C16 5 12 15 2 17C-8 18-15 10-15 0C-15-6-14-10-11-12Z" fill="${SK}" stroke="${OL}" stroke-width="2.4"/><path d="M2-2C8 0 10 6 8 12" fill="none" stroke="${SKD}" stroke-width="2" stroke-linecap="round"/><path d="M4 12C8 10 12 6 13 0" fill="none" stroke="${SKS}" stroke-width="4"/></g>`;
const shoeM = (x, y, c, cs, dir = 1) => dir === 1 ? shoe(x, y, c, cs, 1) : `<g transform="translate(${2 * x} 0) scale(-1 1)">${shoe(x, y, c, cs, 1)}</g>`;
const pocket = (x, y) => `<path d="M${x - 16} ${y}q16 6 32 0" fill="none" stroke="${OL}" stroke-width="2.4" stroke-linecap="round"/>`;
const shoe = (x, y, c, cs, dir = 1) => `<path d="M${x - 20} ${y - 16}C${x - 24} ${y + 4} ${x - 22} ${y + 18} ${x - 6} ${y + 22}C${x + dir * 20} ${y + 26} ${x + dir * 44} ${y + 22} ${x + dir * 44} ${y + 10}C${x + dir * 42} ${y} ${x + dir * 26} ${y - 6} ${x + 18} ${y - 16}Z" fill="${c}" stroke="${OL}" stroke-width="2.6" stroke-linejoin="round"/><path d="M${x - 18} ${y + 10}C${x} ${y + 20} ${x + dir * 26} ${y + 20} ${x + dir * 32} ${y + 10}" fill="none" stroke="${cs}" stroke-width="5"/>`;

// 头：沿用半身像的五官与发型坐标（600x800 画布），缩放 0.5 放到 (200,120)
const FACE = 'M216 226C214 286 242 334 300 352C358 334 386 286 384 226C384 160 346 128 300 128C254 128 216 160 216 226Z';
const headBase = (id) => `
  <path d="M272 300h56v140h-56z" fill="${SK}" stroke="${OL}" stroke-width="5"/><path d="M272 300h56v60q-28 22-56 0z" fill="${SKS}"/>
  <path d="M378 250c20-10 30 6 24 26s-18 24-28 20z" fill="${SK}" stroke="${OL}" stroke-width="5"/>
  <path d="${FACE}" fill="${SK}" stroke="${OL}" stroke-width="5"/>
  <path d="M330 340C360 326 382 290 384 240C376 290 356 322 324 342z" fill="${SKS}"/>
  <ellipse cx="254" cy="300" rx="26" ry="12" fill="#e89a8e" opacity=".5"/><ellipse cx="348" cy="300" rx="26" ry="12" fill="#e89a8e" opacity=".5"/>
  <path d="M302 288l-6 16 8 2" fill="none" stroke="${SKD}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`;
const eyesOpen = (iris, stern) => `<path d="M236 270q24-22 50-4q-24 14-50 4z" fill="#fff"/><circle cx="262" cy="268" r="11" fill="${iris}"/><circle cx="262" cy="268" r="5.5" fill="${OL}"/><circle cx="266" cy="263" r="3.4" fill="#fff"/>
  <path d="M316 266q26-18 50 4q-26 10-50-4z" fill="#fff"/><circle cx="340" cy="268" r="11" fill="${iris}"/><circle cx="340" cy="268" r="5.5" fill="${OL}"/><circle cx="344" cy="263" r="3.4" fill="#fff"/>
  <g fill="none" stroke="${LINE}" stroke-linecap="round"><path d="M232 ${stern ? 266 : 271}q28-28 56-6" stroke-width="6"/><path d="M314 265q28-${stern ? 18 : 22} 56 ${stern ? 2 : 6}" stroke-width="6"/></g>`;
const eyesClosed = `<g fill="none" stroke="${LINE}" stroke-linecap="round" stroke-width="6"><path d="M238 270q22-16 46-2"/><path d="M318 268q24-14 46 2"/></g>`;
const brows = (lift, c, stern) => `<g fill="none" stroke="${c}" stroke-width="5" stroke-linecap="round"><path d="M238 ${(stern ? 248 : 244) - lift}q20-${stern ? 4 : 10} 44 ${stern ? 4 : -4}"/><path d="M320 ${(stern ? 244 : 240) - lift}q22-${stern ? 8 : 6} 44 ${stern ? 0 : 4}"/></g>`;
const smile = `<path d="M282 320q18 18 38 0q-18 5-38 0z" fill="#8a3c3c" stroke="${OL}" stroke-width="2"/>`;
const soft = `<path d="M286 324q14 8 28 0" fill="none" stroke="#8a3c3c" stroke-width="5" stroke-linecap="round"/>`;
const flat = `<path d="M288 326h24" stroke="#8a3c3c" stroke-width="5" stroke-linecap="round"/>`;
const head = (back, front, feats, hairOutline = true) => `<g transform="translate(50 18) scale(.5)">${back}${headBase()}${feats}${front}</g>`;
const hairPath = (d, fill) => `<path d="${d}" fill="${fill}" stroke="${OL}" stroke-width="5" stroke-linejoin="round"/>`;

const wrap = (inner, a) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 1000" ${a || 'class="portrait-svg"'}><defs>
  <filter id="fsh" x="-30%" y="-5%" width="160%" height="115%"><feOffset in="SourceAlpha" dx="-12" dy="10" result="o"/><feFlood flood-color="#141a26" flood-opacity=".4"/><feComposite in2="o" operator="in" result="s"/><feMerge><feMergeNode in="s"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  <filter id="fgr" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" seed="5" result="t"/><feColorMatrix in="t" type="matrix" values="0 0 0 0 .12 0 0 0 0 .1 0 0 0 0 .12 2.6 0 0 0 -1.5" result="d"/><feComponentTransfer in="d" result="d2"><feFuncA type="linear" slope=".35"/></feComponentTransfer><feComposite in="d2" in2="SourceAlpha" operator="in" result="g"/><feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="g"/></feMerge></filter>
  </defs><g filter="url(#fsh)"><g filter="url(#fgr)"><g transform="translate(0 -16)">${inner}</g></g></g></svg>`;

// 腿和鞋（男/女通用）
const legs = (c, cs, shoeC, shoeS, o = {}) => {
  const lx = o.lx ?? 178, rx = o.rx ?? 224, top = o.top ?? 466;
  return `${limb([[lx, top, 54], [lx - 2, 700, 42], [lx - 4, 928, 32]], c, cs)}${limb([[rx, top, 54], [rx + 8, 700, 42], [rx + 20, 926, 32]], c, cs)}
    <path d="M${lx - 24} ${top - 8}L${rx + 24} ${top - 8}L${rx + 22} ${top + 40}L200 ${top + 70}L${lx - 22} ${top + 40}Z" fill="${c}" stroke="${OL}" stroke-width="2.6" stroke-linejoin="round"/>
    <path d="M200 ${top + 10}L200 ${top + 70}" stroke="${OL}" stroke-width="2.2"/><path d="M${rx} ${top}L${rx + 22} ${top + 40}L200 ${top + 70}" fill="${cs}" opacity=".7"/>
    <path d="M${lx - 6} 690q8 6 16 2M${rx + 2} 690q8 6 16 2" fill="none" stroke="${cs}" stroke-width="3" stroke-linecap="round"/>
    ${shoeM(lx - 4, 936, shoeC, shoeS, -1)}${shoeM(rx + 20, 934, shoeC, shoeS, 1)}`;
};
// 躯干：肩宽、腰宽、下摆
const torso = (c, cs, o = {}) => {
  const sl = o.sl ?? 134, sr = o.sr ?? 266, wl = o.wl ?? 148, wr = o.wr ?? 252, hem = o.hem ?? 470, top = o.top ?? 206;
  return `<path d="M${sl} ${top + 6}C${sl - 6} ${top + 60} ${wl - 6} ${hem - 160} ${wl} ${hem}L${wr} ${hem}C${wr + 6} ${hem - 160} ${sr + 6} ${top + 60} ${sr} ${top + 6}Q200 ${top - 18} ${sl} ${top + 6}Z" fill="${c}" stroke="${OL}" stroke-width="2.6" stroke-linejoin="round"/>
    <path d="M222 ${top}C${wr - 20} ${top + 120} ${wr - 10} ${hem - 120} ${wr - 14} ${hem}L${wr} ${hem}C${wr + 6} ${hem - 160} ${sr + 6} ${top + 60} ${sr} ${top + 6}Z" fill="${cs}"/>`;
};

/* 林拾：工作衬衫敞开、白T、软尺挂脖子、牛仔裤、帆布鞋；一手插兜，一手拎着针线 */
function lin(a) {
  const sh = '#7d97a3', shS = '#5f7884', tee = '#ece3cf', teeS = '#cdbfa3', jean = '#3f4b66', jeanS = '#2d374d';
  return wrap(`
  ${legs(jean, jeanS, '#e9e0cc', '#5e9ea6')}
  ${torso(tee, teeS, { hem: 476 })}
  <path d="M134 212C128 270 140 380 146 486L192 486C186 380 190 270 200 220L176 200Z" fill="${sh}" stroke="${OL}" stroke-width="2.6" stroke-linejoin="round"/>
  <path d="M266 212C272 270 260 380 254 486L208 486C214 380 210 270 200 220L224 200Z" fill="${sh}" stroke="${OL}" stroke-width="2.6" stroke-linejoin="round"/>
  <path d="M226 206C238 300 244 400 240 486L254 486C260 380 272 270 266 212Z" fill="${shS}"/>
  <path d="M176 200l-20 40 30 14 14-34zM224 200l20 40-30 14-14-34z" fill="${sh}" stroke="${OL}" stroke-width="2.4" stroke-linejoin="round"/>
  <path d="M184 206c-10 60-14 160-10 280h12c-4-120 0-220 10-276zM216 206c10 60 14 160 10 280h-12c4-120 0-220-10-276z" fill="#e3b54e" stroke="${OL}" stroke-width="1.8"/>
  <g stroke="#9c7428" stroke-width="1.6"><path d="M178 250h8M176 290h8M175 330h8M175 370h8M175 410h8M175 450h8M214 250h8M216 290h8M217 330h8M217 370h8M217 410h8M217 450h8"/></g>
  ${limb([[140, 222, 42], [120, 340, 34], [148, 458, 28]], sh, shS)}${pocket(150, 470)}
  ${limb([[260, 222, 42], [276, 334, 34], [268, 420, 26]], sh, shS)}
  <path d="M258 404l20 0 2 22-24 2z" fill="${shS}" stroke="${OL}" stroke-width="2.2"/>
  ${fist(268, 446, 10)}<path d="M276 440l40-52" stroke="#d3d6de" stroke-width="2.4" stroke-linecap="round"/><path d="M316 388c14 4 10 30 -4 40s-4 40 16 44" fill="none" stroke="#a4453d" stroke-width="1.8"/>
  ${head(hairPath('M198 240c-16-110 52-150 108-150 70 0 118 46 98 156l-14 70c-4-60-24-96-40-110z', '#1f1b23'),
    hairPath('M206 250c-12-90 34-142 98-144 70-2 110 46 100 128-6-24-16-40-26-50 2 22-2 40-8 52-6-26-18-44-30-54-2 26-12 44-24 54 0-26-8-44-18-56-10 24-26 40-44 50 6-20 6-36 2-48-16 18-34 32-50 68z', '#2f2a33') +
    hairPath('M212 236c-4 40 4 70 18 92-2-30 4-56 14-76z', '#2f2a33') + hairPath('M388 234c6 40-2 70-16 92 2-30-4-56-14-76z', '#2f2a33') + hairPath('M300 106c10-24 30-34 52-30-18 6-30 18-36 34z', '#2f2a33') +
    `<g fill="none" stroke="#5a5468" stroke-width="6" stroke-linecap="round"><path d="M250 150q30-20 64-18"/><path d="M338 150q20 4 34 20"/></g>`,
    eyesClosed + brows(2, '#3b2f33') + smile)}`, a);
}

/* 胡黎：短夹克、高领、长裤、短靴；一手叉腰，一手插兜，橙色高马尾 */
function fox(a) {
  const jk = '#4c6b5c', jkS = '#38513f', knit = '#eadfc8', knitS = '#cfc0a2', pant = '#2e2b33', pantS = '#1f1d24';
  return wrap(`<g transform="translate(200 0) scale(.92 1) translate(-200 0)">
  ${legs(pant, pantS, '#7a4b30', '#4a2d20', { lx: 182, rx: 220 })}
  ${torso(knit, knitS, { wl: 154, wr: 246, hem: 470 })}
  <path d="M180 200q20 16 40 0l4 22q-24 14-48 0z" fill="${knit}" stroke="${OL}" stroke-width="2.4"/>
  <path d="M134 212C128 270 138 360 146 420L188 420C184 340 186 260 196 222L174 204Z" fill="${jk}" stroke="${OL}" stroke-width="2.6" stroke-linejoin="round"/>
  <path d="M266 212C272 270 262 360 254 420L212 420C216 340 214 260 204 222L226 204Z" fill="${jk}" stroke="${OL}" stroke-width="2.6" stroke-linejoin="round"/>
  <path d="M224 210C238 290 246 360 242 420L254 420C262 360 272 270 266 212Z" fill="${jkS}"/>
  <path d="M146 414h42v14h-42zM212 414h42v14h-42z" fill="${jkS}" stroke="${OL}" stroke-width="2.2"/>
  <circle cx="238" cy="270" r="7" fill="#1f2328" stroke="${OL}" stroke-width="1.6"/><path d="M238 264l1.6 4.4 4.4 1.6-4.4 1.6-1.6 4.4-1.6-4.4-4.4-1.6 4.4-1.6z" fill="#e6d3a1"/>
  ${limb([[140, 222, 42], [120, 340, 34], [150, 458, 28]], jk, jkS)}${pocket(152, 470)}
  ${limb([[262, 222, 42], [306, 318, 34], [264, 420, 28]], jk, jkS)}${fist(258, 428, -60)}
  </g>
  ${head(hairPath('M352 120c90-20 150 60 132 180-8 60-30 110-60 150 10-70 4-130-26-180-14-24-30-40-50-50z', '#8e3f24') + hairPath('M362 126c74-6 118 60 104 160-6 44-20 80-40 108 4-60-2-110-26-150-12-20-26-34-42-42z', '#c0623a') +
      hairPath('M206 250c-12-100 40-150 100-150 66 0 104 48 96 138l-16 50c0-50-20-90-40-100z', '#8e3f24'),
    hairPath('M212 260c-14-100 30-150 96-152 64-2 104 40 98 118-30-48-80-74-150-64 18 10 30 22 36 36-30-6-56 4-80 62z', '#c0623a') + hairPath('M214 262c-4 50 6 90 22 116-2-40 2-76 12-104z', '#c0623a') + hairPath('M394 230c10 50 4 90-10 118 0-40-4-76-14-104z', '#c0623a') +
      `<g fill="none" stroke="#eb9a62" stroke-width="6" stroke-linecap="round"><path d="M246 150q40-22 84-16"/><path d="M396 150q46 30 48 110"/></g><circle cx="364" cy="122" r="13" fill="#a4453d" stroke="${OL}" stroke-width="4"/>`,
    eyesOpen('#b0682f') + brows(6, '#7a3a24') + smile)}`, a);
}

/* 老周：毛衣外面系长围裙、卷起袖子、肩上搭毛巾、手里拎汤勺 */
function zhou(a) {
  const sw = '#8692a6', swS = '#6b7689', ap = '#eadfc8', apS = '#cdbf9f', pant = '#6e5f4b', pantS = '#54473a';
  return wrap(`
  ${legs(pant, pantS, '#3a3530', '#26211d')}
  ${torso(sw, swS, { sl: 130, sr: 270, wl: 146, wr: 254 })}
  <path d="M150 300h100l22 360H128z" fill="${ap}" stroke="${OL}" stroke-width="2.6" stroke-linejoin="round"/><path d="M222 300h28l22 360h-36z" fill="${apS}"/>
  <path d="M156 300l30-90M244 300l-30-90" stroke="${ap}" stroke-width="7" stroke-linecap="round"/><path d="M156 300l30-90M244 300l-30-90" stroke="${OL}" stroke-width="1.6" fill="none" opacity=".5"/>
  <path d="M170 420h60v50h-60z" fill="none" stroke="${apS}" stroke-width="3"/><path d="M128 470h144" stroke="${apS}" stroke-width="3"/>
  <path d="M222 206c30 10 52 30 60 60l-18 100-26-4 14-84c-6-20-18-36-30-46z" fill="#c97b6a" stroke="${OL}" stroke-width="2.4"/><path d="M264 366l-26-4" stroke="#a4453d" stroke-width="4"/>
  ${limb([[138, 222, 44], [124, 340, 36], [130, 446, 30]], sw, swS)}${limb([[262, 222, 44], [278, 340, 36], [272, 420, 30]], sw, swS)}
  ${limb([[272, 420, 26], [272, 440, 24], [270, 456, 22]], SK, SKS)}${limb([[130, 430, 26], [130, 446, 24], [131, 460, 22]], SK, SKS)}
  ${fist(131, 474, 0)}
  <path d="M270 440v170" stroke="#9aa8ba" stroke-width="7" stroke-linecap="round"/><path d="M270 440v170" stroke="${OL}" stroke-width="1.4" opacity=".5"/><path d="M250 606a20 15 0 0 0 40 0z" fill="#b9c4d1" stroke="${OL}" stroke-width="2.4"/>
  ${fist(270, 470, 0)}
  ${head(hairPath('M206 240c-10-100 44-136 96-136 62 0 104 40 94 130l-10 30c-4-40-24-70-40-80z', '#26211d'),
    hairPath('M208 236c-8-86 38-128 96-128 62 0 98 40 94 116-14-30-36-50-66-58 6 14 6 26 0 38-16-22-40-36-72-38 8 12 10 24 6 36-22-6-42 4-58 34z', '#3a332e') +
      `<g fill="none" stroke="#6b6058" stroke-width="6" stroke-linecap="round"><path d="M248 148q36-20 80-12"/></g>` +
      `<g fill="none" stroke="${OL}" stroke-width="6"><circle cx="262" cy="270" r="28"/><circle cx="340" cy="270" r="28"/><path d="M290 266q11-6 22 0M234 266l-20-6M368 266l20-6"/></g><g stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".55"><path d="M248 256l10-8M326 256l10-8"/></g>`,
    `<g fill="none" stroke="${LINE}" stroke-linecap="round" stroke-width="6"><path d="M244 272q18-10 36 0"/><path d="M322 272q18-10 36 0"/></g>` + brows(0, '#3a332e') + soft)}`, a);
}

/* 室友：芥末色开衫、白衬衫、百褶裙、黑色裤袜、乐福鞋；举着手机 */
function mate(a) {
  const cd = '#c99a3f', cdS = '#a77c2c', sk = '#2f3a52', skS = '#222b3e', tights = '#2b2a30', tightsS = '#1d1c21';
  return wrap(`<g transform="translate(200 0) scale(.9 1) translate(-200 0)">
  ${limb([[182, 560, 40], [180, 720, 32], [178, 928, 26]], tights, tightsS)}${limb([[218, 560, 40], [224, 720, 32], [234, 926, 26]], tights, tightsS)}
  ${shoeM(176, 936, '#5a3a2a', '#3a2418', -1)}${shoeM(236, 934, '#5a3a2a', '#3a2418', 1)}
  <path d="M146 440L254 440L282 620L118 620Z" fill="${sk}" stroke="${OL}" stroke-width="2.6" stroke-linejoin="round"/>
  <g stroke="${skS}" stroke-width="3"><path d="M164 446l-12 172M182 446l-6 172M200 446v172M218 446l6 172M236 446l12 172"/></g><path d="M236 446l46 174h-36z" fill="${skS}" opacity=".7"/>
  ${torso('#f3ead6', '#d9cdb1', { sl: 138, sr: 262, wl: 152, wr: 248, hem: 450 })}
  <path d="M182 202l18 26 18-26 6 16-24 22-24-22z" fill="#fff" stroke="${OL}" stroke-width="2.2"/>
  <path d="M138 212C130 280 140 400 140 500L190 500C184 400 186 300 194 228L178 204Z" fill="${cd}" stroke="${OL}" stroke-width="2.6" stroke-linejoin="round"/>
  <path d="M262 212C270 280 260 400 260 500L210 500C216 400 214 300 206 228L222 204Z" fill="${cd}" stroke="${OL}" stroke-width="2.6" stroke-linejoin="round"/>
  <path d="M226 210C240 300 246 400 242 500L260 500C260 400 270 280 262 212Z" fill="${cdS}"/>
  <g fill="#7c5a24"><circle cx="184" cy="300" r="3.4"/><circle cx="184" cy="350" r="3.4"/><circle cx="184" cy="400" r="3.4"/></g>
  ${limb([[144, 222, 38], [130, 340, 32], [140, 460, 26]], cd, cdS)}${fist(140, 474, 10)}
  ${limb([[256, 222, 38], [282, 330, 32], [232, 304, 28]], cd, cdS)}
  <g transform="rotate(-12 226 290)"><rect x="210" y="248" width="34" height="62" rx="6" fill="#23242b" stroke="${OL}" stroke-width="2"/><rect x="214" y="254" width="26" height="48" rx="2" fill="#8cc7cc"/></g>
  ${fist(226, 304, 80)}
  </g>
  ${head(hairPath('M196 250c-18-110 44-150 104-150s124 40 106 150c-6 50-14 86-28 108-6-60-16-100-40-120h-76c-24 20-34 60-40 120-14-22-22-58-26-108z', '#4a2d20'),
    hairPath('M206 254c-14-98 34-148 96-148 64 0 108 46 94 146-8-40-22-64-40-78 2 18 0 30-6 40-12-26-30-42-54-50 4 16 2 28-6 38-14-20-32-30-56-32 8 14 8 26 2 36-14-6-24 6-30 48z', '#6a4330') +
      hairPath('M204 252c-6 50 0 90 14 116 2-40 6-74 16-100z', '#6a4330') + hairPath('M398 250c6 50 0 90-14 116-2-40-6-74-16-100z', '#6a4330') +
      `<g fill="none" stroke="#9c6a4c" stroke-width="6" stroke-linecap="round"><path d="M244 150q40-22 88-12"/></g><rect x="356" y="182" width="26" height="9" rx="4" fill="#d6a39a" stroke="${OL}" stroke-width="3" transform="rotate(-30 369 186)"/>`,
    eyesOpen('#6a4330') + brows(4, '#4a2d20') + smile)}`, a);
}

/* 负责人：侧分短发、夹克、工作牌、夹板夹在胳膊下 */
function lead(a) {
  const jk = '#77774c', jkS = '#5c5c39', sh = '#eadfc8', shS = '#cfc0a2', pant = '#34384a', pantS = '#252836';
  return wrap(`
  ${legs(pant, pantS, '#2b2a30', '#15151a')}
  ${torso(sh, shS)}
  <path d="M134 212C128 270 140 380 146 480L196 480C190 380 192 270 198 222L176 202Z" fill="${jk}" stroke="${OL}" stroke-width="2.6" stroke-linejoin="round"/>
  <path d="M266 212C272 270 260 380 254 480L204 480C210 380 208 270 202 222L224 202Z" fill="${jk}" stroke="${OL}" stroke-width="2.6" stroke-linejoin="round"/>
  <path d="M226 208C238 300 244 400 240 480L254 480C260 380 272 270 266 212Z" fill="${jkS}"/>
  <path d="M176 202l-16 50 26 10 12-38zM224 202l16 50-26 10-12-38z" fill="${jk}" stroke="${OL}" stroke-width="2.4" stroke-linejoin="round"/>
  <path d="M186 206l12 110M214 206l-12 110" stroke="#a4453d" stroke-width="3.4"/>
  <rect x="186" y="314" width="28" height="38" rx="3" fill="${sh}" stroke="${OL}" stroke-width="2"/><rect x="192" y="320" width="16" height="14" fill="#7f8ea3"/>
  <g transform="rotate(-8 130 380)"><rect x="96" y="300" width="70" height="100" rx="5" fill="#8c6442" stroke="${OL}" stroke-width="2.4"/><rect x="102" y="312" width="58" height="82" fill="#f3ead6"/><path d="M110 330h40M110 344h40M110 358h30" stroke="#9aa8ba" stroke-width="3"/></g>
  ${limb([[140, 222, 42], [126, 340, 34], [138, 450, 28]], jk, jkS)}${fist(138, 464, 0)}
  ${limb([[260, 222, 42], [280, 345, 34], [250, 460, 28]], jk, jkS)}${pocket(250, 470)}
  ${head(hairPath('M206 240c-10-100 44-136 96-136 62 0 104 40 94 130l-10 30c-4-40-24-70-40-80z', '#1b1a1f'),
    hairPath('M208 240c-10-90 38-134 98-134 62 0 98 44 92 120-20-40-60-70-118-64 20 6 34 16 42 30-44-10-80 2-114 48z', '#2b2a30') + hairPath('M212 238c-4 30 0 56 10 76 0-26 4-50 12-66z', '#2b2a30') +
      `<g fill="none" stroke="#55535e" stroke-width="6" stroke-linecap="round"><path d="M256 140q40-18 86-4"/></g>`,
    eyesOpen('#3b3240', true) + brows(2, '#2b2a30', true) + flat)}`, a);
}
window.Figures = { lin, fox, zhou, mate, lead };

})();
