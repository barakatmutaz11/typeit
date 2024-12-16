import React from 'react';
import { Sparkles } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
        <Sparkles className="w-6 h-6 text-white" />
      </div>
      <div>
        <h1 className="text-lg font-semibold text-white">Bolt.new</h1>
        <p className="text-xs text-gray-400">AI Tools Hub</p>
      </div>
    </div>
  );
}