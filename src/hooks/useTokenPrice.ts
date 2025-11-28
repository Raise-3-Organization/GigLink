import { useState, useEffect } from 'react';

const MOCK_PRICES: Record<string, number> = {
  ETH: 3050.00,
  USDC: 1.00,
  DEGEN: 0.02,
};

export function useTokenPrice(token: string) {
  const [price, setPrice] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchPrice = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      setPrice(MOCK_PRICES[token] || 0);
      setLoading(false);
    };

    if (token) {
      fetchPrice();
    }
  }, [token]);

  return { price, loading };
}
