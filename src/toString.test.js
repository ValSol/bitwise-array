// @flow
/* eslint-env jest */

import { createBitwiseArray } from './index';

describe('toString BitwiseArray method', () => {
  test('should return string with only zeros', () => {
    const bitwiseArray = createBitwiseArray(33);
    const result = bitwiseArray.toString();
    const expectedResult = '000000000000000000000000000000000';
    expect(result).toBe(expectedResult);
  });

  test('should return string with only 3 ones', () => {
    const bitwiseArray = createBitwiseArray(33)
      .set(0)
      .set(31)
      .set(32);
    const result = bitwiseArray.toString();
    const expectedResult = '100000000000000000000000000000011';
    expect(result).toBe(expectedResult);
  });

  test('should return string with only 4 ones', () => {
    const bitwiseArray = createBitwiseArray(33)
      .set(2)
      .set(4)
      .set(8)
      .set(16);
    const result = bitwiseArray.toString();
    const expectedResult = '001010001000000010000000000000000';
    expect(result).toBe(expectedResult);
  });
});
