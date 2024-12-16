import React from 'react';
import { MessageSquare, Plus, Edit2 } from 'lucide-react';
import { useChatsStore } from '../../store/chats.store';
import { motion, AnimatePresence } from 'framer-motion';

export function ChatList() {
  const { chats, activeChat, createChat, setActiveChat, updateChatTitle } = useChatsStore();
  const [editingId, setEditingId] = React.useState<string | null>(null);

  const handleEditTitle = (chatId: string, currentTitle: string) => {
    const newTitle = prompt('Enter new chat title:', currentTitle);
    if (newTitle && newTitle !== currentTitle) {
      updateChatTitle(chatId, newTitle);
    }
  };

  return (
    <div className="flex flex-col gap-1 px-2">
      <button
        onClick={createChat}
        className="flex items-center gap-2 w-full px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
      >
        <Plus size={18} />
        <span>New Chat</span>
      </button>

      <AnimatePresence>
        {chats.map((chat) => (
          <motion.div
            key={chat.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className={`
              group flex items-center gap-2 w-full px-3 py-2 rounded-lg transition-colors
              ${chat.id === activeChat 
                ? 'bg-primary-600 text-white' 
                : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }
            `}
          >
            <button
              onClick={() => setActiveChat(chat.id)}
              className="flex items-center gap-2 flex-1 min-w-0"
            >
              <MessageSquare size={18} />
              <span className="truncate text-left">
                {chat.title}
              </span>
            </button>
            
            <button
              onClick={() => handleEditTitle(chat.id, chat.title)}
              className={`
                opacity-0 group-hover:opacity-100 transition-opacity
                hover:text-primary-300 p-1 rounded
              `}
            >
              <Edit2 size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}