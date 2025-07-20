'use client';

import { useState } from 'react';
import { useEvents } from '@/contexts/EventContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  type: string;
  attendees: number;
  status: string;
  featured?: boolean;
}
// import { send } from 'resent'; // Desactivado temporalmente

export default function Conferencias() {
  const { events, loading } = useEvents();
  const featuredEvent = events.find(e => e.featured);

  // Obtener fecha actual (solo fecha, sin hora)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Próximas conferencias: fecha igual o posterior a hoy
  const upcomingEvents = events
    .filter(e => {
      const eventDate = new Date(e.date);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate >= today;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  // Conferencias pasadas: fecha anterior a hoy
  const pastEvents = events
    .filter(e => {
      const eventDate = new Date(e.date);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate < today;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  // Reservar lugar modal states
  const [showReserveModal, setShowReserveModal] = useState(false);
  const [reserveForm, setReserveForm] = useState({
    nombre: '',
    dni: '',
    email: '',
  });
  const [reserveLoading, setReserveLoading] = useState(false);
  const [reserveSuccess, setReserveSuccess] = useState<string | null>(null);
  const [reserveError, setReserveError] = useState<string | null>(null);

  const handleOpenModal = (event: Event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  // Abrir modal de reservar lugar
  const handleOpenReserveModal = () => {
    setShowReserveModal(true);
    setReserveForm({ nombre: '', dni: '', email: '' });
    setReserveSuccess(null);
    setReserveError(null);
  };

  const handleCloseReserveModal = () => {
    setShowReserveModal(false);
    setReserveForm({ nombre: '', dni: '', email: '' });
    setReserveSuccess(null);
    setReserveError(null);
  };

  // Enviar email con resent.com (desactivado temporalmente)
  const handleReserveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setReserveLoading(true);
    setReserveSuccess(null);
    setReserveError(null);

    // Desactivado: Solo muestra mensaje de éxito simulado
    setTimeout(() => {
      setReserveSuccess('¡Reserva realizada! (Funcionalidad de correo desactivada temporalmente)');
      setReserveLoading(false);
      setReserveForm({ nombre: '', dni: '', email: '' });
    }, 1200);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500"></div>
          <p className="mt-4 text-lg text-gray-600">Cargando eventos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
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
                    <button
                      className="bg-white text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-700 to-red-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors border-2 border-white"
                      onClick={handleOpenReserveModal}
                    >
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

        {/* Próximas Conferencias */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Próximas Conferencias</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.length === 0 && (
              <div className="col-span-3 text-center text-gray-500 py-12">
                No hay eventos programados actualmente.
              </div>
            )}
            {upcomingEvents.map(event => (
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

        {/* Conferencias Pasadas */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Conferencias Pasadas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.length === 0 && (
              <div className="col-span-3 text-center text-gray-500 py-12">
                No hay conferencias pasadas registradas.
              </div>
            )}
            {pastEvents.map((event, index) => (
              <div
                key={event.id || index}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col"
              >
                <div className="p-6 flex-1 flex flex-col">
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
                  <div className="mt-4 flex gap-2">
                    <button
                      className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-4 py-2 rounded-lg hover:from-pink-600 hover:to-red-600 transition-all"
                      onClick={() => handleOpenModal(event)}
                    >
                      Ver Grabación
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal para ver grabación */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-sm w-full border border-pink-200">
              <h3 className="text-xl font-bold text-pink-700 mb-4">Solicitar Grabación: {selectedEvent?.title}</h3>
              <p className="text-gray-700 mb-6">
                Para obtener la grabación de esta conferencia ({selectedEvent?.date}) escribe al correo <span className="font-semibold text-pink-600">conferencias@startupc.com</span>.
              </p>
              <div className="flex justify-end">
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 rounded bg-pink-600 text-white font-bold hover:bg-pink-700 transition"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal para reservar lugar */}
        {showReserveModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-sm w-full border border-pink-200">
              <h3 className="text-xl font-bold text-pink-700 mb-4">Reservar Lugar</h3>
              <form onSubmit={handleReserveSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombres completos</label>
                  <input
                    type="text"
                    required
                    value={reserveForm.nombre}
                    onChange={e => setReserveForm(f => ({ ...f, nombre: e.target.value }))}
                    className="border px-3 py-2 rounded w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">DNI</label>
                  <input
                    type="text"
                    required
                    value={reserveForm.dni}
                    onChange={e => setReserveForm(f => ({ ...f, dni: e.target.value }))}
                    className="border px-3 py-2 rounded w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
                  <input
                    type="email"
                    required
                    value={reserveForm.email}
                    onChange={e => setReserveForm(f => ({ ...f, email: e.target.value }))}
                    className="border px-3 py-2 rounded w-full"
                  />
                </div>
                {reserveError && <p className="text-red-600">{reserveError}</p>}
                {reserveSuccess && <p className="text-green-600">{reserveSuccess}</p>}
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={handleCloseReserveModal}
                    className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-bold hover:bg-gray-300 transition"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={reserveLoading}
                    className="px-4 py-2 rounded bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold shadow hover:from-pink-600 hover:to-red-600 transition"
                  >
                    {reserveLoading ? 'Enviando...' : 'Reservar'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
      
      <Footer />
    </div>
  );
}
