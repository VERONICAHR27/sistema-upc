'use client';

import { useState, useRef } from 'react';
import { FaPlus, FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import { useConvocatorias, Convocatoria } from '@/contexts/ConvocatoriaContext';

const defaultCronograma: NonNullable<Convocatoria['cronograma']> = [
  { title: 'Convocatoria', date: 'Del 23 de junio al 23 de julio.', status: 'active' },
  { title: 'Evaluación', date: 'del 04 de agosto al 22 de agosto.', status: 'upcoming' },
  { title: 'Anuncio de Ganadores', date: '23 de agosto.', status: 'upcoming' },
  { title: 'Duracion del proyecto', date: '27 de agosto del 2024 hasta el 20 de febrero del 2025', status: 'upcoming' }
];

// Tipo para el formulario
type ConvocatoriaForm = {
  title: string;
  deadline: string;
  type: string;
  cronograma: NonNullable<Convocatoria['cronograma']>;
};

export default function ApplicationsPage() {
  const {
    addConvocatoria,
    getHistorial,
    getActiva,
    activarConvocatoria,
    editarConvocatoria,
    eliminarConvocatoria
  } = useConvocatorias();

  const [form, setForm] = useState<ConvocatoriaForm>({
    title: '',
    deadline: '',
    type: '',
    cronograma: defaultCronograma,
  });

  // Estado para edición
  const [editId, setEditId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<ConvocatoriaForm>({
    title: '',
    deadline: '',
    type: '',
    cronograma: defaultCronograma,
  });

  // Modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const deleteTitleRef = useRef<string>('');

  // Open modal
  const openDeleteModal = (id: number, title: string) => {
    setDeleteId(id);
    deleteTitleRef.current = title;
    setShowDeleteModal(true);
  };

  // Confirm delete
  const confirmDelete = () => {
    if (deleteId !== null) {
      eliminarConvocatoria(deleteId);
      setShowDeleteModal(false);
      setDeleteId(null);
    }
  };

  // Cancel delete
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  // Permite editar cada etapa del cronograma
  const handleCronogramaChange = (index: number, field: string, value: string) => {
    setForm(f => ({
      ...f,
      cronograma: f.cronograma.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  // Para edición
  const handleEditCronogramaChange = (index: number, field: string, value: string) => {
    setEditForm(f => ({
      ...f,
      cronograma: f.cronograma.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.deadline || !form.type) return;
    addConvocatoria({
      id: Date.now(),
      title: form.title,
      status: 'Borrador',
      applicants: 0,
      deadline: form.deadline,
      type: form.type,
      cronograma: form.cronograma,
    });
    setForm({
      title: '',
      deadline: '',
      type: '',
      cronograma: defaultCronograma,
    });
  };



  // Iniciar edición
  const handleEdit = (convocatoria: Convocatoria) => {
    setEditId(convocatoria.id);
    setEditForm({
      title: convocatoria.title,
      deadline: convocatoria.deadline,
      type: convocatoria.type,
      cronograma: convocatoria.cronograma ?? defaultCronograma,
    });
  };

  // Guardar edición
  const handleSaveEdit = (id: number) => {
    editarConvocatoria(id, editForm);
    setEditId(null);
  };

  // Cancelar edición
  const handleCancelEdit = () => {
    setEditId(null);
  };

  // Desactivar convocatoria activa (la pasa a "Cerrada")
  const handleDeactivate = (id: number) => {
    editarConvocatoria(id, { status: 'Cerrada' });
  };

  // Junta activa + historial
  const allConvocatorias: Convocatoria[] = [
    ...(getActiva() ? [getActiva()] : []),
    ...getHistorial()
  ].filter((c): c is Convocatoria => c !== undefined);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-red-100 p-8">
      <h1 className="text-3xl font-extrabold text-pink-700 mb-8 drop-shadow">Convocatorias</h1>
      <form onSubmit={handleSubmit} className="mb-10 space-y-4 bg-white rounded-xl shadow-lg p-6 border border-pink-100">
        <input
          type="text"
          placeholder="Título"
          value={form.title}
          onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
          className="border border-pink-300 focus:border-pink-500 focus:ring-pink-200 px-3 py-2 rounded w-full bg-pink-50 text-pink-900 placeholder-pink-400"
        />
        <input
          type="date"
          placeholder="Fecha límite"
          value={form.deadline}
          onChange={e => setForm(f => ({ ...f, deadline: e.target.value }))}
          className="border border-pink-300 focus:border-pink-500 focus:ring-pink-200 px-3 py-2 rounded w-full bg-pink-50 text-pink-900 placeholder-pink-400"
        />
        <input
          type="text"
          placeholder="Tipo"
          value={form.type}
          onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
          className="border border-pink-300 focus:border-pink-500 focus:ring-pink-200 px-3 py-2 rounded w-full bg-pink-50 text-pink-900 placeholder-pink-400"
        />
        <div className="mb-4">
          <h2 className="text-lg font-bold text-pink-700 mb-2">Cronograma de la Convocatoria</h2>
          {form.cronograma.map((item, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row items-center mb-2 gap-2">
              <input
                type="text"
                value={item.title}
                onChange={e => handleCronogramaChange(idx, 'title', e.target.value)}
                className="border border-pink-300 px-2 py-1 rounded bg-pink-50 text-pink-900 placeholder-pink-400 flex-1"
                placeholder="Etapa"
              />
              <input
                type="text"
                value={item.date}
                onChange={e => handleCronogramaChange(idx, 'date', e.target.value)}
                className="border border-pink-300 px-2 py-1 rounded bg-pink-50 text-pink-900 placeholder-pink-400 flex-1"
                placeholder="Fecha"
              />
            </div>
          ))}
        </div>
        <button type="submit" className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-2 rounded-lg flex items-center font-bold shadow hover:from-pink-600 hover:to-red-600 transition">
          <FaPlus className="mr-2" /> Crear Convocatoria
        </button>
      </form>

      <h2 className="text-2xl font-bold text-pink-700 mb-6">Historial de Convocatorias</h2>
      <ul className="space-y-3">
        {allConvocatorias.map((c: Convocatoria) => c && (
          <li key={c.id} className="flex flex-col md:flex-row items-center justify-between bg-white rounded-lg shadow border border-pink-100 px-5 py-3">
            {editId === c.id ? (
              <div className="w-full">
                <input
                  type="text"
                  value={editForm.title}
                  onChange={e => setEditForm(f => ({ ...f, title: e.target.value }))}
                  className="border border-pink-300 px-2 py-1 rounded bg-pink-50 text-pink-900 placeholder-pink-400 mb-2 w-full"
                  placeholder="Título"
                />
                <input
                  type="date"
                  value={editForm.deadline}
                  onChange={e => setEditForm(f => ({ ...f, deadline: e.target.value }))}
                  className="border border-pink-300 px-2 py-1 rounded bg-pink-50 text-pink-900 placeholder-pink-400 mb-2 w-full"
                  placeholder="Fecha límite"
                />
                <input
                  type="text"
                  value={editForm.type}
                  onChange={e => setEditForm(f => ({ ...f, type: e.target.value }))}
                  className="border border-pink-300 px-2 py-1 rounded bg-pink-50 text-pink-900 placeholder-pink-400 mb-2 w-full"
                  placeholder="Tipo"
                />
                <div className="mb-2">
                  <h2 className="text-sm font-bold text-pink-700 mb-1">Cronograma</h2>
                  {editForm.cronograma.map((item, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row items-center mb-1 gap-2">
                      <input
                        type="text"
                        value={item.title}
                        onChange={e => handleEditCronogramaChange(idx, 'title', e.target.value)}
                        className="border border-pink-300 px-2 py-1 rounded bg-pink-50 text-pink-900 placeholder-pink-400 flex-1"
                        placeholder="Etapa"
                      />
                      <input
                        type="text"
                        value={item.date}
                        onChange={e => handleEditCronogramaChange(idx, 'date', e.target.value)}
                        className="border border-pink-300 px-2 py-1 rounded bg-pink-50 text-pink-900 placeholder-pink-400 flex-1"
                        placeholder="Fecha"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSaveEdit(c.id)}
                    className="px-3 py-1 bg-green-500 text-white rounded font-bold flex items-center"
                  >
                    <FaCheck className="mr-1" /> Guardar
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
                <span className="flex-1">
                  <span className="font-bold text-pink-700">{c.title}</span>
                  <span className={`ml-2 px-2 py-1 rounded text-xs font-semibold
                    ${c.status === 'Borrador' ? 'bg-yellow-100 text-yellow-700' :
                      c.status === 'Cerrada' ? 'bg-gray-200 text-gray-700' :
                      'bg-green-100 text-green-700'}`}>
                    {c.status}
                  </span>
                  <span className="ml-4 text-pink-500 font-medium">{c.deadline}</span>
                </span>
                <div className="flex gap-2 mt-2 md:mt-0">
                  {c.status !== 'Activa' && (
                    <button
                      onClick={() => activarConvocatoria(c.id)}
                      className="px-3 py-1 bg-gradient-to-r from-green-400 to-green-600 text-white rounded font-bold shadow hover:from-green-500 hover:to-green-700 transition"
                      title="Activar"
                    >
                      <FaCheck />
                    </button>
                  )}
                  {c.status === 'Activa' && (
                    <button
                      onClick={() => handleDeactivate(c.id)}
                      className="px-3 py-1 bg-gradient-to-r from-gray-400 to-gray-600 text-white rounded font-bold shadow hover:from-gray-500 hover:to-gray-700 transition"
                      title="Desactivar"
                    >
                      <FaTimes />
                    </button>
                  )}
                  <button
                    onClick={() => handleEdit(c)}
                    className="px-3 py-1 bg-yellow-400 text-white rounded font-bold shadow hover:bg-yellow-500 transition"
                    title="Editar"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => openDeleteModal(c.id, c.title)}
                    className="px-3 py-1 bg-red-500 text-white rounded font-bold shadow hover:bg-red-600 transition"
                    title="Eliminar"
                  >
                    <FaTrash />
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      {/* Modal de confirmación */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-sm w-full border border-pink-200">
            <h3 className="text-xl font-bold text-pink-700 mb-4">¿Eliminar convocatoria?</h3>
            <p className="text-gray-700 mb-6">
              ¿Estás seguro que deseas eliminar <span className="font-semibold text-pink-600">{deleteTitleRef.current}</span>? Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-bold hover:bg-gray-300 transition"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold shadow hover:from-red-600 hover:to-pink-600 transition"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}