# BRIEF FOR FABLE: The Kailasa Universe Book

## J's ask (verbatim intent, 16 Nov 2026)
"Go to the deepest point. Make Shiva a cult-following niche. Keep the same design as the Kirtimukha reel. Make ALL the characters, not a single one left. Make the Book. Don't cheap out on ANYTHING."

## What to deliver
1. **Cast library**: `c3d/src/videos/cast/` — every character in 02_cast_research.md as SVG React components in the locked style (01_style_lock.md). Reuse/upgrade existing ones (kit.tsx, katha/*.tsx, film/Film.tsx) instead of redrawing them from scratch; keep them on-model.
   - Each character: origin convention documented, mood/expression params (at least neutral, happy, angry/fierce, sad, surprised where it fits), `t` for idle motion.
   - Shiva: a proper rig (seated, standing, walking, dancing) so every form in section B is a costume/pose of the same Shiva.
   - Parvati/Sati/Durga/Kali/Annapurna share one face family.
   - Nandi: SVG version that matches the app mascot (k/www/nandi/*.webp) so reels and the app feel like one world.
2. **Character sheets**: a `CastSheet` Remotion composition (or stills script) that renders each character large with name + 2-3 expressions; PNGs to `hero/book/sheets/`. Critique every sheet; redraw anything cheap.
3. **The Book**: publish as an artifact (visual book): cover, the world (Kailash, tone, rules), style lock, then one page per character (art, who they are, look, signature colour/prop, voice, stories they appear in, reel hooks), families/relationship map, and the story slate.
4. **Cult-following system** inside the Book: recurring narrator/mascot rules (Nandi as the warm recurring guide?), signature opening/closing ritual lines, recurring visual motifs, lore threads that pay off across reels, community rituals (comment words), series names, posting cadence, and a slate of 30+ stories ranked by viral potential (Kannappa, Shiva's wedding procession, Ganesha's head, Kamadeva burned, Neelakantha, Ardhanarishvara/Bhringi, Andhaka, Tripura, Bhairava & Brahma's head, Gajasura, Chandesha, Annapurna, Kirata vs Arjuna, Upamanyu, Chandra/Somnath, Ganga's descent, Nataraja, Dakshinamurti, Kali on Shiva, Tarakasura & Kartikeya's birth, the race around the world, Kubera's feast, Shukracharya swallowed, Pushpadanta, Ravana lifting Kailash (done), Markandeya (done), Bhasmasura (done), Pillar (done), Sati (done), Kirtimukha (done)).

## J's rules (never break)
- Storybook look of the Kirtimukha reel; no realistic 3D; no gold border; no "katha"/episode numbers on screen.
- Original drawings only; no copyrighted characters or celebrity likenesses. Never mention Ludhiana publicly ("India").
- Narrator: calm American storyteller (see style lock). CTA "Kailasa. On Google Play."
- Respectful: scripture-accurate, devotional tone even in comedy (Ganas, Ganesha) — never mock the deities.
- Never contact/interact with @kailasa.shiva. Push to git only when J says "push".

## Workflow (J's plan)
Fable designs (characters, Book, story slate, camera language). Opus later builds reels from the Book and delegates mechanical work (VO runs, renders, QA) to Sonnet/Haiku helpers.

## Tools ready
- `c3d/kstills.sh <CompId> <frames>` -> contact sheet in scratchpad qa
- Remotion project `c3d/` (Root.tsx registers compositions)
- Reference frames: `book/ref/*.jpg`; Nandi mascot: `/home/claude/k/www/nandi/`
- Machine: 2 CPUs; renders in background with long timeout.
