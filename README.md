# throttle-and-debounce
throttle-and-debounce

# throttle-and-debounce

## Usage

### `throttle`

```js
import throttle  from 'throttle.js';

const throttleFunc = throttle(300, () => {
	// Throttled function
});

// which is equals to, because noTrailing is default to false
const throttleFunc = throttle(1000, () => {
	// Throttled function
}, false);

// example

const throttleFunc = throttle(1000, (num) => {
  console.log('num:', num)
}, false);

throttleFunc(1) // will execute the callback
throttleFunc(2) // won't execute callback
throttleFunc(3) // won't execute callback

// will execute the callback, because noTrailing is false, 
// but if we set noTrailing as true, this callback won't be executed.
throttleFunc(4)

setTimeout(() => {
  throttleFunc(10) // will execute the callback
}, 1200)

// output
// num: 1
// num: 4
// num: 10
```

### `debounce`

```js
import debounce from 'debounce.js';

const debounceFunc = debounce(300, () => {
	// Debounced function
});

// which is equals to, because atBegin is default to false
const debounceFunc = debounce(1000, () => {
	// Debounced function
}, flase);

// example

const debounceFunc = debounce(1000, (num) => {
  console.log('num:', num)
}, false);

// won't execute the callback, because atBegin is false, 
// but if we set atBegin as true, this callback will be executed.
debounceFunc(1)

debounceFunc(2) // won't execute callback
debounceFunc(3) // won't execute callback

debounceFunc(4) // will execute the callback, 
// but if we set atBegin as true, this callback won't be executed.

setTimeout(() => {
  debounceFunc(10) // will execute the callback
}, 1200)

// output
// num: 4
// num: 10
```

### ```cancelling```

Debounce and throttle can both be cancelled by calling the `cancel` function.

```js
const throttleFunc = throttle(300, () => {
	// Throttled function
});

throttleFunc.cancel();

const debounceFunc = debounce(300, () => {
	// Debounced function
});

debounceFunc.cancel()
```

The logic that is being throttled or debounced will no longer be called.

## API

### throttle(delay,  callback, noTrailing)

Returns: `Function`

Throttle execution of a function. Especially useful for rate limiting execution of handlers on events like resize and scroll.

#### delay

Type: `Number`

A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.


#### callback

Type: `Function`

A function to be executed after delay milliseconds. The `this` context and all arguments are passed through, as-is, to `callback` when the throttled-function is executed.

#### noTrailing

Type: `Boolean`

Optional, defaults to false. If noTrailing is true, callback will only execute every `delay` milliseconds while the throttled-function is being called. If noTrailing is false or unspecified, callback will be executed one final time after the last throttled-function call. (After the throttled-function has not been called for `delay` milliseconds, the internal counter is reset)

### debounce(delay, callback, atBegin)

Returns: `Function`

Debounce execution of a function. Debouncing, unlike throttling, guarantees that a function is only executed a single time, either at the very beginning of a series of calls, or at the very end.

#### delay

Type: `Number`

A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.

#### atBegin

Type: `Boolean`

Optional, defaults to false. If `atBegin` is false or unspecified, callback will only be executed `delay` milliseconds after the last debounced-function call. If `atBegin` is true, callback will be executed only at the first debounced-function call. (After the throttled-function has not been called for `delay` milliseconds, the internal counter is reset).

#### callback

Type: `Function`

A function to be executed after delay milliseconds. The `this` context and all arguments are passed through, as-is, to `callback` when the debounced-function is executed.

## Browser support

Tested in IE9+ and all modern browsers.

## License

**Original module license:** Copyright (c) 2010 "Cowboy" Ben Alman (Dual licensed under the MIT and GPL licenses. http://benalman.com/about/license/)  
**This module license:** MIT © [Ivan Nikolić](http://ivannikolic.com)