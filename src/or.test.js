// @flow
/* eslint-env jest */

import { createBitwiseArray } from './index';

describe('or BitwiseArray method', () => {
  test('should return bitwise OR of 2 bitwiseArrays', () => {
    const bitwiseArray = createBitwiseArray(62);
    bitwiseArray.set(0);
    bitwiseArray.set(1);
    bitwiseArray.set(32);
    bitwiseArray.set(35);
    const bitwiseArray2 = createBitwiseArray(62);
    bitwiseArray2.set(1);
    bitwiseArray2.set(2);
    bitwiseArray2.set(32);
    bitwiseArray2.set(33);
    bitwiseArray.or(bitwiseArray2);
    expect(bitwiseArray.toString()).toEqual(
      '11100000000000000000000000000000110100000000000000000000000000',
    );
  });
});
