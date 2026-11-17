#!/usr/bin/env python3
"""mkvo.py <scripts.md> <id>  ->  katha_scripts/<id>.json
Turns one script from hero/book/scripts/*.md into the JSON vo_film.py reads, using the storyteller pattern:
first phrase of a line brighter and quicker, last phrase slower and lower, a longer pause where a thought ends."""
import re, sys, json
md, sid = sys.argv[1], sys.argv[2]
txt = open(md, encoding='utf-8').read()
blocks = re.split(r'^### ', txt, flags=re.M)[1:]
blk = next((b for b in blocks if re.match(r'\S+ · ' + re.escape(sid) + r' ·', b)), None)
if not blk: sys.exit(f'no script with id {sid} in {md}')
title = blk.split('\n')[0]
hook = re.search(r'^HOOK TEXT: (.+)$', blk, re.M).group(1).strip()
rows = re.findall(r'^(\d+) ([nsdf]) \| (.+)$', blk, re.M)
lines = []
for num, who, rest in rows:
    text = rest.split(' | ')[0].strip()
    parts = [p.strip() for p in text.split(' / ') if p.strip()]
    segs = []
    for i, p in enumerate(parts):
        tts = p.replace('"', '').replace('“', '').replace('”', '')
        first, last, only = i == 0, i == len(parts) - 1, len(parts) == 1
        if who == 'n':
            if 'Kailasa. On Google Play' in p: sp, gain, pitch, pause = .92, 1, 0, .6
            elif 'That is sadhana' in p and only: sp, gain, pitch, pause = .86, 1, -.5, .7
            elif int(num) == 0 and first: sp, gain, pitch, pause = .95, 1, .5, (.35 if only else .25)
            elif only: sp, gain, pitch, pause = .9, 1, 0, .6
            elif first: sp, gain, pitch, pause = .93, 1, .5, .3
            elif last: sp, gain, pitch, pause = .86, .95, -.5, .65
            else: sp, gain, pitch, pause = .9, 1, 0, .32
        elif who == 's': sp, gain, pitch, pause = .8, 1, 0, (.8 if last else .35)
        elif who == 'f': sp, gain, pitch, pause = .88, 1, 0, (.7 if last else .3)
        else: sp, gain, pitch, pause = .85, 1, 0, (.7 if last else .3)
        segs.append([tts, p if tts != p else None, sp, gain, pitch, pause])
    lines.append([who, segs])
n = len(lines)
out = {"key": 62, "minor": True, "json": f"src/videos/katha/{sid}.json", "wav": f"public/katha/{sid}.wav",
       "bell": [0], "flute": [[max(0, n - 3), 0.2]], "fix": {"lˈɪŋɡæm": "lˈɪŋɡəm"}, "hook": hook, "title": title, "lines": lines}
json.dump(out, open(f'katha_scripts/{sid}.json', 'w'), ensure_ascii=False, indent=0)
words = sum(len(s[0].split()) for _, segs in lines for s in segs)
print(f'{sid}: {n} lines, {words} words, about {words / 2.35 / 1.12 + 3:.0f} s after speed-up; hook: {hook}')
