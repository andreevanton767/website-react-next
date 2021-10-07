import { MarkType, PostContentType } from '@/enums/components';
import { BlogComponent } from '@/enums/componentWhitelist';

export const paragraphBold = {
  type: PostContentType.Paragraph,
  content: [
    {
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Felis, elit sit enim enim ut. Facilisis eu ac sagittis, et enim nunc fringilla id nunc. Et proin consequat sit ullamcorper enim. Luctus gravida ut aenean a sit non fermentum. Ut eget blandit nunc vel, non tellus imperdiet. Tempor sit donec pellentesque aenean dignissim faucibus. Neque ultricies quisque vulputate eu.',
      type: PostContentType.Text,
      marks: [
        {
          type: 'bold',
        },
      ],
    },
  ],
};

export const paragraphPlain = {
  type: PostContentType.Paragraph,
  content: [
    {
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae interdum non et ultrices vel rhoncus. Quis non  auctor  pulvinar volutpat diam, orci, id. Eget tellus imperdiet pretium ut consequat, amet tellus facilisis. Urna accumsan, viverra accumsan turpis aliquam consectetur donec blandit. Elementum convallis felis amet tortor, sed vulputate. Faucibus risus in platea ullamcorper volutpat cras vitae etiam quis. Vitae bibendum viverra suspendisse penatibus. Non, mauris sit quis nunc.',
      type: PostContentType.Text,
    },
  ],
};

export const paragraphMixed = {
  content: [
    {
      text: 'Lorem ipsum ',
      type: PostContentType.Text,
    },
    {
      text: 'npm install',
      type: PostContentType.Text,
      marks: [
        {
          type: MarkType.Code,
        },
      ],
    },
    {
      text: ' dolor sit amet, ',
      type: PostContentType.Text,
    },
    {
      text: 'consectetur',
      type: PostContentType.Text,
      marks: [
        {
          type: MarkType.StrikeThrough,
        },
      ],
    },
    {
      text: ' ',
      type: PostContentType.Text,
    },
    {
      text: 'adipiscing elit',
      type: PostContentType.Text,
      marks: [
        {
          type: MarkType.Underline,
        },
      ],
    },
    {
      text: '. ',
      type: PostContentType.Text,
    },
    {
      text: 'Felis, elit sit enim enim ut.',
      type: PostContentType.Text,
      marks: [
        {
          type: MarkType.Italic,
        },
      ],
    },
    {
      text:
        ' Facilisis eu ac sagittis, et enim nunc fringilla id nunc. Et proin consequat sit ',
      type: PostContentType.Text,
    },
    {
      text: 'ullamcorper ',
      type: PostContentType.Text,
      marks: [
        {
          type: MarkType.Bold,
        },
        {
          type: MarkType.Italic,
        },
      ],
    },
    {
      text:
        'enim. Luctus gravida ut aenean a sit non fermentum. Ut eget blandit nunc vel, non tellus imperdiet. Tempor sit donec pellentesque aenean dignissim faucibus. Neque ultricies quisque vulputate eu.',
      type: PostContentType.Text,
    },
  ],
};

export const image = {
  component: BlogComponent.PostImage,
  image: {
    alt: '',
    filename: 'https://a.storyblok.com/f/98632/1680x480/56c5f56505/dummy.jpg',
    title: '',
  },
  caption:
    "Image caption lorem ipslum blah blahb al, the best caption of all time and further. Isn't it? Leave your comments below.",
};

export const imageCollection = {
  component: BlogComponent.PostImageCollection,
  images: [image, image, image],
};

export const video = {
  component: BlogComponent.PostVideo,
  url: 'https://vimeo.com/244309821',
  caption:
    "Image caption lorem ipslum blah blahb al, the best caption of all time and further. Isn't it? Leave your comments below.",
};

export const blockquote = {
  type: PostContentType.BlockQuote,
  content: [
    {
      type: 'heading',
      attrs: {
        level: 2,
      },
      content: [
        {
          text: 'blockquote subheading',
          type: PostContentType.Text,
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          text: '“Lorem ipsum ',
          type: PostContentType.Text,
        },
        {
          text: 'dolor',
          type: PostContentType.Text,
          marks: [
            {
              type: MarkType.Italic,
            },
          ],
        },
        {
          text: ' sit amet, consectetur adipiscing elit. ',
          type: PostContentType.Text,
        },
        {
          text: 'Ornare',
          type: PostContentType.Text,
          marks: [
            {
              type: MarkType.Bold,
            },
          ],
        },
        {
          text: ' in ',
          type: PostContentType.Text,
        },
        {
          text: 'nullam',
          type: PostContentType.Text,
          marks: [
            {
              type: MarkType.Code,
            },
          ],
        },
        {
          text: ' euismod tristique magna est leo”',
          type: PostContentType.Text,
        },
      ],
    },
    {
      type: PostContentType.Blok,
      attrs: {
        id: '7a9b1eb6-8dc4-4f19-9369-4c2fbf93bec3',
        body: [
          {
            _uid: 'i-a6a1f6a8-7aa8-4deb-940d-8b9bc5b4e7f5',
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
            caption:
              "Image caption lorem ipslum blah blahb al, the best caption of all time and further. Isn't it? Leave your comments below.",
            component: 'PostImage',
            _editable:
              '<!--#storyblok#{"name": "PostImage", "space": "98632", "uid": "i-a6a1f6a8-7aa8-4deb-940d-8b9bc5b4e7f5", "id": "30776633"}-->',
          },
        ],
      },
    },
    {
      type: PostContentType.Paragraph,
      content: [
        {
          text: '"Lorem ipsum lorem"',
          type: PostContentType.Text,
        },
      ],
    },
  ],
};

export const codeBlock = {
  type: PostContentType.CodeBlock,
  content: [
    {
      text:
        'import React from "react"\n\nconst getSum = (a: number, b: number) => a + b',
      type: PostContentType.Text,
    },
  ],
  attrs: {
    class: 'language-typescript',
  },
};

export const section = {
  heading: 'Nec eget viverra auctor',
  content: [
    paragraphBold,
    paragraphPlain,
    codeBlock,
    { type: PostContentType.Blok, attrs: { body: [imageCollection] } },
    paragraphPlain,
    { type: PostContentType.Blok, attrs: { body: [image] } },
    blockquote,
    { type: PostContentType.Blok, attrs: { body: [video] } },
    paragraphPlain,
  ],
};

const smallSection = {
  content: [paragraphBold, paragraphPlain, paragraphPlain, paragraphPlain],
};

export const multipleSections = [
  { ...smallSection, heading: 'Section 1' },
  { ...smallSection, heading: 'Section 2' },
  { ...smallSection, heading: 'Section 3' },
  { ...smallSection, heading: 'Section 4' },
  { ...smallSection, heading: 'Section 5' },
];
