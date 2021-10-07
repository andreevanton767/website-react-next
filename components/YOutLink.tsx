import React, { useRef } from 'react';
import { AriaLinkOptions, useLink } from '@react-aria/link';

interface Props extends AriaLinkOptions {
  className?: string;
  href: string;
}

const YOutLink: React.FC<Props> = ({ href, className, ...props }) => {
  const ref = useRef<HTMLElement | null>(null);
  const { linkProps } = useLink(props, ref);

  return (
    <a
      {...linkProps}
      rel="noopener noreferrer"
      target="_blank"
      className={className}
      href={href}
    >
      {props.children}
    </a>
  );
};

export default YOutLink;
