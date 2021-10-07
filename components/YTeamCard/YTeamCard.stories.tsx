import { useWindowWidth } from '@react-hook/window-size';

import { BreakPoint, ScreenSize } from '@/enums/screenSize';

import YTeamCard from './YTeamCard';

export default {
  title: 'Team Card',
  component: YTeamCard,
};

const props = {
  name: 'Salvador Dali',
  role: 'Graphic designer',
  text:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras scelerisque porttitor sapien, sit amet commodo metus vehicula id. Sed dapibus, ante quis lobortis vulputate',
  image: {
    filename:
      'https://a.storyblok.com/f/98632/220x220/b558395c03/team-member-2.jpg',
  },
};

export const Default = (): JSX.Element => {
  const screenSize =
    useWindowWidth() < BreakPoint.MD ? ScreenSize.SM : ScreenSize.MD;
  return (
    <div
      style={{
        height: screenSize == ScreenSize.SM ? 330 : 350,
        width: screenSize == ScreenSize.SM ? 330 : 360,
      }}
    >
      <YTeamCard className="w-full h-full" {...props} />
    </div>
  );
};
