export const convertJavascriptObjectStringToJson = (
  javascriptObjectString: string
) => {
  let i = 0;
  const spreadIncrementer = (_match: string, _p1: string, p2: string) =>
    `"___${++i}${p2}": "__DUMMY_SPREAD_VALUE__", `;

  return javascriptObjectString
    .replace(/^(\s*)\.\.\.(\w+),$/gm, spreadIncrementer) // spread operator ...z, becomes "___z": "__DUMMY_SPREAD_VALUE__",
    .replace(/^(\s*)(\w+),$/gm, '$2: "__DUMMY_VALUE__", ') // convert javscript object shorthand to longhand z, becomes z: "__DUMMY_VALUE__",
    .replace(/([{,])(\s*)([A-Za-z0-9_\-]+?)\s*:/g, '$1\n"$3":') // Put quotes around the javascript object key to make it JSON compatable
    .replace(/'/g, '"') // Replace single quote with double quote to make it JSON compatable
    .replace(/\,(?!\s*?[\{\[\"\'\w])/g, ''); // Remove trailiing comma from last object to make it JSON compatable
};

export const convertSelectedTextToJson = (selectedText: string) =>
  JSON.parse(convertJavascriptObjectStringToJson(selectedText));
