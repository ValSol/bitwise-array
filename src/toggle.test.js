// @flow
/* eslint-env jest */

import { createBitwiseArray } from './index';

describe('toggle BitwiseArray method', () => {
  test('should toggle 0-th bit', () => {
    const bitwiseArray = createBitwiseArray(62);
    bitwiseArray.toggle(0);
    bitwiseArray.toggle(0);
    const expectedValue = new ArrayBuffer(8);
    expect(bitwiseArray.buffer).toEqual(expectedValue);
  });

  test('should toggle 2-th bit', () => {
    const bitwiseArray = createBitwiseArray(62);
    bitwiseArray.toggle(0);
    bitwiseArray.toggle(2);
    bitwiseArray.toggle(2);
    expect(bitwiseArray.toString()).toEqual(
      '10000000000000000000000000000000000000000000000000000000000000',
    );
  });

  test('should toggle 30-th & 32-th bit', () => {
    const bitwiseArray = createBitwiseArray(62);
    bitwiseArray.toggle(30);
    bitwiseArray.toggle(32);
    bitwiseArray.toggle(32);
    expect(bitwiseArray.toString()).toEqual(
      '00000000000000000000000000000010000000000000000000000000000000',
    );
  });
});
