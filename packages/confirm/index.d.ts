import { Module, ModuleOptions, Notice } from '@pnotify/core';

export as namespace PNotifyConfirm;

declare abstract class ModuleProperties implements ModuleOptions {
  /**
   * Make a confirmation box.
   *
   * @default false
   */
  confirm: boolean;
  /**
   * Make a prompt.
   *
   * @default false
   */
  prompt: boolean;
  /**
   * Classes to add to the input element of the prompt.
   *
   * @default ''
   */
  promptClass: string;
  /**
   * The value of the prompt. (Note that this is two-way bound to the input.)
   *
   * @default ''
   */
  promptValue: string;
  /**
   * Whether the prompt should accept multiple lines of text.
   *
   * @default false
   */
  promptMultiLine: boolean;
  /**
   * For confirmation boxes, true means the first button or the button with
   * promptTrigger will be focused, and null means focus will change only for
   * modal notices. For prompts, true or null means focus the prompt. When
   * false, focus will not change.
   *
   * @default null
   */
  focus: boolean | null;
  /**
   * Where to align the buttons. (flex-start, center, flex-end, space-around,
   * space-between)
   *
   * @default 'flex-end'
   */
  align:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-around'
    | 'space-between';
  /**
   * The buttons to display, and their callbacks. If a button has
   * promptTrigger set to true, it will be triggered when the user hits
   * enter in a prompt (unless they hold shift).
   *
   * @default [{text: 'Ok', primary: true, promptTrigger: true, click: (notice, value) => {notice.close(); notice.fire('pnotify:confirm', { notice, value });}}, {text: 'Cancel', click: notice => {notice.close(); notice.fire('pnotify:cancel', { notice });}}]
   */
  buttons: Button[];
}

export interface Button {
  /**
   * The button's text.
   */
  text: string;
  /**
   * Whether the button's text is trusted (shouldn't be sanitized).
   */
  textTrusted?: boolean;
  /**
   * A class to be added to the button.
   */
  addClass?: string;
  /**
   * Whether to set the 'btn-primary' styling class.
   */
  primary?: boolean;
  /**
   * Whether to trigger this button when the user hits enter in a single line
   * prompt. Also, focus the button if it is a modal prompt.
   */
  promptTrigger?: boolean;
  /**
   * A function to run when the button is clicked.
   */
  click: (notice: Notice, value?: string) => any;
}

export type Options = Partial<ModuleProperties>;

export default abstract class Confirm extends ModuleProperties
  implements Module {}
export const position: string;
export const defaults: ModuleProperties;
