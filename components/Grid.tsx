import DynamicComponent from './DynamicComponent';
import SbEditable, { SbEditableContent } from 'storyblok-react';

const Grid = ({ blok }: { blok: SbEditableContent }): JSX.Element => (
  <SbEditable content={blok}>
    <ul className="flex py-8 mb-6">
      {blok.columns.map((nestedBlok) => (
        <li key={nestedBlok._uid} className="flex-auto px-6">
          <DynamicComponent blok={nestedBlok} />
        </li>
      ))}
    </ul>
  </SbEditable>
);

export default Grid;
