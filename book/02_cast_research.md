# Kailasa Universe: Full Cast Research (for the designer)

Status key: EXISTS = already drawn in code (file), NEW = to design. Iconography from Shiva Purana / Linga / Skanda / Matsya / Vamana Puranas + standard temple iconography.
Rule: every character must be readable as a silhouette and own ONE signature colour + ONE signature prop.

## A. THE FAMILY OF KAILASH
| Character | Iconography (must-haves) | Signature | Key stories | Status |
|---|---|---|---|---|
| Shiva (Mahayogi, default) | blue skin, jata bun with crescent moon + Ganga stream, third eye (vertical red line / opens to fire), 3 ash stripes, Vasuki at neck, rudraksha mala, tiger-skin cloth, trishul with damaru tied, seated on tiger skin | blue + crescent | all | EXISTS kit.tsx `Shiva`, `ShivaHead` (seated only; needs standing, walking, dancing, angry, laughing poses) |
| Parvati (Uma, Gauri) | fair/golden skin, red sari with gold border, dark bun with gold ornament, kumkum bindi, lotus in hand; mount lion | red + lotus | Tapas for Shiva, Ganesha's birth, Ardhanarishvara, covers Shiva's eyes (Andhaka), Annapurna | EXISTS kit `Parvati` (bust only, simple: needs full body, expressions, tapas look with bark/deer-skin, warrior forms) |
| Sati (Dakshayani) | same face family as Parvati but younger, saffron/pink sari, simpler jewellery | saffron | Daksha yagna, self-immolation | EXISTS Sati.tsx `SatiStand` |
| Ganesha | elephant head, one broken tusk (wrote Mahabharata), pot belly, snake belt, modak in hand, axe + noose, red/orange dhoti, mouse Mushika | broken tusk + modak | head replaced (guarding Parvati's door), race around the world (circles parents), writes Mahabharata, Kubera's feast | NEW |
| Kartikeya (Skanda, Murugan) | youthful warrior, six heads (Shanmukha) optional, vel spear, peacock Paravani, rooster flag | vel + peacock | born to kill Tarakasura, raised by Krittikas (six mothers), race around the world (flies the globe), Palani fruit story | NEW |
| Ashok Sundari (folk, Padma Purana) | girl, daughter of Shiva-Parvati, born from wishing tree (Kalpavriksha) | flower crown | Born to cure Parvati's loneliness | NEW (minor, optional) |
| Nandi | white bull, hump, gold bell, rudraksha + saffron cloth, sits facing Shiva | white + bell | gatekeeper, curses Ravana (monkeys), whisper in Nandi's ear | APP MASCOT exists as images (k/www/nandi/*.webp, 8 moods) -> needs SVG storybook version matching app mascot |
| Vasuki | king serpent around Shiva's neck, green, hood | green coil | Samudra Manthan rope | EXISTS as neck snake; NEW full form |
| Ganga | river goddess, white/blue sari, water hair, rides Makara (crocodile-dragon) | water hair | Descent caught in Shiva's jata (Bhagiratha) | NEW |
| Chandra (Moon) | pale glowing young deva, crescent; cursed by Daksha to wane, saved by Shiva | crescent | Somnath, why moon on Shiva's head | NEW |

## B. SHIVA'S FORMS (each = costume/pose variant of the Shiva rig)
| Form | Must-haves | Story hook |
|---|---|---|
| Nataraja | four arms: damaru (upper right), fire (upper left), abhaya (lower right), gaja-hasta pointing at raised foot; right foot on Apasmara; ring of fire (prabha); flying jata | Cosmic dance, Chidambaram, Patanjali & Vyaghrapada watching |
| Ardhanarishvara | split down the middle: right half Shiva (blue, jata, half trishul), left half Parvati (gold skin, red sari, earring, breast) | Bhringi refuses to circle Parvati |
| Neelakantha | blue throat glowing, Parvati's hand on his throat holding the poison | Samudra Manthan, Halahala |
| Bhairava / Kala Bhairava | dark blue/black, fierce fangs, skull garland, Brahma's fifth head (skull) stuck to his hand, dog companion, naked ascetic | Cuts Brahma's 5th head, wanders to Kashi where skull falls (Kapalamochana) |
| Rudra | storm god, bow and arrows, red-brown, roaring | Vedic origin |
| Mahakaal | black, time itself, Ujjain, ash aarti | the Bhasma Aarti |
| Dakshinamurti | young teacher under banyan, facing south, silent, old sages as students, right foot on Apasmara | teaches in silence |
| Pashupati | lord of animals, five faces (Panchamukha) | Nepal |
| Kirata (hunter) | tribal hunter with bow, Parvati as huntress | tests Arjuna, gives Pashupatastra |
| Bhikshatana | naked beggar with skull bowl, followed by enchanted rishi wives, deer | Daruka forest, humbles proud sages |
| Tripurantaka | archer on chariot (earth = chariot, sun & moon = wheels, Brahma charioteer, Vishnu = arrow, Meru = bow) | destroys three flying cities with one arrow |
| Gangadhara | catching Ganga on one lock of hair | Bhagiratha |
| Lingodbhava | figure inside a pillar of fire | Pillar of light (already a reel) |
| Harihara | half Shiva half Vishnu | unity |
| Hanuman (Rudra avatar) | monkey hero, mace; 11th Rudra | Rudra avatar lore |
| Virabhadra | born from Shiva's torn jata; fierce, three eyes, many arms (sword, shield, bow, trishul...), wooden sandals, Bhadrakali beside | destroys Daksha's yagna |
| Sharabha (optional, later texts) | bird-lion-man | calms Narasimha |

## C. GANAS & COMPANIONS
| Character | Look | Signature | Story | Status |
|---|---|---|---|---|
| Kirtimukha | lion-faced beast, horns, mane, ate his own body | the face | already a reel | EXISTS kit `KFace`, `Beast` |
| Bhringi | emaciated sage-devotee, three legs (tripod), sometimes bee form | three legs | refuses Parvati, Ardhanarishvara | NEW |
| Bhadrakali | fierce goddess born with Virabhadra | red eyes, sword | Daksha yagna | NEW |
| Ganas (crowd) | pot-bellied dwarfs, animal faces, funny, musicians with conch/drums | crowd colour | Shiva's wedding procession (comedy gold) | NEW (3-4 variants) |
| Chandesha (Chandikeshvara) | young cowherd devotee, axe | axe | cut his father's leg for kicking the lingam, made steward | NEW |
| Pushpadanta | gandharva musician | veena/flowers | stole flowers, composed Shiva Mahimna Stotram | NEW |
| Kubera | fat, rich yaksha king, money pot, mongoose spitting jewels | money pot | feast for Ganesha (Ganesha eats everything) | NEW |
| Apasmara | dwarf of ignorance under Nataraja's foot | crouched | Nataraja | NEW |

## D. GODDESS FORMS & IN-LAWS
| Character | Look | Story | Status |
|---|---|---|---|
| Durga | 8-10 arms, rides lion, weapons from gods | Mahishasura | NEW |
| Kali | black/blue skin, tongue out, skull garland, steps on Shiva | Raktabija; Shiva lies down to calm her | NEW |
| Annapurna | ladle + pot of rice | Shiva begs from her | NEW |
| Himavan & Mena | mountain king (snowy beard, crown) & queen | parents of Parvati, Mena faints at Shiva's wedding look | NEW |
| Daksha | proud king; later goat head | yagna | EXISTS Sati.tsx `Daksha` (human); NEW goat-headed version |

## E. DEVAS & SAGES
| Character | Look | Story | Status |
|---|---|---|---|
| Brahma | four heads, red/orange, beard, swan | pillar lie, 5th head | EXISTS Pillar.tsx `God who="brahma"`, `Swan` |
| Vishnu | blue-green, conch, chakra, crown, Garuda | pillar, Mohini, sends chakra (Sudarshan from Shiva) | EXISTS Pillar.tsx `God who="vishnu"`, `Boar` |
| Mohini | enchantress form of Vishnu | Bhasmasura (reel exists) | EXISTS Bhasma.tsx `Mohini` |
| Indra | crown, thunderbolt, white elephant Airavata | arrogance tested by Shiva as child/sadhu | NEW |
| Narada | wandering sage, veena, chanting "Narayana" | gossip-messenger in many stories (tells Parvati she'll marry Shiva) | NEW |
| Kamadeva & Rati | sugarcane bow, flower arrows, parrot; Rati beside | burned to ash by third eye | NEW |
| Surya | sun chariot, 7 horses | Shiva strikes Surya (story) | NEW (minor) |
| Yama | buffalo, noose, dark green skin | Markandeya (reel exists) | EXISTS Markandeya.tsx `Yama` |
| Markandeya | boy sage hugging lingam | reel exists | EXISTS Markandeya.tsx `Boy` |
| Saptarishis | seven sages, white beards | test Parvati, Bhikshatana | NEW (one sage rig, 7 variants) |
| Dadhichi | sage who gave his bones (vajra) | Shiva devotee | NEW |
| Bhagiratha | king doing tapas | brings Ganga | NEW |
| Kannappa | tribal hunter, gives his eyes to the lingam | ultimate bhakti | NEW (strong viral story) |
| Upamanyu | boy who asked for milk, got the ocean of milk | bhakti | NEW |
| Arjuna | archer prince, Gandiva | Kirata fight | NEW |
| Ravana | ten heads, devotee, Shiva Tandava Stotram | reel exists | EXISTS Ravana.tsx |
| Shukracharya | one-eyed guru of asuras | swallowed by Shiva, Mritasanjivani | NEW |
| Patanjali & Vyaghrapada | serpent-bodied sage; tiger-footed sage | witnesses of Nataraja's dance | NEW |
| Bhrigu | sage who curses | curse of the lingam form | NEW (minor) |
| The Seeker / Devotee | viewer avatar, hooded cream shawl | brand film | EXISTS Film.tsx `Seeker`, kit `Devotee` |
| The old Sage | rishi with mala | brand film | EXISTS Film.tsx `Sage` |

## F. ASURAS & ANTAGONISTS
| Character | Look | Story | Status |
|---|---|---|---|
| Jalandhara | asura king born from Shiva's anger thrown into ocean | Kirtimukha cause; Vrinda | NEW (only messenger shown so far) |
| Rahu | the messenger in Kirtimukha | EXISTS kit `Messenger` |
| Bhasmasura | ash-hand demon | EXISTS Bhasma.tsx `Demon` |
| Andhaka | blind demon, born from Parvati's sweat; 1000 eyes/arms; impaled on trishul, becomes gana (Bhringi in Vamana Purana) | NEW |
| Tarakasura | demon only Shiva's son can kill | NEW |
| Tripurasura (Tarakaksha, Kamalaksha, Vidyunmali) | three brothers in three flying cities (gold, silver, iron) | NEW |
| Gajasura | elephant demon, Shiva wears his skin | NEW |
| Apasmara | (see C) | |
| Halahala | the poison as a living dark cloud | NEW (effect character) |
| Mahishasura, Raktabija | buffalo demon; demon whose blood spawns clones | NEW (Durga/Kali stories) |
| Shankhachuda / Vrinda | asura king & his devoted wife | NEW (minor) |

## G. CREATURES & MOUNTS
Mushika (mouse), Paravani (peacock), Simha (Parvati's lion), Makara (Ganga), Airavata, Garuda, Bhairava's dog, deer (Shiva's hand in some forms), cobras, the tiger (skin), Kamadhenu (optional), Hamsa (EXISTS), Varaha (EXISTS), Rudraksha tree, banyan.

## Sources checked
- Bhringi: https://en.wikipedia.org/wiki/Bhringi (Shiva Purana, Tamil Sthala Puranas; third leg)
- Andhaka: https://en.wikipedia.org/wiki/Andhaka (Shiva/Linga/Matsya/Vamana Puranas)
- Virabhadra: https://en.wikipedia.org/wiki/Virabhadra (from Shiva's jata; many arms; Bhadrakali)
