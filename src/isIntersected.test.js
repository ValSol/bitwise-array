// @flow
/* eslint-env jest */

import { createBitwiseArray } from './index';

describe('isIntersected BitwiseArray method', () => {
  test('should return true if there are intersected bits', () => {
    const bitwiseArray = createBitwiseArray(62)
      .set(0)
      .set(1)
      .set(31);
    const bitwiseArray2 = createBitwiseArray(62)
      .set(3)
      .set(4)
      .set(31);
    const result = bitwiseArray.isIntersected(bitwiseArray2);
    const expectedResult = true;
    expect(result).toBe(expectedResult);
  });

  test('should return true if there are intersected bits 2', () => {
    const bitwiseArray = createBitwiseArray(62)
      .set(0)
      .set(1)
      .set(50);
    const bitwiseArray2 = createBitwiseArray(62)
      .set(50)
      .set(4)
      .set(31);
    const result = bitwiseArray.isIntersected(bitwiseArray2);
    const expectedResult = true;
    expect(result).toBe(expectedResult);
  });

  test('should return true if base BitwiseArray IS EMPTY', () => {
    const bitwiseArray = createBitwiseArray(62);
    const bitwiseArray2 = createBitwiseArray(62)
      .set(0)
      .set(1)
      .set(31);
    const result = bitwiseArray.isIntersected(bitwiseArray2);
    const expectedResult = true;
    expect(result).toBe(expectedResult);
  });

  test('should return false if there are not intersected bits', () => {
    const bitwiseArray = createBitwiseArray(62)
      .set(0)
      .set(1)
      .set(31);
    const bitwiseArray2 = createBitwiseArray(62);
    const result = bitwiseArray.isIntersected(bitwiseArray2);
    const expectedResult = false;
    expect(result).toBe(expectedResult);
  });

  test('should return false if there are not intersected bits 2', () => {
    const BitwiseArray = createBitwiseArray(62)
      .set(0)
      .set(1)
      .set(31);
    const bitwiseArray2 = createBitwiseArray(62)
      .set(2)
      .set(50)
      .set(60);
    const result = BitwiseArray.isIntersected(bitwiseArray2);
    const expectedResult = false;
    expect(result).toBe(expectedResult);
  });
});
