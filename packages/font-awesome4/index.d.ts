import {Module, ModuleOptions} from '@pnotify/core';
import * as ModuleExport from './';

export as namespace PNotifyFontAwesome4;

declare abstract class ModuleProperties implements ModuleOptions {}

export type Options = Partial<ModuleProperties>;

export default abstract class FontAwesome4 extends ModuleProperties
  implements Module {}
export const position: string;
export const defaults: ModuleProperties;

export type Entry = [typeof ModuleExport, Options];
