import React, { useRef, useEffect, useState } from "react";
import { EditorView, basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { EditorState } from "@codemirror/state";

const BrowserCodeEditor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [editorContent, setEditorContent] = useState<string>(
    "// Write JavaScript here\n"
  );
  const [output, setOutput] = useState<string>("No output yet.");
  const [errorLog, setErrorLog] = useState<string | null>(null);

  useEffect(() => {
    if (editorRef.current) {
      // Create the editor's state with basic setup and extensions
      const state = EditorState.create({
        doc: editorContent,
        extensions: [
          basicSetup,
          javascript(),
          EditorView.updateListener.of((update) => {
            if (update.docChanged) {
              setEditorContent(update.state.doc.toString());
            }
          }),
        ],
      });

      // Attach the editor view to the ref
      const editor = new EditorView({
        state,
        parent: editorRef.current,
      });

      // Cleanup on component unmount
      return () => editor.destroy();
    }
  }, []);

  const runCode = () => {
    try {
      setErrorLog(null); // Clear previous errors
      let capturedOutput: string[] = [];

      // Create a custom console.log to capture outputs
      const customConsole = {
        log: (...args: any[]) => {
          capturedOutput.push(args.join(" "));
        },
      };

      // Dynamically create a function that runs the user's code
      const wrappedCode = `
        ((customConsole) => {
          const console = customConsole;
          ${editorContent}
        })(customConsole);
      `;

      // Execute the wrapped code
      new Function("customConsole", wrappedCode)(customConsole);

      // Set output to captured logs or success message
      setOutput(
        capturedOutput.length > 0
          ? capturedOutput.join("\n")
          : "Code executed successfully with no output."
      );
    } catch (err: any) {
      setOutput("Error while running the code.");
      setErrorLog(err.stack || err.message || "An unknown error occurred.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6 gap-4">
      <h1 className="text-3xl font-bold">Browser Code Editor</h1>

      {/* Code Editor */}
      <div
        ref={editorRef}
        className="w-full max-w-4xl h-96 bg-white border rounded-lg shadow overflow-hidden"></div>

      {/* Run Code Button */}
      <button
        onClick={runCode}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
        Run Code
      </button>

      {/* Output Section */}
      <div className="w-full max-w-4xl bg-gray-50 p-4 border rounded-lg shadow">
        <h2 className="font-semibold text-lg">Output:</h2>
        <pre className="mt-2 bg-gray-900 text-white p-4 rounded-md overflow-auto">
          {output}
        </pre>
      </div>

      {/* Error Section */}
      {errorLog && (
        <div className="w-full max-w-4xl bg-red-50 p-4 border border-red-500 rounded-lg shadow">
          <h2 className="font-semibold text-lg text-red-600">Error Log:</h2>
          <pre className="mt-2 bg-red-900 text-white p-4 rounded-md overflow-auto">
            {errorLog}
          </pre>
        </div>
      )}
    </div>
  );
};

export default BrowserCodeEditor;
