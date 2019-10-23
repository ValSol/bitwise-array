// @flow
/* eslint-env jest */

import { createBitwiseArray } from './index';

describe('set BitwiseArray method', () => {
  test('should set 0-th bit', () => {
    const bitwiseArray = createBitwiseArray(62);
    bitwiseArray.set(0);
    const expectedValue = [1, 0];
    expect(bitwiseArray.value).toEqual(expectedValue);
  });

  test('should set 0th & 2-th bits', () => {
    const bitwiseArray = createBitwiseArray(62);
    bitwiseArray.set(0);
    bitwiseArray.set(2);
    const expectedValue = [5, 0];
    expect(bitwiseArray.value).toEqual(expectedValue);
  });

  test('should set 30-th & 31 bits', () => {
    const bitwiseArray = createBitwiseArray(62);
    bitwiseArray.set(30);
    bitwiseArray.set(32);
    const expectedValue = [2 ** 30, 1];
    expect(bitwiseArray.value).toEqual(expectedValue);
  });
});
