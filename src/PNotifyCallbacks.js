import PNotify, { modules } from './PNotifyCore';
const key = 'Callbacks';

function getCallback (notice, options, name) {
  const modules = notice ? notice.modules : options.modules;
  const cbs = (modules && modules.Callbacks) ? modules.Callbacks : {};
  return (name in cbs) ? cbs[name] : () => true;
}

const factory = args => {
  getCallback(null, args.props, 'beforeInit')(args.props);

  const notice = _factory(args);

  const _open = notice.open;
  const _close = notice.close;

  const open = function (...args) {
    const ret = getCallback(notice, null, 'beforeOpen')(notice);
    if (ret !== false) {
      _open.apply(notice, args);
      if (notice.getState() !== 'waiting') {
        getCallback(notice, null, 'afterOpen')(notice);
      }
    }
  };

  const close = function (timerHide, ...args) {
    const ret = getCallback(notice, null, 'beforeClose')(notice, timerHide);
    if (ret !== false) {
      _close.apply(notice, [timerHide, ...args]);
      getCallback(notice, null, 'afterClose')(notice, timerHide);
    }
  };

  notice.$set({
    open,
    close
  });

  getCallback(notice, null, 'afterInit')(notice);
  return notice;
};

const _factory = PNotify.factory;

PNotify.factory = options => factory(options);

const Component = {};

// Register the module with PNotify.
modules[key] = Component;
