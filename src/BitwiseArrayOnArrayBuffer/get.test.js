// @flow
/* eslint-env jest */

import { createBitwiseArray } from './index';

describe('get BitwiseArray method', () => {
  test('should get 0-th bit', () => {
    const bitwiseArray = createBitwiseArray(62);
    expect(bitwiseArray.get(0)).toBe(false);
    const bitwiseArray2 = bitwiseArray.set(0);
    expect(bitwiseArray2.get(0)).toBe(true);
  });

  test('should get 2-th bit', () => {
    const bitwiseArray = createBitwiseArray(62);
    expect(bitwiseArray.get(2)).toBe(false);
    const bitwiseArray2 = bitwiseArray.set(2).set(0);
    expect(bitwiseArray2.get(2)).toBe(true);
  });

  test('should get 33-th & 61-th bit', () => {
    const bitwiseArray = createBitwiseArray(62);
    expect(bitwiseArray.get(33)).toBe(false);
    expect(bitwiseArray.get(61)).toBe(false);
    const bitwiseArray2 = bitwiseArray.set(33).set(61);
    expect(bitwiseArray2.get(33)).toBe(true);
    expect(bitwiseArray2.get(61)).toBe(true);
  });
});
