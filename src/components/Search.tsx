import React, { useState, useRef } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { useEditorStore } from '../store/editorStore';

export function Search() {
  const { isSearchOpen } = useEditorStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [replaceTerm, setReplaceTerm] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  if (!isSearchOpen) return null;

  return (
    <div className="absolute top-16 right-4 w-80 bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-4 z-50">
      <div className="flex items-center gap-2 mb-3">
        <SearchIcon className="w-4 h-4 text-gray-400" />
        <input
          ref={searchInputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Find"
          className="flex-1 bg-gray-900 text-gray-300 text-sm rounded px-2 py-1 border border-gray-700 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="flex items-center gap-2">
        <X className="w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={replaceTerm}
          onChange={(e) => setReplaceTerm(e.target.value)}
          placeholder="Replace"
          className="flex-1 bg-gray-900 text-gray-300 text-sm rounded px-2 py-1 border border-gray-700 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="flex gap-2 mt-3">
        <button className="flex-1 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
          Find Next
        </button>
        <button className="flex-1 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
          Replace
        </button>
      </div>
    </div>
  );
}