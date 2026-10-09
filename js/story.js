/* 第十一号失主 · 剧情（开场 + 灯光间 + 道具间）
 * 这里只有文字和流程。每一间屋子都是同一个循环：
 *   因为缺一样东西才进来 → 调查 → 手札翻到一页空白，先写自己的 → 找到他的 → 圈出下一步缺什么
 * G 是 game.js 提供的接口；n = 旁白（我心里想的），you = 我说出口的话。
 */
(function () {
  const G = () => window.G;
  const is = (k) => G().is(k), flag = (k) => G().flag(k);
  const talk = (lines) => G().talk(lines);

  /* ---------- 铁盒里的东西 ---------- */
  const items = {
    notebook: { name: '手札', icon: 'it-notebook', desc: '前半本写满了别人的事。最后四页只有题头，一个字没填。没有名字。' },
    cassette: { name: '磁带 R-17', short: '磁带', icon: 'it-cassette', desc: () => is('heard') ? '十七秒。他修好收音机的那个下午。标签：R-17，5.29。' : '手写标签：R-17，5.29。看纸的颜色，有几年了。' },
    button: { name: '裂掉的纽扣', short: '纽扣', icon: 'it-button', desc: () => is('matched') ? '黑色，四角星。和《借星的人》戏服肩上的是同一种。从线孔裂到了边上。' : '黑色，压着一枚四角星。从线孔裂到了边上，缝不回去了。' },
    ticket: { name: '没用过的车票', short: '车票', icon: 'it-ticket', desc: () => is('ticketWhy') ? '海滨专线，6.14。全社去海边那天，他留下来还器材。' : '海滨专线，6.14。没有检票的孔。' },
    pencil: { name: '铅笔', icon: 'it-pencil', desc: '灯光间笔筒里的。粗细正好能卡进带轴。' },
    label: { name: '维修标签（照片）', short: '维修标签', icon: 'it-label', desc: '三次修理：3.02、4.17、5.29。试听留在 R-17。维修人只剩一个“林”字。' }
  };

  /* ---------- 手札 ---------- */
  const book = {
    fly: () => is('ended') ? ['毕业前回来', '把最后四页填了。', '别又忘了。', '', '填了。', '——林拾'] : ['毕业前回来', '把最后四页填了。', '别又忘了。'],
    notes1: { head: '大一 · 春　道具组', rows: [
      ['3.09', '追光灯支架松了，已紧。'],
      ['3.14', '狐狸的披风下摆开线，演出前补好。'],
      ['3.20', '老周膝盖不好，重的东西别让他搬。'],
      ['3.28', '合照定时器十秒不够，下次设十五。我说了马上，没赶上。'],
      ['4.02', '灯光间插线板的开关在桌子底下。最后走的人记得关。'],
      ['4.11', '阿澈的伴奏带又松了。放之前拿铅笔卷紧，不然绞带。']] },
    notes2: { head: '大一 · 春　道具组', rows: [
      ['4.17', '道具间收音机，第二次修。连杆销又掉了。'],
      ['4.25', '狐狸不吃葱。老周少盐。'],
      ['5.06', '侍卫的长矛头掉了。胶不行，改用钉。'],
      ['5.19', '借的椅子周五前还。别让别人去还，会忘。'],
      ['5.29', '收音机，第三次。换了销，这回应该不掉了。'],
      ['6.03', '散场灯最后关。先看后台还有没有人。']] },
    pages: {
      1: { head: '哪个下午是你自己的？', trace: '<p class="trace corner">R-17</p>', hintText: '想不起具体哪天也行。写那种感觉。',
        his: () => is('heard') ? '他没写在纸上。答案在 R-17 里：修好收音机的那个下午，十七秒。' : '' },
      2: { head: '有什么东西，你一直没舍得扔？', trace: '<p class="trace">（修了三次）</p>', hintText: '几次想扔，又拿回来的那样东西。',
        his: () => is('buttonWhy') ? '他收起来的是那颗裂掉的纽扣。首演那晚所有人都有合照，他只有这个。' : is('buttonAsked') ? '括号里写的是那台收音机。可他收进盒子带走的，是一颗裂掉的纽扣。为什么是它，还不知道。' : '' },
      3: { head: '你对谁说过“不”？', trace: '<p class="trace"><span class="x">写了又划掉</span>　<span class="x">划了很多遍</span></p>', hintText: '不用是大事。本来会点头，那次摇了头。',
        his: () => is('saidNo') ? '三年里没有。毕业前最后一晚：“不了。我今晚有事。”' : is('p3Done') ? '他写了又划，划了很多遍。三年里，他没有对谁说过不。' : '' },
      4: { head: '你给自己留过什么？', trace: '<p class="trace">给自己留一碗</p><span class="stain"></span>', hintText: '一直想做，总跟自己说“下次吧”的那件事也算。',
        his: () => is('ended') ? '一张没用的车票，一只没拆封的碗。今晚，他用了那只碗。' : is('p4Done') ? '他给自己留过一张车票，没用上。老周给他留过一只碗，没拆封。' : '' }
    }
  };

  /* ---------- 关于他：声音 → 姓 → 名字 → 本人 ---------- */
  const known = () => ({
    show: is('in.box'),
    rows: [
      { label: '声音', on: is('heard'), chip: '声音 ✓', text: '十七秒。一个男生，有点远，像在对着机器自言自语。' },
      { label: '姓', on: is('surname'), chip: '姓 林', text: '林。维修标签上只剩这一个字。' },
      { label: '名字', on: is('nameKnown'), chip: '名字 林拾', text: is('handSeen') ? '林拾。大家叫他小林。七张合照里，只有他一只手。' : '林拾。大家叫他小林。' },
      { label: '本人', on: is('met'), chip: '本人 ✓', text: '后厨。清场前的最后一晚。' }
    ]
  });

  /* ---------- 群聊 ---------- */
  const chat = {
    place: '前一晚', noExplore: true,
    html: () => `<div class="phone"><div class="phone-top"><b>礼堂清场志愿者</b><span>23 人</span></div><div class="msgs" id="msgs"></div>
      <div class="inputbar"><div class="input" id="chat-input"></div><span class="send" id="chat-send">发送</span></div></div>`,
    goal: () => '',
    async enter() {
      const g = G(), msgs = document.getElementById('msgs'), input = document.getElementById('chat-input'), send = document.getElementById('chat-send');
      const msg = async (who, html, me) => { msgs.insertAdjacentHTML('beforeend', `<div class="msg${me ? ' me' : ''}">${me ? '' : `<small>${who}</small>`}<div>${html}</div></div>`); msgs.scrollTop = msgs.scrollHeight; await g.wait(650); };
      const type = async (t) => { for (let i = 1; i <= t.length; i++) { input.textContent = t.slice(0, i); await g.wait(90); } send.classList.add('on'); };
      const erase = async () => { while (input.textContent.length) { input.textContent = input.textContent.slice(0, -1); await g.wait(70); } send.classList.remove('on'); };
      await msg('负责人', '明天旧礼堂清场，寄存柜那块还缺两个人。');
      await msg('室友', '我去，顺便看看有没有人落下好东西');
      await msg('负责人', '<span class="at">@你</span> 你明天下午没课吧，能来吗？');
      await g.say('n', '前一晚，群里有人@我。');
      await type('我下午可能');
      const a = await g.choose('“我下午可能”，后面接什么？', [{ id: 'more', t: '把这句话打完' }, { id: 'del', t: '删掉', ghost: true }]);
      if (a === 'more') await talk([['n', '打完要说什么呢。说我有事？我其实没事。'], ['n', '我只是不太想去。可这句话，我不知道怎么打。']]);
      await erase();
      await type('都行。');
      await g.choose('', [{ id: 'send', t: '发送' }]);
      input.textContent = ''; send.classList.remove('on');
      await msg('', '都行。', true);
      await msg('负责人', '好嘞！明天两点，礼堂见。');
      await talk([['n', '我打了“我下午可能”，删掉，回了两个字。'], ['n', '这两个字，我在这个群里发过很多次。']]);
      return g.go('lockers', '第二天', '旧礼堂 · 寄存处');
    }
  };

  /* ---------- 寄存处 ---------- */
  const lockers = {
    art: 'lockers', place: '旧礼堂 · 寄存处', focus: 0.3,
    goal: () => '把一到二十号寄存柜清一遍。',
    hint: () => [['n', '大多数柜子都是空的。'], ['n', '十一号的门没关严，里面好像有东西。']],
    async enter(first) {
      if (!first) return;
      await talk([
        ['n', '负责人把一卷黑色垃圾袋塞到我手里。'],
        ['lead', '寄存柜一到二十归你俩。有名字的放左边，没名字的进袋子。'],
        ['lead', '明早施工队进场，今天必须清完。'],
        ['mate', '没名字的直接扔？不交招领处吗？'],
        ['lead', '招领处就是我。（指了指垃圾袋）这就是招领处。']]);
    },
    hs: {
      l3: () => talk([['n', '三号柜。门上贴着名字，里面一把伞。'], ['mate', '有名字的，放左边。']]),
      l14: () => talk([['n', '十四号柜。一只保温杯，杯身杯底都没写名字。'], ['mate', '没名字。'], ['n', '她手一松。杯子落进袋底，闷闷地响了一声。']]),
      keep: () => talk([['n', '有名字的东西放在这儿，等人来领。'], ['n', '有名字，就有人会来找。']]),
      notice: () => talk([['n', '明早八点，施工进场。'], ['n', '没人认领的东西，今天统一清理。']]),
      bag: () => talk([['n', '黑色垃圾袋，已经装了小半袋。'], ['n', '负责人说，这就是招领处。']]),
      async l11() {
        await talk([['n', '十一号柜没锁。'], ['n', '里面只有一个铁皮饼干盒。']]);
        flag('boxOut');
        return G().go('box');
      }
    }
  };

  /* ---------- 铁盒里的四样东西 ---------- */
  const box = {
    art: 'box', place: '十一号柜 · 铁盒', focus: 0.75,
    goal: () => { const left = ['notebook', 'cassette', 'button', 'ticket'].filter((i) => !G().has(i)).length; return left ? `看看盒子里的东西。还有 ${left} 样没看。` : ''; },
    hint: () => [['n', '四样东西，都摆在衬布上了。'], ['n', '那本红色的手札最厚。']],
    async enter(first) {
      if (!first) return;
      await talk([['n', '我打开。'], ['n', '一本手札，一盘磁带，一颗裂掉的纽扣，一张车票。'], ['mate', '没名字。扔吧。']]);
      const a = await G().choose('', [{ id: 'wait', t: '“等一下。”' }, { id: 'bag', t: '把盒子放进垃圾袋', ghost: true }]);
      if (a === 'bag') await talk([['n', '我把盒子端到袋口。'], ['n', '手没松。'], ['you', '……等一下。']]);
      else await G().say('you', '等一下。');
    },
    hs: {
      async cassette() {
        await talk([['n', '一盘磁带。标签上手写着“R-17”，还有一个日期：5.29。'], ['n', '看纸的颜色，有几年了。']]);
        await G().give('cassette');
      },
      async button() {
        await talk([['n', '一颗黑色的纽扣，上面压着一枚四角星。'], ['n', '从线孔裂到了边上。缝不回去了。'], ['n', '坏掉的纽扣，为什么要留着。']]);
        await G().give('button');
      },
      async ticket() {
        await talk([['n', '一张海滨专线的车票。'], ['n', '票面印着 6.14。没有检票的孔，没用过。']]);
        await G().give('ticket');
      },
      async notebook() {
        const g = G();
        if (!g.has('notebook')) {
          g.book.show('notes1');
          await talk([['n', '我翻开手札。字很小，很整齐。'], ['n', '追光灯的支架。狐狸的披风。老周的膝盖。']]);
          g.book.show('notes2');
          await talk([['n', '一页一页，全是这样的。写了大半本。'], ['mate', '这人是管家吗。']]);
          g.book.show('four');
          await talk([['n', '我翻到最后。'], ['n', '四页，每页顶上一行字，下面全是空的。'], ['n', '前面记了那么多别人的事。写到自己，一个字没有。']]);
          g.book.show('fly');
          await talk([['n', '再翻回扉页。'], ['mate', '……今年毕业的啊。那他是不要了。'], ['you', '他是忘了。'], ['mate', '有区别吗？'], ['n', '我没回答。']]);
          g.book.hide();
          await g.give('notebook');
        } else { await g.book.browse(); }
      }
    },
    async check() {
      const g = G();
      if (!['notebook', 'cassette', 'button', 'ticket'].every((i) => g.has(i))) return;
      await talk([
        ['n', '我把四样东西放回盒子，把盒子塞进了书包。'],
        ['mate', '你认真的？'],
        ['you', '就看看磁带里是什么。'],
        ['mate', '这年头谁还有卡带机。'],
        ['lead', '（头也不抬）楼上灯光间有台老的。明天也一起拆。']]);
      return g.go('booth', '灯光间', '礼堂二楼，最里面那间');
    }
  };

  /* ---------- 第一间：灯光间 ---------- */
  const playTape = async () => {
    const g = G(), svg = g.closeEl.querySelector('svg'), count = g.closeEl.querySelector('#deck-count');
    const set = (v) => { if (count) count.textContent = v; };
    if (svg) svg.classList.add('playing');
    g.tape.start(); set('002');
    await g.say('tape', '（沙沙声。）');
    set('007');
    await g.say('tape', '今天把那台旧收音机修好了。下午没替谁赶工，就听了会儿声音。');
    set('013');
    await g.say('tape', '……原来我也能这样过一天。');
    g.tape.hum(); set('017');
    await g.say('n', '他哼了几个音。咔哒，没了。');
    g.tape.stop(); if (svg) svg.classList.remove('playing');
  };
  const booth = {
    art: 'booth', place: '第一间 · 灯光间', focus: 0.85,
    goal: () => !is('tapeIn') ? '用那台卡带机，听听磁带里是什么。'
      : !is('power') ? '卡带机没反应。看看它的电是从哪来的。'
      : !is('taut') ? (is('sawSlack') ? '带子松了。找个东西把它卷紧。' : '通电了。再按一次播放。')
      : !is('heard') ? '可以放了。按下播放键。' : '',
    hint() {
      if (!is('tapeIn')) return [['n', '磁带在铁盒里。卡带机在桌子右边。']];
      if (!is('power')) return [['n', '手札里好像写过灯光间的电。'], ['n', '“4.02　灯光间插线板的开关在桌子底下。最后走的人记得关。”']];
      if (!is('taut')) return [['n', '手札里写过带子松了怎么办。'], ['n', '“4.11　阿澈的伴奏带又松了。放之前拿铅笔卷紧，不然绞带。”']];
      return [['n', '该按播放键了。']];
    },
    async enter(first) {
      if (!first) return;
      await talk([['n', '灯光间在二楼最里面，门上的牌子已经拆了一半。'], ['n', '机器还在。落了一层灰。'], ['mate', '还真有。']]);
    },
    hs: {
      window: () => talk([['n', '从这里能看见整个舞台。椅子已经叠起来了。'], ['n', '坐在这儿的人，看得见台上所有人。台上的人看不见这儿。']]),
      tapes: () => talk([['n', '一排伴奏带，书脊上编着号：R-01 到 R-16。'], ['n', '他的那盘是 R-17。'], ['n', '他把自己的话，排在了所有人的伴奏后面。']]),
      console: () => talk([['n', '调光台。十二个推子，每个旁边贴着小纸条。字和手札里一样。'], ['n', '“1 路 面光”“4 路 侧蓝”。连哪一路接触不良都写了。']]),
      gels: () => talk([['n', '色纸样本。有几片被翻得起了毛边。']]),
      async cup() {
        if (!is('sawSlack')) return talk([['n', '笔筒里插着几支铅笔，一把美工刀。'], ['n', '现在用不上。']]);
        await talk([['n', '铅笔。粗细正好能卡进带轴。']]);
        flag('hasPencil'); await G().give('pencil');
      },
      async strip() {
        if (is('power')) return talk([['n', '插线板的开关亮着。']]);
        await talk([['n', '桌子底下有一个插线板，开关是关着的。'], ['n', '卡带机的插头掉在旁边。大概是谁收拾的时候拔的。'], ['n', '我把插头插上，按下开关。']]);
        flag('power'); G().sfx('unlock');
        await talk([['n', '卡带机上的小灯亮了。']]);
      },
      async deck() {
        if (!is('deckSeen')) { flag('deckSeen'); await talk([['n', '一台老卡带机。全校大概就剩这一台了。']]); }
        G().openCloseup('deck');
      }
    },
    async check() {
      const g = G();
      if (!is('heard')) return;
      g.drop('pencil');
      await talk([['mate', '行吧，听完了。可以扔了吧？'], ['n', '只有声音。还是不知道他是谁。']]);
      await g.circle('这十七秒里，有什么是现在还找得到的？', [
        '今天把那台', { k: 'radio', t: '旧收音机', ok: true }, '修好了。\n', { k: 'noon', t: '下午' }, '没替谁', { k: 'work', t: '赶工' }, '，\n就听了会儿', { k: 'sound', t: '声音' }, '。'
      ], { noon: '那个下午已经过去好几年了。', work: '他替谁赶工，带子里没说。', sound: '声音我已经听到了。只有声音，不知道是谁。' });
      await talk([
        ['you', '他说修好了一台收音机。修东西的人，会不会留名字？'],
        ['mate', '道具间，一楼。六点锁门。'],
        ['mate', '（看手机）我不去了啊，约了人吃饭。'],
        ['n', '她说得很轻松，说完就走了。'],
        ['n', '我站了一会儿。'],
        ['n', '我好像从来没这么说过话。']]);
      return g.go('props', '道具间', '一楼。离六点锁门，还有四十分钟');
    }
  };
  const deck = {
    hs: {
      lamp: () => is('power') ? talk([['n', '电源灯亮着。']]) : talk([['n', '电源灯是暗的。没通电。'], ['n', '电线从机器后面垂下去，一直垂到桌子底下。']]),
      async well() {
        const g = G();
        if (!is('tapeIn')) {
          await g.present('把什么放进带仓？', 'cassette', { notebook: '手札塞不进去。', button: '纽扣会掉进机器里。', ticket: '车票不是放在这儿的。', pencil: '先得有磁带。' });
          flag('tapeIn');
          return talk([['n', '磁带卡进带仓，咔的一声。']]);
        }
        if (is('taut')) return talk([['n', '带子绷得很直。']]);
        if (!is('sawSlack')) { flag('sawSlack'); return talk([['n', '带子从底下垂出来一截。在盒子里放了几年，松了。'], ['n', '这样放下去会绞带。']]); }
        if (!is('hasPencil')) return talk([['n', '带子垂着一截。得找个细长的东西，把它卷紧。']]);
        if (!is('wind1')) { flag('wind1'); return talk([['n', '我把铅笔插进带轴，慢慢地转。']]); }
        if (!is('wind2')) { flag('wind2'); return talk([['n', '垂下来的带子收回去一截。再转几圈。']]); }
        flag('taut'); g.sfx('unlock');
        return talk([['n', '带子绷直了。']]);
      },
      async play() {
        const g = G();
        if (!is('tapeIn')) return talk([['n', '带仓是空的。']]);
        if (!is('power')) return talk([['n', '播放键按下去，没有反应。'], ['n', '电源灯是暗的。']]);
        if (!is('taut')) {
          const firstTime = !is('sawSlack'); flag('sawSlack');
          await talk([['n', '播放键按下去，带轴转了半圈，自己弹了回来。'], ['n', '带子松了，从底下垂出来一截。']]);
          if (firstTime) await talk([['mate', '松了？我好像听我妈说过，以前都是拿笔卷的。']]);
          return;
        }
        if (is('heard')) return playTape();
        // 手札第一页：先写自己的
        await talk([['n', '可以放了。'], ['n', '磁带标签上写着 R-17。这个编号，我在手札里见过。']]);
        g.book.show('p1');
        await talk([
          ['n', '最后四页的第一页。页角一行小字：R-17。'],
          ['mate', '所以这盘带子就是他的答案？那他干嘛不直接写上去。'],
          ['you', '不知道。'],
          ['mate', '你猜他录了什么？'],
          ['n', '我想了想。猜不出来。'],
          ['n', '只能先想自己的。']]);
        const mine = await g.book.ask(1);
        await talk(mine ? [['n', '我没往他的本子上写。我记在了自己手机里。']] : [['n', '我想了很久，没写出来。这页先空着。'], ['n', '空着的样子，和他那页一样。']]);
        g.book.hide();
        await g.say('n', '我按下播放。');
        await playTape();
        flag('heard');
        await talk([
          ['mate', '就这？'],
          ['n', '我看了眼计数器。十七秒。'],
          ['you', '5.29。他大一那年录的。'],
          ['mate', '然后呢？'],
          ['you', '然后到今天，第一页还是空的。'],
          ['n', '室友没接话。']]);
        g.book.show('p1');
        await talk([['n', '一个下午。三年里，他只留下了这一个。'], mine ? ['n', '我写下的那个，离现在也不近了。'] : ['n', '我连一个都没写出来。']]);
        g.book.hide(); g.closeCloseup();
      }
    }
  };

  /* ---------- 第二间：道具间 ---------- */
  const rackDone = () => ['c1', 'c2', 'c3', 'c4'].every(is) && is('tagSeen');
  const costume = (n, name) => async () => {
    const g = G(); flag('c' + n);
    if (!is('matched')) { flag('matched'); await talk([['n', name + '的戏服。肩上一颗黑色的纽扣，扣着披风。'], ['n', '黑色，四角星。'], ['you', '和盒子里那颗一样。']]); }
    else await talk([['n', name + '。肩上的纽扣在，好好的。']]);
    return rackCheck();
  };
  const rackCheck = async () => {
    if (is('rackDone') || !rackDone()) return;
    flag('rackDone');
    await talk([['n', '四件戏服，四颗纽扣，一颗不少。'], ['n', '那盒子里裂掉的这颗，只可能来自不在这里的那一件。'], ['you', '主角服。在后台。']]);
    G().closeCloseup();
  };
  const props = {
    art: 'props', place: '第二间 · 道具间', focus: 0.25,
    goal: () => !is('boxMoved') ? '找那台他修过的收音机。'
      : !is('surname') ? '看看收音机上有没有留名字。'
      : !is('rackDone') ? '那颗裂掉的纽扣，是从哪儿来的？' : '',
    hint() {
      if (!is('boxMoved')) return [['n', '架子第三层，假花箱子后面露出一截天线。']];
      if (!is('surname')) return [['n', '收音机就在架子上。机身上贴着东西。']];
      if (!is('matched')) return [['n', '四角星。这间屋子里，我好像在别处也见过这个图案。'], ['n', '墙上那张海报。还有那排戏服。']];
      return [['n', '同一部戏的戏服都挂在架子上。一件件看过去。'], ['n', '最后一个衣架是空的。']];
    },
    async enter(first) {
      if (!first) return;
      await talk([['n', '离六点还有四十分钟。'], ['n', '架子上什么都有：断过腿的椅子，半桶干掉的漆，一箱假花。'], ['n', '收音机在哪。']]);
    },
    hs: {
      clock: () => talk([['n', '五点二十。六点锁门。']]),
      junkTop: () => talk([['n', '纸糊的月亮，一顶王冠，一只红灯笼。'], ['n', '演完就没人管了。']]),
      junkMid: () => talk([['n', '一把椅子。断过的那条腿，用木片接上了。'], ['n', '接口磨得很平。漆桶里的漆早就干了。']]),
      async flowers() {
        await talk([['n', '一箱假花，挡在架子最里面。后面露出一截天线。'], ['n', '我把箱子挪到一边。']]);
        flag('boxMoved');
        await talk([['n', '收音机在后面。']]);
      },
      async radio() { G().openCloseup('radio'); },
      async poster() { G().openCloseup('poster'); },
      async rack() {
        if (!is('rackSeen')) { flag('rackSeen'); await talk([['n', '一排戏服，都是同一部戏的。']]); }
        G().openCloseup('rack');
      }
    },
    async check() {
      const g = G();
      if (!(is('surname') && is('buttonAsked') && is('rackDone'))) return;
      await talk([
        ['lead', '（在走廊里喊）道具间还有人吗？锁门了！'],
        ['you', '马上。'],
        ['n', '我说完才发现，这两个字我今天见过。']]);
      g.book.show('notes1', { mark: '3.28' });
      await talk([['n', '“我说了马上，没赶上。”'], ['n', '我合上手札，关了灯。']]);
      g.book.hide();
      return g.go('backstage', '后台', '主角服在那里');
    }
  };
  const radio = {
    hs: {
      dust: () => talk([['n', '机身上一层灰。旋钮还转得动。'], ['n', '它在这儿放了很久了。']]),
      async label() {
        const g = G();
        if (is('surname')) return talk([['n', '三次修理。试听留在 R-17。维修人：林。']]);
        await talk([
          ['n', '机身上贴着一张维修标签。'],
          ['n', '三行日期，三行同样的字：修。修。修。'],
          ['n', '下面一行：试听留在 R-17。'],
          ['you', '5.29。和磁带上是同一天。'],
          ['n', '对上了。就是这台。']]);
        g.book.show('notes2', { mark: '5.29' });
        await talk([['n', '我把手札摊在旁边。'], ['n', '“修”字最后一笔，都往右上挑。笔迹一样。']]);
        g.book.hide();
        await talk([['n', '署名栏被磨花了，只剩一个字。'], ['you', '林。']]);
        flag('surname');
        await talk([['n', '我拍了一张。']]);
        await g.give('label');
        await g.say('n', '只有一个姓。');
        // 手札第二页
        g.book.show('p2');
        await talk([
          ['n', '最后四页的第二页。题头后面，括号里一句：修了三次。'],
          ['n', '是这台收音机。'],
          ['n', '可是不对。它在这儿落灰，他没带走。'],
          ['n', '如果是我舍不得的东西，我不会把它留在这里。']]);
        const mine = await g.book.ask(2);
        await talk(mine ? [['n', '我记下了。我的那样东西，现在在哪，我是知道的。']] : [['n', '我一时想不出来。这页也先空着。']]);
        g.book.hide();
        await g.say('n', '那他真正带走、收起来的是什么？');
        await g.present('他真正收起来的，是哪一样？', 'button', { cassette: '磁带是第一页的答案。', ticket: '车票没用过。我还看不出它是什么。', notebook: '手札是提问的地方，不是答案。', label: '这是这台收音机的。而收音机被他留在了这里。' });
        flag('buttonAsked');
        await talk([['n', '裂掉的纽扣。黑色，四角星，从线孔裂开。'], ['n', '谁会把一颗裂掉的纽扣收三年。']]);
        if (is('matched')) await talk([['n', '它是这部戏的戏服上的。']]);
        g.closeCloseup();
      }
    }
  };
  const poster = {
    hs: {
      pstar: () => talk([['n', '一颗很大的四角星。戏叫《借星的人》。']]),
      credits: () => { flag('creditsSeen'); return talk([['n', '主演 胡黎，导演 陈望，灯光 许知夏。'], ['n', '名单里没有“道具”这一栏。']]); },
      async clasp() {
        if (is('matched')) return talk([['n', '主角肩上的扣子。和盒子里那颗是同一种。']]);
        flag('matched');
        await talk([['n', '主角肩上有一颗扣子，扣着披风。'], ['n', '黑色，四角星。'], ['you', '和盒子里那颗一样。'], ['n', '这种纽扣是这部戏的。它是从戏服上掉下来的。']]);
      }
    }
  };
  const rack = {
    hs: {
      c1: costume(1, '侍卫甲'), c2: costume(2, '侍卫乙'), c3: costume(3, '学者'), c4: costume(4, '卖花人'),
      async tag() {
        flag('tagSeen');
        await talk([['n', '最后一个衣架是空的。'], ['n', '挂牌上写着：主角服 · 在后台。']]);
        if (!rackDone()) await talk([['n', '别的戏服上，纽扣都还在吗。']]);
        return rackCheck();
      }
    }
  };

  /* ---------- 第三间：后台 ---------- */
  const deduce = async (prompt, opts, wrong) => {
    for (;;) {
      const a = await G().choose(prompt, opts.map((o) => ({ id: o.id, t: o.t, ghost: true })));
      if (opts.find((o) => o.id === a).ok) { G().sfx('found'); return a; }
      G().sfx('wrong'); await G().say('n', wrong[a]);
    }
  };
  const chatLog = () => `<div class="phone"><div class="phone-top"><b>小林</b><span>狐狸的手机</span></div><div class="msgs">
      <div class="msg me"><div>能来一下吗，披风又开线了</div></div><div class="msg"><div>好</div></div>
      <div class="msg me"><div>明天早点到？帮我对词</div></div><div class="msg"><div>好</div></div>
      <div class="msg me"><div>道具间的钥匙你有吧，帮我拿下长矛</div></div><div class="msg"><div>好</div></div>
      <div class="msg me"><div>周六搬东西缺人，来不来</div></div><div class="msg"><div>好</div></div>
      <div class="msg"><small>一年前</small></div>
      <div class="msg"><small>语音通话 · 对方无应答</small></div></div>
      <div class="inputbar"><div class="input"></div><button class="choice" data-close>放下手机</button></div></div>`;
  const backstage = {
    art: 'backstage', place: '第三间 · 后台', focus: 0.62,
    goal: () => !is('nameKnown') ? '找到那件少了一颗纽扣的主角服。'
      : !is('handSeen') ? '他长什么样？看看墙上的合照。'
      : !is('called') ? '问问学姐，他现在在哪。' : '',
    hint() {
      if (!is('seamMatched')) return [['n', '主角服就挂在人台上。'], ['n', '两边肩上的纽扣，好像不太一样。']];
      if (!is('handSeen')) return [['n', '合照拍了七次。'], ['n', '一张一张看过去。']];
      return [['n', '学姐还在收东西。']];
    },
    async enter(first) {
      if (!first) return;
      await talk([['n', '后台的灯还亮着。'], ['n', '有人在往纸箱里收东西。纸箱上写着：胡黎。'], ['fox', '清场的？这边我自己收，你们不用管。']]);
    },
    hs: {
      mirror: () => talk([['n', '化妆镜。一圈灯泡，有两个比别的亮，是后换的。'], ['n', '换灯泡的人，大概没留名字。']]),
      sewing: () => talk([['n', '针线盒。第二格里躺着三颗备用的四角星纽扣。'], ['n', '新的还有。坏掉的那颗，本来不用留。']]),
      tripod: () => talk([['n', '三脚架上贴着一张便签：定时 15 秒。'], ['n', '手札里写过。十秒不够，下次设十五。']]),
      async fox() {
        if (!is('nameKnown')) return talk([['you', '我在找一个人。姓林，修道具的。'], ['fox', '（手停了一下）……你怎么知道他？'], ['n', '我得拿出点什么。先弄清这颗纽扣，是不是这件衣服上的。']]);
        if (!is('handSeen')) return talk([['fox', '合照都在那面墙上。你自己看。']]);
        return talk([['fox', '我收完这箱就走。']]);
      },
      async costume() {
        if (!is('costumeSeen')) { flag('costumeSeen'); await talk([['n', '主角服挂在人台上。红披风，两边肩上各一颗四角星纽扣。']]); }
        G().openCloseup('costume');
      },
      async photos() {
        if (!is('nameKnown')) return talk([['n', '一墙的合照。'], ['n', '我还不知道该找谁。']]);
        G().openCloseup('photos');
      }
    },
    async check() {
      const g = G();
      if (!is('handSeen')) return;
      if (!is('p3Done')) {
        await g.say('n', '手札里有一页，我一直没看懂。');
        g.book.show('p3');
        await talk([['n', '最后四页的第三页。'], ['n', '题头下面写了又划掉。划了很多遍。'], ['n', '先想我自己的。']]);
        const mine = await g.book.ask(3);
        await talk(mine ? [['n', '我记下了。']] : [['n', '我想了一圈。没有。']]);
        g.book.hide();
        await talk([['you', '他有没有对你说过“不”？'], ['fox', '（想了很久）……没有。'], ['fox', '一次都没有。我以前以为，是我们关系好。']]);
        await deduce('第三页为什么是空的？', [{ id: 'forgot', t: '他忘了填' }, { id: 'hide', t: '他不想写' }, { id: 'none', t: '他没有可以写的', ok: true }],
          { forgot: '忘了的话，纸上不会有划痕。他试过。', hide: '不想写的人，不会写了又划，划了又写。' });
        await talk([['n', '这一页不是没来得及填。'], ['n', '是没得填。'], mine ? ['n', '我至少写出了一次。他一次都没有。'] : ['n', '我那张也是空的。我和他一样。']]);
        flag('p3Done');
      }
      await talk([['you', '他现在在哪？'], ['fox', '我有他微信。'], ['n', '她拨了语音。响到自动挂断，没人接。'], ['n', '她点开对话框想打字，手指停住了。']]);
      await g.sheet(chatLog());
      await talk([
        ['n', '往上翻，全是她在找他帮忙。他每一条都回“好”。'],
        ['n', '最后一条是一年前。'],
        ['n', '她盯着看了一会儿，没再发第二条。'],
        ['you', '我加他好友。'],
        ['n', '申请发出去了。没有通过。'],
        ['n', '礼堂明早清空，等不了他慢慢回。']]);
      await g.present('还有什么能告诉我们，他今晚会在哪？', 'notebook', { button: '纽扣已经带我找到这里了。', cassette: '磁带里只有那个下午。', ticket: '车票没用过。它说的是他没去的地方。', label: '标签只说他修过收音机。' });
      g.book.show('notes2', { mark: '4.25' });
      await talk([
        ['n', '手札里，夜宵的事记了好几条。'],
        ['fox', '（凑过来看）狐狸不吃葱……他连这个都记。'],
        ['fox', '散场以后，他从来不在后台。他在后厨，给我们做吃的。'],
        ['fox', '今晚是最后一晚，老周要收厨房。他要是知道，一定会去。']]);
      g.book.hide();
      await talk([['fox', '你先去。我把这箱收完就来。']]);
      flag('called');
      return g.go('kitchen', '后厨', '礼堂后门，走廊尽头');
    }
  };
  const heroCostume = {
    hs: {
      collar: () => talk([['n', '领口缝着名字：胡黎。和海报上的主演是同一个。'], ['fox', '是我。大家叫我狐狸。']]),
      oldBtn: () => talk([['n', '右肩的纽扣。黑底金星，边上磨得发乌。']]),
      newBtn: () => talk([['n', '左肩这颗亮一些。金色还没磨掉。'], ['n', '是后来补上去的。']]),
      async seam() {
        const g = G();
        if (is('seamMatched')) return talk([['n', '裂口和衣缝里的碎片，严丝合缝。']]);
        await talk([['n', '左肩的衣缝里，卡着一小片黑色的东西。']]);
        await g.present('拿什么和它比一比？', 'button', { notebook: '手札上没有缺口。', cassette: '不是磁带上的。', ticket: '车票是纸的。', label: '这是收音机的标签。' });
        flag('seamMatched');
        await talk([
          ['n', '我把裂掉的纽扣靠上去。'],
          ['n', '缺的那一小片，严丝合缝。'],
          ['you', '是从这件衣服上掉下来的。'],
          ['fox', '……你手里那颗，哪来的？'],
          ['you', '十一号寄存柜。一个没写名字的铁盒。'],
          ['fox', '是我撞坏的。第一次正式演出，我非要从桌上跳下来，落地的时候肩饰飞了。'],
          ['fox', '线孔裂了，缝不回去。他从针线盒里找了颗新的，蹲在侧幕给我缝上。'],
          ['fox', '一边缝一边骂我，英雄下次能不能走楼梯。'],
          ['fox', '……我后来每场都走楼梯。'],
          ['you', '他是谁？'],
          ['fox', '小林。林拾。道具组的。其实后台坏了什么，都是他修。']]);
        flag('nameKnown');
        await talk([['n', '林拾。'], ['n', '一本写满别人的手札，装在一个没写名字的盒子里。'], ['fox', '你想知道他长什么样？合照都在那面墙上。']]);
        g.closeCloseup();
      }
    }
  };
  const photosDone = () => is('r1') && is('ph5') && is('ph6');
  const photos = {
    hs: {
      async row1() { flag('r1'); await talk([['n', '首演，二轮，返场，庆功。每一张都站满了人。'], ['fox', '第一排这四张没有他。我不用看都知道。']]); },
      async ph5() { flag('ph5'); await talk([['n', '第五张。后排有人举着长矛。'], ['fox', '那是侍卫。矛头是他钉的，人不是他。']]); },
      async ph6() { flag('ph6'); await talk([['n', '第六张，所有人都在笑。'], ['fox', '庆功那晚。他在厨房。']]); },
      async ph7() {
        const g = G();
        if (is('handSeen')) return talk([['n', '画面外伸进来的一只手，捏着针。']]);
        await talk([
          ['n', '最后一张。主角站在中间。'],
          ['n', '右边的画面外，伸进来一只手。'],
          ['n', '手里捏着针，正在缝主角肩上的纽扣。'],
          ['fox', '倒数只剩三秒，他还在补我的肩饰。'],
          ['fox', '我喊过他。……没再喊第二遍。'],
          ['fox', '合照拍了七次。他一次都没站进来。每次都说马上好。']]);
        flag('handSeen'); flag('buttonWhy');
        await talk([
          ['n', '我看着照片里那只手，又看了看手里裂掉的纽扣。'],
          ['n', '那天所有人都有一张照片，证明自己在场。'],
          ['n', '他只有这个。']]);
        g.closeCloseup();
      }
    }
  };

  /* ---------- 第四间：后厨 ---------- */
  const bowlNames = ['狐狸', '老周', '阿澈', '陈望', '知夏'];
  const flip = (i) => async () => {
    flag('b' + i);
    await talk([['n', `我把碗翻过来。碗底用记号笔写着：${bowlNames[i - 1]}。`]]);
    if (is('bowlsDone') || ![1, 2, 3, 4, 5].every((n) => is('b' + n))) return;
    flag('bowlsDone');
    await talk([['n', '五只碗，五个名字。我又数了一遍。'], ['n', '没有他自己的。'], ['zhou', '他都是等大家吃完，站在灶边就着锅吃。']]);
  };
  const finale = async () => {
    const g = G();
    await talk([
      ['lin', '老周，我来晚了，刚帮人搬——'],
      ['n', '他看见了我。'],
      ['n', '和磁带里是同一个声音。只是近了很多。'],
      ['lin', '刚看到狐狸打了电话。在帮人搬东西，没听见。'],
      ['n', '我把铁盒放在桌上。'],
      ['you', '十一号柜。你的。']]);
    flag('met');
    await talk([['lin', '……我都忘了有这本。']]);
    g.book.show('four');
    await talk([
      ['n', '他翻到最后四页。'],
      ['lin', '一个字没写啊。'],
      ['you', '第三页，我替你找过了。没找到。'],
      ['lin', '（笑）那页我写了又划，划了十几次。每次想起一个，再想想，又不算。']]);
    g.book.hide();
    await talk([
      ['n', '门外有人喊：“小林！楼下还有两箱，再帮个忙！”'],
      ['n', '他已经半站起来了。'],
      ['n', '停住。'],
      ['lin', '不了。我今晚有事。'],
      ['n', '门外安静了一下。“……哦，行！”'],
      ['n', '第三页，当场有了答案。']]);
    flag('saidNo');
    await talk([
      ['n', '老周把那只碗推到他面前，盛满。'],
      ['n', '他看了一会儿碗底的名字，端起来了。'],
      ['fox', '（推门）我没来晚吧。'],
      ['fox', '定时器我设了十五秒。这次你站中间。'],
      ['n', '快门响的时候，他没有说马上。'],
      ['lin', '那你那四页呢？']]);
    const heads = [1, 2, 3, 4].map((n) => ({ id: String(n), t: `给他看第${'一二三四'[n - 1]}页：${g.S.answers[n] ? g.S.answers[n].slice(0, 14) + (g.S.answers[n].length > 14 ? '…' : '') : '（留白）'}`, ghost: true }));
    const a = await g.choose('挑一页给他看，或者都留给自己。', heads.concat([{ id: 'keep', t: '先都留给自己' }]));
    if (a === 'keep') await talk([['lin', '行。本来就是写给自己的。']]);
    else if (!g.S.answers[+a]) await talk([['n', '我把空着的那一页给他看。'], ['lin', '空着也行。我空了三年。']]);
    else await talk([['n', '他读得很慢。读完，没有替我解释。'],
      ['lin', { 1: '这个下午，听着比我那个长。', 2: '还留着就好。别像我，收了三年，忘了自己收过。', 3: '你比我早。', 4: '留了，就记得用。' }[a]]]);
    await talk([['n', '我的手机响了。群里有人@我：明天还有一批椅子要搬，能来吗？']]);
    const r = await g.choose('回什么？', [{ id: 'ok', t: '都行。', ghost: true }, { id: 'no', t: '明天不行，我有事。', ghost: true }, { id: 'later', t: '先不回', ghost: true }]);
    if (r === 'ok') await talk([['n', '我打了“都行”，看了一会儿。还是发了。'], ['n', '不过这一次，我知道自己在说什么。']]);
    else if (r === 'no') await talk([['n', '发出去以后，什么也没发生。对面回了个“好的”。'], ['n', '原来就这么简单。']]);
    else await talk([['n', '我把手机扣在桌上。'], ['n', '汤快凉了。']]);
    flag('ended');
    g.book.show('fly');
    await talk([['n', '小林把手札翻回扉页，在那句话下面添了一行。'], ['n', '这本手札，终于有了名字。']]);
    g.book.hide();
    g.ending();
  };
  const kitchen = {
    art: 'kitchen', place: '第四间 · 后厨', focus: 0.5,
    goal: () => is('p4Done') ? '' : '等他。趁这会儿，看看这间厨房。',
    hint() {
      if (!is('bowlsDone') || !is('sealedSeen')) return [['n', '碗柜里的碗，碗底好像写着字。'], ['n', '最上层还有一只没拆封的。']];
      if (!is('ticketWhy')) return [['n', '冰箱上压着一张发黄的单子。'], ['n', '上面的日期，我好像在盒子里见过。']];
      return [['n', '再等一会儿。']];
    },
    async enter(first) {
      if (!first) return;
      await talk([
        ['n', '后厨的灯是黄的。灶上有一锅东西在冒热气。'],
        ['n', '一个系围裙的人在擦灶台。'],
        ['zhou', '清场的？厨房我自己收。'],
        ['you', '我在等人。林拾。'],
        ['zhou', '（手停了一下）……那你坐。他还没到。']]);
    },
    hs: {
      zhou: () => talk([['you', '他会来吗？'], ['zhou', '清场最后一晚，他每年都来帮我收厨房。'], ['zhou', '他答应过的事，没有不来的。']]),
      pot: () => talk([['n', '一锅家常炖菜。'], ['zhou', '他的方子。盐量改了七次，改到每个人都能吃。']]),
      async recipe() {
        flag('recipeSeen');
        await talk([['n', '墙上钉着一张菜谱。字和手札里一样。'], ['n', '“狐狸不吃葱。老周少盐。阿澈不要香菜。”'], ['n', '最底下很小的一行：给自己留一碗。']]);
      },
      async fridge() { G().openCloseup('fridge'); },
      async cupboard() {
        if (!is('cupSeen')) { flag('cupSeen'); await talk([['n', '一柜子碗，洗得很干净。']]); }
        G().openCloseup('cupboard');
      }
    },
    async check() {
      const g = G();
      if (!(is('bowlsDone') && is('sealedSeen') && is('ticketWhy'))) return;
      if (!is('p4Done')) {
        g.book.show('p4');
        await talk([['n', '最后四页的第四页。'], ['n', '一块油渍，边上一行小字：给自己留一碗。'], ['n', '先想我自己的。']]);
        const mine = await g.book.ask(4);
        await talk(mine ? [['n', '我记下了。']] : [['n', '我想不出来。上一次是什么时候，我不记得了。']]);
        await talk([['n', '他给自己留过一张车票，没用上。'], ['n', '别人给他留过一只碗，也没拆。'], ['n', '他提醒过自己。没做到。']]);
        flag('p4Done'); g.book.show('p4');
        await g.say('n', '四页都有了。只差他本人。');
        g.book.hide();
      }
      flag('tableSet');
      await talk([['n', '老周把最上层那只碗取下来，拆了封，洗干净，摆在桌上。'], ['n', '又拿了一只没写名字的，放在我面前。'], ['n', '门开了。']]);
      return finale();
    }
  };
  const cupboard = {
    hs: {
      b1: flip(1), b2: flip(2), b3: flip(3), b4: flip(4), b5: flip(5),
      async sealed() {
        flag('sealedSeen');
        await talk([['n', '最上层有一只没拆封的碗。'], ['zhou', '我后来给他买的。碗底也写了名字，是我的字。'], ['zhou', '他一次没用过。说留着下次。']]);
      }
    }
  };
  const fridge = {
    hs: {
      note: () => talk([['n', '一张便签：汤在锅里，自己盛。落款是一个“周”字。']]),
      async slip() {
        const g = G();
        if (is('ticketWhy')) return talk([['n', '器材归还单。6.14，归还人林拾。']]);
        await talk([['n', '冰箱上压着一张发黄的器材归还单。'], ['n', '追光灯两台，音箱一只，折叠椅十二把。归还人：林拾。'], ['n', '归还日期，6.14。']]);
        await g.present('6.14。这个日期，我在哪见过？', 'ticket', { notebook: '手札里的记录到 6.03 就翻页了。', cassette: '磁带上是 5.29。', button: '纽扣上没有日期。', label: '标签上最后一次是 5.29。' });
        await talk([['n', '车票上印着 6.14。同一天。'], ['zhou', '那次演出完，全社去了海边。'], ['zhou', '总得有人留下来还器材。'], ['n', '票他买了。没去。']]);
        flag('ticketWhy');
        g.closeCloseup();
      }
    }
  };

  window.Story = {
    items, book, known,
    scenes: { chat, lockers, box, booth, props, backstage, kitchen },
    closeups: { deck, radio, poster, rack, costume: heroCostume, photos, cupboard, fridge },
    endCard: () => ({ eyebrow: '失 物 已 归 还', title: '第十一号失主', text: '铁盒还回去了。四页问题，他的和我的，都有了去处。' })
  };
})();
