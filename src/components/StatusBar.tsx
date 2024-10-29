import React from 'react';
import { Wifi, Users } from 'lucide-react';
import { useStore } from '../store';

export function StatusBar() {
  const { connectedUsers } = useStore();

  return (
    <div className="h-6 bg-gray-800 border-t border-gray-700 flex items-center px-4 text-sm text-gray-400">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Wifi size={14} className="text-green-400" />
          <span>Connected</span>
        </div>

        <div className="flex items-center gap-2">
          <Users size={14} />
          <span>{connectedUsers} online</span>
        </div>
      </div>

      <div className="flex-1" />

      <div className="flex items-center gap-4">
        <span>Ln 1, Col 1</span>
        <span>UTF-8</span>
        <span>JavaScript</span>
      </div>
    </div>
  );
}