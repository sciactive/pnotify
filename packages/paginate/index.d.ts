import { Module, ModuleOptions, Notice } from '@pnotify/core';

export as namespace PNotifyPaginate;

declare abstract class ModuleProperties implements ModuleOptions {
  /**
   * Show next and previous buttons.
   *
   * @default true
   */
  buttons: boolean;
  /**
   * Show the stack notice count.
   *
   * @default true
   */
  count: boolean;
  /**
   * Immediately transition to the next/previous notice (without animations).
   *
   * @default true
   */
  immediateTransition: boolean;
  /**
   * After transitioning, set the closed notice to "waiting" state.
   *
   * @default true
   */
  waiting: boolean;
  /**
   * Various texts. Allows for internationalization.
   *
   * @default {previous: 'Previous', next: 'Next', of: 'of'}
   */
  labels: {
    previous: string;
    next: string;
    of: string;
  };
}

export type Options = Partial<ModuleProperties>;

export default abstract class Paginate extends ModuleProperties
  implements Module {}
export const position: string;
export const defaults: ModuleProperties;
