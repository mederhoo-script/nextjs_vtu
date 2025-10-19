import Link from 'next/link';

export default function ElectricityPage() {
  const providers = [
    { name: 'EKEDC', icon: '⚡', color: 'bg-yellow-500' },
    { name: 'IKEDC', icon: '⚡', color: 'bg-blue-500' },
    { name: 'AEDC', icon: '⚡', color: 'bg-red-500' },
    { name: 'PHED', icon: '⚡', color: 'bg-green-500' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href="/" className="mr-4 text-gray-600 hover:text-gray-900">
              ← Back
            </Link>
            <h1 className="text-xl font-bold text-gray-900">Electricity Bills</h1>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <form className="space-y-6">
            {/* Provider Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Electricity Provider
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {providers.map((provider) => (
                  <button
                    key={provider.name}
                    type="button"
                    className="flex flex-col items-center gap-2 p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 transition"
                  >
                    <div className={`w-12 h-12 ${provider.color} rounded-full flex items-center justify-center text-2xl`}>
                      {provider.icon}
                    </div>
                    <span className="text-sm font-medium">{provider.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Meter Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Meter Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 transition text-center"
                >
                  <div className="font-semibold text-gray-900">Prepaid</div>
                  <div className="text-xs text-gray-500">Pay before use</div>
                </button>
                <button
                  type="button"
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 transition text-center"
                >
                  <div className="font-semibold text-gray-900">Postpaid</div>
                  <div className="text-xs text-gray-500">Pay after use</div>
                </button>
              </div>
            </div>

            {/* Meter Number */}
            <div>
              <label htmlFor="meter" className="block text-sm font-medium text-gray-700 mb-2">
                Meter Number
              </label>
              <input
                type="text"
                id="meter"
                placeholder="12345678901"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Amount */}
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                Amount
              </label>
              <input
                type="number"
                id="amount"
                placeholder="₦1000"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <div className="flex gap-2 mt-3">
                {[1000, 2000, 5000, 10000].map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    className="px-3 py-1 text-xs font-medium text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition"
                  >
                    ₦{amount.toLocaleString()}
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
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">💡 Payment Info</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Token delivered instantly after payment</li>
            <li>• Verify meter number before payment</li>
            <li>• Keep token safe for meter recharge</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
