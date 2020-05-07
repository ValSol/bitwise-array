## JavaScript Bitwise Array Class

The **Immutable** Class supports operations:

- getting, setting, unsetting and toggling of individual bits
- bitwise operations with other bitwise array such as OR, XOR and AND
- counting the number of "on" bits
- comparison of two bitwise arrays
- clearing or inverting all bits of bitwise array
- selecting of items of an ordinary array based on the "on" bits of the bitwise array

## Usage

### Install

If you're using Node.js type:

```shell
npm install --save bitwise-array
```

or

```shell
yarn add bitwise-array
```

### Require

```javascript
const { default: BitwiseArray, createBitwiseArray } = require('bitwise-array');
```

or

```javascript
import BitwiseArray, { createBitwiseArray } from 'bitwise-array';
```

### Instantiate a Class

```javascript
const a = createBitwiseArray(5); // with length of array
a.toString(); // '00000'

const b = createBitwiseArray('010011'); // with '0s & 1s" string
b.toString(); // '010011'

const c = createBitwiseArray(b); // with another bitwise array
c.toString(); // '010011'

const colors = ['RED', 'ORANGE', 'YELLOW', 'GREEN', 'BLUE', 'INDIGO', 'VIOLET'];
const selectedColors = ['GREEN', 'INDIGO', 'ORANGE'];
// with 1st arg: all items array, 2nd arg: selected items array
const d = createBitwiseArray(colors, selectedColors);
d.toString(); // '0101010'
```

or

```javascript
const a = new BitwiseArray(5); // with length of array
a.toString(); // '00000'

const b = new BitwiseArray('010011'); // with '0s & 1s" string
b.toString(); // '010011'

const c = new BitwiseArray(b); // with another bitwise array
c.toString(); // '01000'

const colors = ['RED', 'ORANGE', 'YELLOW', 'GREEN', 'BLUE', 'INDIGO', 'VIOLET'];
const selectedColors = ['GREEN', 'INDIGO', 'ORANGE'];
// with 1st arg: all items array, 2nd arg: selected items array
const d = new BitwiseArray(colors, selectedColors);
d.toString(); // '0101010'
```

## API

### Property

#### length: number

Example:

```javascript
const colors = ['RED', 'ORANGE', 'YELLOW', 'GREEN', 'BLUE', 'INDIGO', 'VIOLET'];
const selectedColors = ['GREEN', 'INDIGO', 'ORANGE'];
const a = createBitwiseArray(colors, selectedColors);
a.length; // 7
```

### Methods

#### toString(radix?: 35): string

Example:

```javascript
const a = createBitwiseArray(35);
a.toString(); // '00000000000000000000000000000000000'
a.toString(32); // '0'

const b = createBitwiseArray('00000000000000000000000000000000001');
b.toString(); // '00000000000000000000000000000000001'
b.toString(32); // '1'

const c = createBitwiseArray('00000000000000000000000000000001001');
c.toString(); // '00000000000000000000000000000001001'
c.toString(32); // '9'

const d = createBitwiseArray('00000000000000000000100000000001001');
d.toString(); // '00000000000000000000100000000001001'
d.toString(32); // 'g09'

const e = createBitwiseArray('00000010000000000000100000000001001');
e.toString(); // '00000010000000000000100000000001001'
e.toString(32); // '800g09'
```

#### set(pos: number): BitwiseArray

Example:

```javascript
const a = createBitwiseArray(35);
a.toString(); // '00000000000000000000000000000000000'

a.set(0).toString(); // '10000000000000000000000000000000000'

a.set(0).set(34).toString(); // '10000000000000000000000000000000001'

a.set(0).set(34).set(4).toString(); // '10001000000000000000000000000000001'
```

#### toggle(pos: number): BitwiseArray

Example:

```javascript
const a = createBitwiseArray(35);
a.toString(); // '00000000000000000000000000000000000'

a.toggle(0).toString(); // '10000000000000000000000000000000000'

a.toggle(0).toggle(0).toString(); // '00000000000000000000000000000000000'

a.toggle(0).toggle(0).toggle(0).toString(); // '10000000000000000000000000000000000'
```

#### get(pos: number): boolean

Example:

```javascript
const a = createBitwiseArray('10100');
a.toString(); // '10100'

a.get(0); // true
a.get(1); // false
a.get(2); // true
a.get(3); // false
a.get(4); // false
```

#### clear(): BitwiseArray

Example:

```javascript
const a = createBitwiseArray('11101');
a.toString(); // '11101'

a.clear().toString(); // '00000'
```

#### invert(): BitwiseArray

Example:

```javascript
const a = createBitwiseArray('10010');
a.toString(); // '10010'

a.invert().toString(); // '01101'
```

#### and(secondBitwiseArray: BitwiseArray): BitwiseArray

Example:

```javascript
const a = createBitwiseArray(5);
a.toString(); // '00000'

const b = a.set(0).set(2);
b.toString(); // '10100'

const c = a.set(2).set(4);
c.toString(); // '00101'

b.and(c).toString(); // '00100'
```

#### or(secondBitwiseArray: BitwiseArray): BitwiseArray

Example:

```javascript
const a = createBitwiseArray(5);
a.toString(); // '00000'

const b = a.set(0).set(2);
b.toString(); // '10100'

const c = a.set(2).set(4);
c.toString(); // '00101'

b.or(c).toString(); // '10101'
```

#### xor(secondBitwiseArray: BitwiseArray): BitwiseArray

Example:

```javascript
const a = createBitwiseArray(5);
a.toString(); // '00000'

const b = a.set(0).set(2);
b.toString(); // '10100'

const c = a.set(2).set(4);
c.toString(); // '00101'

b.xor(c).toString(); // '10001'
```

#### isEqual(secondBitwiseArray: BitwiseArray): boolean

Example:

```javascript
const a = createBitwiseArray('10100');
a.toString(); // '10100'

const b = createBitwiseArray('10100');
b.toString(); // '10100'

a.isEqual(b); // true

const c = createBitwiseArray('10110');
c.toString(); // '10110'

a.isEqual(c); // false
```

#### select(arr: Array<T>): Array<T>

Example:

```javascript
const a = createBitwiseArray(7);
a.set(1).set(3).set(5);
a.toString(); // '0101010'
const colors = ['RED', 'ORANGE', 'YELLOW', 'GREEN', 'BLUE', 'INDIGO', 'VIOLET'];

a.select(colors); // ['ORANGE', 'GREEN', 'INDIGO'];
```
