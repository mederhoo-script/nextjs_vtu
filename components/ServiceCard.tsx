import Link from 'next/link';

interface ServiceCardProps {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
  href: string;
}

export default function ServiceCard({ name, icon, description, color, href }: ServiceCardProps) {
  return (
    <Link href={href}>
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-500">
        <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center text-2xl mb-3`}>
          {icon}
        </div>
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-1">{name}</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
      </div>
    </Link>
  );
}
