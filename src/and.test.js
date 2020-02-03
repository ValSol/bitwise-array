// @flow
/* eslint-env jest */

import { createBitwiseArray } from './index';

describe('and BitwiseArray method', () => {
  test('should return bitwise AND of 2 bitwiseArrays', () => {
    const bitwiseArray = createBitwiseArray(62);
    bitwiseArray
      .set(0)
      .set(1)
      .set(32)
      .set(35);
    const bitwiseArray2 = createBitwiseArray(62);
    bitwiseArray2
      .set(1)
      .set(2)
      .set(32)
      .set(33);
    bitwiseArray.and(bitwiseArray2);
    expect(bitwiseArray.toString()).toEqual(
      '01000000000000000000000000000000100000000000000000000000000000',
    );
  });
});
