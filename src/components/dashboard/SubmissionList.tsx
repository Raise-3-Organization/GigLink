'use client';

import { formatDistanceToNow } from 'date-fns';
import { Clock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export type SubmissionStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'IN_REVIEW';

export interface Submission {
  id: string;
  bountyTitle: string;
  bountyReward: string;
  submittedAt: Date;
  status: SubmissionStatus;
}

interface SubmissionListProps {
  submissions: Submission[];
}

const statusConfig = {
  PENDING: { label: 'Pending', icon: Clock, className: 'bg-yellow-100 text-yellow-700' },
  IN_REVIEW: { label: 'In Review', icon: AlertCircle, className: 'bg-blue-100 text-blue-700' },
  ACCEPTED: { label: 'Accepted', icon: CheckCircle2, className: 'bg-green-100 text-green-700' },
  REJECTED: { label: 'Rejected', icon: XCircle, className: 'bg-red-100 text-red-700' },
};

export function SubmissionList({ submissions }: SubmissionListProps) {
  if (submissions.length === 0) {
    return (
      <div className="text-center py-12 border rounded-xl bg-slate-50">
        <h3 className="text-lg font-medium text-slate-900">No submissions yet</h3>
        <p className="text-slate-500 mt-1 mb-6">Find a bounty and start working!</p>
        <Button variant="outline">Browse Bounties</Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {submissions.map((submission) => {
        const StatusIcon = statusConfig[submission.status].icon;
        
        return (
          <div
            key={submission.id}
            className="flex items-center justify-between p-4 bg-white border rounded-xl hover:border-blue-200 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-lg ${statusConfig[submission.status].className}`}>
                <StatusIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">
                  {submission.bountyTitle}
                </h3>
                <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                  <span>Submitted {formatDistanceToNow(submission.submittedAt)} ago</span>
                  <span>•</span>
                  <span>Reward: {submission.bountyReward}</span>
                </div>
              </div>
            </div>

            <div>
              <Badge variant="outline" className={statusConfig[submission.status].className.replace('bg-', 'border-').replace('text-', 'text-')}>
                {statusConfig[submission.status].label}
              </Badge>
            </div>
          </div>
        );
      })}
    </div>
  );
}
