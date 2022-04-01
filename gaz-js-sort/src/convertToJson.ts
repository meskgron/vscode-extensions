export const convertJavascriptObjectStringToJson = (
  javascriptObjectString: string
) => {
  let i = 0;
  const spreadIncrementer = (_match: string, _p1: string, p2: string) =>
    `"___${++i}${p2}": "__DUMMY_SPREAD_VALUE__", `;

  return javascriptObjectString
    .replace(/^(\s*)\.\.\.(\w+),(\s*)$/gm, spreadIncrementer) // spread operator ...z, becomes "___1z": "__DUMMY_SPREAD_VALUE__",
    .replace(/^(\s*)(\w+),(\s*)$/gm, '$2: "__DUMMY_VALUE__", ') // convert javscript object shorthand to longhand z, becomes z: "__DUMMY_VALUE__",
    .replace(
      /([{,]\s*)([A-Za-z0-9_\-]+?)\s*:\s*([A-Za-z0-9_\-]+?[^\s,}]*)/gm,
      '$1$2: "__VARIABLE_VALUE__$3",'
    ) // javscript variable value z: SomeEnum.SomeValue, becomes z: "__VARIABLE_VALUE__SomeEnum.SomeValue",
    .replace(/([{,])(\s*)([A-Za-z0-9_\-]+?)\s*:/g, '$1\n"$3":') // Put quotes around the javascript object key to make it JSON compatable
    .replace(/'/g, '"') // Replace single quote with double quote to make it JSON compatable
    .replace(/\,(?!\s*?[\{\[\"\'\w])/g, ''); // Remove trailiing comma from last object to make it JSON compatable
};

export const convertSelectedTextToJson = (selectedText: string) =>
  JSON.parse(convertJavascriptObjectStringToJson(selectedText));
