// @flow

const transfer = (source: ArrayBuffer): ArrayBuffer => {
  const { byteLength } = source;
  const sourceView = new Uint8Array(source);
  const destView = new Uint8Array(new ArrayBuffer(byteLength));
  destView.set(sourceView);
  return destView.buffer;
};

const create = (length: number): ArrayBuffer => new ArrayBuffer(Math.ceil(length / 8));

class BitwiseArray {
  length: number;
  value: ArrayBuffer;
  view: Uint8Array;

  constructor<T>(arg: number | BitwiseArray | Array<T>, arg2?: Array<T>) {
    if (arg instanceof BitwiseArray) {
      this.length = arg.length;
      this.value = transfer(arg.value);
      this.view = new Uint8Array(this.value);
    } else if (Array.isArray(arg)) {
      // TODO interchange 'arg' & 'arg2'
      if (!Array.isArray(arg2)) {
        throw new TypeError('Second arg has to be Array!');
      }
      this.length = arg2.length;
      this.value = create(this.length);
      this.view = new Uint8Array(this.value);

      arg.forEach(item => {
        const pos = arg2.indexOf(item);
        if (pos === -1) {
          throw new TypeError('Second arg has to be an item of the first arg array!');
        }
        const { mask, segNum } = this.getMask(pos);
        this.view[segNum] |= mask; // eslint-disable-line no-bitwise
      });
    } else {
      this.length = arg;
      this.value = create(this.length);
      this.view = new Uint8Array(this.value);
    }
  }

  clear() {
    this.value = create(this.length);
    this.view = new Uint8Array(this.value);
    return this;
  }

  getMask(pos: number): { mask: number, segNum: number } {
    if (pos >= this.length) {
      throw new TypeError(`Too large pos: ${pos}" for length: ${this.length}!`);
    }
    if (!Number.isInteger(pos)) {
      throw new TypeError(`Incorrect pos: "${pos}"!`);
    }

    const segNum = Math.floor(pos / 8);
    const mask = 1 << pos % 8; // eslint-disable-line no-bitwise
    return { mask, segNum };
  }

  set(pos: number) {
    const { mask, segNum } = this.getMask(pos);
    this.view[segNum] |= mask; // eslint-disable-line no-bitwise
    return this;
  }

  toString(): string {
    const reminder = this.length % 8;
    return this.view.reduce((prev, segment, i) => {
      let count = i === this.view.length - 1 && reminder ? reminder : 8;
      while (count) {
        // eslint-disable-next-line no-bitwise
        if (segment & 1) {
          prev += '1'; // eslint-disable-line no-param-reassign
        } else {
          prev += '0'; // eslint-disable-line no-param-reassign
        }
        segment >>= 1; // eslint-disable-line no-bitwise, no-param-reassign
        count -= 1;
      }
      return prev;
    }, '');
  }

  invert() {
    const reminder = this.length % 8;
    this.view = this.view.reduce((prev, segment, i) => {
      if (i < this.view.length - 1 || reminder === 0) {
        prev[i] = ~segment;
      } else {
        const lastSegment = ~segment & (2 ** reminder - 1);

        prev[i] = lastSegment;
      }

      return prev;
    }, new Uint8Array(create(this.length)));
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
      let count = 8; // use 'count' for case 8th bit set
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
    return this.view.reduce((prev, segment, i) => {
      while (index < 8 * (i + 1) && index < this.length) {
        // eslint-disable-next-line no-bitwise
        if (segment & 1) {
          prev.push(arr[index]);
        }
        segment >>= 1; // eslint-disable-line no-bitwise, no-param-reassign
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
  arg: number | BitwiseArray | Array<T>,
  arg2?: Array<T>,
): BitwiseArray {
  return new BitwiseArray(arg, arg2);
}

export default BitwiseArray;
export { createBitwiseArray };
