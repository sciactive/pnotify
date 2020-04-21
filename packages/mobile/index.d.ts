import {Module, ModuleOptions} from '@pnotify/core';

export as namespace PNotifyMobile;

declare abstract class ModuleProperties implements ModuleOptions {
  /**
   * Let the user swipe the notice away.
   *
   * @default true
   */
  swipeDismiss: boolean;
}

export type Options = Partial<ModuleProperties>;

export default abstract class Mobile extends ModuleProperties
  implements Module {}
export const position: string;
export const defaults: ModuleProperties;
