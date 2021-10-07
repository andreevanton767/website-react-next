import React from 'react';

import { FontLineHeight, FontSize, FontWeight } from '@/enums/font';

import YTeamCard, { TeamMember } from '@/components/YTeamCard/YTeamCard';
import YHeading from '@/components/YHeading';

interface Props {
  title: string;
  team: TeamMember[];
}

const AboutTeam: React.FC<Props> = ({ title, team }) => {
  return (
    <section className="relative w-full overflow-hidden z-20">
      <div className="container relative md:mb-26 text-left">
        <YHeading
          fontSize={FontSize.XL}
          lineHeight={FontLineHeight.Relaxed}
          fontWeight={FontWeight.SemiBold}
          as="h1"
          className="text-blue-100 mb-7 w-36 md:text-3xl md:leading-11 lg:absolute lg:top-0 lg:left-0 lg:w-56.1"
        >
          {title}
        </YHeading>
        <div className="grid grid-cols-1 gap-5 max-w-xs mx-auto sm:max-w-none sm:grid-cols-2 sm:gap-x-5 md:gap-x-15 md:gap-y-13 lg:ml-80">
          {team.map((member, index) => (
            <YTeamCard
              key={`${member.name}-${index}`}
              className="w-full h-82.5 md:h-90"
              {...member}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutTeam;
