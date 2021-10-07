import {
  PostContentType,
  MarkType,
  SubscriptionStyle,
} from '@/enums/components';
import { BlogComponent } from '@/enums/componentWhitelist';

const section1 = {
  heading: 'In nunc proin pretium',
  content: [
    {
      type: PostContentType.Paragraph,
      content: [
        {
          text:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Felis, elit sit enim enim ut. Facilisis eu ac sagittis, et enim nunc fringilla id nunc. Et proin consequat sit ullamcorper enim. Luctus gravida ut aenean a sit non fermentum. Ut eget blandit nunc vel, non tellus imperdiet. Tempor sit donec pellentesque aenean dignissim faucibus. Neque ultricies quisque vulputate eu.',
          type: PostContentType.Text,
          marks: [
            {
              type: MarkType.Bold,
            },
          ],
        },
      ],
    },
    {
      type: PostContentType.Paragraph,
      content: [
        {
          text:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Felis, elit sit enim enim ut. Facilisis eu ac sagittis, et enim nunc fringilla id nunc. Et proin consequat sit ullamcorper enim. Luctus gravida ut aenean a sit non fermentum. Ut eget blandit nunc vel, non tellus imperdiet. Tempor sit donec pellentesque aenean dignissim faucibus. Neque ultricies quisque vulputate eu.',
          type: PostContentType.Text,
        },
      ],
    },
    {
      type: PostContentType.Paragraph,
      content: [
        {
          text: 'Lorem ipsum dolor sit ',
          type: PostContentType.Text,
        },
        {
          text: 'sudo npm',
          type: PostContentType.Text,
          marks: [
            {
              type: MarkType.Code,
            },
          ],
        },
        {
          text:
            ' amet, consectetur adipiscing elit. Felis, elit sit enim enim ut. Facilisis eu ac sagittis, et enim nunc fringilla id nunc. Et proin consequat sit ullamcorper enim. Luctus gravida ut aenean a sit non fermentum. Ut eget blandit nunc vel, non tellus imperdiet. Tempor sit donec pellentesque aenean dignissim faucibus. Neque ultricies quisque vulputate eu.',
          type: PostContentType.Text,
        },
      ],
    },
    // {
    //   type: PostContentType.CodeBlock,
    //   attrs: {
    //     class: 'language-bash',
    //   },
    //   content: [
    //     {
    //       text:
    //         '# Note: configuration will reset after system reload. \nsudo sysctl -w net.inet.ip.ttl=65  ',
    //       type: PostContentType.Text,
    //     },
    //   ],
    // },
  ],
};

const section2 = {
  heading: 'Nec eget viverra auctor',
  content: [
    {
      type: PostContentType.Paragraph,
      content: [
        {
          text:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae interdum non et ultrices vel rhoncus. Quis non  auctor  pulvinar volutpat diam, orci, id. Eget tellus imperdiet pretium ut consequat, amet tellus facilisis. Urna accumsan, viverra accumsan turpis aliquam consectetur donec blandit. Elementum convallis felis amet tortor, sed vulputate. Faucibus risus in platea ullamcorper volutpat cras vitae etiam quis. Vitae bibendum viverra suspendisse penatibus. Non, mauris sit quis nunc.',
          type: PostContentType.Text,
        },
      ],
    },
    {
      type: PostContentType.Paragraph,
      content: [
        {
          text:
            'Pellentesque sit venenatis tincidunt odio et at ipsum, pellentesque elementum. Orci, eu vel porttitor vulputate. Senectus elit nunc, ut condimentum vitae lectus. Enim, convallis mi congue hendrerit molestie dictum nulla bibendum. Eu massa dictum viverra vel.',
          type: PostContentType.Text,
        },
      ],
    },
    {
      type: PostContentType.Blok,
      attrs: {
        id: '2399cb79-8699-4b9f-8e56-0c5988290618',
        body: [
          {
            _uid: 'i-caf94f9f-f31b-4ed3-93f6-f0f115199e0b',
            type: SubscriptionStyle.BlogPost,
            title: 'Subscribe to our newsletter',
            component: BlogComponent.SubscribeSection,
            buttonText: 'Contact us',
            description:
              'Best personalization case studies and posts on ecommerce topic every week.',
            placeholder: 'Your email',
            _editable:
              '<!--#storyblok#{"name": "SubscribeSection", "space": "98632", "uid": "i-caf94f9f-f31b-4ed3-93f6-f0f115199e0b", "id": "52983575"}-->',
          },
        ],
      },
    },
  ],
};

const section3 = {
  heading: 'Nec eget viverra auctor 2',

  content: [
    {
      type: PostContentType.Paragraph,
      content: [
        {
          text:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Felis, elit sit enim enim ut. Facilisis eu ac sagittis, et enim nunc fringilla id nunc. Et proin consequat sit ullamcorper enim. Luctus gravida ut aenean a sit non fermentum. Ut eget blandit nunc vel, non tellus imperdiet. Tempor sit donec pellentesque aenean dignissim faucibus. Neque ultricies quisque vulputate eu.',
          type: PostContentType.Text,
        },
      ],
    },
    {
      type: PostContentType.Blok,
      attrs: {
        id: '57f35f9a-2f36-4431-8f1d-a43bddea6c55',
        body: [
          {
            _uid: 'i-3ef76a5f-4e06-4f65-85fc-07c3748c66ec',
            images: [
              {
                _uid: '24a51a50-7c58-4bbf-a1e1-ae52dabd5551',
                image: {
                  id: 2319928,
                  alt: '',
                  name: '',
                  focus: null,
                  title: '',
                  filename:
                    'https://a.storyblok.com/f/98632/1680x480/56c5f56505/dummy.jpg',
                  copyright: '',
                  fieldtype: 'asset',
                },
                caption: 'This is another caption',
                component: 'PostImage',
                _editable:
                  '<!--#storyblok#{"name": "PostImage", "space": "98632", "uid": "24a51a50-7c58-4bbf-a1e1-ae52dabd5551", "id": "52983575"}-->',
              },
              {
                _uid: 'f28a84d1-5d5c-4b1a-9461-ecf099463519',
                image: {
                  id: 2239938,
                  alt: 'a team of young people ',
                  name: '',
                  focus: null,
                  title: '',
                  filename:
                    'https://a.storyblok.com/f/98632/1680x1100/8f158c4185/about-cover.jpg',
                  copyright: '',
                  fieldtype: 'asset',
                },
                caption: 'This is a caption',
                component: 'PostImage',
                _editable:
                  '<!--#storyblok#{"name": "PostImage", "space": "98632", "uid": "f28a84d1-5d5c-4b1a-9461-ecf099463519", "id": "52983575"}-->',
              },
            ],
            component: 'PostImageCollection',
            _editable:
              '<!--#storyblok#{"name": "PostImageCollection", "space": "98632", "uid": "i-3ef76a5f-4e06-4f65-85fc-07c3748c66ec", "id": "52983575"}-->',
          },
        ],
      },
    },
  ],
};

export default {
  contentsLabel: 'Contents',
  postSections: [section1, section2, section3],
};
