<!--
 ====== PNotify ======

 http://sciactive.com/pnotify/

 Copyright 2009-2020 Hunter Perrin
 Copyright 2015 Google, Inc.

 Licensed under Apache License, Version 2.0.
  http://www.apache.org/licenses/LICENSE-2.0
-->

<svelte:options accessors={true} />

<script context="module">
  import { component } from './Component.js';
  import Stack from './Stack.js';
  export { Stack };

  // Factory functions.
  export const alert = options => component(getDefaultArgs(options));
  export const notice = options => component(getDefaultArgs(options, 'notice'));
  export const info = options => component(getDefaultArgs(options, 'info'));
  export const success = options => component(getDefaultArgs(options, 'success'));
  export const error = options => component(getDefaultArgs(options, 'error'));

  // Default arguments for the new notice helper functions.
  function getDefaultArgs (options, type) {
    if (typeof options !== 'object') {
      options = { text: options };
    }

    // Only assign the type if it was requested, so we don't overwrite
    // options.type if it has something assigned.
    if (type) {
      options.type = type;
    }

    let target = document.body;

    if ('stack' in options && options.stack && options.stack.context) {
      target = options.stack.context;
    }

    return { target, props: options };
  }

  export const defaultStack = new Stack({
    dir1: 'down',
    dir2: 'left',
    firstpos1: 25,
    firstpos2: 25,
    spacing1: 36,
    spacing2: 36,
    push: 'bottom'
  });

  export const defaultModules = new Map();

  export const defaults = {
    type: 'notice',
    title: false,
    titleTrusted: false,
    text: false,
    textTrusted: false,
    styling: 'brighttheme',
    icons: 'brighttheme',
    mode: 'no-preference',
    addClass: '',
    addModalClass: '',
    addModelessClass: '',
    autoOpen: true,
    width: '360px',
    minHeight: '16px',
    maxTextHeight: '200px',
    icon: true,
    animation: 'fade',
    animateSpeed: 'normal',
    shadow: true,
    hide: true,
    delay: 8000,
    mouseReset: true,
    closer: true,
    closerHover: true,
    sticker: true,
    stickerHover: true,
    labels: {
      close: 'Close',
      stick: 'Pin',
      unstick: 'Unpin'
    },
    remove: true,
    destroy: true,
    stack: defaultStack,
    modules: defaultModules
  };

  let posTimer;

  // These actions need to be done once the DOM is ready.
  function onDocumentLoaded () {
    if (!defaultStack.context) {
      defaultStack.context = document.body;
    }
    // Reposition the notices when the window resizes.
    window.addEventListener('resize', () => {
      // This timer is used for queueing the position event so it doesn't run
      // repeatedly.
      if (posTimer) {
        clearTimeout(posTimer);
      }
      posTimer = setTimeout(() => {
        const event = new Event('pnotify:position');
        document.body.dispatchEvent(event);
        posTimer = null;
      }, 10);
    });
  }

  // Run the deferred actions once the DOM is ready.
  if (window && document.body) {
    onDocumentLoaded();
  } else {
    document.addEventListener('DOMContentLoaded', onDocumentLoaded);
  }
</script>

<div bind:this={refs.elem}
  data-pnotify
  use:forwardEvents
  class="
    pnotify
    {icon !== false ? 'pnotify-with-icon' : ''}
    {getStyle('elem')}
    pnotify-mode-{mode}
    {addClass}
    {_animatingClass}
    {_moveClass}
    {_stackDirClass}
    {animation === 'fade' ? 'pnotify-fade-'+animateSpeed : ''}
    {_modal ? 'pnotify-modal '+addModalClass : addModelessClass}
    {_masking ? 'pnotify-masking' : ''}
    {_maskingIn ? 'pnotify-masking-in' : ''}
    {_moduleClasses.elem.join(' ')}
  "
  aria-live="assertive"
  role="alertdialog"
  on:mouseenter={handleInteraction}
  on:mouseleave={handleLeaveInteraction}
  on:focusin={handleInteraction}
  on:focusout={handleLeaveInteraction}
>
  <div bind:this={refs.container}
    class="
      pnotify-container
      {getStyle('container')}
      {getStyle(type)}
      {shadow ? 'pnotify-shadow' : ''}
      {_moduleClasses.container.join(' ')}
    "
    style="{_widthStyle} {_minHeightStyle}"
    role="alert"
  >
    {#each modulesPrependContainer as [module, options] (module)}
      <svelte:component this={module.default} self={self} {...options} />
    {/each}
    {#if closer && !_nonBlock}
      <div
        class="pnotify-closer {getStyle('closer')} {(!closerHover || _interacting) ? '' : 'pnotify-hidden'}"
        role="button"
        tabindex="0"
        title={labels.close}
        on:click={() => close(false)}
      >
        <span class={getIcon('closer')}></span>
      </div>
    {/if}
    {#if sticker && !_nonBlock}
      <div
        class="pnotify-sticker {getStyle('sticker')} {(!stickerHover || _interacting) ? '' : 'pnotify-hidden'}"
        role="button"
        aria-pressed={!hide}
        tabindex="0"
        title={hide ? labels.stick : labels.unstick}
        on:click={() => hide = !hide}
      >
        <span class="{getIcon('sticker')} {hide ? getIcon('unstuck') : getIcon('stuck')}"></span>
      </div>
    {/if}
    {#if icon !== false}
      <div bind:this={refs.iconContainer} class="pnotify-icon {getStyle('icon')}">
        <span class={icon === true ? getIcon(type) : icon}></span>
      </div>
    {/if}
    <div bind:this={refs.content} class="pnotify-content {getStyle('content')}">
      {#each modulesPrependContent as [module, options] (module)}
        <svelte:component this={module.default} self={self} {...options} />
      {/each}
      {#if title !== false}
        <div bind:this={refs.titleContainer} class="pnotify-title {getStyle('title')}">
          {#if !_titleElement}
            {#if titleTrusted}
              {@html title}
            {:else}
              <span class="pnotify-pre-line">{title}</span>
            {/if}
          {/if}
        </div>
      {/if}
      {#if text !== false}
        <div bind:this={refs.textContainer}
          class="pnotify-text {getStyle('text')}"
          style="{_maxTextHeightStyle}"
          role="alert"
        >
          {#if !_textElement}
            {#if textTrusted}
              {@html text}
            {:else}
              <span class="pnotify-pre-line">{text}</span>
            {/if}
          {/if}
        </div>
      {/if}
      {#each modulesAppendContent as [module, options] (module)}
        <svelte:component this={module.default} self={self} {...options} />
      {/each}
    </div>
    {#each modulesAppendContainer as [module, options] (module)}
      <svelte:component this={module.default} self={self} {...options} />
    {/each}
  </div>
</div>

<script>
  import { onMount, beforeUpdate, tick, createEventDispatcher } from 'svelte';
  import { current_component } from 'svelte/internal';
  import { forwardEventsBuilder } from '@smui/common/forwardEvents.js';

  const self = current_component;
  const dispatch = createEventDispatcher();
  const forwardEvents = forwardEventsBuilder(current_component, [
    'pnotify:init',
    'pnotify:mount',
    'pnotify:update',
    'pnotify:beforeOpen',
    'pnotify:afterOpen',
    'pnotify:enterModal',
    'pnotify:leaveModal',
    'pnotify:beforeClose',
    'pnotify:afterClose',
    'pnotify:beforeDestroy',
    'pnotify:afterDestroy',
    'focusin',
    'focusout',
    'animationend',
    'transitionend'
  ]);

  // Modules must be declared for init. (We need to run init inside modules.)
  export let modules = new Map(defaults.modules);
  // Stack must be declared for init. (We need the context to fire the event.)
  export let stack = defaults.stack;

  // Refs are needed for init event.
  export const refs = {
    elem: null,
    container: null,
    content: null,
    iconContainer: null,
    titleContainer: null,
    textContainer: null
  };

  // Run init to give a chance for modules to override defaults.
  const selfDefaults = { ...defaults };
  dispatchLifecycleEvent('init', { notice: self, defaults: selfDefaults });

  export let type = selfDefaults.type;
  export let title = selfDefaults.title;
  export let titleTrusted = selfDefaults.titleTrusted;
  export let text = selfDefaults.text;
  export let textTrusted = selfDefaults.textTrusted;
  export let styling = selfDefaults.styling;
  export let icons = selfDefaults.icons;
  export let mode = selfDefaults.mode;
  export let addClass = selfDefaults.addClass;
  export let addModalClass = selfDefaults.addModalClass;
  export let addModelessClass = selfDefaults.addModelessClass;
  export let autoOpen = selfDefaults.autoOpen;
  export let width = selfDefaults.width;
  export let minHeight = selfDefaults.minHeight;
  export let maxTextHeight = selfDefaults.maxTextHeight;
  export let icon = selfDefaults.icon;
  export let animation = selfDefaults.animation;
  export let animateSpeed = selfDefaults.animateSpeed;
  export let shadow = selfDefaults.shadow;
  export let hide = selfDefaults.hide;
  export let delay = selfDefaults.delay;
  export let mouseReset = selfDefaults.mouseReset;
  export let closer = selfDefaults.closer;
  export let closerHover = selfDefaults.closerHover;
  export let sticker = selfDefaults.sticker;
  export let stickerHover = selfDefaults.stickerHover;
  export let labels = selfDefaults.labels;
  export let remove = selfDefaults.remove;
  export let destroy = selfDefaults.destroy;

  // The state can be 'waiting', 'opening', 'open', 'closing', or 'closed'.
  let _state = 'closed';
  // Auto close timer.
  let _timer = null;
  // Animation timers.
  let _animInTimer = null;
  let _animOutTimer = null;
  // Stores what is currently being animated (in or out).
  let _animating = false;
  // Stores the class that adds entry/exit animation effects.
  let _animatingClass = '';
  // Stores the class that adds movement animation effects.
  let _moveClass = '';
  // Stores whether the notice was hidden by a timer.
  let _timerHide = false;
  // Whether the mouse is over the notice or the notice is focused.
  let _interacting = false;
  // Holds classes that modules add for the notice element or container element.
  let _moduleClasses = {
    elem: [],
    container: []
  };
  // Modules that change how the notice displays (causing the notice element to
  // not appear) can set these to true to make PNotify handle it correctly.
  let _moduleHandled = false;
  let _moduleOpen = false;
  // The masking control for the second notice in a modalish stack when the
  // first notice is hovered.
  let _masking = false;
  let _maskingIn = false;
  let _maskingTimer = null;

  // Save the old value of hide, so we can reset the timer if it changes.
  let _oldHide = hide;

  // Grab the icons from the icons object or use provided icons
  $: _widthStyle = typeof width === 'string' ? 'width: ' + width + ';' : '';
  $: _minHeightStyle = typeof minHeight === 'string' ? 'min-height: ' + minHeight + ';' : '';
  // The bottom padding of .03em is specifically for Firefox, since it will show a scrollbar without it for some reason.
  $: _maxTextHeightStyle = typeof maxTextHeight === 'string' ? 'max-height: ' + maxTextHeight + '; overflow-y: auto; overscroll-behavior: contain; padding-bottom:.03em;' : '';
  $: _titleElement = title instanceof HTMLElement;
  $: _textElement = text instanceof HTMLElement;
  // Whether the notification is open in a modal stack (or a modalish stack in
  // modal state).
  $: _modal = stack && (stack.modal === true || (stack.modal === 'ish' && _timer === 'prevented')) && ['open', 'opening', 'closing'].indexOf(_state) !== -1;
  $: _nonBlock = addClass.match(/\bnonblock\b/) || (addModalClass.match(/\bnonblock\b/) && _modal) || (addModelessClass.match(/\bnonblock\b/) && !_modal);
  // This is for specific styling for how notices stack.
  $: _stackDirClass = (stack && stack.dir1) ? 'pnotify-stack-'+stack.dir1 : '';

  // Filter through the module objects, getting an array for each position.
  $: modulesPrependContainer = Array.from(modules).filter(([module, options]) => module.position === 'PrependContainer');
  $: modulesPrependContent = Array.from(modules).filter(([module, options]) => module.position === 'PrependContent');
  $: modulesAppendContent = Array.from(modules).filter(([module, options]) => module.position === 'AppendContent');
  $: modulesAppendContainer = Array.from(modules).filter(([module, options]) => module.position === 'AppendContainer');

  export const getState = () => _state;
  export const getTimer = () => _timer;
  export const getStyle = name => typeof styling === 'string' ? styling + '-' + name : (name in styling ? styling[name] : styling.prefix + '-' + name);
  export const getIcon = name => typeof icons === 'string' ? icons + '-icon-' + name : (name in icons ? icons[name] : icons.prefix + '-icon-' + name);

  $: if (_titleElement && refs.titleContainer) {
    refs.titleContainer.appendChild(title);
  }

  $: if (_textElement && refs.textContainer) {
    refs.textContainer.appendChild(text);
  }

  let _oldStack = NaN;
  $: if (_oldStack !== stack) {
    if (_oldStack) {
      // Remove the notice from the old stack.
      _oldStack._removeNotice(self);
    }
    if (stack) {
      // Add the notice to the stack.
      stack._addNotice(self);
    }
    _oldStack = stack;
  }

  let _oldModal = false;
  $: if (_oldModal !== _modal) {
    dispatchLifecycleEvent(_modal ? 'enterModal' : 'leaveModal');
    _oldModal = _modal;
  }

  onMount(() => {
    dispatchLifecycleEvent('mount');

    // Display the notice.
    if (autoOpen) {
      open();
    }
  });

  beforeUpdate(async () => {
    dispatchLifecycleEvent('update');

    // Update the timed hiding.
    if (_state !== 'closed' && _state !== 'waiting' && hide !== _oldHide) {
      if (!hide) {
        cancelClose();
      } else if (!_oldHide) {
        queueClose();
      }
    }

    // Queue a position
    if (_state !== 'closed' && _state !== 'closing' && stack && !stack._collapsingModalState) {
      stack.queuePosition();
    }

    // Save old options.
    _oldHide = hide;
  });

  function handleInteraction (e) {
    _interacting = true;

    // Stop animation, reset the removal timer when the user interacts.
    if (mouseReset && _state === 'closing') {
      if (!_timerHide) {
        return;
      }
      cancelClose();
    }

    // Stop the close timer.
    if (hide && mouseReset) {
      cancelClose();
    }
  }

  function handleLeaveInteraction (e) {
    _interacting = false;

    // Start the close timer.
    if (hide && mouseReset && _animating !== 'out') {
      queueClose();
    }
  }

  // This runs an event on all the modules.
  function dispatchLifecycleEvent (event, detail = {}) {
    const eventDetail = {
      notice: self,
      ...detail
    };
    if (event === 'init') {
      Array.from(modules).forEach(([module, options]) => 'init' in module && module.init(eventDetail));
    }
    let target = refs.elem || (stack && stack.context) || document.body;
    if (!target) {
      dispatch('pnotify:'+event, eventDetail);
      return true;
    }
    const eventObj = new Event('pnotify:'+event, {
      bubbles: event === 'init' || event === 'mount',
      cancelable: event.startsWith('before')
    });
    eventObj.detail = eventDetail;
    target.dispatchEvent(eventObj);
    return !eventObj.defaultPrevented;
  }

  function insertIntoDOM () {
    // If the notice is not in the DOM, or in the wrong context, append it.
    const target = stack && stack.context || document.body;
    if (!target) {
      throw new Error('No context to insert this notice into.');
    }
    if (!refs.elem) {
      throw new Error('Trying to insert notice before element is available.');
    }
    if (refs.elem.parentNode !== target) {
      target.appendChild(refs.elem);
    }
  }

  function removeFromDOM () {
    refs.elem && refs.elem.parentNode.removeChild(refs.elem);
  }

  // Display the notice.
  export let open = immediate => {
    if (_state === 'opening') {
      return;
    }
    if (_state === 'open') {
      if (hide) {
        queueClose();
      }
      return;
    }

    if (!_moduleHandled && stack && stack._shouldNoticeWait()) {
      _state = 'waiting';
      return;
    }

    if (!dispatchLifecycleEvent('beforeOpen', { immediate })) {
      return;
    }

    _state = 'opening';
    _masking = false;
    // This makes the notice visibity: hidden; so its dimensions can be
    // determined.
    _animatingClass = 'pnotify-initial pnotify-hidden';

    const afterOpenCallback = () => {
      // Now set it to hide.
      if (hide) {
        queueClose();
      }

      _state = 'open';

      dispatchLifecycleEvent('afterOpen', { immediate });
    };

    if (stack) {
      // Notify the stack that a notice has opened.
      stack._handleNoticeOpened(self);
    }

    if (_moduleOpen) {
      afterOpenCallback();
      return;
    }

    insertIntoDOM();

    // Wait until the DOM is updated.
    window.requestAnimationFrame(() => {
      if (_state !== 'opening') {
        return;
      }

      if (stack) {
        // Mark the stack so it won't animate the new notice.
        stack._animation = false;
        if (stack.push === 'top') {
          // Reset the position data so the notice is positioned as the first
          // notice.
          stack._resetPositionData();
        }
        // Now position the stack's the notices.
        stack._positionNotice(self);
        stack.queuePosition(0);
        // Reset animation.
        stack._animation = true;
      }

      animateIn(afterOpenCallback, immediate);
    });
  };

  // Remove the notice.
  export let close = (immediate, timerHide, waitAfterward) => {
    if (_state === 'closing' || _state === 'closed') {
      return;
    }

    const runDestroy = () => {
      if (!dispatchLifecycleEvent('beforeDestroy')) {
        return;
      }
      if (stack) {
        stack._removeNotice(self);
      }
      self.$destroy();
      dispatchLifecycleEvent('afterDestroy');
    };

    if (_state === 'waiting') {
      if (waitAfterward) {
        return;
      }
      _state = 'closed';
      // It's debatable whether the notice should be destroyed in this case, but
      // I'm going to go ahead and say yes.
      if (destroy && !waitAfterward) {
        runDestroy();
      }
      return;
    }

    if (!dispatchLifecycleEvent('beforeClose', { immediate, timerHide, waitAfterward })) {
      return;
    }

    _state = 'closing';
    _timerHide = !!timerHide; // Make sure it's a boolean.

    if (_timer && _timer !== 'prevented' && clearTimeout) {
      clearTimeout(_timer);
    }
    _timer = null;

    animateOut(() => {
      _interacting = false;
      _timerHide = false;
      _state = waitAfterward ? 'waiting' : 'closed';
      dispatchLifecycleEvent('afterClose', { immediate, timerHide, waitAfterward });
      if (stack) {
        stack._handleNoticeClosed(self);
      }
      if (destroy && !waitAfterward) {
        // If we're supposed to destroy the notice, run the destroy module
        // events, remove from stack, and let Svelte handle DOM removal.
        runDestroy();
      } else if (remove && !waitAfterward) {
        // If we're supposed to remove the notice from the DOM, do it.
        removeFromDOM();
      }
    }, immediate);
  };

  // Animate the notice in.
  export let animateIn = async (callback, immediate) => {
    // Declare that the notice is animating in.
    _animating = 'in';
    const finished = event => {
      if (event && refs.elem && event.target !== refs.elem) {
        return;
      }
      refs.elem && refs.elem.removeEventListener('transitionend', finished);
      if (_animInTimer) {
        clearTimeout(_animInTimer);
      }
      if (_animating !== 'in') {
        return;
      }
      let visible = _moduleOpen;
      if (!visible && refs.elem) {
        const domRect = refs.elem.getBoundingClientRect();
        for (let prop in domRect) {
          if (domRect[prop] > 0) {
            visible = true;
            break;
          }
        }
      }
      if (visible) {
        if (callback) {
          callback.call();
        }
        // Declare that the notice has completed animating.
        _animating = false;
      } else {
        _animInTimer = setTimeout(finished, 40);
      }
    };

    if (animation === 'fade' && !immediate) {
      refs.elem && refs.elem.addEventListener('transitionend', finished);
      _animatingClass = 'pnotify-in';
      await tick();
      _animatingClass = 'pnotify-in pnotify-fade-in';
      // Just in case the event doesn't fire, call it after 650 ms.
      _animInTimer = setTimeout(finished, 650);
    } else {
      _animatingClass = 'pnotify-in';
      await tick();
      finished();
    }
  };

  // Animate the notice out.
  export let animateOut = async (callback, immediate) => {
    // Declare that the notice is animating out.
    _animating = 'out';
    const finished = event => {
      if (event && refs.elem && event.target !== refs.elem) {
        return;
      }
      refs.elem && refs.elem.removeEventListener('transitionend', finished);
      if (_animOutTimer) {
        clearTimeout(_animOutTimer);
      }
      if (_animating !== 'out') {
        return;
      }
      let visible = _moduleOpen;
      if (!visible && refs.elem) {
        const domRect = refs.elem.getBoundingClientRect();
        for (let prop in domRect) {
          if (domRect[prop] > 0) {
            visible = true;
            break;
          }
        }
      }
      if (!refs.elem || !refs.elem.style.opacity || refs.elem.style.opacity === '0' || !visible) {
        _animatingClass = '';
        if (callback) {
          callback.call();
        }
        // Declare that the notice has completed animating.
        _animating = false;
      } else {
        // In case this was called before the notice finished animating.
        _animOutTimer = setTimeout(finished, 40);
      }
    };

    if (animation === 'fade' && !immediate) {
      refs.elem && refs.elem.addEventListener('transitionend', finished);
      _animatingClass = 'pnotify-in';
      // Just in case the event doesn't fire, call it after 650 ms.
      _animOutTimer = setTimeout(finished, 650);
    } else {
      _animatingClass = '';
      await tick();
      finished();
    }
  };

  // Cancel any pending removal timer.
  export function cancelClose () {
    if (_timer && _timer !== 'prevented') {
      clearTimeout(_timer);
      _timer = null;
    }
    if (_animOutTimer) {
      clearTimeout(_animOutTimer);
    }
    if (_state === 'closing') {
      // If it's animating out, stop it.
      _state = 'open';
      _animating = false;
      _animatingClass = animation === 'fade' ? 'pnotify-in pnotify-fade-in' : 'pnotify-in';
    }
  }

  // Queue a close timer.
  export function queueClose () {
    if (_timer === 'prevented') {
      return;
    }
    // Cancel any current close timer.
    cancelClose();
    if (delay !== Infinity) {
      _timer = setTimeout(() => close(false, true), (isNaN(delay) ? 0 : delay));
    }
  }

  export function _preventTimerClose (prevent) {
    if (prevent) {
      cancelClose();
      _timer = 'prevented';
    } else if (_timer === 'prevented') {
      _timer = null;
      if (_state === 'open' && hide) {
        queueClose();
      }
    }
  }

  // Some shortcut functions.
  export function on (...args) {
    return self.$on(...args);
  }

  export function update (...args) {
    return self.$set(...args);
  }

  export function fire (name, detail) {
    dispatch(name, detail);
  }

  export function addModuleClass (element, ...classNames) {
    for (let i = 0; i < classNames.length; i++) {
      let className = classNames[i];
      if (_moduleClasses[element].indexOf(className) === -1) {
        _moduleClasses[element].push(className);
      }
    }
    _moduleClasses[element] = _moduleClasses[element];
  }

  export function removeModuleClass (element, ...classNames) {
    for (let i = 0; i < classNames.length; i++) {
      let className = classNames[i];
      const idx = _moduleClasses[element].indexOf(className);
      if (idx !== -1) {
        _moduleClasses[element].splice(idx, 1);
      }
    }
    _moduleClasses[element] = _moduleClasses[element];
  }

  export function hasModuleClass (element, ...classNames) {
    for (let i = 0; i < classNames.length; i++) {
      let className = classNames[i];
      if (_moduleClasses[element].indexOf(className) === -1) {
        return false;
      }
    }
    return true;
  }

  export function getModuleHandled () {
    return _moduleHandled;
  }

  export function setModuleHandled (value) {
    return _moduleHandled = value;
  }

  export function getModuleOpen () {
    return _moduleOpen;
  }

  export function setModuleOpen (value) {
    return _moduleOpen = value;
  }

  export function setAnimating (value) {
    return _animating = value;
  }

  export function getAnimatingClass () {
    return _animatingClass;
  }

  export function setAnimatingClass (value) {
    return _animatingClass = value;
  }

  export function _getMoveClass () {
    return _moveClass;
  }

  export function _setMoveClass (value) {
    return _moveClass = value;
  }

  export async function _setMasking (value, immediate, callback) {
    if (_maskingTimer) {
      clearTimeout(_maskingTimer);
    }
    if (_masking === value) {
      return;
    }
    if (value) {
      _masking = true;
      _maskingIn = !!immediate;
      insertIntoDOM();
      await tick();
      window.requestAnimationFrame(() => {
        if (_masking) {
          if (immediate && callback) {
            callback();
          } else {
            _maskingIn = true;
            const finished = () => {
              refs.elem && refs.elem.removeEventListener('transitionend', finished);
              if (_maskingTimer) {
                clearTimeout(_maskingTimer);
              }
              if (_maskingIn && callback) {
                callback();
              }
            };
            refs.elem && refs.elem.addEventListener('transitionend', finished);
            _maskingTimer = setTimeout(finished, 650);
          }
        }
      });
    } else if (immediate) {
      _masking = false;
      _maskingIn = false;
      if (remove && ['open', 'opening', 'closing'].indexOf(_state) === -1) {
        removeFromDOM();
      }
      if (callback) {
        callback();
      }
    } else {
      const finished = () => {
        refs.elem && refs.elem.removeEventListener('transitionend', finished);
        if (_maskingTimer) {
          clearTimeout(_maskingTimer);
        }
        if (!_maskingIn) {
          _masking = false;
          if (remove && ['open', 'opening', 'closing'].indexOf(_state) === -1) {
            removeFromDOM();
          }
          if (callback) {
            callback();
          }
        }
      };

      _maskingIn = false;
      refs.elem && refs.elem.addEventListener('transitionend', finished);
      // eslint-disable-next-line no-unused-expressions
      refs.elem && refs.elem.style.opacity; // This line is necessary for some reason. Some notices don't fade without it.
      // Just in case the event doesn't fire, call it after 650 ms.
      _maskingTimer = setTimeout(finished, 650);
    }
  }
</script>

<style>
  /* -- Notice */
  :global(body > .pnotify) {
    /* Notices in the body context should be fixed to the viewport. */
    position: fixed;
    /* Ensures notices are above everything */
    z-index: 100040;
  }
  :global(body > .pnotify.pnotify-modal) {
    z-index: 100042;
  }
  :global(.pnotify) {
    position: absolute;
    height: auto;
    z-index: 1;
    display: none;
    transition: opacity .1s linear;
    opacity: 0;
  }
  :global(.pnotify.pnotify-modal) {
    z-index: 3;
  }
  :global(.pnotify.pnotify-in) {
    display: block;
    opacity: 1;
  }
  :global(.pnotify.pnotify-initial) {
    display: block;
  }
  :global(.pnotify-hidden) {
    visibility: hidden;
  }
  :global(.pnotify.pnotify-move) {
    transition: left .4s ease, top .4s ease, right .4s ease, bottom .4s ease;
  }
  :global(.pnotify.pnotify-fade-slow) {
    transition: opacity .4s linear;
    opacity: 0;
  }
  :global(.pnotify.pnotify-fade-slow.pnotify.pnotify-move) {
    transition: opacity .4s linear, left .4s ease, top .4s ease, right .4s ease, bottom .4s ease;
  }
  :global(.pnotify.pnotify-fade-normal) {
    transition: opacity .25s linear;
    opacity: 0;
  }
  :global(.pnotify.pnotify-fade-normal.pnotify.pnotify-move) {
    transition: opacity .25s linear, left .4s ease, top .4s ease, right .4s ease, bottom .4s ease;
  }
  :global(.pnotify.pnotify-fade-fast) {
    transition: opacity .1s linear;
    opacity: 0;
  }
  :global(.pnotify.pnotify-fade-fast.pnotify.pnotify-move) {
    transition: opacity .1s linear, left .4s ease, top .4s ease, right .4s ease, bottom .4s ease;
  }
  :global(.pnotify.pnotify-masking) {
    display: block;
    -webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, .8), rgba(0, 0, 0, 0) 30px, rgba(0, 0, 0, 0));
    mask-image: linear-gradient(to bottom, rgba(0, 0, 0, .8), rgba(0, 0, 0, 0) 30px, rgba(0, 0, 0, 0));
  }
  :global(.pnotify.pnotify-masking.pnotify-stack-up) {
    -webkit-mask-image: linear-gradient(to top, rgba(0, 0, 0, .8), rgba(0, 0, 0, 0) 30px, rgba(0, 0, 0, 0));
    mask-image: linear-gradient(to top, rgba(0, 0, 0, .8), rgba(0, 0, 0, 0) 30px, rgba(0, 0, 0, 0));
  }
  :global(.pnotify.pnotify-masking.pnotify-stack-left) {
    -webkit-mask-image: linear-gradient(to left, rgba(0, 0, 0, .8), rgba(0, 0, 0, 0) 30px, rgba(0, 0, 0, 0));
    mask-image: linear-gradient(to left, rgba(0, 0, 0, .8), rgba(0, 0, 0, 0) 30px, rgba(0, 0, 0, 0));
  }
  :global(.pnotify.pnotify-masking.pnotify-stack-right) {
    -webkit-mask-image: linear-gradient(to right, rgba(0, 0, 0, .8), rgba(0, 0, 0, 0) 30px, rgba(0, 0, 0, 0));
    mask-image: linear-gradient(to right, rgba(0, 0, 0, .8), rgba(0, 0, 0, 0) 30px, rgba(0, 0, 0, 0));
  }
  :global(.pnotify.pnotify-fade-in, .pnotify.pnotify-masking-in) {
    opacity: 1;
  }
  :global(.pnotify .pnotify-shadow) {
    -webkit-box-shadow: 0px 6px 28px 0px rgba(0,0,0,0.1);
    -moz-box-shadow: 0px 6px 28px 0px rgba(0,0,0,0.1);
    box-shadow: 0px 6px 28px 0px rgba(0,0,0,0.1);
  }
  :global(.pnotify-container) {
    position: relative;
    background-position: 0 0;
    padding: .8em;
    height: 100%;
    margin: 0;
  }
  :global(.pnotify-container:after) {
    content: " "; /* Older browser do not support empty content */
    visibility: hidden;
    display: block;
    height: 0;
    clear: both;
  }
  :global(.pnotify-closer),
  :global(.pnotify-sticker) {
    float: right;
    margin-left: .5em;
    cursor: pointer;
  }
  :global([dir=rtl] .pnotify-closer),
  :global([dir=rtl] .pnotify-sticker) {
    float: left;
    margin-right: .5em;
    margin-left: 0;
  }
  :global(.pnotify-title) {
    display: block;
    white-space: pre-line;
    margin-bottom: .4em;
    margin-top: 0;
  }
  :global(.pnotify.pnotify-with-icon .pnotify-content) {
    margin-left: 24px;
  }
  :global([dir=rtl] .pnotify.pnotify-with-icon .pnotify-content) {
    margin-right: 24px;
    margin-left: 0;
  }
  :global(.pnotify-pre-line) {
    white-space: pre-line;
  }
  :global(.pnotify-icon),
  :global(.pnotify-icon span) {
    display: block;
    float: left;
  }
  :global([dir=rtl] .pnotify-icon),
  :global([dir=rtl] .pnotify-icon span) {
    float: right;
  }
  /* Overlay */
  :global(.pnotify-modal-overlay) {
    background-color: rgba(0, 0, 0, .6);
    top: 0;
    left: 0;
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 2;
    transition: opacity .25s linear;
    opacity: 0;
    padding: 0 1rem;
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }
  :global(.pnotify-modal-overlay-up) {
    align-items: flex-start;
  }
  :global(.pnotify-modal-overlay-left) {
    justify-content: flex-start;
    align-items: center;
  }
  :global(.pnotify-modal-overlay-right) {
    justify-content: flex-end;
    align-items: center;
  }
  :global(.pnotify-modal-overlay.pnotify-modal-overlay-in) {
    opacity: 1;
  }
  :global(.pnotify-modal-overlay-closes:after) {
    content: "×";
    font-family: Arial;
    font-size: 3rem;
    color: #fff;
    text-shadow: 0 0 .4rem #FFF;
  }
  :global(body > .pnotify-modal-overlay) {
    position: fixed;
    z-index: 100041;
  }
</style>
