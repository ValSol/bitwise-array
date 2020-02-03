// @flow
/* eslint-env jest */

import { createBitwiseArray } from './index';

describe('unset BitwiseArray method', () => {
  test('should unset 0-th bit', () => {
    const bitwiseArray = createBitwiseArray(62);
    bitwiseArray.set(0);
    bitwiseArray.unset(0);
    const expectedValue = new ArrayBuffer(8);
    expect(bitwiseArray.value).toEqual(expectedValue);
  });

  test('should unset 2-th bit', () => {
    const bitwiseArray = createBitwiseArray(62);
    bitwiseArray.set(0);
    bitwiseArray.set(2);
    bitwiseArray.unset(2);
    expect(bitwiseArray.toString()).toEqual(
      '10000000000000000000000000000000000000000000000000000000000000',
    );
  });

  test('should unset 30-th && 32-th bit', () => {
    const bitwiseArray = createBitwiseArray(62);
    bitwiseArray.unset(2);
    bitwiseArray.set(30);
    bitwiseArray.set(32);
    bitwiseArray.unset(32);
    expect(bitwiseArray.toString()).toEqual(
      '00000000000000000000000000000010000000000000000000000000000000',
    );
  });
});
