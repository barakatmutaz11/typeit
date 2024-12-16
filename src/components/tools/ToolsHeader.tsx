import React from 'react';
import { Search, Plus } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { CATEGORIES } from '../../utils/constants';

interface ToolsHeaderProps {
  onSearch: (query: string) => void;
  onCategoryChange: (category: string) => void;
  onAddTool?: () => void;
}

export function ToolsHeader({ onSearch, onCategoryChange, onAddTool }: ToolsHeaderProps) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">AI Tools</h2>
        {onAddTool && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onAddTool}
          >
            <Plus size={20} />
          </Button>
        )}
      </div>
      
      <Input
        icon={<Search size={18} />}
        placeholder="Search tools..."
        onChange={(e) => onSearch(e.target.value)}
      />
      
      <select
        className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 
                   bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                   focus:border-primary-600 dark:focus:border-primary-500 
                   focus:ring focus:ring-primary-200 dark:focus:ring-primary-800
                   transition-colors duration-200"
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="all">All Categories</option>
        {Object.entries(CATEGORIES).map(([key, value]) => (
          <option key={value} value={value}>
            {key.charAt(0) + key.slice(1).toLowerCase()} Models
          </option>
        ))}
      </select>
    </div>
  );
}