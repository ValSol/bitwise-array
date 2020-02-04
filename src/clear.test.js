// @flow
/* eslint-env jest */

import { createBitwiseArray } from './index';

describe('clear BitwiseArray method', () => {
  test('should return clear BitwiseArray', () => {
    const bitwiseArray = createBitwiseArray(62);
    const result = bitwiseArray
      .set(0)
      .set(1)
      .set(32)
      .set(35)
      .clear();
    const expectedBuffer = new ArrayBuffer(8);
    expect(result.buffer).toEqual(expectedBuffer);
  });
});
