// @flow
/* eslint-env jest */

import { createBitwiseArray } from './index';

describe('select BitwiseArray method', () => {
  test('should return empty array', () => {
    const bitwiseArray = createBitwiseArray(5);
    const arr = [0, 1, 2, 3, 4];
    const result = bitwiseArray.select(arr);
    const expectedResult = [];
    expect(result).toEqual(expectedResult);
  });

  test('should return array with 3 selected items', () => {
    const bitwiseArray = createBitwiseArray(33)
      .set(0)
      .set(31)
      .set(32);
    const arr = [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      28,
      29,
      30,
      31,
      32,
      33,
    ];
    const result = bitwiseArray.select(arr);
    const expectedResult = [0, 31, 32];
    expect(result).toEqual(expectedResult);
  });

  test('should return array with 3 selected items', () => {
    const bitwiseArray = createBitwiseArray(33)
      .set(2)
      .set(4)
      .set(8)
      .set(16)
      .set(32);
    const arr = [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      28,
      29,
      30,
      31,
      32,
      33,
    ];
    const result = bitwiseArray.select(arr);
    const expectedResult = [2, 4, 8, 16, 32];
    expect(result).toEqual(expectedResult);
  });
});
