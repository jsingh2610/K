import React from "react";
import VOJ from "./pillar.json";
import { makeStory, VOT, cl, ease, lerp, rnd, OL, GOLD, Shiva } from "./kit";

const S = makeStory(VOJ as VOT, [0, 1, 2, 3, 4, 5, 6], 4);
export const PILLAR_FRAMES = S.FRAMES;
const { Scene, wt } = S;

const Cosmos: React.FC<{ t: number; drift?: number }> = ({ t, drift = 0 }) => (
  <g>
    <defs>
      <linearGradient id="cos" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#05041a" /><stop offset=".5" stopColor="#170a3a" /><stop offset="1" stopColor="#081a3c" /></linearGradient>
      <radialGradient id="nebA"><stop offset="0" stopColor="#c23fa8" stopOpacity=".45" /><stop offset="1" stopColor="#c23fa8" stopOpacity="0" /></radialGradient>
      <radialGradient id="nebB"><stop offset="0" stopColor="#2fb8c8" stopOpacity=".4" /><stop offset="1" stopColor="#2fb8c8" stopOpacity="0" /></radialGradient>
      <linearGradient id="fireG" x1="0" x2="1"><stop offset="0" stopColor="#ff6a1e" stopOpacity="0" /><stop offset=".22" stopColor="#ff8a1e" /><stop offset=".5" stopColor="#fff6c8" /><stop offset=".78" stopColor="#ff8a1e" /><stop offset="1" stopColor="#ff6a1e" stopOpacity="0" /></linearGradient>
    </defs>
    <rect x={-600} y={-2000} width={2280} height={5920} fill="url(#cos)" />
    <ellipse cx={220} cy={560 + drift * 0.3} rx={520} ry={380} fill="url(#nebA)" /><ellipse cx={900} cy={1300 + drift * 0.3} rx={560} ry={420} fill="url(#nebB)" /><ellipse cx={300} cy={1700 + drift * 0.3} rx={420} ry={300} fill="url(#nebA)" opacity={0.6} />
    {Array.from({ length: 130 }, (_, i) => <circle key={i} cx={rnd(i) * 1080} cy={((rnd(i + 500) * 1920 + drift * (0.4 + rnd(i + 3))) % 1920 + 1920) % 1920} r={0.8 + rnd(i + 900) * 2.4} fill="#fff" opacity={0.3 + 0.6 * Math.abs(Math.sin(t * (0.5 + rnd(i)) + i))} />)}
  </g>
);
/** the endless pillar of fire: x-centred at 0, spans y0..y1 */
const Fire: React.FC<{ t: number; w?: number; y0?: number; y1?: number; open?: number }> = ({ t, w = 190, y0 = -200, y1 = 2200, open = 0 }) => {
  const side = (sx: number) => (
    <g transform={`translate(${sx * open * 250},0)`}>
      <rect x={sx > 0 ? 0 : -w * 1.6} y={y0} width={w * 1.6} height={y1 - y0} fill="url(#kglow)" opacity={0.0} />
      <path d={`M${sx * 4},${y0} ${Array.from({ length: 40 }, (_, i) => { const y = y0 + ((y1 - y0) * (i + 1)) / 40; return `Q${sx * (w * 0.62 + Math.sin(i * 1.9 + t * 7) * 26)},${y - (y1 - y0) / 80 + ((t * 300) % 60) - 30} ${sx * (w * 0.5 + Math.sin(i * 1.3 - t * 5) * 12)},${y}`; }).join(" ")} L${sx * 4},${y1}Z`} fill={sx > 0 ? "#ff8a1e" : "#ff9a2e"} opacity={0.9} />
      <rect x={sx > 0 ? 0 : -w * 0.36} y={y0} width={w * 0.36} height={y1 - y0} fill="#ffd45a" /><rect x={sx > 0 ? 0 : -w * 0.17} y={y0} width={w * 0.17} height={y1 - y0} fill="#fff6c8" />
    </g>
  );
  return (
    <g>
      <rect x={-w * 2.6} y={y0} width={w * 5.2} height={y1 - y0} fill="url(#fireG)" opacity={0.35 + 0.08 * Math.sin(t * 6)} />
      {side(-1)}{side(1)}
    </g>
  );
};
/** Brahma / Vishnu, seated; origin = head centre. mood +1 calm, -1 cross. pose: point at himself | pray */
export const God: React.FC<{ who: "brahma" | "vishnu"; mood?: number; pose?: "point" | "pray"; talk?: number; t: number }> = ({ who, mood = 0, pose = "point", talk = 0, t }) => {
  const B = who === "brahma", skin = B ? "#e9b98c" : "#4a7bd8", sh = B ? "#cf9a6a" : "#3560b8", robe = B ? "#c8284a" : "#f2b632";
  const arm = (d: string, k: string) => <g key={k}><path d={d} stroke={OL} strokeWidth={50} fill="none" strokeLinecap="round" strokeLinejoin="round" /><path d={d} stroke={skin} strokeWidth={38} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>;
  const face = (side = false) => (
    <g>
      <path d="M-84,-20 Q-88,-104 0,-106 Q88,-104 84,-20 Q84,58 0,92 Q-84,58 -84,-20Z" fill={side ? sh : skin} stroke={OL} strokeWidth={6} />
      <path d={`M-58,${-28 - 8 * mood} Q-38,-40 -16,${-24 + 10 * mood} M16,${-24 + 10 * mood} Q38,-40 58,${-28 - 8 * mood}`} stroke={B ? "#f3efe6" : OL} strokeWidth={7} fill="none" strokeLinecap="round" />
      {[-36, 36].map((x) => <g key={x}><path d={`M${x - 20},-2 Q${x},-20 ${x + 20},-2 Q${x},12 ${x - 20},-2Z`} fill="#fff" stroke={OL} strokeWidth={4.5} strokeLinejoin="round" /><circle cx={x} cy={-3} r={8} fill={OL} /></g>)}
      <path d="M-4,6 Q-10,30 6,34" stroke={sh} strokeWidth={5} fill="none" strokeLinecap="round" />
      {B && <path d="M-70,30 Q-60,150 0,170 Q60,150 70,30 Q40,62 0,58 Q-40,62 -70,30Z" fill="#f3efe6" stroke={OL} strokeWidth={5} />}
      {talk > 0.1 ? <ellipse cx={0} cy={B ? 78 : 60} rx={16} ry={5 + 10 * talk} fill="#5a1620" stroke={OL} strokeWidth={4} /> : <path d={`M-20,${B ? 76 : 58} Q0,${(B ? 76 : 58) + 8 + 6 * mood} 20,${B ? 76 : 58}`} stroke={OL} strokeWidth={5} fill="none" strokeLinecap="round" />}
      {B ? <path d="M-22,-62 L22,-62 M-22,-50 L22,-50" stroke="#c8102e" strokeWidth={4} strokeLinecap="round" /> : <path d="M-12,-74 L0,-40 L12,-74" stroke="#f3efe6" strokeWidth={6} fill="none" strokeLinecap="round" />}
      <path d={B ? "M-88,-70 L-74,-170 L-36,-120 L0,-196 L36,-120 L74,-170 L88,-70 Q0,-104 -88,-70Z" : "M-86,-70 Q-70,-150 -40,-200 Q0,-290 40,-200 Q70,-150 86,-70 Q0,-104 -86,-70Z"} fill={GOLD} stroke={OL} strokeWidth={6} strokeLinejoin="round" />
      <circle cx={0} cy={B ? -118 : -150} r={13} fill={B ? "#c8102e" : "#2fb8c8"} stroke={OL} strokeWidth={4} />
    </g>
  );
  return (
    <g>
      {B && <g>{[0, 1, 2, 3, 4, 5, 6].map((i) => { const a = (-150 + i * 20) * (Math.PI / 180); return <ellipse key={i} cx={Math.cos(a) * 190} cy={470 + Math.sin(a) * 60 + 60} rx={70} ry={110} transform={`rotate(${(i - 3) * 16} ${Math.cos(a) * 190} 520)`} fill="#f29ab8" stroke={OL} strokeWidth={6} />; })}</g>}
      <path d="M-200,400 Q-210,330 -100,336 L100,336 Q210,330 200,400 Q210,470 100,470 L-100,470 Q-210,470 -200,400Z" fill={robe} stroke={OL} strokeWidth={7} />
      <rect x={-28} y={80} width={56} height={56} fill={sh} stroke={OL} strokeWidth={6} />
      <path d="M-116,150 Q-134,126 -66,122 L66,122 Q134,126 116,150 L96,350 L-96,350Z" fill={B ? robe : skin} stroke={OL} strokeWidth={7} strokeLinejoin="round" />
      <path d="M-70,128 Q0,230 70,128" stroke={GOLD} strokeWidth={11} fill="none" />{!B && <path d="M-84,140 Q0,330 84,140" stroke="#3f8a55" strokeWidth={14} fill="none" />}
      {B && <><g transform="translate(-92,-4) scale(.62)">{face(true)}</g><g transform="translate(92,-4) scale(.62)">{face(true)}</g></>}
      {pose === "point" ? <>{arm("M-112,160 Q-176,250 -170,340", "l")}{arm("M112,160 Q190,210 60,236", "r")}<circle cx={-170} cy={352} r={25} fill={skin} stroke={OL} strokeWidth={6} /><circle cx={52} cy={236} r={25} fill={skin} stroke={OL} strokeWidth={6} /></>
        : <>{arm("M-112,160 Q-170,250 -14,262", "l")}{arm("M112,160 Q170,250 14,262", "r")}<path d="M-18,280 L0,196 L18,280Z" fill={skin} stroke={OL} strokeWidth={6} strokeLinejoin="round" /></>}
      <g transform={`rotate(${pose === "pray" ? 8 : Math.sin(t * 3) * 2})`}>{face()}</g>
    </g>
  );
};
export const Swan: React.FC<{ t: number }> = ({ t }) => { const f = Math.sin(t * 9) * 28; return (
  <g><circle r={170} fill="url(#aura)" opacity={0.7} />
    <path d={`M-30,20 Q-150,${-40 - f} -230,${30 - f * 1.6} Q-140,${40 - f} -30,70Z M30,20 Q150,${-40 - f} 230,${30 - f * 1.6} Q140,${40 - f} 30,70Z`} fill="#f7f4ea" stroke={OL} strokeWidth={7} strokeLinejoin="round" />
    <ellipse cx={0} cy={60} rx={56} ry={100} fill="#fff" stroke={OL} strokeWidth={7} />
    <path d="M-16,-20 Q-30,-120 0,-150 Q30,-120 16,-20Z" fill="#fff" stroke={OL} strokeWidth={7} /><circle cx={0} cy={-152} r={34} fill="#fff" stroke={OL} strokeWidth={7} />
    <path d="M-12,-176 L0,-226 L12,-176Z" fill="#f29a1e" stroke={OL} strokeWidth={5} strokeLinejoin="round" /><circle cx={-13} cy={-156} r={5} fill={OL} /><circle cx={13} cy={-156} r={5} fill={OL} />
    <path d="M-24,-120 L-14,-140 L0,-126 L14,-140 L24,-120Z" fill={GOLD} stroke={OL} strokeWidth={4} transform="translate(0,6)" />
  </g>); };
export const Boar: React.FC<{ t: number }> = ({ t }) => { const d = Math.sin(t * 11) * 14; return (
  <g><circle r={170} fill="url(#aura)" opacity={0.5} />
    <ellipse cx={0} cy={-60} rx={96} ry={130} fill="#3560b8" stroke={OL} strokeWidth={8} />
    <path d={`M-80,-10 Q-150,${40 + d} -120,${110 + d} M80,-10 Q150,${40 - d} 120,${110 - d}`} stroke={OL} strokeWidth={50} fill="none" strokeLinecap="round" /><path d={`M-80,-10 Q-150,${40 + d} -120,${110 + d} M80,-10 Q150,${40 - d} 120,${110 - d}`} stroke="#4a7bd8" strokeWidth={38} fill="none" strokeLinecap="round" />
    <path d="M-70,60 Q-80,170 0,214 Q80,170 70,60 Q0,20 -70,60Z" fill="#4a7bd8" stroke={OL} strokeWidth={8} />
    <ellipse cx={0} cy={176} rx={40} ry={28} fill="#e8a0b0" stroke={OL} strokeWidth={6} /><circle cx={-13} cy={178} r={6} fill={OL} /><circle cx={13} cy={178} r={6} fill={OL} />
    <path d="M-44,150 Q-74,170 -60,214 M44,150 Q74,170 60,214" stroke="#f6e6c6" strokeWidth={13} fill="none" strokeLinecap="round" />
    <circle cx={-30} cy={104} r={9} fill="#fff" stroke={OL} strokeWidth={3} /><circle cx={30} cy={104} r={9} fill="#fff" stroke={OL} strokeWidth={3} /><circle cx={-30} cy={107} r={4} fill={OL} /><circle cx={30} cy={107} r={4} fill={OL} />
    <path d="M-62,70 L-92,20 L-40,50Z M62,70 L92,20 L40,50Z" fill="#3560b8" stroke={OL} strokeWidth={6} strokeLinejoin="round" />
    <path d="M-30,50 L-18,22 L0,44 L18,22 L30,50Z" fill={GOLD} stroke={OL} strokeWidth={4} />
  </g>); };

export const PillarEp: React.FC<{ audio?: boolean }> = ({ audio }) => (
  <S.Shell audio={audio} mix="katha/pillar.wav" tagline="Bow to the infinite. Begin your sadhana.">{(t) => (<>
    {/* 1 hook: a swan climbing a pillar of fire that never ends */}
    <Scene i={0} t={t} cam={[540, 960, 1.25, 540, 960, 1.0]}>{() => (
      <g><Cosmos t={t} drift={t * 320} /><g transform="translate(540,0)"><Fire t={t} /></g>
        <g transform={`translate(${300 + Math.sin(t * 1.2) * 20},${1040 + Math.sin(t * 2) * 30}) scale(.9)`}><Swan t={t} /></g></g>
    )}</Scene>
    {/* 2 the argument */}
    <Scene i={1} t={t} cam={[540, 1040, 1.0, 540, 1080, 1.1]}>{() => {
      const ask = t > wt(1, "which") ? 1 : 0;
      return (
        <g><Cosmos t={t} />
          <path d="M-100,1560 Q540,1470 1180,1560 L1180,2000 L-100,2000Z" fill="#0c2048" /><path d="M-100,1560 Q540,1470 1180,1560" stroke="#2fb8c8" strokeWidth={6} fill="none" opacity={0.5} />
          <g transform="translate(270,1010) scale(.8)"><God who="brahma" mood={-0.8} talk={ask ? 0 : Math.abs(Math.sin(t * 9))} t={t} /></g>
          <g transform="translate(810,1010) scale(-.8,.8)"><God who="vishnu" mood={-0.8} talk={ask ? Math.abs(Math.sin(t * 9)) : 0} t={t} /></g>
          {[0, 1, 2].map((i) => <path key={i} d={`M${500 + i * 40},${760 + i * 60} l40,-30 l-10,40 l40,-20`} stroke={GOLD} strokeWidth={7} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={0.4 + 0.6 * Math.abs(Math.sin(t * 8 + i))} />)}
        </g>
      );
    }}</Scene>
    {/* 3 the pillar splits the darkness between them */}
    <Scene i={2} t={t} cam={[540, 1040, 1.1, 540, 960, 0.92]}>{(u, lt) => {
      const g = ease((lt - 0.5) / 0.9);
      return (
        <g><Cosmos t={t} />
          <path d="M-100,1560 Q540,1470 1180,1560 L1180,2000 L-100,2000Z" fill="#0c2048" />
          <g transform={`translate(540,0) scale(${g},1)`} opacity={cl(g * 3)}><Fire t={t} y0={-400} y1={2400} /></g>
          <g transform={`translate(${lerp(270, 190, g)},1010) scale(.72)`}><God who="brahma" mood={0.9} talk={g > 0.2 ? 0.8 : 0} t={t} /></g>
          <g transform={`translate(${lerp(810, 890, g)},1010) scale(-.72,.72)`}><God who="vishnu" mood={0.9} talk={g > 0.2 ? 0.8 : 0} t={t} /></g>
        </g>
      );
    }}</Scene>
    {/* 4 the swan flies up, the boar digs down */}
    <Scene i={3} t={t} cam={[540, 960, 1.0, 540, 960, 1.0]}>{(u, lt) => {
      const sw = ease(lt / 0.8), bo = ease((t - wt(3, "vishnu") + 0.3) / 0.8);
      return (
        <g>
          <clipPath id="topH"><rect x={0} y={0} width={1080} height={960} /></clipPath><clipPath id="botH"><rect x={0} y={960} width={1080} height={960} /></clipPath>
          <g clipPath="url(#topH)"><Cosmos t={t} drift={t * 420} /><g transform="translate(700,0)"><Fire t={t} /></g>
            <g transform={`translate(360,${lerp(1100, 640, sw) + Math.sin(t * 2) * 16}) scale(.78)`}><Swan t={t} /></g></g>
          <g clipPath="url(#botH)"><rect y={960} width={1080} height={960} fill="#1c1208" />
            {Array.from({ length: 9 }, (_, i) => <path key={i} d={`M0,${960 + ((i * 130 - t * 300) % 1100 + 1100) % 1100} q270,${30 * (i % 2 ? 1 : -1)} 540,0 t540,0`} stroke={i % 2 ? "#3a2412" : "#4a2f18"} strokeWidth={26} fill="none" />)}
            {Array.from({ length: 16 }, (_, i) => <circle key={i} cx={rnd(i) * 1080} cy={960 + ((rnd(i + 4) * 1000 - t * 300) % 960 + 960) % 960} r={8 + rnd(i + 2) * 16} fill="#2a1a0c" />)}
            <g transform="translate(380,0)"><Fire t={t} /></g>
            <g transform={`translate(720,${lerp(900, 1380, bo) + Math.sin(t * 3) * 10}) scale(.9)`} opacity={cl(bo * 3)}><Boar t={t} /></g></g>
          <path d="M0,960 L1080,960" stroke={GOLD} strokeWidth={5} opacity={0.7} />
        </g>
      );
    }}</Scene>
    {/* 5 a thousand years: pull back and back, and it still has no end */}
    <Scene i={4} t={t} cam={[540, 960, 1.5, 540, 960, 0.34]}>{() => (
      <g><Cosmos t={t} drift={t * 60} />
        <g transform="translate(540,0)"><Fire t={t} y0={-2600} y1={4600} w={170} /></g>
        <g transform={`translate(430,${-1500 + Math.sin(t) * 30}) scale(.8)`}><Swan t={t} /></g>
        <g transform={`translate(650,${3500 + Math.sin(t * 1.3) * 30}) scale(.8)`}><Boar t={t} /></g>
      </g>
    )}</Scene>
    {/* 6 the pillar opens and Shiva steps out */}
    <Scene i={5} t={t} cam={[540, 1040, 1.0, 540, 1000, 1.16]}>{(u, lt) => {
      const op = ease((lt - 0.4) / 1.3), out = ease((t - wt(5, "shiva") + 0.2) / 1.0);
      return (
        <g><Cosmos t={t} />
          <path d="M-100,1600 Q540,1510 1180,1600 L1180,2000 L-100,2000Z" fill="#0c2048" />
          <rect x={540 - 250 * op} y={-200} width={500 * op} height={2400} fill="#fff6c8" opacity={0.92} /><circle cx={540} cy={1000} r={300 + 500 * op} fill="url(#kglow)" opacity={op} />
          <g transform="translate(540,0)"><Fire t={t} open={op} y0={-400} y1={2400} /></g>
          <g transform={`translate(540,${lerp(1010, 960, out)}) scale(${lerp(0.7, 0.9, out)})`} opacity={cl(out * 2)}><Shiva t={t} smile={1} eyes={1} bless={out} /></g>
        </g>
      );
    }}</Scene>
    {/* 7 they bow; the fire settles into a lingam of light */}
    <Scene i={6} t={t} dur={5.5} cam={[540, 1000, 1.16, 540, 1040, 1.0]}>{(u, lt) => (
      <g><Cosmos t={t} />
        <path d="M-100,1600 Q540,1510 1180,1600 L1180,2000 L-100,2000Z" fill="#0c2048" />
        <circle cx={540} cy={1020} r={640} fill="url(#kglow)" opacity={0.55 + 0.06 * Math.sin(t * 3)} />
        <path d="M430,1500 L430,880 Q430,730 540,730 Q650,730 650,880 L650,1500Z" fill="#fff6c8" stroke={GOLD} strokeWidth={10} opacity={0.96} />
        <ellipse cx={540} cy={1500} rx={250} ry={50} fill="#ffd98a" stroke={GOLD} strokeWidth={8} />
        {[1010, 1040, 1070].map((y) => <path key={y} d={`M452,${y} Q540,${y - 12} 628,${y}`} stroke="#f29a1e" strokeWidth={9} fill="none" strokeLinecap="round" opacity={0.75} />)}
        <g transform="translate(190,1150) scale(.62)"><God who="brahma" mood={1} pose="pray" t={t} /></g>
        <g transform="translate(890,1150) scale(-.62,.62)"><God who="vishnu" mood={1} pose="pray" t={t} /></g>
      </g>
    )}</Scene>
  </>)}</S.Shell>
);
