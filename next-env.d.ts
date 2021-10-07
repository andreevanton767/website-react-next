/// <reference types="next" />
/// <reference types="next/types/global" />

declare interface Window {
  analytics: any;
  storyblok: any;
}

declare module '*.svg' {
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const content: string;

  export { ReactComponent };
  export default content;
}
