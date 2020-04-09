// @flow

const code = (num: string): string => {
  let num30 = '';
  for (let i = 0; i < num.length; i += 1) {
    if (num.charCodeAt(i) > 'v'.charCodeAt(0)) {
      num30 += String.fromCharCode(num.charCodeAt(i) + '0'.charCodeAt(0) - 'w'.charCodeAt(0));
    } else if (num.charCodeAt(i) < 'G'.charCodeAt(0)) {
      num30 += String.fromCharCode(num.charCodeAt(i) + '4'.charCodeAt(0) - 'A'.charCodeAt(0));
    } else {
      num30 += String.fromCharCode(num.charCodeAt(i) + 'a'.charCodeAt(0) - 'G'.charCodeAt(0));
    }
  }

  const count = parseInt(num30, 30);

  let result = '0';
  while (result.length < count) result += '0';

  return result;
};

const uncodeZeros = (num: string): string => {
  let subNum = '';
  let result = '';
  for (let i = 0; i < num.length; i += 1) {
    if (
      num.charCodeAt(i) > 'v'.charCodeAt(0) ||
      (num.charCodeAt(i) > '@'.charCodeAt(0) && num.charCodeAt(i) < '['.charCodeAt(0))
    ) {
      subNum += num[i];
    } else {
      if (subNum) {
        result += code(subNum);
        subNum = '';
      }
      result += num[i];
    }
  }
  if (subNum) {
    result += code(subNum);
  }
  return result;
};

export default uncodeZeros;
