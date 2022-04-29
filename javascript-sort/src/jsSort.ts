import { convertSelectedTextToJson } from './convertToJson';
import deepSortJsObject from './deepSortJsObject';
import { objToString } from './objToString';

export default ({
  editor,
  showInformationMessage,
}: {
  editor: any;
  showInformationMessage: any;
}) => {
  try {
    const text = editor.document.getText(editor.selection);
    const unorderedObject = convertSelectedTextToJson(text);

    const orderedJson = deepSortJsObject(unorderedObject);
    const orderedJsonString = objToString(orderedJson);

    editor.edit((editBuilder: any) => {
      const selection = editor.selection;
      editBuilder.replace(selection, orderedJsonString);
    });

    showInformationMessage('Sort complete');
  } catch (exception) {
    showInformationMessage('Select a valid JS Object');
  }
};
