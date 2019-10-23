// @flow

class BitwiseArray {
  length: number;

  value: Array<number>;

  constructor(arg: number | BitwiseArray) {
    if (arg instanceof BitwiseArray) {
      this.length = arg.length;
      this.value = [...arg.value];
    } else {
      this.length = arg;
      this.value = Array(Math.ceil(arg / 32)).fill(0);
    }
  }

  clear() {
    this.value = Array(Math.ceil(this.length / 32)).fill(0);
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
}

const createBitwiseArray = (arg: number | BitwiseArray): BitwiseArray => {
  return new BitwiseArray(arg);
};

export default BitwiseArray;
export { createBitwiseArray };