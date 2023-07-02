import {
  pascalCase,
  camelCase,
  snakeCase,
  capitalCase,
  constantCase,
  dotCase,
  headerCase,
  noCase,
  pathCase,
  paramCase,
} from 'change-case';
import { titleCase } from 'title-case';
import { mapValues } from 'lodash';
import { isPlural, isSingular, plural, singular } from 'pluralize';

declare global {
  interface String {
    isBlank: boolean;
    isWhitespace: boolean;
    isPlural: boolean;
    isSingular: boolean;
    single: string;
    plural: string;
    lower: string;
    upper: string;
    capital: string;
    snake: string;
    camel: string;
    pascalCase: string;
    camelCase: string;
    snakeCase: string;
    capitalCase: string;
    constantCase: string;
    dotCase: string;
    headerCase: string;
    noCase: string;
    pathCase: string;
    paramCase: string;
    titleCase: string;
  }
}

Object.defineProperties(String.prototype, {
  isBlank: {
    get() {
      return !this.trimStart();
    },
  },
  isWhitespace: {
    get() {
      return !this.trimStart();
    },
  },
  isPlural: {
    get() {
      return isPlural(this);
    },
  },
  isSingular: {
    get() {
      return isSingular(this);
    },
  },
  single: {
    get() {
      return singular(this);
    },
  },
  plural: {
    get() {
      return plural(this);
    },
  },
  capital: {
    get() {
      return capitalCase(this);
    },
  },
  snake: {
    get() {
      return snakeCase(this);
    },
  },
  camel: {
    get() {
      return camelCase(this);
    },
  },

  ...mapValues(
    {
      pascalCase,
      camelCase,
      snakeCase,
      capitalCase,
      constantCase,
      dotCase,
      headerCase,
      noCase,
      pathCase,
      paramCase,
      titleCase,
    },
    (val) => ({
      get(this: string) {
        return val(this);
      },
    })
  ),
});

export {};
