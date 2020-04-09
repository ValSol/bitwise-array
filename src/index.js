// @flow

import codeZeros from './codeZeros';
import uncodeZeros from './uncodeZeros';

const DIMENSION = 32;
// if DIMENSION = 32 use Uint32Array; 16 use Uint16Array; 8 use Uint8Array

const transfer = (source: ArrayBuffer): { buffer: ArrayBuffer, view: Uint32Array } => {
  const { byteLength } = source;
  const sourceView = new Uint32Array(source);
  const destView = new Uint32Array(new ArrayBuffer(byteLength));
  destView.set(sourceView);
  return { buffer: destView.buffer, view: destView };
};

const zeros50 = '00000000000000000000000000000000000000000000000000';

// only for 50bit numbers
const bitsTo32 = (bits: string): string => {
  let result = parseInt(bits, 2).toString(32);
  if (result.length < 10) {
    result = `${zeros50.slice(-10 + result.length)}${result}`;
  }

  return result;
};

// only for 50bit numbers (10symbols length 32 base numbers)
const bitsFrom32 = (n32: string): string => {
  let result = parseInt(n32, 32).toString(2);
  if (result.length < 50) {
    result = `${zeros50.slice(-50 + result.length)}${result}`;
  }

  return result;
};

const create = (length: number): ArrayBuffer =>
  new ArrayBuffer((Math.ceil(length / DIMENSION) * DIMENSION) / 8);

class BitwiseArray {
  length: number;
  buffer: ArrayBuffer;
  view: Uint32Array;

  constructor<T>(
    arg: number | string | BitwiseArray | ArrayBuffer | Array<T>,
    arg2?: Array<T> | number,
  ) {
    if (arg instanceof BitwiseArray) {
      this.length = arg.length;
      const { buffer, view } = transfer(arg.buffer);
      this.buffer = buffer;
      this.view = view;
    } else if (arg instanceof ArrayBuffer) {
      if (typeof arg2 !== 'number') {
        throw new TypeError(
          'If first arg is ArrayBuffer second arg has to be length with type Number',
        );
      }

      const { byteLength } = arg;
      if (byteLength * 8 < arg2) {
        throw new TypeError('Too long "length" for this "ArrayBuffer"!');
      }
      if (byteLength * 8 - arg2 > 31) {
        throw new TypeError('Too short "length" for this "ArrayBuffer"!');
      }

      this.buffer = arg;
      this.length = arg2;
      this.view = new Uint32Array(this.buffer);
    } else if (Array.isArray(arg)) {
      if (!Array.isArray(arg2)) {
        throw new TypeError('Second arg has to be Array!');
      }
      this.length = arg.length;
      this.buffer = create(this.length);
      this.view = new Uint32Array(this.buffer);

      arg2.forEach((item) => {
        const pos = arg.indexOf(item);
        if (pos === -1) {
          throw new TypeError('Second arg has to be an item of the first arg array!');
        }
        const { mask, segNum } = this.getMask(pos);
        this.view[segNum] |= mask; // eslint-disable-line no-bitwise
      });
    } else if (typeof arg === 'string' && arg2) {
      if (typeof arg2 !== 'number') {
        throw new TypeError(
          'If first arg is a String second arg has to be length with type Number',
        );
      }
      this.length = arg2;
      this.buffer = create(this.length);

      const lengthReminder = this.length % 50;

      let head = arg;
      let tail = '';
      while (head.length > 10) {
        tail = `${bitsFrom32(head.slice(-10))}${tail}`;
        head = head.slice(0, -10);
      }

      const reminder = parseInt(head, 32).toString(2);
      const bitString =
        reminder.length < lengthReminder
          ? `${zeros50.slice(-lengthReminder + reminder.length)}${reminder}${tail}`
          : `${reminder}${tail}`;

      this.view = new Uint32Array(this.buffer);
      for (let i = 0; i < this.length; i += 1) {
        if (bitString[i] === '1') {
          const { mask, segNum } = this.getMask(i);
          this.view[segNum] |= mask;
        }
      }
    } else if (typeof arg === 'string') {
      this.length = arg.length;
      this.buffer = create(this.length);
      this.view = new Uint32Array(this.buffer);
      for (let i = 0; i < this.length; i += 1) {
        if (arg[i] === '1') {
          const { mask, segNum } = this.getMask(i);
          this.view[segNum] |= mask;
        } else if (arg[i] !== '0') {
          throw new TypeError('Bit string should have only "0" or "1" symbols');
        }
      }
    } else {
      this.length = arg;
      this.buffer = create(this.length);
      this.view = new Uint32Array(this.buffer);
    }
    Object.freeze(this);
  }

  clear() {
    const buffer = create(this.length);
    return new BitwiseArray(buffer, this.length);
  }

  getMask(pos: number): { mask: number, segNum: number } {
    if (pos >= this.length) {
      throw new TypeError(`Too large pos: ${pos}" for length: ${this.length}!`);
    }
    if (!Number.isInteger(pos)) {
      throw new TypeError(`Incorrect pos: "${pos}"!`);
    }

    const segNum = Math.floor(pos / DIMENSION);
    const mask = 2 ** (DIMENSION - (pos % DIMENSION) - 1); // eslint-disable-line no-bitwise
    return { mask, segNum };
  }

  set(pos: number) {
    const { mask, segNum } = this.getMask(pos);
    const { buffer, view } = transfer(this.buffer);
    view[segNum] |= mask; // eslint-disable-line no-bitwise
    return new BitwiseArray(buffer, this.length);
  }

  toString(radix?: 32): string {
    const reminder = this.length % DIMENSION;
    const leftmostBit = 2 ** (DIMENSION - 1);
    const result = this.view.reduce((prev, segment, i) => {
      let count = i === this.view.length - 1 && reminder ? reminder : DIMENSION;
      while (count) {
        // eslint-disable-next-line no-bitwise
        if (segment & leftmostBit) {
          prev += '1'; // eslint-disable-line no-param-reassign
        } else {
          prev += '0'; // eslint-disable-line no-param-reassign
        }
        segment <<= 1; // eslint-disable-line no-bitwise, no-param-reassign
        count -= 1;
      }
      return prev;
    }, '');

    if (!radix) return result;

    let head = result;
    let tail = '';
    while (head.length > 50) {
      tail = `${bitsTo32(head.slice(-50))}${tail}`;
      head = head.slice(0, -50);
    }

    let result2 = `${parseInt(head, 2).toString(32)}${tail}`;
    while (result2.length > 1 && result2[0] === '0') {
      result2 = result2.slice(1);
    }

    return result2;
  }

  invert() {
    const reminder = this.length % DIMENSION;
    const buffer = create(this.length);
    const view = new Uint32Array(buffer);
    this.view.forEach((segment, i) => {
      if (i < this.view.length - 1 || reminder === 0) {
        view[i] = ~segment;
      } else {
        const lastSegment = ~segment & (2 ** DIMENSION - 2 ** (DIMENSION - reminder));

        view[i] = lastSegment;
      }
    });

    return new BitwiseArray(buffer, this.length);
  }

  toggle(pos: number) {
    const { mask, segNum } = this.getMask(pos);
    const { buffer, view } = transfer(this.buffer);
    view[segNum] ^= mask; // eslint-disable-line no-bitwise
    return new BitwiseArray(buffer, this.length);
  }

  unset(pos: number) {
    const { mask, segNum } = this.getMask(pos);
    const { buffer, view } = transfer(this.buffer);
    view[segNum] &= ~mask; // eslint-disable-line no-bitwise
    return new BitwiseArray(buffer, this.length);
  }

  get(pos: number): boolean {
    const { mask, segNum } = this.getMask(pos);
    return Boolean(this.view[segNum] & mask); // eslint-disable-line no-bitwise
  }

  and(bitwiseArray: BitwiseArray) {
    if (bitwiseArray.length !== this.length) {
      throw new TypeError('Length of two bitwiseArrays have to be equal!');
    }
    const { buffer, view } = transfer(this.buffer);
    bitwiseArray.view.forEach((segment, i) => {
      view[i] &= segment; // eslint-disable-line no-bitwise
    });
    return new BitwiseArray(buffer, this.length);
  }

  or(bitwiseArray: BitwiseArray) {
    if (bitwiseArray.length !== this.length) {
      throw new TypeError('Length of two bitwiseArrays have to be equal!');
    }
    const { buffer, view } = transfer(this.buffer);
    bitwiseArray.view.forEach((segment, i) => {
      view[i] |= segment; // eslint-disable-line no-bitwise
    });
    return new BitwiseArray(buffer, this.length);
  }

  xor(bitwiseArray: BitwiseArray) {
    if (bitwiseArray.length !== this.length) {
      throw new TypeError('Length of two bitwiseArrays have to be equal!');
    }
    const { buffer, view } = transfer(this.buffer);
    bitwiseArray.view.forEach((segment, i) => {
      view[i] ^= segment; // eslint-disable-line no-bitwise
    });
    return new BitwiseArray(buffer, this.length);
  }

  count() {
    return this.view.reduce((prev, segment) => {
      let count = DIMENSION; // use 'count' for case 8th bit set
      while (segment && count) {
        // eslint-disable-next-line no-bitwise
        if (segment & 1) {
          // eslint-disable-next-line no-param-reassign
          prev += 1;
        }
        // eslint-disable-next-line no-bitwise, no-param-reassign
        segment >>= 1;

        count -= 1;
      }
      return prev;
    }, 0);
  }

  select<T>(arr: Array<T>): Array<T> {
    let index = 0;
    const leftmostBit = 2 ** (DIMENSION - 1);
    return this.view.reduce((prev, segment, i) => {
      while (index < DIMENSION * (i + 1) && index < this.length) {
        // eslint-disable-next-line no-bitwise
        if (segment & leftmostBit) {
          prev.push(arr[index]);
        }
        segment <<= 1; // eslint-disable-line no-bitwise, no-param-reassign
        index += 1;
      }
      return prev;
    }, []);
  }

  isEqual(bitwiseArray: BitwiseArray): boolean {
    if (bitwiseArray.length !== this.length) {
      throw new TypeError('Length of two bitwiseArrays have to be equal!');
    }
    return bitwiseArray.view.every(
      (segment, i) => this.view[i] === segment, // eslint-disable-line no-bitwise
    );
  }
}

function createBitwiseArray<T>(
  arg: number | string | BitwiseArray | ArrayBuffer | Array<T>,
  arg2?: number | Array<T>,
): BitwiseArray {
  return new BitwiseArray(arg, arg2);
}

export default BitwiseArray;
export { createBitwiseArray, codeZeros, uncodeZeros };
