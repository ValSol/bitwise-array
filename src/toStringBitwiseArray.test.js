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
    const bitwiseArray = createBitwiseArray(33);
    bitwiseArray.set(0);
    bitwiseArray.set(31);
    bitwiseArray.set(32);
    const result = bitwiseArray.toString();
    const expectedResult = '100000000000000000000000000000011';
    expect(result).toBe(expectedResult);
  });

  test('should return string with only 4 ones', () => {
    const bitwiseArray = createBitwiseArray(33);
    bitwiseArray.set(2);
    bitwiseArray.set(4);
    bitwiseArray.set(8);
    bitwiseArray.set(16);
    const result = bitwiseArray.toString();
    const expectedResult = '001010001000000010000000000000000';
    expect(result).toBe(expectedResult);
  });
});
