import Notice from './';

declare abstract class StackProperties {
  /**
   * The primary stacking direction. Can be `'up'`, `'down'`, `'right'`, or
   * `'left'`.
   *
   * @default null
   */
  dir1: 'up' | 'down' | 'right' | 'left' | null;
  /**
   * The secondary stacking direction. Should be a perpendicular direction to
   * `dir1`. The notices will continue in this direction when they reach the
   * edge of the viewport along `dir1`.
   *
   * @default null
   */
  dir2: 'up' | 'down' | 'right' | 'left' | null;
  /**
   * Number of pixels from the edge of the context, relative to `dir1`, the
   * first notice will appear. If null, the current position of the notice,
   * whatever that is, will be used.
   *
   * @default null
   */
  firstpos1: number | null;
  /**
   * Number of pixels from the edge of the context, relative to `dir2`, the
   * first notice will appear. If null, the current position of the notice,
   * whatever that is, will be used.
   *
   * @default null
   */
  firstpos2: number | null;
  /**
   * Number of pixels between notices along `dir1`.
   *
   * @default 25
   */
  spacing1: number;
  /**
   * Number of pixels between notices along `dir2`.
   *
   * @default 25
   */
  spacing2: number;
  /**
   * Where, in the stack, to push new notices. Can be `'top'` or `'bottom'`.
   *
   * @default 'bottom'
   */
  push: 'top' | 'bottom';
  /**
   * How many notices are allowed to be open in this stack at once.
   *
   * @default 1
   */
  maxOpen: number;
  /**
   * The strategy to use to ensure `maxOpen`. Can be `'wait'`, which will cause
   * new notices to wait their turn, or `'close'`, which will remove the oldest
   * notice to make room for a new one.
   *
   * @default 'wait'
   */
  maxStrategy: 'wait' | 'close';
  /**
   * Whether the notices that are closed to abide by `maxOpen` when
   * `maxStrategy === 'close'` should wait and reopen in turn.
   *
   * @default true
   */
  maxClosureCausesWait: boolean;
  /**
   * Whether the stack should be modal (`true`), modeless (`false`), or modalish
   * (`'ish'`). Modalish stacks are cool.
   * See https://sciactive.com/2020/02/11/the-modalish-notification-flow/.
   *
   * @default 'ish'
   */
  modal: 'ish' | boolean;
  /**
   * Whether new notices that start waiting in a modalish stack should flash
   * under the leader notice to show that they have been added.
   *
   * @default true
   */
  modalishFlash: boolean;
  /**
   * Whether clicking on the modal overlay should close the stack's notices.
   *
   * @default true
   */
  overlayClose: boolean;
  /**
   * Whether clicking on the modal to close notices also closes notices that
   * have been pinned (`hide === false`).
   *
   * @default false
   */
  overlayClosesPinned: boolean;
  /**
   * The DOM element this stack's notices should appear in.
   *
   * @default document.body
   */
  context: HTMLElement;
}

export type StackOptions = Partial<StackProperties>;

/**
 * A stack is an instance of the `Stack` class used to determine where to
 * position notices and how they interact with each other.
 */
export default class Stack extends StackProperties {
  /**
   * An "array" of notices. It's actually built on the fly from the double
   * linked list the notices are actually stored in.
   */
  readonly notices: Notice[];
  /**
   * How many notices there are in the stack.
   */
  readonly length: number;
  /**
   * When a stack is modalish, this is the notice that is open in the non-modal
   * state.
   */
  readonly leader: Notice | null;

  constructor(options: StackOptions);

  /**
   * Run a callback for all the notices in the stack. `start` can be 'head',
   * 'tail', 'oldest', or 'newest'. `dir` can be 'next', 'prev', 'older', or
   * 'newer'.
   * @param callback Function to run for each notice.
   * @param options Controls which direction to iterate notices.
   */
  forEach(
    callback: (notice?: Notice) => void,
    options?: {
      /**
       * Where to start the iteration.
       *
       * @default 'oldest'
       */
      start: Notice | 'head' | 'tail' | 'oldest' | 'newest';
      /**
       * Which direction in the double linked list to iterate.
       *
       * @default 'newer'
       */
      dir: 'next' | 'prev' | 'newer' | 'older';
      /**
       * Whether to skip notices whose open state is handled by a module.
       *
       * @default false
       */
      skipModuleHandled: boolean;
    }
  ): void;

  /**
   * Close all the notices in the stack.
   * @param immediate Don't animate, just close immediately.
   */
  close(immediate?: boolean): void;

  /**
   * Open all the notices in the stack.
   * @param immediate Don't animate, just open immediately.
   */
  open(immediate?: boolean): void;

  /**
   * Open the last closed/closing notice in the stack.
   */
  openLast(): void;

  /**
   * Position all the notices in the stack.
   */
  position(): void;

  /**
   * Queue a position call in that many milliseconds, unless another one is
   * queued beforehand.
   * @param milliseconds Time to wait before positioning. Default: 10.
   */
  queuePosition(milliseconds?: number): void;
}
