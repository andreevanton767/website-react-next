import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { FontLineHeight, FontSize, FontWeight } from '@/enums/font';
import { SearchButtonSize, Service } from '@/enums/components';
import { Order } from '@/enums/search';

import YHeading from '@/components/YHeading';
import YText from '@/components/YText';
import YSearchField from '@/components/YSearchField';
import SelectElement from './SelectElement';

import Dots from '@/assets/inline/dots.svg';

import { yGetSearchQuery } from '@/libs/utils/yGetSearchQuery';

import useTranslations from '@/hooks/useTranslations';

interface Tag {
  value: string;
  label: string;
}

export interface Props {
  searchLabel: string;
  placeholder?: string;
  filterLabel: string;
  categoryLabel: string;
  tagsLabel: string;
  sortByLabel: string;
  dateLabel: string;
  tags: Tag[];
}

enum OptionText {
  Button = 'button',
  Title = 'title',
}

const SearchTop: React.FC<Props> = ({
  searchLabel,
  filterLabel,
  categoryLabel,
  tagsLabel,
  sortByLabel,
  dateLabel,
  placeholder,
  tags,
}) => {
  // get category values and i18n labels
  const { getCategoryStrings } = useTranslations();

  const categoryOptions = {
    label: categoryLabel,
    options: Object.values(Service).reduce(
      (acc, curr) => [
        ...acc,
        { value: curr, label: getCategoryStrings([curr])[0] },
      ],
      []
    ),
  };

  // sort options
  const sortOptions = {
    label: dateLabel,
    options: Object.values(Order).reduce(
      (acc, curr) => [...acc, { value: curr, label: curr }],
      []
    ),
  };

  // search control
  const [selectedCategories, setCategories] = useState<string[]>();
  const [selectedTags, setTags] = useState<string[]>();
  const [sort, setSort] = useState<string>();
  const [searchString, setSearchString] = useState<string>('');

  const selectCategories = (categories: string[]) => setCategories(categories);
  const selectTags = (tags: string[]) => setTags(tags);
  const selectSort = (sort: string) => setSort(sort);
  const handleSearch = (search: string) => setSearchString(search);

  const router = useRouter();

  useEffect(() => {
    if (searchString) {
      const queryString = yGetSearchQuery({
        selectedCategories,
        selectedTags,
        sort,
        searchString,
      });

      const newRoute = `/blog/search${queryString}`;
      router.push(newRoute, newRoute, { shallow: false });
    }
  }, [searchString]);

  const optionsBar = (
    <div className="relative flex items-center justify-between flex-wrap w-full h-6.5 md:px-6">
      <span className="flex items-center">
        <span className="mr-3 md:hidden">
          <Dots />
        </span>
        <YText {...getOptionButtonProps(OptionText.Title)}>
          {filterLabel}:
        </YText>
        <SelectElement {...categoryOptions} onChange={selectCategories} />
        <SelectElement
          {...{ label: tagsLabel, options: tags }}
          onChange={selectTags}
        />
      </span>
      <span className="flex items-center">
        <YText {...getOptionButtonProps(OptionText.Title)}>
          {sortByLabel}:
        </YText>
        <SelectElement {...sortOptions} singleOption onChange={selectSort} />
      </span>
    </div>
  );

  return (
    <section className="w-full bg-white px-5 pt-25 pb-10 lg:pt-42.5 lg:pb-25 select-none">
      <div className="w-full md:max-w-213 mx-auto">
        <label className="inline-block mb-5 md:mb-7.5 md:pl-6">
          <YHeading
            fontSize={FontSize.XL}
            lineHeight={FontLineHeight.Loose}
            className="text-blog-gray-50 text-left md:text-4xl md:leading-19"
          >
            {searchLabel}
          </YHeading>
        </label>
        <YSearchField
          aria-label="main search bar"
          onSubmit={handleSearch}
          label={searchLabel}
          placeholder={placeholder || searchLabel}
          className="h-11.5 mb-4 px-5 md:h-11.5 md:mb-7 md:px-6.5"
          searchButtonSize={SearchButtonSize.MD}
        />
        {optionsBar}
      </div>
    </section>
  );
};

// search option button
const getOptionButtonProps = (type: OptionText, additionalClasses = '') =>
  ({
    fontSize: FontSize.SM,
    fontWeight:
      type === OptionText.Button ? FontWeight.SemiBold : FontWeight.Bold,
    className: [
      'text-sm',
      'inline-block',
      'fill-current',
      'flex',
      'items-center',
      'mr-5',
      'select-none',
      'md:leading-6',

      type === OptionText.Button
        ? 'text-blue-400 cursor-pointer'
        : 'text-blog-gray-100 cursor-normal hidden md:inline-block',
      additionalClasses,
    ].join(' '),
  } as Parameters<typeof YText>[0]);

export default SearchTop;
