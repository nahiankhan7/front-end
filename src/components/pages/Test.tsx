import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component from ShadCN
import { Card, CardContent, CardHeader } from "@/components/ui/card"; // Importing ShadCN components

const Test: React.FC = () => {
  const [code, setCode] = useState<string>(""); // State to hold the code
  const [output, setOutput] = useState<string>(""); // State to hold output or error
  const [error, setError] = useState<string | null>(null); // State to hold any errors

  const handleRunCode = () => {
    try {
      // Clear any previous errors
      setError(null);
      setOutput(""); // Reset output

      // Override console.log to capture its output
      let consoleOutput: string = "";
      const originalLog = console.log;
      console.log = (message: any) => {
        consoleOutput += message + "\n";
      };

      // Execute the code
      const result = eval(code); // Executes the code

      // Restore original console.log
      console.log = originalLog;

      // If result is undefined, show the console logs
      if (consoleOutput) {
        setOutput(consoleOutput);
      } else {
        setOutput(String(result)); // Set the result of eval if no console output
      }
    } catch (err: any) {
      // Catch and display any errors with detailed stack trace
      setError(`Error: ${err.message}\nStack Trace: ${err.stack}`);
      setOutput(""); // Clear output on error
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <h1 className="text-4xl font-semibold text-center text-white mb-8">
        Modern Code Editor
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-800 rounded-xl shadow-xl p-6">
          {/* Run Code button */}
          <Button
            onClick={handleRunCode}
            className="w-full mb-6 sm:w-auto bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition transform hover:scale-105">
            Run Code
          </Button>

          {/* CodeMirror editor with modern styling */}
          <div className="overflow-auto border border-gray-700 rounded-lg shadow-md">
            <CodeMirror
              value={code}
              onChange={(value) => setCode(value)} // Update code on change
              height="400px"
              extensions={[javascript()]} // Use JavaScript syntax highlighting
              className="p-4"
              theme="dark" // Apply a dark theme for CodeMirror
            />
          </div>
        </div>

        {/* Output or Error log with modern styling */}
        <div className="bg-gray-800 rounded-xl shadow-xl p-6 overflow-hidden">
          {error ? (
            <Card className="bg-red-800 border-red-500 shadow-lg overflow-auto">
              <CardHeader>
                <h3 className="text-red-300 font-bold">Error</h3>
              </CardHeader>
              <CardContent>
                <pre className="text-red-300 whitespace-pre-wrap">{error}</pre>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-green-800 border-green-500 shadow-lg overflow-auto">
              <CardHeader>
                <h3 className="text-green-300 font-bold">Output</h3>
              </CardHeader>
              <CardContent>
                <pre className="text-green-300 whitespace-pre-wrap">
                  {output}
                </pre>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Test;
