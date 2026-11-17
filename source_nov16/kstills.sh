#!/bin/bash
# kstills.sh <CompId> <frames,comma> -> scratchpad/qa/<CompId>.jpg
Q=/tmp/claude-0/-home-claude/80797849-02a3-55cc-87b0-10377492ce41/scratchpad/qa
rm -rf /tmp/ks_$1; mkdir -p /tmp/ks_$1
node stills.mjs $1 /tmp/ks_$1/f $2 0.5 2>&1 | grep -i -m4 "error\|cannot\|undefined"
i=0; for n in ${2//,/ }; do mv /tmp/ks_$1/f$n.jpg /tmp/ks_$1/$(printf %02d $i).jpg 2>/dev/null; i=$((i+1)); done
ffmpeg -y -loglevel error -pattern_type glob -i "/tmp/ks_$1/*.jpg" -vf "scale=300:534,tile=7x2" -frames:v 1 $Q/$1.jpg && echo sheet ok
