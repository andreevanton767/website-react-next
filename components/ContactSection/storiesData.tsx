import { FormField } from '@/enums/form';

const title = 'Get in touch!';
const description = 'Contact us for a quote, help or to join the team.';

const onFormSubmit = (values: Record<string, string>) =>
  alert(JSON.stringify(values, null, 0));

const buttonText = 'Contact us';
const formButtonText = 'Submit';

const formTitle = 'Contact Us';

const fields = {
  [FormField.Name]: {
    label: 'Name',
    placeholder: 'Your Name',
    errorMessage: 'This field is required',
  },
  [FormField.Phone]: {
    label: 'Phone number',
    placeholder: 'Your phone number',
    errorMessage: 'please enter a valid phone number',
  },
  [FormField.Email]: {
    label: 'Email',
    placeholder: 'Your email',
    errorMessage: 'please enter a valid email',
  },
  [FormField.Comment]: {
    label: 'Comment (optional)',
    placeholder: 'Comment',
  },
};

const contactInfo = [
  {
    icon: 'contact/phone',
    info: '+06 40 30 17 05',
  },
  {
    icon: 'contact/map',
    info: 'Donjon 1, 1315 XH Almere',
  },
  {
    icon: 'contact/envelope',
    info: 'hello@yea.com',
  },
];

export const props = {
  title,
  description,
  onFormSubmit,
  buttonText,
  formButtonText,
  formTitle,
  fields,
  contactInfo,
};
