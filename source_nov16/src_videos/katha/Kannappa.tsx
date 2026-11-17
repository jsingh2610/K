// KANNAPPA: the hunter who gave his eyes. Story 1 of the Kailasa Book. Cold-open hook, cast rig, Nandi cameo, hidden face.
import React from "react";
import VOJ from "./kannappa.json";
import { makeStory, VOT, cl, ease, lerp, rnd, OL, GOLD, Stars, ShivaHead, KFace } from "./kit";
import { Fig, FigP, ArmP, Mood } from "../cast/rig";
import { Nandi } from "../cast/beasts";

const VO = VOJ as VOT;
const S = makeStory(VO, [0, 2, 3, 4, 5, 6, 7, 8, 10], 7);
export const KANNAPPA_FRAMES = S.FRAMES;
const { Scene, LT } = S;
const P = (li: number, pi: number) => VO.lines[li].parts![pi].t;
const ST7 = { stroke: OL, strokeWidth: 7, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
const A = (s: 1 | -1, pose: ArmP["pose"], prop?: string, back?: boolean, rot?: number): ArmP => ({ s, pose, prop, back, rot });
const DUSK = { skin: "#a06a44", shade: "#7e4f2e" };
const K = 0.62; // figure scale in this reel
const GY = 1500; // ground line

/** the forest hill. dusk 1 = warm evening, 0 = night */
const Woods: React.FC<{ t: number; dusk?: number; face?: number }> = ({ t, dusk = 1, face = 0 }) => (
  <g>
    <rect width={1080} height={1920} fill="url(#skyN)" /><rect width={1080} height={1920} fill="url(#skyD)" opacity={dusk} />
    <Stars t={t} n={60} h={760} />
    <circle cx={840} cy={330} r={250} fill="url(#moon)" opacity={1 - 0.5 * dusk} /><circle cx={840} cy={330} r={56} fill="#fffbe6" opacity={1 - 0.35 * dusk} />
    <path d="M0,1180 L170,960 L330,1100 L520,900 L700,1080 L880,940 L1080,1150 L1080,1560 L0,1560Z" fill="#231a52" opacity={0.9} />
    {/* trees */}
    {[[-40, 1.25], [1010, 1.15], [180, 0.8], [900, 0.78]].map(([x, s], i) => (
      <g key={i} transform={`translate(${x},${GY}) scale(${s})`}>
        <path d="M-46,20 Q-30,-300 -60,-640 L60,-640 Q30,-300 52,20Z" fill="#2a1a3a" {...ST7} />
        <path d="M-10,-300 Q-20,-420 -6,-520 M22,-200 Q16,-360 26,-470" stroke={OL} strokeWidth={5} fill="none" opacity={0.4} />
        {[[-150, -700, 190], [130, -740, 200], [0, -880, 220], [-250, -560, 150], [240, -580, 160]].map(([cx, cy, r], j) => <circle key={j} cx={cx + Math.sin(t * 0.7 + i + j) * 5} cy={cy} r={r} fill={j % 2 ? "#1f4a3c" : "#24573f"} {...ST7} />)}
      </g>
    ))}
    {/* the face that guards every door, hidden in the leaves */}
    {face > 0 && <g transform="translate(118,560) scale(.23)" opacity={0.2 * face}><KFace t={t} glow={0} calm={1} /></g>}
    <path d={`M0,${GY - 30} Q280,${GY - 90} 540,${GY - 50} Q800,${GY - 96} 1080,${GY - 24} L1080,1920 L0,1920Z`} fill="#2c2458" />
    <path d={`M0,${GY - 30} Q280,${GY - 90} 540,${GY - 50} Q800,${GY - 96} 1080,${GY - 24}`} stroke="#5d5aa0" strokeWidth={7} fill="none" />
    {Array.from({ length: 14 }, (_, i) => <circle key={i} cx={(rnd(i + 2) * 1080 + t * 12 * (rnd(i) - 0.5)) % 1080} cy={900 + rnd(i + 9) * 560 + Math.sin(t * 1.3 + i) * 16} r={4} fill="#ffe7a8" opacity={0.25 + 0.5 * Math.abs(Math.sin(t * 1.8 + i * 2))} />)}
  </g>
);

/** the forest lingam with its two eyes. origin = base centre. bleed 0..1 per eye; gift = Kannappa's eye set in place */
const Stone: React.FC<{ t: number; bl?: number; br?: number; gift?: number; glow?: number; mess?: number }> = ({ t, bl = 0, br = 0, gift = 0, glow = 0, mess = 0 }) => (
  <g>
    {glow > 0 && <circle cx={0} cy={-230} r={300 + 160 * glow} fill="url(#kglow)" opacity={0.85 * glow} />}
    <path d="M-250,-10 Q-250,-70 0,-70 Q250,-70 250,-10 Q250,44 0,44 Q-250,44 -250,-10Z" fill="#3b3d5c" {...ST7} />
    <path d="M-170,-40 Q-170,-84 0,-84 Q170,-84 170,-40 Q170,-4 0,-4 Q-170,-4 -170,-40Z" fill="#2a2536" {...ST7} />
    <path d="M-104,-44 L-104,-330 Q-104,-440 0,-440 Q104,-440 104,-330 L104,-44 Q0,-20 -104,-44Z" fill="#15121c" {...ST7} />
    <path d="M40,-432 Q104,-420 104,-330 L104,-44 Q70,-34 40,-32Z" fill="#000" opacity={0.3} />
    <path d="M-70,-340 Q-74,-410 -30,-424" stroke="#4a4560" strokeWidth={9} fill="none" strokeLinecap="round" />
    {[-372, -352, -332].map((y) => <path key={y} d={`M-64,${y} Q0,${y - 7} 64,${y}`} stroke="#efe9da" strokeWidth={8} fill="none" strokeLinecap="round" />)}
    <circle cx={0} cy={-352} r={9} fill="#d61f3a" />
    {[-1, 1].map((s) => { const b = s < 0 ? bl : br, g = s < 0 ? gift : 0; return (
      <g key={s} transform={`translate(${s * 44},-252)`}>
        {g > 0 && <circle r={70} fill="url(#kglow)" opacity={g} />}
        <path d="M-27,0 Q0,-24 27,0 Q0,18 -27,0Z" fill={g > 0.5 ? "#ffe7a8" : "#f7f4ea"} stroke={OL} strokeWidth={5} strokeLinejoin="round" /><circle r={9} fill={g > 0.5 ? "#7e4f2e" : "#2a2536"} /><circle cx={3} cy={-3} r={2.6} fill="#fff" />
        {b > 0 && <g opacity={cl(b * 3)}><path d={`M-4,14 Q${-10 + Math.sin(t * 2) * 2},${14 + 70 * b} -6,${14 + 150 * b}`} stroke="#c0282d" strokeWidth={11} fill="none" strokeLinecap="round" /><circle cx={-6} cy={14 + 150 * b} r={9} fill="#c0282d" /></g>}
      </g>); })}
    {/* what the hunter leaves behind */}
    {mess > 0 && <g opacity={mess}><ellipse cx={-150} cy={-52} rx={44} ry={15} fill="#3f8a55" stroke={OL} strokeWidth={5} /><ellipse cx={-150} cy={-62} rx={28} ry={17} fill="#b8451c" stroke={OL} strokeWidth={5} />{[[130, -60], [160, -50], [112, -48]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={11} fill={i % 2 ? "#ffd45a" : "#ff8fb0"} stroke={OL} strokeWidth={3.5} />)}</g>}
  </g>
);

type HP = { t: number; m: Mood; arms: ArmP[]; shut?: number; o?: Partial<FigP> };
/** Kannappa. shut = his right eye given away (0..1) */
const Hunter: React.FC<HP> = ({ t, m, arms, shut = 0, o }) => (
  <Fig t={t} mood={m} {...DUSK} hair="top" crown="feather" crownCol="#3fa37a" rings={false} lower={{ kind: "bark", col: "#3f6a3a" }} neck={["rudra"]} arms={arms}
    front={<g>{[-30, 0, 30].map((x, i) => <circle key={x} cx={x} cy={-150 - (i === 1 ? 10 : 0)} r={13} fill={i % 2 ? "#ffd45a" : "#ff8fb0"} stroke={OL} strokeWidth={3.5} />)}
      {shut > 0 && <g opacity={shut}><ellipse cx={-42} cy={-6} rx={30} ry={24} fill={DUSK.skin} /><path d="M-64,-4 Q-42,8 -20,-4" stroke={OL} strokeWidth={6} fill="none" strokeLinecap="round" /></g>}</g>} {...o} />
);
const Priest: React.FC<{ t: number; m: Mood; arms: ArmP[]; o?: Partial<FigP> }> = ({ t, m, arms, o }) => (
  <Fig t={t} mood={m} skin="#d7a070" shade="#b88050" hair="bald" mark="tri" rings={false} thread lower={{ kind: "dhoti", col: "#fffaf0", border: "#e08a2a" }} neck={["rudra"]} arms={arms} {...o} />
);
const at = (x: number, y: number, s: number, node: React.ReactNode, rot = 0) => <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>{node}</g>;
const HY = GY - 620 * K - 6; // head y for a standing figure

export const Kannappa: React.FC<{ audio?: boolean }> = ({ audio }) => (
  <S.Shell audio={audio} mix="katha/kannappa.wav" tagline="Love was enough." hook={{ text: "He *spat on a Shiva *lingam" }}>{(t) => (<>
    {/* 0 THE HOOK: the spit, frozen at its most shocking, priest watching from behind a tree */}
    <Scene i={0} t={t} dur={3.2} cam={[600, 1150, 1.5, 540, 1000, 1.06]}>{(u, lt) => {
      const love = ease((t - LT[1] + 0.1) / 1.0);
      return (
        <g><Woods t={t} />
          {at(700, GY, 1.0, <Stone t={t} glow={love} />)}
          {at(950, HY + 60, K * 0.9, <Priest t={t} m="awe" arms={[A(-1, "up"), A(1, "fwd")]} />)}
          <g transform={`translate(950,${GY}) scale(.9)`}><path d="M-46,20 Q-30,-300 -60,-640 L60,-640 Q30,-300 52,20Z" fill="#2a1a3a" {...ST7} /></g>
          {at(330, HY + 40, K, <Hunter t={t} m="awe" arms={[A(-1, "low", "bow"), A(1, "fwd", "meat")]} />, 10)}
          {/* the water */}
          {Array.from({ length: 22 }, (_, i) => { const q = ((lt * 1.5 + i / 22) % 1), x = lerp(392, 660, q), y = lerp(1180, 1120, q) - Math.sin(q * Math.PI) * 70 + (rnd(i) - 0.5) * 34; return <circle key={i} cx={x} cy={y} r={5 + rnd(i + 4) * 7} fill="#cfeaff" stroke="#6fb8ff" strokeWidth={2.5} opacity={Math.sin(q * Math.PI) * (1 - love * 0.8)} />; })}
          {love > 0 && Array.from({ length: 9 }, (_, i) => { const q = ((t * 0.35 + i / 9) % 1); return <circle key={i} cx={700 + Math.sin(i * 2.3) * 190} cy={1200 - q * 420} r={7} fill="#ffe7a8" opacity={love * Math.sin(q * Math.PI)} />; })}
        </g>
      );
    }}</Scene>

    {/* 1 what a hunter has: water in the mouth, meat tasted first */}
    <Scene i={1} t={t} cam={[420, 1160, 1.34, 600, 1080, 1.08]}>{(u, lt) => {
      const give = ease((t - P(2, 3) - 0.2) / 1.2), walk = 1 - ease((t - P(2, 1)) / 1.6), taste = cl(Math.sin(cl((t - P(2, 3) + 0.5) / 1.4) * Math.PI));
      return (
        <g><Woods t={t} />
          {at(700, GY, 1.0, <Stone t={t} mess={give} glow={0.25 * give} />)}
          {at(lerp(380, 180, walk), HY + Math.abs(Math.sin(t * 6)) * -8 * walk, K, <Hunter t={t} m={taste > 0.4 ? "joy" : "calm"} arms={[A(-1, "low", "bow"), A(1, give > 0.5 ? "out" : taste > 0.3 ? "bless" : "fwd", give > 0.5 ? undefined : "meat")]} />)}
        </g>
      );
    }}</Scene>

    {/* 2 the priest: horrified, scrubbing */}
    <Scene i={2} t={t} cam={[700, 1180, 1.3, 620, 1100, 1.12]}>{(u, lt) => {
      const scrub = ease((t - P(3, 1) + 0.2) / 0.5), sw = Math.sin(t * 9) * 26 * scrub;
      return (
        <g><Woods t={t} dusk={0.75} />
          {at(700, GY, 1.0, <Stone t={t} mess={1 - scrub} />)}
          {at(lerp(380, 470, scrub), HY, K, <Priest t={t} m={scrub > 0.5 ? "fierce" : "awe"} arms={scrub > 0.5 ? [A(-1, "hip"), A(1, "out")] : [A(-1, "up"), A(1, "up")]} />)}
          {scrub > 0.5 && <g transform={`translate(${640 + sw},${1260 + Math.abs(sw) * 0.5})`}><ellipse rx={40} ry={26} fill="#fffaf0" stroke={OL} strokeWidth={5} />{[0, 1, 2].map((i) => <circle key={i} cx={-30 + i * 34 + sw * 0.4} cy={-36 - i * 9} r={9} fill="#cfeaff" opacity={0.8} />)}</g>}
        </g>
      );
    }}</Scene>

    {/* 3 the eye begins to bleed */}
    <Scene i={3} t={t} cam={[640, 1200, 1.1, 720, 1230, 1.9]}>{(u, lt) => {
      const b = cl((t - P(4, 1) - 0.1) / 2.6);
      return (
        <g><Woods t={t} dusk={0.55} />
          {at(700, GY, 1.0, <Stone t={t} bl={b} />)}
          {at(360, HY, K, <Hunter t={t} m={b > 0.05 ? "awe" : "calm"} arms={b > 0.05 ? [A(-1, "up"), A(1, "up")] : [A(-1, "low", "bow"), A(1, "fwd", "meat")]} />)}
        </g>
      );
    }}</Scene>

    {/* 4 he gives his own eye: no wound shown, only light */}
    <Scene i={4} t={t} cam={[470, 1130, 1.5, 560, 1120, 1.22]}>{(u, lt) => {
      const lift = ease((t - P(5, 1) + 0.1) / 0.7), done = ease((t - P(5, 2) - 0.5) / 0.8), fl = Math.sin(cl((t - P(5, 2) - 0.15) / 0.9) * Math.PI);
      return (
        <g><Woods t={t} dusk={0.5} />
          {at(700, GY, 1.0, <Stone t={t} bl={1 - done} gift={done} glow={0.4 * done} />)}
          {at(400, HY, K, <Hunter t={t} m={done > 0.6 ? "joy" : "sad"} shut={done} arms={done > 0.4 ? [A(-1, "low", "bow"), A(1, "out")] : lift > 0.5 ? [A(-1, "low", "bow"), A(1, "up", "arrow", false, 150)] : [A(-1, "low", "bow"), A(1, "down", "arrow")]} />)}
          <circle cx={lerp(400, 656, done)} cy={lerp(HY, 1248, done)} r={30 + 380 * fl} fill="url(#kglow)" opacity={Math.max(fl, done > 0 && done < 1 ? 0.9 : 0)} />
        </g>
      );
    }}</Scene>

    {/* 5 it stops. Then the other eye begins */}
    <Scene i={5} t={t} cam={[560, 1120, 1.22, 720, 1230, 1.8]}>{() => {
      const b = cl((t - P(6, 1) - 0.1) / 2.0);
      return (
        <g><Woods t={t} dusk={0.4} />
          {at(700, GY, 1.0, <Stone t={t} gift={1} br={b} glow={0.3 * (1 - b)} />)}
          {at(400, HY, K, <Hunter t={t} m={b > 0.05 ? "awe" : "joy"} shut={1} arms={b > 0.05 ? [A(-1, "up"), A(1, "up")] : [A(-1, "low", "bow"), A(1, "out")]} />)}
        </g>
      );
    }}</Scene>

    {/* 6 foot on the stone to mark the place; the arrow rises again */}
    <Scene i={6} t={t} cam={[560, 1180, 1.16, 520, 1080, 1.4]}>{() => {
      const up = ease((t - P(7, 1) + 0.1) / 0.9);
      return (
        <g><Woods t={t} dusk={0.3} />
          {at(700, GY, 1.0, <Stone t={t} gift={1} br={1} />)}
          {at(450, HY, K, <Hunter t={t} m="sad" shut={1} arms={[A(-1, "hip"), A(1, up > 0.4 ? "up" : "down", "arrow", false, up > 0.4 ? 150 : 0)]}
            o={{ legs: <g>
              <path d="M-50,330 L-56,590" stroke={OL} strokeWidth={64} strokeLinecap="round" /><path d="M-50,330 L-56,590" stroke={DUSK.skin} strokeWidth={52} strokeLinecap="round" /><ellipse cx={-66} cy={606} rx={42} ry={19} fill={DUSK.skin} {...ST7} strokeWidth={5} />
              <path d="M50,330 Q200,360 270,470" stroke={OL} strokeWidth={64} fill="none" strokeLinecap="round" /><path d="M50,330 Q200,360 270,470" stroke={DUSK.shade} strokeWidth={52} fill="none" strokeLinecap="round" /><ellipse cx={292} cy={478} rx={44} ry={20} fill={DUSK.shade} {...ST7} strokeWidth={5} />
              <path d="M-104,296 L104,296 L112,450 L70,430 L30,460 L-20,432 L-64,458 L-112,436Z" fill="#3f6a3a" {...ST7} />
            </g> }} />)}
        </g>
      );
    }}</Scene>

    {/* 7 "Stop, Kannappa." The hand from the stone */}
    <Scene i={7} t={t} cam={[520, 1080, 1.4, 540, 1000, 1.08]}>{() => {
      const h = ease((t - LT[8] + 0.25) / 0.7), see = ease((t - LT[9] - 0.6) / 1.2), wx = 450 + 226 * K, wy = HY - 52 * K;
      return (
        <g><Woods t={t} dusk={0.3 * (1 - h)} />
          <g transform="translate(700,700) scale(1.35)" opacity={0.5 * h}><ShivaHead smile={0.6} /></g>
          {at(700, GY, 1.0, <Stone t={t} gift={1 - see} br={1 - h} glow={h} />)}
          {at(450, HY, K, <Hunter t={t} m={see > 0.5 ? "joy" : "awe"} shut={1 - see} arms={[A(-1, "hip"), A(1, "up", see > 0.3 ? undefined : "arrow", false, 150)]} />)}
          {h > 0 && <g opacity={h}>
            {(() => { const hx2 = lerp(620, wx + 4, h), hy2 = lerp(1260, wy + 26, h), d = `M612,1300 Q${lerp(612, 540, h)},${lerp(1300, 1230, h)} ${hx2},${hy2}`; return (<g>
              <path d={d} stroke={OL} strokeWidth={64} fill="none" strokeLinecap="round" /><path d={d} stroke="#8db6ea" strokeWidth={50} fill="none" strokeLinecap="round" />
              <path d="M600,1262 q-22,-6 -40,6" stroke="#7a3a1a" strokeWidth={10} fill="none" strokeLinecap="round" />
              <ellipse cx={hx2} cy={hy2 - 6} rx={46} ry={30} fill="#8db6ea" stroke={OL} strokeWidth={6} transform={`rotate(-20 ${hx2} ${hy2})`} />
              {[-16, 0, 16].map((x) => <path key={x} d={`M${hx2 + x - 6},${hy2 - 26} l8,24`} stroke={OL} strokeWidth={4} strokeLinecap="round" opacity={0.5} />)}
            </g>); })()}
          </g>}
        </g>
      );
    }}</Scene>

    {/* 8 the priest knew every ritual; the hunter knew only love. Nandi sits watching. */}
    <Scene i={8} t={t} cam={[540, 1060, 1.22, 540, 960, 1.0]}>{() => {
      const n = ease((t - P(10, 1)) / 1.0);
      return (
        <g><Woods t={t} dusk={0} face={1} />
          <g transform="translate(700,700) scale(1.35)" opacity={0.3}><ShivaHead smile={0.8} /></g>
          {at(700, GY, 1.0, <Stone t={t} glow={0.7} mess={1} />)}
          {at(250, GY - 430 * K - 4, K, <Hunter t={t} m="joy" arms={[A(-1, "namaste"), A(1, "namaste")]} o={{ pose: "sit" }} />)}
          {at(470, GY - 430 * K * 0.92 - 4, K * 0.92, <Priest t={t} m="calm" arms={[A(-1, "namaste"), A(1, "namaste")]} o={{ pose: "sit" }} />)}
          <g transform={`translate(${lerp(1160, 940, n)},${GY + 30}) scale(-.5,.5)`}><Nandi t={t} mood="joy" sit /></g>
        </g>
      );
    }}</Scene>
  </>)}</S.Shell>
);
