import { create } from 'zustand';
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import { MonacoBinding } from 'y-monaco';

interface CollaborationState {
  doc: Y.Doc | null;
  provider: WebrtcProvider | null;
  binding: MonacoBinding | null;
  roomId: string;
  setBinding: (binding: MonacoBinding) => void;
  initializeCollaboration: (roomId: string) => void;
  disconnectCollaboration: () => void;
}

export const useCollaborationStore = create<CollaborationState>((set, get) => ({
  doc: null,
  provider: null,
  binding: null,
  roomId: '',
  setBinding: (binding) => set({ binding }),
  initializeCollaboration: (roomId) => {
    const doc = new Y.Doc();
    const provider = new WebrtcProvider(`code-editor-${roomId}`, doc, {
      signaling: ['wss://signaling.yjs.dev'],
    });

    set({ doc, provider, roomId });
  },
  disconnectCollaboration: () => {
    const { provider, doc } = get();
    provider?.destroy();
    doc?.destroy();
    set({ doc: null, provider: null, binding: null, roomId: '' });
  },
}));