import Link from 'next/link';

export default function RechargeCardPage() {
  const networks = [
    { name: 'MTN', icon: '💳', color: 'bg-yellow-400' },
    { name: 'Airtel', icon: '💳', color: 'bg-red-500' },
    { name: 'Glo', icon: '💳', color: 'bg-green-500' },
    { name: '9Mobile', icon: '💳', color: 'bg-green-700' }
  ];

  const denominations = [100, 200, 400, 500, 750, 1000, 1500, 2000, 5000];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href="/" className="mr-4 text-gray-600 hover:text-gray-900">
              ← Back
            </Link>
            <h1 className="text-xl font-bold text-gray-900">Recharge Card Printing</h1>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <form className="space-y-6">
            {/* Network Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Network
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {networks.map((network) => (
                  <button
                    key={network.name}
                    type="button"
                    className="flex flex-col items-center gap-2 p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 transition"
                  >
                    <div className={`w-12 h-12 ${network.color} rounded-full flex items-center justify-center text-2xl text-white`}>
                      {network.icon}
                    </div>
                    <span className="text-sm font-medium">{network.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Denomination Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Denomination
              </label>
              <div className="grid grid-cols-3 gap-3">
                {denominations.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    className="p-3 border-2 border-gray-200 rounded-lg hover:border-purple-500 transition text-center"
                  >
                    <div className="font-bold text-gray-900">₦{amount}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                Number of Cards
              </label>
              <input
                type="number"
                id="quantity"
                min="1"
                defaultValue="1"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Total Amount Display */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Total Amount:</span>
                <span className="text-2xl font-bold text-purple-600">₦0.00</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
            >
              Generate Recharge Cards
            </button>
          </form>
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">💡 Important Information</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Cards generated instantly after payment</li>
            <li>• You can print or download the cards</li>
            <li>• Bulk orders get special discounts</li>
            <li>• Cards are valid for 12 months</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
