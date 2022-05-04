import { it } from 'mocha';
import { expect } from 'chai';
import jsSort from '../jsSort';

describe('jsSort', () => {
  it('complex example', () => {
    // Arrange
    const selectedText = `{
  b: {
    ...zzzSomeSpread,
    ...aaaSomeSpread,
    ...aComplexSpread.secondPart,
    c: 'mary',
    d: 'fred',
    // Single line comment for g
    g: ['m', 2, 'j', { q: 3, h: 2, }],
    someKeyWithVariable: SomeEnum.SomeValue,
    someShortHand,
  },
  // Single line comment for a
  a: 'someValue',
  // Single line comment for VariableInKey
  [VariableInKey]: 'a value',
  f: SomeEnum.SomeValue,
  A: 'anotherValue',
}`;

    let orderedJsonString: string = '';

    const editBuilder = {
      replace: (_selection: string, newString: string) => {
        orderedJsonString = newString;
      },
    };

    const editor = {
      document: {
        getText: () => selectedText,
      },
      edit: (param: any) => {
        console.log(param);
        param(editBuilder);
      },
      selection: 'abc',
    };
    const messages: string[] = [];
    const showInformationMessage: Function = (message: string) =>
      messages.push(message);

    // Act
    jsSort({ editor, showInformationMessage });

    // Assert
    expect(messages).to.eql(['Sort complete']);
    expect(orderedJsonString).to.equal(
      `{
  // Single line comment for a
  a: 'someValue',
  A: 'anotherValue',
  b: {
    ...zzzSomeSpread,
    ...aaaSomeSpread,
    ...aComplexSpread.secondPart,
    c: 'mary',
    d: 'fred',
    // Single line comment for g
    g: ['m', 2, 'j', {
      h: 2,
      q: 3,
    }],
    someKeyWithVariable: SomeEnum.SomeValue,
    someShortHand,
  },
  f: SomeEnum.SomeValue,
  // Single line comment for VariableInKey
  [VariableInKey]: 'a value',
}`
    );
  });
});
