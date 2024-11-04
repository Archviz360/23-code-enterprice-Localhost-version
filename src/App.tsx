import React from 'react';
import { Editor } from './components/Editor';
import { Toolbar } from './components/Toolbar';
import { Search } from './components/Search';
import { Tabs } from './components/Tabs';
import { CollaborationPanel } from './components/CollaborationPanel';
import { AssetPanel } from './components/AssetPanel';
import { InfoPanel } from './components/InfoPanel';
import { ShortcutsPanel } from './components/ShortcutsPanel';
import { SettingsPanel } from './components/SettingsPanel';
import { FileExplorer } from './components/FileExplorer';

function App() {
  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <Toolbar />
      <Tabs />
      <div className="flex-1 relative">
        <FileExplorer />
        <Editor />
        <Search />
        <CollaborationPanel />
        <AssetPanel />
        <InfoPanel />
        <ShortcutsPanel />
        <SettingsPanel />
      </div>
    </div>
  );
}

export default App;