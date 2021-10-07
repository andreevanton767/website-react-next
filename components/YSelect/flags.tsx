import { Language } from '@/enums/language';

import AT from '@/assets/icons/flags/at.svg';
import DE from '@/assets/icons/flags/de.svg';
import FR from '@/assets/icons/flags/fr.svg';
import IT from '@/assets/icons/flags/it.svg';
import PL from '@/assets/icons/flags/pl.svg';
import UK from '@/assets/icons/flags/uk.svg';
import BE from '@/assets/icons/flags/be.svg';
import ES from '@/assets/icons/flags/es.svg';
import IR from '@/assets/icons/flags/ie.svg';
import NL from '@/assets/icons/flags/nl.svg';
import SE from '@/assets/icons/flags/se.svg';

export default {
  [Language.AT]: <AT />,
  [Language.DE]: <DE />,
  [Language.FR]: <FR />,
  [Language.IT]: <IT />,
  [Language.PL]: <PL />,
  [Language.UK]: <UK />,
  [Language.BE]: <BE />,
  [Language.ES]: <ES />,
  [Language.IR]: <IR />,
  [Language.NL]: <NL />,
  [Language.SE]: <SE />,
} as Record<Language, JSX.Element>;
