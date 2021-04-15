import { Module, ModuleOptions } from '@pnotify/core';

export as namespace PNotifyBootstrap4;

declare abstract class ModuleProperties implements ModuleOptions {}

export type Options = Partial<ModuleProperties>;

export default abstract class Bootstrap4 extends ModuleProperties
  implements Module {}
export const position: string;
export const defaults: ModuleProperties;
