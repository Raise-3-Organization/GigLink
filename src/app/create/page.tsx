'use client';

import { useState } from 'react';
import { WizardProvider, useWizard } from '@/components/create-bounty/WizardProvider';
import { CreateBountyForm } from '@/components/create-bounty/CreateBountyForm';
import { PageHeader } from '@/components/PageHeader';
import { PreviewToggle } from '@/components/create-bounty/PreviewToggle';

function CreateBountyContent() {
  const [mode, setMode] = useState<'edit' | 'preview'>('edit');
  const { formData } = useWizard();

  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader
        title="Create Bounty"
        description="Create a new bounty to get help with your tasks."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Create Bounty' },
        ]}
        action={<PreviewToggle mode={mode} onToggle={setMode} />}
      />
      
      {mode === 'edit' ? (
        <CreateBountyForm />
      ) : (
        <div className="max-w-xl mx-auto mt-8">
          <div className="p-6 border rounded-xl bg-slate-50 text-center text-muted-foreground">
            <p>Preview Card Coming Soon (Commit #13)</p>
            <pre className="mt-4 text-xs text-left bg-slate-100 p-4 rounded overflow-auto">
              {JSON.stringify(formData, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CreateBountyPage() {
  return (
    <WizardProvider>
      <CreateBountyContent />
    </WizardProvider>
  );
}
