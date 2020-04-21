import {Module, ModuleOptions} from '@pnotify/core';

export as namespace PNotifyFontAwesome5;

declare abstract class ModuleProperties implements ModuleOptions {}

export type Options = Partial<ModuleProperties>;

export default abstract class FontAwesome5 extends ModuleProperties
  implements Module {}
export const position: string;
export const defaults: ModuleProperties;
