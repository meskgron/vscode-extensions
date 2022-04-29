const comparer = (a: string, b: string): number => {
  if (a.startsWith(b) && a.endsWith('__DUMMY_COMMENT_KEY__')) {
    return -1;
  }

  if (b.startsWith(a) && b.endsWith('__DUMMY_COMMENT_KEY__')) {
    return 1;
  }

  return a.localeCompare(b);
};

const deepSortJsObject = (unorderedObject: any): any =>
  Object.keys(unorderedObject)
    .sort(comparer)
    .reduce((acc: any, key: string) => {
      const unorderedValue = unorderedObject[key];
      let orderedValue = undefined;

      if (unorderedValue instanceof Array) {
        orderedValue = unorderedValue.map((item) => {
          return item instanceof Object ? deepSortJsObject(item) : item;
        });
      } else if (unorderedValue instanceof Object) {
        orderedValue = deepSortJsObject(unorderedValue);
      } else {
        orderedValue = unorderedValue;
      }

      acc[key] = orderedValue;
      return acc;
    }, {});

export default deepSortJsObject;
