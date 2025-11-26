'use client';

import * as React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SearchInputProps {
  value?: string;
  onSearch: (term: string) => void;
  placeholder?: string;
}

export function SearchInput({ value: initialValue, onSearch, placeholder = 'Search...' }: SearchInputProps) {
  // Simple internal debounce
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // In a real app, wrap onSearch in a debounce function here
    // For now, we pass it up directly or use a timeout
    const timeoutId = setTimeout(() => onSearch(value), 300);
    return () => clearTimeout(timeoutId);
  };

  return (
    <div className="relative w-full md:w-[300px]">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
      <Input 
        defaultValue={initialValue}
        onChange={handleChange}
        placeholder={placeholder}
        className="pl-9 bg-slate-50 border-slate-200 focus:bg-white transition-all rounded-xl"
        aria-label="Search bounties"
      />
    </div>
  );
}
