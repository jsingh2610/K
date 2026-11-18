# Kailasa reel factory: handoff (18 Nov 2026)

## Restore (fresh session)
1. Clone this branch: `git clone --branch backup-assets --depth 1 https://github.com/jsingh2610/k kbk`
2. `cat kbk/latest/kailasa_latest.tgz.part* > k.tgz && tar xzf k.tgz -C /home/claude` (gives /home/claude/hero/...)
3. `cd /home/claude/hero/c3d && npm install`
4. Voice: `pip install kokoro-onnx soundfile --break-system-packages`, then into /home/claude/tts download
   https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/kokoro-v1.0.onnx and
   https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/voices-v1.0.bin
5. Check `browserExecutable` in c3d/render_duo.mjs and stills.mjs points at this machine's Chromium (Playwright). Fix the path if needed.

## Build one reel
- Scripts: hero/book/scripts/*.md (format in 00_READ_ME_FIRST.md; family rules in D_family_bible.md).
- `python3 mkvo.py <scripts.md> <id>` writes katha_scripts/<id>.json; tune it; `python3 vo_film.py <id>` writes src/videos/katha/<id>.json + public/katha/<id>.wav. Read the printed phonemes and fix names in "fix".
- Write src/videos/katha/<Comp>.tsx with `makeStory(VO, sceneStartLines, ep)`, `Scene`, `Shell hook={{ text }}`; register it in src/Root.tsx.
- QA: `./kstills.sh <Comp> f1,f2,...` (contact sheet in the scratchpad qa folder). Look at it, fix, repeat.
- Render in the background: `./mk.sh <Comp> <rawname> <finalname>` → out/<finalname>.mp4 (30 fps, sped 12%, -14 LUFS).

## Quality rules (J rejects work that breaks these)
STORY
- Tell a story about one person in the past tense, like Kannappa and Blue Throat (katha_scripts/kannappa.json, blue_throat.json). Never lecture ("Meet X").
- Line 0: a sharp contradiction, 10 words or fewer. Line 1 twists it. Small concrete details. Show a mystery early, pay it off later.
- Any myth element must be explained inside the story (a character tells it, e.g. Dadi). Never assume the viewer knows it.
- Family reels: the problem is not solved; the person does one small thing; Shiva appears one way only.
- About 50 s final, calm: speeds 0.86 to 0.92, pauses 0.3 to 0.8. Trim by the README rule.
- Known phoneme fixes: Dadi → dˈɑːdiː, Apasmara → ɐpˈʌsmɑːɹə.
PICTURE (compare your frames with BlueThroat frames before rendering)
- One hero, big and central (scale 0.8 to 0.95 in medium shots), 2 or 3 elements per frame, saturated colours against night indigo.
- No empty floor: fill the bottom of frame (razai, foreground objects). No grey "dim" overlays: light with a key light (phone cyan, diya warm) plus a Vignette.
- A different shot every scene (push, wide then insert, extreme close-up, memory cutaway). Every character fully in frame, Nandi too.
- Hook text fully readable at frame 0; frame 0 is the most striking image.
- Every reel: Nandi cameo, hidden Kirtimukha face (KFace at 20%), "That is sadhana." and "Kailasa. On Google Play."
- QA a contact sheet of every scene before rendering and the full video after; loudness -14 LUFS.

## Reference code
- Family: src/videos/katha/TwoAm.tsx (Kabir, his room, Razai, SleepyNandi, Dadi, temple memory, Vignette, Feed).
- Mythic: BlueThroat.tsx, Kannappa.tsx, ElephantHide.tsx (on-model dancing Shiva), NandiFaces.tsx, Chandesha.tsx, Upamanyu.tsx, Pushpadanta.tsx.
- Cast: src/videos/cast/ (rig.tsx Fig; cast.tsx CAST, Sv, Nataraja, Dwarf, Ganesha, Kartikeya...; beasts.tsx Nandi, Peacock...).
- J's standing rules and history: hero/factory_log.md. Never mention Ludhiana publicly; original characters only; calm American narrator; J posts himself.
