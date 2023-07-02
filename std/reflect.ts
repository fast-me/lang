declare global {
  function getCallerName(): string;
}

globalThis.getCallerName = function getCallerName() {
  // Get stack array
  const orig = Error.prepareStackTrace;
  Error.prepareStackTrace = (error, stack) => stack;
  const { stack } = new Error();
  Error.prepareStackTrace = orig;

  const caller = (stack as any)[2];
  return caller
    ? ((caller as any).getFunctionName && (caller as any).getFunctionName()) ||
        caller
    : undefined;
};
