'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Network {
  name: string;
  code: string;
  icon: string;
  color: string;
}

interface DataPlan {
  variation_code: string;
  name: string;
  variation_amount: string | number;
  fixedPrice?: string;
}

const networks: Network[] = [
  { name: 'MTN', code: 'mtn', icon: '📱', color: 'bg-yellow-400' },
  { name: 'Airtel', code: 'airtel', icon: '📱', color: 'bg-red-500' },
  { name: 'Glo', code: 'glo', icon: '📱', color: 'bg-green-500' },
  { name: '9Mobile', code: '9mobile', icon: '📱', color: 'bg-green-700' }
];

export default function DataForm() {
  const [selectedNetwork, setSelectedNetwork] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [dataPlans, setDataPlans] = useState<DataPlan[]>([]);
  const [loadingPlans, setLoadingPlans] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  useEffect(() => {
    if (selectedNetwork) {
      fetchDataPlans();
    } else {
      setDataPlans([]);
      setSelectedPlan('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNetwork]);

  const fetchDataPlans = async () => {
    setLoadingPlans(true);
    setError('');
    
    try {
      const response = await fetch('/api/vtu/variations?service_type=data');
      const data = await response.json();

      if (data.success && data.data?.content) {
        // Filter plans by selected network
        const networkPlans = data.data.content.filter(
          (plan: DataPlan) => plan.variation_code?.toLowerCase().startsWith(selectedNetwork.toLowerCase())
        );
        setDataPlans(networkPlans);
      } else {
        setError('Failed to load data plans');
      }
    } catch (err) {
      setError('Failed to fetch data plans');
      console.error('Data plans fetch error:', err);
    } finally {
      setLoadingPlans(false);
    }
  };

  const formatPrice = (price: string | number): string => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return numPrice.toLocaleString('en-NG');
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

    if (!selectedPlan) {
      setError('Please select a data plan');
      return;
    }

    if (!phone || phone.length < 11) {
      setError('Please enter a valid phone number (11 digits)');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/vtu/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          network: selectedNetwork,
          phone: phone,
          variation_code: selectedPlan,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Data purchase successful! Your data bundle has been activated.');
        // Reset form
        setSelectedNetwork('');
        setPhone('');
        setSelectedPlan('');
      } else {
        setError(data.error || 'Failed to purchase data. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
      console.error('Data purchase error:', err);
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
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Buy Data</h1>
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

            {/* Data Plan Selection */}
            {selectedNetwork && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Select Data Plan <span className="text-red-500">*</span>
                </label>
                {loadingPlans ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="text-gray-600 dark:text-gray-400">Loading plans...</div>
                  </div>
                ) : dataPlans.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
                    {dataPlans.map((plan) => (
                      <button
                        key={plan.variation_code}
                        type="button"
                        onClick={() => setSelectedPlan(plan.variation_code)}
                        className={`p-4 border-2 rounded-lg transition text-left ${
                          selectedPlan === plan.variation_code
                            ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                        }`}
                      >
                        <div className="font-bold text-lg text-gray-900 dark:text-gray-100">
                          {plan.name}
                        </div>
                        <div className="text-purple-600 dark:text-purple-400 font-semibold mt-1">
                          ₦{formatPrice(plan.variation_amount)}
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-600 dark:text-gray-400">
                    No data plans available for this network
                  </div>
                )}
              </div>
            )}

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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !selectedPlan}
              className={`w-full py-3 rounded-lg font-semibold transition ${
                loading || !selectedPlan
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-700'
              } text-white`}
            >
              {loading ? 'Processing...' : 'Purchase Data'}
            </button>
          </form>
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 transition-colors">
          <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">💡 Data Plans Info</h3>
          <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
            <li>• All data plans are valid for 30 days (unless specified)</li>
            <li>• Instant activation after payment</li>
            <li>• Compatible with all devices</li>
            <li>• Select network first to view available plans</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
