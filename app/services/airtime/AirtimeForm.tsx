'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Network {
  name: string;
  code: string;
  icon: string;
  color: string;
}

const networks: Network[] = [
  { name: 'MTN', code: 'mtn', icon: '📱', color: 'bg-yellow-400' },
  { name: 'Airtel', code: 'airtel', icon: '📱', color: 'bg-red-500' },
  { name: 'Glo', code: 'glo', icon: '📱', color: 'bg-green-500' },
  { name: '9Mobile', code: '9mobile', icon: '📱', color: 'bg-green-700' }
];

export default function AirtimeForm() {
  const [selectedNetwork, setSelectedNetwork] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const handleQuickAmount = (value: number) => {
    setAmount(value.toString());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate inputs
    if (!selectedNetwork) {
      setError('Please select a network');
      return;
    }

    if (!phone || phone.length < 11) {
      setError('Please enter a valid phone number (11 digits)');
      return;
    }

    const amountNum = parseFloat(amount);
    if (!amountNum || amountNum < 50) {
      setError('Please enter a valid amount (minimum ₦50)');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/vtu/airtime', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          network: selectedNetwork,
          phone: phone,
          amount: amountNum,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Airtime purchase successful! Your phone has been recharged.');
        // Reset form
        setSelectedNetwork('');
        setPhone('');
        setAmount('');
      } else {
        setError(data.error || 'Failed to purchase airtime. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
      console.error('Airtime purchase error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      <header className="bg-white dark:bg-gray-900 shadow-sm transition-colors">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href="/" className="mr-4 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
              ← Back
            </Link>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Buy Airtime</h1>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-colors">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-800 dark:text-red-200">
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 text-green-800 dark:text-green-200">
                {success}
              </div>
            )}

            {/* Network Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Select Network <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {networks.map((network) => (
                  <button
                    key={network.code}
                    type="button"
                    onClick={() => setSelectedNetwork(network.code)}
                    className={`flex flex-col items-center gap-2 p-4 border-2 rounded-lg transition ${
                      selectedNetwork === network.code
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                    }`}
                  >
                    <div className={`w-12 h-12 ${network.color} rounded-full flex items-center justify-center text-2xl text-white`}>
                      {network.icon}
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{network.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                placeholder="08012345678"
                maxLength={11}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400"
                required
              />
            </div>

            {/* Amount */}
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Amount <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="100"
                min="50"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400"
                required
              />
              <div className="flex flex-wrap gap-2 mt-3">
                {[100, 200, 500, 1000, 2000, 5000].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => handleQuickAmount(value)}
                    className="px-3 py-1 text-xs font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/50 transition"
                  >
                    ₦{value}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold transition ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-700'
              } text-white`}
            >
              {loading ? 'Processing...' : 'Purchase Airtime'}
            </button>
          </form>
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 transition-colors">
          <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">💡 Quick Tips</h3>
          <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
            <li>• Instant delivery after successful payment</li>
            <li>• No hidden charges</li>
            <li>• 24/7 customer support available</li>
            <li>• Minimum amount: ₦50</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
