import {Module, ModuleOptions} from '@pnotify/core';

export as namespace PNotifyReference;

declare abstract class ModuleProperties implements ModuleOptions {
  /**
   * Various texts. Allows for internationalization.
   *
   * @default {text: 'Spin Around'}
   */
  labels: {
    text: string;
  };
}

export type Options = Partial<ModuleProperties>;

export default abstract class Reference extends ModuleProperties
  implements Module {}
export const position: string;
export const defaults: ModuleProperties;
