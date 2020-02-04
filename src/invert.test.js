// @flow
/* eslint-env jest */

import { createBitwiseArray } from './index';

describe('invert BitwiseArray method', () => {
  test('should return invert empty BitwiseArray', () => {
    const bitwiseArray = createBitwiseArray(35).invert();
    const expectedString = '11111111111111111111111111111111111';
    expect(bitwiseArray.toString()).toEqual(expectedString);
  });

  test('should return invert BitwiseArray', () => {
    const bitwiseArray = createBitwiseArray(35)
      .set(0)
      .set(1)
      .set(31)
      .set(34)
      .invert();
    const expectedString = '00111111111111111111111111111110110';
    expect(bitwiseArray.toString()).toEqual(expectedString);
  });

  test('should return invert empty BitwiseArray', () => {
    const bitwiseArray = createBitwiseArray(3).invert();
    const expectedString = '111';
    expect(bitwiseArray.toString()).toBe(expectedString);
    const expectView = 2 ** 31 + 2 ** 30 + 2 ** 29;
    expect(bitwiseArray.view[0]).toEqual(expectView);
  });
});
