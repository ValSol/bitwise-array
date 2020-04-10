// @flow

import codeZeros from './codeZeros';
import uncodeZeros from './uncodeZeros';
import BitwiseArrayOnArrayBuffer, {
  createBitwiseArray as createBitwiseArrayOnArrayBuffer,
} from './BitwiseArrayOnArrayBuffer';
import BitwiseArrayOnBigInt, {
  createBitwiseArray as createBitwiseArrayOnBigInt,
  parseBigInt,
} from './BitwiseArrayOnBigInt';

const useBigInt = typeof window === 'object' && window.BigInt;
const createBitwiseArray = useBigInt ? createBitwiseArrayOnBigInt : createBitwiseArrayOnArrayBuffer;
const BitwiseArray = useBigInt ? BitwiseArrayOnArrayBuffer : BitwiseArrayOnArrayBuffer;

export default BitwiseArray;
export { codeZeros, uncodeZeros, createBitwiseArray, parseBigInt };
