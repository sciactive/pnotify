import { Module, ModuleOptions } from '@pnotify/core';

export as namespace PNotifyDesktop;

declare abstract class ModuleProperties implements ModuleOptions {
  /**
   * If desktop notifications are not supported or allowed, fall back to a
   * regular notice.
   *
   * @default true
   */
  fallback: boolean;
  /**
   * The URL of the icon to display. If false, no icon will show. If null, a
   * default icon will show.
   *
   * @default null
   */
  icon: false | string | null;
  /**
   * Using a tag lets you update an existing notice, or keep from duplicating
   * notices between tabs. If you leave tag null, one will be generated,
   * facilitating the `update` function.
   *
   * See: http://www.w3.org/TR/notifications/#tags-example
   *
   * @default null
   */
  tag: string | null;
  /**
   * Optionally display a different title for the desktop.
   *
   * @default null
   */
  title: string | null;
  /**
   * Optionally display different text for the desktop.
   *
   * @default null
   */
  text: string | null;
  /**
   * Any additional options to be passed to the Notification constructor.
   *
   * @default {}
   */
  options: Record<string, any>;
}

export type Options = Partial<ModuleProperties>;

export default abstract class Desktop extends ModuleProperties
  implements Module {}
export const position: string;
export const defaults: ModuleProperties;
