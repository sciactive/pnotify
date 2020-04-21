import {Module, ModuleOptions} from '@pnotify/core';

export as namespace PNotifyGlyphicon;

declare abstract class ModuleProperties implements ModuleOptions {}

export type Options = Partial<ModuleProperties>;

export default abstract class Glyphicon extends ModuleProperties
  implements Module {}
export const position: string;
export const defaults: ModuleProperties;
