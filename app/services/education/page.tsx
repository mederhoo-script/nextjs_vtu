import Link from 'next/link';

export default function EducationPage() {
  const services = [
    { name: 'WAEC Result Checker', price: '₦800', icon: '📊' },
    { name: 'NECO Result Checker', price: '₦500', icon: '📊' },
    { name: 'JAMB Result Checker', price: '₦300', icon: '📊' },
    { name: 'NABTEB Result Checker', price: '₦400', icon: '📊' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      <header className="bg-white dark:bg-gray-900 shadow-sm transition-colors">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href="/" className="mr-4 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
              ← Back
            </Link>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Education Services</h1>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-colors">
          <form className="space-y-6">
            {/* Service Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Select Service
              </label>
              <div className="space-y-2">
                {services.map((service) => (
                  <button
                    key={service.name}
                    type="button"
                    className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 transition flex justify-between items-center"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{service.icon}</div>
                      <span className="font-medium text-gray-900">{service.name}</span>
                    </div>
                    <span className="text-purple-600 font-bold">{service.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Exam Number */}
            <div>
              <label htmlFor="examNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Examination Number
              </label>
              <input
                type="text"
                id="examNumber"
                placeholder="Enter your exam number"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400"
              />
            </div>

            {/* Exam Year */}
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Examination Year
              </label>
              <select
                id="year"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400"
              >
                <option>2024</option>
                <option>2023</option>
                <option>2022</option>
                <option>2021</option>
              </select>
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
            <li>• Result checker PIN sent instantly</li>
            <li>• Verify exam number before payment</li>
            <li>• Contact support for any issues</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
