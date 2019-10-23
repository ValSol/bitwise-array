// @flow
/* eslint-env jest */

import { createBitwiseArray } from './index';

describe('add BitwiseArray method', () => {
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
    const expectedValue = [7, 11];
    expect(bitwiseArray.value).toEqual(expectedValue);
  });
});
