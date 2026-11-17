# Kailasa Storybook: Style Lock (from Kirtimukha + the five katha reels)

Reference frames: book/ref/*.jpg (S16_kirtimukha is the master look).
Code: c3d/src/videos/katha/kit.tsx (shared), Markandeya/Ravana/Pillar/Bhasma/Sati.tsx, film/Film.tsx.

## Canvas & camera
- 1080x1920 SVG page, Remotion 30 fps. Scenes framed by `Scene` camera `[cx,cy,s, cx2,cy2,s2]`, clamped so it never sees past the page (no dark bands).
- Slow eased push-ins/pull-outs (ease = smoothstep). One move per scene. Crossfades between scenes, no hard cuts.
- Subtitles top/mid safe zone; never bottom 250 px. No gold border, no "KATHA"/episode number on screen.

## Line & shape
- Single outline colour `OL = #160a1c` everywhere. Stroke 5-8 px on figures (7 standard, 4-5 on small details, 2.5-3 on beads).
- `strokeLinejoin="round"`, `strokeLinecap="round"`. Flat fills, one soft shade layer (same hue darker, opacity .35-.55) on the shadow side (right).
- Limbs = double stroke trick: thick OL stroke (w) under coloured stroke (w-12), round caps. Arms ~42-54 px.
- Heads big, bodies compact (chibi-leaning heroic: head ≈ 1/3 of seated height). Faces simple: eyes = closed arcs (calm) or almond whites + dark pupil + white glint; brows = one stroke; mouth = one curve driven by `smile`.
- Glows are radial gradients (`kglow` gold, `aura` blue, `warm` orange, `moon`), never hard light shapes.

## Palette (locked)
- Night sky `skyN` #060822 → #171d54 → #3c2c66; dusk `skyD` #0d1140 → #4a2f70 → #c9603f → #f2a04e.
- Shiva skin `skinS` #a3c6f2/#8db6ea/#6f97d2 (blue), jata #241634/#30204a, ash stripes #f3efe6, rudraksha #7a3a1a, tiger-cloth #e08a2a + #5a2a10 stripes, serpent #3f8a55, moon #fff6d8.
- Gold #f6c768 (GOLD), deep gold #d9a441/#c9a23e, saffron #e08a2a/#ff9a3c, kumkum #d61f3a/#c0282d.
- Human skin #e8b48a (fair), #c98f5e/#b9834f (brown); Kirtimukha orange #e9822b/#b8451c, mane #ffb53d, horn/teeth #f6e6c6.
- Stone #5e6286/#3b3d5c; snow #eef4ff → #93a8dc.

## Motion language
- Breathing: sin(t*1.5..1.6)*2-3 px on torso. Flames flicker sin(t*9). Stars twinkle. Hair/cloth sway small.
- Expressions are parameters (open, smile, eyes, mood, talk, fear, expr), interpolated, never swapped.

## Sound/voice (for reels)
- Narrator: Kokoro .6 am_michael + .4 am_onyx, storyteller pauses; final reel sped 12%. Shiva lines: am_onyx pitched down + echo. Calm mix: drone, pad, bells, flute; no loud stings.
