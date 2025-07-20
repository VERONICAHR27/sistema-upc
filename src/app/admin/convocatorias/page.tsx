'use client';

import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaStar, FaPlay, FaStop } from 'react-icons/fa';
import { useConvocatorias, Convocatoria } from '@/contexts/ConvocatoriaContext';

type CronoEtapa = {
  title: string;
  desde: string;
  hasta: string;
  status: string;
};

const defaultCronograma: CronoEtapa[] = [
  { title: 'Convocatoria', desde: '', hasta: '', status: 'active' },
  { title: 'Evaluación', desde: '', hasta: '', status: 'upcoming' },
  { title: 'Anuncio de Ganadores', desde: '', hasta: '', status: 'upcoming' },
  { title: 'Duracion del proyecto', desde: '', hasta: '', status: 'upcoming' }
];

type ConvocatoriaForm = {
  title: string;
  deadline: string;
  type: string;
  cronograma: CronoEtapa[];
  basesUrl?: string;
};

export default function ConvocatoriasAdminPage() {
  const {
    convocatorias,
    addConvocatoria,
    activarConvocatoria,
    marcarPrincipal,
    activarYMarcarPrincipal,
    editarConvocatoria,
    eliminarConvocatoria,
    loading,
    reloadConvocatorias
  } = useConvocatorias();

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filtroActivo, setFiltroActivo] = useState<string>('TODOS');
  const [form, setForm] = useState<ConvocatoriaForm>({
    title: '',
    deadline: '',
    type: 'Incubalab',
    cronograma: defaultCronograma,
    basesUrl: ''
  });

  useEffect(() => {
    reloadConvocatorias();
  }, [reloadConvocatorias]);

  const filtrarConvocatorias = () => {
    if (filtroActivo === 'TODOS') return convocatorias;
    return convocatorias.filter(c => c.status === filtroActivo);
  };

  const convocatoriasFiltradas = filtrarConvocatorias();

  const resetForm = () => {
    setForm({
      title: '',
      deadline: '',
      type: 'Incubalab',
      cronograma: defaultCronograma,
      basesUrl: ''
    });
    setEditingId(null);
  };

  const openCreateModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (convocatoria: Convocatoria) => {
    setForm({
      title: convocatoria.title,
      deadline: convocatoria.deadline,
      type: convocatoria.type,
      cronograma: convocatoria.cronograma ? convocatoria.cronograma.map(item => ({
        title: item.title || '',
        desde: item.desde || '',
        hasta: item.hasta || '',
        status: item.status || ''
      })) : defaultCronograma,
      basesUrl: convocatoria.basesUrl || ''
    });
    setEditingId(convocatoria.id);
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validaciones básicas
    if (!form.title.trim()) {
      alert('El título es requerido');
      return;
    }
    
    if (!form.deadline) {
      alert('La fecha límite es requerida');
      return;
    }
    
    if (!form.type.trim()) {
      alert('El tipo es requerido');
      return;
    }
    
    try {
      console.log('Form data:', form);
      
      if (editingId) {
        await editarConvocatoria(editingId, form);
      } else {
        await addConvocatoria({
          ...form,
          status: 'BORRADOR'
        });
      }
      setShowModal(false);
      resetForm();
      await reloadConvocatorias();
    } catch (error) {
      console.error('Error al guardar convocatoria:', error);
      
      // Mostrar el error al usuario
      if (error instanceof Error) {
        alert(`Error: ${error.message}`);
      } else {
        alert('Error desconocido al guardar la convocatoria');
      }
    }
  };

  const handleActivar = async (id: string) => {
    try {
      await activarConvocatoria(id);
      await reloadConvocatorias();
    } catch (error) {
      console.error('Error al activar convocatoria:', error);
    }
  };

  const handleCerrar = async (id: string) => {
    try {
      await editarConvocatoria(id, { status: 'CERRADA' });
      await reloadConvocatorias();
    } catch (error) {
      console.error('Error al cerrar convocatoria:', error);
    }
  };

  const handleReactivar = async (id: string) => {
    try {
      await editarConvocatoria(id, { status: 'ACTIVA' });
      await reloadConvocatorias();
    } catch (error) {
      console.error('Error al reactivar convocatoria:', error);
    }
  };

  const handleMarcarPrincipal = async (id: string) => {
    try {
      await marcarPrincipal(id);
      await reloadConvocatorias();
    } catch (error) {
      console.error('Error al marcar como principal:', error);
    }
  };

  const handlePublicar = async (id: string) => {
    try {
      await activarYMarcarPrincipal(id);
      await reloadConvocatorias();
    } catch (error) {
      console.error('Error al publicar convocatoria:', error);
    }
  };

  const handleEliminar = async (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta convocatoria?')) {
      try {
        await eliminarConvocatoria(id);
        await reloadConvocatorias();
      } catch (error) {
        console.error('Error al eliminar convocatoria:', error);
      }
    }
  };

  const updateCronograma = (index: number, field: keyof CronoEtapa, value: string) => {
    const newCronograma = [...form.cronograma];
    newCronograma[index] = { ...newCronograma[index], [field]: value };
    setForm({ ...form, cronograma: newCronograma });
  };

  const getStatusBadge = (status: string, principal?: boolean) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    
    if (principal) {
      return (
        <div className="flex items-center gap-1">
          <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>
            {status}
          </span>
          <FaStar className="text-yellow-500" />
          <span className="text-xs text-yellow-600">Principal</span>
        </div>
      );
    }
    
    switch (status) {
      case 'ACTIVA':
        return <span className={`${baseClasses} bg-green-100 text-green-800`}>Activa</span>;
      case 'CERRADA':
        return <span className={`${baseClasses} bg-red-100 text-red-800`}>Cerrada</span>;
      case 'BORRADOR':
        return <span className={`${baseClasses} bg-gray-100 text-gray-800`}>Borrador</span>;
      default:
        return <span className={`${baseClasses} bg-gray-100 text-gray-800`}>{status}</span>;
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Cargando convocatorias...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Convocatorias</h1>
        <div className="flex gap-2">
          <button
            onClick={openCreateModal}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
          >
            <FaPlus /> Nueva Convocatoria
          </button>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div 
          className={`bg-white p-4 rounded-lg shadow cursor-pointer transition-all ${
            filtroActivo === 'TODOS' ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-md'
          }`}
          onClick={() => setFiltroActivo('TODOS')}
        >
          <div className="text-2xl font-bold text-blue-600">{convocatorias.length}</div>
          <div className="text-sm text-gray-600">Total</div>
        </div>
        <div 
          className={`bg-white p-4 rounded-lg shadow cursor-pointer transition-all ${
            filtroActivo === 'ACTIVA' ? 'ring-2 ring-green-500 bg-green-50' : 'hover:shadow-md'
          }`}
          onClick={() => setFiltroActivo('ACTIVA')}
        >
          <div className="text-2xl font-bold text-green-600">
            {convocatorias.filter(c => c.status === 'ACTIVA').length}
          </div>
          <div className="text-sm text-gray-600">Activas</div>
        </div>
        <div 
          className={`bg-white p-4 rounded-lg shadow cursor-pointer transition-all ${
            filtroActivo === 'BORRADOR' ? 'ring-2 ring-gray-500 bg-gray-50' : 'hover:shadow-md'
          }`}
          onClick={() => setFiltroActivo('BORRADOR')}
        >
          <div className="text-2xl font-bold text-gray-600">
            {convocatorias.filter(c => c.status === 'BORRADOR').length}
          </div>
          <div className="text-sm text-gray-600">Borradores</div>
        </div>
        <div 
          className={`bg-white p-4 rounded-lg shadow cursor-pointer transition-all ${
            filtroActivo === 'CERRADA' ? 'ring-2 ring-red-500 bg-red-50' : 'hover:shadow-md'
          }`}
          onClick={() => setFiltroActivo('CERRADA')}
        >
          <div className="text-2xl font-bold text-red-600">
            {convocatorias.filter(c => c.status === 'CERRADA').length}
          </div>
          <div className="text-sm text-gray-600">Cerradas</div>
        </div>
      </div>

      {/* Lista de Convocatorias */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Convocatoria
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha Límite
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {convocatoriasFiltradas.map((convocatoria) => (
                <tr key={convocatoria.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{convocatoria.title}</div>
                    <div className="text-sm text-gray-500">
                      Creada: {convocatoria.createdAt ? new Date(convocatoria.createdAt).toLocaleDateString() : 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(convocatoria.status, convocatoria.principal)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {convocatoria.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {convocatoria.deadline}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      {/* Botón Editar */}
                      <button
                        onClick={() => openEditModal(convocatoria)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Editar"
                      >
                        <FaEdit />
                      </button>

                      {/* Botón Activar/Publicar/Cerrar */}
                      {convocatoria.status === 'BORRADOR' && (
                        <>
                          <button
                            onClick={() => handleActivar(convocatoria.id)}
                            className="text-green-600 hover:text-green-900"
                            title="Activar"
                          >
                            <FaPlay />
                          </button>
                          <button
                            onClick={() => handlePublicar(convocatoria.id)}
                            className="text-blue-600 hover:text-blue-900 bg-blue-50 px-2 py-1 rounded text-xs font-semibold"
                            title="Publicar (Activar + Marcar como Principal)"
                          >
                            🚀 Publicar
                          </button>
                        </>
                      )}
                      
                      {convocatoria.status === 'ACTIVA' && (
                        <button
                          onClick={() => handleCerrar(convocatoria.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Cerrar"
                        >
                          <FaStop />
                        </button>
                      )}

                      {convocatoria.status === 'CERRADA' && (
                        <button
                          onClick={() => handleReactivar(convocatoria.id)}
                          className="text-green-600 hover:text-green-900"
                          title="Reactivar"
                        >
                          <FaPlay />
                        </button>
                      )}

                      {/* Botón Marcar como Principal */}
                      {convocatoria.status === 'ACTIVA' && !convocatoria.principal && (
                        <button
                          onClick={() => handleMarcarPrincipal(convocatoria.id)}
                          className="text-yellow-600 hover:text-yellow-900"
                          title="Marcar como Principal"
                        >
                          <FaStar />
                        </button>
                      )}

                      {/* Botón Eliminar */}
                      <button
                        onClick={() => handleEliminar(convocatoria.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Eliminar"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {convocatoriasFiltradas.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500">
              {filtroActivo === 'TODOS' ? 'No hay convocatorias creadas' : `No hay convocatorias ${filtroActivo.toLowerCase()}`}
            </div>
            {filtroActivo === 'TODOS' && (
              <button
                onClick={openCreateModal}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Crear Primera Convocatoria
              </button>
            )}
          </div>
        )}
      </div>

      {/* Modal de Crear/Editar */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {editingId ? 'Editar Convocatoria' : 'Nueva Convocatoria'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Información Básica */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Título de la Convocatoria
                  </label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ej: Convocatoria Startups 2024"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo
                  </label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Incubalab">Incubalab</option>
                    <option value="Idea Feedback">Idea Feedback</option>
                    <option value="Programa de Aceleración">Programa de Aceleración</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha Límite
                  </label>
                  <input
                    type="date"
                    value={form.deadline}
                    onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL de las Bases (opcional)
                  </label>
                  <input
                    type="url"
                    value={form.basesUrl}
                    onChange={(e) => setForm({ ...form, basesUrl: e.target.value })}
                    placeholder="https://ejemplo.com/bases.pdf"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Cronograma */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Cronograma</h3>
                <div className="space-y-3">
                  {form.cronograma.map((etapa, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 border border-gray-200 rounded-lg">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Etapa
                        </label>
                        <input
                          type="text"
                          value={etapa.title}
                          onChange={(e) => updateCronograma(index, 'title', e.target.value)}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Desde
                        </label>
                        <input
                          type="date"
                          value={etapa.desde}
                          onChange={(e) => updateCronograma(index, 'desde', e.target.value)}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Hasta
                        </label>
                        <input
                          type="date"
                          value={etapa.hasta}
                          onChange={(e) => updateCronograma(index, 'hasta', e.target.value)}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                      
                    </div>
                  ))}
                </div>
              </div>

              {/* Botones */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {editingId ? 'Actualizar' : 'Crear'} Convocatoria
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
