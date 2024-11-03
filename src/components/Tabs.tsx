import React from 'react';
import { X } from 'lucide-react';
import { useEditorStore } from '../store/editorStore';

export function Tabs() {
  const { files, currentFile, switchFile } = useEditorStore();

  return (
    <div className="flex bg-gray-800 border-b border-gray-700 overflow-x-auto">
      {files.map((file, index) => (
        <button
          key={index}
          onClick={() => switchFile(index)}
          className={`flex items-center gap-2 px-4 py-2 text-sm ${
            currentFile === index
              ? 'bg-gray-900 text-white'
              : 'text-gray-400 hover:bg-gray-700'
          }`}
        >
          {file.name}
          {files.length > 1 && (
            <X className="w-4 h-4 hover:text-red-500" onClick={(e) => {
              e.stopPropagation();
              // TODO: Implement tab close functionality
            }} />
          )}
        </button>
      ))}
    </div>
  );
}