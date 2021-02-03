/**
 *  节流函数，频繁触发的函数，在每隔一段时间内才调用一次
 * @param {Function} callback 要节流的函数
 * @param {Number} delay 节流函数的每次触发时间 毫秒
 * @param {Boolean} [isTrailing]  是否尾部调用最后一次触发函数
 * @return {Function} A new, throttled, function
 */
export default function throttle(callback, delay, isTrailing = false) {
  if (typeof callback !== "function") {
    throw new Error("callback must be function.");
  }

  let lastExec = 0;
  let timeId = -1;
  let canceled = false;

  function clearExistingTimeout() {
    if (timeId >= 0) {
      clearTimeout(timeId);
    }
  }

  function wrapper(...args) {
    const self = this;
    const intervalTime = Date.now() - lastExec;

    if (canceled) {
      return;
    }

    clearExistingTimeout();

    if (intervalTime > delay) {
      exec();
    } else if (isTrailing) {
      // 尾部调用 为 true， 执行最后一次调用
      timeId = setTimeout(exec, delay - intervalTime);
    }

    function exec() {
      lastExec = Date.now();
      callback.apply(self, args);
    }
  }

  wrapper.cancel = function cancel() {
    clearExistingTimeout();
    canceled = true;
  };

  return wrapper;
}
