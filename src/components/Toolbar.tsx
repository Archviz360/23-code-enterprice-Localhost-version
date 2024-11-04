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
  Download,
  FolderOpen,
  Info,
  Keyboard,
  Sidebar,
} from 'lucide-react';

const languages = [
  'javascript',
  'typescript',
  'python',
  'html',
  'css',
  'json',
  'markdown',
  'cpp',
  'c',
  'java',
  'go',
  'rust',
  'php',
  'ruby',
  'sql',
  'yaml',
  'xml',
  'shell',
  'powershell',
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
    quickSaveFile,
    openFile,
    toggleSearch,
    toggleSettingsPanel,
    toggleAssetPanel,
    toggleInfoPanel,
    toggleShortcutsPanel,
    toggleFileExplorer,
    hasUnsavedChanges,
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
      <button
        onClick={toggleFileExplorer}
        className="p-2 text-gray-300 hover:bg-gray-800 rounded"
        title="Toggle Explorer"
      >
        <Sidebar className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-2">
        <FileText className="w-5 h-5 text-gray-400" />
        <button
          onClick={createNewFile}
          className="px-3 py-1 text-sm text-gray-300 hover:bg-gray-800 rounded"
          title="New File (Ctrl+N)"
        >
          New File
        </button>
        <button
          onClick={handleFileOpen}
          className="px-3 py-1 text-sm text-gray-300 hover:bg-gray-800 rounded"
          title="Open File (Ctrl+O)"
        >
          <FolderOpen className="w-4 h-4" />
          Open
        </button>
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileSelect}
          className="hidden"
        />
        <button
          onClick={quickSaveFile}
          className={`px-3 py-1 text-sm rounded flex items-center gap-1 ${
            hasUnsavedChanges ? 'text-white bg-blue-600 hover:bg-blue-700' : 'text-gray-300 hover:bg-gray-800'
          }`}
          title="Quick Save (Ctrl+S)"
        >
          <Save className="w-4 h-4" />
          Save
        </button>
        <button
          onClick={saveFile}
          className="px-3 py-1 text-sm text-gray-300 hover:bg-gray-800 rounded flex items-center gap-1"
          title="Save As (Ctrl+Shift+S)"
        >
          <Download className="w-4 h-4" />
          Save As
        </button>
      </div>

      <div className="h-6 w-px bg-gray-700" />

      <div className="flex items-center gap-2">
        <Code2 className="w-5 h-5 text-gray-400" />
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-gray-800 text-gray-300 text-sm rounded border border-gray-700 px-2 py-1"
          title="Select Language"
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
          title="Font Size"
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
          title="Toggle Word Wrap (Alt+Z)"
        >
          Word Wrap
        </button>
      </div>

      <div className="flex-1" />

      <div className="flex items-center gap-2">
        <button
          onClick={toggleSearch}
          className="p-2 text-gray-300 hover:bg-gray-800 rounded"
          title="Find (Ctrl+F)"
        >
          <Search className="w-5 h-5" />
        </button>
        <button
          onClick={toggleAssetPanel}
          className="p-2 text-gray-300 hover:bg-gray-800 rounded"
          title="Asset Manager"
        >
          <FolderOpen className="w-5 h-5" />
        </button>
        <button
          onClick={toggleInfoPanel}
          className="p-2 text-gray-300 hover:bg-gray-800 rounded"
          title="Information"
        >
          <Info className="w-5 h-5" />
        </button>
        <button
          onClick={toggleShortcutsPanel}
          className="p-2 text-gray-300 hover:bg-gray-800 rounded"
          title="Keyboard Shortcuts"
        >
          <Keyboard className="w-5 h-5" />
        </button>
        <button 
          onClick={toggleSettingsPanel}
          className="p-2 text-gray-300 hover:bg-gray-800 rounded"
          title="Settings (Ctrl+,)"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}