export default function RecentTransactions() {
  const transactions = [
    {
      id: 1,
      type: 'Airtime',
      amount: '₦500',
      status: 'Successful',
      date: '2 hours ago',
      icon: '📱',
      statusColor: 'text-green-600'
    },
    {
      id: 2,
      type: 'Data Bundle',
      amount: '₦2,000',
      status: 'Successful',
      date: '1 day ago',
      icon: '📶',
      statusColor: 'text-green-600'
    },
    {
      id: 3,
      type: 'TV Subscription',
      amount: '₦5,500',
      status: 'Pending',
      date: '2 days ago',
      icon: '📺',
      statusColor: 'text-yellow-600'
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm transition-colors">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Recent Transactions</h2>
        <button className="text-sm text-purple-600 dark:text-purple-400 font-medium hover:text-purple-700 dark:hover:text-purple-300">
          View All
        </button>
      </div>
      <div className="space-y-4">
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-xl">
                  {transaction.icon}
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100 text-sm">{transaction.type}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{transaction.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{transaction.amount}</p>
                <p className={`text-xs font-medium ${transaction.statusColor}`}>{transaction.status}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p className="text-4xl mb-2">📭</p>
            <p className="text-sm">No transactions yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
