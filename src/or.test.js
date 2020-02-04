// @flow
/* eslint-env jest */

import { createBitwiseArray } from './index';

describe('or BitwiseArray method', () => {
  test('should return bitwise OR of 2 bitwiseArrays', () => {
    const bitwiseArray = createBitwiseArray(62)
      .set(0)
      .set(1)
      .set(32)
      .set(35);
    const bitwiseArray2 = createBitwiseArray(62)
      .set(1)
      .set(2)
      .set(32)
      .set(33);
    const result = bitwiseArray.or(bitwiseArray2);
    expect(result.toString()).toEqual(
      '11100000000000000000000000000000110100000000000000000000000000',
    );
  });
});
