// @flow
/* eslint-env jest */

import { createBitwiseArray } from './index';

describe('xor BitwiseArray method', () => {
  test('should return bitwise OR of 2 bitwiseArrays', () => {
    const bitwiseArray = createBitwiseArray(4).set(2).set(3);
    const bitwiseArray2 = createBitwiseArray(4).set(1).set(3);
    const result = bitwiseArray.xor(bitwiseArray2);
    expect(result.toString()).toEqual('0110');

    const a = createBitwiseArray(35);
    console.log('a.toString() =', a.toString()); // '00000000000000000000000000000000000'
    console.log('a.toString(32) =', a.toString(32)); // '0'
    a.set(34);
    console.log('a.set(34) =');
    console.log('a.toString() =', a.set(34).toString()); // '00000000000000000000000000000000001'
    console.log('a.toString(32) =', a.set(34).toString(32)); // '1'
    a.set(30);
    console.log('a.set(31) =');
    console.log('a.toString() =', a.set(34).set(31).toString()); // '00000000000000000000000000000000000'
    console.log('a.toString(32) =', a.set(34).set(31).toString(32)); // '1'
    a.set(20);
    console.log('a.set(20) =');
    console.log('a.toString() =', a.set(34).set(31).set(20).toString()); // '00000000000000000000000000000000000'
    console.log('a.toString(32) =', a.set(34).set(31).set(20).toString(32)); // '1'
    a.set(4);
    console.log('a.set(6) =');
    console.log('a.toString() =', a.set(34).set(31).set(20).set(6).toString()); // '00001000000000000000000000000000001'
    console.log('a.toString(32) =', a.set(34).set(31).set(20).set(6).toString(32)); // '1'
  });
});
