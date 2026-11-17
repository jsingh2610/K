// THE BLUE THROAT (Neelakantha). Story 4 of the Kailasa Book. Cold-open hook, cast rig, Nandi cameo, hidden face.
import React from "react";
import VOJ from "./blue_throat.json";
import { makeStory, VOT, cl, ease, lerp, rnd, mix, OL, GOLD, Stars, ShivaHead, KFace } from "./kit";
import { Fig, FigP, ArmP, Mood } from "../cast/rig";
import { Nandi, Halahala } from "../cast/beasts";

const VO = VOJ as VOT;
const S = makeStory(VO, [0, 2, 4, 6, 7, 8, 9], 8);
export const BLUETHROAT_FRAMES = S.FRAMES;
const { Scene, LT } = S;
const P = (li: number, pi: number) => VO.lines[li].parts![pi].t;
const ST7 = { stroke: OL, strokeWidth: 7, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
const A = (s: 1 | -1, pose: ArmP["pose"], prop?: string, back?: boolean, rot?: number): ArmP => ({ s, pose, prop, back, rot });
const at = (x: number, y: number, s: number, node: React.ReactNode, rot = 0) => <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>{node}</g>;
const GRAD = (
  <defs>
    <linearGradient id="milk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#c4f0e8" /><stop offset="1" stopColor="#4a98a8" /></linearGradient>
    <radialGradient id="pglow"><stop offset="0" stopColor="#d9c2ff" stopOpacity="1" /><stop offset=".4" stopColor="#7a3af0" stopOpacity=".65" /><stop offset="1" stopColor="#7a3af0" stopOpacity="0" /></radialGradient>
  </defs>
);
const Waves: React.FC<{ t: number; y0: number; rows: number; gap?: number }> = ({ t, y0, rows, gap = 104 }) => (
  <g>{Array.from({ length: rows }, (_, r) => { const y = y0 + r * gap, off = ((t * 16 * (r % 2 ? 1 : -1)) % 190) + (r % 2) * 95; return (
    <g key={r} opacity={0.5}>{Array.from({ length: 9 }, (_, i) => <path key={i} d={`M${-190 + i * 190 + off},${y} q46,-17 92,0`} stroke="#f2fffb" strokeWidth={5.5} fill="none" strokeLinecap="round" />)}</g>); })}</g>
);
const Sky: React.FC<{ t: number; day?: number; moon?: number }> = ({ t, day = 0, moon = 1 }) => (
  <g>{GRAD}
    <rect width={1080} height={1920} fill="url(#skyN)" /><g opacity={1 - day}><Stars t={t} n={70} h={960} /></g><rect width={1080} height={1920} fill="url(#skyD)" opacity={day} />
    <g opacity={moon * (1 - day)}><circle cx={850} cy={660} r={230} fill="url(#moon)" /><circle cx={850} cy={660} r={52} fill="#fffbe6" /></g>
  </g>
);

// ---------------------------------------------------------------- the ocean of milk, Mount Mandara, Vasuki as the rope
const mw = (y: number) => 70 + (y - 640) * 0.245; // half-width of the mountain at height y
const Ocean: React.FC<{ t: number; day?: number; dark?: number; sway?: number; moon?: number; face?: number }> = ({ t, day = 0, dark = 0, sway = 0, moon = 1, face = 0 }) => (
  <g>
    <Sky t={t} day={day} moon={moon * (1 - dark)} />
    <rect y={1000} width={1080} height={920} fill="url(#milk)" /><path d="M0,1000 L1080,1000" stroke="#f2fffb" strokeWidth={5} opacity={0.6} />
    <rect y={1000} width={1080} height={920} fill="#1a0a33" opacity={0.42 * dark} />
    <ellipse cx={540} cy={1330} rx={560 * dark} ry={280 * dark} fill="#2a0f4a" opacity={0.8 * dark} />
    <Waves t={t} y0={1050} rows={8} />
    {/* the face that guards every door, hidden in the foam */}
    {face > 0 && <g transform="translate(540,1640) scale(.24)" opacity={0.2 * face}><KFace t={t} glow={0} calm={1} /></g>}
    {/* Mandara */}
    <path d="M330,1210 Q350,900 470,640 Q540,560 610,640 Q730,900 750,1210 Q540,1250 330,1210Z" fill="#8a5a3a" {...ST7} />
    <path d="M560,578 Q610,600 610,640 Q730,900 750,1210 Q660,1232 600,1236 Q650,900 560,578Z" fill="#000" opacity={0.22} />
    {[[430, 1150], [520, 1010], [470, 860], [560, 1160], [600, 900]].map(([x, y], i) => <path key={i} d={`M${x + sway * 16},${y} q18,-60 44,-110`} stroke={OL} strokeWidth={5} fill="none" opacity={0.28} strokeLinecap="round" />)}
    {[1050, 900, 760].map((y0, i) => { const y = y0 + sway * 10 * (i % 2 ? -1 : 1), d = `M${540 - mw(y + 30) - 14},${y + 30} Q540,${y + 74} ${540 + mw(y - 40) + 14},${y - 40}`; return (
      <g key={i}><path d={d} stroke={OL} strokeWidth={50} fill="none" strokeLinecap="round" /><path d={d} stroke="#3f8a55" strokeWidth={37} fill="none" strokeLinecap="round" /><path d={d} stroke="#d7e9a8" strokeWidth={10} fill="none" strokeLinecap="round" opacity={0.75} /></g>); })}
    {Array.from({ length: 8 }, (_, i) => <circle key={i} cx={350 + i * 54} cy={1216 + Math.sin(t * 2 + i) * 6 + Math.sin((i / 7) * Math.PI) * 18} r={34 + (i % 2) * 6} fill="#f4fffb" opacity={0.92} />)}
    {/* the two banks */}
    <path d="M0,1470 Q170,1430 330,1520 Q420,1580 430,1920 L0,1920Z" fill="#2c2458" /><path d="M0,1470 Q170,1430 330,1520 Q420,1580 430,1920" stroke="#5d5aa0" strokeWidth={7} fill="none" />
    <path d="M1080,1470 Q910,1430 750,1520 Q660,1580 650,1920 L1080,1920Z" fill="#2c2458" /><path d="M1080,1470 Q910,1430 750,1520 Q660,1580 650,1920" stroke="#5d5aa0" strokeWidth={7} fill="none" />
  </g>
);
/** the free ends of Vasuki. dx = how far the rope has been pulled; drop = let go */
const Rope: React.FC<{ t: number; dx?: number; drop?: number }> = ({ t, dx = 0, drop = 0 }) => {
  const hy = lerp(1421, 1300, drop), lx1 = lerp(272 + dx, 330, drop), lx2 = lerp(132 + dx, 250, drop), rx1 = lerp(808 + dx, 760, drop), rx2 = lerp(948 + dx, 840, drop);
  const L = `M${540 - mw(1080) - 14},1082 Q${lerp(300, 320, drop)},${lerp(1310, 1240, drop)} ${lx1},${hy} L${lx2},${hy}`, R = `M${540 + mw(720) + 14},722 Q${lerp(800, 740, drop)},${lerp(1080, 1100, drop)} ${rx1},${hy} L${rx2},${hy}`;
  const hx = lx2 - 70, hyy = hy - 26 + Math.sin(t * 3) * 4;
  return (
    <g>
      {[L, R].map((d, i) => <g key={i}><path d={d} stroke={OL} strokeWidth={46} fill="none" strokeLinecap="round" strokeLinejoin="round" /><path d={d} stroke="#3f8a55" strokeWidth={33} fill="none" strokeLinecap="round" strokeLinejoin="round" /><path d={d} stroke="#d7e9a8" strokeWidth={9} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={0.75} /></g>)}
      {/* head (the asuras' end) and tail */}
      <path d={`M${lx2},${hy} Q${lx2 - 30},${hy} ${hx + 20},${hyy + 16}`} stroke={OL} strokeWidth={46} fill="none" strokeLinecap="round" /><path d={`M${lx2},${hy} Q${lx2 - 30},${hy} ${hx + 20},${hyy + 16}`} stroke="#3f8a55" strokeWidth={33} fill="none" strokeLinecap="round" />
      <g transform={`translate(${hx},${hyy})`}><ellipse rx={52} ry={44} fill="#3f8a55" {...ST7} strokeWidth={6} /><ellipse cx={-4} cy={6} rx={30} ry={24} fill="#4c9c62" stroke={OL} strokeWidth={4} />{[-16, 10].map((x) => <g key={x}><ellipse cx={x} cy={0} rx={7} ry={9} fill="#ffe07a" stroke={OL} strokeWidth={3} /><ellipse cx={x} cy={0} rx={2} ry={6} fill={OL} /></g>)}<circle cx={-2} cy={-30} r={7} fill="#d61f3a" stroke={OL} strokeWidth={3} /></g>
      <path d={`M${rx2},${hy} Q${rx2 + 50},${hy + 4} ${rx2 + 86},${hy + 30}`} stroke={OL} strokeWidth={30} fill="none" strokeLinecap="round" /><path d={`M${rx2},${hy} Q${rx2 + 50},${hy + 4} ${rx2 + 86},${hy + 30}`} stroke="#3f8a55" strokeWidth={18} fill="none" strokeLinecap="round" />
    </g>
  );
};
const Asura: React.FC<{ t: number; m: Mood; arms: ArmP[]; v?: number }> = ({ t, m, arms, v = 0 }) => (
  <Fig t={t} mood={m} skin={v ? "#8a4a7a" : "#b8452e"} shade={v ? "#6a2f5c" : "#8a2a20"} hair="wild" hairCol="#2a0d10" crown="horns" crownCol={GOLD} fangs mous beardCol="#2a0d10" belly top={v ? "#3a6a5a" : "#b8802a"} lower={{ kind: "dhoti", col: "#2a0d10", border: GOLD }} neck={["gold"]} armlets arms={arms} />
);
const Deva: React.FC<{ t: number; m: Mood; arms: ArmP[]; v?: number }> = ({ t, m, arms, v = 0 }) => v
  ? <Fig t={t} mood={m} skin="#6f8fe0" shade="#5372c4" hair="short" crown="kirita" crownCol={GOLD} mark="tilakU" lower={{ kind: "dhoti", col: "#f2c230", border: "#b8802a" }} neck={["gold", "flower"]} armlets arms={arms} />
  : <Fig t={t} mood={m} skin="#f2c79a" shade="#dba878" hair="short" crown="kirita" crownCol={GOLD} mous lower={{ kind: "dhoti", col: "#fffaf0", border: GOLD }} sash="#3f6fd0" neck={["gold", "pearl"]} armlets arms={arms} />;
const FK = 0.36, FY = 1340; // bank figures: scale and head height
const BANK = [110, 250, 830, 970];

// ---------------------------------------------------------------- the shore where he drinks
const Shore: React.FC<{ t: number; tint?: number; moon?: number }> = ({ t, tint = 0, moon = 1 }) => (
  <g>
    <Sky t={t} moon={moon} />
    <rect y={1000} width={1080} height={640} fill="url(#milk)" /><path d="M0,1000 L1080,1000" stroke="#f2fffb" strokeWidth={5} opacity={0.6} />
    <Waves t={t} y0={1050} rows={6} gap={96} />
    <rect width={1080} height={1640} fill="#3a1466" opacity={tint} />
    <path d="M0,1600 Q300,1540 540,1580 Q800,1620 1080,1570 L1080,1920 L0,1920Z" fill="#2c2458" /><path d="M0,1600 Q300,1540 540,1580 Q800,1620 1080,1570" stroke="#5d5aa0" strokeWidth={7} fill="none" />
    {[[120, 1700], [420, 1780], [760, 1690], [940, 1820], [260, 1860]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx={60} ry={12} fill="#3a3270" opacity={0.7} />)}
  </g>
);
type SP = { t: number; d?: number; rest?: number; blob?: number; throat?: number; glow?: number; pulse?: number; core?: number; snake?: number; smile?: number; lap?: boolean; bless?: boolean };
/** Shiva, seated, with a throat you can see. d: right hand 0 = held out, 1 = at his lips. rest: hand back to the lap. */
const Sh: React.FC<SP> = ({ t, d = 0, rest = 0, blob = 0, throat = 0, glow = 0, pulse = 1, core = 0, snake = 0, smile = 0.3, lap, bless }) => {
  const hx = lerp(lerp(298, 72, d), 44, rest), hy = lerp(lerp(176, 44, d), 336, rest), cx = lerp(lerp(214, 226, d), 172, rest), cy = lerp(lerp(150, 236, d), 276, rest);
  const arm = `M116,160 Q${cx},${cy} ${hx},${hy}`, pu = 0.5 + 0.5 * Math.sin(t * 3.2);
  return (
    <Fig t={t} skin="#8db6ea" shade="#6f97d2" pose="sit" headBack={<g />} head={<g transform="translate(0,-30)"><ShivaHead smile={smile} /></g>} neck={["rudra"]} lower={{ kind: "tiger", col: "#e08a2a" }} aura="aura"
      arms={lap ? [A(-1, "lap"), A(1, bless ? "bless" : "lap")] : [A(-1, "lap")]}
      mid={<g>
        {glow > 0 && <circle cx={0} cy={98} r={150} fill="url(#pglow)" opacity={glow * (0.55 + 0.3 * pulse * pu)} />}
        <rect x={-30} y={50} width={60} height={76} fill={mix("#6f97d2", "#1f2f9a", throat)} stroke={OL} strokeWidth={6} />
        {glow > 0 && <ellipse cx={0} cy={100 + core} rx={14} ry={19} fill="#d9c2ff" stroke="#7a3af0" strokeWidth={4} opacity={glow * (0.55 + 0.4 * pulse * pu)} />}
        {snake > 0 && <g opacity={snake}><path d="M-60,138 Q0,196 60,138" stroke={OL} strokeWidth={26} fill="none" strokeLinecap="round" /><path d="M-60,138 Q0,196 60,138" stroke="#3f8a55" strokeWidth={16} fill="none" strokeLinecap="round" /><ellipse cx={70} cy={128} rx={17} ry={12} fill="#3f8a55" stroke={OL} strokeWidth={5} /><circle cx={76} cy={125} r={3} fill="#ffe07a" /></g>}
      </g>}
      front={lap ? undefined : <g>
        <path d={arm} stroke={OL} strokeWidth={54} fill="none" strokeLinecap="round" /><path d={arm} stroke="#6f97d2" strokeWidth={42} fill="none" strokeLinecap="round" />
        <ellipse cx={hx} cy={hy} rx={36} ry={27} fill="#6f97d2" stroke={OL} strokeWidth={6} transform={`rotate(${lerp(0, -18, d)} ${hx} ${hy})`} />
        {blob > 0 && <g><circle cx={hx - 2} cy={hy - 14} r={44 * blob} fill="url(#pglow)" opacity={0.9} /><circle cx={hx - 2} cy={hy - 12} r={17 * blob} fill="#3a1466" stroke="#7a3af0" strokeWidth={4} /></g>}
      </g>} />
  );
};
const Pv: React.FC<{ t: number; m: Mood; arms: ArmP[]; sit?: boolean }> = ({ t, m, arms, sit }) => (
  <Fig t={t} mood={m} skin="#f3c486" shade="#dea463" female hair="bun" crown="tiara" crownCol={GOLD} mark="bindi" pose={sit ? "sit" : "stand"} lower={{ kind: "sari", col: "#c8284a", border: GOLD }} top="#a81f3c" neck={["gold", "pearl"]} armlets anklets arms={arms} />
);
const SK = 0.85, SY = 1580 - 440 * SK; // seated figure scale and head height on the shore

export const BlueThroat: React.FC<{ audio?: boolean }> = ({ audio }) => (
  <S.Shell audio={audio} mix="katha/blue_throat.wav" tagline="Hold it. Do not swallow it." hook={{ text: "Why is Shiva's *throat *blue?" }}>{(t) => (<>
    {/* 0 THE HOOK: he is drinking it, and the throat is already glowing */}
    <Scene i={0} t={t} cam={[540, 1182, 1.3, 520, 1250, 1.72]}>{(u, lt) => {
      const K = 0.9, X = 500, Y = 1580 - 440 * K, px = X + 72 * K, py = Y + 30 * K, trap = ease((t - LT[1] + 0.2) / 0.8);
      return (
        <g><Shore t={t} tint={0.3} moon={0.5} />
          {at(940, 1360, 0.56, <Halahala t={t} />)}
          {(() => { const d = `M850,1210 Q${720 + Math.sin(t * 2) * 10},${1130 + Math.sin(t * 2.6) * 12} ${px + 6},${py - 4}`; return (<g opacity={1 - 0.75 * trap}>
            <path d={d} stroke="#7a3af0" strokeWidth={34} fill="none" strokeLinecap="round" opacity={0.5} /><path d={d} stroke="#2a0f4a" strokeWidth={22} fill="none" strokeLinecap="round" />
            {Array.from({ length: 9 }, (_, i) => { const q = (t * 0.9 + i / 9) % 1, a = 1 - q, bx = a * a * 850 + 2 * a * q * 720 + q * q * (px + 6), by = a * a * 1210 + 2 * a * q * 1130 + q * q * (py - 4); return <circle key={i} cx={bx} cy={by + (rnd(i) - 0.5) * 10} r={6 + rnd(i + 3) * 5} fill="#b48cff" opacity={0.85 * Math.sin(q * Math.PI)} />; })}
          </g>); })()}
          {at(X, Y, K, <Sh t={t} d={1} blob={1 - 0.7 * trap} throat={0.55 + 0.45 * trap} glow={1} core={lerp(-34, 0, (t * 0.9) % 1) * (1 - trap)} />)}
        </g>
      );
    }}</Scene>

    {/* 1 the churning: gods on one bank, demons on the other, the serpent for a rope */}
    <Scene i={1} t={t} dur={4.2} cam={[540, 1040, 1.34, 540, 960, 1.0]}>{() => {
      const sw = Math.sin(t * 2.4), k = t - LT[3], day = k > 0 && k < 2.4 ? Math.pow(Math.sin((k / 2.4) * Math.PI * 2), 2) : 0;
      return (
        <g><Ocean t={t} sway={sw} day={day * 0.9} />
          <Rope t={t} dx={sw * 16} />
          {BANK.map((x, i) => at(x + sw * 16, FY + Math.abs(Math.sin(t * 2.4 + i)) * -5, FK, i < 2 ? <Asura key={i} t={t} m="fierce" v={i} arms={[A(-1, "fwd"), A(1, "fwd")]} /> : <Deva key={i} t={t} m="open" v={i - 2} arms={[A(-1, "fwd"), A(1, "fwd")]} />, sw * (i < 2 ? -5 : 5)))}
        </g>
      );
    }}</Scene>

    {/* 2 TURN: the sea goes dark. Poison rises first */}
    <Scene i={2} t={t} cam={[540, 960, 1.0, 540, 1120, 1.28]}>{() => {
      const dark = ease((t - LT[4]) / 2.4), up = ease((t - P(5, 0) + 0.25) / 1.5), big = ease((t - P(5, 2)) / 2.2), sw = Math.sin(t * 2.4) * (1 - dark), drop = ease((t - P(5, 0) - 0.3) / 0.7);
      return (
        <g><Ocean t={t} sway={sw} dark={dark} face={1} />
          {Array.from({ length: 12 }, (_, i) => { const q = (t * 0.6 + rnd(i)) % 1; return <circle key={i} cx={420 + rnd(i + 5) * 240} cy={1420 - q * 150} r={8 + rnd(i + 2) * 12} fill="none" stroke="#b48cff" strokeWidth={4} opacity={dark * (1 - up) * Math.sin(q * Math.PI)} />; })}
          <Rope t={t} dx={sw * 16} drop={drop} />
          <clipPath id="rise"><rect x={0} y={0} width={1080} height={1330} /></clipPath>
          <g clipPath="url(#rise)">{up > 0 && at(540, lerp(1900, 1330, up), 1.45 + 0.3 * big, <Halahala t={t} />)}</g>
          {up > 0 && Array.from({ length: 9 }, (_, i) => <circle key={i} cx={300 + i * 60} cy={1334 + Math.sin(t * 3 + i) * 6} r={30 + (i % 2) * 8} fill="#cbb6f2" opacity={0.85 * up} />)}
          <rect width={1080} height={1920} fill="#3a1466" opacity={0.22 * big} />
          {BANK.map((x, i) => at(x + sw * 16, FY, FK, i < 2 ? <Asura key={i} t={t} m={drop > 0.3 ? "awe" : "fierce"} v={i} arms={drop > 0.3 ? [A(-1, "up"), A(1, "up")] : [A(-1, "fwd"), A(1, "fwd")]} /> : <Deva key={i} t={t} m={drop > 0.3 ? "awe" : "open"} v={i - 2} arms={drop > 0.3 ? [A(-1, "up"), A(1, "up")] : [A(-1, "fwd"), A(1, "fwd")]} />))}
        </g>
      );
    }}</Scene>

    {/* 3 everybody runs. Only a crown is left, rolling */}
    <Scene i={3} t={t} cam={[540, 1120, 1.28, 540, 960, 1.0]}>{() => {
      const g = ease((t - P(6, 0) - 0.1) / 1.3), a = ease((t - P(6, 0) - 1.2) / 1.3), roll = cl((t - P(6, 0) - 0.9) / 3.2);
      return (
        <g><Ocean t={t} dark={1} face={1} />
          <Rope t={t} drop={1} />
          <clipPath id="rise2"><rect x={0} y={0} width={1080} height={1330} /></clipPath>
          <g clipPath="url(#rise2)">{at(540, 1330, 1.75 + 0.12 * Math.sin(t * 1.3), <Halahala t={t} />)}</g>
          {Array.from({ length: 9 }, (_, i) => <circle key={i} cx={300 + i * 60} cy={1334 + Math.sin(t * 3 + i) * 6} r={30 + (i % 2) * 8} fill="#cbb6f2" opacity={0.85} />)}
          <rect width={1080} height={1920} fill="#3a1466" opacity={0.22} />
          {BANK.map((x, i) => { const r = i < 2 ? a : g, dx = (i < 2 ? -1 : 1) * 460 * r; return r < 1 ? at(x + dx, FY - Math.abs(Math.sin(t * 11 + i)) * 14 * (r > 0 ? 1 : 0), FK, i < 2 ? <Asura key={i} t={t} m="awe" v={i} arms={[A(-1, "up"), A(1, "up")]} /> : <Deva key={i} t={t} m="awe" v={i - 2} arms={[A(-1, "up"), A(1, "up")]} />, (i < 2 ? -8 : 8) * (r > 0 ? 1 : 0)) : null; })}
          {roll > 0 && <g transform={`translate(${lerp(980, 800, ease(roll))},${1530 - Math.abs(Math.sin(roll * 7)) * 30 * (1 - roll)}) rotate(${-roll * 500}) scale(.55)`}><g transform="translate(0,190)"><path d="M-80,-104 L-66,-246 Q0,-304 66,-246 L80,-104 Q0,-132 -80,-104Z" fill={GOLD} {...ST7} /><path d="M-72,-150 Q0,-176 72,-150 M-68,-200 Q0,-226 68,-200" stroke="#b8802a" strokeWidth={6} fill="none" /><circle cx={0} cy={-136} r={13} fill="#d61f3a" stroke={OL} strokeWidth={4} /></g></g>}
        </g>
      );
    }}</Scene>

    {/* 4 Shiva gathers it into his palm, and drinks. Nandi cannot look */}
    <Scene i={4} t={t} cam={[540, 1085, 1.15, 500, 1230, 1.4]}>{() => {
      const X = 450, g = ease((t - P(7, 0) - 0.1) / 1.7), d = ease((t - P(7, 1) + 0.15) / 0.6), gl = ease((t - P(7, 1) - 0.4) / 0.6), px = X + 298 * SK, py = SY + 176 * SK, sc = lerp(1.0, 0.1, g);
      return (
        <g><Shore t={t} tint={0.34 * (1 - g)} moon={g} />
          <g transform={`translate(112,1606) scale(.5)`}><Nandi t={t} mood="sad" sit /></g>
          {at(X, SY, SK, <Sh t={t} d={d} blob={cl((g - 0.8) * 5)} throat={0.5 * gl} glow={gl} />)}
          <g opacity={1 - cl((g - 0.82) / 0.18)}>{at(lerp(880, px, g), lerp(1520, py + 230 * sc, g), sc, <Halahala t={t} />)}</g>
        </g>
      );
    }}</Scene>

    {/* 5 Parvati's hands. Not down. Not out. */}
    <Scene i={5} t={t} cam={[540, 1182, 1.3, 545, 1265, 1.6]}>{() => {
      const X = 400, PX = 705, PY = 1580 - 440 * 0.8, PK = 0.8, inn = ease((t - LT[8] + 0.35) / 0.6), reach = ease((t - LT[8] - 0.15) / 0.6), rest = ease((t - LT[8] + 0.3) / 0.5);
      const dn = Math.sin(cl((t - P(8, 1) - 0.1) / 1.7) * Math.PI), upk = Math.sin(cl((t - P(8, 2) - 0.1) / 1.9) * Math.PI), hold = ease((t - P(8, 0) - 0.6) / 1.2);
      const px = lerp(1250, PX, inn), sx = px - 97 * PK, sy = PY + 168 * PK, nx = X + 30 * SK, ny = SY + 100 * SK;
      const near = `M${sx},${sy} Q${lerp(sx - 40, (sx + nx) / 2 + 30, reach)},${lerp(sy + 90, sy + 70, reach)} ${lerp(sx - 30, nx + 12, reach)},${lerp(sy + 130, ny, reach)}`, far = `M${sx + 8},${sy - 18} L${lerp(sx - 20, X + 70 * SK, reach)},${lerp(sy + 40, SY + 128 * SK, reach)}`;
      return (
        <g><Shore t={t} />
          {at(px, PY, PK, <Pv t={t} sit m={t < P(8, 1) ? "awe" : "open"} arms={[]} />)}
          <g opacity={reach}><path d={far} stroke={OL} strokeWidth={32} fill="none" strokeLinecap="round" /><path d={far} stroke="#dea463" strokeWidth={22} fill="none" strokeLinecap="round" /></g>
          {at(X, SY, SK, <Sh t={t} d={1} rest={rest} blob={0} throat={0.5 + 0.5 * hold} glow={1} core={46 * dn - 34 * upk} />)}
          <path d={near} stroke={OL} strokeWidth={32} fill="none" strokeLinecap="round" /><path d={near} stroke="#f3c486" strokeWidth={22} fill="none" strokeLinecap="round" />
          
          <ellipse cx={lerp(sx - 30, nx + 4, reach)} cy={lerp(sy + 130, ny, reach)} rx={21} ry={26} fill="#f3c486" stroke={OL} strokeWidth={5} />
          {/* the fingers of her other hand, round the far side of his neck */}
          <g opacity={reach}>{[-10, 4, 18].map((y) => <ellipse key={y} cx={X - 30 * SK} cy={ny + y * 1.3 - 4} rx={15} ry={8.5} fill="#f3c486" stroke={OL} strokeWidth={4} />)}</g>
        </g>
      );
    }}</Scene>

    {/* 6 it stays there. Vasuki settles, the moon comes out, Nandi opens his eyes */}
    <Scene i={6} t={t} dur={9.5} cam={[540, 1260, 1.8, 540, 960, 1.0]}>{() => {
      const sn = ease((t - P(9, 2)) / 1.2), joy = t > P(9, 1) + 0.3, bl = t > P(10, 2) - 0.2;
      return (
        <g><Shore t={t} />
          <g transform={`translate(150,1606) scale(.55)`}><Nandi t={t} mood={joy ? "joy" : "sad"} sit /></g>
          {at(880, 1580 - 440 * 0.8, 0.8, <Pv t={t} sit m="joy" arms={[A(-1, "namaste"), A(1, "namaste")]} />)}
          {at(540, SY, SK, <Sh t={t} lap bless={bl} throat={1} glow={0.5} pulse={0.25} snake={sn} smile={0.3 + 0.5 * sn} />)}
        </g>
      );
    }}</Scene>
  </>)}</S.Shell>
);
