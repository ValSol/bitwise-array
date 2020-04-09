// @flow
/* eslint-env jest */

import codeZeros from './codeZeros';

describe('code Zeros util', () => {
  test('should return same string', () => {
    const num32 = '123456789abcdfhijklmnopqrstuv';
    const result = codeZeros(num32);
    expect(result).toBe(num32);
  });

  test('should return string with 1 zero', () => {
    const num32 = '102';
    const result = codeZeros(num32);
    const expectedResult = '1x2';
    expect(result).toBe(expectedResult);
  });

  test('should return string with 2 zeros', () => {
    const num32 = '1002';
    const result = codeZeros(num32);
    const expectedResult = '1y2';
    expect(result).toBe(expectedResult);
  });

  test('should return string with 3 zeros', () => {
    const num32 = '10002';
    const result = codeZeros(num32);
    const expectedResult = '1z2';
    expect(result).toBe(expectedResult);
  });

  test('should return string with 4 zeros', () => {
    const num32 = '100002';
    const result = codeZeros(num32);
    const expectedResult = '1A2';
    expect(result).toBe(expectedResult);
  });

  test('should return string with 5 zeros', () => {
    const num32 = '1000002';
    const result = codeZeros(num32);
    const expectedResult = '1B2';
    expect(result).toBe(expectedResult);
  });

  test('should return string with 9 zeros', () => {
    const num32 = '10000000002';
    const result = codeZeros(num32);
    const expectedResult = '1F2';
    expect(result).toBe(expectedResult);
  });

  test('should return string with 10 zeros', () => {
    const num32 = '100000000002';
    const result = codeZeros(num32);
    const expectedResult = '1G2';
    expect(result).toBe(expectedResult);
  });

  test('should return string with 29 zeros', () => {
    const num32 = '1000000000000000000000000000002';
    const result = codeZeros(num32);
    const expectedResult = '1Z2';
    expect(result).toBe(expectedResult);
  });

  test('should return string with 30 zeros', () => {
    const num32 = '10000000000000000000000000000002';
    const result = codeZeros(num32);
    const expectedResult = '1xw2';
    expect(result).toBe(expectedResult);
  });

  test('should return string with 1, 2, 3 zeros', () => {
    const num32 = '102003000';
    const result = codeZeros(num32);
    const expectedResult = '1x2y3z';
    expect(result).toBe(expectedResult);
  });
});
