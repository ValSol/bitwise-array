// @flow
/* eslint-env jest */

import { createBitwiseArray } from './index';

describe('xor BitwiseArray method', () => {
  test('should return bitwise OR of 2 bitwiseArrays', () => {
    const bitwiseArray = createBitwiseArray(4)
      .set(2)
      .set(3);
    const bitwiseArray2 = createBitwiseArray(4)
      .set(1)
      .set(3);
    const result = bitwiseArray.xor(bitwiseArray2);
    expect(result.toString()).toEqual('0110');
  });
});
