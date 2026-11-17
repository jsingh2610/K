// Kailasa Katha: the shared storybook kit. Every episode uses the same Shiva, Parvati, palette, frame, voice and end card,
// so the series is recognisable at a glance.
import React from "react";
import { AbsoluteFill, Audio, Img, staticFile, useCurrentFrame } from "remotion";

export const cl = (x: number) => Math.max(0, Math.min(1, x));
export const ease = (x: number) => { const u = cl(x); return u * u * (3 - 2 * u); };
export const lerp = (a: number, b: number, u: number) => a + (b - a) * u;
export const rnd = (i: number) => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
export const mix = (a: string, b: string, k: number) => { const p = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)); const A = p(a), B = p(b); return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * k)).join(",")})`; };
export const SERIF = "Georgia, 'DejaVu Serif', 'Liberation Serif', serif";
export const OL = "#160a1c";
export const GOLD = "#f6c768";

export const Defs: React.FC = () => (
  <svg width={0} height={0} style={{ position: "absolute" }}>
    <defs>
      <radialGradient id="kglow"><stop offset="0" stopColor="#fff2a8" stopOpacity="1" /><stop offset=".35" stopColor="#ffb238" stopOpacity=".7" /><stop offset="1" stopColor="#ff8a1e" stopOpacity="0" /></radialGradient>
      <radialGradient id="aura"><stop offset="0" stopColor="#cfe4ff" stopOpacity=".75" /><stop offset=".5" stopColor="#7fa8ff" stopOpacity=".28" /><stop offset="1" stopColor="#7fa8ff" stopOpacity="0" /></radialGradient>
      <radialGradient id="warm"><stop offset="0" stopColor="#ffd98a" stopOpacity=".95" /><stop offset=".45" stopColor="#ff9a3c" stopOpacity=".45" /><stop offset="1" stopColor="#ff7a1e" stopOpacity="0" /></radialGradient>
      <radialGradient id="moon"><stop offset="0" stopColor="#fffbe6" stopOpacity=".9" /><stop offset=".25" stopColor="#dfe6ff" stopOpacity=".35" /><stop offset="1" stopColor="#dfe6ff" stopOpacity="0" /></radialGradient>
      <linearGradient id="skyN" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#060822" /><stop offset=".55" stopColor="#171d54" /><stop offset="1" stopColor="#3c2c66" /></linearGradient>
      <linearGradient id="skyD" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0d1140" /><stop offset=".45" stopColor="#4a2f70" /><stop offset=".8" stopColor="#c9603f" /><stop offset="1" stopColor="#f2a04e" /></linearGradient>
      <linearGradient id="snow" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#eef4ff" /><stop offset="1" stopColor="#93a8dc" /></linearGradient>
      <linearGradient id="ledge" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#dfe9ff" /><stop offset="1" stopColor="#6f82bd" /></linearGradient>
      <linearGradient id="stoneW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#5e6286" /><stop offset="1" stopColor="#3b3d5c" /></linearGradient>
      <linearGradient id="beast" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ef8c2e" /><stop offset="1" stopColor="#a8391a" /></linearGradient>
      <linearGradient id="skinS" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#a3c6f2" /><stop offset=".6" stopColor="#8db6ea" /><stop offset="1" stopColor="#6f97d2" /></linearGradient>
    </defs>
  </svg>
);

export const Stars: React.FC<{ t: number; n?: number; h?: number }> = ({ t, n = 90, h = 1100 }) => (
  <>{Array.from({ length: n }, (_, i) => <circle key={i} cx={rnd(i) * 1080} cy={rnd(i + 500) * h} r={0.8 + rnd(i + 900) * 2.2} fill="#fff" opacity={0.3 + 0.55 * Math.abs(Math.sin(t * (0.5 + rnd(i) * 1.1) + i))} />)}</>
);

/** the Kirtimukha face. stone 0 = alive, 1 = carved stone. glow = eye glow */
export const KFace: React.FC<{ stone?: number; glow?: number; t?: number; calm?: number }> = ({ stone = 0, glow = 1, t = 0, calm = 0 }) => {
  const c = (a: string, b: string) => mix(a, b, stone);
  const skin = c("#e9822b", "#8a8ea8"), dark = c("#b8451c", "#62657f"), mane = c("#ffb53d", "#757993"), ol = c("#2a0d10", "#23253a"), horn = c("#f6e6c6", "#a9adc3"), eye = c("#fff3c4", "#c9cce0"), mouth = c("#5a1218", "#34364c");
  const sw = 7;
  return (
    <g>
      {glow > 0 && <circle r={300} fill="url(#kglow)" opacity={0.35 * glow} />}
      {Array.from({ length: 15 }, (_, i) => { const a = ((-205 + i * (230 / 14)) * Math.PI) / 180, x = Math.cos(a) * 186, y = Math.sin(a) * 172 - 10; return <ellipse key={i} cx={x} cy={y} rx={54} ry={36 + Math.sin(t * 2.2 + i) * 4 * (1 - stone)} transform={`rotate(${(a * 180) / Math.PI + 90} ${x} ${y})`} fill={mane} stroke={ol} strokeWidth={sw} />; })}
      <path d="M-118,-122 Q-196,-236 -108,-296 Q-128,-222 -58,-162Z" fill={horn} stroke={ol} strokeWidth={sw} strokeLinejoin="round" />
      <path d="M118,-122 Q196,-236 108,-296 Q128,-222 58,-162Z" fill={horn} stroke={ol} strokeWidth={sw} strokeLinejoin="round" />
      <ellipse cx={-170} cy={-26} rx={30} ry={46} fill={dark} stroke={ol} strokeWidth={sw} />
      <ellipse cx={170} cy={-26} rx={30} ry={46} fill={dark} stroke={ol} strokeWidth={sw} />
      <path d="M-160,-40 Q-170,-172 0,-176 Q170,-172 160,-40 Q165,62 100,112 L-100,112 Q-165,62 -160,-40Z" fill={skin} stroke={ol} strokeWidth={8} strokeLinejoin="round" />
      <path d="M-160,-40 Q-165,62 -100,112 L-40,112 Q-120,60 -128,-40Z" fill={dark} opacity={0.35} />
      <path d="M0,-156 Q20,-128 0,-100 Q-20,-128 0,-156Z" fill={c("#ffe07a", "#b6b9ce")} stroke={ol} strokeWidth={5} />
      {[-1, 1].map((s) => (
        <g key={s} transform={`scale(${s},1)`}>
          <path d={`M-146,${-72 + calm * 10} Q-92,${-124 + calm * 26} -24,${-62 + calm * 4} Q-82,-86 -146,${-46 + calm * 6}Z`} fill={dark} stroke={ol} strokeWidth={6} strokeLinejoin="round" />
          {glow > 0 && <circle cx={-78} cy={-26} r={74} fill="url(#kglow)" opacity={0.85 * glow} />}
          <circle cx={-78} cy={-26} r={41} fill={eye} stroke={ol} strokeWidth={sw} />
          <circle cx={-74} cy={-22} r={17} fill={glow > 0.5 && stone > 0.5 ? "#ffb238" : ol} />
          <circle cx={-68} cy={-30} r={6} fill="#fff" opacity={1 - stone * 0.7} />
          {calm > 0 && <path d={`M-122,-66 L-34,-66 L-34,${-66 + calm * 34} Q-78,${-58 + calm * 34} -122,${-66 + calm * 34}Z`} fill={skin} stroke={ol} strokeWidth={5} />}
          <path d="M-134,36 q-14,-24 10,-30 q22,2 12,22 q-8,10 -16,2" stroke={ol} strokeWidth={6} fill="none" strokeLinecap="round" />
          <path d="M-110,70 L-93,134 L-74,72Z" fill={horn} stroke={ol} strokeWidth={6} strokeLinejoin="round" />
        </g>
      ))}
      <path d="M-36,8 Q0,-34 36,8 Q42,46 0,52 Q-42,46 -36,8Z" fill={dark} stroke={ol} strokeWidth={sw} />
      <ellipse cx={-16} cy={30} rx={7} ry={5} fill={ol} /><ellipse cx={16} cy={30} rx={7} ry={5} fill={ol} />
      <path d="M-122,68 Q-60,48 0,60 Q60,48 122,68 Q112,112 100,112 L-100,112 Q-112,112 -122,68Z" fill={mouth} stroke={ol} strokeWidth={sw} strokeLinejoin="round" />
      {[-56, -34, -12, 10, 32, 54].map((x) => <path key={x} d={`M${x - 9},62 L${x + 1},90 L${x + 11},62Z`} fill={horn} stroke={ol} strokeWidth={4} strokeLinejoin="round" />)}
    </g>
  );
};

/** full creature: body is "eaten" as b goes 1 -> 0 */
export const Beast: React.FC<{ t: number; b?: number; rumble?: number; calm?: number; glow?: number }> = ({ t, b = 1, rumble = 0, calm = 0, glow = 0.5 }) => (
  <g>
    {b > 0.01 && (
      <g transform={`translate(0,90) scale(${0.25 + 0.75 * b},${b}) translate(0,-90)`} opacity={cl(b * 4)}>
        <path d={`M200,430 Q330,440 ${330 + Math.sin(t * 2) * 14},300`} stroke={OL} strokeWidth={40} fill="none" strokeLinecap="round" />
        <path d={`M200,430 Q330,440 ${330 + Math.sin(t * 2) * 14},300`} stroke="#c9601f" strokeWidth={26} fill="none" strokeLinecap="round" />
        <ellipse cx={330 + Math.sin(t * 2) * 14} cy={286} rx={24} ry={34} fill="#ffb53d" stroke={OL} strokeWidth={6} />
        <ellipse cx={-132} cy={528} rx={92} ry={50} fill="#b8451c" stroke={OL} strokeWidth={7} />
        <ellipse cx={132} cy={528} rx={92} ry={50} fill="#b8451c" stroke={OL} strokeWidth={7} />
        <ellipse cx={0} cy={330} rx={212} ry={204} fill="url(#beast)" stroke={OL} strokeWidth={8} />
        <ellipse cx={0} cy={368} rx={132 + Math.sin(t * 9) * 5 * rumble} ry={128 + Math.cos(t * 9) * 5 * rumble} fill="#f3a850" opacity={0.9} />
        {[-1, 1].map((s) => (
          <g key={s} transform={`scale(${s},1)`}>
            <path d="M-186,250 Q-262,340 -250,470" stroke={OL} strokeWidth={64} fill="none" strokeLinecap="round" />
            <path d="M-186,250 Q-262,340 -250,470" stroke="#d76a22" strokeWidth={50} fill="none" strokeLinecap="round" />
            <circle cx={-250} cy={486} r={40} fill="#e9822b" stroke={OL} strokeWidth={7} />
            {[-22, 0, 22].map((x) => <path key={x} d={`M${-250 + x - 8},512 L${-250 + x},540 L${-250 + x + 8},512Z`} fill="#f6e6c6" stroke={OL} strokeWidth={4} />)}
          </g>
        ))}
        {rumble > 0 && [0, 1, 2].map((i) => <path key={i} d={`M${-230 - i * 26},${330 + i * 8} q-14,30 0,60`} stroke="#ffd98a" strokeWidth={6} fill="none" strokeLinecap="round" opacity={rumble * (0.4 + 0.6 * Math.abs(Math.sin(t * 6 + i)))} />)}
      </g>
    )}
    <KFace t={t} glow={glow} calm={calm} />
  </g>
);

export const ShivaHead: React.FC<{ open?: number; smile?: number; eyes?: number; mood?: number }> = ({ open = 0, smile = 0.3, eyes = 0, mood = 0 }) => (
  <g>
    <path d="M-118,-20 Q-132,-132 0,-142 Q132,-132 118,-20 L130,124 Q100,156 84,92 L-84,92 Q-100,156 -130,124Z" fill="#241634" stroke={OL} strokeWidth={6} strokeLinejoin="round" />
    <ellipse cx={0} cy={-172} rx={64} ry={56} fill="#30204a" stroke={OL} strokeWidth={6} />
    <path d="M-44,-190 Q0,-214 44,-190 M-52,-166 Q0,-188 52,-166" stroke="#4a3568" strokeWidth={5} fill="none" />
    {Array.from({ length: 9 }, (_, i) => <circle key={i} cx={-56 + i * 14} cy={-126 - Math.sin((i / 8) * Math.PI) * 8} r={7} fill="#7a3a1a" stroke={OL} strokeWidth={2.5} />)}
    <path d="M50,-232 A34,34 0 1 0 92,-190 A26,26 0 1 1 50,-232Z" fill="#fff6d8" stroke="#e8d9a0" strokeWidth={2} />
    <ellipse cx={-102} cy={6} rx={16} ry={26} fill="url(#skinS)" stroke={OL} strokeWidth={5} /><ellipse cx={102} cy={6} rx={16} ry={26} fill="#6f97d2" stroke={OL} strokeWidth={5} />
    <circle cx={-104} cy={38} r={11} fill="#f6c768" stroke={OL} strokeWidth={3} /><circle cx={104} cy={38} r={11} fill="#f6c768" stroke={OL} strokeWidth={3} />
    <path d="M-96,-30 Q-100,-118 0,-120 Q100,-118 96,-30 Q96,62 0,106 Q-96,62 -96,-30Z" fill="url(#skinS)" stroke={OL} strokeWidth={6} />
    <path d="M-98,-40 Q-78,-110 0,-92 Q78,-110 98,-40 Q102,-126 0,-128 Q-102,-126 -98,-40Z" fill="#241634" />
    {[-78, -66, -54].map((y, i) => <path key={i} d={`M-50,${y} Q0,${y - 5} 50,${y}`} stroke="#f3efe6" strokeWidth={5.5} fill="none" strokeLinecap="round" opacity={0.92} />)}
    {open > 0.02 && <circle cx={0} cy={-66} r={30 + 80 * open} fill="url(#kglow)" opacity={open} />}
    {open > 0.02
      ? <g><path d={`M0,-92 Q${20 * open},-66 0,-40 Q${-20 * open},-66 0,-92Z`} fill="#fff1b0" stroke={OL} strokeWidth={4} /><ellipse cx={0} cy={-66} rx={7 * open} ry={12 * open} fill="#ff5a1e" /></g>
      : <path d="M0,-86 L0,-46" stroke="#c0282d" strokeWidth={6} strokeLinecap="round" />}
    <path d={`M-70,${-30 + 8 * mood} Q-44,-42 -18,${-30 - 10 * mood} M18,${-30 - 10 * mood} Q44,-42 70,${-30 + 8 * mood}`} stroke={OL} strokeWidth={7} fill="none" strokeLinecap="round" />
    {eyes > 0.5
      ? <g>{[-42, 42].map((x) => <g key={x}><path d={`M${x - 23},-4 Q${x},-24 ${x + 23},-4 Q${x},12 ${x - 23},-4Z`} fill="#f7f4ea" stroke={OL} strokeWidth={5} strokeLinejoin="round" /><circle cx={x} cy={-5} r={9} fill="#1b1020" /><circle cx={x + 3} cy={-8} r={2.6} fill="#fff" /></g>)}</g>
      : <path d="M-64,-6 Q-42,10 -20,-6 M20,-6 Q42,10 64,-6" stroke={OL} strokeWidth={6} fill="none" strokeLinecap="round" />}
    <path d="M-4,4 Q-10,32 6,36" stroke="#4a6aa8" strokeWidth={5} fill="none" strokeLinecap="round" />
    <path d={`M-26,${60 - smile * 4} Q0,${66 + 16 * smile} 26,${60 - smile * 4}`} stroke={OL} strokeWidth={6} fill="none" strokeLinecap="round" />
  </g>
);

/** seated Shiva; origin = head centre */
export const Shiva: React.FC<{ open?: number; smile?: number; bless?: number; eyes?: number; mood?: number; t: number }> = ({ open = 0, smile = 0.3, bless = 0, eyes = 0, mood = 0, t }) => {
  const arm = (d: string, k: string) => <g key={k}><path d={d} stroke={OL} strokeWidth={54} fill="none" strokeLinecap="round" strokeLinejoin="round" /><path d={d} stroke="#8db6ea" strokeWidth={42} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>;
  const hx = lerp(180, 196, bless), hy = lerp(352, 96, bless);
  return (
    <g>
      <circle cx={0} cy={120} r={430} fill="url(#aura)" opacity={0.8 + 0.1 * Math.sin(t * 1.5)} />
      <g transform="translate(-262,0)">
        <path d="M0,-250 L0,430" stroke={OL} strokeWidth={16} strokeLinecap="round" /><path d="M0,-250 L0,430" stroke="#d9a441" strokeWidth={8} strokeLinecap="round" />
        <path d="M0,-380 L-14,-290 L14,-290Z M-54,-350 Q-60,-270 0,-262 Q60,-270 54,-350 Q40,-290 0,-290 Q-40,-290 -54,-350Z" fill="#f6c768" stroke={OL} strokeWidth={6} strokeLinejoin="round" />
        <path d="M-26,-200 L26,-160 L26,-200 L-26,-160Z" fill="#b8451c" stroke={OL} strokeWidth={5} strokeLinejoin="round" />
      </g>
      <path d="M-236,362 Q-246,300 -120,306 L120,306 Q246,300 236,362 Q246,426 120,426 L-120,426 Q-246,426 -236,362Z" fill="#e08a2a" stroke={OL} strokeWidth={7} />
      {[-170, -110, -40, 40, 110, 170].map((x, i) => <path key={i} d={`M${x},${318 + (i % 2) * 6} q10,26 -6,52`} stroke="#5a2a10" strokeWidth={9} fill="none" strokeLinecap="round" />)}
      <ellipse cx={-64} cy={414} rx={44} ry={20} fill="#8db6ea" stroke={OL} strokeWidth={5} /><ellipse cx={64} cy={414} rx={44} ry={20} fill="#7aa3dc" stroke={OL} strokeWidth={5} />
      <rect x={-30} y={86} width={60} height={56} fill="#7aa3dc" stroke={OL} strokeWidth={6} />
      <path d="M-122,152 Q-140,128 -70,124 L70,124 Q140,128 122,152 L98,326 L-98,326Z" fill="url(#skinS)" stroke={OL} strokeWidth={7} strokeLinejoin="round" />
      <path d="M-60,138 Q0,196 60,138" stroke={OL} strokeWidth={26} fill="none" strokeLinecap="round" /><path d="M-60,138 Q0,196 60,138" stroke="#3f8a55" strokeWidth={16} fill="none" strokeLinecap="round" />
      <ellipse cx={70} cy={128} rx={17} ry={12} fill="#3f8a55" stroke={OL} strokeWidth={5} /><circle cx={76} cy={125} r={3} fill="#ffe07a" />
      {Array.from({ length: 13 }, (_, i) => { const a = Math.PI * (0.1 + 0.8 * (i / 12)); return <circle key={i} cx={-Math.cos(a) * 84} cy={170 + Math.sin(a) * 96} r={8.5} fill="#7a3a1a" stroke={OL} strokeWidth={3} />; })}
      {arm("M-118,160 Q-176,250 -180,340", "l")}
      {arm(`M118,160 Q${lerp(176, 200, bless)},${lerp(250, 200, bless)} ${hx},${lerp(340, 130, bless)}`, "r")}
      <circle cx={-180} cy={352} r={27} fill="#8db6ea" stroke={OL} strokeWidth={6} />
      {bless > 0.5
        ? <g><path d={`M${hx - 30},${hy + 30} L${hx - 30},${hy - 26} Q${hx},${hy - 58} ${hx + 30},${hy - 26} L${hx + 30},${hy + 30}Z`} fill="#a3c6f2" stroke={OL} strokeWidth={6} strokeLinejoin="round" /><circle cx={hx} cy={hy} r={9} fill="#ffe07a" /><circle cx={hx} cy={hy} r={70} fill="url(#kglow)" opacity={0.5} /></g>
        : <circle cx={hx} cy={hy} r={27} fill="#7aa3dc" stroke={OL} strokeWidth={6} />}
      <ShivaHead open={open} smile={smile} eyes={eyes} mood={mood} />
    </g>
  );
};

export const Parvati: React.FC = () => (
  <g>
    <circle cx={0} cy={110} r={260} fill="url(#warm)" opacity={0.22} />
    <path d="M-72,62 Q0,40 72,62 L118,268 Q0,300 -118,268Z" fill="#c8284a" stroke={OL} strokeWidth={6} strokeLinejoin="round" />
    <path d="M-104,238 Q0,268 104,238" stroke="#f6c768" strokeWidth={9} fill="none" /><path d="M-40,60 Q20,150 -90,250" stroke="#f6c768" strokeWidth={7} fill="none" />
    <path d="M-60,-10 Q-70,-66 0,-70 Q70,-66 60,-10 L66,80 L-66,80Z" fill="#241634" stroke={OL} strokeWidth={5} />
    <ellipse cx={0} cy={-84} rx={30} ry={24} fill="#241634" stroke={OL} strokeWidth={5} /><path d="M-22,-70 L0,-104 L22,-70Z" fill="#f6c768" stroke={OL} strokeWidth={4} />
    <circle cx={0} cy={0} r={52} fill="#e8b48a" stroke={OL} strokeWidth={5} />
    <path d="M-52,-8 Q-40,-56 0,-50 Q40,-56 52,-8 Q30,-36 0,-34 Q-30,-36 -52,-8Z" fill="#241634" />
    <circle cx={0} cy={-22} r={6} fill="#d61f3a" />
    <path d="M-30,0 Q-20,8 -10,0 M10,0 Q20,8 30,0" stroke={OL} strokeWidth={4.5} fill="none" strokeLinecap="round" />
    <path d="M-12,24 Q0,32 12,24" stroke={OL} strokeWidth={4.5} fill="none" strokeLinecap="round" />
    <ellipse cx={0} cy={200} rx={30} ry={18} fill="#e8b48a" stroke={OL} strokeWidth={5} />
  </g>
);

/** the proud king's messenger; origin = feet */
export const Messenger: React.FC<{ kneel?: number; t: number }> = ({ kneel = 0, t }) => (
  <g transform={`scale(1,${1 - 0.3 * kneel}) rotate(${-14 * kneel})`}>
    <path d="M-66,0 L-44,-176 Q0,-206 44,-176 L66,0Z" fill="#3b1d4f" stroke={OL} strokeWidth={6} strokeLinejoin="round" />
    <path d="M-18,-186 L-8,0 M18,-186 L8,0" stroke="#c9a23e" strokeWidth={5} />
    {kneel > 0.5
      ? <g><path d="M-30,-150 Q-70,-210 -22,-262 M30,-150 Q70,-210 22,-262" stroke={OL} strokeWidth={30} fill="none" strokeLinecap="round" /><path d="M-30,-150 Q-70,-210 -22,-262 M30,-150 Q70,-210 22,-262" stroke="#3b1d4f" strokeWidth={20} fill="none" strokeLinecap="round" /><ellipse cx={0} cy={-272 + Math.sin(t * 14) * 3} rx={24} ry={18} fill="#a79cc2" stroke={OL} strokeWidth={5} /></g>
      : <g><path d="M34,-150 L124,-196" stroke={OL} strokeWidth={30} strokeLinecap="round" /><path d="M34,-150 L124,-196" stroke="#3b1d4f" strokeWidth={20} strokeLinecap="round" /><circle cx={130} cy={-199} r={15} fill="#a79cc2" stroke={OL} strokeWidth={5} /></g>}
    <circle cx={0} cy={-222} r={42} fill="#a79cc2" stroke={OL} strokeWidth={6} />
    <path d="M-44,-232 Q-40,-282 0,-284 Q40,-282 44,-232 Q0,-252 -44,-232Z" fill="#c9a23e" stroke={OL} strokeWidth={5} strokeLinejoin="round" />
    <path d="M-34,-268 L-52,-310 L-18,-280Z M34,-268 L52,-310 L18,-280Z" fill="#f6e6c6" stroke={OL} strokeWidth={4} strokeLinejoin="round" />
    {kneel > 0.5
      ? <g><circle cx={-15} cy={-218} r={9} fill="#fff" stroke={OL} strokeWidth={3} /><circle cx={15} cy={-218} r={9} fill="#fff" stroke={OL} strokeWidth={3} /><circle cx={-15} cy={-221} r={3.5} fill={OL} /><circle cx={15} cy={-221} r={3.5} fill={OL} /><ellipse cx={0} cy={-196} rx={8} ry={10} fill={OL} /></g>
      : <g><path d="M-26,-226 L-8,-218 M26,-226 L8,-218" stroke={OL} strokeWidth={6} strokeLinecap="round" /><circle cx={-15} cy={-212} r={5} fill={OL} /><circle cx={15} cy={-212} r={5} fill={OL} /><path d="M-12,-194 Q4,-200 16,-190" stroke={OL} strokeWidth={5} fill="none" strokeLinecap="round" /></g>}
  </g>
);

export const Kailash: React.FC<{ t: number }> = ({ t }) => (
  <g>
    <rect width={1080} height={1920} fill="url(#skyN)" />
    <Stars t={t} />
    <circle cx={840} cy={330} r={260} fill="url(#moon)" /><circle cx={840} cy={330} r={62} fill="#fffbe6" />
    <path d="M0,1180 L170,900 L330,1080 L520,820 L700,1060 L880,880 L1080,1150 L1080,1500 L0,1500Z" fill="#1a2262" />
    <path d="M150,1420 L404,640 Q540,540 676,640 L930,1420Z" fill="url(#snow)" stroke="#5d72b3" strokeWidth={5} strokeLinejoin="round" />
    <path d="M540,566 Q676,600 676,640 L930,1420 L640,1420 Q600,1000 540,566Z" fill="#6f86c8" opacity={0.55} />
    {[760, 900, 1040, 1190].map((y, i) => <path key={i} d={`M${404 - (y - 640) * 0.33 + 30},${y} Q540,${y + 26} ${676 + (y - 640) * 0.33 - 30},${y}`} stroke="#8ea4d8" strokeWidth={7} fill="none" opacity={0.6} />)}
    <path d="M0,1500 Q300,1416 540,1440 Q800,1416 1080,1500 L1080,1920 L0,1920Z" fill="url(#ledge)" />
    <path d="M0,1500 Q300,1416 540,1440 Q800,1416 1080,1500" stroke="#f4f8ff" strokeWidth={8} fill="none" />
  </g>
);

export const Diya: React.FC<{ x: number; y: number; t: number }> = ({ x, y, t }) => (
  <g transform={`translate(${x},${y})`}>
    <circle r={150} fill="url(#warm)" opacity={0.55 + 0.1 * Math.sin(t * 7 + x)} />
    <path d={`M0,${-52 - Math.sin(t * 9 + x) * 5} Q16,-22 0,-8 Q-16,-22 0,${-52 - Math.sin(t * 9 + x) * 5}Z`} fill="#ffd45a" stroke="#ff8a1e" strokeWidth={3} />
    <path d="M-34,-8 Q0,26 34,-8Z" fill="#b8562a" stroke={OL} strokeWidth={5} strokeLinejoin="round" />
  </g>
);

export const Temple: React.FC<{ t: number; glow: number; children?: React.ReactNode }> = ({ t, glow, children }) => (
  <g>
    <rect width={1080} height={1920} fill="url(#skyD)" />
    <Stars t={t} n={50} h={700} />
    <path d="M0,1330 Q200,1180 400,1300 Q650,1160 860,1280 Q980,1220 1080,1300 L1080,1700 L0,1700Z" fill="#2c1f4a" />
    <path d="M510,250 Q540,196 570,250 L556,300 L524,300Z" fill="#f6c768" stroke={OL} strokeWidth={5} strokeLinejoin="round" />
    <rect x={340} y={300} width={400} height={74} fill="#3d3f5f" stroke={OL} strokeWidth={6} /><rect x={250} y={372} width={580} height={80} fill="#44476a" stroke={OL} strokeWidth={6} /><rect x={160} y={450} width={760} height={84} fill="#4b4f74" stroke={OL} strokeWidth={6} />
    <rect x={90} y={532} width={900} height={1030} fill="url(#stoneW)" stroke={OL} strokeWidth={7} />
    {Array.from({ length: 11 }, (_, i) => <path key={i} d={`M90,${620 + i * 86} L990,${620 + i * 86}`} stroke="#2e3050" strokeWidth={4} opacity={0.6} />)}
    {Array.from({ length: 44 }, (_, i) => { const r = Math.floor(i / 4), c = i % 4; return <path key={i} d={`M${200 + c * 230 + (r % 2) * 110},${620 + r * 86} l0,86`} stroke="#2e3050" strokeWidth={4} opacity={0.5} />; })}
    {[150, 840].map((x) => <g key={x}><rect x={x} y={640} width={90} height={920} fill="#6a6e92" stroke={OL} strokeWidth={6} /><rect x={x - 16} y={610} width={122} height={44} fill="#7b7fa3" stroke={OL} strokeWidth={6} /><rect x={x - 16} y={1520} width={122} height={44} fill="#7b7fa3" stroke={OL} strokeWidth={6} /><path d={`M${x + 28},660 L${x + 28},1516 M${x + 62},660 L${x + 62},1516`} stroke="#4f5276" strokeWidth={5} /></g>)}
    <rect x={232} y={560} width={616} height={236} fill="#4a4e70" stroke={OL} strokeWidth={7} />
    <path d="M250,780 L830,780" stroke="#6a6e92" strokeWidth={6} />
    <clipPath id="door"><path d="M330,1562 L330,960 Q330,836 540,836 Q750,836 750,960 L750,1562Z" /></clipPath>
    <path d="M330,1562 L330,960 Q330,836 540,836 Q750,836 750,960 L750,1562Z" fill="#0e0714" stroke={OL} strokeWidth={8} />
    <g clipPath="url(#door)">
      <circle cx={540} cy={1420} r={420} fill="url(#warm)" opacity={0.8 + 0.08 * Math.sin(t * 5)} />
      <path d="M470,1562 L470,1520 Q540,1500 610,1520 L610,1562Z M506,1512 L506,1420 Q540,1376 574,1420 L574,1512Z" fill="#1a0e1e" />
      <path d="M512,1440 L568,1440 M512,1454 L568,1454 M512,1468 L568,1468" stroke="#f3efe6" strokeWidth={4} opacity={0.75} />
    </g>
    <path d="M540,836 L540,890" stroke="#c9a23e" strokeWidth={5} /><path d="M518,928 Q518,888 540,888 Q562,888 562,928 L570,940 L510,940Z" fill="#f6c768" stroke={OL} strokeWidth={5} strokeLinejoin="round" /><circle cx={540} cy={948} r={7} fill="#c9a23e" stroke={OL} strokeWidth={3} />
    <g transform="translate(540,690) scale(.56)"><KFace stone={1} glow={glow} t={t} /></g>
    <rect x={50} y={1560} width={980} height={56} fill="#55597c" stroke={OL} strokeWidth={6} /><rect x={0} y={1614} width={1080} height={64} fill="#484b6c" stroke={OL} strokeWidth={6} />
    <rect x={0} y={1676} width={1080} height={244} fill="#241b38" />
    <Diya x={196} y={1556} t={t} /><Diya x={884} y={1556} t={t} />
    {children}
  </g>
);

export const Devotee: React.FC<{ t: number }> = ({ t }) => (
  <g transform={`translate(0,${Math.abs(Math.sin(t * 5)) * -6})`}>
    <path d="M-30,0 L-22,-110 M30,0 L22,-110" stroke={OL} strokeWidth={34} strokeLinecap="round" /><path d="M-30,0 L-22,-110 M30,0 L22,-110" stroke="#e9dcc0" strokeWidth={24} strokeLinecap="round" />
    <path d="M-62,-100 Q-70,-268 0,-276 Q70,-268 62,-100Z" fill="#f1e3c8" stroke={OL} strokeWidth={6} strokeLinejoin="round" />
    <path d="M-58,-240 Q-98,-190 -40,-168 M58,-240 Q98,-190 40,-168" stroke={OL} strokeWidth={30} fill="none" strokeLinecap="round" /><path d="M-58,-240 Q-98,-190 -40,-168 M58,-240 Q98,-190 40,-168" stroke="#f1e3c8" strokeWidth={20} fill="none" strokeLinecap="round" />
    <path d="M-40,-270 Q0,-250 40,-270" stroke="#ff9a3c" strokeWidth={12} fill="none" />
    <circle cx={0} cy={-312} r={44} fill="#241826" stroke={OL} strokeWidth={6} />
    <path d="M-46,-300 Q0,-250 46,-300" fill="#c98f5e" stroke={OL} strokeWidth={5} />
  </g>
);

export const Embers: React.FC<{ t: number; k: number; n?: number }> = ({ t, k, n = 26 }) => (
  <>{Array.from({ length: n }, (_, i) => { const u = (t * 0.7 + rnd(i)) % 1, a = rnd(i + 40) * Math.PI - Math.PI / 2 + Math.PI / 2, r = (1 - u) * (260 + rnd(i + 9) * 200); return <circle key={i} cx={Math.cos(a) * r * (rnd(i + 3) > 0.5 ? 1 : -1) * 0.8} cy={90 + Math.abs(Math.sin(a)) * r} r={4 + rnd(i + 5) * 6} fill={i % 2 ? "#ffd45a" : "#ff8a1e"} opacity={k * Math.sin(Math.PI * u)} />; })}</>
);

export const PlayLogo: React.FC<{ s: number }> = ({ s }) => (
  <svg width={s} height={s} viewBox="0 0 100 100">
    <path d="M14 8 L58 50 L14 92 C10 90 8 86 8 82 L8 18 C8 14 10 10 14 8Z" fill="#00d7fe" />
    <path d="M14 8 C17 6 21 6 25 8 L72 35 L58 50Z" fill="#00f076" />
    <path d="M14 92 L58 50 L72 65 L25 92 C21 94 17 94 14 92Z" fill="#ff3a44" />
    <path d="M72 35 L88 44 C94 47 94 53 88 56 L72 65 L58 50Z" fill="#ffd400" />
  </svg>
);


// ---------- series shell ----------
export type VOT = { lines: { t: number; d: number; text: string; who: string; parts?: { t: number; d: number; text: string }[] }[]; dur: number };
type Cam = [number, number, number, number, number, number];
export const makeStory = (VO: VOT, sceneLines: number[], ep: number) => {
  const LT = VO.lines.map((l) => l.t), FRAMES = Math.ceil((VO.dur + 1.3) * 30), TOTAL = FRAMES / 30, CTA = VO.lines.length - 1;
  const ST = sceneLines.map((li, i) => (i ? LT[li] - 0.2 : 0)), EN = [...ST.slice(1), TOTAL];
  /** start time of the first word starting with `w` in line li (character-proportional) */
  const wt = (li: number, w: string) => { const L0 = VO.lines[li], hit = (x: string) => x.toLowerCase().replace(/[^a-z0-9]/g, "").startsWith(w), l = (L0.parts ?? []).find((p) => p.text.split(" ").some(hit)) ?? L0, ws = l.text.split(" "), tot = ws.reduce((s, x) => s + x.length + 1.5, 0); let acc = 0; for (const x of ws) { if (x.toLowerCase().replace(/[^a-z0-9]/g, "").startsWith(w)) return l.t + (acc / tot) * l.d; acc += x.length + 1.5; } return l.t; };
  const Scene: React.FC<{ i: number; t: number; cam: Cam; dur?: number; children: (u: number, lt: number) => React.ReactNode }> = ({ i, t, cam, dur, children }) => {
    const a = ST[i], b = EN[i], F = 0.45;
    if (t < a - F || t > b + F) return null;
    const o = i === 0 ? 1 : ease((t - a + F / 2) / F), u = cl((t - a) / (dur ?? b - a)), g = ease(u);
    const s = lerp(cam[2], cam[5], g), cx0 = lerp(cam[0], cam[3], g), cy0 = lerp(cam[1], cam[4], g);
    // never let the camera see past the painted 1080x1920 page (that showed as dark blue bands)
    const cx = s >= 1 ? Math.min(1080 - 540 / s, Math.max(540 / s, cx0)) : cx0, cy = s >= 1 ? Math.min(1920 - 960 / s, Math.max(960 / s, cy0)) : cy0;
    return (
      <AbsoluteFill style={{ opacity: o }}>
        <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{ position: "absolute", background: "#060822" }}>
          <g transform={`translate(${540 - cx * s},${960 - cy * s}) scale(${s})`}>{children(u, t - a)}</g>
        </svg>
      </AbsoluteFill>
    );
  };
  const Subs: React.FC<{ t: number }> = ({ t }) => {
    for (const l of VO.lines.slice(0, CTA)) {
      const parts = l.parts ? l.parts.map((p) => p.text) : (l.text.match(/[^.!?]+[.!?]*/g) ?? [l.text]).filter((p) => p.trim());
      const tot = parts.reduce((s, p) => s + p.length, 0);
      let acc = 0;
      const ab = l.parts ? l.parts.map((p) => [p.t, p.t + p.d + 0.3]) : parts.map((p) => { const a0 = l.t + (acc / tot) * l.d; acc += p.length; return [a0, l.t + (acc / tot) * l.d + 0.3]; });
      for (let i = 0; i < ab.length - 1; i++) ab[i][1] = Math.min(ab[i][1], ab[i + 1][0]);
      for (let i = 0; i < parts.length; i++) {
        const [a, b] = ab[i];
        if (t >= a - 0.1 && t < b) {
          const fd = Math.min(0.28, (b - a) / 3), o = ease((t - a + 0.1) / fd) * (1 - ease((t - b + fd) / fd)), g = l.who !== "n";
          return (
            <div style={{ position: "absolute", top: 206, left: 70, width: 940, textAlign: "center", opacity: o, transform: `translateY(${(1 - o) * 8}px)` }}>
              <span style={{ display: "inline-block", padding: "20px 32px", borderRadius: 28, background: "rgba(10,6,22,.58)", fontFamily: SERIF, fontStyle: g ? "italic" : "normal", fontSize: 56, lineHeight: 1.28,
                color: g ? "#ffe2a0" : "#fffaf0", textShadow: "0 2px 6px rgba(0,0,0,.8)" }}>{g ? `“${parts[i].trim()}”` : parts[i].trim()}</span>
            </div>
          );
        }
      }
    }
    return null;
  };
  /** everything the series shares: gold dust, vignette, the gold page frame, the episode tag, subtitles, end card, the eye-opening */
  /** hook = cold open: no fade-in, a quick punch-in, and big word-by-word text for muted viewers (words prefixed * are gold) */
  const Shell: React.FC<{ audio?: boolean; mix: string; tagline?: string; hook?: { text: string; until?: number }; children: (t: number) => React.ReactNode }> = ({ audio, mix: mixFile, tagline = "Begin your sadhana.", hook, children }) => {
    const f = useCurrentFrame(), t = f / 30, end = ease((t - LT[CTA] + 0.1) / 0.8), iris = ease(t / 0.9), out = cl((t - (TOTAL - 0.6)) / 0.6);
    return (
      <AbsoluteFill style={{ background: "#060822" }}>
        <Defs />
        <AbsoluteFill style={hook ? { transform: `scale(${1 + 0.16 * (1 - ease(t / 0.5))})`, transformOrigin: "50% 45%" } : undefined}>{children(t)}</AbsoluteFill>
        <AbsoluteFill><svg width={1080} height={1920}>{Array.from({ length: 34 }, (_, i) => { const u = (t * (0.02 + rnd(i) * 0.03) + rnd(i + 7)) % 1; return <circle key={i} cx={rnd(i + 20) * 1080 + Math.sin(t * 0.6 + i) * 30} cy={1920 - u * 2100} r={2 + rnd(i + 3) * 3.5} fill="#ffdf9a" opacity={0.5 * Math.sin(Math.PI * u)} />; })}</svg></AbsoluteFill>
        <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 52%, rgba(6,4,18,.6) 100%)" }} />
        {(!hook || t >= (hook.until ?? LT[1] - 0.15)) && <Subs t={t} />}
        {hook && t < (hook.until ?? LT[1] - 0.15) + 0.2 && (() => { const hu = hook.until ?? LT[1] - 0.15, ws = hook.text.split(" "), out = 1 - ease((t - hu + 0.1) / 0.25); return (
          <div style={{ position: "absolute", top: 190, left: 50, width: 980, textAlign: "center", opacity: out }}>
            <div style={{ display: "inline-block", padding: "24px 34px", borderRadius: 30, background: "rgba(10,6,22,.72)", fontFamily: SERIF, fontWeight: 700, fontSize: 88, lineHeight: 1.12, letterSpacing: 1, textTransform: "uppercase" }}>
              {ws.map((w, i) => { const k = ease((t + 0.45 - i * 0.12) / 0.14), gold = w.startsWith("*"); return <span key={i} style={{ display: "inline-block", margin: "0 12px", opacity: cl(k * 2), transform: `scale(${1.3 - 0.3 * k})`, color: gold ? "#ffcf5a" : "#fffaf0", textShadow: "0 4px 0 #160a1c, 0 0 24px rgba(0,0,0,.6)" }}>{w.replace("*", "")}</span>; })}
            </div>
          </div>); })()}
        {t >= LT[CTA] - 0.1 && (
          <AbsoluteFill style={{ background: `rgba(8,5,18,${0.74 * end})`, opacity: end, alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 40 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              <Img src={staticFile("katha/logo.png")} style={{ width: 128, height: 128, borderRadius: 30, boxShadow: "0 6px 30px rgba(255,190,90,.35)" }} />
              <span style={{ fontFamily: SERIF, fontSize: 100, color: "#fffaf0", letterSpacing: 3 }}>Kailasa</span>
            </div>
            <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 46, color: "#ffe2a0" }}>{tagline}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 20, padding: "14px 36px 14px 26px", background: "#000", borderRadius: 20, border: "3px solid #a6a6a6" }}>
              <PlayLogo s={84} />
              <div style={{ color: "#fff", fontFamily: "Inter, Arial", lineHeight: 1 }}>
                <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: 1 }}>GET IT ON</div>
                <div style={{ fontSize: 56, fontWeight: 600 }}>Google Play</div>
              </div>
            </div>
          </AbsoluteFill>
        )}
        {iris < 1 && !hook && <AbsoluteFill style={{ background: "#060822", opacity: 1 - cl(t / 0.35) }} />}
        {out > 0 && <AbsoluteFill style={{ background: "#060822", opacity: out }} />}
        {audio && <Audio src={staticFile(mixFile)} />}
      </AbsoluteFill>
    );
  };
  return { LT, ST, EN, FRAMES, TOTAL, CTA, wt, Scene, Shell };
};
