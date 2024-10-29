import React from 'react';
import { File, Folder, ChevronDown, ChevronRight } from 'lucide-react';
import { useStore } from '../store';

export function FileTree() {
  const { files, setCurrentFile } = useStore();

  const renderTree = (items: any[], level = 0) => {
    return items.map((item, index) => (
      <div
        key={index}
        className="flex items-center gap-2 px-4 py-1 hover:bg-gray-700 cursor-pointer"
        style={{ paddingLeft: `${level * 16 + 16}px` }}
        onClick={() => item.type === 'file' && setCurrentFile(item)}
      >
        {item.type === 'folder' ? (
          <>
            <ChevronRight size={16} />
            <Folder size={16} className="text-blue-400" />
          </>
        ) : (
          <>
            <File size={16} className="text-gray-400" />
          </>
        )}
        <span className="text-sm">{item.name}</span>
      </div>
    ));
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="py-2">
        {renderTree(files)}
      </div>
    </div>
  );
}