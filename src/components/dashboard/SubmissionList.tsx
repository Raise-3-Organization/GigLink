'use client';

import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';
import { StatusBadge, ApplicationStatus } from './StatusBadge';

export interface Submission {
  id: string;
  bountyTitle: string;
  bountyReward: string;
  submittedAt: Date;
  status: ApplicationStatus;
}

interface SubmissionListProps {
  submissions: Submission[];
}

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
      {submissions.map((submission) => (
        <div
          key={submission.id}
          className="flex items-center justify-between p-4 bg-white border rounded-xl hover:border-blue-200 transition-colors"
        >
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

          <div>
            <StatusBadge status={submission.status} />
          </div>
        </div>
      ))}
    </div>
  );
}
