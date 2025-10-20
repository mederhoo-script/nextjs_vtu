import Link from 'next/link';

export default function InternetPage() {
  const providers = [
    { name: 'Smile', icon: '🌐', color: 'bg-yellow-500' },
    { name: 'Spectranet', icon: '🌐', color: 'bg-blue-500' },
    { name: 'Swift', icon: '🌐', color: 'bg-green-500' },
    { name: 'Coollink', icon: '🌐', color: 'bg-purple-500' }
  ];

  const plans = [
    { name: 'SmileBoltz 10GB', duration: '30 days', price: '₦3,000' },
    { name: 'SmileBoltz 25GB', duration: '30 days', price: '₦6,500' },
    { name: 'Spectranet 15GB', duration: '30 days', price: '₦4,500' },
    { name: 'Spectranet 30GB', duration: '30 days', price: '₦8,000' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      <header className="bg-white dark:bg-gray-900 shadow-sm transition-colors">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href="/" className="mr-4 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
              ← Back
            </Link>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Internet Services</h1>
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
                    <div className={`w-12 h-12 ${provider.color} rounded-full flex items-center justify-center text-2xl`}>
                      {provider.icon}
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{provider.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Plan Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Select Plan
              </label>
              <div className="space-y-2">
                {plans.map((plan) => (
                  <button
                    key={plan.name}
                    type="button"
                    className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 transition flex justify-between items-center"
                  >
                    <div>
                      <div className="font-semibold text-gray-900">{plan.name}</div>
                      <div className="text-xs text-gray-500">{plan.duration}</div>
                    </div>
                    <div className="text-purple-600 font-bold">{plan.price}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Account Number */}
            <div>
              <label htmlFor="account" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Account Number / Email
              </label>
              <input
                type="text"
                id="account"
                placeholder="Enter account number or email"
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
          <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">💡 Quick Info</h3>
          <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
            <li>• Instant activation after payment</li>
            <li>• Verify account details before proceeding</li>
            <li>• Plans valid for specified duration</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
