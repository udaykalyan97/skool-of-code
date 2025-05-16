import React, { useState } from "react";
import { Card, CardContent } from "./components/ui/card.jsx";
import { Button } from "./components/ui/button.jsx";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/ui/tabs.jsx";

export default function CodeEditorWithTerminal() {
  const [code, setCode] = useState("print('Hello, World!')");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const runCode = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: "python",
          version: "3.10.0",
          files: [{ name: "main.py", content: code }]
        })
      });

      const data = await response.json();
      setOutput(data.run.output || "");
    } catch (error) {
      setOutput("Error executing code.");
    }
    setLoading(false);
  };

  return (
    <div className="p-4 flex flex-col items-center">
      <Card className="w-full max-w-3xl">
        <CardContent>
          {/* <Tabs defaultValue="editor"> */}
            <TabsList>
              <TabsTrigger value="editor">Editor</TabsTrigger>
              {/* <TabsTrigger value="terminal">Terminal</TabsTrigger> */}
            </TabsList>

            <TabsContent value="editor">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-64 p-2 border rounded-md focus:outline-none font-mono"
                placeholder="Write your code here..."
              ></textarea>
              <div className="mt-4 flex justify-end">
                <Button onClick={runCode} disabled={loading}>
                  {loading ? "Running..." : "Run Code"}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="terminal">
              <div className="h-64 bg-black text-white p-2 rounded-md font-mono overflow-auto">
                {output ? <pre>{output}</pre> : "Output will appear here."}
              </div>
            </TabsContent>

          {/* </Tabs> */}
        </CardContent>
      </Card>
    </div>
  );
}
