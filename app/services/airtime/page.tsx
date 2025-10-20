import Link from 'next/link';

export default function AirtimePage() {
  const networks = [
    { name: 'MTN', icon: '📱', color: 'bg-yellow-400' },
    { name: 'Airtel', icon: '📱', color: 'bg-red-500' },
    { name: 'Glo', icon: '📱', color: 'bg-green-500' },
    { name: '9Mobile', icon: '📱', color: 'bg-green-700' }
  ];

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
          <form className="space-y-6">
            {/* Network Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Select Network
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {networks.map((network) => (
                  <button
                    key={network.name}
                    type="button"
                    className="flex flex-col items-center gap-2 p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-purple-500 transition"
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
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                placeholder="08012345678"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400"
              />
            </div>

            {/* Amount */}
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Amount
              </label>
              <input
                type="number"
                id="amount"
                placeholder="₦100"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400"
              />
              <div className="flex gap-2 mt-3">
                {[100, 200, 500, 1000, 2000, 5000].map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    className="px-3 py-1 text-xs font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/50 transition"
                  >
                    ₦{amount}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
            >
              Continue to Payment
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
          </ul>
        </div>
      </main>
    </div>
  );
}
