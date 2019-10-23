// @flow
/* eslint-env jest */

import { createBitwiseArray } from './index';

describe('isIntersected BitwiseArray method', () => {
  test('should return true if there are intersected bits', () => {
    const bitwiseArray = createBitwiseArray(62);
    bitwiseArray.set(0);
    bitwiseArray.set(1);
    bitwiseArray.set(31);
    const bitwiseArray2 = createBitwiseArray(62);
    bitwiseArray2.set(3);
    bitwiseArray2.set(4);
    bitwiseArray2.set(31);
    const result = bitwiseArray.isIntersected(bitwiseArray2);
    const expectedResult = true;
    expect(result).toBe(expectedResult);
  });

  test('should return true if there are intersected bits 2', () => {
    const bitwiseArray = createBitwiseArray(62);
    bitwiseArray.set(0);
    bitwiseArray.set(1);
    bitwiseArray.set(50);
    const bitwiseArray2 = createBitwiseArray(62);
    bitwiseArray2.set(50);
    bitwiseArray2.set(4);
    bitwiseArray2.set(31);
    const result = bitwiseArray.isIntersected(bitwiseArray2);
    const expectedResult = true;
    expect(result).toBe(expectedResult);
  });

  test('should return true if base BitwiseArray IS EMPTY', () => {
    const bitwiseArray = createBitwiseArray(62);
    const bitwiseArray2 = createBitwiseArray(62);
    bitwiseArray2.set(0);
    bitwiseArray2.set(1);
    bitwiseArray2.set(31);
    const result = bitwiseArray.isIntersected(bitwiseArray2);
    const expectedResult = true;
    expect(result).toBe(expectedResult);
  });

  test('should return false if there are not intersected bits', () => {
    const bitwiseArray = createBitwiseArray(62);
    bitwiseArray.set(0);
    bitwiseArray.set(1);
    bitwiseArray.set(31);
    const bitwiseArray2 = createBitwiseArray(62);
    const result = bitwiseArray.isIntersected(bitwiseArray2);
    const expectedResult = false;
    expect(result).toBe(expectedResult);
  });

  test('should return false if there are not intersected bits 2', () => {
    const BitwiseArray = createBitwiseArray(62);
    BitwiseArray.set(0);
    BitwiseArray.set(1);
    BitwiseArray.set(31);
    const bitwiseArray2 = createBitwiseArray(62);
    BitwiseArray.set(2);
    BitwiseArray.set(50);
    BitwiseArray.set(60);
    const result = BitwiseArray.isIntersected(bitwiseArray2);
    const expectedResult = false;
    expect(result).toBe(expectedResult);
  });
});
