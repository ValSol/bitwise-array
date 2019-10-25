// @flow
/* eslint-env jest */

import { createBitwiseArray } from './index';

describe('add BitwiseArray method', () => {
  test('should return bitwise ADD of 2 bitwiseArrays', () => {
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
    bitwiseArray.add(bitwiseArray2);
    const expectedValue = [2, 1];
    expect(bitwiseArray.value).toEqual(expectedValue);
  });
});
