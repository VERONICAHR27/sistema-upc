'use client';

import { useState } from 'react';
import { FaPlus, FaEye, FaEdit, FaTrash, FaDownload, FaFilter } from 'react-icons/fa';

const mockApplications = [
  {
    id: 1,
    title: 'Convocatoria Tech 2025',
    status: 'Activa',
    applicants: 45,
    deadline: '2025-08-15',
    type: 'Aceleración'
  },
  {
    id: 2,
    title: 'Programa EcoInnovación',
    status: 'Cerrada',
    applicants: 67,
    deadline: '2025-06-30',
    type: 'Incubación'
  },
  {
    id: 3,
    title: 'StartUp Weekend',
    status: 'Borrador',
    applicants: 0,
    deadline: '2025-09-01',
    type: 'Evento'
  }
];

export default function ApplicationsPage() {
  const [applications] = useState(mockApplications);
  const [filter, setFilter] = useState('Todas');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Activa': return 'bg-green-100 text-green-800';
      case 'Cerrada': return 'bg-red-100 text-red-800';
      case 'Borrador': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Gestión de Convocatorias</h1>
            <p className="text-lg text-gray-600 mt-2">
              Administra las convocatorias y postulaciones del programa StartUPC
            </p>
          </div>
          <button className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold py-3 px-6 rounded-lg flex items-center space-x-2 transition-all">
            <FaPlus />
            <span>Nueva Convocatoria</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <FaEye />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Convocatorias</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <FaPlus />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Activas</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <FaDownload />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Postulaciones</p>
                <p className="text-2xl font-bold text-gray-900">156</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-orange-100 text-orange-600">
                <FaFilter />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">En Revisión</p>
                <p className="text-2xl font-bold text-gray-900">43</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <span className="text-sm font-medium text-gray-700">Filtrar por:</span>
            {['Todas', 'Activas', 'Cerradas', 'Borradores'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === status
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
                <th className="py-3 px-6 text-left">Convocatoria</th>
                <th className="py-3 px-6 text-center">Estado</th>
                <th className="py-3 px-6 text-center">Postulantes</th>
                <th className="py-3 px-6 text-center">Fecha Límite</th>
                <th className="py-3 px-6 text-center">Tipo</th>
                <th className="py-3 px-6 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {applications.map((app) => (
                <tr key={app.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-semibold">{app.title}</p>
                      <p className="text-sm text-gray-500">ID: #{app.id}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(app.status)}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="font-semibold">{app.applicants}</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    {app.deadline}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {app.type}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex justify-center space-x-2">
                      <button className="text-blue-500 hover:text-blue-700 p-1" title="Ver">
                        <FaEye size={16} />
                      </button>
                      <button className="text-green-500 hover:text-green-700 p-1" title="Editar">
                        <FaEdit size={16} />
                      </button>
                      <button className="text-red-500 hover:text-red-700 p-1" title="Eliminar">
                        <FaTrash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}