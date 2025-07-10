/* eslint-disable quotes */
export const indentLevel = (level: number) => "  ".repeat(level);

export const convertArrayToString = (
  array: Array<any>,
  level: number
): string =>
  array
    .map((item) => {
      if (typeof item === "string") {
        return `'${item}'`;
      } else if (item instanceof Object) {
        return objToString(item, level + 1);
      } else {
        return item;
      }
    })
    .join(", ");

function restoreValue(val: any) {
  if (typeof val === "string" && val.startsWith("__VARIABLE_VALUE__")) {
    let code = val.replace(/^__VARIABLE_VALUE__/, "");

    // 1. 还原转义的字符
    code = code
      .replace(/\\"/g, '"') // 转回双引号
      .replace(/\\'/g, "'") // 转回单引号
      .replace(/\\\\/g, "\\"); // 转回反斜杠
    // 2. 格式化：用 JS 工具做 pretty-print（推荐）
    code = code.replace(/"([^"]*?)"\s*:\s*"([^"]*?)"/g, "$1: '$2'"); // key: "value" → key: 'value'
    return code;
  }

  return `'${val}'`; // 不是变量值字符串，正常包裹
}

export const objToStringNested = (obj: any, level: number): string =>
  Object.entries(obj).reduce((acc, [p, val]) => {
    const indent = indentLevel(level);
    let valueString = undefined;
    if (val instanceof Array) {
      valueString = `[${convertArrayToString(val, level)}]`;
    } else if (typeof val === "string") {
      valueString = val.startsWith("__VARIABLE_VALUE__")
        ? val.replace(/(^__VARIABLE_VALUE__)/g, "")
        : `'${val}'`;
    } else if (val instanceof Object) {
      valueString = `{\n${objToStringNested(val, level + 1)}${indent}}`;
    } else {
      valueString = val;
    }

    let keyAndValue = undefined;

    if (valueString === `'__DUMMY_VALUE__'`) {
      keyAndValue = `${p},`;
    } else if (valueString === `'__DUMMY_SPREAD_VALUE__'`) {
      keyAndValue = `${p.replace(/^!!!___[1-9](\w+)/gi, "...$1")},`;
    } else if (p.endsWith("__DUMMY_VARIABLE_KEY__")) {
      keyAndValue = `[${p.replace(
        "__DUMMY_VARIABLE_KEY__",
        ""
      )}]: ${valueString},`;
    } else if (
      typeof valueString === "string" &&
      valueString.startsWith(`'__DUMMY_COMMENT_VALUE__`)
    ) {
      keyAndValue = valueString.replace(
        /^'__DUMMY_COMMENT_VALUE__(\/\/.*)'/gi,
        "$1"
      );
    } else {
      keyAndValue = `${p}: ${valueString},`;
    }
    return `${acc}${indent}${keyAndValue}\n`;
  }, "");

export const objToString = (obj: any, level = 1): string => {
  if (obj instanceof Array) {
    let valueString = `[${convertArrayToString(obj, level)}]`;
    return valueString;
  }
  const indent = indentLevel(level - 1);
  return `{\n${objToStringNested(obj, level)}${indent}}`;
};
