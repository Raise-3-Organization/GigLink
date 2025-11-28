import { WizardProvider } from '@/components/create-bounty/WizardProvider';
import { CreateBountyForm } from '@/components/create-bounty/CreateBountyForm';

export default function CreateBountyPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Create Bounty</h1>
        <p className="text-muted-foreground mt-2">
          Create a new bounty to get help with your tasks.
        </p>
      </div>
      <WizardProvider>
        <CreateBountyForm />
      </WizardProvider>
    </div>
  );
}
