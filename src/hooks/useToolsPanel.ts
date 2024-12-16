import { useState } from 'react';
import { useDebounce } from './useDebounce';

export function useToolsPanel() {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  
  const debouncedSearch = useDebounce(searchQuery, 300);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
  };

  return {
    searchQuery: debouncedSearch,
    category,
    handleSearch,
    handleCategoryChange,
  };
}