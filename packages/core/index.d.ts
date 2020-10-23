import Stack, { StackProperties, StackOptions } from './Stack.js';

export as namespace PNotify;

declare abstract class NoticeProperties {
  /**
   * Type of the notice. 'notice', 'info', 'success', or 'error'.
   *
   * @default 'notice'
   */
  type: 'notice' | 'info' | 'success' | 'error';
  /**
   * The notice's title. Can be a string, an element, or `false` for no title.
   *
   * @default false
   */
  title: string | HTMLElement | false;
  /**
   * Whether to trust the title or escape its contents. (Not allow HTML.)
   *
   * @default false
   */
  titleTrusted: boolean;
  /**
   * The notice's text. Can be a string, an element, or `false` for no text.
   *
   * @default false
   */
  text: string | HTMLElement | false;
  /**
   * Whether to trust the text or escape its contents. (Not allow HTML.)
   *
   * @default false
   */
  textTrusted: boolean;
  /**
   * What styling classes to use. (Can be 'brighttheme', 'material', another
   * string provided by a module, or a styling object.)
   *
   * @default 'brighttheme'
   */
  styling: string | {};
  /**
   * What icons classes to use (Can be 'brighttheme', 'material', another string
   * provided by a module, or an icon object.)
   *
   * @default 'brighttheme'
   */
  icons: string | {};
  /**
   * Light or dark version of the theme, if supported by the styling. This
   * overrides the CSS media query when a preference is given. (Can be
   * 'no-preference', 'light', or 'dark'.)
   *
   * @default 'no-preference'
   */
  mode: 'no-preference' | 'light' | 'dark';
  /**
   * Additional classes to be added to the notice. (For custom styling.)
   *
   * @default ''
   */
  addClass: string;
  /**
   * Additional classes to be added to the notice, only when in modal.
   *
   * @default ''
   */
  addModalClass: string;
  /**
   * Additional classes to be added to the notice, only when in modeless.
   *
   * @default ''
   */
  addModelessClass: string;
  /**
   * Open the notice immediately when it is created.
   *
   * @default true
   */
  autoOpen: boolean;
  /**
   * Width of the notice.
   *
   * @default '360px'
   */
  width: string;
  /**
   * Minimum height of the notice. It will expand to fit content.
   *
   * @default '16px'
   */
  minHeight: string;
  /**
   * Maximum height of the text container. If the text goes beyond this height,
   * scrollbars will appear. Use null to remove this restriction.
   *
   * @default '200px'
   */
  maxTextHeight: string | null;
  /**
   * Set icon to true to use the default icon for the selected style/type, false
   * for no icon, or a string for your own icon class.
   *
   * @default true
   */
  icon: boolean | string;
  /**
   * The animation to use when displaying and hiding the notice. 'none' and
   * 'fade' are supported through CSS. Others are supported through the Animate
   * module and Animate.css.
   *
   * @default 'fade'
   */
  animation: string;
  /**
   * Speed at which the notice animates in and out. 'slow', 'normal', or 'fast'.
   * Respectively, 400ms, 250ms, 100ms.
   *
   * @default 'normal'
   */
  animateSpeed: 'slow' | 'normal' | 'fast';
  /**
   * Display a drop shadow.
   *
   * @default true
   */
  shadow: boolean;
  /**
   * After a delay, close the notice.
   *
   * @default true
   */
  hide: boolean;
  /**
   * Delay in milliseconds before the notice is removed. If set to `Infinity`,
   * the notice will not close, but it will not be considered sticky, so it will
   * be closed along with all unstuck notices if the modal backdrop is clicked.
   *
   * @default 8000
   */
  delay: number;
  /**
   * Reset the hide timer if the mouse moves over the notice.
   *
   * @default true
   */
  mouseReset: boolean;
  /**
   * Provide a button for the user to manually close the notice.
   *
   * @default true
   */
  closer: boolean;
  /**
   * Only show the closer button on hover.
   *
   * @default true
   */
  closerHover: boolean;
  /**
   * Provide a button for the user to manually stick the notice.
   *
   * @default true
   */
  sticker: boolean;
  /**
   * Only show the sticker button on hover.
   *
   * @default true
   */
  stickerHover: boolean;
  /**
   * The various displayed text, helps facilitating internationalization.
   *
   * @default {close: 'Close', stick: 'Pin', unstick: 'Unpin'}
   */
  labels: {
    close: string;
    stick: string;
    unstick: string;
  };
  /**
   * Remove the notice's elements from the DOM after it is closed.
   *
   * @default true
   */
  remove: boolean;
  /**
   * Whether to remove the notice from the stack (and therefore, stack  history)
   * when it is closed.
   *
   * @default true
   */
  destroy: boolean;
  /**
   * The stack on which the notices will be placed. Also controls the direction
   * the notices stack.
   *
   * @default defaultStack
   */
  stack: Stack;
  /**
   * This is where modules and their options should be added. It is a map of
   * `module => options` entries.
   *
   * @default defaultModules
   */
  modules: ModuleMap;
}

export interface Module {}
export interface ModuleOptions {}
export interface ModuleExport {
  default: Module;
  position: string;
  defaults: ModuleOptions;
  [k: string]: any;
}

export type ModuleEntry<T extends ModuleExport = ModuleExport> = [
  T,
  Partial<T['defaults']>
];

export type ModuleMap = Iterable<ModuleEntry>;

export type Options = Partial<NoticeProperties>;

export { Stack, StackProperties, StackOptions };

export abstract class Notice extends NoticeProperties {
  refs: {
    elem: HTMLDivElement | null;
    container: HTMLDivElement | null;
    content: HTMLDivElement | null;
    iconContainer: HTMLDivElement | null;
    titleContainer: HTMLDivElement | null;
    textContainer: HTMLDivElement | null;
  };

  update(options: Options): void;

  /**
   * Open the notice.
   * @param immediate Don't animate, just open immediately.
   * @returns A promise that is rejected if the opening wasn't successful, or
   *          resolved once it is.
   */
  open(immediate?: boolean): Promise;

  /**
   * Close the notice.
   * @param immediate Don't animate, just close immediately.
   * @param timerHide Used to determine whether the notice was closed by timing
   *                  out.
   * @param waitAfterward Set state to waiting after it's closed.
   * @returns A promise that is rejected if the closing wasn't successful, or
   *          resolved once it is.
   */
  close(
    immediate?: boolean,
    timerHide?: boolean,
    waitAfterward?: boolean
  ): Promise;

  /**
   * Cancel any closing operation the notice is going through.
   */
  cancelClose(): void;

  /**
   * Queue the notice to close after the delay.
   */
  queueClose(): void;

  /**
   * Invokes the callback whenever the notice dispatches the event. Callback
   * receives an `event` argument with a `detail` prop. Returns a function that
   * removes the handler when invoked.
   * @param eventType The name of the event to listen for.
   * @param listener A callback to run when the event is fired.
   * @returns A function that will remove the listener.
   */
  on(
    eventType: string,
    listener: (event: Event & { detail: any }) => any
  ): () => void;

  /**
   * Fire an event.
   * @param name The name of the event.
   * @param detail The detail object to go on the event.
   */
  fire(name: string, detail?: any): void;

  /**
   * Returns the state of the notice. Can be 'waiting', 'opening', 'open',
   * 'closing', or 'closed'.
   */
  getState(): 'waiting' | 'open' | 'opening' | 'closed' | 'closing';

  /**
   * Run an attention getter animation from Animate.css.
   *
   * Provided by Animate module.
   *
   * @param aniClass The name of the animation class to use.
   * @param callback A callback to run once the animation is done.
   */
  attention(aniClass: string, callback?: () => any): void;
}

declare interface DefaultStack extends Stack {
  /**
   * @default 'down'
   */
  dir1: StackProperties['dir1'];
  /**
   * @default 'left'
   */
  dir2: StackProperties['dir2'];
  /**
   * @default 25
   */
  firstpos1: StackProperties['firstpos1'];
  /**
   * @default 25
   */
  firstpos2: StackProperties['firstpos2'];
  /**
   * @default 36
   */
  spacing1: StackProperties['spacing1'];
  /**
   * @default 36
   */
  spacing2: StackProperties['spacing2'];
  /**
   * @default 'bottom'
   */
  push: StackProperties['push'];
}

export const defaultStack: DefaultStack;
export const defaultModules: Map<ModuleExport, ModuleOptions>;
export const defaults: NoticeProperties;

/**
 * Create a PNotify Notice.
 * @param options Notice options.
 */
export function alert(options: Options | string): Notice;
/**
 * Create a PNotify Notice with the type set to 'notice';
 * @param options Notice options.
 */
export function notice(
  options: Options | string
): Notice & {
  /**
   * @default 'notice'
   */
  type: Options['type'];
};
/**
 * Create a PNotify Notice with the type set to 'info';
 * @param options Notice options.
 */
export function info(
  options: Options | string
): Notice & {
  /**
   * @default 'info'
   */
  type: Options['type'];
};
/**
 * Create a PNotify Notice with the type set to 'success';
 * @param options Notice options.
 */
export function success(
  options: Options | string
): Notice & {
  /**
   * @default 'success'
   */
  type: Options['type'];
};
/**
 * Create a PNotify Notice with the type set to 'error';
 * @param options Notice options.
 */
export function error(
  options: Options | string
): Notice & {
  /**
   * @default 'error'
   */
  type: Options['type'];
};
