import Header from '@/components/Header';
import ServiceCard from '@/components/ServiceCard';
import QuickActions from '@/components/QuickActions';
import RecentTransactions from '@/components/RecentTransactions';
import WalletCard from '@/components/WalletCard';

export default function Home() {
  const services = [
    {
      id: 'airtime',
      name: 'Buy Airtime',
      icon: '📱',
      description: 'Recharge your phone',
      color: 'bg-purple-500',
      href: '/services/airtime'
    },
    {
      id: 'data',
      name: 'Buy Data',
      icon: '📶',
      description: 'Get data bundles',
      color: 'bg-blue-500',
      href: '/services/data'
    },
    {
      id: 'tv',
      name: 'TV Subscription',
      icon: '📺',
      description: 'DSTV, GOTV, Startimes',
      color: 'bg-green-500',
      href: '/services/tv'
    },
    {
      id: 'electricity',
      name: 'Electricity',
      icon: '⚡',
      description: 'Pay your bills',
      color: 'bg-yellow-500',
      href: '/services/electricity'
    },
    {
      id: 'exam',
      name: 'Exam Pins',
      icon: '📝',
      description: 'WAEC, NECO, JAMB',
      color: 'bg-red-500',
      href: '/services/exam'
    },
    {
      id: 'education',
      name: 'Education',
      icon: '🎓',
      description: 'Result checkers',
      color: 'bg-indigo-500',
      href: '/services/education'
    },
    {
      id: 'internet',
      name: 'Internet',
      icon: '🌐',
      description: 'Smile, Spectranet',
      color: 'bg-pink-500',
      href: '/services/internet'
    },
    {
      id: 'recharge-card',
      name: 'Recharge Card',
      icon: '💳',
      description: 'Print recharge pins',
      color: 'bg-teal-500',
      href: '/services/recharge-card'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Balance Card */}
        <WalletCard />

        {/* Quick Actions */}
        <QuickActions />

        {/* Services Grid */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Our Services</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {services.map((service) => (
              <ServiceCard key={service.id} {...service} />
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <RecentTransactions />

        {/* Promo Banner */}
        <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl p-6 text-white mt-6">
          <h3 className="text-lg font-bold mb-2">🎉 Special Offer!</h3>
          <p className="text-sm mb-3">Get 5% bonus on your first wallet funding of ₦5,000 or more</p>
          <button className="bg-white text-green-600 px-6 py-2 rounded-lg font-semibold text-sm hover:bg-gray-100 transition">
            Fund Now
          </button>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg md:hidden transition-colors">
        <div className="flex justify-around py-3">
          <button className="flex flex-col items-center gap-1 text-purple-600">
            <span className="text-xl">🏠</span>
            <span className="text-xs font-medium">Home</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-500 dark:text-gray-400">
            <span className="text-xl">📊</span>
            <span className="text-xs">History</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-500 dark:text-gray-400">
            <span className="text-xl">💰</span>
            <span className="text-xs">Wallet</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-500 dark:text-gray-400">
            <span className="text-xl">👤</span>
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
