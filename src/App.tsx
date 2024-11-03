import React from 'react';
import { Editor } from './components/Editor';
import { Toolbar } from './components/Toolbar';
import { Search } from './components/Search';
import { Tabs } from './components/Tabs';

function App() {
  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <Toolbar />
      <Tabs />
      <div className="flex-1 relative">
        <Editor />
        <Search />
      </div>
    </div>
  );
}

export default App;