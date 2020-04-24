import { Module, ModuleOptions } from '@pnotify/core';

export as namespace PNotifyCountdown;

declare abstract class ModuleProperties implements ModuleOptions {
  /**
   * Where the countdown bar should anchor. One of 'top', 'bottom', 'left', or
   * 'right'.
   *
   * @default 'bottom'
   */
  anchor: 'top' | 'bottom' | 'left' | 'right';
  /**
   * Whether the countdown shrinks the other way.
   *
   * @default false
   */
  reverse: boolean;
}

export type Options = Partial<ModuleProperties>;

export default abstract class Countdown extends ModuleProperties
  implements Module {}
export const position: string;
export const defaults: ModuleProperties;
