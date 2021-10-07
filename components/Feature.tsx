import SbEditable, { SbEditableContent } from 'storyblok-react';

const Feature = ({ blok }: { blok: SbEditableContent }): JSX.Element => {
  return (
    <SbEditable content={blok}>
      <div className="text-center">
        <h2 className="text-xl font-medium">{blok.name_desktop}</h2>
      </div>
    </SbEditable>
  );
};

export default Feature;
