declare global {
  interface Array<T> {
    compact(): NonNullable<T>[];
    compactMap<O>(fn: (it: T) => O | null | undefined): O[];
    first: T | undefined;
    last: T | undefined;
    insertBetween<V>(val: V): (V | T)[];
  }
}

Array.prototype.compact = function () {
  return this.filter((it) => !!it);
};

Array.prototype.compactMap = function (fn) {
  return this.map(fn).compact();
};

Object.defineProperties(Array.prototype, {
  first: {
    get() {
      return this[0];
    },
  },

  last: {
    get() {
      if (this.length === 0) return undefined;
      return this[this.length - 1];
    },
  },
});

Array.prototype.insertBetween = function insertBetween<T, V>(
  this: T[],
  val: V
) {
  const ret: (V | T)[] = [];
  for (let i = 0; i < this.length; i++) {
    ret.push(this[i]);
    if (i + 1 !== this.length) {
      ret.push(val);
    }
  }
  return ret;
};
