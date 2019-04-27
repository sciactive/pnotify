import PNotify, { modules } from './PNotifyCore';
const key = 'Callbacks';

function getCallback (notice, options, name) {
  let modules = notice ? notice.modules : options.modules;
  let cbs = (modules && modules.Callbacks) ? modules.Callbacks : {};
  return (name in cbs) ? cbs[name] : () => true;
}

let init = args => {
  getCallback(null, args.props, 'beforeInit')(args.props);

  let notice = _factory(args);

  let _open = notice.open;
  let _close = notice.close;

  const open = function (...args) {
    let ret = getCallback(notice, null, 'beforeOpen')(notice);
    if (ret !== false) {
      _open.apply(notice, args);
      getCallback(notice, null, 'afterOpen')(notice);
    }
  };

  const close = function (timerHide, ...args) {
    let ret = getCallback(notice, null, 'beforeClose')(notice, timerHide);
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

let _factory = PNotify.factory;

PNotify.factory = options => init(options);

const Component = { key };

// Register the module with PNotify.
modules[key] = Component;
