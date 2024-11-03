import React, { useRef } from 'react';
import { useEditorStore } from '../store/editorStore';
import {
  FileText,
  Save,
  Settings,
  Search,
  Type,
  Code2,
  WrapText,
} from 'lucide-react';
import { Collaboration } from './Collaboration';

const languages = [
  'javascript',
  'typescript',
  'python',
  'html',
  'css',
  'json',
  'markdown',
];

export function Toolbar() {
  const {
    language,
    setLanguage,
    fontSize,
    setFontSize,
    wordWrap,
    setWordWrap,
    createNewFile,
    saveFile,
    openFile,
    toggleSearch,
  } = useEditorStore();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileOpen = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      openFile(file);
    }
    e.target.value = '';
  };

  return (
    <div className="flex items-center gap-4 p-2 bg-gray-900 border-b border-gray-700">
      <div className="flex items-center gap-2">
        <FileText className="w-5 h-5 text-gray-400" />
        <button
          onClick={createNewFile}
          className="px-3 py-1 text-sm text-gray-300 hover:bg-gray-800 rounded"
        >
          New File
        </button>
        <button
          onClick={handleFileOpen}
          className="px-3 py-1 text-sm text-gray-300 hover:bg-gray-800 rounded"
        >
          Open
        </button>
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileSelect}
          className="hidden"
        />
        <button
          onClick={saveFile}
          className="px-3 py-1 text-sm text-gray-300 hover:bg-gray-800 rounded flex items-center gap-1"
        >
          <Save className="w-4 h-4" />
          Save
        </button>
      </div>

      <div className="h-6 w-px bg-gray-700" />

      <div className="flex items-center gap-2">
        <Code2 className="w-5 h-5 text-gray-400" />
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-gray-800 text-gray-300 text-sm rounded border border-gray-700 px-2 py-1"
        >
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang.charAt(0).toUpperCase() + lang.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="h-6 w-px bg-gray-700" />

      <div className="flex items-center gap-2">
        <Type className="w-5 h-5 text-gray-400" />
        <input
          type="number"
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
          className="w-16 bg-gray-800 text-gray-300 text-sm rounded border border-gray-700 px-2 py-1"
        />
      </div>

      <div className="h-6 w-px bg-gray-700" />

      <div className="flex items-center gap-2">
        <WrapText className="w-5 h-5 text-gray-400" />
        <button
          onClick={() => setWordWrap(wordWrap === 'on' ? 'off' : 'on')}
          className={`px-3 py-1 text-sm rounded ${
            wordWrap === 'on'
              ? 'bg-blue-600 text-white'
              : 'text-gray-300 hover:bg-gray-800'
          }`}
        >
          Word Wrap
        </button>
      </div>

      <div className="flex-1" />

      <div className="flex items-center gap-2">
        <Collaboration />
        <button
          onClick={toggleSearch}
          className="p-2 text-gray-300 hover:bg-gray-800 rounded"
        >
          <Search className="w-5 h-5" />
        </button>
        <button className="p-2 text-gray-300 hover:bg-gray-800 rounded">
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}