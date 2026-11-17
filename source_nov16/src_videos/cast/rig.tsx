// KAILASA CAST RIG. One figure system in the Kirtimukha storybook style: every human-shaped character
// is a `Fig` (head + body + arms + props). Origin = head centre, same convention as kit `Shiva`.
// Standing feet land at y = +620, seated lap at y = +306..426.
import React from "react";
import { OL, GOLD, lerp } from "../katha/kit";

export type Mood = "calm" | "joy" | "fierce" | "sad" | "awe" | "open";
export type Hair = "bun" | "long" | "wild" | "top" | "short" | "bald" | "locks" | "cap";
export type Crown = "kirita" | "mukut" | "tiara" | "turban" | "horns" | "feather" | "flower" | "skull" | "moon" | "band" | "none";
export type HeadP = {
  skin: string; shade?: string; hair?: Hair; hairCol?: string; crown?: Crown; crownCol?: string;
  mark?: "tri" | "bindi" | "tilakU" | "red" | "none"; third?: number; beard?: "none" | "short" | "long"; beardCol?: string; mous?: boolean;
  fangs?: boolean; tongue?: boolean; rings?: boolean; mood?: Mood; eyeCol?: string; t?: number;
};
const sw = 6;
const sh = (c: string) => c; // readability

/** hair that sits behind the shoulders; drawn before the body */
export const HeadBack: React.FC<HeadP> = ({ hair = "short", hairCol = "#241634", t = 0 }) => (
  <g>
    {(hair === "long" || hair === "locks") && <path d={`M-112,-30 Q-126,-132 0,-140 Q126,-132 112,-30 L${134 + Math.sin(t * 1.4) * 4},214 Q0,250 ${-134 + Math.sin(t * 1.4) * 4},214Z`} fill={hairCol} stroke={OL} strokeWidth={sw} strokeLinejoin="round" />}
    {hair === "locks" && [-96, -60, -22, 22, 60, 96].map((x) => <path key={x} d={`M${x},40 Q${x * 1.18},130 ${x * 1.1 + Math.sin(t * 1.6 + x) * 5},222`} stroke="#4a3568" strokeWidth={6} fill="none" strokeLinecap="round" />)}
    {hair === "wild" && <g>{Array.from({ length: 13 }, (_, i) => { const a = ((-208 + i * (236 / 12)) * Math.PI) / 180, x = Math.cos(a), y = Math.sin(a), L = 196 + (i % 2) * 44 + Math.sin(t * 3 + i) * 6;
      return <path key={i} d={`M${x * 92 - y * 34},${y * 96 - 30 + x * 34} L${x * L},${y * L - 26} L${x * 92 + y * 34},${y * 96 - 30 - x * 34}Z`} fill={hairCol} stroke={OL} strokeWidth={sw} strokeLinejoin="round" />; })}</g>}
    {(hair === "bun" || hair === "short" || hair === "top" || hair === "cap") && <path d="M-106,-20 Q-120,-132 0,-140 Q120,-132 106,-20 L98,58 L-98,58Z" fill={hairCol} stroke={OL} strokeWidth={sw} strokeLinejoin="round" />}
    {hair === "bun" && <g><ellipse cx={0} cy={-166} rx={52} ry={42} fill={hairCol} stroke={OL} strokeWidth={sw} /><path d="M-34,-176 Q0,-196 34,-176" stroke="#4a3568" strokeWidth={5} fill="none" /></g>}
    {hair === "top" && <g><ellipse cx={0} cy={-170} rx={36} ry={32} fill={hairCol} stroke={OL} strokeWidth={sw} /><path d="M-30,-146 L30,-146" stroke="#b8451c" strokeWidth={9} strokeLinecap="round" /></g>}
  </g>
);

export const Head: React.FC<HeadP> = ({ skin, shade, hair = "short", hairCol = "#241634", crown = "none", crownCol = GOLD, mark = "none", third = 0, beard = "none", beardCol = "#241634", mous, fangs, tongue, rings = true, mood = "calm", eyeCol = "#1b1020", t = 0 }) => {
  const sd = shade ?? skin, open = mood === "fierce" || mood === "sad" || mood === "awe" || mood === "open";
  const by = mood === "fierce" ? [-48, -20] : mood === "sad" ? [-22, -46] : mood === "awe" ? [-50, -50] : mood === "joy" ? [-40, -44] : [-30, -32]; // brow outer, inner
  return (
    <g>
      <ellipse cx={-102} cy={6} rx={16} ry={26} fill={skin} stroke={OL} strokeWidth={5} /><ellipse cx={102} cy={6} rx={16} ry={26} fill={sd} stroke={OL} strokeWidth={5} />
      {rings && <g><circle cx={-104} cy={38} r={11} fill={GOLD} stroke={OL} strokeWidth={3} /><circle cx={104} cy={38} r={11} fill={GOLD} stroke={OL} strokeWidth={3} /></g>}
      <path d="M-96,-30 Q-100,-118 0,-120 Q100,-118 96,-30 Q96,62 0,106 Q-96,62 -96,-30Z" fill={skin} stroke={OL} strokeWidth={sw} />
      <path d="M96,-30 Q96,62 0,106 Q60,56 62,-40 Q84,-60 96,-30Z" fill={sd} opacity={0.45} />
      {hair !== "bald" && <path d="M-98,-40 Q-78,-110 0,-92 Q78,-110 98,-40 Q102,-126 0,-128 Q-102,-126 -98,-40Z" fill={hairCol} />}
      {hair === "bald" && <path d="M-60,-104 Q0,-122 60,-104" stroke="#fff" strokeWidth={5} fill="none" opacity={0.25} strokeLinecap="round" />}
      {mark === "tri" && [-78, -66, -54].map((y) => <path key={y} d={`M-50,${y} Q0,${y - 5} 50,${y}`} stroke="#f3efe6" strokeWidth={5.5} fill="none" strokeLinecap="round" opacity={0.92} />)}
      {mark === "bindi" && <circle cx={0} cy={-58} r={8} fill="#d61f3a" stroke={OL} strokeWidth={2} />}
      {mark === "red" && <path d="M0,-84 L0,-48" stroke="#c0282d" strokeWidth={6} strokeLinecap="round" />}
      {mark === "tilakU" && <g><path d="M-13,-88 Q-13,-50 0,-48 Q13,-50 13,-88" stroke="#f3efe6" strokeWidth={5} fill="none" strokeLinecap="round" /><path d="M0,-82 L0,-56" stroke="#c0282d" strokeWidth={5} strokeLinecap="round" /></g>}
      {third > 0.02 && <g><circle cx={0} cy={-66} r={30 + 80 * third} fill="url(#kglow)" opacity={third} /><path d={`M0,-92 Q${20 * third},-66 0,-40 Q${-20 * third},-66 0,-92Z`} fill="#fff1b0" stroke={OL} strokeWidth={4} /><ellipse cx={0} cy={-66} rx={7 * third} ry={12 * third} fill="#ff5a1e" /></g>}
      <path d={`M-70,${by[0]} Q-44,${Math.min(by[0], by[1]) - 10} -18,${by[1]} M18,${by[1]} Q44,${Math.min(by[0], by[1]) - 10} 70,${by[0]}`} stroke={beardCol === "#f1ece0" ? "#cfc8b6" : OL} strokeWidth={7} fill="none" strokeLinecap="round" />
      {open
        ? [-42, 42].map((x) => <g key={x}>{mood === "awe"
          ? <circle cx={x} cy={-4} r={21} fill="#f7f4ea" stroke={OL} strokeWidth={5} />
          : <path d={`M${x - 23},-4 Q${x},${mood === "fierce" ? -18 : -24} ${x + 23},-4 Q${x},12 ${x - 23},-4Z`} fill="#f7f4ea" stroke={OL} strokeWidth={5} strokeLinejoin="round" />}
          <circle cx={x} cy={mood === "sad" ? -1 : -5} r={mood === "fierce" ? 7.5 : 9} fill={eyeCol} /><circle cx={x + 3} cy={-8} r={2.6} fill="#fff" /></g>)
        : mood === "joy"
          ? <path d="M-64,2 Q-42,-18 -20,2 M20,2 Q42,-18 64,2" stroke={OL} strokeWidth={6} fill="none" strokeLinecap="round" />
          : <path d="M-64,-6 Q-42,10 -20,-6 M20,-6 Q42,10 64,-6" stroke={OL} strokeWidth={6} fill="none" strokeLinecap="round" />}
      {mood === "sad" && <path d="M-50,16 q7,12 0,20 q-7,-8 0,-20Z" fill="#cfeaff" stroke={OL} strokeWidth={2.5} />}
      <path d="M-4,6 Q-10,32 6,36" stroke={OL} strokeWidth={4.5} fill="none" strokeLinecap="round" opacity={0.45} />
      {mood === "joy" && <path d="M-30,52 Q0,58 30,52 Q22,88 0,88 Q-22,88 -30,52Z" fill="#5a1218" stroke={OL} strokeWidth={5} strokeLinejoin="round" />}
      {mood === "joy" && <path d="M-14,78 Q0,70 14,78 Q8,86 0,86 Q-8,86 -14,78Z" fill="#e8647a" />}
      {mood === "fierce" && <g><path d="M-36,50 Q0,40 36,50 Q34,84 0,86 Q-34,84 -36,50Z" fill="#5a1218" stroke={OL} strokeWidth={5} strokeLinejoin="round" />{[-22, -8, 6, 20].map((x) => <path key={x} d={`M${x - 6},49 L${x + 1},60 L${x + 8},49Z`} fill="#f6e6c6" />)}</g>}
      {mood === "awe" && <ellipse cx={0} cy={66} rx={11} ry={14} fill="#5a1218" stroke={OL} strokeWidth={5} />}
      {mood === "sad" && <path d="M-22,70 Q0,56 22,70" stroke={OL} strokeWidth={6} fill="none" strokeLinecap="round" />}
      {(mood === "calm" || mood === "open") && <path d="M-26,58 Q0,76 26,58" stroke={OL} strokeWidth={6} fill="none" strokeLinecap="round" />}
      {fangs && <path d="M-30,56 L-24,84 L-16,58Z M30,56 L24,84 L16,58Z" fill="#f6e6c6" stroke={OL} strokeWidth={3.5} strokeLinejoin="round" />}
      {tongue && <path d="M-16,70 Q-18,128 0,134 Q18,128 16,70Z" fill="#e23b4a" stroke={OL} strokeWidth={5} strokeLinejoin="round" />}
      {beard !== "none" && <path d={beard === "long" ? "M-94,6 Q-100,160 0,276 Q100,160 94,6 Q64,92 0,96 Q-64,92 -94,6Z" : "M-94,6 Q-94,116 0,136 Q94,116 94,6 Q64,92 0,96 Q-64,92 -94,6Z"} fill={beardCol} stroke={OL} strokeWidth={sw} strokeLinejoin="round" />}
      {beard === "long" && <path d="M-26,128 Q-12,200 0,240 M26,128 Q12,200 0,240" stroke={OL} strokeWidth={4} fill="none" opacity={0.3} strokeLinecap="round" />}
      {mous && <path d="M-44,50 Q-22,34 0,46 Q22,34 44,50 Q22,58 0,52 Q-22,58 -44,50Z" fill={beardCol} stroke={OL} strokeWidth={4} strokeLinejoin="round" />}
      {crown === "kirita" && <g><path d="M-80,-104 L-66,-246 Q0,-304 66,-246 L80,-104 Q0,-132 -80,-104Z" fill={crownCol} stroke={OL} strokeWidth={sw} strokeLinejoin="round" /><path d="M-72,-150 Q0,-176 72,-150 M-68,-200 Q0,-226 68,-200" stroke="#b8802a" strokeWidth={6} fill="none" /><circle cx={0} cy={-136} r={13} fill="#d61f3a" stroke={OL} strokeWidth={4} /><circle cx={0} cy={-270} r={11} fill="#fff6d8" stroke={OL} strokeWidth={4} /></g>}
      {crown === "mukut" && <g><path d="M-86,-100 L-96,-186 L-48,-146 L0,-226 L48,-146 L96,-186 L86,-100 Q0,-128 -86,-100Z" fill={crownCol} stroke={OL} strokeWidth={sw} strokeLinejoin="round" /><circle cx={0} cy={-136} r={12} fill="#d61f3a" stroke={OL} strokeWidth={4} /><circle cx={-52} cy={-124} r={7} fill="#6fd0ff" stroke={OL} strokeWidth={3} /><circle cx={52} cy={-124} r={7} fill="#6fd0ff" stroke={OL} strokeWidth={3} /></g>}
      {crown === "tiara" && <g><path d="M-92,-64 Q0,-132 92,-64" stroke={OL} strokeWidth={20} fill="none" strokeLinecap="round" /><path d="M-92,-64 Q0,-132 92,-64" stroke={crownCol} strokeWidth={11} fill="none" strokeLinecap="round" /><path d="M-16,-104 L0,-146 L16,-104Z" fill={crownCol} stroke={OL} strokeWidth={4} strokeLinejoin="round" /><circle cx={0} cy={-80} r={8} fill="#d61f3a" stroke={OL} strokeWidth={3} /></g>}
      {crown === "turban" && <g><path d="M-108,-56 Q-126,-176 0,-184 Q126,-176 108,-56 Q0,-110 -108,-56Z" fill={crownCol} stroke={OL} strokeWidth={sw} strokeLinejoin="round" /><path d="M-90,-110 Q0,-150 90,-110 M-70,-150 Q0,-180 70,-150" stroke={OL} strokeWidth={4} fill="none" opacity={0.35} /><circle cx={0} cy={-108} r={13} fill={GOLD} stroke={OL} strokeWidth={4} /></g>}
      {crown === "horns" && <g><path d="M-78,-104 Q-150,-180 -92,-250 Q-100,-176 -34,-124Z M78,-104 Q150,-180 92,-250 Q100,-176 34,-124Z" fill="#f6e6c6" stroke={OL} strokeWidth={sw} strokeLinejoin="round" /><path d="M-70,-100 Q0,-126 70,-100" stroke={OL} strokeWidth={18} fill="none" strokeLinecap="round" /><path d="M-70,-100 Q0,-126 70,-100" stroke={crownCol} strokeWidth={9} fill="none" strokeLinecap="round" /></g>}
      {crown === "band" && <g><path d="M-96,-70 Q0,-108 96,-70" stroke={OL} strokeWidth={18} fill="none" strokeLinecap="round" /><path d="M-96,-70 Q0,-108 96,-70" stroke={crownCol} strokeWidth={9} fill="none" strokeLinecap="round" /></g>}
      {crown === "feather" && <g><path d="M-96,-70 Q0,-108 96,-70" stroke={OL} strokeWidth={18} fill="none" strokeLinecap="round" /><path d="M-96,-70 Q0,-108 96,-70" stroke={crownCol} strokeWidth={9} fill="none" strokeLinecap="round" /><path d="M66,-92 Q120,-200 78,-246 Q40,-190 54,-96Z" fill="#3fa37a" stroke={OL} strokeWidth={5} strokeLinejoin="round" /><path d="M62,-96 L80,-230" stroke={OL} strokeWidth={3} /></g>}
      {crown === "flower" && [-66, -34, 0, 34, 66].map((x, i) => <g key={x}><circle cx={x} cy={-104 - (2 - Math.abs(i - 2)) * 9} r={17} fill={i % 2 ? "#ffd45a" : "#ff8fb0"} stroke={OL} strokeWidth={4} /><circle cx={x} cy={-104 - (2 - Math.abs(i - 2)) * 9} r={5} fill="#fff6d8" /></g>)}
      {crown === "skull" && <g><path d="M-24,-124 Q-28,-164 0,-166 Q28,-164 24,-124 L16,-110 L-16,-110Z" fill="#f1ece0" stroke={OL} strokeWidth={4} strokeLinejoin="round" /><circle cx={-10} cy={-138} r={6} fill={OL} /><circle cx={10} cy={-138} r={6} fill={OL} /><path d="M-8,-116 L-8,-110 M0,-116 L0,-110 M8,-116 L8,-110" stroke={OL} strokeWidth={3} /></g>}
      {crown === "moon" && <path d="M50,-232 A34,34 0 1 0 92,-190 A26,26 0 1 1 50,-232Z" fill="#fff6d8" stroke="#e8d9a0" strokeWidth={2} />}
    </g>
  );
};

// ---------------------------------------------------------------- props (origin = the hand)
export const Prop: React.FC<{ k: string; t?: number }> = ({ k, t = 0 }) => {
  const st = { stroke: OL, strokeWidth: 6, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
  const staff = (c: string, y0: number, y1: number) => <g><path d={`M0,${y0} L0,${y1}`} stroke={OL} strokeWidth={16} strokeLinecap="round" /><path d={`M0,${y0} L0,${y1}`} stroke={c} strokeWidth={8} strokeLinecap="round" /></g>;
  switch (k) {
    case "trishul": return <g>{staff("#d9a441", -330, 250)}<path d="M0,-460 L-14,-370 L14,-370Z M-54,-430 Q-60,-350 0,-342 Q60,-350 54,-430 Q40,-370 0,-370 Q-40,-370 -54,-430Z" fill={GOLD} {...st} /><path d="M-26,-280 L26,-240 L26,-280 L-26,-240Z" fill="#b8451c" {...st} strokeWidth={5} /></g>;
    case "damaru": return <g><path d="M-34,-40 L34,-40 L8,0 L34,40 L-34,40 L-8,0Z" fill="#b8451c" {...st} /><path d="M-34,-40 L34,-40 M-34,40 L34,40" stroke={GOLD} strokeWidth={8} strokeLinecap="round" /><path d={`M0,0 Q-40,10 ${-52 + Math.sin(t * 14) * 8},${-14}`} stroke={OL} strokeWidth={3} fill="none" /><circle cx={-52 + Math.sin(t * 14) * 8} cy={-14} r={7} fill={GOLD} stroke={OL} strokeWidth={3} /></g>;
    case "sword": return <g><path d="M-13,-30 L-9,-250 L0,-290 L9,-250 L13,-30Z" fill="#dfe6f5" {...st} /><path d="M0,-40 L0,-270" stroke="#9fb0cf" strokeWidth={4} /><path d="M-40,-30 L40,-30" stroke={OL} strokeWidth={22} strokeLinecap="round" /><path d="M-40,-30 L40,-30" stroke={GOLD} strokeWidth={12} strokeLinecap="round" /><path d="M0,-20 L0,36" stroke={OL} strokeWidth={22} strokeLinecap="round" /><path d="M0,-20 L0,36" stroke="#7a3a1a" strokeWidth={12} strokeLinecap="round" /></g>;
    case "shield": return <g><circle r={78} fill="#b8802a" {...st} /><circle r={56} fill={GOLD} stroke={OL} strokeWidth={4} /><circle r={18} fill="#d61f3a" stroke={OL} strokeWidth={4} /></g>;
    case "bow": return <g><path d="M0,-200 Q130,0 0,200" fill="none" stroke={OL} strokeWidth={20} strokeLinecap="round" /><path d="M0,-200 Q130,0 0,200" fill="none" stroke="#b8802a" strokeWidth={10} strokeLinecap="round" /><path d="M0,-200 L0,200" stroke="#f3efe6" strokeWidth={3} /></g>;
    case "sugarbow": return <g><path d="M0,-180 Q110,0 0,180" fill="none" stroke={OL} strokeWidth={20} strokeLinecap="round" /><path d="M0,-180 Q110,0 0,180" fill="none" stroke="#7fc36a" strokeWidth={10} strokeLinecap="round" />{[-120, -60, 0, 60, 120].map((y) => <circle key={y} cx={Math.cos((y / 180) * 1.5) * 52} cy={y} r={7} fill="#ff8fb0" stroke={OL} strokeWidth={2.5} />)}<path d="M0,-180 L0,180" stroke="#ffd45a" strokeWidth={3} strokeDasharray="6 8" /></g>;
    case "arrow": return <g><path d="M0,60 L0,-190" stroke={OL} strokeWidth={10} strokeLinecap="round" /><path d="M0,60 L0,-190" stroke="#e9dcc0" strokeWidth={4} strokeLinecap="round" /><path d="M0,-230 L-16,-186 L16,-186Z" fill="#dfe6f5" {...st} strokeWidth={4} /></g>;
    case "lotus": return <g><path d="M0,10 L0,110" stroke={OL} strokeWidth={10} strokeLinecap="round" /><path d="M0,10 L0,110" stroke="#3f8a55" strokeWidth={5} strokeLinecap="round" />{[-50, -25, 0, 25, 50].map((a) => <path key={a} d="M0,6 Q-24,-34 0,-72 Q24,-34 0,6Z" transform={`rotate(${a})`} fill={a === 0 ? "#ffb3c8" : "#ff8fb0"} {...st} strokeWidth={4.5} />)}</g>;
    case "modak": return <g><path d="M-34,14 Q-40,-14 0,-48 Q40,-14 34,14 Q0,34 -34,14Z" fill="#fff1c9" {...st} /><path d="M-14,-20 Q0,-8 -6,14 M12,-22 Q4,-6 10,14" stroke="#d9b56a" strokeWidth={4} fill="none" /></g>;
    case "axe": return <g>{staff("#7a3a1a", -210, 60)}<path d="M0,-200 Q76,-222 86,-150 Q76,-90 0,-112Z" fill="#dfe6f5" {...st} /></g>;
    case "noose": return <g><ellipse cx={0} cy={-64} rx={34} ry={48} fill="none" stroke={OL} strokeWidth={15} /><ellipse cx={0} cy={-64} rx={34} ry={48} fill="none" stroke="#e0b25a" strokeWidth={7} /><path d="M0,-16 L0,40" stroke={OL} strokeWidth={15} strokeLinecap="round" /><path d="M0,-16 L0,40" stroke="#e0b25a" strokeWidth={7} strokeLinecap="round" /></g>;
    case "goad": return <g>{staff("#b8802a", -190, 60)}<path d="M0,-190 L0,-236 M0,-196 Q46,-196 44,-150" stroke={OL} strokeWidth={14} fill="none" strokeLinecap="round" /><path d="M0,-190 L0,-236 M0,-196 Q46,-196 44,-150" stroke="#dfe6f5" strokeWidth={6} fill="none" strokeLinecap="round" /></g>;
    case "vel": return <g>{staff("#d9a441", -260, 250)}<path d="M0,-440 Q-58,-330 0,-262 Q58,-330 0,-440Z" fill="#eef4ff" {...st} /><path d="M0,-420 L0,-280" stroke="#9fb0cf" strokeWidth={4} /><circle cx={0} cy={-250} r={13} fill="#d61f3a" stroke={OL} strokeWidth={4} /></g>;
    case "veena": return <g transform="rotate(-38)"><path d="M0,-210 L0,80" stroke={OL} strokeWidth={22} strokeLinecap="round" /><path d="M0,-210 L0,80" stroke="#b8802a" strokeWidth={12} strokeLinecap="round" /><circle cx={0} cy={110} r={56} fill="#e08a2a" {...st} /><circle cx={0} cy={-212} r={30} fill="#e08a2a" {...st} />{[-5, 0, 5].map((x) => <path key={x} d={`M${x},-200 L${x},100`} stroke="#fff6d8" strokeWidth={1.6} />)}</g>;
    case "mace": return <g>{staff("#b8802a", -150, 70)}<path d="M-46,-196 Q-56,-262 0,-272 Q56,-262 46,-196 Q0,-150 -46,-196Z" fill={GOLD} {...st} /><path d="M-40,-216 Q0,-196 40,-216" stroke="#b8802a" strokeWidth={5} fill="none" /><circle cx={0} cy={-280} r={12} fill="#d61f3a" stroke={OL} strokeWidth={4} /></g>;
    case "chakra": return <g transform={`rotate(${t * 220})`}><circle r={58} fill={GOLD} {...st} /><circle r={36} fill="#fff6d8" stroke={OL} strokeWidth={4} />{Array.from({ length: 8 }, (_, i) => <path key={i} d="M0,-58 L8,-80 L-8,-80Z" transform={`rotate(${i * 45})`} fill={GOLD} stroke={OL} strokeWidth={3.5} strokeLinejoin="round" />)}<circle r={10} fill="#d61f3a" stroke={OL} strokeWidth={3} /></g>;
    case "conch": return <g><path d="M-30,-50 Q-58,0 -20,48 Q20,66 40,20 Q52,-30 10,-62 Q-6,-76 -30,-50Z" fill="#fff6ea" {...st} /><path d="M-18,-30 Q-30,8 0,30 M0,-44 Q-8,-10 18,10" stroke="#d9c9a8" strokeWidth={4} fill="none" strokeLinecap="round" /></g>;
    case "kapala": return <g><path d="M-44,-10 Q-48,36 0,40 Q48,36 44,-10Z" fill="#f1ece0" {...st} /><ellipse cx={0} cy={-10} rx={44} ry={12} fill="#5a1218" stroke={OL} strokeWidth={5} /></g>;
    case "staff": return staff("#7a3a1a", -260, 250);
    case "ladle": return <g>{staff("#b8802a", -150, 70)}<ellipse cx={0} cy={-176} rx={40} ry={28} fill={GOLD} {...st} /><ellipse cx={0} cy={-180} rx={26} ry={14} fill="#fff6ea" stroke={OL} strokeWidth={3} /></g>;
    case "pot": return <g><path d="M-46,-6 Q-66,58 0,70 Q66,58 46,-6 Q36,-34 22,-38 L-22,-38 Q-36,-34 -46,-6Z" fill="#d9a441" {...st} /><ellipse cx={0} cy={-42} rx={34} ry={10} fill={GOLD} stroke={OL} strokeWidth={5} /><path d="M-40,14 Q0,30 40,14" stroke="#8a5a1a" strokeWidth={5} fill="none" /></g>;
    case "ricepot": return <g><path d="M-46,-6 Q-66,58 0,70 Q66,58 46,-6 Q36,-34 22,-38 L-22,-38 Q-36,-34 -46,-6Z" fill="#d9a441" {...st} /><path d="M-36,-40 Q0,-86 36,-40Z" fill="#fffaf0" stroke={OL} strokeWidth={5} strokeLinejoin="round" /></g>;
    case "moneypot": return <g><path d="M-46,-6 Q-66,58 0,70 Q66,58 46,-6 Q36,-34 22,-38 L-22,-38 Q-36,-34 -46,-6Z" fill="#b8451c" {...st} />{[[-20, -46], [6, -54], [24, -42], [-4, -66]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={15} fill={GOLD} stroke={OL} strokeWidth={4} />)}</g>;
    case "mala": return <g>{Array.from({ length: 14 }, (_, i) => { const a = (i / 14) * Math.PI * 2; return <circle key={i} cx={Math.cos(a) * 30} cy={46 + Math.sin(a) * 42} r={7.5} fill="#7a3a1a" stroke={OL} strokeWidth={2.5} />; })}</g>;
    case "fire": return <g><circle r={90} fill="url(#kglow)" opacity={0.7} /><path d={`M0,${-96 - Math.sin(t * 9) * 8} Q44,-30 24,6 Q0,26 -24,6 Q-44,-30 0,${-96 - Math.sin(t * 9) * 8}Z`} fill="#ff8a1e" {...st} strokeWidth={5} /><path d={`M0,${-50 - Math.sin(t * 11) * 5} Q18,-14 8,2 Q0,10 -8,2 Q-18,-14 0,${-50 - Math.sin(t * 11) * 5}Z`} fill="#ffe07a" /></g>;
    case "flag": return <g>{staff("#d9a441", -330, 250)}<path d={`M0,-326 Q60,${-340 + Math.sin(t * 5) * 8} 124,-300 Q64,${-274 + Math.sin(t * 5) * 8} 0,-256Z`} fill="#d61f3a" {...st} strokeWidth={5} /></g>;
    case "vajra": return <g><path d="M0,-90 L-26,-40 L-8,-30 L-8,30 L-26,40 L0,90 L26,40 L8,30 L8,-30 L26,-40Z" fill={GOLD} {...st} /><circle r={12} fill="#6fd0ff" stroke={OL} strokeWidth={4} /></g>;
    case "kamandalu": return <g><path d="M-36,0 Q-46,56 0,62 Q46,56 36,0 Q24,-20 0,-22 Q-24,-20 -36,0Z" fill="#b8802a" {...st} /><path d="M-28,-14 Q0,-78 28,-14" fill="none" stroke={OL} strokeWidth={12} /><path d="M-28,-14 Q0,-78 28,-14" fill="none" stroke="#d9a441" strokeWidth={5} /><path d="M34,10 L62,-8" stroke={OL} strokeWidth={14} strokeLinecap="round" /><path d="M34,10 L62,-8" stroke="#b8802a" strokeWidth={6} strokeLinecap="round" /></g>;
    case "book": return <g><rect x={-52} y={-22} width={104} height={44} rx={5} fill="#e9dcc0" {...st} /><path d="M-40,-8 L40,-8 M-40,6 L40,6" stroke="#8a6a3a" strokeWidth={3} /><circle cx={-30} r={4} fill={OL} /><circle cx={30} r={4} fill={OL} /></g>;
    case "bell": return <g><path d="M-30,30 Q-30,-40 0,-44 Q30,-40 30,30 L40,44 L-40,44Z" fill={GOLD} {...st} /><circle cx={0} cy={54} r={9} fill="#c9a23e" stroke={OL} strokeWidth={3} /><path d="M0,-44 L0,-70" stroke={OL} strokeWidth={8} strokeLinecap="round" /></g>;
    case "drum": return <g><path d="M-70,-34 Q-84,0 -70,34 L70,34 Q84,0 70,-34Z" fill="#b8451c" {...st} /><ellipse cx={-70} cy={0} rx={15} ry={34} fill="#f1e3c8" stroke={OL} strokeWidth={5} /><path d="M-50,-34 L-30,34 M-10,-34 L10,34 M30,-34 L50,34" stroke={GOLD} strokeWidth={4} /></g>;
    case "eyeball": return <g><circle r={24} fill="#f7f4ea" {...st} strokeWidth={4} /><circle r={10} fill="#3a2414" /><circle cx={3} cy={-3} r={3} fill="#fff" /></g>;
    case "tusk": return <path d="M-6,20 Q-16,-30 10,-60 Q8,-20 14,20Z" fill="#fffaf0" {...st} strokeWidth={5} />;
    case "meat": return <g><ellipse cx={0} cy={-10} rx={40} ry={28} fill="#b8451c" {...st} /><path d="M26,6 L60,34" stroke={OL} strokeWidth={16} strokeLinecap="round" /><path d="M26,6 L60,34" stroke="#f1ece0" strokeWidth={8} strokeLinecap="round" /></g>;
    case "milk": return <g><path d="M-30,-30 L30,-30 L24,40 L-24,40Z" fill="#d9a441" {...st} /><ellipse cx={0} cy={-30} rx={30} ry={9} fill="#fffaf0" stroke={OL} strokeWidth={4} /></g>;
    case "skullstaff": return <g>{staff("#7a3a1a", -250, 250)}<path d="M-30,-290 Q-34,-340 0,-342 Q34,-340 30,-290 L20,-270 L-20,-270Z" fill="#f1ece0" {...st} strokeWidth={5} /><circle cx={-12} cy={-306} r={7} fill={OL} /><circle cx={12} cy={-306} r={7} fill={OL} /></g>;
    case "head5": return <g><path d="M-36,-10 Q-40,-64 0,-66 Q40,-64 36,-10 Q30,34 0,40 Q-30,34 -36,-10Z" fill="#f1ece0" {...st} strokeWidth={5} /><circle cx={-14} cy={-22} r={9} fill={OL} /><circle cx={14} cy={-22} r={9} fill={OL} /><path d="M-12,16 L12,16" stroke={OL} strokeWidth={4} /></g>;
    default: return null;
  }
};

// ---------------------------------------------------------------- the figure
export type ArmPose = "down" | "bless" | "up" | "out" | "hip" | "fwd" | "namaste" | "lap" | "upout" | "low";
export type ArmP = { s: 1 | -1; pose: ArmPose; prop?: string; back?: boolean; rot?: number };
export type Lower = { kind: "dhoti" | "sari" | "tiger" | "bark" | "short" | "none"; col: string; border?: string };
export type FigP = HeadP & {
  head?: React.ReactNode; headBack?: React.ReactNode; pose?: "stand" | "sit"; female?: boolean; top?: string; lower?: Lower; arms?: ArmP[];
  neck?: ("gold" | "rudra" | "skull" | "snake" | "flower" | "pearl")[]; sash?: string; belly?: boolean; thread?: boolean; aura?: string; armlets?: boolean; anklets?: boolean; thin?: boolean;
  back?: React.ReactNode; front?: React.ReactNode; mid?: React.ReactNode; legCol?: string; legs?: React.ReactNode;
};
const ARM: Record<ArmPose, [number, number, number, number]> = { // ctrl x,y, hand x,y for the right side (s=1)
  down: [176, 250, 180, 340], bless: [206, 204, 196, 100], up: [238, 110, 226, -52], out: [214, 150, 298, 176], hip: [214, 236, 124, 300],
  fwd: [176, 262, 62, 232], namaste: [156, 256, 16, 214], lap: [172, 276, 44, 336], upout: [252, 150, 304, 16], low: [200, 280, 250, 380],
};
export const handAt = (a: ArmP): [number, number] => { const [, , hx, hy] = ARM[a.pose]; return [a.s * hx, hy + (a.back ? -34 : 0)]; };

export const Fig: React.FC<FigP> = (p) => {
  const { skin, shade, pose = "stand", female, top, lower = { kind: "dhoti", col: "#e9dcc0", border: GOLD }, arms = [{ s: -1, pose: "down" }, { s: 1, pose: "down" }], neck = [], sash, belly, thread, aura, armlets, anklets, thin, t = 0 } = p;
  const sd = shade ?? skin, W = female || thin ? 0.84 : 1, aw = female || thin ? 34 : 42, br = Math.sin(t * 1.5) * 2.5;
  const arm = (a: ArmP, i: number) => {
    const [cx, cy, hx, hy] = ARM[a.pose], oy = a.back ? -34 : 0, col = a.back ? sd : a.s > 0 ? sd : skin;
    const d = `M${a.s * 116 * W},${160 + oy * 0.3} Q${a.s * cx},${cy + oy} ${a.s * hx},${hy + oy}`;
    return (
      <g key={`${i}${a.pose}${a.s}`}>
        <path d={d} stroke={OL} strokeWidth={aw + 12} fill="none" strokeLinecap="round" /><path d={d} stroke={col} strokeWidth={aw} fill="none" strokeLinecap="round" />
        {armlets && <path d={`M${a.s * (130 * W + 6)},${196 + oy * 0.5} l${a.s * 34},10`} stroke={GOLD} strokeWidth={11} strokeLinecap="round" />}
        <g transform={`translate(${a.s * hx},${hy + oy})`}>
          {a.prop && <g transform={`rotate(${(a.rot ?? 0) * a.s})`}><Prop k={a.prop} t={t} /></g>}
          {a.pose === "bless"
            ? <g><path d="M-28,28 L-28,-24 Q0,-56 28,-24 L28,28Z" fill={col} stroke={OL} strokeWidth={6} strokeLinejoin="round" /><circle r={8} fill="#ffe07a" /></g>
            : <circle r={aw * 0.62} fill={col} stroke={OL} strokeWidth={6} />}
        </g>
      </g>
    );
  };
  const garment = lower.col, bd = lower.border ?? GOLD;
  return (
    <g>
      {aura && <circle cx={0} cy={pose === "sit" ? 120 : 220} r={pose === "sit" ? 430 : 520} fill={`url(#${aura})`} opacity={0.75 + 0.1 * Math.sin(t * 1.5)} />}
      {p.back}
      {p.headBack ?? <HeadBack {...p} />}
      {arms.filter((a) => a.back).map(arm)}
      {/* legs / lap */}
      {p.legs ?? (pose === "sit" ? (
        <g>
          <path d="M-236,362 Q-246,300 -120,306 L120,306 Q246,300 236,362 Q246,426 120,426 L-120,426 Q-246,426 -236,362Z" fill={lower.kind === "none" ? skin : garment} stroke={OL} strokeWidth={7} />
          {lower.kind === "tiger" && [-170, -110, -40, 40, 110, 170].map((x, i) => <path key={i} d={`M${x},${318 + (i % 2) * 6} q10,26 -6,52`} stroke="#5a2a10" strokeWidth={9} fill="none" strokeLinecap="round" />)}
          {lower.kind !== "tiger" && lower.kind !== "none" && <path d="M-214,392 Q0,424 214,392" stroke={bd} strokeWidth={8} fill="none" strokeLinecap="round" />}
          <ellipse cx={-64} cy={414} rx={44} ry={20} fill={skin} stroke={OL} strokeWidth={5} /><ellipse cx={64} cy={414} rx={44} ry={20} fill={sd} stroke={OL} strokeWidth={5} />
        </g>
      ) : (
        <g>
          {[-1, 1].map((s) => <g key={s}><path d={`M${s * 50 * W},330 L${s * 56 * W},590`} stroke={OL} strokeWidth={aw + 22} strokeLinecap="round" /><path d={`M${s * 50 * W},330 L${s * 56 * W},590`} stroke={p.legCol ?? (s > 0 ? sd : skin)} strokeWidth={aw + 10} strokeLinecap="round" />
            <ellipse cx={s * 66 * W} cy={606} rx={42} ry={19} fill={p.legCol ?? (s > 0 ? sd : skin)} stroke={OL} strokeWidth={5} />{anklets && <path d={`M${s * 56 * W - 28},570 l56,0`} stroke={GOLD} strokeWidth={9} strokeLinecap="round" />}</g>)}
          {lower.kind === "dhoti" && <g><path d={`M${-108 * W},296 L${108 * W},296 L${122 * W},520 Q${60 * W},548 0,500 Q${-60 * W},548 ${-122 * W},520Z`} fill={garment} stroke={OL} strokeWidth={7} strokeLinejoin="round" /><path d="M0,300 L0,500 M-18,304 Q-30,400 -10,496 M18,304 Q30,400 10,496" stroke={OL} strokeWidth={4} fill="none" opacity={0.3} /><path d={`M${-116 * W},498 Q${-60 * W},526 0,484 Q${60 * W},526 ${116 * W},498`} stroke={bd} strokeWidth={8} fill="none" strokeLinecap="round" /></g>}
          {lower.kind === "sari" && <g><path d={`M${-100 * W},296 L${100 * W},296 L${134 * W},588 Q0,622 ${-134 * W},588Z`} fill={garment} stroke={OL} strokeWidth={7} strokeLinejoin="round" /><path d={`M${-128 * W},560 Q0,594 ${128 * W},560`} stroke={bd} strokeWidth={10} fill="none" strokeLinecap="round" /><path d="M-10,300 Q-26,440 -8,590 M14,300 Q30,440 16,590" stroke={OL} strokeWidth={4} fill="none" opacity={0.28} /></g>}
          {lower.kind === "tiger" && <g><path d="M-110,296 L110,296 L124,470 L84,440 L50,486 L8,444 L-34,488 L-76,442 L-124,474Z" fill="#e08a2a" stroke={OL} strokeWidth={7} strokeLinejoin="round" />{[-74, -30, 14, 58].map((x, i) => <path key={i} d={`M${x},${316 + (i % 2) * 10} q12,40 -6,84`} stroke="#5a2a10" strokeWidth={9} fill="none" strokeLinecap="round" />)}</g>}
          {lower.kind === "bark" && <g><path d={`M${-104 * W},296 L${104 * W},296 L${112 * W},470 L70,446 L30,476 L-20,448 L-64,474 L${-112 * W},450Z`} fill={garment} stroke={OL} strokeWidth={7} strokeLinejoin="round" /><path d="M-60,310 L-66,430 M0,310 L4,440 M56,310 L60,430" stroke={OL} strokeWidth={4} opacity={0.3} /></g>}
          {lower.kind === "short" && <path d={`M${-106 * W},296 L${106 * W},296 L${112 * W},420 Q0,444 ${-112 * W},420Z`} fill={garment} stroke={OL} strokeWidth={7} strokeLinejoin="round" />}
        </g>
      ))}
      {/* neck + torso */}
      <g transform={`translate(0,${br * 0.5})`}>
        <rect x={-30 * W} y={86} width={60 * W} height={56} fill={sd} stroke={OL} strokeWidth={6} />
        <path d={`M${-122 * W},152 Q${-140 * W},128 ${-70 * W},124 L${70 * W},124 Q${140 * W},128 ${122 * W},152 L${98 * W},326 L${-98 * W},326Z`} fill={top ?? skin} stroke={OL} strokeWidth={7} strokeLinejoin="round" />
        {!top && <path d={`M${122 * W},152 L${98 * W},326 L${40 * W},326 Q${70 * W},230 ${60 * W},140Z`} fill={sd} opacity={0.4} />}
        {belly && <g><ellipse cx={0} cy={262} rx={132} ry={104} fill={top ?? skin} stroke={OL} strokeWidth={7} /><path d="M-6,300 q6,8 12,0" stroke={OL} strokeWidth={4} fill="none" strokeLinecap="round" /></g>}
        {female && lower.kind === "sari" && <g><path d={`M${-70 * W},126 Q${20 * W},210 ${-104 * W},320 L${-60 * W},326 Q${60 * W},230 ${-20 * W},124Z`} fill={garment} stroke={OL} strokeWidth={5} strokeLinejoin="round" /><path d={`M${-44 * W},128 Q${40 * W},212 ${-84 * W},322`} stroke={bd} strokeWidth={6} fill="none" /></g>}
        {thread && <path d={`M${-66 * W},128 Q${30 * W},230 ${86 * W},320`} stroke="#fffaf0" strokeWidth={5} fill="none" strokeLinecap="round" />}
        {sash && <g><path d={`M${-80 * W},128 Q${10 * W},220 ${96 * W},316`} stroke={OL} strokeWidth={44} fill="none" strokeLinecap="round" /><path d={`M${-80 * W},128 Q${10 * W},220 ${96 * W},316`} stroke={sash} strokeWidth={32} fill="none" strokeLinecap="round" /></g>}
        {(lower.kind !== "none" || pose === "stand") && <g><path d={`M${-104 * W},302 L${104 * W},302`} stroke={OL} strokeWidth={24} strokeLinecap="round" /><path d={`M${-104 * W},302 L${104 * W},302`} stroke={bd} strokeWidth={13} strokeLinecap="round" /></g>}
        {neck.map((n, j) => {
          if (n === "snake") return <g key={j}><path d="M-60,138 Q0,196 60,138" stroke={OL} strokeWidth={26} fill="none" strokeLinecap="round" /><path d="M-60,138 Q0,196 60,138" stroke="#3f8a55" strokeWidth={16} fill="none" strokeLinecap="round" /><ellipse cx={70} cy={128} rx={17} ry={12} fill="#3f8a55" stroke={OL} strokeWidth={5} /><circle cx={76} cy={125} r={3} fill="#ffe07a" /></g>;
          const R = n === "rudra" ? [84, 96] : n === "skull" ? [96, 132] : n === "flower" ? [90, 150] : n === "pearl" ? [62, 60] : [70, 74];
          const N = n === "skull" ? 7 : n === "flower" ? 11 : 13;
          return <g key={j}>{Array.from({ length: N }, (_, i) => { const a = Math.PI * (0.1 + 0.8 * (i / (N - 1))), x = -Math.cos(a) * R[0] * W, y = 150 + Math.sin(a) * R[1];
            if (n === "skull") return <g key={i}><path d={`M${x - 15},${y - 4} Q${x - 17},${y - 26} ${x},${y - 27} Q${x + 17},${y - 26} ${x + 15},${y - 4} L${x + 9},${y + 8} L${x - 9},${y + 8}Z`} fill="#f1ece0" stroke={OL} strokeWidth={3.5} strokeLinejoin="round" /><circle cx={x - 6} cy={y - 10} r={3.6} fill={OL} /><circle cx={x + 6} cy={y - 10} r={3.6} fill={OL} /></g>;
            return <circle key={i} cx={x} cy={y} r={n === "flower" ? 13 : n === "pearl" ? 7 : 8.5} fill={n === "rudra" ? "#7a3a1a" : n === "flower" ? (i % 2 ? "#ffd45a" : "#ff8a3c") : n === "pearl" ? "#fffaf0" : GOLD} stroke={OL} strokeWidth={3} />; })}
            {n === "gold" && <circle cx={0} cy={228} r={14} fill="#d61f3a" stroke={OL} strokeWidth={4} />}</g>;
        })}
        {p.mid}
      </g>
      {arms.filter((a) => !a.back).map(arm)}
      <g transform={`translate(0,${br})`}>{p.head ?? <Head {...p} />}</g>
      {p.front}
    </g>
  );
};
export { lerp };
