import React from "react";
import VOJ from "./bhasma.json";
import { makeStory, VOT, cl, ease, lerp, rnd, mix, OL, GOLD, Shiva } from "./kit";
import { God } from "./Pillar";

const S = makeStory(VOJ as VOT, [0, 1, 3, 4, 5, 6, 7], 5);
export const BHASMA_FRAMES = S.FRAMES;
const { Scene, wt, LT } = S;

const Forest: React.FC<{ t: number }> = ({ t }) => (
  <g>
    <defs><linearGradient id="fst" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#03120f" /><stop offset=".55" stopColor="#0c3a30" /><stop offset="1" stopColor="#134a3a" /></linearGradient>
      <radialGradient id="fmoon"><stop offset="0" stopColor="#eaffd8" stopOpacity=".8" /><stop offset=".3" stopColor="#9fe8b0" stopOpacity=".3" /><stop offset="1" stopColor="#9fe8b0" stopOpacity="0" /></radialGradient></defs>
    <rect x={-400} y={-200} width={1880} height={2400} fill="url(#fst)" />
    <circle cx={760} cy={420} r={420} fill="url(#fmoon)" /><circle cx={760} cy={420} r={70} fill="#f4ffe6" />
    {Array.from({ length: 9 }, (_, i) => { const x = -200 + i * 190 + rnd(i) * 60, w = 46 + rnd(i + 3) * 40; return <g key={i}><rect x={x} y={-200} width={w} height={1700} fill="#0a2a24" /><ellipse cx={x + w / 2} cy={260 + rnd(i + 9) * 240} rx={190} ry={230} fill="#0d342b" /></g>; })}
    {Array.from({ length: 5 }, (_, i) => { const x = -160 + i * 320 + rnd(i + 20) * 80, w = 90 + rnd(i + 30) * 50; return <g key={i}><path d={`M${x},1560 Q${x + 14},700 ${x - 10},-200 L${x + w + 10},-200 Q${x + w - 14},700 ${x + w},1560Z`} fill="#06201b" stroke="#041612" strokeWidth={6} /><ellipse cx={x + w / 2} cy={120 + rnd(i + 40) * 160} rx={280} ry={250} fill="#082a22" /></g>; })}
    <path d="M-400,1500 Q200,1440 540,1470 Q900,1440 1480,1500 L1480,2200 L-400,2200Z" fill="#0a2e25" /><path d="M-400,1500 Q200,1440 540,1470 Q900,1440 1480,1500" stroke="#1f6a52" strokeWidth={7} fill="none" />
    {Array.from({ length: 22 }, (_, i) => <circle key={i} cx={rnd(i + 60) * 1080 + Math.sin(t * 0.7 + i) * 40} cy={500 + rnd(i + 70) * 1000 + Math.cos(t * 0.9 + i * 2) * 30} r={4 + rnd(i) * 3} fill="#e8ff9a" opacity={0.25 + 0.6 * Math.abs(Math.sin(t * 1.6 + i * 1.7))} />)}
  </g>
);
// arm poses for the dance: [elbow, hand], for an arm on the figure's left (x negative)
const POSE: number[][] = [[-170, 250, -160, 350], [-226, 250, -118, 322], [-214, 196, -106, 138], [-196, 16, -44, -118], [-250, 120, -390, 70], [-150, 60, -110, -40]];
const armAt = (p: number) => { const a = POSE[Math.floor(p)], b = POSE[Math.min(POSE.length - 1, Math.ceil(p))], k = ease(p - Math.floor(p)); return a.map((v, i) => lerp(v, b[i], k)); };
const Arm: React.FC<{ p: number; col: string; glow?: number; bangles?: boolean }> = ({ p, col, glow = 0, bangles }) => {
  const [ex, ey, hx, hy] = armAt(p), d = `M-112,160 Q${ex},${ey} ${hx},${hy}`;
  return <g><path d={d} stroke={OL} strokeWidth={56} fill="none" strokeLinecap="round" /><path d={d} stroke={col} strokeWidth={43} fill="none" strokeLinecap="round" />
    {glow > 0 && <circle cx={hx} cy={hy} r={110} fill="url(#kglow)" opacity={glow} />}
    <circle cx={hx} cy={hy} r={29} fill={glow > 0.3 ? mix("#b23a2a", "#ffb238", glow * 0.7) : col} stroke={OL} strokeWidth={6} />
    {bangles && <path d={`M${lerp(ex, hx, 0.72) - 18},${lerp(ey, hy, 0.72) + 14} l36,-28`} stroke={GOLD} strokeWidth={12} strokeLinecap="round" />}</g>;
};
/** Bhasmasura; origin = head centre. p = arm pose, expr 0 grin 1 smitten 2 shock, ash 0..1 */
export const Demon: React.FC<{ p: number; expr?: number; ash?: number; glow?: number; t: number }> = ({ p, expr = 0, ash = 0, glow = 0, t }) => {
  const c = (h: string) => mix(h, "#8f8f96", ash), R = c("#b23a2a"), RD = c("#8a2a20");
  return (
    <g>
      <path d="M-104,430 L-116,640 L-22,640 L0,470 L22,640 L116,640 L104,430Z" fill={RD} stroke={OL} strokeWidth={8} strokeLinejoin="round" />
      <ellipse cx={-70} cy={650} rx={62} ry={22} fill={R} stroke={OL} strokeWidth={6} /><ellipse cx={70} cy={650} rx={62} ry={22} fill={R} stroke={OL} strokeWidth={6} />
      <path d="M-124,340 Q0,380 124,340 L134,470 Q60,440 0,500 Q-60,440 -134,470Z" fill={c("#d98a2a")} stroke={OL} strokeWidth={7} strokeLinejoin="round" />
      {[-80, -30, 30, 80].map((x) => <path key={x} d={`M${x},366 q8,30 -6,60`} stroke={c("#5a2a10")} strokeWidth={9} fill="none" strokeLinecap="round" />)}
      <path d="M112,160 Q226,240 126,320" stroke={OL} strokeWidth={56} fill="none" strokeLinecap="round" /><path d="M112,160 Q226,240 126,320" stroke={RD} strokeWidth={43} fill="none" strokeLinecap="round" /><circle cx={124} cy={322} r={29} fill={RD} stroke={OL} strokeWidth={6} />
      <path d="M-134,154 Q-150,124 -74,120 L74,120 Q150,124 134,154 L112,360 Q0,392 -112,360Z" fill={R} stroke={OL} strokeWidth={8} strokeLinejoin="round" />
      <ellipse cx={0} cy={270} rx={70} ry={66} fill={c("#c8553e")} opacity={0.7} />
      {Array.from({ length: 9 }, (_, i) => { const a = Math.PI * (0.1 + 0.8 * (i / 8)); return <path key={i} d={`M${-Math.cos(a) * 92 - 7},${150 + Math.sin(a) * 70} l14,0 l-7,26Z`} fill={c("#f6e6c6")} stroke={OL} strokeWidth={3} strokeLinejoin="round" />; })}
      <Arm p={p} col={R} glow={glow} />
      <path d="M-130,-10 L-176,-90 L-116,-70 L-140,-150 L-78,-104 L-70,-180 L-20,-116 L20,-186 L40,-112 L96,-170 L92,-96 L150,-130 L120,-60 L172,-50 L126,-6Z" fill={c("#1a0f14")} stroke={OL} strokeWidth={6} strokeLinejoin="round" />
      <path d="M-80,-76 Q-150,-150 -110,-222 Q-104,-150 -40,-104Z M80,-76 Q150,-150 110,-222 Q104,-150 40,-104Z" fill={c("#f6e6c6")} stroke={OL} strokeWidth={7} strokeLinejoin="round" />
      <path d="M-104,-10 L-150,-40 L-112,24Z M104,-10 L150,-40 L112,24Z" fill={R} stroke={OL} strokeWidth={6} strokeLinejoin="round" />
      <path d="M-104,-10 Q-108,-104 0,-106 Q108,-104 104,-10 Q104,70 0,104 Q-104,70 -104,-10Z" fill={R} stroke={OL} strokeWidth={8} />
      {expr === 1
        ? [-40, 40].map((x) => <path key={x} d={`M${x},10 q-22,-22 -22,-36 q0,-16 22,-6 q22,-10 22,6 q0,14 -22,36Z`} fill="#ff5a8a" stroke={OL} strokeWidth={4} strokeLinejoin="round" transform={`scale(${1 + 0.12 * Math.sin(t * 8)})`} style={{ transformOrigin: `${x}px -10px` }} />)
        : [-40, 40].map((x) => <g key={x}><ellipse cx={x} cy={-12} rx={24} ry={expr === 2 ? 28 : 20} fill={c("#ffe07a")} stroke={OL} strokeWidth={5} /><ellipse cx={x} cy={-12} rx={expr === 2 ? 5 : 6} ry={expr === 2 ? 8 : 15} fill={OL} /></g>)}
      {expr === 0 && <path d="M-74,-48 L-18,-30 M18,-30 L74,-48" stroke={OL} strokeWidth={12} strokeLinecap="round" />}
      {expr === 2 && <path d="M-70,-52 Q-44,-70 -18,-56 M18,-56 Q44,-70 70,-52" stroke={OL} strokeWidth={10} fill="none" strokeLinecap="round" />}
      <path d="M-14,12 Q0,30 14,12" stroke={RD} strokeWidth={7} fill="none" strokeLinecap="round" />
      {expr === 2 ? <ellipse cx={0} cy={62} rx={22} ry={24} fill="#3a0f14" stroke={OL} strokeWidth={6} />
        : <path d={expr === 1 ? "M-40,50 Q0,84 40,50" : "M-56,44 Q0,96 56,44 Q0,62 -56,44Z"} fill={expr === 1 ? "none" : "#3a0f14"} stroke={OL} strokeWidth={6} strokeLinejoin="round" strokeLinecap="round" />}
      <path d="M-44,62 L-36,26 L-24,60Z M44,62 L36,26 L24,60Z" fill={c("#f6e6c6")} stroke={OL} strokeWidth={4} strokeLinejoin="round" />
    </g>
  );
};
/** Mohini; origin = head centre. p = arm pose */
export const Mohini: React.FC<{ p: number; t: number; talk?: number }> = ({ p, t, talk = 0 }) => {
  const SK = "#e8b48a";
  return (
    <g>
      <circle cx={0} cy={260} r={520} fill="url(#kglow)" opacity={0.22} />
      <path d="M-96,340 Q-200,560 -170,650 L170,650 Q200,560 96,340Z" fill="#1f9a6a" stroke={OL} strokeWidth={8} strokeLinejoin="round" />
      <path d="M-176,618 L176,618" stroke={GOLD} strokeWidth={16} /><path d="M-40,350 Q-90,500 -60,640 M30,350 Q80,500 60,640" stroke="#157a52" strokeWidth={7} fill="none" />
      <ellipse cx={-50} cy={656} rx={40} ry={15} fill={SK} stroke={OL} strokeWidth={5} /><ellipse cx={50} cy={656} rx={40} ry={15} fill={SK} stroke={OL} strokeWidth={5} />
      <path d="M-70,-40 Q-150,120 -120,380 Q-80,300 -76,150Z" fill="#1a0f14" stroke={OL} strokeWidth={6} />
      <path d="M112,160 Q210,230 120,310" stroke={OL} strokeWidth={48} fill="none" strokeLinecap="round" /><path d="M112,160 Q210,230 120,310" stroke={SK} strokeWidth={36} fill="none" strokeLinecap="round" /><circle cx={118} cy={312} r={24} fill={SK} stroke={OL} strokeWidth={5} />
      <path d="M-96,250 Q0,280 96,250 L96,346 Q0,372 -96,346Z" fill={SK} stroke={OL} strokeWidth={7} />
      <path d="M-116,152 Q-130,124 -64,120 L64,120 Q130,124 116,152 L98,260 Q0,290 -98,260Z" fill="#c8284a" stroke={OL} strokeWidth={7} strokeLinejoin="round" />
      <path d="M112,130 Q20,220 -100,350 L-60,362 Q50,240 126,160Z" fill="#27b07a" stroke={OL} strokeWidth={6} strokeLinejoin="round" />
      <path d="M-60,128 Q0,196 60,128" stroke={GOLD} strokeWidth={10} fill="none" /><circle cx={0} cy={168} r={12} fill="#2fb8c8" stroke={GOLD} strokeWidth={5} />
      <path d="M-104,332 Q0,362 104,332" stroke={GOLD} strokeWidth={12} fill="none" />
      <g transform="scale(.86)" style={{ transformOrigin: "-112px 160px" }}><Arm p={p} col={SK} bangles /></g>
      <rect x={-24} y={78} width={48} height={50} fill="#d9a074" stroke={OL} strokeWidth={5} />
      <path d="M-92,10 Q-104,-110 0,-116 Q104,-110 92,10 L80,60 L-80,60Z" fill="#1a0f14" stroke={OL} strokeWidth={6} />
      <path d="M-80,-16 Q-84,-92 0,-94 Q84,-92 80,-16 Q80,54 0,92 Q-80,54 -80,-16Z" fill={SK} stroke={OL} strokeWidth={6} />
      <path d="M-82,-24 Q-60,-96 0,-80 Q60,-96 82,-24 Q84,-104 0,-106 Q-84,-104 -82,-24Z" fill="#1a0f14" />
      <path d="M0,-104 L0,-66" stroke={GOLD} strokeWidth={6} /><circle cx={0} cy={-58} r={10} fill="#2fb8c8" stroke={GOLD} strokeWidth={4} /><circle cx={0} cy={-36} r={6} fill="#d61f3a" />
      <path d="M-22,-110 L0,-170 L22,-110Z" fill={GOLD} stroke={OL} strokeWidth={5} strokeLinejoin="round" />
      {[-34, 34].map((x) => <g key={x}><path d={`M${x - 22},-4 Q${x},-24 ${x + 22},-4 Q${x},8 ${x - 22},-4Z`} fill="#fff" stroke={OL} strokeWidth={5} strokeLinejoin="round" /><circle cx={x + 3} cy={-5} r={8} fill={OL} /><path d={`M${x - 22},-4 Q${x},-26 ${x + 26},-10`} stroke={OL} strokeWidth={7} fill="none" strokeLinecap="round" /></g>)}
      <path d="M-56,-30 Q-34,-42 -14,-32 M14,-32 Q34,-42 56,-30" stroke={OL} strokeWidth={5} fill="none" strokeLinecap="round" />
      <path d="M-3,6 Q-8,26 5,30" stroke="#c98a5e" strokeWidth={4.5} fill="none" strokeLinecap="round" /><circle cx={-12} cy={30} r={5} fill="none" stroke={GOLD} strokeWidth={3} />
      <ellipse cx={-48} cy={30} rx={15} ry={8} fill="#ff8a8a" opacity={0.45} /><ellipse cx={48} cy={30} rx={15} ry={8} fill="#ff8a8a" opacity={0.45} />
      {talk > 0.1 ? <ellipse cx={0} cy={56} rx={13} ry={4 + 8 * talk} fill="#8a1c30" stroke={OL} strokeWidth={4} /> : <path d="M-18,52 Q0,68 18,52" stroke="#a8243a" strokeWidth={6} fill="none" strokeLinecap="round" />}
      <circle cx={-84} cy={34} r={11} fill={GOLD} stroke={OL} strokeWidth={3} /><circle cx={84} cy={34} r={11} fill={GOLD} stroke={OL} strokeWidth={3} />
    </g>
  );
};
const Ash: React.FC<{ t: number; k: number }> = ({ t, k }) => (
  <g>{Array.from({ length: 46 }, (_, i) => { const u = cl(k * 1.4 - rnd(i) * 0.4); return <circle key={i} cx={(rnd(i + 2) - 0.5) * 300 + Math.sin(i + t * 2) * 20 * u} cy={lerp(-80 + rnd(i + 5) * 600, 640, u * u)} r={6 + rnd(i + 8) * 12} fill={i % 3 ? "#8f8f96" : "#5a5a62"} opacity={k > 0 ? 0.85 * (1 - u * 0.5) : 0} />; })}
    <ellipse cx={0} cy={648} rx={200 * cl(k * 1.2)} ry={40 * cl(k * 1.2)} fill="#77777f" stroke={OL} strokeWidth={6} opacity={cl(k * 2)} /></g>
);

export const BhasmaEp: React.FC<{ audio?: boolean }> = ({ audio }) => (
  <S.Shell audio={audio} mix="katha/bhasma.wav" tagline="Ask wisely. Begin your sadhana.">{(t) => (<>
    {/* 1 hook: the burning hand reaching for Shiva */}
    <Scene i={0} t={t} cam={[540, 1000, 1.0, 600, 960, 1.14]}>{(u, lt) => (
      <g><Forest t={t} />
        <g transform={`translate(${760 + ease(lt / 5) * 40},1060) scale(.72)`}><Shiva t={t} eyes={1} mood={0.8} smile={0} /></g>
        <g transform={`translate(${250 + ease(lt / 5) * 50},900) scale(-.82,.82)`}><Demon p={4} expr={0} glow={0.8 + 0.2 * Math.sin(t * 8)} t={t} /></g>
      </g>
    )}</Scene>
    {/* 2 years of prayer; the boon he asks for */}
    <Scene i={1} t={t} cam={[540, 1020, 1.0, 500, 1000, 1.12]}>{() => {
      const sp = t > LT[2] - 0.1;
      return (
        <g><Forest t={t} />
          <g transform="translate(740,1040) scale(.76)"><Shiva t={t} smile={0.7} eyes={sp ? 1 : 0} bless={ease((t - wt(1, "pleased")) / 0.8)} /></g>
          <g transform="translate(280,940) scale(-.8,.8)"><Demon p={sp ? 3.6 : 5} expr={0} glow={sp ? 0.5 : 0} t={t} /></g>
        </g>
      );
    }}</Scene>
    {/* 3 granted: and the hand reaches straight for Shiva */}
    <Scene i={2} t={t} cam={[540, 1000, 1.0, 620, 980, 1.12]}>{(u, lt) => {
      const gr = ease(lt / 0.8), go = ease((t - wt(3, "reached") + 0.2) / 0.9);
      return (
        <g><Forest t={t} />
          <path d={`M640,900 Q500,700 ${lerp(640, 330, gr)},${lerp(900, 800, gr)}`} stroke="url(#kglow)" strokeWidth={40} fill="none" strokeLinecap="round" opacity={(1 - go) * gr} />
          <g transform={`translate(${740 + go * 70},1040) scale(.76)`}><Shiva t={t} eyes={1} mood={go} smile={go > 0.3 ? 0 : 0.6} /></g>
          <g transform={`translate(${280 + go * 150},940) scale(-.8,.8)`}><Demon p={lerp(3.6, 4, go)} expr={0} glow={gr} t={t} /></g>
        </g>
      );
    }}</Scene>
    {/* 4 Shiva runs; Vishnu becomes Mohini */}
    <Scene i={3} t={t} cam={[540, 1000, 1.0, 540, 1000, 1.08]}>{(u, lt) => {
      const run = ease(lt / 1.3), vi = ease((t - wt(4, "vishnu") + 0.3) / 0.6), mo = ease((t - wt(4, "became") + 0.1) / 1.1);
      return (
        <g><Forest t={t} />
          {run < 1 && <g opacity={1 - run}>
            {[0, 1, 2, 3].map((i) => <path key={i} d={`M${600 + run * 400 - 200 - i * 40},${900 + i * 90} l-160,0`} stroke="#cfe4ff" strokeWidth={8} strokeLinecap="round" opacity={0.6} />)}
            <g transform={`translate(${760 + run * 700},1040) scale(.76)`}><Shiva t={t} eyes={1} mood={1} smile={0} /></g>
            <g transform={`translate(${330 + run * 760},940) scale(-.8,.8)`}><Demon p={4} expr={0} glow={1} t={t} /></g></g>}
          {vi > 0 && mo < 1 && <g transform={`translate(540,${lerp(1100, 1010, vi)}) scale(.8)`} opacity={vi * (1 - mo)}><God who="vishnu" mood={0.3} pose="pray" t={t} /></g>}
          {mo > 0 && <g><circle cx={540} cy={1060} r={200 + 700 * Math.sin(mo * Math.PI)} fill="url(#kglow)" opacity={Math.sin(mo * Math.PI)} />
            <g transform={`translate(540,${920 + Math.sin(t * 2) * 8}) scale(${0.6 + 0.3 * mo})`} opacity={mo}><Mohini p={1} t={t} /></g></g>}
        </g>
      );
    }}</Scene>
    {/* 5 "Dance with me. Copy every move." */}
    <Scene i={4} t={t} cam={[640, 960, 1.25, 540, 1000, 1.0]}>{(u, lt) => (
      <g><Forest t={t} />
        <g transform={`translate(${lerp(-200, 290, ease(lt / 1.2))},940) scale(-.8,.8)`}><Demon p={0} expr={1} t={t} /></g>
        {[0, 1, 2].map((i) => { const p = (t * 0.5 + i / 3) % 1; return <path key={i} d="M0,0 q-18,-18 -18,-30 q0,-14 18,-5 q18,-9 18,5 q0,12 -18,30Z" fill="#ff5a8a" stroke={OL} strokeWidth={3} transform={`translate(${330 + i * 50 + Math.sin(p * 6) * 20},${760 - p * 260}) scale(${0.8 + p})`} opacity={(1 - p) * ease((lt - 1.2) / 0.5)} />; })}
        <g transform={`translate(760,${920 + Math.sin(t * 2.4) * 10}) rotate(${Math.sin(t * 2.4) * 3}) scale(.84)`}><Mohini p={1 + 0.4 * Math.sin(t * 2.4)} t={t} talk={Math.abs(Math.sin(t * 9))} /></g>
      </g>
    )}</Scene>
    {/* 6 hip, shoulder, head */}
    <Scene i={5} t={t} cam={[540, 1000, 1.0, 540, 980, 1.08]}>{() => {
      const a = wt(6, "hip") - 0.35, b = wt(6, "shoulder") - 0.35, c = wt(6, "head") - 0.35;
      const p = t < a ? ease((t - a + 0.5) / 0.5) * 0 : t < b ? 0 + ease((t - a) / 0.35) : t < c ? 1 + ease((t - b) / 0.35) : 2 + ease((t - c) / 0.35);
      const hit = cl((t - c - 0.45) / 0.25), ash = ease((t - c - 0.6) / 1.3), bob = Math.sin(t * 5.2) * 8;
      return (
        <g><Forest t={t} />
          <g transform={`translate(770,${920 + bob}) rotate(${Math.sin(t * 2.6) * 3}) scale(.84)`}><Mohini p={p} t={t} /></g>
          <g transform="translate(300,940) scale(-.8,.8)">
            {hit > 0 && ash < 1 && <circle cx={-44} cy={-118} r={140 + 300 * hit} fill="url(#kglow)" opacity={(1 - ash)} />}
            <g opacity={1 - ease((ash - 0.25) / 0.6)} transform={`translate(0,${bob * (1 - hit)})`}><Demon p={p} expr={hit > 0 ? 2 : 1} ash={ash} glow={hit} t={t} /></g>
            <Ash t={t} k={ash} />
          </g>
        </g>
      );
    }}</Scene>
    {/* 7 ask wisely */}
    <Scene i={6} t={t} dur={4} cam={[470, 1080, 1.18, 540, 1010, 1.0]}>{(u, lt) => (
      <g><Forest t={t} />
        <g transform="translate(300,940) scale(.8)"><Ash t={t} k={1} /><path d="M-60,640 Q-120,560 -70,500 Q-70,570 -20,620Z" fill="#f6e6c6" stroke={OL} strokeWidth={6} strokeLinejoin="round" /></g>
        <g transform="translate(540,1020) scale(.8)"><Shiva t={t} smile={0.8} eyes={1} /></g>
        <g transform="translate(850,1060) scale(-.56,.56)"><God who="vishnu" mood={1} pose="pray" t={t} /></g>
      </g>
    )}</Scene>
  </>)}</S.Shell>
);
