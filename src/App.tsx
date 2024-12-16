import React from 'react';
import { ChatArea } from './components/chat/ChatArea';
import { Sidebar } from './components/layout/Sidebar';
import { ToolsPanel } from './components/tools/ToolsPanel';
import { StripeProvider } from './components/subscription/StripeProvider';
import { useTheme } from './hooks/useTheme';
import { Toaster } from 'react-hot-toast';

function App() {
  useTheme();

  return (
    <StripeProvider>
      <div className="flex h-screen bg-gray-900 text-white">
        <Sidebar />
        <div className="flex flex-1 pl-[300px] transition-all duration-300">
          <ChatArea />
          <ToolsPanel />
        </div>
      </div>
      <Toaster 
        position="top-right"
        toastOptions={{
          className: 'dark:bg-gray-800 dark:text-white',
          style: {
            background: 'var(--toast-bg)',
            color: 'var(--toast-color)',
          },
        }}
      />
    </StripeProvider>
  );
}

export default App;