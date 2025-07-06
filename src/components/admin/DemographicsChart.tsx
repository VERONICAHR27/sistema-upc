export default function DemographicsChart() {
    const demographicsData = {
        upcLink: [
            { type: 'Egresados', count: 45 },
            { type: 'Estudiantes', count: 60 },
            { type: 'Docentes', count: 10 },
            { type: 'Externos', count: 10 },
        ],
        sector: [
            { name: 'FinTech', count: 30 },
            { name: 'EdTech', count: 55 },
            { name: 'HealthTech', count: 20 },
            { name: 'Otros', count: 20 },
        ]
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Análisis de Fundadores</h3>
            <div className="space-y-6">
                <div>
                    <h4 className="text-md font-semibold text-gray-600 mb-2">Vínculo con UPC</h4>
                    <div className="space-y-2">
                        {demographicsData.upcLink.map(item => (
                            <div key={item.type} className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-600">{item.type}</span>
                                <span className="text-sm font-semibold text-gray-800 bg-gray-200 px-2 py-1 rounded">{item.count}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h4 className="text-md font-semibold text-gray-600 mb-2">Sector de la Startup</h4>
                    <div className="space-y-2">
                        {demographicsData.sector.map(item => (
                            <div key={item.name} className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-600">{item.name}</span>
                                <span className="text-sm font-semibold text-gray-800 bg-gray-200 px-2 py-1 rounded">{item.count}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}