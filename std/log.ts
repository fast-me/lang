declare global {
  let log: boolean;
}

global.log = true;

const _log = console.log;
console.log = function clog() {
  if (log) _log(...arguments);
};
