import { create } from 'zustand';

interface EditorState {
  content: string;
  language: string;
  theme: 'vs-dark' | 'light';
  fontSize: number;
  wordWrap: 'on' | 'off';
  isSearchOpen: boolean;
  files: Array<{ name: string; content: string; language: string }>;
  currentFile: number;
  setContent: (content: string) => void;
  setLanguage: (language: string) => void;
  setTheme: (theme: 'vs-dark' | 'light') => void;
  setFontSize: (size: number) => void;
  setWordWrap: (wrap: 'on' | 'off') => void;
  toggleSearch: () => void;
  createNewFile: () => void;
  saveFile: () => void;
  openFile: (file: File) => Promise<void>;
  switchFile: (index: number) => void;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  content: '// Start coding here...',
  language: 'javascript',
  theme: 'vs-dark',
  fontSize: 14,
  wordWrap: 'on',
  isSearchOpen: false,
  files: [{ name: 'untitled.js', content: '// Start coding here...', language: 'javascript' }],
  currentFile: 0,
  setContent: (content) => set((state) => {
    const newFiles = [...state.files];
    newFiles[state.currentFile] = { ...newFiles[state.currentFile], content };
    return { content, files: newFiles };
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
  createNewFile: () => set((state) => ({
    files: [...state.files, { name: `untitled-${state.files.length + 1}.js`, content: '', language: 'javascript' }],
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
  },
  openFile: async (file: File) => {
    const content = await file.text();
    const extension = file.name.split('.').pop() || '';
    const languageMap: Record<string, string> = {
      js: 'javascript',
      ts: 'typescript',
      py: 'python',
      html: 'html',
      css: 'css',
      json: 'json',
      md: 'markdown',
    };
    const language = languageMap[extension] || 'plaintext';
    
    set((state) => ({
      files: [...state.files, { name: file.name, content, language }],
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
}));