'use client';

import { useState } from 'react';
import { FaPlus, FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaEdit, FaTrash } from 'react-icons/fa';

const mockEvents = [
  {
    id: 1,
    title: 'StartUp Pitch Night',
    date: '2025-07-15',
    time: '18:00',
    location: 'Auditorio UPC',
    attendees: 120,
    status: 'Programado',
    type: 'Conferencia'
  },
  {
    id: 2,
    title: 'Workshop: Finanzas para Emprendedores',
    date: '2025-07-22',
    time: '14:00',
    location: 'Lab Innovation',
    attendees: 45,
    status: 'Programado',
    type: 'Workshop'
  },
  {
    id: 3,
    title: 'Demo Day Q2 2025',
    date: '2025-06-30',
    time: '16:00',
    location: 'Campus Villa',
    attendees: 200,
    status: 'Completado',
    type: 'Demo Day'
  }
];

export default function EventsPage() {
  const [events] = useState(mockEvents);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Programado': return 'bg-blue-100 text-blue-800';
      case 'Completado': return 'bg-green-100 text-green-800';
      case 'Cancelado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Gestión de Eventos</h1>
            <p className="text-lg text-gray-600 mt-2">
              Programa y administra conferencias, workshops y demo days
            </p>
          </div>
          <button className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold py-3 px-6 rounded-lg flex items-center space-x-2 transition-all">
            <FaPlus />
            <span>Nuevo Evento</span>
          </button>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{event.title}</h3>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(event.status)}`}>
                  {event.status}
                </span>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-600">
                  <FaCalendarAlt className="mr-2 h-4 w-4" />
                  <span className="text-sm">{event.date} - {event.time}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <FaMapMarkerAlt className="mr-2 h-4 w-4" />
                  <span className="text-sm">{event.location}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <FaUsers className="mr-2 h-4 w-4" />
                  <span className="text-sm">{event.attendees} asistentes</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                  {event.type}
                </span>
                
                <div className="flex space-x-2">
                  <button className="text-blue-500 hover:text-blue-700 p-2" title="Editar">
                    <FaEdit size={16} />
                  </button>
                  <button className="text-red-500 hover:text-red-700 p-2" title="Eliminar">
                    <FaTrash size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}