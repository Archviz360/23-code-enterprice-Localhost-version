import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarProps {
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ children, isOpen, onToggle }: SidebarProps) {
  return (
    <div className={`${isOpen ? 'w-64' : 'w-0'} transition-all duration-300 relative`}>
      <div className={`absolute inset-y-0 ${isOpen ? 'left-0' : '-left-64'} w-64 bg-gray-800 transition-all duration-300`}>
        <div className="h-full flex flex-col">
          {children}
        </div>
      </div>
      
      <button
        onClick={onToggle}
        className="absolute top-2 -right-6 p-1 bg-gray-800 rounded-r text-gray-400 hover:text-white"
      >
        {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>
    </div>
  );
}