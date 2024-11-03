import React, { useState } from 'react';
import { Users, Link, UserPlus } from 'lucide-react';
import { useCollaborationStore } from '../store/collaborationStore';

export function Collaboration() {
  const [showInvite, setShowInvite] = useState(false);
  const { roomId, initializeCollaboration, disconnectCollaboration } = useCollaborationStore();

  const handleStartCollaboration = () => {
    const newRoomId = Math.random().toString(36).substring(7);
    initializeCollaboration(newRoomId);
    setShowInvite(true);
  };

  const handleJoinRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const joinRoomId = formData.get('roomId') as string;
    if (joinRoomId) {
      initializeCollaboration(joinRoomId);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleStartCollaboration}
        className="p-2 text-gray-300 hover:bg-gray-800 rounded flex items-center gap-2"
      >
        <Users className="w-5 h-5" />
        <span className="text-sm">Collaborate</span>
      </button>

      {showInvite && (
        <div className="absolute right-0 mt-2 w-80 bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white text-sm font-medium">Share Room ID</h3>
            <button
              onClick={() => setShowInvite(false)}
              className="text-gray-400 hover:text-white"
            >
              <Link className="w-4 h-4" />
            </button>
          </div>
          <div className="bg-gray-900 p-2 rounded mb-4">
            <code className="text-sm text-gray-300">{roomId}</code>
          </div>
          <button
            onClick={() => navigator.clipboard.writeText(roomId)}
            className="w-full px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Copy Room ID
          </button>
        </div>
      )}

      {!roomId && (
        <form onSubmit={handleJoinRoom} className="absolute right-0 mt-2 w-80 bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-4">
          <div className="flex items-center gap-2 mb-4">
            <UserPlus className="w-4 h-4 text-gray-400" />
            <input
              name="roomId"
              placeholder="Enter Room ID"
              className="flex-1 bg-gray-900 text-gray-300 text-sm rounded px-2 py-1 border border-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Join Room
          </button>
        </form>
      )}
    </div>
  );
}