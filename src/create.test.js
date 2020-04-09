// @flow
/* eslint-env jest */

import { createBitwiseArray } from './index';

describe('createBitwiseArray util', () => {
  test('should create BitwiseArray class with length 1', () => {
    const length = 1;
    const result = createBitwiseArray(length);
    const expectedBuffer = new ArrayBuffer(1);
    expect(result.buffer).toEqual(expectedBuffer);
  });

  test('should create BitwiseArray class with length 32', () => {
    const length = 32;
    const result = createBitwiseArray(length);
    const expectedBuffer = new ArrayBuffer(4);
    expect(result.buffer).toEqual(expectedBuffer);
  });

  test('should create BitwiseArray class with length 33', () => {
    const length = 33;
    const result = createBitwiseArray(length);
    const expectedBuffer = new ArrayBuffer(5);
    expect(result.buffer).toEqual(expectedBuffer);
  });

  test('should create BitwiseArray class with length 64', () => {
    const length = 64;
    const result = createBitwiseArray(length);
    const expectedBuffer = new ArrayBuffer(8);
    expect(result.buffer).toEqual(expectedBuffer);
  });

  test('should create BitwiseArray class with length 65', () => {
    const length = 65;
    const result = createBitwiseArray(length);
    const expectedBuffer = new ArrayBuffer(9);
    expect(result.buffer).toEqual(expectedBuffer);
  });

  test('should create BitwiseArray class from BitwiseArray class', () => {
    const length = 60;
    const bitwiseArray = createBitwiseArray(length);
    bitwiseArray.set(0);
    bitwiseArray.set(31);
    bitwiseArray.set(59);
    const result = createBitwiseArray(bitwiseArray);
    expect(result.length).toBe(bitwiseArray.length);
    expect(result.buffer).toEqual(bitwiseArray.buffer);
  });

  test('should create BitwiseArray class from BitwiseArray class', () => {
    const colors = ['RED', 'ORANGE', 'YELLOW', 'GREEN', 'BLUE', 'INDIGO', 'VIOLET'];
    const selectedColors = ['GREEN', 'INDIGO', 'ORANGE'];
    // const result = createBitwiseArray(selectedColors, colors);
    const result = createBitwiseArray(colors, selectedColors);
    expect(colors.length).toBe(result.length);
    expect(result.toString()).toBe('0101010');
  });

  test('should return array with 1 selected item', () => {
    const days = ['', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const selectorDays = [''];
    // const result = createBitwiseArray(selectorDays, days);
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

  test('should create BitwiseArray class from ArrayBuffer', () => {
    const bitString = '001101010011';
    const buffer = createBitwiseArray(bitString).buffer;
    const result = createBitwiseArray(buffer, bitString.length);
    expect(result.length).toEqual(bitString.length);
    expect(result.toString()).toEqual(bitString);
  });

  test('should create BitwiseArray class from  radix32 string & length for long bit arrays', () => {
    let bitString = '001';
    for (let i = 0; i < 60; i += 1) {
      const length = bitString.length;
      const bitwiseArray = createBitwiseArray(bitString);
      const radix32String = bitwiseArray.toString(32);
      const result = createBitwiseArray(radix32String, length);
      expect(result).toEqual(bitwiseArray);
      bitString += '1';
    }
  });
});
