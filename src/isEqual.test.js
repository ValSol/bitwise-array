// @flow
/* eslint-env jest */

import { createBitwiseArray } from './index';

describe('isEqual BitwiseArray method', () => {
  test('should true for two equal empty Bitwise arrays', () => {
    const bitwiseArray = createBitwiseArray(35);
    const bitwiseArray2 = createBitwiseArray(35);
    const result = bitwiseArray.isEqual(bitwiseArray2);
    expect(result).toBe(true);
  });

  test('should true for two equal Bitwise arrays', () => {
    const bitwiseArray = createBitwiseArray(2);
    bitwiseArray.set(0);
    const bitwiseArray2 = createBitwiseArray(2);
    bitwiseArray2.set(1);
    bitwiseArray2.invert();
    const result = bitwiseArray.isEqual(bitwiseArray2);
    expect(result).toBe(true);
  });

  test('should false for two not equal Bitwise arrays', () => {
    const bitwiseArray = createBitwiseArray(35);
    bitwiseArray.set(2);
    const bitwiseArray2 = createBitwiseArray(35);
    const result = bitwiseArray.isEqual(bitwiseArray2);
    expect(result).toBe(false);
  });
});
