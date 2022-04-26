# JavaScript Sort

Visual Studio Code extension to deeply sort the keys within a JavaScript object.

## Usage

- Select a JavaScript object including the curly brackets (not a JSON object)
- Run the extension
- All keys at each level will be sorted

## Features

### **Object Property Value Shorthand**

Object Property Value Shorthand keys can be sorted along with traditional key/value pairs.

    const someObject = {
        someKey3: 'someValue3',
        someShorthandKey,
        someKey2: 'someValue2',
    }

becomes

    const someObject = {
        someKey2: 'someValue2',
        someKey3: 'someValue3',
        someShorthandKey,
    }

### **Spread Operator**

Spread Operators are assumed to be the first keys in an object and will be left in their original position.

    const someObject = {
        ...zzzSomeSpread,
        ...aaaSomeSpread,
        someShorthandKey,
        someKey: 'someValue',
    }

becomes

    const someObject = {
        ...zzzSomeSpread,
        ...aaaSomeSpread,
        someKey: 'someValue',
        someShorthandKey,
    }

### **Single Line Comments**

Single line comments will be kept with the following key.

    const someObject = {
        someKey2: 'someValue2',
        // Single line comment for someKey1
        someKey1: 'someValue1',
    }

becomes

    const someObject = {
        // Single line comment for someKey1
        someKey1: 'someValue1',
        someKey2: 'someValue2',
    }

## Requirements

No requirements.

## Known Issues

Inline and multiline comments are not currently supported

## Release Notes

### 0.0.4

Initial release

---

**Enjoy!**
