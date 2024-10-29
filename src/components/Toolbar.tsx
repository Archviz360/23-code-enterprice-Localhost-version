import React from 'react';
import { 
  Play, Save, Settings, Share, Users, 
  FolderPlus, FilePlus, Download
} from 'lucide-react';
import { useStore } from '../store';

export function Toolbar() {
  const { saveCurrentFile, runProject, shareProject } = useStore();

  return (
    <div className="h-12 bg-gray-800 border-b border-gray-700 flex items-center px-4 gap-2">
      <div className="flex items-center gap-4">
        <button
          onClick={saveCurrentFile}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          title="Save (Ctrl+S)"
        >
          <Save size={20} />
        </button>
        
        <button
          onClick={runProject}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-green-400"
          title="Run Project"
        >
          <Play size={20} />
        </button>

        <div className="h-6 w-px bg-gray-700" />

        <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
          <FolderPlus size={20} />
        </button>
        
        <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
          <FilePlus size={20} />
        </button>

        <div className="h-6 w-px bg-gray-700" />

        <button
          onClick={shareProject}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          title="Share Project"
        >
          <Share size={20} />
        </button>

        <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
          <Download size={20} />
        </button>
      </div>

      <div className="flex-1" />

      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
          <Users size={20} />
        </button>

        <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
          <Settings size={20} />
        </button>
      </div>
    </div>
  );
}