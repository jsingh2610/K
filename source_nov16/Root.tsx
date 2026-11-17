import React from 'react';
import {Composition} from 'remotion';
import {ArjunShort, ARJUN_FRAMES} from './videos/arjun/Ganga';
import {Duo, DUO_FRAMES} from './videos/duo/Duo';
import {Kirti, KIRTI_FRAMES} from './videos/kirti/Kirti';
import {Liminal, LIMINAL_FRAMES} from './videos/liminal/Liminal';
import {Markandeya, MARKANDEYA_FRAMES} from './videos/katha/Markandeya';
const K2: React.FC = () => <Markandeya audio />;
import {RavanaEp, RAVANA_FRAMES} from './videos/katha/Ravana';
const K3: React.FC = () => <RavanaEp audio />;
import {PillarEp, PILLAR_FRAMES} from './videos/katha/Pillar';
const K4: React.FC = () => <PillarEp audio />;
import {BhasmaEp, BHASMA_FRAMES} from './videos/katha/Bhasma';
const K5: React.FC = () => <BhasmaEp audio />;
import {SatiEp, SATI_FRAMES} from './videos/katha/Sati';
const K6: React.FC = () => <SatiEp audio />;
import {Kannappa, KANNAPPA_FRAMES} from './videos/katha/Kannappa';
const KNA: React.FC = () => <Kannappa audio />;
import {BlueThroat, BLUETHROAT_FRAMES} from './videos/katha/BlueThroat';
const BTH: React.FC = () => <BlueThroat audio />;
import {CastSheet, SHEET_FRAMES} from './videos/cast/Sheet';
import {Carousel} from './videos/film/Film';
import {Film, FILM_FRAMES} from './videos/film/Film';
const FA: React.FC = () => <Film audio />;
const LA: React.FC = () => <Liminal audio />;
const KA: React.FC = () => <Kirti audio />;
const DA: React.FC = () => <Duo audio />;
const A: React.FC = () => <ArjunShort audio />;
export const Root: React.FC = () => <>
  <Composition id="Arjun" component={A} durationInFrames={ARJUN_FRAMES} fps={30} width={1080} height={1920} />
  <Composition id="ArjunP" component={ArjunShort} durationInFrames={ARJUN_FRAMES} fps={30} width={1080} height={1920} />
  <Composition id="Duo" component={DA} durationInFrames={DUO_FRAMES} fps={30} width={1080} height={1920} />
  <Composition id="Liminal" component={LA} durationInFrames={LIMINAL_FRAMES} fps={30} width={1080} height={1920} />
  <Composition id="Markandeya" component={K2} durationInFrames={MARKANDEYA_FRAMES} fps={30} width={1080} height={1920} />
  <Composition id="RavanaEp" component={K3} durationInFrames={RAVANA_FRAMES} fps={30} width={1080} height={1920} />
  <Composition id="PillarEp" component={K4} durationInFrames={PILLAR_FRAMES} fps={30} width={1080} height={1920} />
  <Composition id="BhasmaEp" component={K5} durationInFrames={BHASMA_FRAMES} fps={30} width={1080} height={1920} />
  <Composition id="SatiEp" component={K6} durationInFrames={SATI_FRAMES} fps={30} width={1080} height={1920} />
  <Composition id="Film" component={FA} durationInFrames={FILM_FRAMES} fps={30} width={1080} height={1920} />
  <Composition id="Car" component={Carousel} durationInFrames={6} fps={30} width={1080} height={1350} />
  <Composition id="CastSheet" component={CastSheet} durationInFrames={SHEET_FRAMES} fps={30} width={1080} height={1350} />
  <Composition id="BlueThroat" component={BTH} durationInFrames={BLUETHROAT_FRAMES} fps={30} width={1080} height={1920} />
  <Composition id="Kannappa" component={KNA} durationInFrames={KANNAPPA_FRAMES} fps={30} width={1080} height={1920} />
</>;
