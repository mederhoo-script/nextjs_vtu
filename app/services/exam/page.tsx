import Link from 'next/link';

export default function ExamPage() {
  const examTypes = [
    { name: 'WAEC', icon: '📝', color: 'bg-green-600', price: '₦3,500' },
    { name: 'NECO', icon: '📝', color: 'bg-blue-600', price: '₦1,000' },
    { name: 'JAMB', icon: '📝', color: 'bg-red-600', price: '₦4,500' },
    { name: 'NABTEB', icon: '📝', color: 'bg-purple-600', price: '₦2,500' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      <header className="bg-white dark:bg-gray-900 shadow-sm transition-colors">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href="/" className="mr-4 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
              ← Back
            </Link>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Exam Pins</h1>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-colors">
          <form className="space-y-6">
            {/* Exam Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Select Exam Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                {examTypes.map((exam) => (
                  <button
                    key={exam.name}
                    type="button"
                    className="flex items-center gap-3 p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-purple-500 transition"
                  >
                    <div className={`w-12 h-12 ${exam.color} rounded-lg flex items-center justify-center text-2xl text-white`}>
                      {exam.icon}
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-gray-900">{exam.name}</div>
                      <div className="text-purple-600 font-bold text-sm">{exam.price}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                min="1"
                defaultValue="1"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400"
              />
              <p className="text-xs text-gray-500 mt-1">Pins will be sent to this email</p>
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
          <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">💡 Important Information</h3>
          <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
            <li>• Pins are delivered instantly to your email</li>
            <li>• Keep your pins secure and confidential</li>
            <li>• Check spam folder if not received in inbox</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
