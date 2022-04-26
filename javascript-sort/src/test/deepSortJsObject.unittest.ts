/* eslint-disable @typescript-eslint/naming-convention */
import { it } from 'mocha';
import { expect } from 'chai';
import deepSortJsObject from '../deepSortJsObject';

describe('deepSortJsObject', () => {
  it('empty Object', () => {
    // Arrange
    const unOrderedObject = {};

    // Act
    const orderedObject = deepSortJsObject(unOrderedObject);

    // Assert
    expect(JSON.stringify(orderedObject)).to.equal(JSON.stringify({}));
  });

  it('single key', () => {
    // Arrange
    const unOrderedObject: any = { someKey: 'someValue' };

    // Act
    const orderedObject: any = deepSortJsObject(unOrderedObject);

    // Assert
    const expected = JSON.stringify({ someKey: 'someValue' });
    expect(JSON.stringify(orderedObject)).to.equal(expected);
  });

  it('key in shorthand', () => {
    // Arrange
    const unOrderedObject: any = { someKey: '__DUMMY_VALUE__' };

    // Act
    const orderedObject: any = deepSortJsObject(unOrderedObject);

    // Assert
    const expected = JSON.stringify({ someKey: '__DUMMY_VALUE__' });
    expect(JSON.stringify(orderedObject)).to.equal(expected);
  });

  it('spread operator', () => {
    // Arrange
    const unOrderedObject: any = { ___1someSpread: '__DUMMY_SPREAD_VALUE__' };

    // Act
    const orderedObject: any = deepSortJsObject(unOrderedObject);

    // Assert
    const expected = JSON.stringify({
      ___1someSpread: '__DUMMY_SPREAD_VALUE__',
    });
    expect(JSON.stringify(orderedObject)).to.equal(expected);
  });

  it('three keys, one with a single line comment', () => {
    // Arrange
    const unOrderedObject: any = {
      someKey3: 'Some value 3',
      someKey1__DUMMY_COMMENT_KEY__:
        '__DUMMY_COMMENT_VALUE__// Single line comment for someKey 1',
      someKey1: 'Some value 1',
      someKey2: 'Some value 2',
    };

    // Act
    const orderedObject: any = deepSortJsObject(unOrderedObject);

    // Assert

    // GBB: Need to have somekey1_ sort before somekey1 or add comment to the next value
    const expected = JSON.stringify({
      someKey1__DUMMY_COMMENT_KEY__:
        '__DUMMY_COMMENT_VALUE__// Single line comment for someKey 1',
      someKey1: 'Some value 1',
      someKey2: 'Some value 2',
      someKey3: 'Some value 3',
    });

    expect(JSON.stringify(orderedObject)).to.equal(expected);
  });

  it('three shorthand keys', () => {
    // Arrange
    const unOrderedObject: any = {
      someKey3: '__DUMMY_VALUE__',
      someKey1: '__DUMMY_VALUE__',
      someKey2: '__DUMMY_VALUE__',
    };

    // Act
    const orderedObject: any = deepSortJsObject(unOrderedObject);

    // Assert
    const expected = JSON.stringify({
      someKey1: '__DUMMY_VALUE__',
      someKey2: '__DUMMY_VALUE__',
      someKey3: '__DUMMY_VALUE__',
    });

    expect(JSON.stringify(orderedObject)).to.equal(expected);
  });

  it('three spread operators', () => {
    // Arrange
    const unOrderedObject: any = {
      ___3someSpreadc: '__DUMMY_SPREAD_VALUE__',
      ___1someSpreada: '__DUMMY_SPREAD_VALUE__',
      ___2someSpreadb: '__DUMMY_SPREAD_VALUE__',
    };

    // Act
    const orderedObject: any = deepSortJsObject(unOrderedObject);

    // Assert
    const expected = JSON.stringify({
      ___1someSpreada: '__DUMMY_SPREAD_VALUE__',
      ___2someSpreadb: '__DUMMY_SPREAD_VALUE__',
      ___3someSpreadc: '__DUMMY_SPREAD_VALUE__',
    });

    expect(JSON.stringify(orderedObject)).to.equal(expected);
  });

  it('nested objects', () => {
    // Arrange
    const unOrderedObject: any = {
      someKey3: 'someValue3',
      someKey1: 'someValue1',
      someKey2: {
        someNestedKey6: 'someNestedValue6',
        someNestedKey4: 'someNestedValue4',
        someNestedKey5: 'someNestedValue5',
      },
    };

    // Act
    const orderedObject: any = deepSortJsObject(unOrderedObject);

    // Assert
    const expected = JSON.stringify({
      someKey1: 'someValue1',
      someKey2: {
        someNestedKey4: 'someNestedValue4',
        someNestedKey5: 'someNestedValue5',
        someNestedKey6: 'someNestedValue6',
      },
      someKey3: 'someValue3',
    });

    expect(JSON.stringify(orderedObject)).to.equal(expected);
  });

  it('3 levels of nested objects', () => {
    // Arrange
    const unOrderedObject: any = {
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
    };

    // Act
    const orderedObject: any = deepSortJsObject(unOrderedObject);

    // Assert
    const expected = JSON.stringify({
      someKey1: 'someValue1',
      someKey2: {
        someNestedKey4: {
          someNestedKey7: 'someNestedValue7',
          someNestedKey8: 'someNestedValue8',
          someNestedKey9: 'someNestedValue9',
        },
        someNestedKey5: 'someNestedValue5',
        someNestedKey6: 'someNestedValue6',
      },
      someKey3: 'someValue3',
    });

    expect(JSON.stringify(orderedObject)).to.equal(expected);
  });

  it('complex example', () => {
    // Arrange
    const unOrderedObject: any = {
      b: {
        ___1zzzSomeSpread: '__DUMMY_SPREAD_VALUE__',
        ___2aaaSomeSpread: '__DUMMY_SPREAD_VALUE__',
        someShortHand: '__DUMMY_VALUE__',
        d: 'fred',
        g__DUMMY_COMMENT_KEY__:
          '__DUMMY_COMMENT_VALUE__// Single line comment for g',
        g: ['m', 2, 'j', { q: 3, h: 2 }],
        c: 'mary',
      },
      a: 'john',
    };

    // Act
    const orderedObject: any = deepSortJsObject(unOrderedObject);

    // Assert
    const expected = JSON.stringify({
      a: 'john',
      b: {
        ___1zzzSomeSpread: '__DUMMY_SPREAD_VALUE__',
        ___2aaaSomeSpread: '__DUMMY_SPREAD_VALUE__',
        c: 'mary',
        d: 'fred',
        g__DUMMY_COMMENT_KEY__:
          '__DUMMY_COMMENT_VALUE__// Single line comment for g',
        g: [
          'm',
          2,
          'j',
          {
            h: 2,
            q: 3,
          },
        ],
        someShortHand: '__DUMMY_VALUE__',
      },
    });
    expect(JSON.stringify(orderedObject)).to.equal(expected);
  });
});
