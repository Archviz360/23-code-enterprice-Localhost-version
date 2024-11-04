import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

interface CollaborationState {
  socket: Socket | null;
  roomId: string | null;
  collaborators: Array<{ id: string; name: string }>;
  isConnected: boolean;
  createRoom: () => void;
  joinRoom: (roomId: string) => void;
  leaveRoom: () => void;
  initialize: () => void;
}

export const useCollaborationStore = create<CollaborationState>((set, get) => ({
  socket: null,
  roomId: null,
  collaborators: [],
  isConnected: false,

  initialize: () => {
    const socket = io('http://localhost:3001');

    socket.on('connect', () => {
      set({ isConnected: true });
    });

    socket.on('disconnect', () => {
      set({ isConnected: false });
    });

    socket.on('collaboratorJoined', (collaborator) => {
      set((state) => ({
        collaborators: [...state.collaborators, collaborator],
      }));
    });

    socket.on('collaboratorLeft', (collaboratorId) => {
      set((state) => ({
        collaborators: state.collaborators.filter((c) => c.id !== collaboratorId),
      }));
    });

    set({ socket });
  },

  createRoom: () => {
    const { socket } = get();
    if (!socket) return;

    const roomId = uuidv4().slice(0, 8);
    socket.emit('createRoom', roomId);
    set({ roomId });
  },

  joinRoom: (roomId: string) => {
    const { socket } = get();
    if (!socket) return;

    socket.emit('joinRoom', roomId);
    set({ roomId });
  },

  leaveRoom: () => {
    const { socket, roomId } = get();
    if (!socket || !roomId) return;

    socket.emit('leaveRoom', roomId);
    set({ roomId: null, collaborators: [] });
  },
}));