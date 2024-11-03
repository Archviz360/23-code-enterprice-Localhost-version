import React, { useEffect, useRef } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { useEditorStore } from '../store/editorStore';
import { useCollaborationStore } from '../store/collaborationStore';
import { MonacoBinding } from 'y-monaco';
import * as Y from 'yjs';

export function Editor() {
  const { content, setContent, language, theme, fontSize, wordWrap } = useEditorStore();
  const { doc, roomId, setBinding } = useCollaborationStore();
  const editorRef = useRef<any>(null);

  useEffect(() => {
    if (doc && editorRef.current && roomId) {
      const ytext = doc.getText('monaco');
      const binding = new MonacoBinding(
        ytext,
        editorRef.current,
        new Set([editorRef.current])
      );
      setBinding(binding);
    }
  }, [doc, roomId]);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  const handleEditorChange = (value: string | undefined) => {
    if (!doc) {
      setContent(value || '');
    }
  };

  return (
    <div className="flex-1 h-full">
      <MonacoEditor
        height="100%"
        language={language}
        value={content}
        theme={theme}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
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