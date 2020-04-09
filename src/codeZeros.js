// @flow

const code = (num30: string): string => {
  let result = '';
  for (let i = 0; i < num30.length; i += 1) {
    if (num30.charCodeAt(i) < '4'.charCodeAt(0)) {
      result += String.fromCharCode(num30.charCodeAt(i) + 'w'.charCodeAt(0) - '0'.charCodeAt(0));
    } else if (num30.charCodeAt(i) < ':'.charCodeAt(0)) {
      result += String.fromCharCode(num30.charCodeAt(i) + 'A'.charCodeAt(0) - '4'.charCodeAt(0));
    } else {
      result += String.fromCharCode(num30.charCodeAt(i) + 'G'.charCodeAt(0) - 'a'.charCodeAt(0));
    }
  }
  return result;
};

const codeZeros = (num32: string): string => {
  let count = 0;
  let result = '';
  for (let i = 0; i < num32.length; i += 1) {
    if (num32[i] === '0') {
      count += 1;
    } else {
      if (count) {
        result += code(count.toString(30));
        count = 0;
      }
      result += num32[i];
    }
  }
  if (count) {
    result += code(count.toString(30));
  }
  return result;
};

export default codeZeros;
