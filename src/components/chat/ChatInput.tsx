import React, { useState, useRef } from 'react';
import { Send, Plus, Image, FileText, Paperclip, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatInputProps {
  onSendMessage: (message: string, attachments?: Array<{ type: string; content: string }>) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({ onSendMessage, disabled, placeholder = 'Type your message...' }: ChatInputProps) {
  const [input, setInput] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [attachments, setAttachments] = useState<Array<{ type: string; content: string }>>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if ((!input.trim() && attachments.length === 0) || disabled) return;
    onSendMessage(input, attachments);
    setInput('');
    setAttachments([]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'document') => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      if (type === 'image' && !file.type.startsWith('image/')) {
        throw new Error('Please select an image file');
      }

      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result as string;
        setAttachments(prev => [...prev, { type, content }]);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error processing file:', error);
      alert('Error processing file. Please try again.');
    }

    e.target.value = '';
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed bottom-0 left-[300px] right-[320px] bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
      <div className="max-w-5xl mx-auto">
        {attachments.length > 0 && (
          <div className="flex gap-2 mb-2 overflow-x-auto pb-2">
            {attachments.map((attachment, index) => (
              <div key={index} className="relative group">
                {attachment.type === 'image' ? (
                  <img 
                    src={attachment.content} 
                    alt="Preview" 
                    className="h-20 w-20 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                  />
                ) : (
                  <div className="h-20 w-20 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <FileText size={24} className="text-gray-500 dark:text-gray-400" />
                  </div>
                )}
                <button
                  onClick={() => removeAttachment(index)}
                  className="absolute -top-2 -right-2 p-1 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="relative flex items-center gap-2">
          <div className="absolute left-4 flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowOptions(!showOptions)}
              disabled={disabled}
              className="p-2"
            >
              <Plus 
                size={20} 
                className={`transition-transform duration-200 ${showOptions ? 'rotate-45' : ''}`}
              />
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={(e) => handleFileSelect(e, 'image')}
              accept="image/*"
            />
          </div>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className={`
              flex-1 pl-16 pr-16 py-4 
              bg-white dark:bg-gray-800 
              text-gray-900 dark:text-white
              placeholder:text-gray-400 dark:placeholder:text-gray-500
              border border-gray-200 dark:border-gray-700
              rounded-2xl
              focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400
              resize-none
              min-h-[60px]
              max-h-[200px]
              overflow-y-auto
              transition-all duration-200
              w-full
            `}
            style={{ lineHeight: '1.5' }}
          />

          <Button
            onClick={handleSend}
            disabled={disabled || (!input.trim() && attachments.length === 0)}
            className="absolute right-4 p-2"
          >
            <Send size={20} />
          </Button>

          <AnimatePresence>
            {showOptions && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute left-4 bottom-full mb-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="p-2 flex flex-col gap-1">
                  <button
                    onClick={() => {
                      fileInputRef.current?.click();
                      setShowOptions(false);
                    }}
                    className="flex items-center gap-2 px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <Image size={18} />
                    <span>Add Image</span>
                  </button>
                  <button
                    onClick={() => {
                      if (fileInputRef.current) {
                        fileInputRef.current.accept = '.pdf,.doc,.docx,.txt';
                        fileInputRef.current.click();
                      }
                      setShowOptions(false);
                    }}
                    className="flex items-center gap-2 px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <FileText size={18} />
                    <span>Add Document</span>
                  </button>
                  <button
                    onClick={() => {
                      if (fileInputRef.current) {
                        fileInputRef.current.accept = '*/*';
                        fileInputRef.current.click();
                      }
                      setShowOptions(false);
                    }}
                    className="flex items-center gap-2 px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <Paperclip size={18} />
                    <span>Add Attachment</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}