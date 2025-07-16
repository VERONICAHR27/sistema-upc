'use client';

import { useEvents } from '@/contexts/EventContext';
import Navbar from '@/components/Navbar';

export default function Conferencias() {
  const { events } = useEvents();
  const featuredEvent = events.find(e => e.featured);
  const pastEvents = [
    {
      date: "10 Mayo 2023",
      views: "1.2k",
      duration: "1h 30min",
      title: "Innovación en la Era Digital",
      speaker: "Dr. Juan Pérez"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Conferencias y Eventos
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Mantente actualizado con las últimas tendencias en innovación, tecnología y emprendimiento a través de nuestras conferencias magistrales.
          </p>
        </div>

        {/* Featured Event */}
        <div className="bg-gradient-to-r from-fuchsia-500 to-red-500 rounded-lg shadow-lg p-8 text-white mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {featuredEvent ? (
              <>
                <div>
                  <div className="text-sm font-medium opacity-90 mb-2">PRÓXIMO EVENTO DESTACADO</div>
                  <h2 className="text-3xl font-bold mb-4">{featuredEvent.title}</h2>
                  <p className="text-lg opacity-90 mb-6">
                    {featuredEvent.type} en {featuredEvent.location}.
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="bg-white/20 px-3 py-1 rounded-full">📅 {featuredEvent.date}</span>
                    <span className="bg-white/20 px-3 py-1 rounded-full">⏰ {featuredEvent.time}</span>
                    <span className="bg-white/20 px-3 py-1 rounded-full">👥 {featuredEvent.attendees} Asistentes</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-white/10 rounded-lg p-8">
                    <div className="text-6xl mb-4">🎯</div>
                    <button className="bg-white text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-700 to-red-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors border-2 border-white">
                      Reservar Lugar
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <div className="text-sm font-medium opacity-90 mb-2">PRÓXIMO EVENTO DESTACADO</div>
                  <h2 className="text-3xl font-bold mb-4">Pronto anunciaremos el próximo evento destacado</h2>
                  <p className="text-lg opacity-90 mb-6">
                    Mantente atento a nuestras redes y página para no perderte las novedades.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Próximas Conferencias</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.length === 0 && (
              <div className="col-span-3 text-center text-gray-500 py-12">
                No hay eventos programados actualmente.
              </div>
            )}
            {events.map(event => (
              <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm font-medium mr-2">{event.date}</span>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm">{event.time}</span>
                  </div>
                  <p className="text-gray-600 mb-2">{event.location}</p>
                  <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">{event.type}</span>
                  <div className="mt-4 text-sm text-gray-500">
                    {event.attendees} asistentes
                  </div>
                  <div className="mt-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      event.status === 'Programado' ? 'bg-blue-100 text-blue-800' :
                      event.status === 'Completado' ? 'bg-green-100 text-green-800' :
                      event.status === 'Cancelado' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {event.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Past Events */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Conferencias Pasadas</h2>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="divide-y divide-gray-200">
              {pastEvents.map((event, index) => (
                <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                          {event.date}
                        </span>
                        <span className="text-sm text-gray-500">👁️ {event.views} vistas</span>
                        <span className="text-sm text-gray-500">⏱️ {event.duration}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{event.title}</h3>
                      <p className="text-gray-600">{event.speaker}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-4 py-2 rounded-lg hover:from-pink-600 hover:to-red-600 transition-all">
                        Ver Grabación
                      </button>
                      <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                        Descargar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div> 
      </div>
    </div>
  );
}
