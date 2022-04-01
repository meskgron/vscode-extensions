/* eslint-disable @typescript-eslint/naming-convention */
import { it } from 'mocha';
import { expect } from 'chai';
import {
  convertJavascriptObjectStringToJson,
  convertSelectedTextToJson,
} from '../convertToJson';

describe('convertJavascriptObjectStringToJson', () => {
  it('empty Object', () => {
    // Arrange
    const selectedText = '{}';

    // Act
    const jsonString = convertJavascriptObjectStringToJson(selectedText);

    // Assert
    expect(jsonString).to.equal('{}');
  });

  it('single key', () => {
    // Arrange
    const selectedText = '{ someKey: "someValue"}';

    // Act
    const jsonString = convertJavascriptObjectStringToJson(selectedText);

    // Assert
    expect(jsonString).to.equal(`{
"someKey": "someValue"}`);
  });

  it('single key with variable value', () => {
    // Arrange
    const selectedText = '{ someKey: SomeEnum.SomeValue }';

    // Act
    const jsonString = convertJavascriptObjectStringToJson(selectedText);

    // Assert
    expect(jsonString).to.equal(`{
"someKey": "__VARIABLE_VALUE__SomeEnum.SomeValue" }`);
  });

  it('key in shorthand', () => {
    // Arrange
    const selectedText = `{ 
      someKey,
    }`;

    // Act
    const jsonString = convertJavascriptObjectStringToJson(selectedText);

    // Assert
    expect(jsonString).to.equal(`{
"someKey": "__DUMMY_VALUE__" 
    }`);
  });

  it('spread operator', () => {
    // Arrange
    const selectedText = `{ 
      ...someSpread,
    }`;

    // Act
    const jsonString = convertJavascriptObjectStringToJson(selectedText);

    // Assert
    expect(jsonString).to.equal(`{ 
"___1someSpread": "__DUMMY_SPREAD_VALUE__" 
    }`);
  });

  it('array', () => {
    // Arrange
    const selectedText = `{ 
      someArray: ["b", "a"],
    }`;

    // Act
    const jsonString = convertJavascriptObjectStringToJson(selectedText);

    // Assert
    expect(jsonString).to.equal(`{
"someArray": ["b", "a"]
    }`);
  });

  it('three shorthand keys', () => {
    // Arrange
    const selectedText = `{ 
      someKey1,
      someKey2,
      someKey3,
    }`;

    // Act
    const jsonString = convertJavascriptObjectStringToJson(selectedText);

    // Assert
    expect(jsonString).to.equal(`{
"someKey1": "__DUMMY_VALUE__",
"someKey2": "__DUMMY_VALUE__",
"someKey3": "__DUMMY_VALUE__" 
    }`);
  });

  it('three spread operators', () => {
    // Arrange
    const selectedText = `{ 
      ...someSpreada,
      ...someSpreadb,
      ...someSpreadc,
    }`;

    // Act
    const jsonString = convertJavascriptObjectStringToJson(selectedText);

    // Assert
    expect(jsonString).to.equal(`{ 
"___1someSpreada": "__DUMMY_SPREAD_VALUE__", 
"___2someSpreadb": "__DUMMY_SPREAD_VALUE__", 
"___3someSpreadc": "__DUMMY_SPREAD_VALUE__" 
    }`);
  });

  it('3 levels of nested objects', () => {
    // Arrange
    const selectedText = `{
      someKey3: 'someValue3',
      someKey1: 'someValue1',
      someKey2: {
        someNestedKey6: 'someNestedValue6',
        someNestedKey4: {
          someNestedKey9: 'someNestedValue9',
          someNestedKey7: 'someNestedValue7',
          someNestedKey8: 'someNestedValue8',
        },
        someNestedKey5: 'someNestedValue5',
      },
    }`;

    // Act
    const jsonString = convertJavascriptObjectStringToJson(selectedText);

    // Assert
    expect(jsonString).to.equal(`{
"someKey3": "someValue3",
"someKey1": "someValue1",
"someKey2": {
"someNestedKey6": "someNestedValue6",
"someNestedKey4": {
"someNestedKey9": "someNestedValue9",
"someNestedKey7": "someNestedValue7",
"someNestedKey8": "someNestedValue8"
        },
"someNestedKey5": "someNestedValue5"
      }
    }`);
  });

  it('complex example', () => {
    // Arrange
    const selectedText = `{
      b: {
        ...zzzSomeSpread,
        ...aaaSomeSpread,
        someShortHand,
        someKey: SomeEnum.SomeValue,
        d: "fred",
        g: ["m", 2, "j", { q: 3, h: 2 }],
        c: "mary",
      },
      a: "john",
    }`;

    // Act
    const jsonString = convertJavascriptObjectStringToJson(selectedText);

    // Assert
    expect(jsonString).to.equal(`{
"b": {
"___1zzzSomeSpread": "__DUMMY_SPREAD_VALUE__", 
"___2aaaSomeSpread": "__DUMMY_SPREAD_VALUE__",
"someShortHand": "__DUMMY_VALUE__",
"someKey": "__VARIABLE_VALUE__SomeEnum.SomeValue",
"d": "fred",
"g": ["m", 2, "j", {
"q": "__VARIABLE_VALUE__3",
"h": "__VARIABLE_VALUE__2" }],
"c": "mary"
      },
"a": "john"
    }`);
  });
});

describe('convertSelectedTextToJson', () => {
  it('empty Object', () => {
    // Arrange
    const selectedText = '{}';

    // Act
    const jsonString = convertSelectedTextToJson(selectedText);

    // Assert
    expect(jsonString).to.eql({});
  });

  it('single key', () => {
    // Arrange
    const selectedText = '{ someKey: "someValue"}';

    // Act
    const jsonString = convertSelectedTextToJson(selectedText);

    // Assert
    expect(jsonString).to.eql({ someKey: 'someValue' });
  });

  it('key in shorthand', () => {
    // Arrange
    const selectedText = `{ 
      someKey,
    }`;

    // Act
    const jsonString = convertSelectedTextToJson(selectedText);

    // Assert
    expect(jsonString).to.eql({ someKey: '__DUMMY_VALUE__' });
  });

  it('spread operator', () => {
    // Arrange
    const selectedText = `{ 
"___1someSpread": "__DUMMY_SPREAD_VALUE__" 
    }`;

    // Act
    const jsonString = convertSelectedTextToJson(selectedText);

    // Assert
    expect(jsonString).to.eql({ ___1someSpread: '__DUMMY_SPREAD_VALUE__' });
  });

  it('array', () => {
    // Arrange
    const selectedText = `{
"someArray": ["b", "a"]
    }`;

    // Act
    const jsonString = convertSelectedTextToJson(selectedText);

    // Assert
    expect(jsonString).to.eql({ someArray: ['b', 'a'] });
  });

  it('three shorthand keys', () => {
    // Arrange
    const selectedText = `{ 
      someKey1,
      someKey2,
      someKey3,
    }`;

    // Act
    const jsonString = convertSelectedTextToJson(selectedText);

    // Assert
    expect(jsonString).to.eql({
      someKey1: '__DUMMY_VALUE__',
      someKey2: '__DUMMY_VALUE__',
      someKey3: '__DUMMY_VALUE__',
    });
  });

  it('three spread operators', () => {
    // Arrange
    const selectedText = `{ 
"___1someSpreada": "__DUMMY_SPREAD_VALUE__", 
"___2someSpreadb": "__DUMMY_SPREAD_VALUE__", 
"___3someSpreadc": "__DUMMY_SPREAD_VALUE__" 
    }`;

    // Act
    const jsonString = convertSelectedTextToJson(selectedText);

    // Assert
    expect(jsonString).to.eql({
      ___1someSpreada: '__DUMMY_SPREAD_VALUE__',
      ___2someSpreadb: '__DUMMY_SPREAD_VALUE__',
      ___3someSpreadc: '__DUMMY_SPREAD_VALUE__',
    });
  });

  it('3 levels of nested objects', () => {
    // Arrange
    const selectedText = `{
"someKey3": "someValue3",
"someKey1": "someValue1",
"someKey2": {
"someNestedKey6": "someNestedValue6",
"someNestedKey4": {
"someNestedKey9": "someNestedValue9",
"someNestedKey7": "someNestedValue7",
"someNestedKey8": "someNestedValue8"
        },
"someNestedKey5": "someNestedValue5"
      }
    }`;

    // Act
    const jsonString = convertSelectedTextToJson(selectedText);

    // Assert
    expect(jsonString).to.eql({
      someKey3: 'someValue3',
      someKey1: 'someValue1',
      someKey2: {
        someNestedKey6: 'someNestedValue6',
        someNestedKey4: {
          someNestedKey9: 'someNestedValue9',
          someNestedKey7: 'someNestedValue7',
          someNestedKey8: 'someNestedValue8',
        },
        someNestedKey5: 'someNestedValue5',
      },
    });
  });

  it('complex example', () => {
    // Arrange
    const selectedText = `{
"b": {
"___1zzzSomeSpread": "__DUMMY_SPREAD_VALUE__", 
"___2aaaSomeSpread": "__DUMMY_SPREAD_VALUE__",
"someShortHand": "__DUMMY_VALUE__",
"d": "fred",
"g": ["m", 2, "j", {
"q": 3,
"h": 2 }],
"c": "mary"
      },
"a": "john"
    }`;

    // Act
    const jsonString = convertSelectedTextToJson(selectedText);

    // Assert
    expect(jsonString).to.eql({
      b: {
        ___1zzzSomeSpread: '__DUMMY_SPREAD_VALUE__',
        ___2aaaSomeSpread: '__DUMMY_SPREAD_VALUE__',
        someShortHand: '__DUMMY_VALUE__',
        d: 'fred',
        g: ['m', 2, 'j', { q: 3, h: 2 }],
        c: 'mary',
      },
      a: 'john',
    });
  });
});
