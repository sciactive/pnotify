import {Module, ModuleOptions} from '@pnotify/core';
import * as ModuleExport from './';

export as namespace PNotifyGlyphicon;

declare abstract class ModuleProperties implements ModuleOptions {}

export type Options = Partial<ModuleProperties>;

export default abstract class Glyphicon extends ModuleProperties
  implements Module {}
export const position: string;
export const defaults: ModuleProperties;

export type Entry = [typeof ModuleExport, Options];
