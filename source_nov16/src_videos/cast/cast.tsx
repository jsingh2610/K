// THE KAILASA CAST. Every character of Shiva's world in the Kirtimukha storybook style.
// Each entry: el(t, mood) draws the character; o = origin ("head" = rig figures, "feet" = ground centre),
// gy = local y of the ground, s = scale used on the character sheet.
import React from "react";
import { OL, GOLD, Shiva, ShivaHead, Parvati as KitParvati, Beast, Messenger, Devotee } from "../katha/kit";
import { Fig, FigP, Head, HeadBack, Mood, Prop, ArmP } from "./rig";
import { Nandi, Vasuki, Mushika, Peacock, Lion, Dog, Makara, Elephant, Garuda, Deer, Halahala } from "./beasts";
import { Demon, Mohini } from "../katha/Bhasma";
import { Boy, Yama } from "../katha/Markandeya";
import { Ravana } from "../katha/Ravana";
import { SatiStand, Daksha } from "../katha/Sati";
import { God, Swan, Boar } from "../katha/Pillar";
import { Sage, Seeker } from "../film/Film";

const S = { stroke: OL, strokeWidth: 7, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
// skins
const BLUE = { skin: "#8db6ea", shade: "#6f97d2" }, FAIR = { skin: "#f2c79a", shade: "#dba878" }, DEVI = { skin: "#f3c486", shade: "#dea463" }, BROWN = { skin: "#c98f5e", shade: "#a8733f" }, DUSK = { skin: "#a06a44", shade: "#7e4f2e" };
const A = (s: 1 | -1, pose: ArmP["pose"], prop?: string, back?: boolean, rot?: number): ArmP => ({ s, pose, prop, back, rot });
const rishi = { hair: "top" as const, hairCol: "#f1ece0", beard: "long" as const, beardCol: "#f1ece0", mark: "tri" as const, rings: false, lower: { kind: "dhoti" as const, col: "#e08a2a", border: "#a85a14" }, neck: ["rudra" as const], thread: true };

// ------------------------------------------------------------ Shiva rig: every form is this figure in a different costume
type SvP = Partial<FigP> & { m?: Mood; third?: number };
const svHead = (m: Mood = "calm", third = 0) => <ShivaHead open={m === "fierce" ? Math.max(third, 0.9) : third} smile={m === "joy" ? 1 : m === "fierce" || m === "sad" ? -0.6 : 0.3} eyes={m === "calm" || m === "joy" ? 0 : 1} mood={m === "fierce" ? -1.3 : m === "sad" ? 1 : 0} />;
const Sv: React.FC<SvP & { t: number }> = ({ m = "calm", third = 0, ...p }) => (
  <Fig {...BLUE} head={svHead(m, third)} headBack={<g />} neck={["snake", "rudra"]} lower={{ kind: "tiger", col: "#e08a2a" }} aura="aura" {...p} />
);

// ------------------------------------------------------------ custom heads
const GaneshaHead: React.FC<{ m: Mood; t: number }> = ({ m, t }) => { const C = "#f0a08c", D = "#d97f6e", sway = Math.sin(t * 1.8) * 8; return (
  <g>
    {[-1, 1].map((s) => <g key={s} transform={`scale(${s},1) rotate(${Math.sin(t * 2.2) * 3})`}><path d="M-84,-70 Q-250,-150 -250,6 Q-240,120 -96,60Z" fill={C} {...S} /><path d="M-110,-50 Q-214,-104 -214,8 Q-206,80 -114,40Z" fill="#f7c3b4" /></g>)}
    <ellipse cx={0} cy={-14} rx={112} ry={112} fill={C} {...S} />
    <path d="M-86,-96 L-96,-178 L-48,-140 L0,-214 L48,-140 L96,-178 L86,-96 Q0,-124 -86,-96Z" fill={GOLD} {...S} strokeWidth={6} /><circle cx={0} cy={-130} r={12} fill="#d61f3a" stroke={OL} strokeWidth={4} />
    {[-76, -64, -52].map((y) => <path key={y} d={`M-40,${y} Q0,${y - 4} 40,${y}`} stroke="#fff6ea" strokeWidth={5} fill="none" strokeLinecap="round" />)}<circle cx={0} cy={-64} r={8} fill="#d61f3a" stroke={OL} strokeWidth={2} />
    <path d={m === "fierce" ? "M-74,-40 L-30,-24 M74,-40 L30,-24" : "M-72,-34 Q-50,-44 -28,-34 M72,-34 Q50,-44 28,-34"} stroke={OL} strokeWidth={6.5} fill="none" strokeLinecap="round" />
    {m === "joy" || m === "calm"
      ? <path d={m === "joy" ? "M-70,-4 Q-50,-24 -30,-4 M30,-4 Q50,-24 70,-4" : "M-70,-12 Q-50,4 -30,-12 M30,-12 Q50,4 70,-12"} stroke={OL} strokeWidth={6.5} fill="none" strokeLinecap="round" />
      : [-50, 50].map((x) => <g key={x}><ellipse cx={x} cy={-8} rx={19} ry={m === "awe" ? 22 : 16} fill="#f7f4ea" stroke={OL} strokeWidth={5} /><circle cx={x} cy={-7} r={8} fill="#1b1020" /><circle cx={x + 3} cy={-10} r={2.6} fill="#fff" /></g>)}
    {m === "sad" && <path d="M-58,14 q8,14 0,24 q-8,-10 0,-24Z" fill="#cfeaff" stroke={OL} strokeWidth={2.5} />}
    {/* tusks: his right one is broken */}
    <path d="M-52,50 Q-72,62 -70,84 L-50,76 Q-48,60 -40,54Z" fill="#fffaf0" {...S} strokeWidth={5} />
    <path d="M52,50 Q104,70 96,128 Q72,96 40,74Z" fill="#fffaf0" {...S} strokeWidth={5} />
    <path d={`M0,20 Q-14,130 ${24 + sway},190 Q${58 + sway},230 ${84 + sway},196`} stroke={OL} strokeWidth={70} fill="none" strokeLinecap="round" />
    <path d={`M0,20 Q-14,130 ${24 + sway},190 Q${58 + sway},230 ${84 + sway},196`} stroke={C} strokeWidth={56} fill="none" strokeLinecap="round" />
    {[60, 96, 132].map((y, i) => <path key={y} d={`M${-24 + i * 4},${y} Q${2 + i * 4},${y + 10} ${24 + i * 6},${y}`} stroke={D} strokeWidth={5} fill="none" strokeLinecap="round" />)}
    <ellipse cx={-34} cy={36} rx={16} ry={9} fill="#f58c8c" opacity={0.5} /><ellipse cx={34} cy={36} rx={16} ry={9} fill="#f58c8c" opacity={0.5} />
  </g>
); };
const HanumanHead: React.FC<{ m: Mood }> = ({ m }) => (
  <g>
    <path d="M-124,-20 Q-140,-150 0,-156 Q140,-150 124,-20 Q130,90 0,124 Q-130,90 -124,-20Z" fill="#c8662a" {...S} />
    <ellipse cx={-112} cy={0} rx={20} ry={30} fill="#f0a878" {...S} strokeWidth={5} /><ellipse cx={112} cy={0} rx={20} ry={30} fill="#f0a878" {...S} strokeWidth={5} />
    <path d="M-88,-30 Q-96,-112 -40,-100 Q0,-124 40,-100 Q96,-112 88,-30 Q92,60 0,96 Q-92,60 -88,-30Z" fill="#f4b78a" {...S} strokeWidth={6} />
    <path d="M-52,22 Q0,-8 52,22 Q60,84 0,92 Q-60,84 -52,22Z" fill="#f9d2b0" stroke={OL} strokeWidth={5} />
    <path d="M0,-86 L0,-46" stroke="#d61f3a" strokeWidth={9} strokeLinecap="round" /><path d="M-13,-88 Q-13,-48 0,-46 Q13,-48 13,-88" stroke="#f39a2e" strokeWidth={5} fill="none" />
    <path d={m === "fierce" ? "M-70,-42 L-26,-26 M70,-42 L26,-26" : "M-68,-36 Q-46,-46 -24,-36 M68,-36 Q46,-46 24,-36"} stroke={OL} strokeWidth={7} fill="none" strokeLinecap="round" />
    {m === "calm" ? <path d="M-64,-10 Q-44,6 -24,-10 M24,-10 Q44,6 64,-10" stroke={OL} strokeWidth={6} fill="none" strokeLinecap="round" /> : m === "joy" ? <path d="M-64,-4 Q-44,-24 -24,-4 M24,-4 Q44,-24 64,-4" stroke={OL} strokeWidth={6} fill="none" strokeLinecap="round" />
      : [-44, 44].map((x) => <g key={x}><ellipse cx={x} cy={-8} rx={19} ry={17} fill="#f7f4ea" stroke={OL} strokeWidth={5} /><circle cx={x} cy={-7} r={8} fill="#3a2414" /></g>)}
    <ellipse cx={-10} cy={30} rx={5} ry={4} fill={OL} /><ellipse cx={10} cy={30} rx={5} ry={4} fill={OL} />
    <path d={m === "joy" ? "M-30,52 Q0,84 30,52Z" : m === "fierce" ? "M-30,56 Q0,44 30,56 Q24,80 0,80 Q-24,80 -30,56Z" : "M-28,56 Q0,72 28,56"} fill={m === "calm" || m === "open" || m === "awe" || m === "sad" ? "none" : "#5a1218"} stroke={OL} strokeWidth={6} strokeLinejoin="round" strokeLinecap="round" />
    <path d="M-86,-104 L-96,-186 L-48,-146 L0,-226 L48,-146 L96,-186 L86,-104 Q0,-132 -86,-104Z" fill={GOLD} {...S} strokeWidth={6} /><circle cx={0} cy={-138} r={12} fill="#d61f3a" stroke={OL} strokeWidth={4} />
  </g>
);
const GoatHead: React.FC<{ t: number }> = ({ t }) => (
  <g>
    <path d="M-60,-110 Q-150,-170 -150,-250 Q-100,-220 -30,-130Z M60,-110 Q150,-170 150,-250 Q100,-220 30,-130Z" fill="#cdbf9f" {...S} />
    <path d="M-92,-50 Q-190,-60 -200,0 Q-150,20 -90,-10Z M92,-50 Q190,-60 200,0 Q150,20 90,-10Z" fill="#efe6d2" {...S} />
    <path d="M-92,-60 Q-96,-136 0,-138 Q96,-136 92,-60 Q84,40 50,96 Q0,124 -50,96 Q-84,40 -92,-60Z" fill="#f6efdf" {...S} />
    <path d="M-30,112 Q0,220 30,112 Q0,128 -30,112Z" fill="#efe6d2" {...S} strokeWidth={6} />
    {[-48, 48].map((x) => <g key={x}><ellipse cx={x} cy={-30} rx={22} ry={18} fill="#ffe07a" stroke={OL} strokeWidth={5} /><rect x={x - 13} y={-34} width={26} height={8} rx={4} fill={OL} /></g>)}
    <path d="M-70,-66 L-28,-56 M70,-66 L28,-56" stroke={OL} strokeWidth={7} strokeLinecap="round" />
    <path d="M-24,44 Q0,30 24,44 Q18,66 0,66 Q-18,66 -24,44Z" fill="#e9b9a0" stroke={OL} strokeWidth={5} /><path d={`M-22,84 Q0,${92 + Math.sin(t * 5) * 4} 22,84`} stroke={OL} strokeWidth={5} fill="none" strokeLinecap="round" />
    <path d="M-80,-112 L-88,-180 L-44,-146 L0,-206 L44,-146 L88,-180 L80,-112 Q0,-136 -80,-112Z" fill={GOLD} {...S} strokeWidth={6} />
  </g>
);

// ------------------------------------------------------------ helper drawings
const Ring: React.FC<{ t: number }> = ({ t }) => <g>{Array.from({ length: 26 }, (_, i) => { const a = (i / 26) * Math.PI * 2, x = Math.cos(a) * 470, y = 190 + Math.sin(a) * 470; return <path key={i} d="M0,-46 Q26,-10 12,18 Q0,30 -12,18 Q-26,-10 0,-46Z" transform={`translate(${x},${y}) rotate(${(a * 180) / Math.PI + 90}) scale(${1.1 + Math.sin(t * 8 + i) * 0.2})`} fill="#ff8a1e" stroke={OL} strokeWidth={5} strokeLinejoin="round" />; })}<circle cx={0} cy={190} r={470} fill="none" stroke={OL} strokeWidth={26} /><circle cx={0} cy={190} r={470} fill="none" stroke={GOLD} strokeWidth={14} /></g>;
const leg = (d: string, c: string, w = 52) => <g><path d={d} stroke={OL} strokeWidth={w + 12} fill="none" strokeLinecap="round" strokeLinejoin="round" /><path d={d} stroke={c} strokeWidth={w} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>;
const Dwarf: React.FC<{ t: number; lying?: boolean }> = ({ t }) => (
  <g>
    <ellipse cx={0} cy={0} rx={150} ry={46} fill="#7f9a7a" {...S} /><g transform="translate(-160,-34) rotate(-14) scale(.5)"><Head skin="#8fae88" shade="#6f8e68" hair="bald" mood="sad" rings={false} /></g>
    <path d={`M120,-10 Q180,-40 ${196 + Math.sin(t * 3) * 6},-80`} stroke={OL} strokeWidth={20} fill="none" strokeLinecap="round" /><path d={`M120,-10 Q180,-40 ${196 + Math.sin(t * 3) * 6},-80`} stroke="#3f8a55" strokeWidth={10} fill="none" strokeLinecap="round" />
  </g>
);
const half = (id: string, left: boolean, node: React.ReactNode) => <g><clipPath id={id}><rect x={left ? -700 : 0} y={-700} width={700} height={1600} /></clipPath><g clipPath={`url(#${id})`}>{node}</g></g>;
const City: React.FC<{ c: string; x: number; y: number; t: number; i: number }> = ({ c, x, y, t, i }) => <g transform={`translate(${x},${y + Math.sin(t * 1.4 + i) * 8})`}><path d="M-70,20 Q0,60 70,20 L60,0 L-60,0Z" fill="#3b3d5c" {...S} strokeWidth={5} /><path d="M-56,0 L-56,-50 L-34,-50 L-34,-80 L-10,-110 L14,-80 L14,-40 L40,-40 L40,-70 L56,-70 L56,0Z" fill={c} {...S} strokeWidth={5} /></g>;

// ------------------------------------------------------------ the family
const ShivaStand = (t: number, m: Mood) => <Sv t={t} m={m} arms={[A(-1, "low", "trishul"), A(1, m === "calm" ? "bless" : "down")]} />;
const ParvatiFig = (t: number, m: Mood, o: Partial<FigP> = {}) => <Fig t={t} mood={m} {...DEVI} female hair="bun" crown="tiara" mark="bindi" lower={{ kind: "sari", col: "#c8284a", border: GOLD }} top="#a81f3c" neck={["gold", "pearl"]} armlets anklets arms={[A(-1, "fwd", "lotus"), A(1, "bless")]} aura="warm" {...o} />;
const SatiFig = (t: number, m: Mood) => <Fig t={t} mood={m} {...DEVI} female hair="long" crown="flower" mark="bindi" lower={{ kind: "sari", col: "#f08a5a", border: "#fff1c9" }} top="#d96a3c" neck={["flower"]} anklets arms={[A(-1, "namaste"), A(1, "namaste")]} />;
const Ganesha = (t: number, m: Mood) => <Fig t={t} skin="#f0a08c" shade="#d97f6e" head={<GaneshaHead m={m} t={t} />} headBack={<g />} belly lower={{ kind: "dhoti", col: "#f2c14e", border: "#d61f3a" }} neck={["gold"]} armlets anklets aura="warm"
  arms={[A(-1, "upout", "noose", true), A(1, "upout", "axe", true), A(-1, "fwd", "modak"), A(1, "bless")]} mid={<path d="M-128,256 Q0,300 128,256" stroke="#3f8a55" strokeWidth={14} fill="none" strokeLinecap="round" />} />;
const Kartikeya = (t: number, m: Mood) => <Fig t={t} mood={m} {...FAIR} hair="short" crown="mukut" mark="tri" top="#b8802a" lower={{ kind: "dhoti", col: "#d61f3a", border: GOLD }} neck={["gold"]} armlets anklets arms={[A(-1, "hip"), A(1, "low", "vel")]} aura="warm"
  back={<g opacity={0.9}>{[-1, 1].map((s) => <g key={s} transform={`translate(${s * 150},-6) scale(.62)`}><HeadBack skin={FAIR.skin} hair="short" /><Head {...FAIR} hair="short" crown="mukut" mark="tri" mood="calm" /></g>)}</g>} />;
const AshokSundari = (t: number, m: Mood) => <g transform="translate(0,150) scale(.76)"><Fig t={t} mood={m} {...DEVI} female hair="long" crown="flower" mark="bindi" lower={{ kind: "sari", col: "#ff8fb0", border: "#fff1c9" }} top="#e8647a" neck={["flower"]} arms={[A(-1, "fwd", "lotus"), A(1, "hip")]} /></g>;
const Ganga = (t: number, m: Mood) => <Fig t={t} mood={m} skin="#eaf4ff" shade="#c3d9f5" female hair="cap" hairCol="#6fb8ff" crown="tiara" crownCol="#eaf4ff" mark="bindi" lower={{ kind: "sari", col: "#dff1ff", border: "#6fb8ff" }} top="#9fd0ff" neck={["pearl"]} aura="aura" arms={[A(-1, "fwd", "pot"), A(1, "bless")]}
  headBack={<g>{[-1, 1].map((s) => <path key={s} d={`M${s * 96},-40 Q${s * 190},120 ${s * (130 + Math.sin(t * 2) * 14)},330 Q${s * 210},470 ${s * (150 + Math.sin(t * 2 + 1) * 18)},600 L${s * 60},600 Q${s * 120},420 ${s * 70},240 Q${s * 110},90 ${s * 60},-60Z`} fill="#6fb8ff" stroke={OL} strokeWidth={6} strokeLinejoin="round" opacity={0.92} />)}<path d="M-106,-20 Q-120,-132 0,-140 Q120,-132 106,-20 L98,58 L-98,58Z" fill="#6fb8ff" stroke={OL} strokeWidth={6} />{[-150, 150].map((x) => <path key={x} d={`M${x},200 q${Math.sin(t * 3) * 10},40 0,80`} stroke="#eaf4ff" strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.8} />)}</g>} />;
const Chandra = (t: number, m: Mood) => <Fig t={t} mood={m} skin="#eef0ff" shade="#c9cff2" hair="short" hairCol="#cfd6ff" crown="band" crownCol="#fff6d8" mark="none" lower={{ kind: "dhoti", col: "#fffaf0", border: "#cfd6ff" }} neck={["pearl"]} sash="#cfd6ff" arms={[A(-1, "fwd", "lotus"), A(1, "down")]}
  back={<g><circle cx={0} cy={-40} r={330} fill="url(#moon)" /><path d="M-40,-330 A240,240 0 1 0 200,-70 A190,190 0 1 1 -40,-330Z" fill="#fff6d8" stroke="#e8d9a0" strokeWidth={5} opacity={0.95} /></g>} />;

// ------------------------------------------------------------ Shiva's forms
const Nataraja = (t: number, m: Mood) => { const sw = Math.sin(t * 2) * 3; return (
  <Sv t={t} m={m} third={0.4} aura="warm" back={<g><Ring t={t} />{[-1, 1].map((s) => [0, 1, 2, 3].map((i) => <path key={`${s}${i}`} d={`M${s * 100},${-110 + i * 26} Q${s * 240},${-150 + i * 30 + sw * i} ${s * (360 - i * 26)},${-100 + i * 44}`} stroke={OL} strokeWidth={20} fill="none" strokeLinecap="round" />))}{[-1, 1].map((s) => [0, 1, 2, 3].map((i) => <path key={`${s}${i}b`} d={`M${s * 100},${-110 + i * 26} Q${s * 240},${-150 + i * 30 + sw * i} ${s * (360 - i * 26)},${-100 + i * 44}`} stroke="#30204a" strokeWidth={11} fill="none" strokeLinecap="round" />))}</g>}
    arms={[A(1, "upout", "damaru", true), A(-1, "upout", "fire", true), A(1, "bless"), A(-1, "fwd")]}
    legs={<g>
      <g transform="translate(40,640)"><Dwarf t={t} /></g>
      {leg("M40,326 Q110,440 60,590", "#6f97d2")}<ellipse cx={46} cy={600} rx={46} ry={20} fill="#6f97d2" {...S} strokeWidth={5} />
      {leg("M-50,326 Q-190,380 -250,300", "#8db6ea")}<ellipse cx={-268} cy={292} rx={22} ry={44} transform="rotate(-30 -268 292)" fill="#8db6ea" {...S} strokeWidth={5} />
      <path d="M-110,296 L110,296 L96,420 L40,396 L-10,430 L-70,392 L-124,410Z" fill="#e08a2a" {...S} />{[-70, -20, 40].map((x) => <path key={x} d={`M${x},312 q10,30 -6,62`} stroke="#5a2a10" strokeWidth={9} fill="none" strokeLinecap="round" />)}
      <path d={`M-100,300 Q-220,${330 + sw * 3} -300,${420 + sw * 4}`} stroke={OL} strokeWidth={30} fill="none" strokeLinecap="round" /><path d={`M-100,300 Q-220,${330 + sw * 3} -300,${420 + sw * 4}`} stroke="#d61f3a" strokeWidth={18} fill="none" strokeLinecap="round" />
    </g>} />
); };
const Ardhanari = (t: number, m: Mood) => (
  <g>
    <circle cx={0} cy={220} r={520} fill="url(#aura)" opacity={0.8} />
    {half("ardL", true, <Sv t={t} m={m} aura={undefined} arms={[A(-1, "low", "trishul")]} />)}
    {half("ardR", false, ParvatiFig(t, m, { aura: undefined, arms: [A(1, "fwd", "lotus")] }))}
    <path d="M0,-150 L0,600" stroke={GOLD} strokeWidth={5} opacity={0.9} strokeDasharray="2 14" strokeLinecap="round" />
  </g>
);
const Neelakantha = (t: number, m: Mood) => <Sv t={t} m={m} pose="sit" arms={[A(-1, "lap"), A(1, "fwd", "kapala")]}
  mid={<g><rect x={-30} y={88} width={60} height={52} fill="#22308a" stroke={OL} strokeWidth={6} /><circle cx={0} cy={112} r={70} fill="#6a2ad6" opacity={0.35 + 0.15 * Math.sin(t * 3)} /></g>}
  back={<g transform="translate(250,40) scale(.42)" opacity={0.9}><Halahala t={t} /></g>} />;
const Bhairava = (t: number, m: Mood) => <Fig t={t} mood={m} skin="#3a4a8a" shade="#283468" hair="wild" hairCol="#1a1430" crown="skull" mark="tri" third={0.7} fangs mous beardCol="#1a1430" lower={{ kind: "short", col: "#1a1430", border: "#d61f3a" }} neck={["skull", "snake"]} aura="aura" anklets
  arms={[A(-1, "upout", "damaru", true), A(1, "upout", "sword", true), A(-1, "low", "trishul"), A(1, "fwd", "head5")]} />;
const Rudra = (t: number, m: Mood) => <Fig t={t} mood={m} skin="#b8553a" shade="#8f3a26" hair="wild" hairCol="#4a1612" mark="tri" third={0.5} beard="short" beardCol="#4a1612" lower={{ kind: "tiger", col: "#e08a2a" }} neck={["rudra"]} aura="warm" arms={[A(-1, "out", "bow"), A(1, "up", "arrow")]} />;
const Mahakaal = (t: number, m: Mood) => <Fig t={t} mood={m} skin="#2a3468" shade="#1a2250" hair="locks" hairCol="#0c0a18" crown="moon" mark="tri" third={0.8} eyeCol="#ffb238" lower={{ kind: "tiger", col: "#3a3350" }} neck={["skull", "rudra"]} aura="aura" arms={[A(-1, "low", "trishul"), A(1, "up", "damaru")]}
  back={<g>{Array.from({ length: 12 }, (_, i) => <path key={i} d={`M0,180 L${Math.cos((i / 12) * Math.PI * 2 + t * 0.15) * 560},${180 + Math.sin((i / 12) * Math.PI * 2 + t * 0.15) * 560}`} stroke="#9fb4ff" strokeWidth={5} opacity={0.18} />)}</g>} />;
const Dakshinamurti = (t: number, m: Mood) => <Sv t={t} m={m} pose="sit" arms={[A(-1, "upout", "fire", true), A(1, "upout", "mala", true), A(-1, "lap", "book"), A(1, "bless")]}
  back={<g><path d="M-60,430 L-40,-200 L40,-200 L60,430Z" fill="#5a3a22" {...S} />{[[-170, -250, 160], [150, -270, 170], [-10, -350, 180], [-270, -120, 130], [270, -130, 140]].map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} fill={i % 2 ? "#2f6a46" : "#357a4f"} {...S} />)}{[-250, 220].map((x) => <path key={x} d={`M${x},-150 L${x + 10},120`} stroke="#5a3a22" strokeWidth={10} strokeLinecap="round" />)}</g>} />;
const Pashupati = (t: number, m: Mood) => <Sv t={t} m={m} pose="sit" arms={[A(-1, "lap"), A(1, "bless")]}
  back={<g>{[-1, 1].map((s) => <g key={s} transform={`translate(${s * 150},10) scale(${s * 0.74},.74)`}><ShivaHead smile={0.3} /></g>)}<g transform="translate(-330,430) scale(.6)"><Deer t={t} /></g><g transform="translate(330,430) scale(-.6,.6)"><Deer t={t + 1} /></g></g>} />;
const Kirata = (t: number, m: Mood) => <Fig t={t} mood={m === "calm" ? "open" : m} {...BLUE} hair="top" crown="feather" crownCol="#b8451c" mark="tri" lower={{ kind: "bark", col: "#7a5a3a" }} neck={["rudra"]} sash="#e08a2a" arms={[A(-1, "out", "bow"), A(1, "hip")]}
  back={<g transform="translate(96,150) rotate(18)"><rect x={-22} y={-110} width={44} height={170} rx={12} fill="#7a3a1a" {...S} strokeWidth={6} />{[-12, 0, 12].map((x) => <path key={x} d={`M${x},-110 L${x},-170 M${x - 8},-176 L${x},-150 L${x + 8},-176`} stroke="#f1ece0" strokeWidth={5} fill="none" />)}</g>} />;
const Bhikshatana = (t: number, m: Mood) => <g><Sv t={t} m={m} lower={{ kind: "short", col: "#e08a2a" }} arms={[A(-1, "fwd", "kapala"), A(1, "low")]} aura="aura" /><g transform="translate(330,620) scale(.62)"><Deer t={t} /></g></g>;
const Tripurantaka = (t: number, m: Mood) => <Sv t={t} m={m === "calm" ? "open" : m} third={0.5} arms={[A(-1, "out", "bow"), A(1, "up", "arrow")]} back={<g><City c={GOLD} x={-340} y={-150} t={t} i={0} /><City c="#dfe6f5" x={-250} y={-290} t={t} i={1} /><City c="#6a6e92" x={340} y={-170} t={t} i={2} /></g>} />;
const Gangadhara = (t: number, m: Mood) => <Sv t={t} m={m} arms={[A(-1, "low", "trishul"), A(1, "up")]}
  back={<g><path d={`M40,-190 Q230,-330 300,-120 Q340,60 ${290 + Math.sin(t * 2) * 12},330 Q330,480 ${300 + Math.sin(t * 2 + 1) * 14},620 L220,620 Q250,470 214,330 Q250,90 200,-70 Q150,-200 60,-150Z`} fill="#6fb8ff" stroke={OL} strokeWidth={6} strokeLinejoin="round" opacity={0.92} /><path d="M250,-60 q20,60 0,130 M270,260 q18,60 0,120" stroke="#eaf4ff" strokeWidth={6} fill="none" strokeLinecap="round" /><g transform="translate(228,-178) scale(.34)"><HeadBack skin="#eaf4ff" hair="cap" hairCol="#6fb8ff" /><Head skin="#eaf4ff" hair="cap" hairCol="#6fb8ff" crown="tiara" crownCol="#eaf4ff" mood="joy" rings={false} /></g></g>} />;
const VishnuFig = (t: number, m: Mood, o: Partial<FigP> = {}) => <Fig t={t} mood={m} skin="#5fb0c8" shade="#3f8aa6" hair="short" crown="kirita" mark="tilakU" lower={{ kind: "dhoti", col: "#f2c14e", border: "#d61f3a" }} neck={["gold", "flower"]} armlets arms={[A(1, "up", "chakra")]} {...o} />;
const Harihara = (t: number, m: Mood) => (
  <g>
    <circle cx={0} cy={220} r={520} fill="url(#aura)" opacity={0.8} />
    {half("hhL", true, <Sv t={t} m={m} aura={undefined} arms={[A(-1, "low", "trishul")]} />)}
    {half("hhR", false, VishnuFig(t, m))}
    <path d="M0,-150 L0,600" stroke={GOLD} strokeWidth={5} opacity={0.9} strokeDasharray="2 14" strokeLinecap="round" />
  </g>
);
const Hanuman = (t: number, m: Mood) => <Fig t={t} skin="#e89a6a" shade="#c8773f" head={<HanumanHead m={m} />} headBack={<g />} lower={{ kind: "short", col: "#f39a2e", border: GOLD }} neck={["gold", "flower"]} armlets anklets arms={[A(-1, "namaste"), A(1, "low", "mace")]} aura="warm"
  back={<g><path d={`M60,330 Q300,300 ${290 + Math.sin(t * 2) * 14},90 Q280,10 320,-30`} stroke={OL} strokeWidth={36} fill="none" strokeLinecap="round" /><path d={`M60,330 Q300,300 ${290 + Math.sin(t * 2) * 14},90 Q280,10 320,-30`} stroke="#c8662a" strokeWidth={22} fill="none" strokeLinecap="round" /></g>} />;
const Virabhadra = (t: number, m: Mood) => <Fig t={t} mood={m} skin="#3d5296" shade="#2a3a72" hair="locks" hairCol="#1a1430" crown="skull" mark="tri" third={0.9} fangs mous beard="short" beardCol="#1a1430" lower={{ kind: "tiger", col: "#b8451c" }} neck={["skull", "rudra"]} armlets anklets aura="warm"
  arms={[A(-1, "upout", "bow", true), A(1, "upout", "axe", true), A(-1, "out", "shield", true), A(1, "out", "trishul", true, 20), A(-1, "hip"), A(1, "up", "sword")]} />;
const Sharabha = (t: number) => <g><g transform="translate(-40,-150) scale(.9)" opacity={0.95}>{[-1, 1].map((s) => <g key={s} transform={`scale(${s},1) rotate(${Math.sin(t * 4) * 5})`}><path d="M60,-250 Q260,-380 400,-250 Q330,-240 300,-190 Q260,-200 230,-150 Q190,-170 150,-130 L60,-150Z" fill="#3d5296" {...S} /></g>)}</g><Lion t={t} roar={1} /><path d="M-156,-296 L-130,-232 L-104,-296Z" fill={GOLD} {...S} strokeWidth={5} /></g>;

// ------------------------------------------------------------ ganas and companions
const Bhringi = (t: number, m: Mood) => <Fig t={t} mood={m === "calm" ? "joy" : m} skin="#bda894" shade="#9a8572" thin hair="top" hairCol="#e9e2d4" beard="short" beardCol="#e9e2d4" mark="tri" rings={false} lower={{ kind: "short", col: "#e08a2a" }} neck={["rudra"]} arms={[A(-1, "namaste"), A(1, "namaste")]}
  mid={<g>{[176, 204, 232, 260].map((y) => <path key={y} d={`M-52,${y} Q0,${y + 14} 52,${y}`} stroke={OL} strokeWidth={4} fill="none" opacity={0.45} strokeLinecap="round" />)}</g>}
  legs={<g>{[[-70, -96], [0, 0], [70, 96]].map(([a, b], i) => <g key={i}>{leg(`M${a * 0.6},330 L${b},590`, i === 1 ? "#9a8572" : "#bda894", 26)}<ellipse cx={b} cy={604} rx={30} ry={14} fill="#bda894" {...S} strokeWidth={5} /></g>)}</g>} />;
const Bhadrakali = (t: number, m: Mood) => <Fig t={t} mood={m} skin="#2c3a78" shade="#1c2656" female hair="wild" hairCol="#0c0a18" crown="skull" mark="bindi" third={0.7} fangs lower={{ kind: "sari", col: "#a81f3c", border: GOLD }} top="#7a1428" neck={["skull"]} armlets anklets aura="warm"
  arms={[A(-1, "upout", "shield", true), A(1, "upout", "trishul", true, 14), A(-1, "fwd", "kapala"), A(1, "up", "sword")]} />;
const gana = (i: number) => (t: number, m: Mood) => { const g = [{ skin: "#5fb8a8", shade: "#3f9486", hair: "wild" as const, hairCol: "#1f5a50", prop: "drum", crown: "none" as const }, { skin: "#e0b24e", shade: "#b88a2e", hair: "bald" as const, hairCol: "#000", prop: "conch", crown: "horns" as const }, { skin: "#b79ad6", shade: "#8f72b4", hair: "top" as const, hairCol: "#3a2460", prop: "bell", crown: "none" as const }][i];
  return <g transform="translate(0,170) scale(.72)"><Fig t={t + i} mood={m === "calm" ? "joy" : m} skin={g.skin} shade={g.shade} hair={g.hair} hairCol={g.hairCol} crown={g.crown} crownCol={GOLD} mark="tri" belly fangs={i === 1} lower={{ kind: "short", col: "#e08a2a", border: GOLD }} neck={["rudra"]} arms={[A(-1, "up"), A(1, "fwd", g.prop)]} /></g>; };
const Ganas = (t: number, m: Mood) => <g>{[0, 1, 2].map((i) => <g key={i} transform={`translate(${(i - 1) * 330},${i === 1 ? 0 : -40}) scale(.82)`}>{gana(i)(t, m)}</g>)}</g>;
const Chandesha = (t: number, m: Mood) => <g transform="translate(0,150) scale(.76)"><Fig t={t} mood={m} {...BROWN} hair="top" mark="tri" rings={false} lower={{ kind: "dhoti", col: "#fffaf0", border: "#e08a2a" }} neck={["rudra"]} thread arms={[A(-1, "namaste"), A(1, "low", "axe")]} /></g>;
const Pushpadanta = (t: number, m: Mood) => <Fig t={t} mood={m === "calm" ? "joy" : m} {...FAIR} hair="long" hairCol="#3a2460" crown="flower" mark="tri" lower={{ kind: "dhoti", col: "#b79ad6", border: GOLD }} neck={["flower"]} arms={[A(-1, "fwd", "veena"), A(1, "fwd")]}
  back={<g>{[-1, 1].map((s) => <path key={s} d={`M${s * 80},150 Q${s * 330},20 ${s * 350},260 Q${s * 250},240 ${s * 200},330 Q${s * 140},280 ${s * 80},300Z`} fill="#eadcff" {...S} opacity={0.9} />)}</g>} />;
const Kubera = (t: number, m: Mood) => <Fig t={t} mood={m === "calm" ? "joy" : m} skin="#e3b877" shade="#c4975a" hair="short" crown="mukut" mark="tri" mous belly lower={{ kind: "dhoti", col: "#a81f3c", border: GOLD }} neck={["gold", "pearl"]} armlets anklets arms={[A(-1, "fwd", "moneypot"), A(1, "low", "mace")]} aura="warm" />;
const Apasmara = (t: number, m: Mood) => <g transform="translate(0,-262) scale(.62)"><Fig t={t} mood={m === "calm" ? "sad" : m} skin="#8fae88" shade="#6f8e68" hair="bald" rings={false} belly pose="sit" lower={{ kind: "short", col: "#4a5a4a" }} arms={[A(-1, "lap"), A(1, "fwd", undefined)]} front={<g><path d={`M60,232 Q150,200 ${170 + Math.sin(t * 3) * 8},120`} stroke={OL} strokeWidth={24} fill="none" strokeLinecap="round" /><path d={`M60,232 Q150,200 ${170 + Math.sin(t * 3) * 8},120`} stroke="#3f8a55" strokeWidth={13} fill="none" strokeLinecap="round" /></g>} /></g>;

// ------------------------------------------------------------ goddess forms and in-laws
const Durga = (t: number, m: Mood) => <Fig t={t} mood={m === "calm" ? "open" : m} {...DEVI} female hair="long" crown="mukut" mark="bindi" third={0.3} lower={{ kind: "sari", col: "#d61f3a", border: GOLD }} top="#a81f3c" neck={["gold", "flower"]} armlets anklets aura="warm"
  arms={[A(-1, "upout", "chakra", true), A(1, "upout", "sword", true), A(-1, "up", "conch", true), A(1, "up", "mace", true), A(-1, "out", "bow", true), A(1, "out", "trishul", true, 22), A(-1, "fwd", "lotus"), A(1, "bless")]} />;
const Kali = (t: number, m: Mood) => <Fig t={t} mood={m === "calm" ? "fierce" : m} skin="#1f2a5c" shade="#141c44" female hair="wild" hairCol="#07060f" mark="bindi" third={0.8} tongue={m !== "joy"} eyeCol="#d61f3a" lower={{ kind: "short", col: "#7a1428", border: GOLD }} top="#1f2a5c" neck={["skull"]} armlets anklets aura="aura"
  arms={[A(-1, "upout", "head5", true), A(1, "upout", "sword", true), A(-1, "fwd", "kapala"), A(1, "bless")]} />;
const Annapurna = (t: number, m: Mood) => ParvatiFig(t, m === "calm" ? "joy" : m, { lower: { kind: "sari", col: "#e8742a", border: GOLD }, top: "#c2541a", arms: [A(-1, "fwd", "ricepot"), A(1, "out", "ladle", false, 30)] });
const Himavan = (t: number, m: Mood) => <Fig t={t} mood={m} skin="#eef2fb" shade="#c9d3ee" hair="long" hairCol="#f4f8ff" crown="mukut" crownCol="#cfe4ff" beard="long" beardCol="#f4f8ff" top="#5d72b3" lower={{ kind: "dhoti", col: "#eef4ff", border: "#93a8dc" }} neck={["pearl"]} arms={[A(-1, "low", "staff"), A(1, "bless")]} />;
const Mena = (t: number, m: Mood) => <Fig t={t} mood={m} {...FAIR} female hair="bun" hairCol="#5a4a5c" crown="tiara" mark="bindi" lower={{ kind: "sari", col: "#3f6fd0", border: "#eef4ff" }} top="#2f55a8" neck={["pearl", "gold"]} arms={[A(-1, "namaste"), A(1, "namaste")]} />;
const DakshaGoat = (t: number) => <Fig t={t} skin="#f6efdf" shade="#d9cfb8" head={<GoatHead t={t} />} headBack={<g />} top="#4a2a6a" lower={{ kind: "dhoti", col: "#6a3a8a", border: GOLD }} neck={["gold"]} arms={[A(-1, "namaste"), A(1, "namaste")]} />;

// ------------------------------------------------------------ devas and sages
const Indra = (t: number, m: Mood) => <Fig t={t} mood={m === "calm" ? "open" : m} {...FAIR} hair="short" crown="kirita" mous lower={{ kind: "dhoti", col: "#fffaf0", border: GOLD }} sash="#3f6fd0" neck={["gold", "pearl"]} armlets arms={[A(-1, "hip"), A(1, "up", "vajra")]} />;
const Narada = (t: number, m: Mood) => <Fig t={t} mood={m === "calm" ? "joy" : m} {...FAIR} hair="top" mark="tilakU" lower={{ kind: "dhoti", col: "#f39a2e", border: "#a85a14" }} neck={["flower"]} thread rings={false} arms={[A(-1, "fwd", "veena"), A(1, "up")]} />;
const Kamadeva = (t: number, m: Mood) => <Fig t={t} mood={m === "calm" ? "joy" : m} skin="#9ad6a8" shade="#6fb884" hair="short" hairCol="#2a4a3a" crown="flower" lower={{ kind: "dhoti", col: "#ff8fb0", border: "#fff1c9" }} neck={["flower"]} armlets arms={[A(-1, "out", "sugarbow"), A(1, "up", "lotus")]}
  front={<g transform="translate(150,96)"><ellipse cx={0} cy={0} rx={26} ry={36} fill="#3fb46a" {...S} strokeWidth={5} /><circle cx={0} cy={-40} r={22} fill="#3fb46a" {...S} strokeWidth={5} /><path d="M-18,-40 L-44,-32 L-18,-26Z" fill="#d61f3a" stroke={OL} strokeWidth={4} /><circle cx={-4} cy={-46} r={4} fill={OL} /></g>} />;
const Rati = (t: number, m: Mood) => <Fig t={t} mood={m} {...FAIR} female hair="long" hairCol="#3a2040" crown="flower" mark="bindi" lower={{ kind: "sari", col: "#e8647a", border: "#fff1c9" }} top="#c44a62" neck={["flower", "pearl"]} anklets arms={[A(-1, "fwd", "lotus"), A(1, "hip")]} />;
const Surya = (t: number, m: Mood) => <Fig t={t} mood={m} skin="#f5a84a" shade="#d6842a" hair="short" hairCol="#7a2a10" crown="kirita" lower={{ kind: "dhoti", col: "#d61f3a", border: GOLD }} neck={["gold"]} armlets arms={[A(-1, "up", "lotus"), A(1, "up", "lotus")]}
  back={<g><circle cx={0} cy={-20} r={420} fill="url(#warm)" />{Array.from({ length: 16 }, (_, i) => <path key={i} d="M0,-300 L18,-390 L-18,-390Z" transform={`translate(0,-20) rotate(${i * 22.5 + t * 6})`} fill={GOLD} stroke={OL} strokeWidth={5} strokeLinejoin="round" />)}<circle cx={0} cy={-20} r={290} fill="#ffd45a" stroke={OL} strokeWidth={7} /></g>} />;
const Rishi = (i: number, o: Partial<FigP> = {}) => (t: number, m: Mood) => <Fig t={t + i} mood={m} skin={["#c98f5e", "#b9834f", "#d7a070", "#a8733f", "#c98f5e", "#e0b088", "#b9834f"][i % 7]} shade="#8f6238" {...rishi} hairCol={i % 3 === 1 ? "#8a8a96" : "#f1ece0"} beardCol={i % 3 === 1 ? "#8a8a96" : "#f1ece0"} hair={i % 2 ? "top" : "bald"} lower={{ kind: "dhoti", col: ["#e08a2a", "#f39a2e", "#d9742a", "#e9dcc0", "#c2541a", "#f2c14e", "#e08a2a"][i % 7], border: "#a85a14" }} arms={[A(-1, i % 2 ? "low" : "namaste", i % 2 ? "staff" : undefined), A(1, i % 2 ? "bless" : "namaste")]} {...o} />;
const Saptarishi = (t: number, m: Mood) => <g>{Array.from({ length: 7 }, (_, i) => <g key={i} transform={`translate(${(i - 3) * 150},${372 + Math.abs(i - 3) * -30}) scale(.4)`}>{Rishi(i)(t, m)}</g>)}</g>;
const Dadhichi = Rishi(0, { thin: true, hair: "bald", arms: [A(-1, "lap"), A(1, "bless")], pose: "sit", mid: <g>{[180, 208, 236, 264].map((y) => <path key={y} d={`M-50,${y} Q0,${y + 14} 50,${y}`} stroke="#ffe07a" strokeWidth={6} fill="none" strokeLinecap="round" />)}<circle cx={0} cy={220} r={110} fill="url(#kglow)" opacity={0.5} /></g> });
const Agastya = (t: number, m: Mood) => <g transform="translate(0,170) scale(.72)">{Rishi(1, { belly: true, arms: [A(-1, "fwd", "kamandalu"), A(1, "bless")], hair: "top" })(t, m)}</g>;
const Durvasa = Rishi(2, { hair: "wild", hairCol: "#8a8a96", beardCol: "#8a8a96", mood: "fierce", arms: [A(-1, "low", "staff"), A(1, "up")], third: 0 });
const Bhrigu = Rishi(4, { arms: [A(-1, "low", "staff"), A(1, "fwd", "book")] });
const Bhagiratha = (t: number, m: Mood) => <Fig t={t} mood={m} {...BROWN} thin hair="top" beard="short" mark="tri" rings={false} lower={{ kind: "bark", col: "#8a6a4a" }} neck={["rudra"]} arms={[A(-1, "up"), A(1, "up")]}
  legs={<g>{leg("M-30,330 L-20,590", BROWN.skin, 36)}<ellipse cx={-20} cy={606} rx={38} ry={17} fill={BROWN.skin} {...S} strokeWidth={5} />{leg("M40,330 Q130,400 10,470", BROWN.shade, 36)}<path d="M-88,296 L88,296 L96,440 L50,420 L10,450 L-40,424 L-96,446Z" fill="#8a6a4a" {...S} /></g>}
  front={<g transform="translate(0,-90)"><path d="M-226,0 Q-120,-80 0,-60 Q120,-80 226,0" stroke="none" fill="none" /></g>} />;
const Kannappa = (t: number, m: Mood) => <Fig t={t} mood={m === "calm" ? "open" : m} {...DUSK} hair="top" crown="feather" crownCol="#3fa37a" rings={false} lower={{ kind: "bark", col: "#3f6a3a" }} neck={["rudra"]} arms={[A(-1, "low", "bow"), A(1, "fwd", "eyeball")]}
  front={<g><path d="M22,-22 L64,10 M64,-22 L22,10" stroke="#c0282d" strokeWidth={9} strokeLinecap="round" /><path d="M46,14 q8,30 0,48 q-10,-18 0,-48Z" fill="#c0282d" stroke={OL} strokeWidth={3} /></g>} />;
const Upamanyu = (t: number, m: Mood) => <g transform="translate(0,170) scale(.72)"><Fig t={t} mood={m === "calm" ? "open" : m} {...BROWN} thin hair="top" mark="tri" rings={false} lower={{ kind: "short", col: "#e9dcc0" }} neck={["rudra"]} arms={[A(-1, "fwd", "milk"), A(1, "fwd")]} /></g>;
const Arjuna = (t: number, m: Mood) => <Fig t={t} mood={m === "calm" ? "open" : m} skin="#d7a070" shade="#b88050" hair="long" hairCol="#2a1c2c" crown="band" top="#b8802a" lower={{ kind: "dhoti", col: "#fffaf0", border: "#3f6fd0" }} neck={["gold"]} armlets arms={[A(-1, "out", "bow"), A(1, "up", "arrow")]}
  back={<g transform="translate(96,150) rotate(18)"><rect x={-22} y={-110} width={44} height={170} rx={12} fill="#3f6fd0" {...S} strokeWidth={6} />{[-12, 0, 12].map((x) => <path key={x} d={`M${x},-110 L${x},-170 M${x - 8},-176 L${x},-150 L${x + 8},-176`} stroke="#f1ece0" strokeWidth={5} fill="none" />)}</g>} />;
const Shukra = Rishi(3, { hair: "long", hairCol: "#f1ece0", lower: { kind: "dhoti", col: "#f4f8ff", border: "#7a5aa8" }, sash: "#4a2a6a", arms: [A(-1, "fwd", "kamandalu"), A(1, "low", "staff")], front: <g><path d="M18,-6 Q42,6 66,-6" stroke={OL} strokeWidth={7} fill="none" strokeLinecap="round" /><path d="M14,-22 L70,8" stroke={OL} strokeWidth={5} opacity={0.5} /></g>, mood: "open" });
const Patanjali = (t: number, m: Mood) => <Fig t={t} mood={m} {...BROWN} {...rishi} hair="top" arms={[A(-1, "namaste"), A(1, "namaste")]}
  back={<g>{[-2, -1, 0, 1, 2].map((i) => <g key={i} transform={`translate(${i * 70},${-150 + Math.abs(i) * 30}) rotate(${i * 16})`}><path d="M0,60 Q-60,20 -50,-50 Q-30,-110 0,-110 Q30,-110 50,-50 Q60,20 0,60Z" fill="#3f8a55" {...S} strokeWidth={6} /><circle cx={-14} cy={-50} r={6} fill="#ffe07a" /><circle cx={14} cy={-50} r={6} fill="#ffe07a" /></g>)}</g>}
  legs={<g>{[[0, 560, 200, 60], [14, 480, 160, 54], [-8, 400, 124, 50]].map(([x, y, rx, ry], i) => <ellipse key={i} cx={x} cy={y} rx={rx} ry={ry} fill={i % 2 ? "#357a4b" : "#3f8a55"} {...S} />)}<path d={`M160,560 Q260,540 ${250 + Math.sin(t * 3) * 10},470`} stroke={OL} strokeWidth={30} fill="none" strokeLinecap="round" /><path d={`M160,560 Q260,540 ${250 + Math.sin(t * 3) * 10},470`} stroke="#3f8a55" strokeWidth={18} fill="none" strokeLinecap="round" /></g>} />;
const Vyaghrapada = (t: number, m: Mood) => <Fig t={t} mood={m} {...BROWN} {...rishi} hair="top" hairCol="#8a8a96" beardCol="#8a8a96" arms={[A(-1, "namaste"), A(1, "namaste")]}
  legs={<g>{[-1, 1].map((s) => <g key={s}>{leg(`M${s * 50},330 L${s * 56},580`, "#e08a2a", 54)}{[380, 440, 500].map((y) => <path key={y} d={`M${s * 56 - 24},${y} q24,14 48,0`} stroke="#5a2a10" strokeWidth={8} fill="none" strokeLinecap="round" />)}<ellipse cx={s * 64} cy={602} rx={50} ry={24} fill="#f0a84a" {...S} strokeWidth={6} />{[-22, 0, 22].map((x) => <path key={x} d={`M${s * 64 + x},612 l0,14`} stroke={OL} strokeWidth={5} strokeLinecap="round" />)}</g>)}<path d="M-110,296 L110,296 L116,400 Q0,424 -116,400Z" fill="#e08a2a" {...S} /></g>} />;

// ------------------------------------------------------------ asuras
const Jalandhara = (t: number, m: Mood) => <Fig t={t} mood={m === "calm" ? "open" : m} skin="#3f9aa8" shade="#2a7684" hair="long" hairCol="#123a44" crown="horns" mous fangs beardCol="#123a44" top="#1f3a52" lower={{ kind: "dhoti", col: "#123a44", border: GOLD }} neck={["gold", "pearl"]} armlets arms={[A(-1, "hip"), A(1, "low", "sword", false, 160)]}
  back={<path d={`M-110,150 Q-300,260 -260,600 Q-150,560 -60,610 Q20,560 100,612 Q200,560 270,600 Q300,260 110,150Z`} fill="#2a6f9a" {...S} opacity={0.95} />} />;
const Andhaka = (t: number, m: Mood) => <Fig t={t} mood={m === "calm" ? "sad" : m} skin="#5a4a7a" shade="#3f3260" hair="wild" hairCol="#1a1430" fangs eyeCol="#f7f4ea" lower={{ kind: "short", col: "#2a2040", border: "#7a5aa8" }} neck={["gold"]}
  arms={[A(-1, "upout", undefined, true), A(1, "upout", undefined, true), A(-1, "out", undefined, true), A(1, "out", undefined, true), A(-1, "fwd"), A(1, "fwd")]} />;
const Taraka = (t: number, m: Mood) => <Fig t={t} mood={m === "calm" ? "fierce" : m} skin="#b8452e" shade="#8a2a20" hair="wild" hairCol="#2a0d10" crown="horns" fangs mous beardCol="#2a0d10" belly top="#b8802a" lower={{ kind: "dhoti", col: "#2a0d10", border: GOLD }} neck={["gold"]} armlets arms={[A(-1, "hip"), A(1, "low", "mace")]} />;
const Tripura = (t: number, m: Mood) => <g>{[[GOLD, "#b8802a", "mukut"], ["#dfe6f5", "#9fb0cf", "kirita"], ["#6a6e92", "#44476a", "horns"]].map(([c, d, cr], i) => <g key={i} transform={`translate(${(i - 1) * 330},${i === 1 ? -30 : 20}) scale(.6)`}><Fig t={t + i} mood={m === "calm" ? "open" : m} skin={["#c98a5a", "#9a8ab8", "#7a8a7a"][i]} shade={["#a06a3c", "#7a6a98", "#5a6a5a"][i]} hair="short" crown={cr as "mukut"} crownCol={c} fangs mous top={d} lower={{ kind: "dhoti", col: d, border: c }} neck={["gold"]} arms={[A(-1, "hip"), A(1, "low", ["sword", "mace", "axe"][i], false, i === 0 ? 160 : 0)]} /></g>)}</g>;
const Gajasura = (t: number) => <Elephant t={t} col="#5a4a6a" dark="#3f3250" fierce />;
const Mahisha = (t: number, m: Mood) => <Fig t={t} mood={m === "calm" ? "fierce" : m} skin="#3a4a3a" shade="#263226" hair="short" hairCol="#141c14" crown="horns" crownCol="#b8802a" fangs eyeCol="#d61f3a" belly lower={{ kind: "dhoti", col: "#5a1218", border: GOLD }} neck={["gold"]} armlets arms={[A(-1, "low", "mace"), A(1, "up", "sword")]}
  front={<g><path d="M-78,-104 Q-220,-150 -200,-290 Q-150,-200 -34,-124Z M78,-104 Q220,-150 200,-290 Q150,-200 34,-124Z" fill="#cdbf9f" {...S} /><circle cx={0} cy={44} r={15} fill="none" stroke={GOLD} strokeWidth={7} /></g>} />;
const Raktabija = (t: number, m: Mood) => <g><Fig t={t} mood={m === "calm" ? "fierce" : m} skin="#c0282d" shade="#8a1a20" hair="wild" hairCol="#3a0a10" fangs lower={{ kind: "short", col: "#3a0a10", border: GOLD }} neck={["gold"]} arms={[A(-1, "hip"), A(1, "up", "sword")]} />
  {[[-300, 560, 0.3], [300, 580, 0.24], [-200, 620, 0.18]].map(([x, y, s], i) => <g key={i}><path d={`M${x},${y - 230} q14,24 0,40 q-14,-16 0,-40Z`} fill="#c0282d" stroke={OL} strokeWidth={3} /><g transform={`translate(${x},${y - 620 * s}) scale(${s})`}><Fig t={t + i} mood="fierce" skin="#c0282d" shade="#8a1a20" hair="wild" hairCol="#3a0a10" fangs lower={{ kind: "short", col: "#3a0a10" }} arms={[A(-1, "up"), A(1, "up")]} /></g></g>)}</g>;
const Shankhachuda = (t: number, m: Mood) => <Fig t={t} mood={m === "calm" ? "open" : m} skin="#6a8ad0" shade="#4a68ac" hair="long" hairCol="#1a2450" crown="kirita" crownCol="#fff6ea" mous beardCol="#1a2450" top="#fff6ea" lower={{ kind: "dhoti", col: "#1a2450", border: "#fff6ea" }} neck={["pearl"]} arms={[A(-1, "fwd", "conch"), A(1, "low", "sword", false, 160)]} />;
const Vrinda = (t: number, m: Mood) => <Fig t={t} mood={m} {...FAIR} female hair="long" crown="flower" mark="bindi" lower={{ kind: "sari", col: "#3f8a55", border: GOLD }} top="#2f6a40" neck={["flower"]} arms={[A(-1, "namaste"), A(1, "namaste")]}
  back={<g>{[-1, 1].map((s) => [0, 1, 2].map((i) => <path key={`${s}${i}`} d="M0,0 Q-30,-40 0,-90 Q30,-40 0,0Z" transform={`translate(${s * (230 + i * 30)},${560 - i * 110}) rotate(${s * (30 + i * 8)})`} fill="#3fa35a" {...S} strokeWidth={5} />))}</g>} />;

const EagleHead: React.FC = () => (
  <g>
    <path d="M-104,-20 Q-112,-128 0,-132 Q112,-128 104,-20 Q100,70 0,104 Q-100,70 -104,-20Z" fill="#fffaf0" {...S} />
    {[-80, -40, 0, 40, 80].map((x) => <path key={x} d={`M${x - 16},-104 L${x},-150 L${x + 16},-104Z`} fill="#fffaf0" {...S} strokeWidth={5} />)}
    <path d="M-74,-44 L-22,-26 M74,-44 L22,-26" stroke={OL} strokeWidth={8} strokeLinecap="round" />
    {[-46, 46].map((x) => <g key={x}><ellipse cx={x} cy={-10} rx={20} ry={16} fill="#ffd45a" stroke={OL} strokeWidth={5} /><circle cx={x} cy={-10} r={8} fill={OL} /></g>)}
    <path d="M-30,10 Q0,-4 30,10 Q24,70 0,104 Q-8,70 -30,10Z" fill={GOLD} {...S} strokeWidth={6} /><path d="M-22,34 Q0,44 22,34" stroke="#b8802a" strokeWidth={4} fill="none" />
    <path d="M-80,-112 L-66,-236 Q0,-290 66,-236 L80,-112 Q0,-138 -80,-112Z" fill={GOLD} {...S} /><circle cx={0} cy={-150} r={13} fill="#d61f3a" stroke={OL} strokeWidth={4} />
  </g>
);
const GarudaFig = (t: number) => <Fig t={t} skin="#f2c14e" shade="#d6a02e" head={<EagleHead />} headBack={<g />} lower={{ kind: "dhoti", col: "#d61f3a", border: GOLD }} neck={["gold", "snake"]} armlets anklets arms={[A(-1, "namaste"), A(1, "namaste")]}
  back={<g>{[-1, 1].map((s) => <g key={s} transform={`scale(${s},1) rotate(${Math.sin(t * 3) * 4} 100 160)`}><path d="M90,150 Q300,-140 470,-40 Q400,0 420,70 Q350,80 360,160 Q290,170 290,250 Q220,250 210,330 Q150,300 90,320Z" fill="#c8402a" {...S} />{[[200, 60], [270, 110], [230, 190], [330, 30]].map(([x, y], i) => <path key={i} d={`M${x},${y} q30,20 20,60`} stroke={GOLD} strokeWidth={7} fill="none" strokeLinecap="round" />)}</g>)}</g>} />;

// ------------------------------------------------------------ catalogue
export type Entry = { id: string; name: string; sub: string; grp: string; o: "head" | "feet"; gy: number; s: number; el: (t: number, m: Mood) => React.ReactNode; moods?: Mood[]; w?: number; dy?: number; hx?: number; hy?: number };
const ST = 620, SIT = 430;
const H = (id: string, name: string, sub: string, grp: string, el: Entry["el"], x: Partial<Entry> = {}): Entry => ({ id, name, sub, grp, o: "head", gy: ST, s: 1.0, el, moods: ["joy", "fierce"], ...x });
const B = (id: string, name: string, sub: string, grp: string, el: Entry["el"], x: Partial<Entry> = {}): Entry => ({ id, name, sub, grp, o: "feet", gy: 0, s: 1.2, el, ...x });
const svm = (m: Mood) => ({ open: m === "fierce" ? 1 : 0, smile: m === "joy" ? 1 : m === "fierce" ? -0.5 : 0.3, eyes: m === "calm" || m === "joy" ? 0 : 1, mood: m === "fierce" ? -1.3 : 0, bless: m === "joy" ? 1 : 0 });

export const CAST: Entry[] = [
  // the family
  H("shiva", "Shiva", "Mahadev, the still one", "The Family", (t, m) => <Shiva t={t} {...svm(m)} />, { gy: SIT, s: 1.15 }),
  H("shiva_stand", "Shiva, standing", "the wanderer of Kailash", "The Family", ShivaStand),
  H("parvati", "Parvati", "Uma, daughter of the mountain", "The Family", (t, m) => ParvatiFig(t, m), { moods: ["joy", "sad"] }),
  H("sati", "Sati", "the first love", "The Family", SatiFig, { moods: ["joy", "sad"] }),
  H("ganesha", "Ganesha", "remover of obstacles", "The Family", Ganesha, { moods: ["joy", "sad"] }),
  H("kartikeya", "Kartikeya", "Skanda, general of the gods", "The Family", Kartikeya),
  H("ashoksundari", "Ashok Sundari", "the daughter from the wishing tree", "The Family", AshokSundari, { moods: ["joy", "sad"], hy: 150 }),
  B("nandi", "Nandi", "the gatekeeper who listens", "The Family", (t, m) => <Nandi t={t} mood={m} />, { moods: ["joy", "sad"], s: 1.45, hx: -60, hy: -340 }),
  B("vasuki", "Vasuki", "king of serpents", "The Family", (t) => <Vasuki t={t} />, { s: 1.15 }),
  H("ganga", "Ganga", "the river who fell from heaven", "The Family", Ganga, { moods: ["joy", "fierce"] }),
  H("chandra", "Chandra", "the moon on his brow", "The Family", Chandra, { moods: ["joy", "sad"] }),
  // forms of Shiva
  H("nataraja", "Nataraja", "lord of the dance", "Forms of Shiva", Nataraja, { s: 0.74, gy: 690, moods: [] }),
  H("ardhanarishvara", "Ardhanarishvara", "half him, half her", "Forms of Shiva", Ardhanari, { moods: [] }),
  H("neelakantha", "Neelakantha", "the blue throat", "Forms of Shiva", Neelakantha, { gy: SIT, s: 1.1, moods: [] }),
  H("bhairava", "Kala Bhairava", "the terror of time", "Forms of Shiva", (t, m) => Bhairava(t, m === "calm" ? "fierce" : m), { moods: [] }),
  H("rudra", "Rudra", "the howler of the storm", "Forms of Shiva", (t, m) => Rudra(t, m === "calm" ? "fierce" : m), { moods: [] }),
  H("mahakaal", "Mahakaal", "time itself", "Forms of Shiva", (t, m) => Mahakaal(t, m === "calm" ? "open" : m), { moods: [] }),
  H("dakshinamurti", "Dakshinamurti", "the teacher who never speaks", "Forms of Shiva", Dakshinamurti, { gy: SIT, s: 1.0, moods: [] }),
  H("pashupati", "Pashupati", "lord of all creatures", "Forms of Shiva", Pashupati, { gy: SIT, s: 1.0, moods: [] }),
  H("kirata", "Kirata", "the hunter in disguise", "Forms of Shiva", Kirata),
  H("bhikshatana", "Bhikshatana", "the beggar god", "Forms of Shiva", Bhikshatana, { moods: [] }),
  H("tripurantaka", "Tripurantaka", "one arrow, three cities", "Forms of Shiva", Tripurantaka, { moods: [] }),
  H("gangadhara", "Gangadhara", "he who caught the river", "Forms of Shiva", Gangadhara, { moods: [] }),
  H("harihara", "Harihara", "Shiva and Vishnu as one", "Forms of Shiva", Harihara, { moods: [] }),
  H("virabhadra", "Virabhadra", "born of one torn lock", "Forms of Shiva", (t, m) => Virabhadra(t, m === "calm" ? "fierce" : m), { s: 0.82, moods: [] }),
  H("hanuman", "Hanuman", "the eleventh Rudra", "Forms of Shiva", Hanuman),
  B("sharabha", "Sharabha", "the beast that calmed a god", "Forms of Shiva", (t) => Sharabha(t), { s: 1.1 }),
  // ganas
  H("kirtimukha", "Kirtimukha", "the face of glory", "Ganas & Companions", (t) => <Beast t={t} glow={0.6} />, { gy: 580, s: 0.9, moods: [] }),
  H("bhringi", "Bhringi", "the three-legged devotee", "Ganas & Companions", Bhringi, { moods: ["sad"] }),
  H("bhadrakali", "Bhadrakali", "the fury beside Virabhadra", "Ganas & Companions", (t, m) => Bhadrakali(t, m === "calm" ? "fierce" : m), { moods: [] }),
  H("ganas", "The Ganas", "Shiva's wild, loyal crowd", "Ganas & Companions", Ganas, { s: 0.95, moods: [] }),
  H("chandesha", "Chandesha", "the boy steward", "Ganas & Companions", Chandesha, { hy: 150 }),
  H("pushpadanta", "Pushpadanta", "the singer who stole flowers", "Ganas & Companions", Pushpadanta, { moods: ["sad"] }),
  H("kubera", "Kubera", "treasurer of the gods", "Ganas & Companions", Kubera, { moods: ["sad"] }),
  B("apasmara", "Apasmara", "the dwarf of forgetting", "Ganas & Companions", (t, m) => Apasmara(t, m), { s: 1.5 }),
  // goddess forms
  H("durga", "Durga", "the unconquerable", "Goddess Forms & Family", Durga, { s: 0.92, moods: [] }),
  H("kali", "Kali", "the dark mother", "Goddess Forms & Family", Kali, { moods: [] }),
  H("annapurna", "Annapurna", "she who feeds the world", "Goddess Forms & Family", Annapurna, { moods: [] }),
  H("himavan", "Himavan", "king of the mountains", "Goddess Forms & Family", Himavan, { moods: ["joy", "sad"] }),
  H("mena", "Mena", "Parvati's mother", "Goddess Forms & Family", Mena, { moods: ["joy", "awe"] }),
  H("daksha", "Daksha", "the proud father", "Goddess Forms & Family", (t) => <Daksha t={t} />, { gy: 600, s: 0.95, moods: [] }),
  H("daksha_goat", "Daksha, restored", "the goat-headed king", "Goddess Forms & Family", (t) => DakshaGoat(t), { moods: [] }),
  // devas and sages
  H("brahma", "Brahma", "the creator", "Devas & Sages", (t) => <God who="brahma" t={t} />, { gy: 470, s: 1.1, moods: [] }),
  H("vishnu", "Vishnu", "the preserver", "Devas & Sages", (t) => <God who="vishnu" t={t} />, { gy: 470, s: 1.1, moods: [] }),
  H("mohini", "Mohini", "the enchantress", "Devas & Sages", (t) => <Mohini p={0} t={t} />, { gy: 600, s: 1.0, moods: [] }),
  H("indra", "Indra", "king of heaven", "Devas & Sages", Indra, { moods: ["awe", "fierce"] }),
  H("narada", "Narada", "the wandering storyteller", "Devas & Sages", Narada, { moods: ["awe"] }),
  H("kamadeva", "Kamadeva", "god of desire", "Devas & Sages", Kamadeva, { moods: ["awe"] }),
  H("rati", "Rati", "Kama's beloved", "Devas & Sages", Rati, { moods: ["joy", "sad"] }),
  H("surya", "Surya", "the sun", "Devas & Sages", Surya, { s: 0.8, moods: [] }),
  H("yama", "Yama", "lord of death", "Devas & Sages", (t) => <Yama t={t} />, { gy: 560, s: 0.95, moods: [] }),
  H("markandeya", "Markandeya", "the boy death could not take", "Devas & Sages", (t) => <Boy t={t} pose="pray" />, { gy: 0, o: "feet", s: 1.3, moods: [] }),
  H("saptarishi", "The Saptarishis", "the seven sages", "Devas & Sages", Saptarishi, { s: 1.0, moods: [] }),
  H("dadhichi", "Dadhichi", "the sage who gave his bones", "Devas & Sages", Dadhichi, { gy: SIT, s: 1.1, moods: [] }),
  H("agastya", "Agastya", "the small sage who drank the sea", "Devas & Sages", Agastya, { moods: ["joy"], hy: 170 }),
  H("durvasa", "Durvasa", "the sage of the short temper", "Devas & Sages", Durvasa, { moods: [] }),
  H("bhrigu", "Bhrigu", "the sage who tested the gods", "Devas & Sages", Bhrigu, { moods: ["fierce"] }),
  H("bhagiratha", "Bhagiratha", "the king who would not stop", "Devas & Sages", Bhagiratha, { moods: [] }),
  H("kannappa", "Kannappa", "the hunter who gave his eyes", "Devas & Sages", Kannappa, { moods: ["joy", "sad"] }),
  H("upamanyu", "Upamanyu", "the boy who asked for milk", "Devas & Sages", Upamanyu, { moods: ["joy", "sad"], hy: 170 }),
  H("arjuna", "Arjuna", "the archer who fought a god", "Devas & Sages", Arjuna, { moods: ["awe", "fierce"] }),
  H("ravana", "Ravana", "the demon king who sang", "Devas & Sages", (t) => <Ravana expr={0.3} arms={1} t={t} />, { gy: 735, s: 0.78, moods: [] }),
  H("shukra", "Shukracharya", "guru of the asuras", "Devas & Sages", Shukra, { moods: [] }),
  H("patanjali", "Patanjali", "the serpent sage", "Devas & Sages", Patanjali, { moods: ["joy", "awe"] }),
  H("vyaghrapada", "Vyaghrapada", "the tiger-footed sage", "Devas & Sages", Vyaghrapada, { moods: ["joy", "awe"] }),
  B("sage", "The Old Sage", "keeper of the mala", "Devas & Sages", (t) => <Sage t={t} />, { s: 1.5 }),
  B("seeker", "The Seeker", "you", "Devas & Sages", (t) => <Seeker t={t} glow={0.6} />, { s: 1.5 }),
  B("devotee", "The Devotee", "at the temple door", "Devas & Sages", (t) => <Devotee t={t} />, { s: 2.2 }),
  // asuras
  H("jalandhara", "Jalandhara", "born of Shiva's own fire", "Asuras", Jalandhara, { moods: ["fierce", "awe"] }),
  B("rahu", "Rahu", "the proud king's messenger", "Asuras", (t) => <Messenger t={t} />, { s: 2.6 }),
  H("bhasmasura", "Bhasmasura", "the hand of ash", "Asuras", (t) => <Demon p={0} t={t} />, { gy: 640, s: 0.95, moods: [] }),
  H("andhaka", "Andhaka", "the blind son", "Asuras", Andhaka, { moods: ["fierce"] }),
  H("tarakasura", "Tarakasura", "only Shiva's son can end him", "Asuras", Taraka, { moods: [] }),
  H("tripura", "The Tripurasuras", "three brothers, three flying cities", "Asuras", Tripura, { s: 1.0, moods: [] }),
  B("gajasura", "Gajasura", "the elephant demon", "Asuras", (t) => Gajasura(t), { s: 1.0 }),
  H("mahishasura", "Mahishasura", "the buffalo demon", "Asuras", Mahisha, { moods: [] }),
  H("raktabija", "Raktabija", "every drop becomes another", "Asuras", Raktabija, { moods: [] }),
  H("shankhachuda", "Shankhachuda", "the conch-crowned king", "Asuras", Shankhachuda, { moods: ["fierce"] }),
  H("vrinda", "Vrinda", "the faithful wife", "Asuras", Vrinda, { moods: ["sad"] }),
  B("halahala", "Halahala", "the poison of the ocean", "Asuras", (t) => <Halahala t={t} />, { s: 1.5 }),
  // creatures
  B("mushika", "Mushika", "Ganesha's mouse", "Mounts & Creatures", (t) => <Mushika t={t} />, { s: 2.2 }),
  B("paravani", "Paravani", "Kartikeya's peacock", "Mounts & Creatures", (t) => <Peacock t={t} />, { s: 1.25 }),
  B("lion", "Dawon", "the goddess's lion", "Mounts & Creatures", (t) => <Lion t={t} />, { s: 1.4 }),
  B("makara", "Makara", "Ganga's river beast", "Mounts & Creatures", (t) => <g transform="translate(40,-40)"><Makara t={t} /></g>, { s: 1.5 }),
  B("airavata", "Airavata", "Indra's white elephant", "Mounts & Creatures", (t) => <Elephant t={t} />, { s: 1.0 }),
  H("garuda", "Garuda", "Vishnu's eagle", "Mounts & Creatures", (t) => GarudaFig(t), { moods: [] }),
  B("dog", "Shvan", "Bhairava's dog", "Mounts & Creatures", (t) => <Dog t={t} />, { s: 1.8 }),
  B("deer", "Mriga", "the deer of the forest", "Mounts & Creatures", (t) => <Deer t={t} />, { s: 2.0 }),
  B("hamsa", "Hamsa", "Brahma's swan", "Mounts & Creatures", (t) => <Swan t={t} />, { s: 1.6, dy: -200 }),
  B("varaha", "Varaha", "Vishnu as the boar", "Mounts & Creatures", (t) => <Boar t={t} />, { s: 1.6, dy: -200 }),
];
export { KitParvati, Prop };
