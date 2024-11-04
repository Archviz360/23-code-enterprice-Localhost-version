import React from 'react';
import { useEditorStore } from '../store/editorStore';
import { X, Settings as SettingsIcon, Sun, Moon, Sparkles } from 'lucide-react';

export function SettingsPanel() {
  const { isSettingsPanelOpen, toggleSettingsPanel, theme, setTheme } = useEditorStore();

  if (!isSettingsPanelOpen) return null;

  const themes = [
    { id: 'vs-light', name: 'Light', icon: Sun },
    { id: 'vs-dark', name: 'Dark', icon: Moon },
    { id: 'purple', name: 'Purple', icon: Sparkles },
    { id: 'purple-glow', name: 'Purple Glow', icon: Sparkles },
  ] as const;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 rounded-lg shadow-xl w-[400px]">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <SettingsIcon className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Settings</h3>
          </div>
          <button
            onClick={toggleSettingsPanel}
            className="text-gray-400 hover:text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4">
          <h4 className="text-sm font-semibold text-gray-300 mb-3">Theme</h4>
          <div className="grid grid-cols-2 gap-3">
            {themes.map(({ id, name, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setTheme(id)}
                className={`flex items-center gap-2 p-3 rounded-lg border ${
                  theme === id
                    ? 'border-blue-500 bg-blue-500 bg-opacity-10'
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                <Icon className={`w-5 h-5 ${theme === id ? 'text-blue-400' : 'text-gray-400'}`} />
                <span className={`text-sm ${theme === id ? 'text-blue-400' : 'text-gray-300'}`}>
                  {name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}