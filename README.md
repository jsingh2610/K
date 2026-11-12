# Kailasa backup (12 Nov 2026)

Rebuild each zip by joining its parts, then unzip.

Windows (Command Prompt, inside the parts folder):
    copy /b Kailasa_reels.zip.part* Kailasa_reels.zip
    copy /b Kailasa_source.zip.part* Kailasa_source.zip
    copy /b Kailasa_store_and_carousel.zip.part* Kailasa_store_and_carousel.zip

Mac/Linux:
    cat Kailasa_reels.zip.part* > Kailasa_reels.zip   (same for the others)

- Kailasa_reels.zip: brand film, teaser, storybook reels, S14-S17
- Kailasa_store_and_carousel.zip: Play Store feature graphic + 8 screenshots, 6 carousel slides
- Kailasa_source.zip: reel pipeline + Play Store builder + restore guide (README_restore.txt)
