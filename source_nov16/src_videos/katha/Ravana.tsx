import React from "react";
import VOJ from "./ravana.json";
import { makeStory, VOT, cl, ease, lerp, rnd, OL, GOLD, Stars, Shiva, Parvati, Kailash } from "./kit";

const S = makeStory(VOJ as VOT, [0, 1, 2, 3, 4, 5, 6, 7], 3);
export const RAVANA_FRAMES = S.FRAMES;
const { Scene, wt } = S;
const RS = "#b5774a", RD = "#8f5732";

/** one of Ravana's heads. expr: 0 smug, 1 straining, 2 squashed/dizzy, 3 singing */
const RHead: React.FC<{ expr: number; t: number; i?: number }> = ({ expr, t, i = 0 }) => (
  <g>
    <ellipse cx={-62} cy={4} rx={12} ry={18} fill={RS} stroke={OL} strokeWidth={5} /><ellipse cx={62} cy={4} rx={12} ry={18} fill={RD} stroke={OL} strokeWidth={5} />
    <circle cx={-64} cy={28} r={9} fill={GOLD} stroke={OL} strokeWidth={3} /><circle cx={64} cy={28} r={9} fill={GOLD} stroke={OL} strokeWidth={3} />
    <path d="M-58,-10 Q-60,-70 0,-72 Q60,-70 58,-10 Q58,50 0,72 Q-58,50 -58,-10Z" fill={RS} stroke={OL} strokeWidth={7} />
    <path d="M-62,-30 L-52,-112 L-26,-78 L0,-134 L26,-78 L52,-112 L62,-30 Q0,-54 -62,-30Z" fill={GOLD} stroke={OL} strokeWidth={6} strokeLinejoin="round" /><circle cx={0} cy={-66} r={9} fill="#c8102e" stroke={OL} strokeWidth={3} />
    {[-28, -19, -10].map((y) => <path key={y} d={`M-22,${y - 16} L22,${y - 16}`} stroke="#f3efe6" strokeWidth={3} strokeLinecap="round" opacity={0.8} />)}
    {expr === 0 && <><path d="M-46,-12 Q-28,-26 -10,-12 M10,-12 Q28,-26 46,-18" stroke={OL} strokeWidth={8} fill="none" strokeLinecap="round" />{[-26, 26].map((x) => <g key={x}><ellipse cx={x} cy={6} rx={13} ry={11} fill="#fff" stroke={OL} strokeWidth={4} /><circle cx={x + 3} cy={7} r={6} fill={OL} /></g>)}</>}
    {expr === 1 && <><path d="M-46,-22 L-10,-6 M10,-6 L46,-22" stroke={OL} strokeWidth={9} strokeLinecap="round" /><path d="M-40,8 Q-26,-2 -12,8 M12,8 Q26,-2 40,8" stroke={OL} strokeWidth={6} fill="none" strokeLinecap="round" /><path d={`M${50 + i % 2 * 4},${-20 + ((t * 60 + i * 13) % 50)} q8,12 0,18 q-8,-6 0,-18Z`} fill="#9fd6ff" stroke={OL} strokeWidth={2.5} /></>}
    {expr === 2 && <>{[-26, 26].map((x) => <path key={x} d={`M${x - 11},-4 L${x + 11},16 M${x + 11},-4 L${x - 11},16`} stroke={OL} strokeWidth={6} strokeLinecap="round" />)}</>}
    {expr === 3 && <path d="M-40,2 Q-26,14 -12,2 M12,2 Q26,14 40,2" stroke={OL} strokeWidth={6} fill="none" strokeLinecap="round" />}
    <path d="M0,34 Q-24,46 -50,34 Q-64,28 -66,12 Q-52,28 -34,26 Q-12,24 0,30 Q12,24 34,26 Q52,28 66,12 Q64,28 50,34 Q24,46 0,34Z" fill="#120b10" stroke={OL} strokeWidth={3} />
    {expr === 0 && <path d="M-22,48 Q0,60 26,44" stroke={OL} strokeWidth={5} fill="none" strokeLinecap="round" />}
    {expr === 1 && <g><rect x={-24} y={42} width={48} height={16} rx={5} fill="#fff" stroke={OL} strokeWidth={4} /><path d="M-12,42 l0,16 M0,42 l0,16 M12,42 l0,16" stroke={OL} strokeWidth={2.5} /></g>}
    {expr === 2 && <path d="M-20,54 q10,-10 20,0 q10,10 20,0" stroke={OL} strokeWidth={5} fill="none" strokeLinecap="round" />}
    {expr === 3 && <ellipse cx={0} cy={52} rx={15} ry={11 + 5 * Math.sin(t * 7 + i)} fill="#5a1620" stroke={OL} strokeWidth={4} />}
  </g>
);
/** the ten heads in a fan; origin = centre head */
const Heads: React.FC<{ expr: number; t: number }> = ({ expr, t }) => (
  <g>{[4, -4, 3, -3, 2, -2, 1, -1].map((k) => { const a = k * 0.21, s = 0.72 - Math.abs(k) * 0.05; return <g key={k} transform={`translate(${Math.sin(a) * 330},${-Math.cos(a) * 330 + 330 + Math.abs(k) * 6}) rotate(${k * 9}) scale(${s})`}><RHead expr={expr} t={t} i={k + 5} /></g>; })}
    <g transform="translate(-40,-108) scale(.6)"><RHead expr={expr} t={t} i={9} /></g>
    <g transform="scale(1.12)"><RHead expr={expr} t={t} /></g></g>
);
/** Ravana standing; origin = centre head. arms 0 = fan out proudly, 1 = all raised to lift */
export const Ravana: React.FC<{ expr: number; arms: number; t: number }> = ({ expr, arms, t }) => (
  <g>
    {Array.from({ length: 10 }, (_, i) => { const s = i < 5 ? -1 : 1, k = i % 5, a0 = (-38 + k * 24) * (Math.PI / 180), a1 = (60 + k * 7.5) * (Math.PI / 180), a = lerp(a0, a1, arms) + Math.sin(t * 2 + i) * 0.03 * (1 - arms), L = lerp(440, 600, arms);
      const x = s * Math.cos(a) * L, y = 190 - Math.sin(a) * L; return <g key={i}><path d={`M${s * 96},170 Q${x * 0.7},${190 - (190 - y) * 0.2} ${x},${y}`} stroke={OL} strokeWidth={54} fill="none" strokeLinecap="round" /><path d={`M${s * 96},170 Q${x * 0.7},${190 - (190 - y) * 0.2} ${x},${y}`} stroke={i % 2 ? RS : RD} strokeWidth={42} fill="none" strokeLinecap="round" /><circle cx={x} cy={y} r={30} fill={RS} stroke={OL} strokeWidth={6} /><path d={`M${x * 0.86 - 20},${y * 0.86 + 30} l40,-8`} stroke={GOLD} strokeWidth={12} strokeLinecap="round" /></g>; })}
    <path d="M-130,560 L-150,820 L-30,820 L0,640 L30,820 L150,820 L130,560Z" fill="#7a1829" stroke={OL} strokeWidth={8} strokeLinejoin="round" />
    <ellipse cx={-92} cy={830} rx={66} ry={24} fill={RD} stroke={OL} strokeWidth={6} /><ellipse cx={92} cy={830} rx={66} ry={24} fill={RD} stroke={OL} strokeWidth={6} />
    <path d="M-150,150 Q-170,110 -90,100 L90,100 Q170,110 150,150 L130,580 Q0,620 -130,580Z" fill="#c9962e" stroke={OL} strokeWidth={8} strokeLinejoin="round" />
    <path d="M-110,190 Q0,250 110,190 M-118,300 Q0,350 118,300 M-124,410 Q0,455 124,410" stroke="#8a6418" strokeWidth={8} fill="none" />
    <circle cx={0} cy={210} r={30} fill="#c8102e" stroke={OL} strokeWidth={6} /><path d="M-140,520 Q0,570 140,520 L132,580 Q0,620 -132,580Z" fill="#7a1829" stroke={OL} strokeWidth={6} />
    <rect x={-34} y={64} width={68} height={50} fill={RD} stroke={OL} strokeWidth={6} />
    <Heads expr={expr} t={t} />
  </g>
);
/** the mountain alone (so it can be lifted); origin = centre of its base, 780 wide, 780 tall */
const Peak: React.FC<{ t: number }> = ({ t }) => (
  <g>
    <path d="M-390,0 L-136,-690 Q0,-790 136,-690 L390,0Z" fill="url(#snow)" stroke="#5d72b3" strokeWidth={6} strokeLinejoin="round" />
    <path d="M0,-764 Q136,-730 136,-690 L390,0 L100,0 Q60,-380 0,-764Z" fill="#6f86c8" opacity={0.55} />
    {[-570, -430, -290, -140].map((y, i) => <path key={i} d={`M${-136 - (y + 690) * 0.37 + 30},${y} Q0,${y + 26} ${136 + (y + 690) * 0.37 - 30},${y}`} stroke="#8ea4d8" strokeWidth={7} fill="none" opacity={0.6} />)}
    <path d="M-390,0 L390,0 L340,70 Q200,110 60,80 Q-120,120 -330,74Z" fill="#4a3f5e" stroke={OL} strokeWidth={7} strokeLinejoin="round" />
    <g transform="translate(-28,-800) scale(.2)"><Shiva t={t} /></g><g transform="translate(40,-776) scale(.2)"><Parvati /></g>
  </g>
);
const Night: React.FC<{ t: number }> = ({ t }) => (
  <g><rect width={1080} height={1920} fill="url(#skyN)" /><Stars t={t} /><circle cx={860} cy={330} r={260} fill="url(#moon)" /><circle cx={860} cy={330} r={58} fill="#fffbe6" />
    <path d="M0,1380 L170,1150 L330,1300 L520,1100 L700,1290 L880,1160 L1080,1360 L1080,1700 L0,1700Z" fill="#1a2262" />
    <path d="M0,1640 Q540,1560 1080,1640 L1080,1920 L0,1920Z" fill="url(#ledge)" /></g>
);
const Note: React.FC<{ x: number; y: number; s: number; o: number }> = ({ x, y, s, o }) => (
  <g transform={`translate(${x},${y}) scale(${s})`} opacity={o}><circle r={46} fill="url(#kglow)" opacity={0.7} /><ellipse cx={-8} cy={10} rx={13} ry={10} fill={GOLD} transform="rotate(-20 -8 10)" /><path d="M4,8 L4,-34 Q22,-30 22,-12" stroke={GOLD} strokeWidth={5} fill="none" strokeLinecap="round" /></g>
);

export const RavanaEp: React.FC<{ audio?: boolean }> = ({ audio }) => (
  <S.Shell audio={audio} mix="katha/ravana.wav" tagline="Devotion moves mountains.">{(t) => (<>
    {/* 1 hook: the mountain in the air, Shiva still on it */}
    <Scene i={0} t={t} cam={[540, 800, 1.5, 540, 1010, 1.0]}>{() => (
      <g><Night t={t} />
        <g transform={`translate(540,${1010 + Math.sin(t * 1.4) * 8}) rotate(${Math.sin(t * 1.1) * 2.2}) scale(.8)`}><Peak t={t} /></g>
        <g transform="translate(540,1290) scale(.6)"><Ravana expr={1} arms={1} t={t} /></g>
      </g>
    )}</Scene>
    {/* 2 ten heads, twenty arms, one ego */}
    <Scene i={1} t={t} cam={[540, 1080, 1.0, 540, 1000, 1.16]}>{(u, lt) => (
      <g><rect width={1080} height={1920} fill="url(#skyN)" /><Stars t={t} /><circle cx={540} cy={980} r={640} fill="url(#warm)" opacity={0.3} />
        <path d="M0,1700 Q540,1620 1080,1700 L1080,1920 L0,1920Z" fill="#2a1a3a" />
        <g transform={`translate(540,${960 + Math.sin(t * 2) * 5}) scale(${0.92 + 0.05 * ease(lt / 1.2)})`}><Ravana expr={0} arms={0} t={t} /></g>
      </g>
    )}</Scene>
    {/* 3 he slides his arms under Kailash and lifts */}
    <Scene i={2} t={t} cam={[540, 1040, 1.0, 540, 960, 1.06]}>{() => {
      const up = ease((t - wt(2, "lifted") + 0.9) / 1.6);
      return (
        <g><Night t={t} />
          <g transform={`translate(540,${lerp(1500, 1040, up) + (up > 0 && up < 1 ? Math.sin(t * 40) * 4 : 0)}) rotate(${up * 3}) scale(.8)`}><Peak t={t} /></g>
          <path d="M0,1640 Q540,1560 1080,1640 L1080,1920 L0,1920Z" fill="url(#ledge)" />
          <g transform={`translate(540,${lerp(1840, 1320, up)}) scale(.6)`}><Ravana expr={1} arms={1} t={t} /></g>
        </g>
      );
    }}</Scene>
    {/* 4 on the summit: the world tilts, Parvati holds on, Shiva does not open his eyes */}
    <Scene i={3} t={t} cam={[540, 1120, 1.0, 560, 1160, 1.1]}>{(u, lt) => {
      const tilt = Math.sin(t * 5) * 3.2 * (1 - 0.3 * u) + 4, hold = ease((t - wt(3, "parvati")) / 0.6);
      return (
        <g transform={`rotate(${tilt} 540 1500)`}><rect x={-300} y={-300} width={1700} height={2600} fill="url(#skyN)" /><Stars t={t} />
          <path d="M-300,1520 Q300,1430 540,1450 Q800,1430 1400,1520 L1400,2300 L-300,2300Z" fill="url(#ledge)" />
          {Array.from({ length: 12 }, (_, i) => <circle key={i} cx={(rnd(i) * 1080 + t * 240 * (0.5 + rnd(i + 2))) % 1200 - 60} cy={1440 - rnd(i + 5) * 300 + Math.sin(t * 3 + i) * 20} r={6 + rnd(i + 8) * 9} fill="#eef4ff" opacity={0.7} />)}
          <g transform="translate(470,1130) scale(.82)"><Shiva t={t} smile={0.25} /></g>
          <g transform={`translate(${lerp(880, 752, hold)},${1262 - hold * 8}) rotate(${-10 * hold}) scale(.82)`}><Parvati /></g>
        </g>
      );
    }}</Scene>
    {/* 5 one toe */}
    <Scene i={4} t={t} cam={[540, 1100, 1.0, 540, 1180, 1.22]}>{() => {
      const pr = ease((t - wt(4, "pressed")) / 0.5), ring = cl((t - wt(4, "pressed") - 0.3) / 1.6);
      return (
        <g><rect width={1080} height={1920} fill="url(#skyN)" /><Stars t={t} />
          <path d="M0,1400 Q540,1340 1080,1400 L1080,1920 L0,1920Z" fill="url(#ledge)" /><path d="M0,1400 Q540,1340 1080,1400" stroke="#f4f8ff" strokeWidth={8} fill="none" />
          {ring > 0 && <ellipse cx={600} cy={1380} rx={80 + ring * 760} ry={20 + ring * 150} fill="none" stroke={GOLD} strokeWidth={10 * (1 - ring)} opacity={1 - ring} />}
          {pr > 0.6 && [[-150, 60], [-60, 110], [70, 120], [170, 50]].map(([dx, dy], i) => <path key={i} d={`M600,1384 l${dx * 0.4},${dy * 0.4} l${dx * 0.25 - 14},${dy * 0.3} l${dx * 0.35},${dy * 0.3}`} stroke="#5d72b3" strokeWidth={6} fill="none" strokeLinecap="round" opacity={cl((pr - 0.6) * 4)} />)}
          <g transform={`translate(420,${lerp(1150, 1218, pr)})`}>
            <path d="M-60,-620 L-90,-120 Q-100,-10 10,10 L250,20 Q320,24 318,90 L320,150 Q150,176 -150,150 Q-250,120 -230,-40 L-200,-620Z" fill="url(#skinS)" stroke={OL} strokeWidth={10} strokeLinejoin="round" />
            <path d="M-222,-250 Q-150,-220 -78,-250 M-226,-200 Q-150,-170 -84,-200" stroke={GOLD} strokeWidth={16} fill="none" /><circle cx={-150} cy={-196} r={13} fill={GOLD} stroke={OL} strokeWidth={4} />
            <path d="M130,24 Q150,100 136,164 M30,16 Q46,96 34,170" stroke="#4a6aa8" strokeWidth={5} fill="none" opacity={0.6} />
            {[[236, 34], [204, 24], [172, 18], [142, 14]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y + 40} rx={30} ry={44} fill="url(#skinS)" stroke={OL} strokeWidth={8} />)}
            <path d="M232,40 Q330,30 330,96 Q332,160 240,164 Q200,100 232,40Z" fill="#a3c6f2" stroke={OL} strokeWidth={9} /><path d="M286,60 Q316,64 314,96" stroke="#eaf3ff" strokeWidth={10} fill="none" strokeLinecap="round" />
          </g>
        </g>
      );
    }}</Scene>
    {/* 6 pinned for a thousand years; then he sings */}
    <Scene i={5} t={t} cam={[540, 1240, 1.25, 540, 1160, 1.1]}>{(u, lt) => {
      const sing = t > wt(5, "sang") - 0.5, ts = t - wt(5, "sang") + 0.5;
      return (
        <g><Night t={t} />
          {Array.from({ length: 12 }, (_, i) => { const a = lt * 0.5 + i; return <circle key={i} cx={(i * 97 + lt * 30) % 1080} cy={300 + rnd(i) * 500} r={2} fill="#fff" opacity={0.2} />; })}
          <g transform="translate(540,1480) scale(1.05)"><Peak t={t} /></g>
          {[-1, 1].map((sx) => <g key={sx} transform={`translate(${540 + sx * 330},1600)`}><ellipse rx={70} ry={30} fill={RS} stroke={OL} strokeWidth={7} />{[-30, 0, 30].map((x) => <path key={x} d={`M${x},-26 l0,22`} stroke={OL} strokeWidth={5} />)}</g>)}
          <g transform="translate(540,1610) scale(.6)"><Heads expr={sing ? 3 : 2} t={t} /></g>
          {sing && Array.from({ length: 7 }, (_, i) => { const p = (ts * 0.22 + i / 7) % 1; return <Note key={i} x={540 + Math.sin(p * 9 + i * 2) * 170} y={1440 - p * 900} s={1.1 + rnd(i) * 0.5} o={Math.sin(Math.PI * p) * cl(ts)} />; })}
        </g>
      );
    }}</Scene>
    {/* 7 the song reaches the summit; Shiva smiles and sets him free */}
    <Scene i={6} t={t} cam={[540, 1060, 1.0, 540, 1120, 1.1]}>{(u, lt) => {
      const free = ease((t - wt(6, "set")) / 1.2);
      return (
        <g><rect width={1080} height={1920} fill="url(#skyN)" /><Stars t={t} />
          <path d="M0,1500 Q300,1416 540,1440 Q800,1416 1080,1500 L1080,1920 L0,1920Z" fill="url(#ledge)" />
          {Array.from({ length: 8 }, (_, i) => { const p = (t * 0.2 + i / 8) % 1; return <Note key={i} x={120 + rnd(i) * 840 + Math.sin(p * 8 + i) * 50} y={1800 - p * 1200} s={1 + rnd(i + 4) * 0.5} o={Math.sin(Math.PI * p) * (1 - free * 0.6)} />; })}
          <g transform="translate(400,1100) scale(.84)"><Shiva t={t} smile={1} eyes={1} bless={free} /></g>
          <g transform={`translate(820,${lerp(1900, 1330, free)}) scale(.36)`}><Ravana expr={3} arms={1} t={t} /></g>
        </g>
      );
    }}</Scene>
    {/* 8 the mountain is still again */}
    <Scene i={7} t={t} dur={5} cam={[600, 1130, 1.6, 540, 1010, 1.0]}>{() => (
      <g><Kailash t={t} /><g transform="translate(540,1130) scale(.8)"><Shiva t={t} smile={0.5} /></g></g>
    )}</Scene>
  </>)}</S.Shell>
);
