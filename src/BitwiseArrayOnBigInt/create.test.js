// @flow
/* eslint-env jest */

import { createBitwiseArray } from './index';

describe('createBitwiseArray util', () => {
  test('should create BitwiseArray class with length 1', () => {
    const length = 1;
    const result = createBitwiseArray(length);
    const expectedValue = window.BigInt(0);
    expect(result.value).toEqual(expectedValue);
    expect(result.length).toEqual(length);
  });

  test('should create BitwiseArray class with length 32', () => {
    const length = 100;
    const result = createBitwiseArray(length);
    const expectedValue = window.BigInt(0);
    expect(result.value).toEqual(expectedValue);
    expect(result.length).toEqual(length);
  });

  test('should create BitwiseArray class from BitwiseArray class', () => {
    const length = 60;
    const bitwiseArray = createBitwiseArray(length);
    bitwiseArray.set(0);
    bitwiseArray.set(31);
    bitwiseArray.set(59);
    const result = createBitwiseArray(bitwiseArray);
    expect(result.length).toBe(bitwiseArray.length);
    expect(result.value).toEqual(bitwiseArray.value);
  });

  test('should create BitwiseArray class from BitwiseArray class', () => {
    const colors = ['RED', 'ORANGE', 'YELLOW', 'GREEN', 'BLUE', 'INDIGO', 'VIOLET'];
    const selectedColors = ['GREEN', 'INDIGO', 'ORANGE'];
    const result = createBitwiseArray(colors, selectedColors);
    expect(colors.length).toBe(result.length);
    expect(result.toString()).toBe('0101010');
  });

  test('should return array with 1 selected item', () => {
    const days = ['', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const selectorDays = [''];
    const result = createBitwiseArray(days, selectorDays);
    expect(days.length).toBe(result.length);
    expect(result.toString()).toBe('10000000');
  });

  test('should create BitwiseArray class from string', () => {
    const bitString = '001101010011';
    const result = createBitwiseArray(bitString);
    expect(result.length).toEqual(bitString.length);
    expect(result.toString()).toEqual(bitString);
  });

  test('should create BitwiseArray class from radix32 string & length', () => {
    const radix32String = 'qj'; // parseInt('001101010011', 2)
    const length = 12;
    const result = createBitwiseArray(radix32String, length);
    expect(result.length).toEqual(length);
    expect(result.toString()).toEqual('001101010011');
  });

  test('should create BitwiseArray class from BigInt', () => {
    const bigInt = window.BigInt(5);
    const length = 6;
    const result = createBitwiseArray(bigInt, length);
    expect(result.length).toEqual(length);
    expect(result.toString()).toEqual('000101');
  });

  test('should create BitwiseArray class from  radix32 string & length for long bit arrays', () => {
    let bitString = '00001';
    for (let i = 0; i < 101; i += 1) {
      const length = bitString.length;
      const bitwiseArray = createBitwiseArray(bitString);
      const radix32String = bitwiseArray.toString(32);
      const result = createBitwiseArray(radix32String, length);
      expect(result).toEqual(bitwiseArray);
      bitString += '1';
    }
  });

  test('should create BitwiseArray class from  radix32 string & length for long bit arrays', () => {
    let bitString = '0';
    for (let i = 0; i < 60; i += 1) bitString += '0';
    bitString += '1';
    const length = bitString.length;
    const bitwiseArray = createBitwiseArray(bitString);
    const radix32String = bitwiseArray.toString(32);
    const result = createBitwiseArray(radix32String, length);
    expect(result).toEqual(bitwiseArray);
  });
});
