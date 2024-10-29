import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { FileTree } from './components/FileTree';
import { Toolbar } from './components/Toolbar';
import { Sidebar } from './components/Sidebar';
import { StatusBar } from './components/StatusBar';
import { useStore } from './store';
import { setupCollaboration } from './utils/collaboration';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { currentFile, updateCurrentFile } = useStore();
  const [isEditorReady, setIsEditorReady] = useState(false);

  useEffect(() => {
    const collaboration = setupCollaboration();
    
    collaboration.subscribe('update', (message) => {
      if (message.userId !== collaboration.getUserId()) {
        // Handle remote updates
        console.log('Received update:', message);
      }
    });

    return () => {
      // Cleanup if needed
    };
  }, []);

  const handleEditorChange = (value: string | undefined) => {
    if (value && currentFile) {
      updateCurrentFile(currentFile.path, value);
    }
  };

  const handleEditorDidMount = () => {
    setIsEditorReady(true);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white">
      <Toolbar />
      
      <div className="flex-1 flex overflow-hidden">
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)}>
          <FileTree />
        </Sidebar>

        <main className="flex-1 flex flex-col overflow-hidden">
          {currentFile ? (
            <Editor
              height="100%"
              defaultLanguage={currentFile.path.endsWith('.tsx') ? 'typescript' : 'javascript'}
              theme="vs-dark"
              value={currentFile.content}
              onChange={handleEditorChange}
              onMount={handleEditorDidMount}
              options={{
                minimap: { enabled: true },
                fontSize: 14,
                lineNumbers: 'on',
                rulers: [80],
                bracketPairColorization: { enabled: true },
                automaticLayout: true,
                formatOnPaste: true,
                formatOnType: true,
                scrollBeyondLastLine: false,
                smoothScrolling: true,
                cursorBlinking: 'smooth',
                cursorSmoothCaretAnimation: true,
                folding: true,
                foldingHighlight: true,
                foldingStrategy: 'auto',
                showFoldingControls: 'always',
                dragAndDrop: true,
                links: true,
                minimap: {
                  enabled: true,
                  maxColumn: 120,
                  renderCharacters: false,
                  showSlider: 'always',
                  side: 'right',
                },
              }}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              <p>Select a file to start editing</p>
            </div>
          )}
        </main>
      </div>

      <StatusBar />
    </div>
  );
}

export default App;