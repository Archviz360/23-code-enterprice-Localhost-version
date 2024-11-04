import React, { useState } from 'react';
import { Users, Link, Copy } from 'lucide-react';
import { useCollaborationStore } from '../store/collaborationStore';

export function CollaborationPanel() {
  const [showPanel, setShowPanel] = useState(false);
  const [joinId, setJoinId] = useState('');
  const { roomId, collaborators, createRoom, joinRoom, isConnected } = useCollaborationStore();

  const copyRoomId = () => {
    if (roomId) {
      navigator.clipboard.writeText(roomId);
    }
  };

  if (!showPanel) {
    return (
      <button
        onClick={() => setShowPanel(true)}
        className="fixed bottom-4 right-4 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700"
      >
        <Users className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Collaboration</h3>
        <button
          onClick={() => setShowPanel(false)}
          className="text-gray-400 hover:text-gray-300"
        >
          ×
        </button>
      </div>

      {!isConnected ? (
        <div className="text-red-400 text-sm mb-4">
          Not connected to collaboration server
        </div>
      ) : (
        <>
          {roomId ? (
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-gray-300">Room ID:</span>
                <code className="bg-gray-900 px-2 py-1 rounded text-blue-400">
                  {roomId}
                </code>
                <button
                  onClick={copyRoomId}
                  className="p-1 text-gray-400 hover:text-gray-300"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <div className="text-sm text-gray-400">
                {collaborators.length} collaborator(s) connected
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <button
                onClick={createRoom}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Create New Room
              </button>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={joinId}
                  onChange={(e) => setJoinId(e.target.value)}
                  placeholder="Enter Room ID"
                  className="flex-1 bg-gray-900 text-gray-300 text-sm rounded px-3 py-2 border border-gray-700"
                />
                <button
                  onClick={() => joinRoom(joinId)}
                  className="p-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600"
                >
                  <Link className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}