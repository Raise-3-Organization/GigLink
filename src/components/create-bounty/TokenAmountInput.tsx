'use client';

import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

import { useTokenPrice } from '@/hooks/useTokenPrice';

interface TokenAmountInputProps {
  amount: string;
  token: string;
  onAmountChange: (val: string) => void;
  onTokenChange: (val: string) => void;
}

export function TokenAmountInput({ 
  amount, 
  token, 
  onAmountChange, 
  onTokenChange 
}: TokenAmountInputProps) {
  const { price, loading } = useTokenPrice(token);
  
  const estimatedValue = amount && !isNaN(parseFloat(amount)) 
    ? (parseFloat(amount) * price).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    : '$0.00';

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-700">Reward Budget</label>
      <div className="flex gap-2">
        <div className="flex-1">
          <Input 
            type="number" 
            placeholder="0.00" 
            value={amount}
            onChange={(e) => onAmountChange(e.target.value)}
            className="rounded-xl border-slate-200"
          />
        </div>
        <div className="w-[120px]">
          <Select value={token} onValueChange={onTokenChange}>
            <SelectTrigger className="rounded-xl border-slate-200 bg-slate-50 font-medium">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ETH">ETH</SelectItem>
              <SelectItem value="USDC">USDC</SelectItem>
              <SelectItem value="DEGEN">DEGEN</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <p className="text-xs text-slate-500">
        Estimated value: <span className="font-semibold text-slate-700">
          {loading ? 'Calculating...' : estimatedValue}
        </span>
      </p>
    </div>
  );
}
