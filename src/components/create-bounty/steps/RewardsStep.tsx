'use client';

import { useWizard } from '../WizardProvider';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { TokenAmountInput } from '../TokenAmountInput';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function RewardsStep() {
  const { formData, updateFormData } = useWizard();

  return (
    <div className="space-y-6">
      <TokenAmountInput
        amount={formData.rewardAmount}
        token={formData.rewardToken}
        onAmountChange={(val) => updateFormData({ rewardAmount: val })}
        onTokenChange={(val) => updateFormData({ rewardToken: val })}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="deadline">Deadline</Label>
          <Input
            id="deadline"
            type="date"
            value={formData.deadline ? new Date(formData.deadline).toISOString().split('T')[0] : ''}
            onChange={(e) => updateFormData({ deadline: e.target.value ? new Date(e.target.value) : undefined })}
            className="rounded-xl border-slate-200"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="difficulty">Difficulty Level</Label>
          <Select
            value={formData.difficulty}
            onValueChange={(val: any) => updateFormData({ difficulty: val })}
          >
            <SelectTrigger id="difficulty" className="rounded-xl border-slate-200">
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Expert">Expert</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
