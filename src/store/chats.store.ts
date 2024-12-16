import { create } from 'zustand';
import { Message } from '../types';

interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  activeToolIds: string[];
}

interface ChatsState {
  chats: Chat[];
  activeChat: string | null;
  createChat: () => void;
  setActiveChat: (chatId: string) => void;
  addMessage: (chatId: string, message: Message) => void;
  updateChatTitle: (chatId: string, title: string) => void;
  updateChatTools: (chatId: string, toolIds: string[]) => void;
}

export const useChatsStore = create<ChatsState>((set, get) => ({
  chats: [],
  activeChat: null,
  createChat: () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [],
      createdAt: new Date(),
      activeToolIds: []
    };

    set(state => ({
      chats: [newChat, ...state.chats],
      activeChat: newChat.id
    }));

    return newChat.id;
  },
  setActiveChat: (chatId) => {
    set({ activeChat: chatId });
  },
  addMessage: (chatId, message) => {
    set(state => {
      const updatedChats = state.chats.map(chat => {
        if (chat.id === chatId) {
          const updatedChat = { 
            ...chat, 
            messages: [...chat.messages, message] 
          };

          // Update title based on first user message if it's still "New Chat"
          if (chat.title === 'New Chat' && message.sender === 'user') {
            const title = message.content.slice(0, 30) + (message.content.length > 30 ? '...' : '');
            updatedChat.title = title;
          }

          return updatedChat;
        }
        return chat;
      });

      return { chats: updatedChats };
    });
  },
  updateChatTitle: (chatId, title) => {
    set(state => ({
      chats: state.chats.map(chat =>
        chat.id === chatId ? { ...chat, title } : chat
      )
    }));
  },
  updateChatTools: (chatId, toolIds) => {
    set(state => ({
      chats: state.chats.map(chat =>
        chat.id === chatId ? { ...chat, activeToolIds: toolIds } : chat
      )
    }));
  }
}));