# JavaScript Sort (`JS Sort`)

Visual Studio Code extension to deeply sort the keys within a JavaScript object.

## Usage

1. Select a JavaScript object including the curly brackets (not a JSON object)
2. Run the extension (`JS Sort`)

   - `CMD+SHIFT+P` and search for `JS Sort`
   - Right Click on the highlighted code. `JS Sort` will appear at the top of the `Modification` group.
   - `CTRL+OPTION+COMMAND+S` (mac)
   - `CTRL+ALT+WINDOWS+S` (windows)

3. All keys at each level will be sorted
4. It may be necessary to reformat the document

### **Note**

The context menu and keyboard shortcuts are only active for JavaScript and TypeScript.

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

### 0.0.5

Initial release

### 0.0.6

Add JS Sort to the top of the modification group context menu.
Add a keyboard shortcut.

### 0.0.7

Changed the keyboard shortcut as it conflicted with Mac Keeper.

### 0.0.8

Updated the readme for the keyboard shortcut.

### 0.0.9

Added support for typescript.

---

**Enjoy!**
