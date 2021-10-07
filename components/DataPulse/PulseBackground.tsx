import React from 'react';

import Pulse1 from '@/assets/pulse/pulse-1.svg';
import Pulse2 from '@/assets/pulse/pulse-2.svg';
import Pulse3 from '@/assets/pulse/pulse-3.svg';
import Pulse4 from '@/assets/pulse/pulse-4.svg';
import Pulse5 from '@/assets/pulse/pulse-5.svg';
import Pulse6 from '@/assets/pulse/pulse-6.svg';

const PulseBackground: React.FC = () => (
  <>
    <div className="absolute top-27 left-11">
      <Pulse1 />
    </div>
    <div className="absolute top-23 left-99.1">
      <Pulse2 />
    </div>
    <div className="absolute top-20 right-0">
      <Pulse3 />
    </div>
    <div className="absolute top-80 left-10">
      <Pulse4 />
    </div>
    <div className="absolute top-83.1 left-94.6">
      <Pulse5 />
    </div>
    <div className="absolute top-111.1 left-11">
      <Pulse1 />
    </div>
    <div className="absolute top-105 right-0">
      <Pulse3 />
    </div>
    <div className="absolute bottom-25 left-99.1">
      <Pulse6 />
    </div>
    <div className="absolute bottom-25 right-0">
      <Pulse3 />
    </div>
  </>
);

export default PulseBackground;
