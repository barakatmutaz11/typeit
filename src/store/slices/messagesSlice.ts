import { create } from 'zustand';
import { Message } from '../../types';

interface MessagesState {
  messages: Message[];
  addMessage: (message: Message) => void;
  clearMessages: () => void;
}

export const useMessagesStore = create<MessagesState>((set) => ({
  messages: [],
  addMessage: (message) => set((state) => ({
    messages: [...state.messages, message],
  })),
  clearMessages: () => set({ messages: [] }),
}));