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
      <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100 hover:border-purple-200">
        <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center text-2xl mb-3`}>
          {icon}
        </div>
        <h3 className="font-semibold text-gray-900 text-sm mb-1">{name}</h3>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
    </Link>
  );
}
