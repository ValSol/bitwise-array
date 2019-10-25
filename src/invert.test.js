// @flow
/* eslint-env jest */

import { createBitwiseArray } from './index';

describe('invert BitwiseArray method', () => {
  test('should return invert empty BitwiseArray', () => {
    const bitwiseArray = createBitwiseArray(35);
    bitwiseArray.invert();
    const expectedString = '11111111111111111111111111111111111';
    expect(bitwiseArray.toString()).toEqual(expectedString);
    expect(bitwiseArray.value[1]).toEqual(7);
  });

  test('should return invert BitwiseArray', () => {
    const bitwiseArray = createBitwiseArray(35);
    bitwiseArray.set(0);
    bitwiseArray.set(1);
    bitwiseArray.set(31);
    bitwiseArray.set(34);
    bitwiseArray.invert();
    const expectedString = '00111111111111111111111111111110110';
    expect(bitwiseArray.toString()).toEqual(expectedString);
  });
});
