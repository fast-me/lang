declare global {
  function stringify(value: any): string;
}

global.stringify = function stringify(value) {
  let seen: any[] = [];

  return JSON.stringify(
    value,
    function (key, val) {
      if (val != null && typeof val == 'object') {
        if (seen.indexOf(val) >= 0) {
          return val.id;
        }
        seen.push(val);
      }
      return val;
    },
    2
  );
};
