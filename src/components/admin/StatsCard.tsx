import { ReactNode } from 'react';

interface StatsCardProps {
  icon: ReactNode;
  title: string;
  value: number | string;
  color?: 'default' | 'green' | 'red';
}

const colorClasses = {
  default: 'text-blue-500',
  green: 'text-green-500',
  red: 'text-red-500',
};

export default function StatsCard({ icon, title, value, color = 'default' }: StatsCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
      <div className={`text-3xl ${colorClasses[color]}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
}