// @flow
/* eslint-env jest */

import { createBitwiseArray } from './index';

describe('set BitwiseArray method', () => {
  test('should set 0-th bit', () => {
    const bitwiseArray = createBitwiseArray(62);
    expect(bitwiseArray.set(0).toString()).toEqual(
      '10000000000000000000000000000000000000000000000000000000000000',
    );
  });

  test('should set 0th & 2-th bits', () => {
    const bitwiseArray = createBitwiseArray(62);
    expect(bitwiseArray.set(0).set(2).toString()).toEqual(
      '10100000000000000000000000000000000000000000000000000000000000',
    );
  });

  test('should set 30-th & 31 bits', () => {
    const bitwiseArray = createBitwiseArray(62);
    expect(bitwiseArray.set(30).set(32).toString()).toEqual(
      '00000000000000000000000000000010100000000000000000000000000000',
    );
  });
});
