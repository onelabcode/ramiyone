'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';


export function SearchBar({ onSearch }) {
  return (
    <div className="relative mb-6">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      <Input
        type="text"
        placeholder="Search players..."
        className="pl-10 h-12 bg-white border-gray-200"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}