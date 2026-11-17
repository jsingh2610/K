// Character sheets: one frame per CAST entry (1080x1350).
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Defs, Stars, SERIF, GOLD } from "../katha/kit";
import { CAST } from "./cast";
export const SHEET_FRAMES = CAST.length;
export const CastSheet: React.FC = () => {
  const f = useCurrentFrame(), e = CAST[Math.min(CAST.length - 1, f)], t = 2.1;
  const place = (x: number, gy: number, s: number, m: Parameters<typeof e.el>[1]) => <g transform={`translate(${x},${gy - e.gy * s + (e.dy ?? 0) * s}) scale(${s})`}>{e.el(t, m)}</g>;
  const ms = e.moods ?? [];
  return (
    <AbsoluteFill style={{ background: "#060822" }}>
      <Defs />
      <svg width={1080} height={1350} viewBox="0 0 1080 1350">
        <rect width={1080} height={1350} fill="url(#skyN)" /><Stars t={t} n={70} h={900} />
        <path d="M0,1130 Q300,1060 540,1080 Q800,1060 1080,1130 L1080,1350 L0,1350Z" fill="url(#ledge)" /><path d="M0,1130 Q300,1060 540,1080 Q800,1060 1080,1130" stroke="#f4f8ff" strokeWidth={8} fill="none" />
        {place(540, 1150, e.s, "calm")}
        {ms.slice(0, 2).map((m, i) => { const bx = i ? 930 : 150, by = 1196, k = e.s * 0.62; return (
          <g key={m}>
            <clipPath id={`bub${i}`}><circle cx={bx} cy={by} r={112} /></clipPath>
            <circle cx={bx} cy={by} r={112} fill="#171d54" />
            <g clipPath={`url(#bub${i})`}><g transform={`translate(${bx - (e.hx ?? 0) * k},${by + 14 - (e.hy ?? 0) * k}) scale(${k})`}>{e.el(t, m)}</g></g>
            <circle cx={bx} cy={by} r={112} fill="none" stroke={GOLD} strokeWidth={6} />
            <text x={bx} y={by + 146} textAnchor="middle" fontFamily={SERIF} fontSize={28} fill="#1c2250" fontStyle="italic">{m}</text>
          </g>); })}
        <text x={540} y={108} textAnchor="middle" fontFamily={SERIF} fontSize={78} fill={GOLD} stroke="#160a1c" strokeWidth={3} paintOrder="stroke">{e.name}</text>
        <text x={540} y={160} textAnchor="middle" fontFamily={SERIF} fontSize={34} fontStyle="italic" fill="#dfe6ff">{e.sub}</text>
      </svg>
    </AbsoluteFill>
  );
};
