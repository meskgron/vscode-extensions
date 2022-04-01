/* eslint-disable @typescript-eslint/naming-convention */
import { it } from 'mocha';
import { expect } from 'chai';
import { objToString } from '../objToString';

describe('objToString', () => {
  it('empty Object', () => {
    // Arrange
    const orderedObject = {};

    // Act
    const jsonString = objToString(orderedObject);

    // Assert
    expect(jsonString).to.equal(`{
}`);
  });

  it('single key', () => {
    // Arrange
    const orderedObject = { someKey: 'someValue' };

    // Act
    const jsonString = objToString(orderedObject);

    // Assert
    expect(jsonString).to.equal(`{
  someKey: 'someValue',
}`);
  });

  it('single key with variable value', () => {
    // Arrange
    const orderedObject = { someKey: '__VARIABLE_VALUE__SomeEnum.SomeValue' };

    // Act
    const jsonString = objToString(orderedObject);

    // Assert
    expect(jsonString).to.equal(`{
  someKey: SomeEnum.SomeValue,
}`);
  });

  it('key in shorthand', () => {
    // Arrange
    const orderedObject = { someKey: '__DUMMY_VALUE__' };

    // Act
    const jsonString = objToString(orderedObject);

    // Assert
    expect(jsonString).to.equal(`{
  someKey,
}`);
  });

  it('spread operator', () => {
    // Arrange
    const orderedObject = {
      ___1someSpread: '__DUMMY_SPREAD_VALUE__',
    };

    // Act
    const jsonString = objToString(orderedObject);

    // Assert
    expect(jsonString).to.equal(`{
  ...someSpread,
}`);
  });

  it('three shorthand keys', () => {
    // Arrange
    const orderedObject = {
      someKey1: '__DUMMY_VALUE__',
      someKey2: '__DUMMY_VALUE__',
      someKey3: '__DUMMY_VALUE__',
    };

    // Act
    const jsonString = objToString(orderedObject);

    // Assert
    expect(jsonString).to.equal(`{
  someKey1,
  someKey2,
  someKey3,
}`);
  });

  it('three spread operators', () => {
    // Arrange
    const orderedObject = {
      ___1someSpreada: '__DUMMY_SPREAD_VALUE__',
      ___2someSpreadb: '__DUMMY_SPREAD_VALUE__',
      ___3someSpreadc: '__DUMMY_SPREAD_VALUE__',
    };

    // Act
    const jsonString = objToString(orderedObject);

    // Assert
    expect(jsonString).to.equal(`{
  ...someSpreada,
  ...someSpreadb,
  ...someSpreadc,
}`);
  });

  it('3 levels of nested objects', () => {
    // Arrange
    const orderedObject = {
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
    };

    // Act
    const jsonString = objToString(orderedObject);

    // Assert
    expect(jsonString).to.equal(`{
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
}`);
  });

  it('complex example', () => {
    // Arrange
    const orderedObject = {
      a: 'john',
      b: {
        ___1zzzSomeSpread: '__DUMMY_SPREAD_VALUE__',
        c: 'mary',
        d: 'fred',
        g: [
          'm',
          2,
          'j',
          {
            h: 2,
            q: 3,
          },
        ],
        someKeyWithVariable: '__VARIABLE_VALUE__SomeEnum.SomeValue',
        someShortHand: '__DUMMY_VALUE__',
      },
    };

    // Act
    const jsonString = objToString(orderedObject);

    // Assert
    expect(jsonString).to.equal(`{
  a: 'john',
  b: {
    ...zzzSomeSpread,
    c: 'mary',
    d: 'fred',
    g: ['m', 2, 'j', {
      h: 2,
      q: 3,
    }],
    someKeyWithVariable: SomeEnum.SomeValue,
    someShortHand,
  },
}`);
  });
});
