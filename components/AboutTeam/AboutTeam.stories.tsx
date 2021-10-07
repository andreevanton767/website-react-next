import AboutTeam from './AboutTeam';

export default {
  title: 'About: Team',
  component: AboutTeam,
};

const dali = {
  name: 'Salvador Dali',
  role: 'Graphic designer',
  text:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras scelerisque porttitor sapien, sit amet commodo metus vehicula id. Sed dapibus, ante quis lobortis vulputate',
  image: {
    filename:
      'https://a.storyblok.com/f/98632/220x220/b558395c03/team-member-2.jpg',
  },
};

const props = { title: 'our team', team: [dali, dali, dali, dali] };

export const Default = (): JSX.Element => <AboutTeam {...props} />;
