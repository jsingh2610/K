import React from "react";
import VOJ from "./sati.json";
import { makeStory, VOT, cl, ease, lerp, rnd, OL, GOLD, Stars, ShivaHead, Shiva, Parvati, Kailash } from "./kit";

const S = makeStory(VOJ as VOT, [0, 1, 2, 3, 4, 5, 6, 7], 6);
export const SATI_FRAMES = S.FRAMES;
const { Scene, wt } = S;
const INK = "#05040c";

const Flames: React.FC<{ t: number; w?: number; h?: number; n?: number }> = ({ t, w = 300, h = 420, n = 7 }) => (
  <g>{Array.from({ length: n }, (_, i) => { const x = (i / (n - 1) - 0.5) * w, hh = h * (0.55 + 0.45 * Math.abs(Math.sin(t * 5 + i * 1.7))) * (1 - Math.abs(i / (n - 1) - 0.5) * 0.9), s = Math.sin(t * 7 + i * 2) * 26;
    return <g key={i}><path d={`M${x - w / n},0 Q${x - w / n + s},${-hh * 0.5} ${x + s * 0.6},${-hh} Q${x + w / n + s},${-hh * 0.5} ${x + w / n},0Z`} fill="#ff7a1e" opacity={0.9} /><path d={`M${x - w / n * 0.55},0 Q${x + s * 0.5},${-hh * 0.4} ${x + s * 0.4},${-hh * 0.66} Q${x + w / n * 0.55},${-hh * 0.3} ${x + w / n * 0.55},0Z`} fill="#ffd45a" /></g>; })}</g>
);
const Hall: React.FC<{ t: number; fire?: number }> = ({ t, fire = 1 }) => (
  <g>
    <defs><linearGradient id="hall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#12040a" /><stop offset="1" stopColor="#3c0e16" /></linearGradient></defs>
    <rect x={-300} y={-200} width={1680} height={2400} fill="url(#hall)" />
    {[-60, 200, 760, 1020].map((x) => <g key={x}><rect x={x} y={-200} width={120} height={1640} fill="#5a1a1e" stroke={OL} strokeWidth={7} />{[300, 700, 1100].map((y) => <rect key={y} x={x - 10} y={y} width={140} height={34} fill={GOLD} stroke={OL} strokeWidth={5} />)}</g>)}
    <path d="M320,-200 L320,560 Q540,430 760,560 L760,-200Z" fill="#240810" /><path d="M320,560 Q540,430 760,560" stroke={GOLD} strokeWidth={8} fill="none" />
    <circle cx={540} cy={1260} r={620 * fire} fill="url(#warm)" opacity={0.55 + 0.08 * Math.sin(t * 6)} />
    <path d="M-300,1440 L1380,1440 L1380,2200 L-300,2200Z" fill="#2a0a10" /><path d="M-300,1440 L1380,1440" stroke="#6a2026" strokeWidth={8} />
    {[-2, -1, 1, 2].map((k) => <path key={k} d={`M${540 + k * 170},1440 L${540 + k * 460},1920`} stroke="#3a1016" strokeWidth={5} />)}
  </g>
);
const Kund: React.FC<{ t: number; big?: number }> = ({ t, big = 1 }) => (
  <g><g transform={`scale(${big})`}><Flames t={t} /></g>
    <path d="M-220,0 L220,0 L180,110 L-180,110Z" fill="#7a3a22" stroke={OL} strokeWidth={8} strokeLinejoin="round" /><path d="M-240,-26 L240,-26 L220,10 L-220,10Z" fill="#9a5230" stroke={OL} strokeWidth={8} strokeLinejoin="round" />
    {[-150, -75, 0, 75, 150].map((x) => <path key={x} d={`M${x - 20},40 l20,-20 l20,20 l-20,20Z`} fill={GOLD} stroke={OL} strokeWidth={4} />)}</g>
);
/** a seated guest seen from behind */
const Guest: React.FC<{ x: number; y: number; s?: number; c?: string }> = ({ x, y, s = 1, c = "#1a070c" }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}><path d="M-80,0 Q-90,-150 -40,-170 L40,-170 Q90,-150 80,0Z" fill={c} stroke={OL} strokeWidth={6} /><circle cx={0} cy={-212} r={46} fill={c} stroke={OL} strokeWidth={6} /><path d="M-40,-240 L-30,-300 L-10,-262 L0,-312 L10,-262 L30,-300 L40,-240Z" fill="#8a6a2a" stroke={OL} strokeWidth={5} strokeLinejoin="round" /></g>
);
/** Sati standing; origin = head centre (same face as Parvati) */
export const SatiStand: React.FC<{ sad?: number }> = ({ sad = 0 }) => (
  <g>
    <path d="M-60,-10 Q-70,-66 0,-70 Q70,-66 60,-10 L70,150 L-70,150Z" fill="#241634" stroke={OL} strokeWidth={5} />
    <path d="M-66,62 Q0,40 66,62 L104,470 Q0,500 -104,470Z" fill="#c8284a" stroke={OL} strokeWidth={6} strokeLinejoin="round" />
    <path d="M-96,440 Q0,470 96,440" stroke={GOLD} strokeWidth={9} fill="none" /><path d="M-40,60 Q30,220 -80,450" stroke={GOLD} strokeWidth={7} fill="none" />
    <ellipse cx={0} cy={-84} rx={30} ry={24} fill="#241634" stroke={OL} strokeWidth={5} /><path d="M-22,-70 L0,-104 L22,-70Z" fill={GOLD} stroke={OL} strokeWidth={4} />
    <circle cx={0} cy={0} r={52} fill="#e8b48a" stroke={OL} strokeWidth={5} />
    <path d="M-52,-8 Q-40,-56 0,-50 Q40,-56 52,-8 Q30,-36 0,-34 Q-30,-36 -52,-8Z" fill="#241634" /><circle cx={0} cy={-22} r={6} fill="#d61f3a" />
    <path d={`M-34,${-10 + 5 * sad} Q-22,-18 -8,${-12 - 5 * sad} M8,${-12 - 5 * sad} Q22,-18 34,${-10 + 5 * sad}`} stroke={OL} strokeWidth={4} fill="none" strokeLinecap="round" />
    <path d="M-30,2 Q-20,10 -10,2 M10,2 Q20,10 30,2" stroke={OL} strokeWidth={4.5} fill="none" strokeLinecap="round" />
    <path d={`M-12,${26 + 4 * sad} Q0,${32 - 10 * sad} 12,${26 + 4 * sad}`} stroke={OL} strokeWidth={4.5} fill="none" strokeLinecap="round" />
    <path d="M-64,90 Q-90,190 -30,236 M64,90 Q90,190 30,236" stroke={OL} strokeWidth={30} fill="none" strokeLinecap="round" /><path d="M-64,90 Q-90,190 -30,236 M64,90 Q90,190 30,236" stroke="#c8284a" strokeWidth={20} fill="none" strokeLinecap="round" />
    <ellipse cx={0} cy={240} rx={30} ry={18} fill="#e8b48a" stroke={OL} strokeWidth={5} />
  </g>
);
/** King Daksha; origin = head centre */
export const Daksha: React.FC<{ t: number; talk?: number }> = ({ t, talk = 0 }) => (
  <g>
    <path d="M-150,170 Q-170,130 -80,124 L80,124 Q170,130 150,170 L190,620 L-190,620Z" fill="#4a1f6a" stroke={OL} strokeWidth={8} strokeLinejoin="round" />
    <path d="M-60,130 L-30,620 M60,130 L30,620" stroke={GOLD} strokeWidth={10} /><path d="M-84,132 Q0,230 84,132" stroke={GOLD} strokeWidth={13} fill="none" />
    <path d={`M128,170 Q230,${150 + Math.sin(t * 6) * 10} ${300},${40 + Math.sin(t * 6) * 16}`} stroke={OL} strokeWidth={56} fill="none" strokeLinecap="round" /><path d={`M128,170 Q230,${150 + Math.sin(t * 6) * 10} 300,${40 + Math.sin(t * 6) * 16}`} stroke="#4a1f6a" strokeWidth={43} fill="none" strokeLinecap="round" />
    <circle cx={304} cy={32 + Math.sin(t * 6) * 16} r={27} fill="#d9a67a" stroke={OL} strokeWidth={6} /><path d={`M320,${22 + Math.sin(t * 6) * 16} l44,-22`} stroke={OL} strokeWidth={20} strokeLinecap="round" /><path d={`M320,${22 + Math.sin(t * 6) * 16} l44,-22`} stroke="#d9a67a" strokeWidth={11} strokeLinecap="round" />
    <rect x={-30} y={80} width={60} height={54} fill="#c08a5e" stroke={OL} strokeWidth={6} />
    <path d="M-90,-20 Q-94,-108 0,-110 Q94,-108 90,-20 Q90,60 0,98 Q-90,60 -90,-20Z" fill="#d9a67a" stroke={OL} strokeWidth={7} />
    <path d="M-96,-66 L-84,-200 L-44,-140 L0,-240 L44,-140 L84,-200 L96,-66 Q0,-104 -96,-66Z" fill={GOLD} stroke={OL} strokeWidth={7} strokeLinejoin="round" /><circle cx={0} cy={-128} r={15} fill="#7a2ad6" stroke={OL} strokeWidth={4} />
    <path d="M-70,-40 L-18,-18 M18,-18 L70,-40" stroke={OL} strokeWidth={11} strokeLinecap="round" />
    {[-38, 38].map((x) => <g key={x}><ellipse cx={x} cy={0} rx={19} ry={13} fill="#fff" stroke={OL} strokeWidth={4.5} /><circle cx={x + 5} cy={1} r={7} fill={OL} /></g>)}
    <path d="M-6,8 Q-14,36 4,40" stroke="#b07a4e" strokeWidth={5} fill="none" strokeLinecap="round" />
    <path d="M0,50 Q-30,62 -62,48 Q-80,40 -84,20 Q-66,40 -44,40 Q-16,40 0,46 Q16,40 44,40 Q66,40 84,20 Q80,40 62,48 Q30,62 0,50Z" fill="#1a0f14" stroke={OL} strokeWidth={3} />
    {talk > 0.1 ? <ellipse cx={0} cy={70} rx={18} ry={5 + 9 * talk} fill="#5a1620" stroke={OL} strokeWidth={4} /> : <path d="M-22,72 Q0,62 22,72" stroke={OL} strokeWidth={5} fill="none" strokeLinecap="round" />}
  </g>
);
/** silhouette: Shiva walking, carrying her. origin = feet, facing right */
const Carry: React.FC<{ t: number }> = ({ t }) => {
  const sw = Math.sin(t * 2.6) * 62, w = (k: number) => Math.sin(t * 2.2 + k) * 22;
  return (
    <g transform={`translate(0,${-Math.abs(Math.cos(t * 2.6)) * 10})`}>
      <path d={`M150,-470 Q60,-420 ${-40 + w(0)},-330 Q${-180 + w(1)},-250 ${-330 + w(2)},-270 Q${-470 + w(3)},-300 ${-560 + w(4)},-200 Q${-420 + w(3)},-250 ${-320 + w(2)},-210 Q${-170 + w(1)},-190 ${-30 + w(0)},-270 Q60,-360 140,-420Z`} fill="#b01c30" stroke="#ff5a6a" strokeWidth={3} />
      <path d={`M0,-340 L${sw},-10 M0,-340 L${-sw},-10`} stroke={INK} strokeWidth={54} strokeLinecap="round" />
      <path d={`M${sw - 10},-6 l60,0 M${-sw - 10},-6 l60,0`} stroke={INK} strokeWidth={26} strokeLinecap="round" />
      <path d="M0,-330 Q10,-460 34,-570" stroke={INK} strokeWidth={104} strokeLinecap="round" fill="none" />
      {[0, 1, 2, 3, 4, 5].map((i) => <path key={i} d={`M30,${-650 + i * 12} Q${-70 + w(i) * 0.5},${-640 + i * 22} ${-170 - i * 16 + w(i)},${-560 + i * 30 + w(i + 2)}`} stroke={INK} strokeWidth={20 - i * 2} fill="none" strokeLinecap="round" />)}
      <circle cx={50} cy={-650} r={56} fill={INK} /><ellipse cx={36} cy={-722} rx={38} ry={32} fill={INK} />
      <path d="M40,-560 Q120,-520 190,-470" stroke={INK} strokeWidth={46} strokeLinecap="round" fill="none" />
      <path d="M70,-500 L250,-476" stroke={INK} strokeWidth={56} strokeLinecap="round" /><circle cx={278} cy={-470} r={34} fill={INK} />
      {[0, 1, 2, 3].map((i) => <path key={i} d={`M${290 + i * 4},-460 Q${300 + i * 6 + w(i) * 0.3},${-380 + i * 10} ${286 + w(i) * 0.6},${-300 + i * 18}`} stroke={INK} strokeWidth={10} fill="none" strokeLinecap="round" />)}
      <path d={`M210,-470 Q${226 + w(1) * 0.2},-400 ${214 + w(1) * 0.4},-330`} stroke={INK} strokeWidth={20} fill="none" strokeLinecap="round" />
      <path d="M84,-486 Q70,-420 76,-360" stroke={INK} strokeWidth={30} fill="none" strokeLinecap="round" />
    </g>
  );
};
/** silhouette: the Tandava inside a ring of fire. origin = hips */
export const Tandava: React.FC<{ t: number }> = ({ t }) => {
  const b = Math.sin(t * 4.4), hair = (k: number, s: number) => `M${s * 30},-310 Q${s * (160 + Math.sin(t * 6 + k) * 20)},${-330 + k * 22 + Math.sin(t * 5 + k) * 26} ${s * (300 + k * 6)},${-300 + k * 34 + Math.sin(t * 7 + k * 2) * 40}`;
  return (
    <g>
      <circle r={470} fill="none" stroke="#ff7a1e" strokeWidth={26} opacity={0.9} /><circle r={470} fill="none" stroke="#ffd45a" strokeWidth={8} />
      {Array.from({ length: 30 }, (_, i) => { const a = (i / 30) * Math.PI * 2 + t * 0.5, r = 482, h = 44 + 30 * Math.abs(Math.sin(t * 6 + i * 2)); return <path key={i} d={`M-22,0 Q0,${-h} 6,${-h * 1.4} Q22,${-h * 0.5} 22,0Z`} fill={i % 2 ? "#ff7a1e" : "#ffb23a"} transform={`translate(${Math.cos(a) * r},${Math.sin(a) * r}) rotate(${(a * 180) / Math.PI + 90})`} />; })}
      <g transform={`rotate(${b * 5}) translate(0,${Math.abs(b) * -14})`}>
        {[0, 1, 2, 3, 4].map((k) => <g key={k}><path d={hair(k, 1)} stroke={INK} strokeWidth={15 - k * 2} fill="none" strokeLinecap="round" /><path d={hair(k, -1)} stroke={INK} strokeWidth={15 - k * 2} fill="none" strokeLinecap="round" /></g>)}
        <path d="M0,0 L-24,250" stroke={INK} strokeWidth={52} strokeLinecap="round" /><path d="M-44,262 l70,0" stroke={INK} strokeWidth={26} strokeLinecap="round" />
        <path d={`M0,0 Q130,${10 + b * 14} ${130 + b * 10},${30 + b * 12} Q110,110 ${56 - b * 12},150`} stroke={INK} strokeWidth={50} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M0,10 L0,-230" stroke={INK} strokeWidth={96} strokeLinecap="round" />
        <circle cx={0} cy={-300} r={54} fill={INK} /><ellipse cx={0} cy={-370} rx={38} ry={32} fill={INK} /><path d="M26,-410 A26,26 0 1 0 58,-378 A20,20 0 1 1 26,-410Z" fill="#fff6d8" />
        <path d={`M-44,-200 Q-140,-240 ${-200 - b * 14},${-320 + b * 10}`} stroke={INK} strokeWidth={36} strokeLinecap="round" fill="none" /><path d={`M${-226 - b * 14},${-350 + b * 10} l28,24 l-28,24 l28,24`} stroke={INK} strokeWidth={14} fill="none" strokeLinejoin="round" />
        <path d={`M44,-200 Q140,-240 ${200 + b * 14},${-320 - b * 10}`} stroke={INK} strokeWidth={36} strokeLinecap="round" fill="none" />
        <g transform={`translate(${206 + b * 14},${-336 - b * 10}) scale(.3)`}><Flames t={t} n={4} w={200} h={300} /></g>
        <path d="M30,-170 Q130,-110 60,-20" stroke={INK} strokeWidth={34} strokeLinecap="round" fill="none" />
        <path d="M-30,-170 Q-150,-150 -160,-230" stroke={INK} strokeWidth={34} strokeLinecap="round" fill="none" /><ellipse cx={-162} cy={-250} rx={20} ry={28} fill={INK} />
      </g>
    </g>
  );
};
const Snow: React.FC<{ t: number; k: number; n?: number }> = ({ t, k, n = 70 }) => (
  <>{Array.from({ length: n }, (_, i) => <circle key={i} cx={((rnd(i) * 1300 - t * (240 + rnd(i + 2) * 300)) % 1300 + 1300) % 1300 - 100} cy={((rnd(i + 5) * 1920 + t * (120 + rnd(i + 7) * 160)) % 1920)} r={3 + rnd(i + 9) * 6} fill="#eef4ff" opacity={0.75 * k} />)}</>
);
const Tear: React.FC<{ p: number }> = ({ p }) => p > 0 && p < 1 ? <path d="M0,0 q9,14 0,22 q-9,-8 0,-22Z" fill="#cfeaff" stroke="#7fb2e8" strokeWidth={1.5} transform={`translate(-48,${8 + p * 70})`} opacity={1 - p * 0.6} /> : null;

export const SatiEp: React.FC<{ audio?: boolean }> = ({ audio }) => (
  <S.Shell audio={audio} mix="katha/sati.wav" tagline="Sit with it. Begin your sadhana.">{(t) => (<>
    {/* 1 hook: one tear */}
    <Scene i={0} t={t} cam={[540, 1000, 1.0, 540, 1040, 1.14]}>{(u, lt) => (
      <g><rect width={1080} height={1920} fill="url(#skyN)" /><Stars t={t} /><Snow t={t} k={0.5} n={30} />
        <g transform="translate(540,1120) scale(3.2)"><circle r={200} fill="url(#aura)" opacity={0.5} /><ShivaHead mood={1} smile={-0.4} /><g transform="scale(1.7)" style={{ transformOrigin: "-48px 8px" }}><Tear p={cl((lt - 1.2) / 2.6)} /></g></g></g>
    )}</Scene>
    {/* 2 Sati and Shiva; Daksha's contempt */}
    <Scene i={1} t={t} cam={[540, 1100, 1.0, 540, 1060, 1.08]}>{() => {
      const dk = ease((t - wt(1, "her") + 0.2) / 0.7);
      return (
        <g><Kailash t={t} />
          <g transform="translate(430,1136) scale(.78)"><Shiva t={t} smile={0.9} /></g><g transform="translate(730,1262) rotate(-6) scale(.8)"><Parvati /></g>
          {dk > 0 && <g opacity={dk}><rect width={1080} height={1920} fill="#12040a" opacity={0.72} /><g transform={`translate(540,${lerp(1260, 1100, dk)}) scale(.9)`}><circle r={520} fill="url(#warm)" opacity={0.3} /><Daksha t={0} /></g></g>}
        </g>
      );
    }}</Scene>
    {/* 3 the great fire ceremony: every god invited, one seat empty */}
    <Scene i={2} t={t} cam={[540, 1060, 1.0, 540, 1180, 1.16]}>{() => {
      const ex = ease((t - wt(2, "except") + 0.1) / 0.6);
      return (
        <g><Hall t={t} /><g transform="translate(540,1300) scale(.9)"><Kund t={t} /></g>
          {[[150, 1560, 1.0], [370, 1620, 1.05], [930, 1560, 1.0]].map(([x, y, s], i) => <Guest key={i} x={x} y={y} s={s} />)}
          <g opacity={1 - 0.0 * ex}><ellipse cx={720} cy={1630} rx={110} ry={30} fill="#7a1829" stroke={GOLD} strokeWidth={6} /><circle cx={720} cy={1520} r={220} fill="url(#aura)" opacity={0.75 * ex} /></g>
          {[[60, 1760, 1.2], [300, 1820, 1.25], [560, 1800, 1.2], [840, 1820, 1.25], [1040, 1760, 1.2]].map(([x, y, s], i) => <Guest key={i} x={x} y={y} s={s} c="#0e0408" />)}
        </g>
      );
    }}</Scene>
    {/* 4 she goes anyway; the mockery; the fire */}
    <Scene i={3} t={t} cam={[540, 1040, 1.0, 540, 1100, 1.12]}>{(u, lt) => {
      const mock = t > wt(3, "her") && t < wt(3, "heartbroken"), hb = ease((t - wt(3, "heartbroken")) / 0.8), gone = ease((t - wt(3, "gave") - 0.3) / 1.6);
      return (
        <g><Hall t={t} fire={1 + gone * 0.7} />
          <g transform="translate(250,900) scale(.74)"><Daksha t={mock ? t : 0} talk={mock ? Math.abs(Math.sin(t * 9)) : 0} /></g>
          <g transform={`translate(540,1320) scale(${0.9 + gone * 0.5})`}><Kund t={t} big={1 + gone * 1.1} /></g>
          <g transform={`translate(${lerp(1200, 800, ease(lt / 1.6)) - hb * 150 * gone},${1010 + gone * 60}) scale(.95)`} opacity={1 - ease((gone - 0.35) / 0.4)}><SatiStand sad={hb} /></g>
          <rect x={-300} y={-200} width={1680} height={2400} fill="#fff1c8" opacity={0.75 * Math.sin(Math.PI * cl((gone - 0.3) / 0.7))} />
        </g>
      );
    }}</Scene>
    {/* 5 he lifts her and walks across the world */}
    <Scene i={4} t={t} cam={[540, 960, 1.0, 540, 960, 1.0]}>{(u, lt) => (
      <g><rect width={1080} height={1920} fill="url(#skyN)" /><Stars t={t} />
        <circle cx={540} cy={860} r={640} fill="url(#moon)" /><circle cx={540} cy={860} r={300} fill="#fffbe6" />
        <path d={`M${-((lt * 40) % 700)},1500 l350,-330 l350,330 l350,-330 l350,330 l350,-330 l350,330 L2200,1920 L-700,1920Z`} fill="#1a2262" />
        <path d={`M${-((lt * 110) % 900)},1640 q225,-120 450,0 t450,0 t450,0 t450,0 L2400,1920 L-900,1920Z`} fill="#0a0d2c" />
        <g transform={`translate(${lerp(380, 520, u)},1600) scale(.86)`}><Carry t={t} /></g>
        <Snow t={t} k={0.9} />
      </g>
    )}</Scene>
    {/* 6 the Tandava */}
    <Scene i={5} t={t} cam={[540, 1000, 1.0, 540, 1000, 1.14]}>{() => (
      <g transform={`translate(${Math.sin(t * 31) * 3},${Math.cos(t * 27) * 3})`}>
        <defs><linearGradient id="tsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#14040c" /><stop offset=".6" stopColor="#5a1220" /><stop offset="1" stopColor="#c8501e" /></linearGradient></defs>
        <rect x={-200} y={-200} width={1480} height={2400} fill="url(#tsky)" />
        <circle cx={540} cy={1000} r={760} fill="url(#warm)" opacity={0.5 + 0.1 * Math.sin(t * 8)} />
        <path d="M-200,1560 Q540,1480 1280,1560 L1280,2200 L-200,2200Z" fill="#0e0408" />
        {[[-1, 300], [1, 780], [-1, 620], [1, 420]].map(([s, x], i) => <path key={i} d={`M${x},1540 l${s * 30},70 l${-s * 20},50 l${s * 40},90`} stroke="#ff7a1e" strokeWidth={7} fill="none" opacity={0.5 + 0.5 * Math.abs(Math.sin(t * 5 + i))} />)}
        <g transform="translate(540,1080) scale(.92)"><Tandava t={t} /></g>
        <Snow t={t * 1.6} k={0.5} n={40} />
      </g>
    )}</Scene>
    {/* 7 the storm is spent: he sits, closes his eyes, goes still */}
    <Scene i={6} t={t} cam={[540, 1120, 1.0, 540, 1080, 1.2]}>{(u, lt) => (
      <g><Kailash t={t} /><Snow t={t} k={1 - ease(lt / 5)} />
        <g transform="translate(540,1136) scale(.82)"><Shiva t={0} eyes={t < wt(6, "closed") ? 1 : 0} mood={1 - 0.7 * ease((lt - 4) / 2.5)} smile={-0.3 + 0.4 * ease((lt - 4) / 2.5)} /></g></g>
    )}</Scene>
    {/* 8 where meditation begins */}
    <Scene i={7} t={t} dur={6} cam={[540, 1120, 1.5, 540, 1010, 1.0]}>{() => (
      <g><Kailash t={t} /><g transform="translate(540,1136) scale(.82)"><Shiva t={t} smile={0.35} /></g></g>
    )}</Scene>
  </>)}</S.Shell>
);
