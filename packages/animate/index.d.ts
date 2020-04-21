import {Module, ModuleOptions} from '@pnotify/core';

export as namespace PNotifyAnimate;

declare abstract class ModuleProperties implements ModuleOptions {
  /**
   * The class to use to animate the notice in. If only one of these is set, it
   * will be used for both.
   *
   * @default null
   */
  inClass: string | null;
  /**
   * The class to use to animate the notice out. If only one of these is set, it
   * will be used for both.
   *
   * @default null
   */
  outClass: string | null;
}

export type Options = Partial<ModuleProperties>;

export default abstract class Animate extends ModuleProperties
  implements Module {}
export const position: string;
export const defaults: ModuleProperties;
