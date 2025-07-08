export default function ApplicationsChart() {
  // Datos de ejemplo (mock data)
  const applicationData = [
    { status: 'Iniciadas', count: 200, color: 'bg-yellow-400' },
    { status: 'En Revisión', count: 220, color: 'bg-blue-400' },
    { status: 'Aprobadas', count: 150, color: 'bg-green-400' },
    { status: 'Rechazadas', count: 300, color: 'bg-red-400' },
  ];

  const total = applicationData.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Estado de Postulaciones</h3>
      <div className="space-y-3">
        {applicationData.map((item) => (
          <div key={item.status}>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-600">{item.status}</span>
              <span className="text-sm font-medium text-gray-600">{item.count}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className={`${item.color} h-4 rounded-full`}
                style={{ width: `${(item.count / total) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}