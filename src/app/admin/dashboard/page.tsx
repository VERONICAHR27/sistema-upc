'use client';

import StatsCard from '@/components/admin/StatsCard';
import ApplicationsChart from '@/components/admin/ApplicationsChart';
import DemographicsChart from '@/components/admin/DemographicsChart';
import { FaUsers, FaChartLine, FaCalendarAlt, FaBuilding } from 'react-icons/fa';

const stats = [
  {
    title: 'Startups Activas',  // ← Cambiado de 'name' a 'title'
    value: '12',
    icon: FaBuilding,
    color: 'default' as const,
  },
  {
    title: 'Coordinadores',     // ← Cambiado de 'name' a 'title'
    value: '8',
    icon: FaUsers,
    color: 'green' as const,
  },
  {
    title: 'Eventos Programados',  // ← Cambiado de 'name' a 'title'
    value: '6',
    icon: FaCalendarAlt,
    color: 'red' as const,
  },
  {
    title: 'Proyectos en Seguimiento',  // ← Cambiado de 'name' a 'title'
    value: '24',
    icon: FaChartLine,
    color: 'default' as const,
  },
];

const recentActivities = [
  {
    id: 1,
    action: 'Nueva postulación recibida',
    startup: 'GreenTech Solutions',
    time: 'Hace 2 horas',
    type: 'application'
  },
  {
    id: 2,
    action: 'Evento programado',
    startup: 'Demo Day Q3 2025',
    time: 'Hace 4 horas',
    type: 'event'
  },
  {
    id: 3,
    action: 'Milestone completado',
    startup: 'HealthTech',
    time: 'Hace 1 día',
    type: 'milestone'
  },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard Estratégico</h1>
          <p className="text-lg text-gray-600 mt-2">
            Panel de control del ecosistema StartUPC
          </p>
        </div>

        {/* Stats Cards - USANDO LAS PROPS CORRECTAS */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((item) => (
            <StatsCard
              key={item.title}
              icon={<item.icon />}  // ← Pasando el ícono correctamente
              title={item.title}    // ← Usando 'title' en vez de 'name'
              value={item.value}
              color={item.color}
            />
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <ApplicationsChart />
          <DemographicsChart />
        </div>

        {/* Recent Activities */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Actividad Reciente</h2>
          
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    activity.type === 'application' ? 'bg-blue-500' :
                    activity.type === 'event' ? 'bg-green-500' : 'bg-purple-500'
                  }`}></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.startup}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-center">
            <button className="text-pink-600 hover:text-pink-500 text-sm font-medium">
              Ver todas las actividades →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}