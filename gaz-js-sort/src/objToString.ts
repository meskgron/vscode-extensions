/* eslint-disable quotes */
export const indentLevel = (level: number) => '  '.repeat(level);

export const convertArrayToString = (
  array: Array<any>,
  level: number
): string =>
  array
    .map((item) => {
      if (typeof item === 'string') {
        return `'${item}'`;
      } else if (item instanceof Object) {
        return objToString(item, level + 1);
      } else {
        return item;
      }
    })
    .join(', ');

export const objToStringNested = (obj: any, level: number): string =>
  Object.entries(obj).reduce((acc, [p, val]) => {
    const indent = indentLevel(level);
    let valueString = undefined;
    if (val instanceof Array) {
      valueString = `[${convertArrayToString(val, level)}]`;
    } else if (typeof val === 'string') {
      valueString = `'${val}'`;
    } else if (val instanceof Object) {
      valueString = `{\n${objToStringNested(val, level + 1)}${indent}}`;
    } else {
      valueString = val;
    }

    let keyAndValue = undefined;

    switch (valueString) {
      case `'__DUMMY_VALUE__'`:
        keyAndValue = p;
        break;
      case `'__DUMMY_SPREAD_VALUE__'`:
        keyAndValue = p.replace(/^___[1-9](\w+)/gi, '...$1');
        break;
      default:
        keyAndValue = `${p}: ${valueString}`;
        break;
    }
    return `${acc}${indent}${keyAndValue},\n`;
  }, '');

export const objToString = (obj: any, level = 1): string => {
  const indent = indentLevel(level - 1);
  return `{\n${objToStringNested(obj, level)}${indent}}`;
};
