'use client';

import { Eye, PenLine } from 'lucide-react';

interface PreviewToggleProps {
  mode: 'edit' | 'preview';
  onToggle: (mode: 'edit' | 'preview') => void;
}

export function PreviewToggle({ mode, onToggle }: PreviewToggleProps) {
  return (
    <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 w-fit">
      <button
        type="button" // Important: prevents form submission
        onClick={() => onToggle('edit')}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200
          ${mode === 'edit' 
            ? 'bg-white text-slate-900 shadow-sm ring-1 ring-black/5' 
            : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}
        `}
      >
        <PenLine className="w-4 h-4" />
        <span>Edit</span>
      </button>

      <button
        type="button"
        onClick={() => onToggle('preview')}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200
          ${mode === 'preview' 
            ? 'bg-white text-blue-600 shadow-sm ring-1 ring-black/5' 
            : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}
        `}
      >
        <Eye className="w-4 h-4" />
        <span>Preview</span>
      </button>
    </div>
  );
}
