'use client';

import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { StatusBadge, BountyStatus } from './StatusBadge';

export type { BountyStatus };

export interface Bounty {
  id: string;
  title: string;
  status: BountyStatus;
  rewardAmount: number;
  rewardToken: string;
  createdAt: Date;
  applicantCount: number;
}

interface BountyListProps {
  bounties: Bounty[];
  onMarkComplete?: (id: string) => void;
  onCancelBounty?: (id: string) => void;
}

export function BountyList({ bounties, onMarkComplete, onCancelBounty }: BountyListProps) {
  if (bounties.length === 0) {
    return (
      <div className="text-center py-12 border rounded-xl bg-slate-50">
        <h3 className="text-lg font-medium text-slate-900">No bounties yet</h3>
        <p className="text-slate-500 mt-1 mb-6">Create your first bounty to get started.</p>
        <Link href="/create">
          <Button>Create Bounty</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bounties.map((bounty) => (
        <div
          key={bounty.id}
          className="flex items-center justify-between p-4 bg-white border rounded-xl hover:border-blue-200 transition-colors group"
        >
          <div className="flex items-center gap-4">
            <div>
              <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                {bounty.title}
              </h3>
              <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                <span>Created {formatDistanceToNow(bounty.createdAt)} ago</span>
                <span>•</span>
                <span>{bounty.applicantCount} applicants</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="font-bold text-slate-900">
                {bounty.rewardAmount} {bounty.rewardToken}
              </div>
              <div className="mt-1 flex justify-end">
                <StatusBadge status={bounty.status} />
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View Details</DropdownMenuItem>
                <DropdownMenuItem>Edit Bounty</DropdownMenuItem>
                {bounty.status !== 'COMPLETED' && bounty.status !== 'CANCELLED' && onMarkComplete && (
                  <DropdownMenuItem 
                    className="text-green-600 font-medium"
                    onClick={() => onMarkComplete(bounty.id)}
                  >
                    Mark as Complete
                  </DropdownMenuItem>
                )}
                {bounty.status !== 'CANCELLED' && bounty.status !== 'COMPLETED' && onCancelBounty && (
                  <DropdownMenuItem 
                    className="text-red-600"
                    onClick={() => onCancelBounty(bounty.id)}
                  >
                    Cancel Bounty
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
    </div>
  );
}
