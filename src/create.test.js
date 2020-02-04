// @flow
/* eslint-env jest */

import { createBitwiseArray } from './index';

describe('createBitwiseArray util', () => {
  test('should create BitwiseArray class with length 1', () => {
    const length = 1;
    const result = createBitwiseArray(length);
    const expectedValue = new ArrayBuffer(1);
    expect(result.buffer).toEqual(expectedValue);
  });

  test('should create BitwiseArray class with length 32', () => {
    const length = 32;
    const result = createBitwiseArray(length);
    const expectedValue = new ArrayBuffer(4);
    expect(result.buffer).toEqual(expectedValue);
  });

  test('should create BitwiseArray class with length 33', () => {
    const length = 33;
    const result = createBitwiseArray(length);
    const expectedValue = new ArrayBuffer(5);
    expect(result.buffer).toEqual(expectedValue);
  });

  test('should create BitwiseArray class with length 64', () => {
    const length = 64;
    const result = createBitwiseArray(length);
    const expectedValue = new ArrayBuffer(8);
    expect(result.buffer).toEqual(expectedValue);
  });

  test('should create BitwiseArray class with length 65', () => {
    const length = 65;
    const result = createBitwiseArray(length);
    const expectedValue = new ArrayBuffer(9);
    expect(result.buffer).toEqual(expectedValue);
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
});
