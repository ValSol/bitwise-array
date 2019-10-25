// @flow

class BitwiseArray {
  length: number;

  value: Array<number>;

  constructor<T>(arg: number | BitwiseArray | Array<T>, arg2?: Array<T>) {
    if (arg instanceof BitwiseArray) {
      this.length = arg.length;
      this.value = [...arg.value];
    } else if (Array.isArray(arg)) {
      if (!Array.isArray(arg2)) {
        throw new TypeError('Second arg has to be Array!');
      }
      this.length = arg2.length;
      this.value = Array(Math.ceil(arg2.length / 32)).fill(0);

      arg.forEach(item => {
        const pos = arg2.indexOf(item);
        if (pos === -1) {
          throw new TypeError('Second arg has to be an item of the first arg array!');
        }
        if (pos) {
          const { mask, segNum } = this.getMask(pos);
          this.value[segNum] |= mask; // eslint-disable-line no-bitwise
        }
      });
    } else {
      this.length = arg;
      this.value = Array(Math.ceil(arg / 32)).fill(0);
    }
  }

  clear() {
    this.value = Array(Math.ceil(this.length / 32)).fill(0);
    return this;
  }

  invert() {
    const reminder = this.length % 32;
    this.value = this.value.reduce((prev, segment, i) => {
      if (i < this.value.length - 1 || reminder === 0) {
        prev.push(~segment);
      } else {
        const lastSegment = (~segment << (32 - reminder)) >>> (32 - reminder);
        prev.push(lastSegment);
      }

      return prev;
    }, []);
    return this;
  }

  getMask(pos: number): { mask: number, segNum: number } {
    if (pos >= this.length) {
      throw new TypeError(`Too large pos: ${pos}" for length: ${this.length}!`);
    }
    if (!Number.isInteger(pos)) {
      throw new TypeError(`Incorrect pos: "${pos}"!`);
    }

    const segNum = Math.floor(pos / 32);
    const mask = 1 << pos % 32; // eslint-disable-line no-bitwise
    return { mask, segNum };
  }

  set(pos: number) {
    const { mask, segNum } = this.getMask(pos);
    this.value[segNum] |= mask; // eslint-disable-line no-bitwise
    return this;
  }

  toggle(pos: number) {
    const { mask, segNum } = this.getMask(pos);
    this.value[segNum] ^= mask; // eslint-disable-line no-bitwise
    return this;
  }

  unset(pos: number) {
    const { mask, segNum } = this.getMask(pos);
    this.value[segNum] &= ~mask; // eslint-disable-line no-bitwise
    return this;
  }

  get(pos: number): boolean {
    const { mask, segNum } = this.getMask(pos);
    return Boolean(this.value[segNum] & mask); // eslint-disable-line no-bitwise
  }

  add(bitwiseArray: BitwiseArray) {
    if (bitwiseArray.length !== this.length) {
      throw new TypeError('Length of two bitwiseArrays have to be equal!');
    }
    bitwiseArray.value.forEach((segment, i) => {
      this.value[i] &= segment; // eslint-disable-line no-bitwise
    });
    return this;
  }

  or(bitwiseArray: BitwiseArray) {
    if (bitwiseArray.length !== this.length) {
      throw new TypeError('Length of two bitwiseArrays have to be equal!');
    }
    bitwiseArray.value.forEach((segment, i) => {
      this.value[i] |= segment; // eslint-disable-line no-bitwise
    });
    return this;
  }

  xor(bitwiseArray: BitwiseArray) {
    if (bitwiseArray.length !== this.length) {
      throw new TypeError('Length of two bitwiseArrays have to be equal!');
    }
    bitwiseArray.value.forEach((segment, i) => {
      this.value[i] ^= segment; // eslint-disable-line no-bitwise
    });
    return this;
  }

  count() {
    return this.value.reduce((prev, segment) => {
      let count = 32; // use 'count' for case 32th bit set
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

  toString(): string {
    const reminder = this.length % 32;
    return this.value.reduce((prev, segment, i) => {
      let count = i === this.value.length - 1 && reminder ? reminder : 32;
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

  select<T>(arr: Array<T>): Array<T> {
    let index = 0;
    return this.value.reduce((prev, segment, i) => {
      while (index < 32 * (i + 1) && index < this.length) {
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
      this.value.every(segment => segment === 0) ||
      bitwiseArray.value.some(
        (segment, i) => (this.value[i] & segment) !== 0, // eslint-disable-line no-bitwise
      )
    );
  }

  isEqual(bitwiseArray: BitwiseArray): boolean {
    if (bitwiseArray.length !== this.length) {
      throw new TypeError('Length of two bitwiseArrays have to be equal!');
    }
    return bitwiseArray.value.every(
      (segment, i) => this.value[i] === segment, // eslint-disable-line no-bitwise
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
