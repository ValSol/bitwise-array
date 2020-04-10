// @flow
/* eslint-env jest */

import { createBitwiseArray } from './index';

describe('unset BitwiseArray method', () => {
  test('should unset 0-th bit', () => {
    const bitwiseArray = createBitwiseArray(62).set(0).unset(0);
    const expectedValue = window.BigInt(0);
    expect(bitwiseArray.value).toEqual(expectedValue);
  });

  test('should unset 2-th bit', () => {
    const bitwiseArray = createBitwiseArray(62).set(0).set(2).unset(2);
    expect(bitwiseArray.toString()).toEqual(
      '10000000000000000000000000000000000000000000000000000000000000',
    );
  });

  test('should unset 30-th && 32-th bit', () => {
    const bitwiseArray = createBitwiseArray(62).unset(2).set(30).set(32).unset(32);
    expect(bitwiseArray.toString()).toEqual(
      '00000000000000000000000000000010000000000000000000000000000000',
    );
  });
});
