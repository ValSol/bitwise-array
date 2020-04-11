// @flow

type BigInt = window.BigInt;

export interface BitwiseArray {
  length: number;
  buffer?: ArrayBuffer;
  view?: Uint32Array;
  value?: BigInt;

  constructor<T>(
    arg: number | string | BitwiseArray | ArrayBuffer | Array<T>,
    arg2?: Array<T> | number,
  ): BitwiseArray;

  clear(): BitwiseArray;

  set(pos: number): BitwiseArray;

  toString(radix?: 32): string;

  invert(): BitwiseArray;

  toggle(pos: number): BitwiseArray;

  unset(pos: number): BitwiseArray;

  get(pos: number): boolean;

  and(bitwiseArray: BitwiseArray): BitwiseArray;

  or(bitwiseArray: BitwiseArray): BitwiseArray;

  xor(bitwiseArray: BitwiseArray): BitwiseArray;

  count(): number;

  select<T>(arr: Array<T>): Array<T>;

  isEqual(bitwiseArray: BitwiseArray): boolean;
}
