import * as Y from 'yjs';

interface CollaborationMessage {
  type: 'update' | 'cursor' | 'presence';
  data: any;
  userId: string;
}

class LocalCollaboration {
  private doc: Y.Doc;
  private callbacks: Map<string, (message: CollaborationMessage) => void>;
  private userId: string;

  constructor() {
    this.doc = new Y.Doc();
    this.callbacks = new Map();
    this.userId = `user-${Math.random().toString(36).substr(2, 9)}`;
  }

  subscribe(type: string, callback: (message: CollaborationMessage) => void) {
    this.callbacks.set(type, callback);
    return () => this.callbacks.delete(type);
  }

  broadcast(message: CollaborationMessage) {
    this.callbacks.forEach(callback => callback({
      ...message,
      userId: this.userId
    }));
  }

  getDocument() {
    return this.doc;
  }

  getUserId() {
    return this.userId;
  }
}

let collaborationInstance: LocalCollaboration | null = null;

export function setupCollaboration() {
  if (!collaborationInstance) {
    collaborationInstance = new LocalCollaboration();
  }
  return collaborationInstance;
}

export function getCollaborationInstance() {
  if (!collaborationInstance) {
    collaborationInstance = new LocalCollaboration();
  }
  return collaborationInstance;
}