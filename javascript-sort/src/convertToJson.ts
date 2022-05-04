export const convertJavascriptObjectStringToJson = (
  javascriptObjectString: string
) => {
  let i = 0;
  const spreadIncrementer = (
    _match: string,
    group1: string,
    group2: string,
    group3: string
  ) => `${group1}"!!!___${++i}${group2}": "__DUMMY_SPREAD_VALUE__",${group3}`;

  return javascriptObjectString
    .replace(
      /^(\s*)(\/\/\s.+)$(?=(\s*)\[?(\w+)\]?)/gm,
      '$1$4__DUMMY_COMMENT_KEY__: "__DUMMY_COMMENT_VALUE__$2",'
    ) // single line comment `// some comment` becomes "nextKey__DUMMY_COMMENT_KEY__": "__DUMMY_COMMENT_VALUE__// some comment"
    .replace(/^(\s*)\.\.\.(\w[\w\.]*),(\s*)$/gm, spreadIncrementer) // spread operator ...z, becomes "___1z": "__DUMMY_SPREAD_VALUE__",
    .replace(/^(\s*)\[(\w+)\]:/gm, '$1"$2__DUMMY_VARIABLE_KEY__":') // variable in key [someVariableKey]: 'someValue', becomes "someVariableKey__DUMMY_VARIABLE_KEY__": "someValue",
    .replace(/^(\s*)(\w+),(\s*)$/gm, '$1$2: "__DUMMY_VALUE__",$3') // convert javscript object shorthand to longhand z, becomes z: "__DUMMY_VALUE__",
    .replace(
      /([{,]\s*)([A-Za-z0-9_\-]+?)\s*:\s*new ([A-Za-z0-9_\-]+?[^\s,}]*)(?=([\s,}]))/gm,
      '$1$2: "__VARIABLE_VALUE__new $3"'
    ) // javscript variable value z: new SomeClass(), becomes z: "__VARIABLE_VALUE__new SomeClass()",
    .replace(
      /([{,]\s*)([A-Za-z0-9_\-]+?)\s*:\s*([A-Za-z0-9_\-]+?[^\s,}]*)(?=([\s,}]))/gm,
      '$1$2: "__VARIABLE_VALUE__$3"'
    ) // javscript variable value z: SomeEnum.SomeValue, becomes z: "__VARIABLE_VALUE__SomeEnum.SomeValue",
    .replace(/([{,]\s*)([A-Za-z0-9_\-]+?)\s*:/g, '$1"$2":') // Put quotes around the javascript object key to make it JSON compatable
    .replace(/'/g, '"') // Replace single quote with double quote to make it JSON compatable
    .replace(/\,(?!\s*?[\{\[\"\'\w])/g, ''); // Remove trailing comma from last object to make it JSON compatible
};

export const convertSelectedTextToJson = (selectedText: string) =>
  JSON.parse(convertJavascriptObjectStringToJson(selectedText));
