// Non-human cast: Nandi and every mount and creature. Origin = feet / ground centre unless noted.
import React from "react";
import { OL, GOLD } from "../katha/kit";
import type { Mood } from "./rig";

const S = { stroke: OL, strokeWidth: 7, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

/** Nandi, on-model with the app mascot: cream calf, saffron cloth, rudraksha + bell, ash tilak. */
export const Nandi: React.FC<{ t: number; mood?: Mood; sit?: boolean }> = ({ t, mood = "calm", sit }) => {
  const C = "#f7edda", D = "#e2d0b0", bob = Math.sin(t * 1.8) * 3, open = mood !== "calm" && mood !== "joy";
  return (
    <g>
      <ellipse cx={0} cy={4} rx={210} ry={26} fill="#3a4a8a" opacity={0.35} />
      <path d={`M150,-170 Q230,-190 ${226 + Math.sin(t * 2.4) * 16},-96`} stroke={OL} strokeWidth={22} fill="none" strokeLinecap="round" /><path d={`M150,-170 Q230,-190 ${226 + Math.sin(t * 2.4) * 16},-96`} stroke={C} strokeWidth={11} fill="none" strokeLinecap="round" />
      <ellipse cx={226 + Math.sin(t * 2.4) * 16} cy={-84} rx={17} ry={25} fill="#8a5a36" {...S} strokeWidth={5} />
      {[-112, -40, 44, 116].map((x, i) => <g key={x}><path d={`M${x},${sit ? -40 : -96} L${x},-14`} stroke={OL} strokeWidth={66} strokeLinecap="round" /><path d={`M${x},${sit ? -40 : -96} L${x},-14`} stroke={i % 2 ? D : C} strokeWidth={52} strokeLinecap="round" /><path d={`M${x - 30},-2 Q${x},-26 ${x + 30},-2Z`} fill="#8a6a48" {...S} strokeWidth={5} /></g>)}
      <ellipse cx={10} cy={sit ? -120 : -170} rx={176} ry={116} fill={C} {...S} />
      <path d={`M-96,${sit ? -216 : -266} Q0,${sit ? -276 : -326} 120,${sit ? -214 : -264} L132,${sit ? -100 : -150} Q20,${sit ? -64 : -114} -104,${sit ? -104 : -154}Z`} fill="#f39a2e" {...S} />
      <path d={`M-102,${sit ? -122 : -172} Q14,${sit ? -84 : -134} 130,${sit ? -118 : -168}`} stroke={GOLD} strokeWidth={10} fill="none" />
      <path d={`M-20,${sit ? -250 : -300} Q20,${sit ? -330 : -380} 70,${sit ? -256 : -306}`} fill={C} {...S} />
      <g transform={`translate(-60,${(sit ? -290 : -340) + bob})`}>
        <path d="M-96,-96 Q-150,-176 -92,-214 Q-100,-150 -50,-122Z M96,-96 Q150,-176 92,-214 Q100,-150 50,-122Z" fill="#f1ddb0" {...S} />
        <path d="M-118,-40 Q-200,-70 -206,-10 Q-170,24 -116,2Z M118,-40 Q200,-70 206,-10 Q170,24 116,2Z" fill={C} {...S} /><path d="M-128,-28 Q-182,-46 -186,-10 Q-160,8 -126,-6Z M128,-28 Q182,-46 186,-10 Q160,8 126,-6Z" fill="#f2b6a8" />
        <path d="M-126,-30 Q-134,-132 0,-136 Q134,-132 126,-30 Q128,70 0,96 Q-128,70 -126,-30Z" fill={C} {...S} />
        {[-104, -92, -80].map((y) => <path key={y} d={`M-34,${y} Q0,${y - 4} 34,${y}`} stroke="#fff" strokeWidth={6} fill="none" strokeLinecap="round" />)}
        <path d="M0,-100 Q9,-88 0,-74 Q-9,-88 0,-100Z" fill="#f39a2e" stroke={OL} strokeWidth={3} />
        <path d={mood === "fierce" ? "M-88,-66 L-36,-44 M88,-66 L36,-44" : mood === "sad" ? "M-88,-44 L-36,-62 M88,-44 L36,-62" : "M-86,-60 Q-62,-70 -38,-60 M86,-60 Q62,-70 38,-60"} stroke="#8a5a36" strokeWidth={8} fill="none" strokeLinecap="round" />
        {mood === "joy"
          ? <path d="M-86,-18 Q-60,-46 -34,-18 M34,-18 Q60,-46 86,-18" stroke={OL} strokeWidth={8} fill="none" strokeLinecap="round" />
          : mood === "calm"
            ? <path d="M-86,-26 Q-60,-6 -34,-26 M34,-26 Q60,-6 86,-26" stroke={OL} strokeWidth={8} fill="none" strokeLinecap="round" />
            : [-60, 60].map((x) => <g key={x}><ellipse cx={x} cy={-22} rx={mood === "awe" ? 30 : 26} ry={mood === "awe" ? 34 : 30} fill="#2a1a1c" stroke={OL} strokeWidth={5} /><circle cx={x + 8} cy={-34} r={9} fill="#fff" /><circle cx={x - 8} cy={-12} r={4.5} fill="#fff" opacity={0.8} /></g>)}
        {mood === "sad" && <path d="M-78,14 q9,16 0,26 q-9,-10 0,-26Z" fill="#9fd8ff" stroke={OL} strokeWidth={3} />}
        <ellipse cx={-92} cy={22} rx={20} ry={12} fill="#f2a79a" opacity={0.6} /><ellipse cx={92} cy={22} rx={20} ry={12} fill="#f2a79a" opacity={0.6} />
        <path d="M-56,26 Q-62,84 0,88 Q62,84 56,26 Q0,6 -56,26Z" fill="#f0c7a8" {...S} strokeWidth={6} />
        <ellipse cx={-20} cy={40} rx={7} ry={5} fill="#8a5a36" /><ellipse cx={20} cy={40} rx={7} ry={5} fill="#8a5a36" />
        <path d={mood === "joy" ? "M-24,58 Q0,84 24,58Z" : mood === "sad" || mood === "fierce" ? "M-18,70 Q0,58 18,70" : mood === "awe" ? "M-8,62 a8,10 0 1 0 16,0 a8,10 0 1 0 -16,0" : "M-18,62 Q0,74 18,62"} fill={mood === "joy" || mood === "awe" ? "#8a2a3a" : "none"} stroke={OL} strokeWidth={5.5} strokeLinecap="round" strokeLinejoin="round" />
        {open && mood === "fierce" && <g><path d="M-140,40 q-30,-6 -44,10 q16,14 44,6" fill="#fff" stroke={OL} strokeWidth={4} /></g>}
      </g>
      <g transform={`translate(-60,${(sit ? -290 : -340) + bob})`}>
        {Array.from({ length: 11 }, (_, i) => { const a = Math.PI * (0.08 + 0.84 * (i / 10)); return <circle key={i} cx={-Math.cos(a) * 112} cy={78 + Math.sin(a) * 58} r={11} fill="#7a3a1a" stroke={OL} strokeWidth={3} />; })}
        <g transform={`translate(0,150) rotate(${Math.sin(t * 3) * 8})`}><path d="M-24,22 Q-24,-28 0,-30 Q24,-28 24,22 L32,32 L-32,32Z" fill={GOLD} {...S} strokeWidth={5} /><circle cx={0} cy={40} r={8} fill="#c9a23e" stroke={OL} strokeWidth={3} /></g>
      </g>
    </g>
  );
};

/** Vasuki, the serpent king, risen with hood spread. */
export const Vasuki: React.FC<{ t: number }> = ({ t }) => { const w = Math.sin(t * 1.6) * 10; return (
  <g>
    <ellipse cx={0} cy={0} rx={210} ry={26} fill="#3a4a8a" opacity={0.35} />
    {[[0, -30, 190, 44], [10, -86, 150, 40], [-6, -136, 112, 36]].map(([x, y, rx, ry], i) => <ellipse key={i} cx={x} cy={y} rx={rx} ry={ry} fill={i % 2 ? "#357a4b" : "#3f8a55"} {...S} />)}
    <path d={`M-40,-150 Q-90,-300 ${w},-420`} stroke={OL} strokeWidth={96} fill="none" strokeLinecap="round" /><path d={`M-40,-150 Q-90,-300 ${w},-420`} stroke="#3f8a55" strokeWidth={82} fill="none" strokeLinecap="round" />
    <path d={`M-40,-150 Q-90,-300 ${w},-420`} stroke="#d7e9a8" strokeWidth={34} fill="none" strokeLinecap="round" opacity={0.85} />
    <g transform={`translate(${w},-470)`}>
      <path d="M0,150 Q-190,90 -168,-70 Q-140,-200 0,-196 Q140,-200 168,-70 Q190,90 0,150Z" fill="#3f8a55" {...S} /><path d="M0,120 Q-120,70 -108,-50 Q-90,-140 0,-140 Q90,-140 108,-50 Q120,70 0,120Z" fill="#d7e9a8" opacity={0.8} />
      <path d="M-40,-90 Q0,-120 40,-90 Q30,-50 0,-60 Q-30,-50 -40,-90Z" fill={GOLD} stroke={OL} strokeWidth={4} />
      <path d="M-70,-40 Q-76,-110 0,-112 Q76,-110 70,-40 Q66,30 0,46 Q-66,30 -70,-40Z" fill="#4c9c62" {...S} />
      {[-30, 30].map((x) => <g key={x}><ellipse cx={x} cy={-40} rx={15} ry={19} fill="#ffe07a" stroke={OL} strokeWidth={4} /><ellipse cx={x} cy={-40} rx={4} ry={13} fill={OL} /></g>)}
      <path d="M-20,8 Q0,18 20,8" stroke={OL} strokeWidth={5} fill="none" strokeLinecap="round" /><path d={`M0,14 L0,${50 + Math.sin(t * 9) * 8} l-9,14 M0,${50 + Math.sin(t * 9) * 8} l9,14`} stroke="#e23b4a" strokeWidth={5} fill="none" strokeLinecap="round" />
      <circle cx={0} cy={-150} r={15} fill="#d61f3a" stroke={OL} strokeWidth={4} /><circle cx={0} cy={-150} r={44} fill="url(#kglow)" opacity={0.6} />
    </g>
  </g>
); };

/** Mushika, Ganesha's mouse. */
export const Mushika: React.FC<{ t: number }> = ({ t }) => (
  <g>
    <ellipse cx={0} cy={2} rx={120} ry={16} fill="#3a4a8a" opacity={0.35} />
    <path d={`M90,-40 Q190,-50 ${170 + Math.sin(t * 3) * 14},-130`} stroke={OL} strokeWidth={15} fill="none" strokeLinecap="round" /><path d={`M90,-40 Q190,-50 ${170 + Math.sin(t * 3) * 14},-130`} stroke="#d9a59a" strokeWidth={7} fill="none" strokeLinecap="round" />
    <ellipse cx={20} cy={-62} rx={104} ry={66} fill="#a8a2b8" {...S} /><ellipse cx={30} cy={-40} rx={62} ry={36} fill="#cfc9dc" opacity={0.7} />
    <circle cx={-96} cy={-150} r={36} fill="#a8a2b8" {...S} /><circle cx={-96} cy={-150} r={20} fill="#f2b6a8" /><circle cx={-20} cy={-156} r={36} fill="#a8a2b8" {...S} /><circle cx={-20} cy={-156} r={20} fill="#f2b6a8" />
    <path d="M-150,-70 Q-140,-150 -60,-146 Q10,-140 0,-70 Q-30,-22 -96,-30 Q-140,-36 -150,-70Z" fill="#b6b0c6" {...S} />
    <circle cx={-100} cy={-92} r={11} fill={OL} /><circle cx={-97} cy={-96} r={3.5} fill="#fff" /><circle cx={-44} cy={-90} r={11} fill={OL} /><circle cx={-41} cy={-94} r={3.5} fill="#fff" />
    <ellipse cx={-146} cy={-62} rx={11} ry={9} fill="#e88b78" stroke={OL} strokeWidth={4} /><path d="M-130,-52 l-40,-8 M-130,-46 l-40,6 M-112,-46 l34,10" stroke={OL} strokeWidth={3} strokeLinecap="round" />
    <ellipse cx={-50} cy={-6} rx={24} ry={11} fill="#d9a59a" {...S} strokeWidth={4} /><ellipse cx={60} cy={-6} rx={28} ry={11} fill="#d9a59a" {...S} strokeWidth={4} />
  </g>
);

/** Paravani, Kartikeya's peacock. fan 0..1 */
export const Peacock: React.FC<{ t: number; fan?: number }> = ({ t, fan = 1 }) => (
  <g>
    <ellipse cx={0} cy={2} rx={140} ry={18} fill="#3a4a8a" opacity={0.35} />
    {fan > 0.05 && Array.from({ length: 11 }, (_, i) => { const a = (-90 + (i - 5) * 17 * fan) * Math.PI / 180, L = 330 + (5 - Math.abs(i - 5)) * 14 + Math.sin(t * 2 + i) * 5, x = Math.cos(a) * L, y = -150 + Math.sin(a) * L;
      return <g key={i}><path d={`M0,-150 L${x},${y}`} stroke={OL} strokeWidth={30} strokeLinecap="round" /><path d={`M0,-150 L${x},${y}`} stroke={i % 2 ? "#1f8f7a" : "#2aa58a"} strokeWidth={20} strokeLinecap="round" /><ellipse cx={x} cy={y} rx={28} ry={34} fill="#2aa58a" stroke={OL} strokeWidth={5} /><ellipse cx={x} cy={y} rx={16} ry={20} fill={GOLD} /><ellipse cx={x} cy={y + 3} rx={9} ry={11} fill="#2b46b8" /></g>; })}
    <path d="M-30,0 L-30,-70 M30,0 L30,-70" stroke={OL} strokeWidth={15} strokeLinecap="round" /><path d="M-30,0 L-30,-70 M30,0 L30,-70" stroke="#b8802a" strokeWidth={7} strokeLinecap="round" /><path d="M-52,0 L-8,0 M8,0 L52,0" stroke={OL} strokeWidth={11} strokeLinecap="round" />
    <ellipse cx={0} cy={-130} rx={90} ry={76} fill="#2456c8" {...S} /><ellipse cx={0} cy={-104} rx={52} ry={40} fill="#3f7de2" opacity={0.8} />
    <path d="M10,-190 Q-20,-300 0,-360" stroke={OL} strokeWidth={58} fill="none" strokeLinecap="round" /><path d="M10,-190 Q-20,-300 0,-360" stroke="#2456c8" strokeWidth={44} fill="none" strokeLinecap="round" />
    <circle cx={0} cy={-378} r={44} fill="#2a62d8" {...S} />
    {[-22, 0, 22].map((x) => <g key={x}><path d={`M${x * 0.5},-418 L${x},-470`} stroke={OL} strokeWidth={5} /><circle cx={x} cy={-476} r={9} fill="#2aa58a" stroke={OL} strokeWidth={3.5} /></g>)}
    <path d="M-36,-372 L-74,-360 L-36,-350Z" fill={GOLD} {...S} strokeWidth={5} /><circle cx={-10} cy={-386} r={8} fill="#fff" stroke={OL} strokeWidth={3} /><circle cx={-12} cy={-386} r={4} fill={OL} />
  </g>
);

/** Parvati's lion (Durga's vahana). */
export const Lion: React.FC<{ t: number; roar?: number }> = ({ t, roar = 0 }) => (
  <g>
    <ellipse cx={0} cy={2} rx={230} ry={24} fill="#3a4a8a" opacity={0.35} />
    <path d={`M190,-150 Q280,-200 ${270 + Math.sin(t * 2) * 14},-290`} stroke={OL} strokeWidth={24} fill="none" strokeLinecap="round" /><path d={`M190,-150 Q280,-200 ${270 + Math.sin(t * 2) * 14},-290`} stroke="#e0a03c" strokeWidth={12} fill="none" strokeLinecap="round" /><ellipse cx={270 + Math.sin(t * 2) * 14} cy={-304} rx={18} ry={26} fill="#8a4a1a" {...S} strokeWidth={5} />
    {[-110, -40, 70, 140].map((x, i) => <g key={x}><path d={`M${x},-110 L${x},-18`} stroke={OL} strokeWidth={64} strokeLinecap="round" /><path d={`M${x},-110 L${x},-18`} stroke={i % 2 ? "#d18e2c" : "#e0a03c"} strokeWidth={50} strokeLinecap="round" /></g>)}
    <ellipse cx={30} cy={-170} rx={186} ry={104} fill="#e0a03c" {...S} />
    <g transform="translate(-130,-300)">
      {Array.from({ length: 14 }, (_, i) => { const a = (i / 14) * Math.PI * 2; return <ellipse key={i} cx={Math.cos(a) * 128} cy={Math.sin(a) * 124} rx={50} ry={38} transform={`rotate(${(a * 180) / Math.PI + 90} ${Math.cos(a) * 128} ${Math.sin(a) * 124})`} fill={i % 2 ? "#8a4a1a" : "#a85a1c"} {...S} strokeWidth={6} />; })}
      <path d="M-104,-20 Q-110,-110 0,-112 Q110,-110 104,-20 Q104,70 0,96 Q-104,70 -104,-20Z" fill="#f0b656" {...S} />
      <path d="M-64,-40 L-24,-28 M64,-40 L24,-28" stroke={OL} strokeWidth={8} strokeLinecap="round" />
      {[-44, 44].map((x) => <g key={x}><ellipse cx={x} cy={-12} rx={16} ry={14} fill="#fff3c4" stroke={OL} strokeWidth={4} /><circle cx={x} cy={-12} r={7} fill={OL} /></g>)}
      <path d="M-22,14 Q0,2 22,14 Q14,36 0,36 Q-14,36 -22,14Z" fill="#8a2a3a" stroke={OL} strokeWidth={5} />
      <path d={`M-44,${48} Q0,${40 - roar * 6} 44,48 Q36,${64 + roar * 44} 0,${66 + roar * 46} Q-36,${64 + roar * 44} -44,48Z`} fill="#5a1218" stroke={OL} strokeWidth={5} strokeLinejoin="round" />
      {roar > 0.2 && [-26, 26].map((x) => <path key={x} d={`M${x - 8},50 L${x},76 L${x + 8},50Z`} fill="#f6e6c6" stroke={OL} strokeWidth={3} />)}
    </g>
  </g>
);

/** Bhairava's dog. */
export const Dog: React.FC<{ t: number }> = ({ t }) => (
  <g>
    <ellipse cx={0} cy={2} rx={150} ry={18} fill="#3a4a8a" opacity={0.35} />
    <path d={`M110,-110 Q180,-160 ${160 + Math.sin(t * 8) * 16},-220`} stroke={OL} strokeWidth={24} fill="none" strokeLinecap="round" /><path d={`M110,-110 Q180,-160 ${160 + Math.sin(t * 8) * 16},-220`} stroke="#2a2433" strokeWidth={12} fill="none" strokeLinecap="round" />
    {[-70, -20, 60, 110].map((x) => <g key={x}><path d={`M${x},-90 L${x},-14`} stroke={OL} strokeWidth={44} strokeLinecap="round" /><path d={`M${x},-90 L${x},-14`} stroke="#2a2433" strokeWidth={32} strokeLinecap="round" /></g>)}
    <ellipse cx={20} cy={-120} rx={124} ry={66} fill="#2a2433" {...S} />
    <g transform="translate(-100,-200)">
      <path d="M-70,-70 L-92,-150 L-30,-104Z M70,-70 L92,-150 L30,-104Z" fill="#2a2433" {...S} />
      <path d="M-84,-20 Q-88,-100 0,-102 Q88,-100 84,-20 Q80,50 0,66 Q-80,50 -84,-20Z" fill="#352e42" {...S} />
      <path d="M-34,14 Q0,-6 34,14 Q30,56 0,60 Q-30,56 -34,14Z" fill="#6a5f7a" stroke={OL} strokeWidth={5} /><ellipse cx={0} cy={18} rx={13} ry={9} fill={OL} />
      {[-38, 38].map((x) => <g key={x}><circle cx={x} cy={-30} r={14} fill="#ffb238" stroke={OL} strokeWidth={4} /><circle cx={x} cy={-30} r={6} fill={OL} /></g>)}
      <path d={`M-6,44 Q0,${70 + Math.sin(t * 6) * 6} 12,44`} fill="#e23b4a" stroke={OL} strokeWidth={4} />
    </g>
    <path d="M-150,-150 Q-100,-120 -50,-150" stroke="#d61f3a" strokeWidth={12} fill="none" strokeLinecap="round" />
  </g>
);

/** Makara, Ganga's mount: crocodile-fish. */
export const Makara: React.FC<{ t: number }> = ({ t }) => (
  <g>
    <path d={`M-260,-10 Q-180,${-40 + Math.sin(t * 2) * 8} -100,-10 Q-20,${20 + Math.sin(t * 2 + 1) * 8} 60,-10 Q140,${-40 + Math.sin(t * 2 + 2) * 8} 260,-10 L260,40 L-260,40Z`} fill="#6fb8ff" opacity={0.6} />
    <path d={`M120,-90 Q230,-150 ${250 + Math.sin(t * 3) * 10},-250 Q170,-220 150,-150Z`} fill="#3fa37a" {...S} />
    <ellipse cx={0} cy={-80} rx={170} ry={70} fill="#4cb58a" {...S} />{[-80, -20, 40, 100].map((x) => <path key={x} d={`M${x},-148 l22,-34 l22,34Z`} fill="#2f8a66" {...S} strokeWidth={5} />)}
    <path d="M-110,-110 Q-250,-150 -290,-86 Q-250,-40 -110,-44Z" fill="#4cb58a" {...S} /><path d="M-284,-84 L-150,-70" stroke={OL} strokeWidth={5} />
    {[-250, -220, -190, -160].map((x) => <path key={x} d={`M${x},-78 l8,16 l8,-16Z`} fill="#f6e6c6" stroke={OL} strokeWidth={3} />)}
    <circle cx={-150} cy={-110} r={18} fill="#ffe07a" stroke={OL} strokeWidth={5} /><circle cx={-150} cy={-110} r={7} fill={OL} />
    <path d="M-296,-96 Q-340,-150 -300,-190" stroke={OL} strokeWidth={22} fill="none" strokeLinecap="round" /><path d="M-296,-96 Q-340,-150 -300,-190" stroke="#4cb58a" strokeWidth={11} fill="none" strokeLinecap="round" />
  </g>
);

/** Airavata, Indra's white elephant (also the template for Gajasura's elephant form with col). */
export const Elephant: React.FC<{ t: number; col?: string; dark?: string; fierce?: boolean }> = ({ t, col = "#f3f1ee", dark = "#d6d2cc", fierce }) => (
  <g>
    <ellipse cx={0} cy={2} rx={250} ry={26} fill="#3a4a8a" opacity={0.35} />
    {[-140, -60, 70, 150].map((x, i) => <g key={x}><path d={`M${x},-150 L${x},-22`} stroke={OL} strokeWidth={92} strokeLinecap="round" /><path d={`M${x},-150 L${x},-22`} stroke={i % 2 ? dark : col} strokeWidth={78} strokeLinecap="round" /></g>)}
    <ellipse cx={30} cy={-230} rx={220} ry={150} fill={col} {...S} />
    <g transform="translate(-150,-330)">
      <path d="M-70,-60 Q-250,-150 -240,30 Q-220,130 -70,70Z M70,-60 Q250,-150 240,30 Q220,130 70,70Z" fill={dark} {...S} />
      <ellipse cx={0} cy={-10} rx={130} ry={132} fill={col} {...S} />
      <path d={`M0,40 Q-16,190 ${30 + Math.sin(t * 2) * 12},260 Q70,300 100,250`} stroke={OL} strokeWidth={78} fill="none" strokeLinecap="round" /><path d={`M0,40 Q-16,190 ${30 + Math.sin(t * 2) * 12},260 Q70,300 100,250`} stroke={col} strokeWidth={64} fill="none" strokeLinecap="round" />
      <path d="M-60,76 Q-110,150 -70,210 Q-60,150 -34,96Z M60,76 Q110,150 70,210 Q60,150 34,96Z" fill="#fffaf0" {...S} strokeWidth={6} />
      {[-52, 52].map((x) => <g key={x}><ellipse cx={x} cy={-20} rx={15} ry={fierce ? 11 : 17} fill={fierce ? "#ff5a1e" : OL} stroke={OL} strokeWidth={4} /><circle cx={x + 4} cy={-25} r={4} fill="#fff" /></g>)}
      {fierce && <path d="M-84,-56 L-30,-38 M84,-56 L30,-38" stroke={OL} strokeWidth={9} strokeLinecap="round" />}
      <path d="M-80,-110 Q0,-150 80,-110" stroke={GOLD} strokeWidth={14} fill="none" strokeLinecap="round" /><circle cx={0} cy={-128} r={15} fill="#d61f3a" stroke={OL} strokeWidth={4} />
    </g>
  </g>
);

/** Garuda, Vishnu's eagle. */
export const Garuda: React.FC<{ t: number }> = ({ t }) => { const f = Math.sin(t * 5) * 14; return (
  <g>
    {[-1, 1].map((s) => <g key={s} transform={`scale(${s},1) rotate(${f * 0.4})`}><path d="M60,-250 Q260,-380 400,-250 Q330,-240 300,-190 Q260,-200 230,-150 Q190,-170 150,-130 L60,-150Z" fill="#c8402a" {...S} /><path d="M90,-240 Q240,-330 340,-250" stroke={GOLD} strokeWidth={8} fill="none" /></g>)}
    <path d="M-70,-250 Q-90,-80 0,-40 Q90,-80 70,-250Z" fill="#e9dcc0" {...S} /><path d="M-40,-60 L-50,0 M40,-60 L50,0" stroke={OL} strokeWidth={16} strokeLinecap="round" /><path d="M-40,-60 L-50,0 M40,-60 L50,0" stroke={GOLD} strokeWidth={8} strokeLinecap="round" />
    <circle cx={0} cy={-300} r={70} fill="#f1e3c8" {...S} /><path d="M-56,-340 L0,-410 L56,-340 Q0,-360 -56,-340Z" fill={GOLD} {...S} strokeWidth={5} />
    <path d="M-20,-292 L0,-236 L20,-292Z" fill={GOLD} {...S} strokeWidth={5} /><circle cx={-28} cy={-312} r={10} fill={OL} /><circle cx={28} cy={-312} r={10} fill={OL} /><path d="M-50,-334 L-14,-322 M50,-334 L14,-322" stroke={OL} strokeWidth={7} strokeLinecap="round" />
  </g>
); };

/** A deer (Shiva's forest, Bhikshatana, Pashupati). */
export const Deer: React.FC<{ t: number }> = ({ t }) => (
  <g>
    <ellipse cx={0} cy={2} rx={110} ry={14} fill="#3a4a8a" opacity={0.35} />
    {[-50, -14, 40, 70].map((x) => <g key={x}><path d={`M${x},-90 L${x},-8`} stroke={OL} strokeWidth={24} strokeLinecap="round" /><path d={`M${x},-90 L${x},-8`} stroke="#c98a4a" strokeWidth={13} strokeLinecap="round" /></g>)}
    <ellipse cx={10} cy={-110} rx={92} ry={50} fill="#d99a56" {...S} />{[[-20, -124], [20, -100], [50, -128]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={7} fill="#fff6ea" />)}
    <path d="M-60,-130 Q-80,-190 -70,-216" stroke={OL} strokeWidth={46} fill="none" strokeLinecap="round" /><path d="M-60,-130 Q-80,-190 -70,-216" stroke="#d99a56" strokeWidth={33} fill="none" strokeLinecap="round" />
    <path d="M-106,-250 Q-114,-190 -70,-186 Q-36,-190 -40,-246 Q-70,-276 -106,-250Z" fill="#e0a868" {...S} strokeWidth={6} />
    <path d="M-96,-262 L-116,-300 M-52,-262 L-36,-300 M-112,-290 l-16,-10 M-40,-290 l16,-10" stroke={OL} strokeWidth={7} strokeLinecap="round" /><circle cx={-92} cy={-232} r={7} fill={OL} /><circle cx={-58} cy={-232} r={7} fill={OL} /><ellipse cx={-76} cy={-204} rx={8} ry={6} fill={OL} />
    <path d={`M100,-130 q${20 + Math.sin(t * 6) * 4},-10 22,-30`} stroke={OL} strokeWidth={12} fill="none" strokeLinecap="round" />
  </g>
);

/** Halahala, the poison that rose from the ocean: a living dark cloud. */
export const Halahala: React.FC<{ t: number }> = ({ t }) => (
  <g>
    {Array.from({ length: 9 }, (_, i) => { const a = (i / 9) * Math.PI * 2 + t * 0.3, r = 120 + Math.sin(t * 1.4 + i) * 16; return <circle key={i} cx={Math.cos(a) * 130} cy={-230 + Math.sin(a) * 110} r={r} fill={i % 2 ? "#2a0f4a" : "#3a1466"} stroke={OL} strokeWidth={7} />; })}
    <circle cx={0} cy={-230} r={170} fill="#2a0f4a" />
    {[-60, 60].map((x) => <g key={x}><ellipse cx={x} cy={-250} rx={34} ry={26} fill="#b6ff5a" stroke={OL} strokeWidth={5} /><ellipse cx={x} cy={-250} rx={8} ry={22} fill={OL} /></g>)}
    <path d="M-80,-160 Q-40,-190 0,-160 Q40,-190 80,-160 Q40,-110 0,-126 Q-40,-110 -80,-160Z" fill="#6a2ad6" stroke={OL} strokeWidth={6} strokeLinejoin="round" />
    {[-40, 0, 40].map((x, i) => <path key={x} d={`M${x},-60 q${10 + Math.sin(t * 3 + i) * 8},40 0,${90 + i * 10}`} stroke="#6a2ad6" strokeWidth={16} fill="none" strokeLinecap="round" opacity={0.8} />)}
  </g>
);

/** Kamadhenu-style sacred cow is skipped; Brahma's swan and Vishnu's boar live in katha/Pillar.tsx. */
