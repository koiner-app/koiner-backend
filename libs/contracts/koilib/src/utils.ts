export function promiseWithTimeout(
  promise: any,
  ms: number | undefined,
  timeoutError = new Error('Promise timed out')
) {
  // create a promise that rejects in milliseconds
  const timeout = new Promise((_, reject) => {
    setTimeout(() => {
      reject(timeoutError);
    }, ms);
  });

  // returns a race between timeout and the passed promise
  return Promise.race([promise, timeout]);
}
