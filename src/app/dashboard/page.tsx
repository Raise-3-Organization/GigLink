import { PageHeader } from '@/components/PageHeader';
import { BountyList, Bounty } from '@/components/dashboard/BountyList';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus } from 'lucide-react';

// Mock Data
const MOCK_BOUNTIES: Bounty[] = [
  {
    id: '1',
    title: 'Build a Responsive Landing Page',
    status: 'OPEN',
    rewardAmount: 0.5,
    rewardToken: 'ETH',
    createdAt: new Date(Date.now() - 86400000 * 2), // 2 days ago
    applicantCount: 3,
  },
  {
    id: '2',
    title: 'Integrate Web3 Wallet Connection',
    status: 'IN_PROGRESS',
    rewardAmount: 1000,
    rewardToken: 'USDC',
    createdAt: new Date(Date.now() - 86400000 * 5), // 5 days ago
    applicantCount: 8,
  },
  {
    id: '3',
    title: 'Fix Smart Contract Bug',
    status: 'COMPLETED',
    rewardAmount: 5000,
    rewardToken: 'DEGEN',
    createdAt: new Date(Date.now() - 86400000 * 10), // 10 days ago
    applicantCount: 1,
  },
];

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <PageHeader
        title="My Dashboard"
        description="Manage your bounties and track your submissions."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Dashboard' },
        ]}
        action={
          <Link href="/create">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Bounty
            </Button>
          </Link>
        }
      />
      
      <div className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-slate-900">Recent Bounties</h2>
          <Button variant="link" className="text-blue-600">View All</Button>
        </div>
        <BountyList bounties={MOCK_BOUNTIES} />
      </div>
    </div>
  );
}
