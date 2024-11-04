import { create } from 'zustand';

interface Asset {
  name: string;
  type: string;
  url: string;
}

interface FileNode {
  name: string;
  type: 'file' | 'directory';
  path: string;
  children?: FileNode[];
}

interface EditorState {
  content: string;
  language: string;
  theme: 'vs-light' | 'vs-dark' | 'purple' | 'purple-glow';
  fontSize: number;
  wordWrap: 'on' | 'off';
  isSearchOpen: boolean;
  isAssetPanelOpen: boolean;
  isInfoPanelOpen: boolean;
  isShortcutsPanelOpen: boolean;
  isSettingsPanelOpen: boolean;
  isFileExplorerOpen: boolean;
  files: Array<{ name: string; content: string; language: string; path: string }>;
  currentFile: number;
  assets: Asset[];
  fileTree: FileNode[];
  hasUnsavedChanges: boolean;
  setContent: (content: string) => void;
  setLanguage: (language: string) => void;
  setTheme: (theme: 'vs-light' | 'vs-dark' | 'purple' | 'purple-glow') => void;
  setFontSize: (size: number) => void;
  setWordWrap: (wrap: 'on' | 'off') => void;
  toggleSearch: () => void;
  toggleAssetPanel: () => void;
  toggleInfoPanel: () => void;
  toggleShortcutsPanel: () => void;
  toggleSettingsPanel: () => void;
  toggleFileExplorer: () => void;
  createNewFile: () => void;
  saveFile: () => void;
  quickSaveFile: () => void;
  openFile: (file: File) => Promise<void>;
  switchFile: (index: number) => void;
  closeFile: (index: number) => void;
  addAsset: (asset: Asset) => void;
  removeAsset: (name: string) => void;
  updateFileTree: (tree: FileNode[]) => void;
  saveChanges: () => void;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  content: '// Start coding here...',
  language: 'javascript',
  theme: 'vs-dark',
  fontSize: 14,
  wordWrap: 'on',
  isSearchOpen: false,
  isAssetPanelOpen: false,
  isInfoPanelOpen: false,
  isShortcutsPanelOpen: false,
  isSettingsPanelOpen: false,
  isFileExplorerOpen: true,
  files: [{ name: 'untitled.js', content: '// Start coding here...', language: 'javascript', path: '/untitled.js' }],
  currentFile: 0,
  assets: [],
  fileTree: [],
  hasUnsavedChanges: false,
  setContent: (content) => set((state) => {
    const newFiles = [...state.files];
    newFiles[state.currentFile] = { ...newFiles[state.currentFile], content };
    return { content, files: newFiles, hasUnsavedChanges: true };
  }),
  setLanguage: (language) => set((state) => {
    const newFiles = [...state.files];
    newFiles[state.currentFile] = { ...newFiles[state.currentFile], language };
    return { language, files: newFiles };
  }),
  setTheme: (theme) => set({ theme }),
  setFontSize: (fontSize) => set({ fontSize }),
  setWordWrap: (wordWrap) => set({ wordWrap }),
  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
  toggleAssetPanel: () => set((state) => ({ isAssetPanelOpen: !state.isAssetPanelOpen })),
  toggleInfoPanel: () => set((state) => ({ isInfoPanelOpen: !state.isInfoPanelOpen })),
  toggleShortcutsPanel: () => set((state) => ({ isShortcutsPanelOpen: !state.isShortcutsPanelOpen })),
  toggleSettingsPanel: () => set((state) => ({ isSettingsPanelOpen: !state.isSettingsPanelOpen })),
  toggleFileExplorer: () => set((state) => ({ isFileExplorerOpen: !state.isFileExplorerOpen })),
  createNewFile: () => set((state) => ({
    files: [...state.files, { 
      name: `untitled-${state.files.length + 1}.js`, 
      content: '', 
      language: 'javascript',
      path: `/untitled-${state.files.length + 1}.js`
    }],
    currentFile: state.files.length,
    content: '',
    language: 'javascript'
  })),
  saveFile: () => {
    const state = get();
    const file = state.files[state.currentFile];
    const blob = new Blob([file.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    a.click();
    URL.revokeObjectURL(url);
    set({ hasUnsavedChanges: false });
  },
  quickSaveFile: () => {
    const state = get();
    const file = state.files[state.currentFile];
    const blob = new Blob([file.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    a.click();
    URL.revokeObjectURL(url);
    set({ hasUnsavedChanges: false });
  },
  openFile: async (file: File) => {
    const content = await file.text();
    const extension = file.name.split('.').pop() || '';
    const languageMap: Record<string, string> = {
      js: 'javascript',
      ts: 'typescript',
      jsx: 'javascript',
      tsx: 'typescript',
      py: 'python',
      html: 'html',
      css: 'css',
      json: 'json',
      md: 'markdown',
      cpp: 'cpp',
      c: 'c',
      java: 'java',
      go: 'go',
      rs: 'rust',
      php: 'php',
      rb: 'ruby',
      sql: 'sql',
      yaml: 'yaml',
      xml: 'xml',
      sh: 'shell',
      bash: 'shell',
      ps1: 'powershell',
    };
    const language = languageMap[extension] || 'plaintext';
    
    set((state) => ({
      files: [...state.files, { name: file.name, content, language, path: `/${file.name}` }],
      currentFile: state.files.length,
      content,
      language,
    }));
  },
  switchFile: (index) => set((state) => ({
    currentFile: index,
    content: state.files[index].content,
    language: state.files[index].language,
  })),
  closeFile: (index) => set((state) => {
    if (state.files.length <= 1) return state;

    const newFiles = [...state.files];
    newFiles.splice(index, 1);

    const newCurrentFile = index >= newFiles.length ? newFiles.length - 1 : index;
    
    return {
      files: newFiles,
      currentFile: newCurrentFile,
      content: newFiles[newCurrentFile].content,
      language: newFiles[newCurrentFile].language,
    };
  }),
  addAsset: (asset) => set((state) => ({
    assets: [...state.assets, asset]
  })),
  removeAsset: (name) => set((state) => ({
    assets: state.assets.filter(asset => asset.name !== name)
  })),
  updateFileTree: (tree) => set({ fileTree: tree }),
  saveChanges: () => {
    const state = get();
    // In a real implementation, this would sync with the file system
    set({ hasUnsavedChanges: false });
  },
}));