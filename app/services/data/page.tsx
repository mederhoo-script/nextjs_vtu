import Link from 'next/link';

export default function DataPage() {
  const networks = [
    { name: 'MTN', icon: '📱', color: 'bg-yellow-400' },
    { name: 'Airtel', icon: '📱', color: 'bg-red-500' },
    { name: 'Glo', icon: '📱', color: 'bg-green-500' },
    { name: '9Mobile', icon: '📱', color: 'bg-green-700' }
  ];

  const dataPlans = [
    { size: '1GB', duration: '30 days', price: '₦300' },
    { size: '2GB', duration: '30 days', price: '₦550' },
    { size: '5GB', duration: '30 days', price: '₦1,300' },
    { size: '10GB', duration: '30 days', price: '₦2,500' },
    { size: '20GB', duration: '30 days', price: '₦4,800' },
    { size: '40GB', duration: '30 days', price: '₦9,000' }
  ];

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

            {/* Data Plan Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Select Data Plan
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {dataPlans.map((plan) => (
                  <button
                    key={plan.size}
                    type="button"
                    className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-purple-500 transition text-left"
                  >
                    <div className="font-bold text-lg text-gray-900 dark:text-gray-100">{plan.size}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{plan.duration}</div>
                    <div className="text-purple-600 dark:text-purple-400 font-semibold">{plan.price}</div>
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
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">💡 Data Plans Info</h3>
          <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
            <li>• All data plans are valid for 30 days</li>
            <li>• Instant activation after payment</li>
            <li>• Compatible with all devices</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
