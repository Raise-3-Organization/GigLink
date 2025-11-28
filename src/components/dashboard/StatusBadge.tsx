import { 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Loader2, 
  Banknote 
} from 'lucide-react';

// You can move this type to your global types file later if needed
export type ApplicationStatus = 'PENDING' | 'IN_REVIEW' | 'ACCEPTED' | 'REJECTED' | 'PAID';

interface StatusBadgeProps {
  status: ApplicationStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const styles = {
    PENDING: {
      color: 'text-yellow-700 bg-yellow-50 border-yellow-200',
      icon: Clock,
      label: 'Pending Review'
    },
    IN_REVIEW: {
      color: 'text-blue-700 bg-blue-50 border-blue-200',
      icon: Loader2,
      label: 'In Progress'
    },
    ACCEPTED: {
      color: 'text-indigo-700 bg-indigo-50 border-indigo-200',
      icon: CheckCircle2,
      label: 'Approved'
    },
    REJECTED: {
      color: 'text-red-700 bg-red-50 border-red-200',
      icon: XCircle,
      label: 'Declined'
    },
    PAID: {
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      icon: Banknote,
      label: 'Payment Sent'
    }
  };

  const config = styles[status] || styles.PENDING;
  const Icon = config.icon;

  return (
    <span className={`
      inline-flex items-center gap-1.5 px-2.5 py-0.5 
      rounded-full text-xs font-medium border 
      ${config.color}
    `}>
      <Icon className="w-3.5 h-3.5" />
      {config.label}
    </span>
  );
}
