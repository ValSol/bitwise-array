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
a.set(1);
a.toString(); // '01000'

const b = createBitwiseArray(a); // with another bitwise array
b.toString(); // '01000'

const colors = ['RED', 'ORANGE', 'YELLOW', 'GREEN', 'BLUE', 'INDIGO', 'VIOLET'];
const selectedColors = ['GREEN', 'INDIGO', 'ORANGE'];
// with 1st arg: all items array, 2nd arg: selected items array
const c = createBitwiseArray(colors, selectedColors);
c.toString(); // '0101010'

const d = createBitwiseArray('010011'); // with '0s & 1s" string
d.toString(); // '010011'
```

or

```javascript
const a = new BitwiseArray(5); // with length of array
a.toString(); // '00000'
a.set(1);
a.toString(); // '01000'

const b = new BitwiseArray(a); // with another bitwise array
b.toString(); // '01000'

const colors = ['RED', 'ORANGE', 'YELLOW', 'GREEN', 'BLUE', 'INDIGO', 'VIOLET'];
const selectedColors = ['GREEN', 'INDIGO', 'ORANGE'];
// with 1st arg: all items array, 2nd arg: selected items array
const c = new BitwiseArray(colors, selectedColors);
c.toString(); // '0101010'

const d = new BitwiseArray('010011'); // with '0s & 1s" string
d.toString(); // '010011'
```

## API

### Property

#### length: number

Example:

```javascript
const colors = ['RED', 'ORANGE', 'YELLOW', 'GREEN', 'BLUE', 'INDIGO', 'VIOLET'];
const selectedColors = ['GREEN', 'INDIGO', 'ORANGE'];
const c = createBitwiseArray(colors, selectedColors);
c.length; // 7
```

### Methods

#### toString(): string

Example:

```javascript
const a = createBitwiseArray(5);

a.toString(); // '00000'
```

#### set(pos: number): BitwiseArray

Example:

```javascript
const a = createBitwiseArray(35);
a.toString(); // '00000000000000000000000000000000000'

a.set(0);
a.toString(); // '10000000000000000000000000000000000'

a.set(34);
a.toString(); // '10000000000000000000000000000000001'

a.set(4);
a.toString(); // '10001000000000000000000000000000001'
```

#### toggle(pos: number): BitwiseArray

Example:

```javascript
const a = createBitwiseArray(35);
a.toString(); // '00000000000000000000000000000000000'

a.toggle(0);
a.toString(); // '10000000000000000000000000000000000'

a.toggle(0);
a.toString(); // '00000000000000000000000000000000000'

a.toggle(0);
a.toString(); // '10000000000000000000000000000000000'
```

#### get(pos: number): boolean

Example:

```javascript
const a = createBitwiseArray(35);
a.toString(); // '00000000000000000000000000000000000'

a.get(0); // false

a.set(0);
a.toString(); // '10000000000000000000000000000000000'

a.get(0); // true
```

#### clear(): BitwiseArray

Example:

```javascript
const a = createBitwiseArray(5);
a.toString(); // '00000'
a.set(0).set(3);
a.toString(); // '10010'

a.clear();
a.toString(); // '00000'
```

#### invert(): BitwiseArray

Example:

```javascript
const a = createBitwiseArray(5);
a.toString(); // '00000'
a.set(0).set(3);
a.toString(); // '10010'

a.invert();
a.toString(); // '01101'
```

#### and(secondBitwiseArray: BitwiseArray): BitwiseArray

Example:

```javascript
const a = createBitwiseArray(5);
a.toString(); // '00000'
a.set(0).set(2);
a.toString(); // '10100'
const b = createBitwiseArray(5);
b.set(2).set(4);
b.toString(); // '00101'

a.and(b);
a.toString(); // '00100'
```

#### or(secondBitwiseArray: BitwiseArray): BitwiseArray

Example:

```javascript
const a = createBitwiseArray(5);
a.toString(); // '00000'
a.set(0).set(2);
a.toString(); // '10100'
const b = createBitwiseArray(5);
b.set(2).set(4);
b.toString(); // '00101'

a.or(b);
a.toString(); // '10101'
```

#### xor(secondBitwiseArray: BitwiseArray): BitwiseArray

Example:

```javascript
const a = createBitwiseArray(5);
a.toString(); // '00000'
a.set(0).set(2);
a.toString(); // '10100'
const b = createBitwiseArray(5);
b.set(2).set(4);
b.toString(); // '00101'

a.xor(b);
a.toString(); // '10001'
```

#### isEqual(secondBitwiseArray: BitwiseArray): boolean

Example:

```javascript
const a = createBitwiseArray(5);
a.set(0).set(2);
a.toString(); // '10100'
const b = createBitwiseArray(5);
b.set(2).set(0);
b.toString(); // '10100'

a.isEqual(b); // true

b.set(3);
b.toString(); // '10110'

a.isEqual(b); // false
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
