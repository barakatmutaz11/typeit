import React, { useState } from 'react';
import { ToolsHeader } from './tools/ToolsHeader';
import { ToolList } from './tools/ToolList';
import { AddToolDialog } from './AddToolDialog';
import { useDebounce } from '../utils/hooks/useDebounce';

export function ToolsPanel() {
  const [showAddTool, setShowAddTool] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const debouncedSearch = useDebounce(searchQuery, 300);

  return (
    <div className="w-80 border-l border-gray-100 bg-gray-50 p-4 flex flex-col h-screen">
      <ToolsHeader
        onSearch={setSearchQuery}
        onCategoryChange={setSelectedCategory}
        onAddTool={() => setShowAddTool(true)}
      />
      
      <div className="mt-4 flex-1 overflow-y-auto">
        <ToolList
          category={selectedCategory}
          searchQuery={debouncedSearch}
        />
      </div>

      <AddToolDialog
        isOpen={showAddTool}
        onClose={() => setShowAddTool(false)}
      />
    </div>
  );
}