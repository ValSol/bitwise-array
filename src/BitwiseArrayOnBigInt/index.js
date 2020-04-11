// @flow

import type { BitwiseArray } from '../flowTypes';

type BigInt = window.BigInt;

const bitwiseArrayIsUndefined = 'BitwiseArray view undefined!';

const parseBigInt = (numStr: string, radix: 2 | 32): BigInt => {
  if (!(radix === 2 || radix === 32)) {
    throw new TypeError(`Radix = "${radix}" but have to be "2" OR "32"`);
  }
  const divider = radix === 2 ? 50 : 10;
  let result = window.BigInt(0);
  let rest = numStr;
  let step = 0;
  let show = false;
  while (rest.length > divider) {
    show = true;
    const piece = parseInt(rest.slice(-divider), radix);
    if (piece.toString(radix).padStart(divider, '0') !== rest.slice(-divider)) {
      throw new TypeError(
        `Incorrect string for parsing! Rest "${rest.slice(
          -divider,
        )}" not equal to coerced piece "${piece.toString(radix)}" when radix=${radix}!`,
      );
    }
    result |= window.BigInt(piece) << window.BigInt(50 * step);
    rest = rest.slice(0, -divider);

    step += 1;
  }

  const piece = window.BigInt(parseInt(rest, radix));
  if (piece.toString(radix).padStart(rest.length, '0') !== rest) {
    throw new TypeError(
      `Incorrect string for parsing! Rest "${rest}" not equal to coerced piece "${piece.toString(
        radix,
      )}" when radix=${radix}!`,
    );
  }
  result |= piece << window.BigInt(50 * step);
  return result;
};

class BitwiseArrayOnBigInt {
  length: number;
  value: BigInt;

  constructor<T>(
    arg: number | string | BitwiseArray | BigInt | Array<T>,
    arg2?: Array<T> | number,
    // $FlowFixMe
  ) {
    // $FlowFixMe
    if (arg instanceof BitwiseArrayOnBigInt) {
      this.value = arg.value;
      this.length = arg.length;
      // $FlowFixMe
    } else if (typeof arg === 'bigint') {
      if (typeof arg2 !== 'number') {
        throw new TypeError('If first arg is BigInt second arg has to be length with type Number');
      }
      // $FlowFixMe
      if (arg >> window.BigInt(arg2)) {
        throw new TypeError(`Too short "length"="${arg2}" for this "BigInt" value!`);
      }
      this.value = arg;
      this.length = arg2;
    } else if (Array.isArray(arg)) {
      if (!Array.isArray(arg2)) {
        throw new TypeError('Second arg has to be Array!');
      }
      this.length = arg.length;
      this.value = window.BigInt(0);
      arg2.forEach((item) => {
        const pos = arg.indexOf(item);
        if (pos === -1) {
          throw new TypeError('Second arg has to be an item of the first arg array!');
        }
        const mask = this.getMask(pos);
        this.value |= mask; // eslint-disable-line no-bitwise
      });
    } else if (typeof arg === 'string' && arg2) {
      if (typeof arg2 !== 'number') {
        throw new TypeError(
          'If first arg is a String second arg has to be length with type Number',
        );
      }
      this.length = arg2;
      this.value = parseBigInt(arg, 32);
    } else if (typeof arg === 'string') {
      this.length = arg.length;
      this.value = parseBigInt(arg, 2);
    } else if (typeof arg === 'number') {
      this.length = arg;
      this.value = window.BigInt(0);
    } else {
      throw new TypeError(`Incorrect type of arg: "${String(arg)}" or arg2: ${String(arg2)}`);
    }
    Object.freeze(this);
  }

  clear() {
    return new BitwiseArrayOnBigInt(this.length);
  }

  getMask(pos: number): BigInt {
    if (pos >= this.length) {
      throw new TypeError(`Too large pos: ${pos}" for length: ${this.length}!`);
    }
    if (!Number.isInteger(pos)) {
      throw new TypeError(`Incorrect pos: "${pos}"!`);
    }

    return window.BigInt(1) << window.BigInt(this.length - pos - 1);
  }

  checkLength(bitwiseArray: BitwiseArray) {
    if (bitwiseArray.length !== this.length) {
      throw new TypeError('Length of two bitwiseArrays have to be equal!');
    }
  }

  set(pos: number) {
    const mask = this.getMask(pos);
    const value = this.value | mask;
    return new BitwiseArrayOnBigInt(value, this.length);
  }

  toString(base?: 32 | 2): string {
    const radix = base || 2;
    let result = this.value.toString(radix);
    if (radix === 2) {
      result = result.padStart(this.length, '0');
    }
    return result;
  }

  invert() {
    const value =
      ~this.value & ((window.BigInt(1) << window.BigInt(this.length)) - window.BigInt(1));

    return new BitwiseArrayOnBigInt(value, this.length);
  }

  toggle(pos: number) {
    const mask = this.getMask(pos);
    const value = this.value ^ mask;
    return new BitwiseArrayOnBigInt(value, this.length);
  }

  unset(pos: number) {
    const mask = this.getMask(pos);
    const value = this.value & ~mask;
    return new BitwiseArrayOnBigInt(value, this.length);
  }

  get(pos: number): boolean {
    const mask = this.getMask(pos);
    return Boolean(this.value & mask); // eslint-disable-line no-bitwise
  }

  and(bitwiseArray: BitwiseArray) {
    this.checkLength(bitwiseArray);
    if (typeof bitwiseArray.value === 'undefined') {
      throw new TypeError(bitwiseArrayIsUndefined); // to prevent flowjs error
    }
    const value = this.value & bitwiseArray.value;
    return new BitwiseArrayOnBigInt(value, this.length);
  }

  or(bitwiseArray: BitwiseArray) {
    this.checkLength(bitwiseArray);
    if (typeof bitwiseArray.value === 'undefined') {
      throw new TypeError(bitwiseArrayIsUndefined); // to prevent flowjs error
    }
    const value = this.value | bitwiseArray.value;
    return new BitwiseArrayOnBigInt(value, this.length);
  }

  xor(bitwiseArray: BitwiseArray) {
    this.checkLength(bitwiseArray);
    if (typeof bitwiseArray.value === 'undefined') {
      throw new TypeError(bitwiseArrayIsUndefined); // to prevent flowjs error
    }
    const value = this.value ^ bitwiseArray.value;
    return new BitwiseArrayOnBigInt(value, this.length);
  }

  count() {
    let count = 0;
    let value = this.value;
    const mask = window.BigInt(1);
    while (value) {
      if (mask & value) count += 1;
      value = value >> mask;
    }
    return count;
  }

  select<T>(arr: Array<T>): Array<T> {
    if (arr.length !== this.length) {
      throw new TypeError('Length of bitwiseArrays have to be equal the length of array!');
    }
    let value = this.value;
    const mask = window.BigInt(1);
    let index = 0;
    const result = [];
    while (value) {
      if (mask & value) result.unshift(arr[this.length - index - 1]);
      value = value >> mask;
      index += 1;
    }
    return result;
  }

  isEqual(bitwiseArray: BitwiseArray): boolean {
    this.checkLength(bitwiseArray);
    return bitwiseArray.value === this.value;
  }
}

function createBitwiseArray<T>(
  arg: number | string | BitwiseArray | BigInt | Array<T>,
  arg2?: number | Array<T>,
): BitwiseArray {
  return new BitwiseArrayOnBigInt(arg, arg2);
}

export default BitwiseArrayOnBigInt;
export { createBitwiseArray, parseBigInt };
