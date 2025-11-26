import { Clock, Users } from 'lucide-react';

interface BountyCardFooterProps {
  deadline: Date;
  applicantCount: number;
}

export function BountyCardFooter({ deadline, applicantCount }: BountyCardFooterProps) {
  // Simple logic to calculate days left
  const daysLeft = Math.ceil((new Date(deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24));

  return (
    <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
      <div className="flex items-center gap-1.5 text-xs text-slate-500">
        <Clock className="w-3.5 h-3.5" />
        <span>{daysLeft > 0 ? `${daysLeft} days left` : 'Expired'}</span>
      </div>
      
      <div className="flex items-center gap-1.5 text-xs text-slate-500">
        <Users className="w-3.5 h-3.5" />
        <span>{applicantCount} applicants</span>
      </div>
    </div>
  );
}
