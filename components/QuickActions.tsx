export default function QuickActions() {
  const actions = [
    { icon: '⚡', label: 'Quick Recharge', color: 'text-yellow-600' },
    { icon: '📊', label: 'Price List', color: 'text-blue-600' },
    { icon: '🎁', label: 'Rewards', color: 'text-pink-600' },
    { icon: '👥', label: 'Refer & Earn', color: 'text-green-600' }
  ];

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
      <div className="flex justify-between items-center overflow-x-auto gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            className="flex flex-col items-center gap-2 min-w-[70px] hover:opacity-80 transition"
          >
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl">
              {action.icon}
            </div>
            <span className={`text-xs font-medium ${action.color}`}>{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
