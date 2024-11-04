import React from 'react';
import { useEditorStore } from '../store/editorStore';
import { X, Keyboard } from 'lucide-react';

export function ShortcutsPanel() {
  const { isShortcutsPanelOpen, toggleShortcutsPanel } = useEditorStore();

  if (!isShortcutsPanelOpen) return null;

  const shortcuts = [
    { category: 'File Operations', items: [
      { key: 'Ctrl+N', description: 'New File' },
      { key: 'Ctrl+O', description: 'Open File' },
      { key: 'Ctrl+S', description: 'Quick Save' },
      { key: 'Ctrl+Shift+S', description: 'Save As' },
    ]},
    { category: 'Editor', items: [
      { key: 'Ctrl+F', description: 'Find' },
      { key: 'Ctrl+H', description: 'Replace' },
      { key: 'Ctrl+Z', description: 'Undo' },
      { key: 'Ctrl+Y', description: 'Redo' },
    ]},
    { category: 'Code Navigation', items: [
      { key: 'Ctrl+Home', description: 'Go to Beginning' },
      { key: 'Ctrl+End', description: 'Go to End' },
      { key: 'Ctrl+L', description: 'Go to Line' },
      { key: 'Alt+Up/Down', description: 'Move Line Up/Down' },
    ]},
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 rounded-lg shadow-xl w-[600px] max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Keyboard className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Keyboard Shortcuts</h3>
            </div>
            <button
              onClick={toggleShortcutsPanel}
              className="text-gray-400 hover:text-gray-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="p-4 space-y-6">
          {shortcuts.map((category) => (
            <div key={category.category}>
              <h4 className="text-sm font-semibold text-gray-300 mb-2">{category.category}</h4>
              <div className="grid grid-cols-2 gap-4">
                {category.items.map((shortcut) => (
                  <div key={shortcut.key} className="flex items-center justify-between">
                    <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-300 rounded">
                      {shortcut.key}
                    </kbd>
                    <span className="text-sm text-gray-400">{shortcut.description}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}