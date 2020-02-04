// @flow

const DIMENSION = 32;
// if DIMENSION = 32 use Uint32Array; 16 use Uint16Array; 8 use Uint8Array

const transfer = (source: ArrayBuffer): ArrayBuffer => {
  const { byteLength } = source;
  const sourceView = new Uint32Array(source);
  const destView = new Uint32Array(new ArrayBuffer(byteLength));
  destView.set(sourceView);
  return destView.buffer;
};

const create = (length: number): ArrayBuffer =>
  new ArrayBuffer((Math.ceil(length / DIMENSION) * DIMENSION) / 8);

class BitwiseArray {
  length: number;
  buffer: ArrayBuffer;
  view: Uint32Array;

  constructor<T>(arg: number | string | BitwiseArray | Array<T>, arg2?: Array<T>) {
    if (arg instanceof BitwiseArray) {
      this.length = arg.length;
      this.buffer = transfer(arg.buffer);
      this.view = new Uint32Array(this.buffer);
    } else if (Array.isArray(arg)) {
      // TODO interchange 'arg' & 'arg2'
      if (!Array.isArray(arg2)) {
        throw new TypeError('Second arg has to be Array!');
      }
      this.length = arg.length;
      this.buffer = create(this.length);
      this.view = new Uint32Array(this.buffer);

      arg2.forEach(item => {
        const pos = arg.indexOf(item);
        if (pos === -1) {
          throw new TypeError('Second arg has to be an item of the first arg array!');
        }
        const { mask, segNum } = this.getMask(pos);
        this.view[segNum] |= mask; // eslint-disable-line no-bitwise
      });
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
  }

  clear() {
    this.buffer = create(this.length);
    this.view = new Uint32Array(this.buffer);
    return this;
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
    this.view[segNum] |= mask; // eslint-disable-line no-bitwise
    return this;
  }

  toString(): string {
    const reminder = this.length % DIMENSION;
    const leftmostBit = 2 ** (DIMENSION - 1);
    return this.view.reduce((prev, segment, i) => {
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
  }

  invert() {
    const reminder = this.length % DIMENSION;
    this.view = this.view.reduce((prev, segment, i) => {
      if (i < this.view.length - 1 || reminder === 0) {
        prev[i] = ~segment;
      } else {
        const lastSegment = ~segment & (2 ** DIMENSION - 2 ** (DIMENSION - reminder));

        prev[i] = lastSegment;
      }

      return prev;
    }, new Uint32Array(create(this.length)));
    return this;
  }

  toggle(pos: number) {
    const { mask, segNum } = this.getMask(pos);
    this.view[segNum] ^= mask; // eslint-disable-line no-bitwise
    return this;
  }

  unset(pos: number) {
    const { mask, segNum } = this.getMask(pos);
    this.view[segNum] &= ~mask; // eslint-disable-line no-bitwise
    return this;
  }

  get(pos: number): boolean {
    const { mask, segNum } = this.getMask(pos);
    return Boolean(this.view[segNum] & mask); // eslint-disable-line no-bitwise
  }

  and(bitwiseArray: BitwiseArray) {
    if (bitwiseArray.length !== this.length) {
      throw new TypeError('Length of two bitwiseArrays have to be equal!');
    }
    bitwiseArray.view.forEach((segment, i) => {
      this.view[i] &= segment; // eslint-disable-line no-bitwise
    });
    return this;
  }

  or(bitwiseArray: BitwiseArray) {
    if (bitwiseArray.length !== this.length) {
      throw new TypeError('Length of two bitwiseArrays have to be equal!');
    }
    bitwiseArray.view.forEach((segment, i) => {
      this.view[i] |= segment; // eslint-disable-line no-bitwise
    });
    return this;
  }

  xor(bitwiseArray: BitwiseArray) {
    if (bitwiseArray.length !== this.length) {
      throw new TypeError('Length of two bitwiseArrays have to be equal!');
    }
    bitwiseArray.view.forEach((segment, i) => {
      this.view[i] ^= segment; // eslint-disable-line no-bitwise
    });
    return this;
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

  isIntersected(bitwiseArray: BitwiseArray): boolean {
    if (bitwiseArray.length !== this.length) {
      throw new TypeError('Length of two bitwiseArrays have to be equal!');
    }
    return (
      this.view.every(segment => segment === 0) ||
      bitwiseArray.view.some(
        (segment, i) => (this.view[i] & segment) !== 0, // eslint-disable-line no-bitwise
      )
    );
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
  arg: number | string | BitwiseArray | Array<T>,
  arg2?: Array<T>,
): BitwiseArray {
  return new BitwiseArray(arg, arg2);
}

export default BitwiseArray;
export { createBitwiseArray };
