## JavaScript Bitwise Array Class

The Class supports:

- getting, setting and toggling of individual bits
- bitwise operations with other bit array such as OR and AND
- counting the number of "on" bits

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
const c = createBitwiseArray(selectedColors, colors); // with 1 - selected items array, 2 - all items array
c.toString(); // '0101010'
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
const c = new BitwiseArray(selectedColors, colors); // with 1 - selected items array, 2 - all items array
c.toString(); // '0101010'
```
