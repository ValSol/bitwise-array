// @flow
/* eslint-env jest */

import { createBitwiseArray } from './index';

describe('clear BitwiseArray method', () => {
  test('should return clear BitwiseArray', () => {
    const length = 62;
    const bitwiseArray = createBitwiseArray(length);
    const result = bitwiseArray.set(0).set(1).set(32).set(35).clear();
    const expectedValue = window.BigInt(0);
    expect(result.length).toEqual(length);
    expect(result.value).toEqual(expectedValue);
  });
});
