
import { Filter, Users, Trophy, Calendar } from 'lucide-react';



export default function Sidebar() {
  const categories = [
    { icon: Users, label: 'All Players', count: 150 },
    { icon: Trophy, label: 'First Division', count: 45 },
    { icon: Calendar, label: 'Under 17', count: 105 },
  ];

  return (
    <div className={`bg-white rounded-lg shadow-md p-6`}>
      <div className="flex items-center gap-2 mb-6">
        <Filter className="h-5 w-5 text-blue-600" />
        <h2 className="text-xl font-semibold">Filters</h2>
      </div>
      <div className="space-y-4">
        {categories.map(({ icon: Icon, label, count }) => (
          <button
            key={label}
            className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <div className="flex items-center gap-3">
              <Icon className="h-5 w-5 text-gray-600" />
              <span className="text-gray-700">{label}</span>
            </div>
            <span className="text-sm text-gray-500">{count}</span>
          </button>
        ))}
      </div>
    </div>
  );
}