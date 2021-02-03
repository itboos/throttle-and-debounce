/**
 * 防抖函数，可以决定是开头调用还是末尾调用， 在指定的时间内，只会调用一次，如果在时间间隔内又
 * 触发了函数，则重新计算时间
 * @param {Function} callback
 * @param {Number} delay
 * @param {Boolean} [atBegin] 是否头部调用, 默认为 false
 * @return {Function}  A new, debounce, function.
 */
export default function debounce(callback, delay, atBegin = false) {
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

    if (atBegin && intervalTime > delay) {
      exec();
      return;
    }
    // 使用 setTimeout 延迟执行函数
    timeId = setTimeout(exec, delay);

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
