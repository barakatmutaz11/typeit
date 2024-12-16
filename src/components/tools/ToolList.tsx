import React from 'react';
import { ToolCard } from './ToolCard';
import { aiTools } from '../../data/aiTools';

interface ToolListProps {
  category: string;
  searchQuery: string;
}

export function ToolList({ category, searchQuery }: ToolListProps) {
  const filteredTools = aiTools.filter(tool => {
    const matchesSearch = !searchQuery || 
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.provider.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !category || category === 'all' || tool.category === category;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-3">
      {filteredTools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
      {filteredTools.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No tools found matching your criteria
        </div>
      )}
    </div>
  );
}