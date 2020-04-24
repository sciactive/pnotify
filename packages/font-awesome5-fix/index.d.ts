import { Module, ModuleOptions } from '@pnotify/core';

export as namespace PNotifyFontAwesome5Fix;

declare abstract class ModuleProperties implements ModuleOptions {}

export type Options = Partial<ModuleProperties>;

export default abstract class FontAwesome5Fix extends ModuleProperties
  implements Module {}
export const position: string;
export const defaults: ModuleProperties;
