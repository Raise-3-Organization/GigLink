'use client';

import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { MoreHorizontal, Clock, CheckCircle2, CircleDashed } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

export type BountyStatus = 'OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

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
}

const statusConfig = {
  OPEN: { label: 'Open', icon: CircleDashed, className: 'bg-green-100 text-green-700' },
  IN_PROGRESS: { label: 'In Progress', icon: Clock, className: 'bg-blue-100 text-blue-700' },
  COMPLETED: { label: 'Completed', icon: CheckCircle2, className: 'bg-slate-100 text-slate-700' },
  CANCELLED: { label: 'Cancelled', icon: CircleDashed, className: 'bg-red-100 text-red-700' },
};

export function BountyList({ bounties }: BountyListProps) {
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
      {bounties.map((bounty) => {
        const StatusIcon = statusConfig[bounty.status].icon;
        
        return (
          <div
            key={bounty.id}
            className="flex items-center justify-between p-4 bg-white border rounded-xl hover:border-blue-200 transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-lg ${statusConfig[bounty.status].className}`}>
                <StatusIcon className="w-5 h-5" />
              </div>
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
                <Badge variant="outline" className="mt-1">
                  {statusConfig[bounty.status].label}
                </Badge>
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
                  <DropdownMenuItem className="text-red-600">Cancel Bounty</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        );
      })}
    </div>
  );
}
