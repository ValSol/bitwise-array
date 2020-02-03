// @flow
/* eslint-env jest */

import { createBitwiseArray } from './index';

describe('set BitwiseArray method', () => {
  test('should set 0-th bit', () => {
    const bitwiseArray = createBitwiseArray(62);
    bitwiseArray.set(0);
    expect(bitwiseArray.toString()).toEqual(
      '10000000000000000000000000000000000000000000000000000000000000',
    );
  });

  test('should set 0th & 2-th bits', () => {
    const bitwiseArray = createBitwiseArray(62);
    bitwiseArray.set(0);
    bitwiseArray.set(2);
    expect(bitwiseArray.toString()).toEqual(
      '10100000000000000000000000000000000000000000000000000000000000',
    );
  });

  test('should set 30-th & 31 bits', () => {
    const bitwiseArray = createBitwiseArray(62);
    bitwiseArray.set(30);
    bitwiseArray.set(32);
    expect(bitwiseArray.toString()).toEqual(
      '00000000000000000000000000000010100000000000000000000000000000',
    );
  });
});
