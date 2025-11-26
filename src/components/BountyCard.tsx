import React from 'react';
import { Bounty, BountyStatus } from '@/types/bounty';
import { formatCurrency, formatUsd } from '@/utils/currency';
import { getTimeRemaining } from '@/utils/date';
import { CURRENCY_LOGOS } from '@/constants/currencies';

interface BountyCardProps {
  bounty: Bounty;
  onClick?: (id: string) => void;
}

export const BountyCard: React.FC<BountyCardProps> = ({ bounty, onClick }) => {
  const statusColors = {
    [BountyStatus.OPEN]: 'bg-green-100 text-green-800 border-green-200',
    [BountyStatus.IN_PROGRESS]: 'bg-blue-100 text-blue-800 border-blue-200',
    [BountyStatus.IN_REVIEW]: 'bg-purple-100 text-purple-800 border-purple-200',
    [BountyStatus.PAID]: 'bg-gray-100 text-gray-800 border-gray-200',
  };

  const difficultyColors = {
    Beginner: 'bg-teal-50 text-teal-700 border-teal-100',
    Intermediate: 'bg-indigo-50 text-indigo-700 border-indigo-100',
    Expert: 'bg-rose-50 text-rose-700 border-rose-100',
  };

  return (
    <div 
      className="group relative flex flex-col justify-between p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-500 transition-all duration-200 cursor-pointer"
      onClick={() => onClick?.(bounty.id)}
    >
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
            {bounty.title}
          </h3>
          {/* Reward Badge */}
          <div className="flex flex-col items-end shrink-0 ml-4">
            <div className="flex items-center gap-1.5 font-mono font-bold text-gray-900">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={CURRENCY_LOGOS[bounty.reward.token]} 
                alt={bounty.reward.token}
                className="w-5 h-5"
              />
              <span>{formatCurrency(bounty.reward.amount, bounty.reward.token)}</span>
            </div>
            <span className="text-xs text-gray-500 font-medium">
              ≈ {formatUsd(bounty.reward.usdValue)}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 shrink-0" />
          <span className="font-medium truncate">{bounty.issuer.name}</span>
        </div>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-6">
        <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border ${statusColors[bounty.status]}`}>
          {bounty.status.replace('_', ' ')}
        </span>
        <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border ${difficultyColors[bounty.difficulty]}`}>
          {bounty.difficulty}
        </span>
        {bounty.tags.slice(0, 2).map(tag => (
          <span key={tag} className="px-2.5 py-0.5 text-xs font-medium text-gray-600 bg-gray-50 rounded-full border border-gray-100">
            {tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 mt-auto border-t border-gray-100 text-sm text-gray-500">
        <div className="flex items-center gap-1.5">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{getTimeRemaining(bounty.deadline)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span>{bounty.applicantCount} applicants</span>
        </div>
      </div>
    </div>
  );
};
