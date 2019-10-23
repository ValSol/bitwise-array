// @flow
/* eslint-env jest */

import { createBitwiseArray } from './index';

describe('unset BitwiseArray method', () => {
  test('should unset 0-th bit', () => {
    const bitwiseArray = createBitwiseArray(62);
    bitwiseArray.set(0);
    bitwiseArray.unset(0);
    const expectedValue = [0, 0];
    expect(bitwiseArray.value).toEqual(expectedValue);
  });

  test('should unset 2-th bit', () => {
    const bitwiseArray = createBitwiseArray(62);
    bitwiseArray.set(0);
    bitwiseArray.set(2);
    bitwiseArray.unset(2);
    const expectedValue = [1, 0];
    expect(bitwiseArray.value).toEqual(expectedValue);
  });

  test('should unset 30-th && 32-th bit', () => {
    const bitwiseArray = createBitwiseArray(62);
    bitwiseArray.set(30);
    bitwiseArray.set(32);
    bitwiseArray.unset(32);
    const expectedValue = [2 ** 30, 0];
    expect(bitwiseArray.value).toEqual(expectedValue);
  });
});
