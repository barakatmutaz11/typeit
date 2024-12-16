import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '../ui/Input';
import { ToolList } from './ToolList';
import { useDebounce } from '../../hooks/useDebounce';

export function ToolsPanel() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const debouncedSearch = useDebounce(searchQuery, 300);

  return (
    <aside className="w-[320px] border-l border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex flex-col h-screen sticky top-0 right-0">
      <div className="sticky top-0 bg-white dark:bg-gray-800 z-10 p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          AI Tools
        </h2>
        
        <Input
          icon={<Search size={18} />}
          placeholder="Search tools..."
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-4"
        />
        
        <select
          className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="language">Language Models</option>
          <option value="image">Image Generation</option>
          <option value="code">Code Generation</option>
          <option value="audio">Audio Processing</option>
          <option value="video">Video Generation</option>
          <option value="research">Research & Analysis</option>
        </select>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <ToolList
          searchQuery={debouncedSearch}
          category={selectedCategory}
        />
      </div>
    </aside>
  );
}
