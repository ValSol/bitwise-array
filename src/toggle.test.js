// @flow
/* eslint-env jest */

import { createBitwiseArray } from './index';

describe('toggle BitwiseArray method', () => {
  test('should toggle 0-th bit', () => {
    const bitwiseArray = createBitwiseArray(62);
    bitwiseArray.toggle(0);
    bitwiseArray.toggle(0);
    const expectedValue = [0, 0];
    expect(bitwiseArray.value).toEqual(expectedValue);
  });

  test('should toggle 2-th bit', () => {
    const bitwiseArray = createBitwiseArray(62);
    bitwiseArray.toggle(0);
    bitwiseArray.toggle(2);
    bitwiseArray.toggle(2);
    const expectedValue = [1, 0];
    expect(bitwiseArray.value).toEqual(expectedValue);
  });

  test('should toggle 30-th & 32-th bit', () => {
    const bitwiseArray = createBitwiseArray(62);
    bitwiseArray.toggle(30);
    bitwiseArray.toggle(32);
    bitwiseArray.toggle(32);
    const expectedValue = [2 ** 30, 0];
    expect(bitwiseArray.value).toEqual(expectedValue);
  });
});
