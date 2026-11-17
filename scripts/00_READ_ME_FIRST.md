# Kailasa Scripts: how to read and build them

Written by Fable for Opus (and the helper models). Follow these exactly; do not rewrite lines or hooks.
Reference build: `c3d/src/videos/katha/Kannappa.tsx` + `c3d/katha_scripts/kannappa.json` (script 01, already rendered as `out/B01_kannappa.mp4`). Copy its structure for every reel.

## THE HOOK LAW (why our reels stalled at ~2k views: slow first 4 seconds)
Every reel obeys all seven. No exceptions.
1. **Frame 0 is the most shocking true image of the story**, fully lit. Never fade in from dark. (Shell prop `hook` does the cold open.)
2. **HOOK TEXT on screen from frame 0**: 4 to 7 words, capitals, key words gold (`*word`). It must make sense with the sound off.
3. **VO line 0 starts at 0.12 s and is 10 words or fewer.** It states a contradiction or a question the viewer already half-knows.
4. **Movement in the first half second**: the Shell punch-in plus one moving thing in frame (water, flame, falling, a head turning).
5. **By 3.5 s the open loop is set** (line 1 raises the stakes or says "and it was right"). The answer is withheld until the last third.
6. **A second hook at 40 to 50 percent** ("Then one day...", "But there was a problem."). Mark it in the beats as `TURN`.
7. **No setup before the hook.** Names, places and backstory come after line 1, never before.

## Format of each script
- `HOOK TEXT` goes to `<S.Shell hook={{ text }}>`.
- `FRAME 0` is the first image; build scene 0 so this is exactly what shows at t = 0.
- `VO` lines: `n` narrator, `s` Shiva (deep, echo), `d` asura, `f` goddess. `/` separates phrases (each phrase is one subtitle and one TTS part).
- After `|` comes what is on screen for that line: set, who (cast id + mood), action, camera.
- Camera words: `push` (slow zoom in), `pull` (zoom out), `hold`, `pan L>R`, `tilt up`. One move per scene. Scenes dissolve.
- `NANDI` = his cameo (every reel). `FACE` = where Kirtimukha's face hides (every reel, 20 percent opacity).
- Last narrator line before the CTA is always the teaching + "That is sadhana." CTA line is always "Kailasa. On Google Play."

## Turning a script into audio
`python3 mkvo.py <scriptfile.md> <id>` writes `c3d/katha_scripts/<id>.json` with the storyteller pattern (first phrase of a line brighter and quicker, last phrase slower and lower, longer pause after a line that ends a thought). Then `python3 vo_film.py <id>`. Check Shiva's lines and any Sanskrit name in the printed phonemes and add fixes to `"fix"`. Known fixes are built into mkvo.py. Do not run mkvo.py on `kannappa`: its JSON is hand-tuned and already rendered.

## Building
- Cast: `c3d/src/videos/cast/` (`Fig` rig, `CAST` entries, `beasts`). Moods: calm, joy, fierce, sad, awe, open. Figure scale 0.6 to 0.66 for full-body scenes, ground line y = 1500.
- Sets that exist: Kailash night (`kit Kailash`), temple at dusk (`kit Temple`), forest hill (`Kannappa Woods`), cosmos (`Pillar Cosmos`), sacrifice hall (`Sati Hall`), mountain layers (`film Sky/Ridge/Peak/Ledge`), room and phone (`film`).
- New sets a script needs are named in `SET` with a one-line drawing brief. Draw them in the same style (flat fills, plum outline, soft glows).
- Render: full 30 fps, then speed 12 percent (`setpts=PTS/1.12`, `atempo=1.12`), loudness -14 LUFS. Run the edge-band check. Stills QA every 2 s before rendering.
- Length: `mkvo.py` prints an estimate. The scripts are written full. Mythic reels should land at 60 s or under, family reels at 45 s or under.
- **If a script runs long, trim in this order and nowhere else:** (1) a phrase that only repeats what the picture already shows, (2) the middle item of any list of three, (3) one "squeeze" beat before the TURN. **Never cut:** line 0, line 1, the TURN line, Shiva's line, the teaching, "That is sadhana.", the CTA.

## Respect rules (never break)
No wounds or gore on screen (light, silhouettes, or a cut away). No mocking any deity or tradition. Where traditions differ the narrator says "one telling says". No health promises in the family series: Shiva gives stillness, perspective and a practice, never a cure.
