import React from "react";
import VOJ from "./markandeya.json";
import { makeStory, VOT, cl, ease, lerp, rnd, OL, GOLD, Stars, ShivaHead, Shiva, Temple, Diya } from "./kit";

const S = makeStory(VOJ as VOT, [0, 1, 2, 3, 4, 6, 7], 2);
export const MARKANDEYA_FRAMES = S.FRAMES;
const { Scene, LT, wt } = S;
const SKIN = "#c98f5e";

/** the lingam; origin = centre of its base. split 0..1 cracks it open with light */
export const Lingam: React.FC<{ split?: number; t: number }> = ({ split = 0, t }) => {
  const half = (sx: number, id: string) => (
    <g transform={`translate(${sx * split * 46},0) rotate(${sx * split * 7} 0 -60)`} clipPath={`url(#${id})`}>
      <path d="M-78,-60 L-78,-300 Q-78,-392 0,-392 Q78,-392 78,-300 L78,-60Z" fill="url(#lingG)" stroke={OL} strokeWidth={8} />
      <path d="M-52,-90 L-52,-300 Q-50,-350 -24,-366" stroke="#5a5470" strokeWidth={10} fill="none" strokeLinecap="round" opacity={0.7} />
      {[-262, -242, -222].map((y) => <path key={y} d={`M-62,${y} Q0,${y - 8} 62,${y}`} stroke="#efe9da" strokeWidth={7} fill="none" strokeLinecap="round" />)}
      <circle cx={0} cy={-246} r={10} fill="#d61f3a" />
      {Array.from({ length: 13 }, (_, i) => { const u = i / 12, x = -78 + 156 * u, y = -180 + Math.sin(u * Math.PI) * 74; return <circle key={i} cx={x} cy={y} r={15} fill={i % 2 ? "#ff9a1e" : "#ffc233"} stroke={OL} strokeWidth={4} />; })}
    </g>
  );
  return (
    <g>
      <defs>
        <linearGradient id="lingG" x1="0" x2="1"><stop offset="0" stopColor="#2c2838" /><stop offset=".5" stopColor="#15121c" /><stop offset="1" stopColor="#0a0810" /></linearGradient>
        <clipPath id="lgL"><rect x={-400} y={-500} width={400} height={520} /></clipPath><clipPath id="lgR"><rect x={0} y={-500} width={400} height={520} /></clipPath>
      </defs>
      {split > 0 && <g><circle cx={0} cy={-220} r={260 + 420 * split} fill="url(#kglow)" opacity={Math.min(1, split * 1.6)} />
        <path d={`M${-10 - 60 * split},-60 L${-6 - 30 * split},-392 L${6 + 30 * split},-392 L${10 + 60 * split},-60Z`} fill="#fff7d0" opacity={0.95} /></g>}
      {half(-1, "lgL")}{half(1, "lgR")}
      <path d="M150,-50 L262,-44 L262,-20 L150,-14Z" fill="#221d2c" stroke={OL} strokeWidth={7} strokeLinejoin="round" />
      <ellipse cx={0} cy={-40} rx={204} ry={46} fill="#2a2536" stroke={OL} strokeWidth={8} />
      <ellipse cx={0} cy={-52} rx={150} ry={26} fill="#15121c" />
      <path d="M-170,-34 L-150,40 L150,40 L170,-34" fill="#3a3348" stroke={OL} strokeWidth={8} strokeLinejoin="round" />
    </g>
  );
};

/** Markandeya; origin = feet. */
export const Boy: React.FC<{ pose?: "stand" | "pray" | "hug"; eyes?: number; smile?: number; t: number }> = ({ pose = "stand", eyes = 1, smile = 0.4, t }) => {
  const hug = pose === "hug";
  const arm = (d: string, k: string) => <g key={k}><path d={d} stroke={OL} strokeWidth={36} fill="none" strokeLinecap="round" strokeLinejoin="round" /><path d={d} stroke={SKIN} strokeWidth={25} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>;
  return (
    <g>
      {hug
        ? <path d="M-96,0 Q-110,-70 -40,-96 L52,-96 Q112,-70 100,0Z" fill="#f08a24" stroke={OL} strokeWidth={7} strokeLinejoin="round" />
        : <g><path d="M-58,-150 L-70,-14 L-10,-14 L0,-110 L10,-14 L70,-14 L58,-150Z" fill="#f08a24" stroke={OL} strokeWidth={7} strokeLinejoin="round" /><ellipse cx={-42} cy={-6} rx={34} ry={13} fill={SKIN} stroke={OL} strokeWidth={5} /><ellipse cx={42} cy={-6} rx={34} ry={13} fill={SKIN} stroke={OL} strokeWidth={5} /></g>}
      <g transform={hug ? "translate(0,56)" : ""}>
        <path d="M-58,-150 Q-70,-250 -44,-268 L44,-268 Q70,-250 58,-150Z" fill={SKIN} stroke={OL} strokeWidth={7} strokeLinejoin="round" />
        <path d="M-42,-262 Q10,-200 50,-158" stroke="#f3efe6" strokeWidth={5} fill="none" />
        {Array.from({ length: 9 }, (_, i) => { const a = Math.PI * (0.12 + 0.76 * (i / 8)); return <circle key={i} cx={-Math.cos(a) * 40} cy={-262 + Math.sin(a) * 40} r={6.5} fill="#7a3a1a" stroke={OL} strokeWidth={2.5} />; })}
        {pose === "stand" && <>{arm("M-56,-250 Q-84,-200 -74,-150", "l")}{arm("M56,-250 Q84,-200 74,-150", "r")}</>}
        {pose === "pray" && <>{arm("M-56,-250 Q-92,-200 -10,-196", "l")}{arm("M56,-250 Q92,-200 10,-196", "r")}<path d="M-12,-176 L0,-232 L12,-176Z" fill={SKIN} stroke={OL} strokeWidth={5} strokeLinejoin="round" /></>}
        <g transform={hug ? "translate(30,-8) rotate(20 0 -330)" : ""}>
          <ellipse cx={-70} cy={-326} rx={13} ry={19} fill={SKIN} stroke={OL} strokeWidth={5} /><ellipse cx={70} cy={-326} rx={13} ry={19} fill="#b57c4c" stroke={OL} strokeWidth={5} />
          <circle cx={0} cy={-330} r={68} fill={SKIN} stroke={OL} strokeWidth={7} />
          <path d="M-68,-336 Q-66,-404 0,-402 Q66,-404 68,-336 Q40,-378 0,-374 Q-40,-378 -68,-336Z" fill="#1c1220" />
          <ellipse cx={0} cy={-412} rx={26} ry={22} fill="#1c1220" stroke={OL} strokeWidth={5} />
          {[-362, -353, -344].map((y) => <path key={y} d={`M-24,${y} L24,${y}`} stroke="#f3efe6" strokeWidth={3.5} strokeLinecap="round" />)}
          {eyes > 0.5
            ? [-26, 26].map((x) => <g key={x}><ellipse cx={x} cy={-322} rx={13} ry={16} fill="#fff" stroke={OL} strokeWidth={4} /><circle cx={x} cy={-320} r={8} fill={OL} /><circle cx={x + 3} cy={-324} r={2.6} fill="#fff" /></g>)
            : <path d="M-40,-322 Q-26,-312 -12,-322 M12,-322 Q26,-312 40,-322" stroke={OL} strokeWidth={5} fill="none" strokeLinecap="round" />}
          <path d="M-44,-346 Q-26,-354 -10,-346 M10,-346 Q26,-354 44,-346" stroke={OL} strokeWidth={5} fill="none" strokeLinecap="round" />
          <ellipse cx={-42} cy={-300} rx={12} ry={7} fill="#e88b78" opacity={0.5} /><ellipse cx={42} cy={-300} rx={12} ry={7} fill="#e88b78" opacity={0.5} />
          <path d={`M-16,-292 Q0,${-292 + 22 * smile} 16,-292`} stroke={OL} strokeWidth={5} fill="none" strokeLinecap="round" />
        </g>
      </g>
    </g>
  );
};
const BoyBack: React.FC<{ t: number }> = ({ t }) => (
  <g transform={`translate(0,${Math.abs(Math.sin(t * 5)) * -5})`}>
    <path d="M-52,-150 L-62,-10 L-8,-10 L0,-100 L8,-10 L62,-10 L52,-150Z" fill="#f08a24" stroke={OL} strokeWidth={7} strokeLinejoin="round" />
    <path d="M-54,-150 Q-66,-250 -40,-266 L40,-266 Q66,-250 54,-150Z" fill={SKIN} stroke={OL} strokeWidth={7} strokeLinejoin="round" />
    <path d="M-52,-246 Q-84,-196 -66,-150 M52,-246 Q84,-196 66,-150" stroke={OL} strokeWidth={34} fill="none" strokeLinecap="round" /><path d="M-52,-246 Q-84,-196 -66,-150 M52,-246 Q84,-196 66,-150" stroke={SKIN} strokeWidth={23} fill="none" strokeLinecap="round" />
    <circle cx={0} cy={-326} r={64} fill="#1c1220" stroke={OL} strokeWidth={7} /><ellipse cx={0} cy={-398} rx={25} ry={21} fill="#1c1220" stroke={OL} strokeWidth={5} />
    <path d="M-40,-290 Q0,-262 40,-290" fill={SKIN} stroke={OL} strokeWidth={5} />
  </g>
);

/** Yama on his buffalo; origin = his chest. fear 0..1 */
export const Yama: React.FC<{ fear?: number; t: number }> = ({ fear = 0, t }) => {
  const G = "#2f6b5c", GD = "#1f4a40";
  return (
    <g>
      <ellipse cx={0} cy={430} rx={330} ry={250} fill="#141018" stroke={OL} strokeWidth={8} />
      <path d="M-120,250 Q-330,200 -300,20 Q-250,150 -96,190Z M120,250 Q330,200 300,20 Q250,150 96,190Z" fill="#d8ceae" stroke={OL} strokeWidth={8} strokeLinejoin="round" />
      <path d="M-130,230 Q-140,430 0,470 Q140,430 130,230 Q0,170 -130,230Z" fill="#231c2a" stroke={OL} strokeWidth={8} />
      <ellipse cx={0} cy={410} rx={84} ry={52} fill="#3a2f44" stroke={OL} strokeWidth={6} /><ellipse cx={-30} cy={410} rx={12} ry={16} fill={OL} /><ellipse cx={30} cy={410} rx={12} ry={16} fill={OL} />
      <path d="M-36,446 Q0,476 36,446" stroke={GOLD} strokeWidth={8} fill="none" />
      {[-62, 62].map((x) => <g key={x}><circle cx={x} cy={300} r={30} fill="url(#kglow)" opacity={0.5} /><ellipse cx={x} cy={300} rx={17} ry={13} fill="#ffd0a0" stroke={OL} strokeWidth={5} /><circle cx={x} cy={300} r={7} fill="#c8102e" /></g>)}
      {/* Yama */}
      <path d="M-150,170 Q-170,-60 -110,-110 L110,-110 Q170,-60 150,170 Q0,220 -150,170Z" fill={G} stroke={OL} strokeWidth={8} strokeLinejoin="round" />
      <path d="M-150,170 Q0,220 150,170 L160,250 Q0,300 -160,250Z" fill="#a8242c" stroke={OL} strokeWidth={7} />
      <path d="M-96,-100 Q0,10 96,-100" stroke={GOLD} strokeWidth={14} fill="none" /><circle cx={0} cy={-44} r={20} fill="#c8102e" stroke={GOLD} strokeWidth={6} />
      <path d="M-128,-70 Q-250,-30 -230,110" stroke={OL} strokeWidth={70} fill="none" strokeLinecap="round" /><path d="M-128,-70 Q-250,-30 -230,110" stroke={GD} strokeWidth={56} fill="none" strokeLinecap="round" />
      <path d="M-232,-240 L-232,330" stroke={OL} strokeWidth={22} strokeLinecap="round" /><path d="M-232,-240 L-232,330" stroke="#7a5a2a" strokeWidth={12} strokeLinecap="round" /><circle cx={-232} cy={-262} r={34} fill={GOLD} stroke={OL} strokeWidth={7} />
      <circle cx={-230} cy={116} r={36} fill={G} stroke={OL} strokeWidth={7} />
      <path d={`M128,-70 Q240,-110 ${230 - fear * 40},${-210 + fear * 90}`} stroke={OL} strokeWidth={70} fill="none" strokeLinecap="round" /><path d={`M128,-70 Q240,-110 ${230 - fear * 40},${-210 + fear * 90}`} stroke={G} strokeWidth={56} fill="none" strokeLinecap="round" />
      <circle cx={230 - fear * 40} cy={-222 + fear * 90} r={36} fill={G} stroke={OL} strokeWidth={7} />
      <rect x={-34} y={-150} width={68} height={50} fill={GD} stroke={OL} strokeWidth={6} />
      <ellipse cx={-98} cy={-250} rx={18} ry={28} fill={G} stroke={OL} strokeWidth={6} /><ellipse cx={98} cy={-250} rx={18} ry={28} fill={GD} stroke={OL} strokeWidth={6} />
      <circle cx={-100} cy={-214} r={13} fill={GOLD} stroke={OL} strokeWidth={4} /><circle cx={100} cy={-214} r={13} fill={GOLD} stroke={OL} strokeWidth={4} />
      <path d="M-92,-270 Q-96,-360 0,-362 Q96,-360 92,-270 Q92,-170 0,-140 Q-92,-170 -92,-270Z" fill={G} stroke={OL} strokeWidth={8} />
      <path d="M-98,-300 L-84,-420 L-42,-372 L0,-452 L42,-372 L84,-420 L98,-300 Q0,-336 -98,-300Z" fill={GOLD} stroke={OL} strokeWidth={7} strokeLinejoin="round" /><circle cx={0} cy={-352} r={14} fill="#c8102e" stroke={OL} strokeWidth={4} />
      <path d={`M-78,${-290 - fear * 16} Q-46,${-304 + fear * 4} -14,${-276 - fear * 18} M14,${-276 - fear * 18} Q46,${-304 + fear * 4} 78,${-290 - fear * 16}`} stroke={OL} strokeWidth={13} fill="none" strokeLinecap="round" />
      {[-42, 42].map((x) => <g key={x}><ellipse cx={x} cy={-250} rx={20} ry={14 + fear * 10} fill="#ffe9a8" stroke={OL} strokeWidth={5} /><circle cx={x} cy={-250} r={8} fill="#c8102e" /><circle cx={x} cy={-250} r={3.5} fill={OL} /></g>)}
      <path d="M-8,-240 Q-16,-206 0,-200 Q16,-206 8,-240" fill={GD} stroke={OL} strokeWidth={5} />
      <path d="M0,-190 Q-40,-170 -84,-190 Q-108,-200 -112,-226 Q-90,-200 -60,-204 Q-20,-206 0,-196 Q20,-206 60,-204 Q90,-200 112,-226 Q108,-200 84,-190 Q40,-170 0,-190Z" fill="#0f0a12" stroke={OL} strokeWidth={4} />
      {fear > 0.5 ? <ellipse cx={0} cy={-166} rx={18} ry={14} fill="#3a0f14" stroke={OL} strokeWidth={5} /> : <path d="M-26,-170 Q0,-160 26,-170" stroke={OL} strokeWidth={6} fill="none" strokeLinecap="round" />}
    </g>
  );
};

const Shrine: React.FC<{ t: number; warm?: number }> = ({ t, warm = 1 }) => (
  <g>
    <defs><linearGradient id="shr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#090614" /><stop offset="1" stopColor="#1e1232" /></linearGradient></defs>
    <rect width={1080} height={1920} fill="url(#shr)" />
    {Array.from({ length: 12 }, (_, i) => <path key={i} d={`M0,${330 + i * 96} L1080,${330 + i * 96}`} stroke="#2b1f44" strokeWidth={4} />)}
    {Array.from({ length: 48 }, (_, i) => { const r = Math.floor(i / 4), c = i % 4; return <path key={i} d={`M${130 + c * 280 + (r % 2) * 140},${330 + r * 96} l0,96`} stroke="#2b1f44" strokeWidth={4} />; })}
    <path d="M230,1430 L230,780 Q230,470 540,470 Q850,470 850,780 L850,1430Z" fill="#140c22" stroke="#3a2c58" strokeWidth={10} />
    <circle cx={540} cy={1080} r={520} fill="url(#warm)" opacity={0.42 * warm + 0.04 * Math.sin(t * 5)} />
    {[60, 900].map((x) => <g key={x}><rect x={x} y={300} width={120} height={1140} fill="#2c2146" stroke={OL} strokeWidth={7} /><rect x={x - 18} y={270} width={156} height={50} fill="#3a2d58" stroke={OL} strokeWidth={7} /><rect x={x - 18} y={1400} width={156} height={50} fill="#3a2d58" stroke={OL} strokeWidth={7} /></g>)}
    {[330, 750].map((x, i) => <g key={x} transform={`rotate(${Math.sin(t * 1.3 + i) * 3} ${x} 300)`}><path d={`M${x},300 L${x},560`} stroke="#8a6a2a" strokeWidth={5} /><path d={`M${x - 30},620 Q${x - 30},560 ${x},560 Q${x + 30},560 ${x + 30},620 L${x + 40},636 L${x - 40},636Z`} fill={GOLD} stroke={OL} strokeWidth={6} strokeLinejoin="round" /><circle cx={x} cy={646} r={9} fill="#c9a23e" stroke={OL} strokeWidth={3} /></g>)}
    <path d="M0,1430 L1080,1430 L1080,1920 L0,1920Z" fill="#170f26" /><path d="M0,1430 L1080,1430" stroke="#3a2c58" strokeWidth={8} />
    {[-2, -1, 1, 2].map((k) => <path key={k} d={`M${540 + k * 150},1430 L${540 + k * 420},1920`} stroke="#241838" strokeWidth={5} />)}
    <Diya x={240} y={1500} t={t} /><Diya x={840} y={1500} t={t} />
  </g>
);
const SmallDiya: React.FC<{ x: number; y: number; lit: number; t: number; i: number }> = ({ x, y, lit, t, i }) => (
  <g transform={`translate(${x},${y})`}>
    {lit > 0.02 && <><circle r={120} fill="url(#warm)" opacity={0.6 * lit} /><path d={`M0,${-60 - Math.sin(t * 9 + i) * 5} Q18,-26 0,-10 Q-18,-26 0,${-60 - Math.sin(t * 9 + i) * 5}Z`} fill="#ffd45a" stroke="#ff8a1e" strokeWidth={3} opacity={lit} /></>}
    {lit < 0.98 && <path d={`M0,-14 q${10 * Math.sin(t * 2 + i)},-30 0,-60 q${-10 * Math.sin(t * 2 + i)},-30 0,-60`} stroke="#8a86a8" strokeWidth={4} fill="none" strokeLinecap="round" opacity={0.45 * (1 - lit)} />}
    <path d="M-40,-10 Q0,30 40,-10Z" fill="#b8562a" stroke={OL} strokeWidth={5} strokeLinejoin="round" />
  </g>
);

export const Markandeya: React.FC<{ audio?: boolean }> = ({ audio }) => (
  <S.Shell audio={audio} mix="katha/markandeya.wav" tagline="Hold on. Begin your sadhana.">{(t) => (<>
    {/* 1 hook: a boy holding on to the stone */}
    <Scene i={0} t={t} cam={[560, 1180, 1.75, 540, 1060, 1.12]}>{() => (
      <g><Shrine t={t} />
        <g transform="translate(360,1440) scale(1.05)"><Boy pose="hug" eyes={0} smile={0.1} t={t} /></g>
        <g transform="translate(580,1430) scale(1.15)"><Lingam t={t} /></g>
        <g transform="translate(360,1440) scale(1.05)"><path d="M24,-196 Q150,-250 292,-222" stroke={OL} strokeWidth={36} fill="none" strokeLinecap="round" /><path d="M24,-196 Q150,-250 292,-222" stroke={SKIN} strokeWidth={25} fill="none" strokeLinecap="round" /><circle cx={296} cy={-222} r={19} fill={SKIN} stroke={OL} strokeWidth={5} /></g>
      </g>
    )}</Scene>
    {/* 2 sixteen lamps, going out */}
    <Scene i={1} t={t} cam={[540, 1100, 1.0, 540, 1180, 1.14]}>{(u, lt) => {
      const gone = Math.min(15, Math.floor(ease((lt - 0.8) / 5.2) * 15.99));
      return (
        <g><rect width={1080} height={1920} fill="url(#skyN)" /><Stars t={t} h={900} />
          <path d="M0,1180 Q540,1080 1080,1180 L1080,1920 L0,1920Z" fill="#1a1230" /><path d="M0,1180 Q540,1080 1080,1180" stroke="#3a2c58" strokeWidth={8} fill="none" />
          {Array.from({ length: 16 }, (_, i) => { const a = (i / 16) * Math.PI * 2 + 0.2, x = 540 + Math.cos(a) * 400, y = 1480 + Math.sin(a) * 170; return { i, x, y }; }).sort((a, b) => a.y - b.y).map(({ i, x, y }) => <SmallDiya key={i} x={x} y={y} i={i} t={t} lit={i === 15 ? 1 : i < gone ? 0 : 1} />)}
          <g transform="translate(540,1500) scale(1.0)"><Boy pose="stand" eyes={1} smile={0.05} t={t} /></g>
        </g>
      );
    }}</Scene>
    {/* 3 he walks into the temple */}
    <Scene i={2} t={t} cam={[540, 1010, 1.0, 540, 1100, 1.2]}>{(u) => (
      <Temple t={t} glow={0.5}><g transform={`translate(540,${lerp(1900, 1620, ease(u * 1.15))}) scale(${lerp(1.0, 0.7, ease(u * 1.15))})`}><BoyBack t={t} /></g></Temple>
    )}</Scene>
    {/* 4 Yama throws the noose: it catches the boy and the stone */}
    <Scene i={3} t={t} cam={[500, 1020, 1.0, 560, 1080, 1.1]}>{(u, lt) => {
      const inn = ease(lt / 1.3), thr = ease((t - wt(3, "threw")) / 0.9), caught = ease((t - wt(3, "caught") + 0.2) / 0.5);
      const hx = lerp(-300, 250, inn) + 184, hy = 940 - 178;
      return (
        <g><Shrine t={t} warm={0.75} />
          <g transform={`translate(${lerp(-300, 250, inn)},940) scale(.8)`}><Yama t={t} /></g>
          <g transform="translate(640,1440) scale(.82)"><Boy pose="hug" eyes={0} smile={0} t={t} /></g>
          <g transform="translate(815,1432) scale(.9)"><Lingam t={t} /></g>
          <g transform="translate(640,1440) scale(.82)"><path d="M24,-196 Q150,-250 292,-222" stroke={OL} strokeWidth={36} fill="none" strokeLinecap="round" /><path d="M24,-196 Q150,-250 292,-222" stroke={SKIN} strokeWidth={25} fill="none" strokeLinecap="round" /></g>
          {thr > 0 && <g opacity={cl(thr * 3)}>
            <path d={`M${hx},${hy} Q${lerp(hx, 620, thr)},${lerp(hy, 700, thr)} ${lerp(hx, 760, thr)},${lerp(hy, 1150, thr)}`} stroke={OL} strokeWidth={15} fill="none" strokeLinecap="round" /><path d={`M${hx},${hy} Q${lerp(hx, 620, thr)},${lerp(hy, 700, thr)} ${lerp(hx, 760, thr)},${lerp(hy, 1150, thr)}`} stroke="#d9b06a" strokeWidth={8} fill="none" strokeLinecap="round" strokeDasharray="16 7" />
            <ellipse cx={lerp(hx, 745, thr)} cy={lerp(hy, 1235, thr)} rx={lerp(40, 250, thr) - caught * 34} ry={lerp(20, 82, thr) - caught * 14} fill="none" stroke={OL} strokeWidth={15} /><ellipse cx={lerp(hx, 745, thr)} cy={lerp(hy, 1235, thr)} rx={lerp(40, 250, thr) - caught * 34} ry={lerp(20, 82, thr) - caught * 14} fill="none" stroke="#d9b06a" strokeWidth={8} strokeDasharray="16 7" />
          </g>}
        </g>
      );
    }}</Scene>
    {/* 5 the stone splits; Shiva steps out. "This one is mine." */}
    <Scene i={4} t={t} cam={[540, 1100, 1.0, 560, 980, 1.25]}>{(u, lt) => {
      const sp = ease((t - wt(4, "split") + 0.1) / 0.9), rise = ease((t - wt(4, "shiva") + 0.3) / 1.2);
      return (
        <g><Shrine t={t} warm={0.75 + sp} />
          <g transform={`translate(${lerp(250, 70, sp)},${lerp(940, 1000, sp)}) scale(${lerp(0.8, 0.66, sp)})`} opacity={1 - 0.25 * sp}><Yama t={t} fear={sp} /></g>
          {rise > 0 && <g transform={`translate(600,${lerp(1250, 880, rise)}) scale(${lerp(0.9, 2.1, rise)})`} opacity={cl(rise * 2.5)}>
            <circle cx={0} cy={0} r={300} fill="url(#aura)" /><ShivaHead eyes={1} mood={-0.7} open={0.35} smile={0} /></g>}
          <g transform="translate(600,1432) scale(.95)"><Lingam t={t} split={sp} /></g>
          <g transform="translate(360,1440) scale(.84)"><Boy pose="pray" eyes={sp > 0.5 ? 1 : 0} smile={0.2} t={t} /></g>
        </g>
      );
    }}</Scene>
    {/* 6 Death steps back */}
    <Scene i={5} t={t} cam={[540, 1060, 1.0, 600, 1100, 1.12]}>{(u, lt) => (
      <g><Shrine t={t} warm={1.3} />
        <g transform={`translate(${lerp(150, -260, ease(lt / 3.2))},900) scale(.62)`} opacity={1 - 0.5 * ease(lt / 3.2)}><Yama t={t} fear={0.7} /></g>
        <g transform="translate(640,960) scale(.84)"><Shiva t={t} smile={0.9} bless={ease(lt / 0.9)} eyes={1} /></g>
        <g transform="translate(400,1500) scale(.95)"><circle cx={0} cy={-250} r={230} fill="url(#kglow)" opacity={0.4 * ease((lt - 1.4) / 1.2)} /><Boy pose="pray" eyes={1} smile={1} t={t} /></g>
      </g>
    )}</Scene>
    {/* 7 morning at the temple: still sixteen */}
    <Scene i={6} t={t} dur={5} cam={[540, 1250, 1.5, 540, 1010, 1.0]}>{() => (
      <Temple t={t} glow={0.85}><g transform="translate(540,1612) scale(.78)"><circle cx={0} cy={-240} r={260} fill="url(#kglow)" opacity={0.3} /><Boy pose="pray" eyes={0} smile={0.8} t={t} /></g></Temple>
    )}</Scene>
  </>)}</S.Shell>
);
