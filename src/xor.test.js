// @flow
/* eslint-env jest */

import { createBitwiseArray } from './index';

describe('xor BitwiseArray method', () => {
  test('should return bitwise OR of 2 bitwiseArrays', () => {
    const bitwiseArray = createBitwiseArray(4);
    bitwiseArray.set(2);
    bitwiseArray.set(3);
    const bitwiseArray2 = createBitwiseArray(4);
    bitwiseArray2.set(1);
    bitwiseArray2.set(3);
    bitwiseArray.xor(bitwiseArray2);
    expect(bitwiseArray.toString()).toEqual('0110');
  });
});
