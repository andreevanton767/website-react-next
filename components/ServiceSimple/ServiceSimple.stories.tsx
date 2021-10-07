import ServiceSimple from './ServiceSimple';

export default {
  title: 'Service: Simple Section',
  components: ServiceSimple,
};

const props = {
  heading: "what it's all about",
  description:
    "It's about connection with the customer while making things convenient and friendly for them. You do all this to encourage a customer to take action and come back again",
};

export const Default = (): JSX.Element => <ServiceSimple {...props} />;
