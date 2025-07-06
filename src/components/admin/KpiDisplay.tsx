import { Kpi } from '@/types/project';
import { FaLeaf, FaChartLine } from 'react-icons/fa';

interface KpiDisplayProps {
  kpis: Kpi[];
}

export default function KpiDisplay({ kpis }: KpiDisplayProps) {
  return (
    <div className="space-y-3">
      {kpis.map((kpi, index) => (
        <div key={index} className={`p-3 rounded-md border ${kpi.isImpactMetric ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'}`}>
          <p className="font-semibold text-gray-800 flex items-center">
            {kpi.label}
            {kpi.isImpactMetric ? (
              <FaLeaf className="ml-2 text-green-500" title="Métrica de Impacto Social" />
            ) : (
              <FaChartLine className="ml-2 text-blue-500" title="Métrica de Crecimiento" />
            )}
          </p>
          <div className="flex justify-between items-baseline">
            <span className={`text-2xl font-bold ${kpi.isImpactMetric ? 'text-green-600' : 'text-blue-600'}`}>
              {kpi.value}
            </span>
            <span className="text-sm text-gray-500">Objetivo: {kpi.target}</span>
          </div>
        </div>
      ))}
    </div>
  );
}