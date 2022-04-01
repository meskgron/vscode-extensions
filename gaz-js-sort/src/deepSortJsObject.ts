const deepSortJsObject = (unorderedObject: any): any =>
  Object.keys(unorderedObject)
    .sort()
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
