// @flow
/* eslint-env jest */

import { createBitwiseArray } from './index';

describe('createBitwiseArray util', () => {
  test('should create createBitwiseArray class with length 1', () => {
    const length = 1;
    const result = createBitwiseArray(length);
    const expectedValue = [0];
    expect(result.value).toEqual(expectedValue);
  });

  test('should create createBitwiseArray class with length 32', () => {
    const length = 32;
    const result = createBitwiseArray(length);
    const expectedValue = [0];
    expect(result.value).toEqual(expectedValue);
  });

  test('should create createBitwiseArray class with length 33', () => {
    const length = 33;
    const result = createBitwiseArray(length);
    const expectedValue = [0, 0];
    expect(result.value).toEqual(expectedValue);
  });

  test('should create createBitwiseArray class with length 64', () => {
    const length = 64;
    const result = createBitwiseArray(length);
    const expectedValue = [0, 0];
    expect(result.value).toEqual(expectedValue);
  });

  test('should create createBitwiseArray class with length 65', () => {
    const length = 65;
    const result = createBitwiseArray(length);
    const expectedValue = [0, 0, 0];
    expect(result.value).toEqual(expectedValue);
  });

  test('should create createBitwiseArray class from BitwiseArray class', () => {
    const length = 60;
    const bitwiseArray = createBitwiseArray(length);
    bitwiseArray.set(0);
    bitwiseArray.set(31);
    bitwiseArray.set(59);
    const result = createBitwiseArray(bitwiseArray);
    expect(result.length).toBe(bitwiseArray.length);
    expect(result.value).toEqual(bitwiseArray.value);
  });
});
