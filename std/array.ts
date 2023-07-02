declare global {
  interface Array<T> {
    compact(): NonNullable<T>[];
    compactMap<O>(fn: (it: T) => O | null | undefined): O[];
    first: T | undefined;
    last: T | undefined;
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
