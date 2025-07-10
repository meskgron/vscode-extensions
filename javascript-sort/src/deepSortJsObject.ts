const comparer = (a: string, b: string): number => {
  if (a.startsWith(b) && a.endsWith("__DUMMY_COMMENT_KEY__")) {
    return -1;
  }

  if (b.startsWith(a) && b.endsWith("__DUMMY_COMMENT_KEY__")) {
    return 1;
  }

  return a.localeCompare(b);
};

const deepSortJsObject = (unorderedObject: any): any => {
  if (Array.isArray(unorderedObject)) {
    return unorderedObject.sort((a, b) => {
      // 数组元素排序逻辑（如按name）
      return (
        a?.name?.localeCompare(b?.name) || a?.id?.localeCompare(b?.id) || 0
      );
    });
  }

  return Object.keys(unorderedObject)
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
};

export default deepSortJsObject;
