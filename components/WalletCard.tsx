'use client';

import { useEffect, useState } from 'react';

interface BalanceData {
  balance: string | number;
  bonus?: string | number;
}

export default function WalletCard() {
  const [balance, setBalance] = useState<BalanceData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    try {
      const response = await fetch('/api/vtu/balance');
      const data = await response.json();

      if (data.success) {
        setBalance(data.data);
      } else {
        setError(data.error || 'Failed to fetch balance');
      }
    } catch (err) {
      setError('Network error. Please check your connection.');
      console.error('Balance fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: string | number | undefined): string => {
    if (value === undefined || value === null) return '0.00';
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    return numValue.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 text-white mb-6 shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm opacity-90 mb-1">Wallet Balance</p>
          {loading ? (
            <div className="h-9 w-32 bg-white/20 rounded animate-pulse"></div>
          ) : error ? (
            <div className="text-sm text-red-200">Error loading balance</div>
          ) : (
            <h2 className="text-3xl font-bold">₦{formatCurrency(balance?.balance)}</h2>
          )}
        </div>
        <button 
          onClick={fetchBalance}
          className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/30 transition"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Refresh'}
        </button>
      </div>
      <div className="flex gap-3 mt-4">
        <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-lg p-3">
          <p className="text-xs opacity-90">Bonus</p>
          {loading ? (
            <div className="h-5 w-16 bg-white/20 rounded animate-pulse mt-1"></div>
          ) : (
            <p className="font-semibold">₦{formatCurrency(balance?.bonus || 0)}</p>
          )}
        </div>
        <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-lg p-3">
          <p className="text-xs opacity-90">Referrals</p>
          <p className="font-semibold">0</p>
        </div>
      </div>
    </div>
  );
}
