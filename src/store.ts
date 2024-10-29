import { create } from 'zustand';
import { getCollaborationInstance } from './utils/collaboration';

interface File {
  name: string;
  path: string;
  content: string;
  type: 'file' | 'folder';
}

interface Store {
  files: File[];
  currentFile: File | null;
  connectedUsers: number;
  setCurrentFile: (file: File) => void;
  updateCurrentFile: (path: string, content: string) => void;
  saveCurrentFile: () => void;
  runProject: () => void;
  shareProject: () => void;
}

const collaboration = getCollaborationInstance();

export const useStore = create<Store>((set) => ({
  files: [
    { name: 'src', type: 'folder', path: '/src', content: '' },
    { 
      name: 'App.tsx', 
      type: 'file', 
      path: '/src/App.tsx', 
      content: 'import React from "react";\n\nfunction App() {\n  return (\n    <div>Hello World</div>\n  );\n}\n\nexport default App;' 
    },
    { 
      name: 'index.tsx', 
      type: 'file', 
      path: '/src/index.tsx', 
      content: 'import React from "react";\nimport ReactDOM from "react-dom";\nimport App from "./App";\n\nReactDOM.render(<App />, document.getElementById("root"));' 
    },
  ],
  currentFile: null,
  connectedUsers: 1,
  setCurrentFile: (file) => {
    set({ currentFile: file });
    collaboration.broadcast({
      type: 'cursor',
      data: { filePath: file.path },
      userId: collaboration.getUserId()
    });
  },
  updateCurrentFile: (path, content) => {
    set((state) => ({
      files: state.files.map(f => 
        f.path === path ? { ...f, content } : f
      )
    }));
    collaboration.broadcast({
      type: 'update',
      data: { path, content },
      userId: collaboration.getUserId()
    });
  },
  saveCurrentFile: () => {
    // Save functionality will be implemented when we add persistence
    console.log('Saving file...');
  },
  runProject: () => {
    // Run functionality will be implemented when we add build/preview support
    console.log('Running project...');
  },
  shareProject: () => {
    // Share functionality will be implemented when we add export/import support
    console.log('Sharing project...');
  },
}));