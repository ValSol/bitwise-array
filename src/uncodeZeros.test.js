// @flow
/* eslint-env jest */

import uncodeZeros from './uncodeZeros';

describe('code Zeros util', () => {
  test('should return same string', () => {
    const num32 = '123456789abcdfhijklmnopqrstuv';
    const result = uncodeZeros(num32);
    expect(result).toBe(num32);
  });

  test('should return string with 1 zero', () => {
    const num32 = '1x2';
    const result = uncodeZeros(num32);
    const expectedResult = '102';
    expect(result).toBe(expectedResult);
  });

  test('should return string with 2 zeros', () => {
    const num32 = '1y2';
    const result = uncodeZeros(num32);
    const expectedResult = '1002';
    expect(result).toBe(expectedResult);
  });

  test('should return string with 3 zeros', () => {
    const num32 = '1z2';
    const result = uncodeZeros(num32);
    const expectedResult = '10002';
    expect(result).toBe(expectedResult);
  });

  test('should return string with 4 zeros', () => {
    const num32 = '1A2';
    const result = uncodeZeros(num32);
    const expectedResult = '100002';
    expect(result).toBe(expectedResult);
  });

  test('should return string with 5 zeros', () => {
    const num32 = '1B2';
    const result = uncodeZeros(num32);
    const expectedResult = '1000002';
    expect(result).toBe(expectedResult);
  });

  test('should return string with 9 zeros', () => {
    const num32 = '1F2';
    const result = uncodeZeros(num32);
    const expectedResult = '10000000002';
    expect(result).toBe(expectedResult);
  });

  test('should return string with 10 zeros', () => {
    const num32 = '1G2';
    const result = uncodeZeros(num32);
    const expectedResult = '100000000002';
    expect(result).toBe(expectedResult);
  });

  test('should return string with 29 zeros', () => {
    const num32 = '1Z2';
    const result = uncodeZeros(num32);
    const expectedResult = '1000000000000000000000000000002';
    expect(result).toBe(expectedResult);
  });

  test('should return string with 30 zeros', () => {
    const num32 = '1xw2';
    const result = uncodeZeros(num32);
    const expectedResult = '10000000000000000000000000000002';
    expect(result).toBe(expectedResult);
  });

  test('should return string with 1, 2, 3 zeros', () => {
    const num32 = '1x2y3z';
    const result = uncodeZeros(num32);
    const expectedResult = '102003000';
    expect(result).toBe(expectedResult);
  });
});
