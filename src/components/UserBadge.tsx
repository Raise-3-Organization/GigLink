'use client';

import { truncateAddress } from '@/utils/address';

interface UserBadgeProps {
  address: `0x${string}`;
  basename?: string | null;
}

export function UserBadge({ address, basename }: UserBadgeProps) {
  const displayName = basename || truncateAddress(address);
  
  return (
    <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-secondary/50 border border-border">
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 rounded-full bg-green-500" />
        <span className="text-sm font-medium">{displayName}</span>
      </div>
    </div>
  );
}
