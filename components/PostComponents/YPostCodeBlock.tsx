import { highlightBlock } from 'highlight.js';

import { ContentEntryWithContent } from '@/types/blogPost';
import { useCallback } from 'react';

const YPostCodeBlock: React.FC<ContentEntryWithContent> = ({
  content,
  attrs,
}) => {
  const highlightCode = useCallback(
    (node: HTMLElement | null) => (node ? highlightBlock(node) : {}),
    []
  );

  return (
    <div className="px-4 md:px-0">
      <pre className="px-7 py-6 bg-black rounded-lg overflow-hidden">
        <code
          style={{ background: 'black' }}
          className={[attrs?.class || '', 'scroll-x-container'].join(' ')}
          ref={highlightCode}
        >
          {content.reduce(
            (acc, curr, index) =>
              [acc, index != 0 ? ` ${curr.text}` : curr.text].join(''),
            ''
          )}
        </code>
      </pre>
    </div>
  );
};

export default YPostCodeBlock;
