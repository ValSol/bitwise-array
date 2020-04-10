// @flow
/* eslint-env jest */

import { createBitwiseArray } from './index';

describe('count BitwiseArray method', () => {
  test('should return count 0', () => {
    const bitwiseArray = createBitwiseArray(64);
    expect(bitwiseArray.count()).toBe(0);
  });

  test('should return count 1', () => {
    const bitwiseArray = createBitwiseArray(64).set(0);
    expect(bitwiseArray.count()).toBe(1);
  });

  test('should return count 2', () => {
    const bitwiseArray = createBitwiseArray(64).set(1).set(31);
    expect(bitwiseArray.count()).toBe(2);
  });

  test('should return count 3', () => {
    const bitwiseArray = createBitwiseArray(64).set(3).set(32).set(63);
    expect(bitwiseArray.count()).toBe(3);
  });
});
