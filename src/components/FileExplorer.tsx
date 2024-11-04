import React from 'react';
import { useEditorStore } from '../store/editorStore';
import { ChevronRight, ChevronDown, File, Folder, X } from 'lucide-react';

interface FileNodeProps {
  node: {
    name: string;
    type: 'file' | 'directory';
    path: string;
    children?: Array<{
      name: string;
      type: 'file' | 'directory';
      path: string;
      children?: any[];
    }>;
  };
  level: number;
}

function FileNode({ node, level }: FileNodeProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { files, currentFile } = useEditorStore();

  const isCurrentFile = files[currentFile]?.path === node.path;
  const paddingLeft = `${level * 1.5}rem`;

  if (node.type === 'file') {
    return (
      <div
        className={`flex items-center py-1 px-2 hover:bg-gray-700 cursor-pointer ${
          isCurrentFile ? 'bg-gray-700' : ''
        }`}
        style={{ paddingLeft }}
      >
        <File className="w-4 h-4 text-gray-400 mr-2" />
        <span className="text-sm text-gray-300">{node.name}</span>
      </div>
    );
  }

  return (
    <div>
      <div
        className="flex items-center py-1 px-2 hover:bg-gray-700 cursor-pointer"
        style={{ paddingLeft }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <ChevronDown className="w-4 h-4 text-gray-400 mr-2" />
        ) : (
          <ChevronRight className="w-4 h-4 text-gray-400 mr-2" />
        )}
        <Folder className="w-4 h-4 text-gray-400 mr-2" />
        <span className="text-sm text-gray-300">{node.name}</span>
      </div>
      {isOpen && node.children && (
        <div>
          {node.children.map((child, index) => (
            <FileNode key={index} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export function FileExplorer() {
  const { isFileExplorerOpen, toggleFileExplorer, fileTree, hasUnsavedChanges, saveChanges } = useEditorStore();

  if (!isFileExplorerOpen) return null;

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-white">Explorer</h3>
        <button
          onClick={toggleFileExplorer}
          className="text-gray-400 hover:text-gray-300"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {fileTree.map((node, index) => (
          <FileNode key={index} node={node} level={0} />
        ))}
      </div>
      {hasUnsavedChanges && (
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={saveChanges}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
}