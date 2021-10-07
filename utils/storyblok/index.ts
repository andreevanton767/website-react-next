import { FormField } from '@/enums/form';
import { ScreenSize } from '@/enums/screenSize';
import { ServiceButton } from '@/enums/components';

import { PageItem, Blok } from '@/types/storyblok';
import { PostItem } from '@/types/blogPost';
import {
  FooterBlokProps,
  HeaderBlokProps,
  PostLayoutRes,
} from '@/types/layout';
import { CategorypageItem } from '@/types/categoryPage';
import { BloghomeItem } from '@/types/blog';
import { SearchpageItem } from '@/types/search';

import { NavItemInterface } from '@/components/YHeaderItem/YHeaderItem';
import { SubItemInterface } from '@/components/YHeaderSubItem/YHeaderSubItem';
import { FooterProps } from '@/components/Footer';

export function initEditor([story, setStory]: [
  (
    | PageItem
    | PostItem
    | PostLayoutRes['PostlayoutItem']
    | CategorypageItem
    | BloghomeItem
    | SearchpageItem
    | FooterBlokProps
    | HeaderBlokProps
  ),
  (story) => void
]): void {
  if (window?.storyblok) {
    window.storyblok.init();

    // reload on Next.js page on save or publish event in Storyblok Visual Editor
    window.storyblok.on(['change', 'published'], () => location.reload(true));
    // Update state.story on input in Visual Editor
    // this will alter the state and replaces the current story with a current raw story object and resolve relations
    window.storyblok.on(
      'input',
      (event: { story: { id: string; content: { _uid: string } } }) => {
        if (event.story.content._uid === story.content._uid) {
          event.story.content = window.storyblok.addComments(
            event.story.content,
            event.story.id
          );
          console.log('event story: ', event.story.content);
          window.storyblok.resolveRelations(
            event.story,
            [
              'page.header',
              'page.footer',
              'post.header',
              'post.footer',
              'post.authors',
              'post.tags',
              'post_layout.header',
              'post_layout.footer',
              'category_page.header',
              'category_page.footer',
              'category_page.featuredCategories',
              'blog_home.header',
              'blog_home.footer',
              'search_page.header',
              'search_page.footer',
            ],
            () => {
              setStory(event.story);
            }
          );
        }
      }
    );
  }
}

export const mapStoryblokProps = (props: Blok & any /**@TEMP */): Blok => {
  let newProps = { ...props };
  const propKeys = Object.keys(newProps);

  if (propKeys.includes('locales')) {
    newProps.locales = props.locales.data.Space.languageCodes;
  }

  if (propKeys.includes('buttonText') && !propKeys.includes('formButtonText')) {
    const {
      buttonText,
      buttonLink,
      buttonType,
      buttonPlaceholder,
      ...tempProps
    } = newProps;

    let additionalButtonProps =
      buttonType == ServiceButton.Input
        ? {
            type: buttonType,
            placeholder: buttonPlaceholder,
          }
        : {};

    newProps = {
      ...tempProps,
      buttonProps: {
        text: props.buttonText,
        link: props.buttonLink?.url || '',
        ...additionalButtonProps,
      },
    };
  }

  if (propKeys.includes('logoLink')) {
    const { logoIcon, logoLink, ...tempProps } = newProps;
    newProps = {
      ...tempProps,
      logo: {
        icon: props.logoIcon,
        link: props.logoLink.url || '',
      },
    };
  }

  if (propKeys.includes('partners')) {
    newProps.partners = props.partners.map(({ link, ...props }) => ({
      ...props,
      link: link.url,
    }));
  }

  if (propKeys.includes('nameLabel')) {
    const fields = Object.values(FormField).reduce(
      (acc, curr) => ((acc[curr] = processFormField(curr, props)), acc),
      {}
    );
    newProps.fields = fields;
  }

  if (propKeys.includes('articlesFrames')) {
    newProps.frames = [];
    newProps.frames[0] = processReviewsFrame(props);
    newProps.frames = [
      newProps.frames[0],
      ...props.articlesFrames.map((article) => processArticlesFrame(article)),
    ];
  }

  if (propKeys.includes('navItems')) {
    newProps.navItems = processNavItems(props.navItems);
  }

  if (propKeys.includes('linksFirst')) {
    newProps = processFooterProps(newProps);
  }

  if (propKeys.includes('services')) {
    newProps.services = props.services.map((service) => ({
      ...service,
      buttonLink: service.buttonLink.url,
    }));
  }

  if (propKeys.includes('cards')) {
    newProps.cards = props.cards.map(({ link, ...card }) => ({
      ...card,
      link: link ? link.url : '',
    }));
  }

  if (propKeys.includes('heroImageLG')) {
    const newHero = { ...props.heroImageLG };
    if (props.heroImageSM && props.heroImageSM.filename) {
      newHero.filename = props.heroImageSM.filename;
      newHero.srcSet = { [ScreenSize.LG]: props.heroImageLG.filename };
    }
    newProps.heroImage = newHero;
  }

  return newProps;
};

const processReviewsFrame = (props) => ({
  reviews: props.reviews,
  buttonSM: props.reviewsButtonSm,
  buttonMD: props.reviewsButtonMd,
});

const processArticlesFrame = (article) => ({
  articles: article.articles,
  buttonSM: article.buttonSm,
  buttonMD: article.buttonMd,
});

const processFormField = (field: FormField, props: any) => {
  return {
    label: props[`${field}Label`],
    placeholder: props[`${field}Placeholder`],
    errorMessage: props[`${field}ErrorMessage`],
  };
};

interface LinkObject {
  url: string;
}

const processNavItems = (
  navItems: Array<
    NavItemInterface & {
      link: LinkObject;
      subItems: Array<SubItemInterface & { link: LinkObject }>;
    }
  >
) =>
  navItems.map((navItem) => {
    const link = navItem.link.url;
    return navItem.subItems?.length
      ? {
          ...navItem,
          link,
          subItems: navItem.subItems.map((subItem) => ({
            ...subItem,
            link: (subItem.link as any).url,
          })),
        }
      : { link, text: navItem.text };
  });

const processFooterProps = ({
  linksFirst,
  linksSecond,
  socialMedia,
  contentHeading,
  contentDescription,
  street,
  postalCode,
  city,
  email,
  phoneLabel,
  phoneValue,
  ...props
}: FooterBlokProps['content']): FooterProps => ({
  ...props,
  links: {
    first: linksFirst.map(({ text, link }) => ({
      link: link.url || link.cachedUrl,
      text,
    })),
    second: linksSecond.map(({ text, link }) => ({
      link: link.url || link.cachedUrl,
      text,
    })),
  },
  content: {
    heading: contentHeading,
    description: contentDescription,
  },
  contactDetails: {
    street: street,
    postalCode: postalCode,
    city: city,
    email: email,
    phoneNumber: {
      label: phoneLabel,
      value: phoneValue,
    },
  },
  socialMedia: socialMedia.map(({ link, icon, name }) => ({
    icon,
    link: link.url || link.cachedUrl,
    name,
  })),
});
