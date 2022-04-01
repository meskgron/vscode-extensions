// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { convertSelectedTextToJson } from './convertToJson';
import deepSortJsObject from './deepSortJsObject';
import { objToString } from './objToString';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations GBB, your extension "gazJsSort" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    'gbb-extensions.gazJsSort',
    () => {
      try {
        const editor: any = vscode.window.activeTextEditor;
        const text = editor.document.getText(editor.selection);

        const orderedJson = deepSortJsObject(convertSelectedTextToJson(text));
        console.log('-----orderedJson', orderedJson);

        const orderedJsonString = objToString(orderedJson);
        console.log('---orderedJsonString', orderedJsonString);

        vscode.window.showInformationMessage('Sort complete');

        editor.edit((editBuilder: any) => {
          const selection = editor.selection;
          editBuilder.replace(selection, orderedJsonString);
        });
      } catch (exception) {
        vscode.window.showInformationMessage('Select a valid JS Object');
      }
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
