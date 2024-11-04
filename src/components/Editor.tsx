import React from 'react';
import MonacoEditor from '@monaco-editor/react';
import { useEditorStore } from '../store/editorStore';

export function Editor() {
  const { content, setContent, language, theme, fontSize, wordWrap, isFileExplorerOpen } = useEditorStore();

  const handleEditorChange = (value: string | undefined) => {
    setContent(value || '');
  };

  return (
    <div className={`flex-1 h-full ${isFileExplorerOpen ? 'ml-64' : ''}`}>
      <MonacoEditor
        height="100%"
        language={language}
        value={content}
        theme={theme}
        onChange={handleEditorChange}
        options={{
          fontSize,
          wordWrap,
          minimap: { enabled: true },
          scrollBeyondLastLine: false,
          lineNumbers: 'on',
          renderWhitespace: 'selection',
          automaticLayout: true,
          padding: { top: 10 },
        }}
      />
    </div>
  );
}