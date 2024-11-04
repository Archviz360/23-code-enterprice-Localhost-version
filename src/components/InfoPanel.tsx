import React from 'react';
import { useEditorStore } from '../store/editorStore';
import { X, Info } from 'lucide-react';

export function InfoPanel() {
  const { isInfoPanelOpen, toggleInfoPanel } = useEditorStore();

  if (!isInfoPanelOpen) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 p-4">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <Info className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">Information</h3>
        </div>
        <button
          onClick={toggleInfoPanel}
          className="text-gray-400 hover:text-gray-300"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-semibold text-gray-300 mb-2">Editor Statistics</h4>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>Current Language: JavaScript</li>
            <li>File Size: 2.3KB</li>
            <li>Lines of Code: 120</li>
            <li>Characters: 3,456</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-300 mb-2">System Information</h4>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>Monaco Editor Version: 0.34.1</li>
            <li>Browser: Chrome 91.0</li>
            <li>Platform: Windows</li>
            <li>Memory Usage: 124MB</li>
          </ul>
        </div>
      </div>
    </div>
  );
}