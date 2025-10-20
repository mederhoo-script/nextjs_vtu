import Link from 'next/link';

export default function TVPage() {
  const providers = [
    { name: 'DSTV', icon: '📺', color: 'bg-blue-600' },
    { name: 'GOTV', icon: '📺', color: 'bg-red-500' },
    { name: 'Startimes', icon: '📺', color: 'bg-orange-500' },
    { name: 'Showmax', icon: '📺', color: 'bg-red-600' }
  ];

  const packages = [
    { name: 'DSTV Compact', duration: '1 Month', price: '₦10,500' },
    { name: 'DSTV Premium', duration: '1 Month', price: '₦24,500' },
    { name: 'GOTV Joli', duration: '1 Month', price: '₦3,300' },
    { name: 'GOTV Jolli', duration: '1 Month', price: '₦4,850' },
    { name: 'Startimes Basic', duration: '1 Month', price: '₦2,100' },
    { name: 'Startimes Smart', duration: '1 Month', price: '₦3,200' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      <header className="bg-white dark:bg-gray-900 shadow-sm transition-colors">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href="/" className="mr-4 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
              ← Back
            </Link>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">TV Subscription</h1>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-colors">
          <form className="space-y-6">
            {/* Provider Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Select Provider
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {providers.map((provider) => (
                  <button
                    key={provider.name}
                    type="button"
                    className="flex flex-col items-center gap-2 p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-purple-500 transition"
                  >
                    <div className={`w-12 h-12 ${provider.color} rounded-full flex items-center justify-center text-2xl text-white`}>
                      {provider.icon}
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{provider.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Package Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Select Package
              </label>
              <div className="space-y-2">
                {packages.map((pkg) => (
                  <button
                    key={pkg.name}
                    type="button"
                    className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 transition text-left flex justify-between items-center"
                  >
                    <div>
                      <div className="font-semibold text-gray-900">{pkg.name}</div>
                      <div className="text-xs text-gray-500">{pkg.duration}</div>
                    </div>
                    <div className="text-purple-600 font-bold">{pkg.price}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Smart Card Number */}
            <div>
              <label htmlFor="smartcard" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Smart Card Number / IUC Number
              </label>
              <input
                type="text"
                id="smartcard"
                placeholder="1234567890"
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
          <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">💡 Subscription Info</h3>
          <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
            <li>• Instant activation after payment</li>
            <li>• Valid smart card number required</li>
            <li>• Renew before expiry for uninterrupted service</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
