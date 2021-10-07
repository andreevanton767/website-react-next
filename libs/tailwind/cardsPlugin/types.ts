/**
 *
 * This is a type file to avoid circular dependencies
 */
import { CSSProperties } from 'react';

export interface Variant {
  base: string;
  shadow: string;
}

export type DepthTuple = [string | number, number];
export type ColorTuple = [string | number, string];
export type TailwindComponents = Record<string, CSSProperties>;

export interface TailwindOptionsPartial {
  e?: (str: string) => string;
  addComponents?: (components: TailwindComponents) => any;
  theme?: <
    T extends
      | 'cards.variants'
      | 'cards.skew'
      | 'cards.background'
      | 'cards.depth'
      | 'cards.transformMatrix'
  >(
    query: T
  ) => T extends 'cards.skew'
    ? number | undefined
    : T extends 'cards.background' | 'cards.transformMatrix'
    ? string | undefined
    : T extends 'cards.depth'
    ? DepthTuple | undefined
    : Record<string, Variant> | undefined;
}
