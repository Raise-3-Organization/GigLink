'use client';

import React, { useState } from 'react';
import { useWizard } from '../WizardProvider';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const CATEGORIES = [
  'Frontend Development',
  'Backend Development',
  'Smart Contracts',
  'Design',
  'Content Creation',
  'Marketing',
  'Audit',
  'Other',
];

export function BasicInfoStep() {
  const { formData, updateFormData } = useWizard();
  const [tagInput, setTagInput] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !formData.tags.includes(tag)) {
      updateFormData({ tags: [...formData.tags, tag] });
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    updateFormData({
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Bounty Title</Label>
        <Input
          id="title"
          placeholder="e.g. Build a responsive landing page"
          value={formData.title}
          onChange={(e) => updateFormData({ title: e.target.value })}
        />
        <p className="text-sm text-muted-foreground">
          A clear and concise title will help you attract the right contributors.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <select
          id="category"
          className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          value={formData.category}
          onChange={(e) => updateFormData({ category: e.target.value })}
        >
          <option value="" disabled>Select a category</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags">Tags</Label>
        <div className="flex gap-2 mb-2 flex-wrap">
          {formData.tags.map((tag) => (
            <div
              key={tag}
              className="flex items-center gap-1 bg-secondary text-secondary-foreground px-2.5 py-0.5 rounded-md text-sm"
            >
              <span>{tag}</span>
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            id="tags"
            placeholder="Add a tag (press Enter)"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button type="button" variant="secondary" onClick={addTag}>
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
