// @flow
/* eslint-env jest */

import { createBitwiseArray } from './index';

describe('clear BitwiseArray method', () => {
  test('should return clear BitwiseArray', () => {
    const bitwiseArray = createBitwiseArray(62);
    bitwiseArray.set(0);
    bitwiseArray.set(1);
    bitwiseArray.set(32);
    bitwiseArray.set(35);
    bitwiseArray.clear();
    const expectedValue = [0, 0];
    expect(bitwiseArray.value).toEqual(expectedValue);
  });
});
