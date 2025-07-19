'use client';

import { useState } from 'react';
import { FaPlus, FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaEdit, FaTrash, FaStar } from 'react-icons/fa';
import { useEvents, Event } from '@/contexts/EventContext';

export default function EventsPage() {
  const { events, addEvent, editEvent, deleteEvent, setFeaturedEvent } = useEvents();

  const [form, setForm] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    attendees: 0,
    status: 'Programado',
    type: '',
  });

  const [editId, setEditId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState(form);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.date || !form.time || !form.location || !form.type) return;
    addEvent({
      id: Date.now(),
      ...form,
      featured: false, // Siempre no destacado al crear
    });
    setForm({
      title: '',
      date: '',
      time: '',
      location: '',
      attendees: 0,
      status: 'Programado',
      type: '',
    });
  };

  const handleEdit = (event: Event) => {
    setEditId(event.id);
    setEditForm(event);
  };

  const handleSaveEdit = (id: number) => {
    editEvent(id, editForm);
    setEditId(null);
  };

  const handleCancelEdit = () => setEditId(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Programado': return 'bg-blue-100 text-blue-800';
      case 'Completado': return 'bg-green-100 text-green-800';
      case 'Cancelado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Gestión de Eventos</h1>
            <p className="text-lg text-gray-600 mt-2">
              Programa y administra conferencias, workshops y demo days
            </p>
          </div>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="mb-8 bg-white rounded-lg shadow p-6 space-y-4 border border-pink-100">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título del evento</label>
            <input
              type="text"
              placeholder="Ejemplo: Summit de Innovación UPC 2025"
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              className="border px-3 py-2 rounded w-full"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
              <input
                type="date"
                value={form.date}
                onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                className="border px-3 py-2 rounded w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hora</label>
              <input
                type="time"
                value={form.time}
                onChange={e => setForm(f => ({ ...f, time: e.target.value }))}
                className="border px-3 py-2 rounded w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lugar</label>
              <input
                type="text"
                placeholder="Ejemplo: Campus UPC"
                value={form.location}
                onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                className="border px-3 py-2 rounded w-full"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Asistentes esperados</label>
              <input
                type="number"
                min={0}
                placeholder="Ejemplo: 500"
                value={form.attendees}
                onChange={e => setForm(f => ({ ...f, attendees: Number(e.target.value) }))}
                className="border px-3 py-2 rounded w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de evento</label>
              <input
                type="text"
                placeholder="Ejemplo: Conferencia, Workshop, Demo Day"
                value={form.type}
                onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                className="border px-3 py-2 rounded w-full"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
            <input
              type="text"
              value="Programado"
              disabled
              className="border px-3 py-2 rounded w-full bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>
          <button type="submit" className="bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold py-2 px-6 rounded-lg flex items-center space-x-2 transition-all">
            <FaPlus />
            <span>Crear Evento</span>
          </button>
        </form>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => {
            // Solo se pueden destacar eventos futuros o del día actual
            const isUpcoming =
              new Date(event.date).setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0);

            return (
              <div key={event.id} className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow ${event.featured ? 'border-2 border-yellow-400' : ''}`}>
                {editId === event.id ? (
                  <div>
                    <input
                      type="text"
                      value={editForm.title}
                      onChange={e => setEditForm(f => ({ ...f, title: e.target.value }))}
                      className="border px-2 py-1 rounded w-full mb-2"
                    />
                    <input
                      type="date"
                      value={editForm.date}
                      onChange={e => setEditForm(f => ({ ...f, date: e.target.value }))}
                      className="border px-2 py-1 rounded w-full mb-2"
                    />
                    <input
                      type="time"
                      value={editForm.time}
                      onChange={e => setEditForm(f => ({ ...f, time: e.target.value }))}
                      className="border px-2 py-1 rounded w-full mb-2"
                    />
                    <input
                      type="text"
                      value={editForm.location}
                      onChange={e => setEditForm(f => ({ ...f, location: e.target.value }))}
                      className="border px-2 py-1 rounded w-full mb-2"
                    />
                    <input
                      type="number"
                      value={editForm.attendees}
                      onChange={e => setEditForm(f => ({ ...f, attendees: Number(e.target.value) }))}
                      className="border px-2 py-1 rounded w-full mb-2"
                    />
                    <input
                      type="text"
                      value={editForm.type}
                      onChange={e => setEditForm(f => ({ ...f, type: e.target.value }))}
                      className="border px-2 py-1 rounded w-full mb-2"
                    />
                    <select
                      value={editForm.status}
                      onChange={e => setEditForm(f => ({ ...f, status: e.target.value }))}
                      className="border px-2 py-1 rounded w-full mb-2"
                    >
                      <option value="Programado">Programado</option>
                      <option value="Completado">Completado</option>
                      <option value="Cancelado">Cancelado</option>
                    </select>
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleSaveEdit(event.id)}
                        className="px-3 py-1 bg-green-500 text-white rounded font-bold"
                      >
                        Guardar
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="px-3 py-1 bg-gray-300 text-gray-700 rounded font-bold"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                        {event.title}
                        {event.featured && (
                          <span className="ml-2 text-yellow-500" title="Evento destacado">
                            <FaStar />
                          </span>
                        )}
                      </h3>
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
                        <button
                          className={`text-yellow-500 hover:text-yellow-600 p-2 ${!isUpcoming ? 'opacity-40 cursor-not-allowed' : ''}`}
                          title={isUpcoming ? "Destacar" : "Solo puedes destacar eventos próximos"}
                          onClick={() => isUpcoming && setFeaturedEvent(event.id)}
                          disabled={!isUpcoming || event.featured}
                        >
                          <FaStar />
                        </button>
                        <button
                          className="text-blue-500 hover:text-blue-700 p-2"
                          title="Editar"
                          onClick={() => handleEdit(event)}
                        >
                          <FaEdit size={16} />
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700 p-2"
                          title="Eliminar"
                          onClick={() => deleteEvent(event.id)}
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}