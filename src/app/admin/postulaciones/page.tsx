'use client';

import { useState, useEffect } from 'react';
import { FaEye, FaCheck, FaTimes, FaClock, FaBuilding } from 'react-icons/fa';

type Startup = {
  id: string;
  nombreComercial: string;
  razonSocial: string;
  numeroFiscal: string;
  sitioWeb: string;
  descripcion: string;
  industria: string;
  industriaOther: string;
  fechaFundacion: string;
  problemaOportunidad: string;
  solucion: string;
  modeloNegocio: string;
  ventajaCompetitiva: string;
  necesidades: string[];
  necesidadesOther: string;
  programaAceleracion: string;
  nombrePrograma: string;
  aprendizajes: string;
  aplicacionAprendizajes: string;
  videoPresentacion: string;
  tieneVentas: string;
  pilotoDemo: string;
  ubicacionSolucion: string;
  montoVentas: string;
  tecnologia: string;
  areaDesarrollo: string;
  inversionExterna: string;
  comoSeEntero: string;
  comoSeEnteroOther: string;
  aceptaPrivacidad: string;
  estado: string;
  createdAt: string;
  convocatoria?: {
    title: string;
  };
  miembrosEquipo: {
    nombres: string;
    apellidos: string;
    rol: string;
    tiempoCompleto: string;
    fechaNacimiento: string;
    lugarNacimiento: string;
    direccion: string;
    tipoDocumento: string;
    numeroDocumento: string;
    telefono: string;
    email: string;
    linkedin: string;
    aceptaPrivacidad: string;
  }[];
};

export default function PostulacionesPage() {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('TODOS');
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);
  const [showModal, setShowModal] = useState(false);

  const loadStartups = async () => {
    try {
      const response = await fetch('/api/startups');
      if (response.ok) {
        const data = await response.json();
        setStartups(data);
      }
    } catch (error) {
      console.error('Error loading startups:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStartups();
  }, []);

  const updateStatus = async (id: string, estado: string) => {
    try {
      const response = await fetch('/api/startups', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, estado })
      });
      
      if (response.ok) {
        setStartups(prev => 
          prev.map(s => s.id === id ? { ...s, estado } : s)
        );
      }
    } catch (error) {
      console.error('Error updating startup status:', error);
    }
  };

  const filteredStartups = startups.filter(startup => {
    if (filter === 'TODOS') return true;
    return startup.estado === filter;
  });

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case 'PENDIENTE': return 'bg-yellow-100 text-yellow-800';
      case 'EN_REVISION': return 'bg-blue-100 text-blue-800';
      case 'ACEPTADA': return 'bg-green-100 text-green-800';
      case 'RECHAZADA': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (estado: string) => {
    switch (estado) {
      case 'PENDIENTE': return <FaClock className="w-4 h-4" />;
      case 'EN_REVISION': return <FaEye className="w-4 h-4" />;
      case 'ACEPTADA': return <FaCheck className="w-4 h-4" />;
      case 'RECHAZADA': return <FaTimes className="w-4 h-4" />;
      default: return <FaClock className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando postulaciones...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Postulaciones de Startups</h1>
          <p className="text-gray-600">
            Gestiona y revisa todas las postulaciones recibidas para las convocatorias
          </p>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Filtrar por estado</h2>
          <div className="flex flex-wrap gap-2">
            {['TODOS', 'PENDIENTE', 'ACEPTADA', 'RECHAZADA'].map((estado) => (
              <button
                key={estado}
                onClick={() => setFilter(estado)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filter === estado
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {estado === 'TODOS' ? 'Todos' : estado.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {[
            { label: 'Total', count: startups.length, color: 'bg-blue-500' },
            { label: 'Pendientes', count: startups.filter(s => s.estado === 'PENDIENTE').length, color: 'bg-yellow-500' },
            { label: 'Aceptadas', count: startups.filter(s => s.estado === 'ACEPTADA').length, color: 'bg-green-500' },
            { label: 'Rechazadas', count: startups.filter(s => s.estado === 'RECHAZADA').length, color: 'bg-red-500' }
          ].map((stat) => (
            <div key={stat.label} className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <FaBuilding className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.count}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lista de startups */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">
              Postulaciones ({filteredStartups.length})
            </h2>
          </div>
          
          {filteredStartups.length === 0 ? (
            <div className="p-12 text-center">
              <FaBuilding className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No hay postulaciones que coincidan con el filtro seleccionado</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Startup
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Convocatoria
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Industria
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStartups.map((startup) => (
                    <tr key={startup.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {startup.nombreComercial}
                          </div>
                          <div className="text-sm text-gray-500">
                            {startup.razonSocial}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {startup.convocatoria?.title || 'No asignada'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {startup.industria}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(startup.estado)}`}>
                          {getStatusIcon(startup.estado)}
                          <span className="ml-1">{startup.estado.replace('_', ' ')}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(startup.createdAt).toLocaleDateString('es-ES')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setSelectedStartup(startup);
                              setShowModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-900"
                            title="Ver detalles"
                          >
                            <FaEye className="w-4 h-4" />
                          </button>
                          {startup.estado === 'PENDIENTE' && (
                            <>
                              <button
                                onClick={() => updateStatus(startup.id, 'ACEPTADA')}
                                className="text-green-600 hover:text-green-900"
                                title="Aceptar"
                              >
                                <FaCheck className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => updateStatus(startup.id, 'RECHAZADA')}
                                className="text-red-600 hover:text-red-900"
                                title="Rechazar"
                              >
                                <FaTimes className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal de detalles */}
      {showModal && selectedStartup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold">Detalles Completos de la Postulación</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-8">
              {/* Paso 1: Datos Generales */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-pink-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">1</span>
                  Datos Generales
                </h4>
                <table className="w-full border border-gray-300">
                  <tbody className="bg-white">
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-3 font-semibold bg-gray-100 w-1/2">1. Nombre comercial de la empresa</td>
                      <td className="px-4 py-3">{selectedStartup.nombreComercial}</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-3 font-semibold bg-gray-100">2. Razón social o nombre legal de la empresa</td>
                      <td className="px-4 py-3">{selectedStartup.razonSocial}</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-3 font-semibold bg-gray-100">3. Número fiscal</td>
                      <td className="px-4 py-3">{selectedStartup.numeroFiscal}</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-3 font-semibold bg-gray-100">4. Sitio web de la empresa</td>
                      <td className="px-4 py-3">{selectedStartup.sitioWeb}</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-3 font-semibold bg-gray-100">5. Descripción del emprendimiento</td>
                      <td className="px-4 py-3">{selectedStartup.descripcion}</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-3 font-semibold bg-gray-100">6. Industria o sector</td>
                      <td className="px-4 py-3">{selectedStartup.industria}</td>
                    </tr>
                    {selectedStartup.industriaOther && (
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-3 font-semibold bg-gray-100">Industria (Otro)</td>
                        <td className="px-4 py-3">{selectedStartup.industriaOther}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Paso 2: Información sobre la Startup */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-pink-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">2</span>
                  Información sobre la Startup
                </h4>
                <table className="w-full border border-gray-300">
                  <tbody className="bg-white">
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-3 font-semibold bg-gray-100 w-1/2">8. ¿Cuándo fue fundada la startup?</td>
                      <td className="px-4 py-3">{selectedStartup.fechaFundacion}</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-3 font-semibold bg-gray-100">9. ¿Qué problema u oportunidad aborda tu startup en el mercado?</td>
                      <td className="px-4 py-3">{selectedStartup.problemaOportunidad}</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-3 font-semibold bg-gray-100">10. ¿Cuál es la solución que ofrece tu startup?</td>
                      <td className="px-4 py-3">{selectedStartup.solucion}</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-3 font-semibold bg-gray-100">11. ¿Cuál es el modelo de negocio de tu startup?</td>
                      <td className="px-4 py-3">{selectedStartup.modeloNegocio}</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-3 font-semibold bg-gray-100">12. ¿Cuál es la principal ventaja competitiva de tu startup?</td>
                      <td className="px-4 py-3">{selectedStartup.ventajaCompetitiva}</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-3 font-semibold bg-gray-100">13. ¿Cuáles son las principales necesidades o desafíos que tu startup enfrenta actualmente?</td>
                      <td className="px-4 py-3">{selectedStartup.necesidades?.join(', ')}</td>
                    </tr>
                    {selectedStartup.necesidadesOther && (
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-3 font-semibold bg-gray-100">Necesidades (Otro)</td>
                        <td className="px-4 py-3">{selectedStartup.necesidadesOther}</td>
                      </tr>
                    )}
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-3 font-semibold bg-gray-100">14. ¿Has participado en algún programa de aceleración, incubación o similar anteriormente?</td>
                      <td className="px-4 py-3">{selectedStartup.programaAceleracion}</td>
                    </tr>
                    {selectedStartup.nombrePrograma && (
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-3 font-semibold bg-gray-100">15. Nombre del programa</td>
                        <td className="px-4 py-3">{selectedStartup.nombrePrograma}</td>
                      </tr>
                    )}
                    {selectedStartup.aprendizajes && (
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-3 font-semibold bg-gray-100">16. ¿Qué aprendizajes obtuvieron del programa?</td>
                        <td className="px-4 py-3">{selectedStartup.aprendizajes}</td>
                      </tr>
                    )}
                    {selectedStartup.aplicacionAprendizajes && (
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-3 font-semibold bg-gray-100">17. ¿Cómo aplicaron esos aprendizajes en su startup?</td>
                        <td className="px-4 py-3">{selectedStartup.aplicacionAprendizajes}</td>
                      </tr>
                    )}
                    {selectedStartup.videoPresentacion && (
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-3 font-semibold bg-gray-100">18. Video de presentación</td>
                        <td className="px-4 py-3">{selectedStartup.videoPresentacion}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Paso 3: Ventas y Operaciones */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-pink-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">3</span>
                  Ventas y Operaciones
                </h4>
                <table className="w-full border border-gray-300">
                  <tbody className="bg-white">
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-3 font-semibold bg-gray-100 w-1/2">19. ¿Tu startup ya tiene ventas o ingresos?</td>
                      <td className="px-4 py-3">{selectedStartup.tieneVentas}</td>
                    </tr>
                    {selectedStartup.montoVentas && (
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-3 font-semibold bg-gray-100">20. Monto de ventas</td>
                        <td className="px-4 py-3">{selectedStartup.montoVentas}</td>
                      </tr>
                    )}
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-3 font-semibold bg-gray-100">21. ¿Cuentan con un piloto, demo o versión funcional de su producto/servicio?</td>
                      <td className="px-4 py-3">{selectedStartup.pilotoDemo}</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-3 font-semibold bg-gray-100">22. ¿En qué ciudad, país o región opera principalmente su solución?</td>
                      <td className="px-4 py-3">{selectedStartup.ubicacionSolucion}</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-3 font-semibold bg-gray-100">23. ¿Qué tecnología utiliza tu startup?</td>
                      <td className="px-4 py-3">{selectedStartup.tecnologia}</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-3 font-semibold bg-gray-100">24. ¿En qué área necesitas más desarrollo o apoyo?</td>
                      <td className="px-4 py-3">{selectedStartup.areaDesarrollo}</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-3 font-semibold bg-gray-100">25. ¿Has recibido algún tipo de inversión externa (ángeles, VCs, fondos, etc.)?</td>
                      <td className="px-4 py-3">{selectedStartup.inversionExterna}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Paso 4: Información del Equipo */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-pink-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">4</span>
                  Información del Equipo
                </h4>
                
                {/* Miembros del Equipo */}
                <div className="space-y-6 mb-6">
                  {selectedStartup.miembrosEquipo.map((miembro, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg border">
                      <h5 className="font-semibold text-lg mb-3 text-pink-600">
                        Miembro {index + 1}: {miembro.nombres} {miembro.apellidos}
                      </h5>
                      <table className="w-full border border-gray-300">
                        <tbody className="bg-white">
                          <tr className="border-b border-gray-200">
                            <td className="px-4 py-3 font-semibold bg-gray-100 w-1/2">26.1. Nombres</td>
                            <td className="px-4 py-3">{miembro.nombres}</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="px-4 py-3 font-semibold bg-gray-100">26.2. Apellidos</td>
                            <td className="px-4 py-3">{miembro.apellidos}</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="px-4 py-3 font-semibold bg-gray-100">26.3. Rol en la startup</td>
                            <td className="px-4 py-3">{miembro.rol}</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="px-4 py-3 font-semibold bg-gray-100">26.4. ¿Se dedica tiempo completo a la startup?</td>
                            <td className="px-4 py-3">{miembro.tiempoCompleto}</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="px-4 py-3 font-semibold bg-gray-100">26.5. Fecha de nacimiento</td>
                            <td className="px-4 py-3">{miembro.fechaNacimiento}</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="px-4 py-3 font-semibold bg-gray-100">26.6. Lugar de nacimiento</td>
                            <td className="px-4 py-3">{miembro.lugarNacimiento}</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="px-4 py-3 font-semibold bg-gray-100">26.7. Dirección actual</td>
                            <td className="px-4 py-3">{miembro.direccion}</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="px-4 py-3 font-semibold bg-gray-100">26.8. Tipo de documento</td>
                            <td className="px-4 py-3">{miembro.tipoDocumento}</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="px-4 py-3 font-semibold bg-gray-100">26.9. Número de documento</td>
                            <td className="px-4 py-3">{miembro.numeroDocumento}</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="px-4 py-3 font-semibold bg-gray-100">26.10. Teléfono</td>
                            <td className="px-4 py-3">{miembro.telefono}</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="px-4 py-3 font-semibold bg-gray-100">26.11. Correo electrónico</td>
                            <td className="px-4 py-3">{miembro.email}</td>
                          </tr>
                          {miembro.linkedin && (
                            <tr className="border-b border-gray-200">
                              <td className="px-4 py-3 font-semibold bg-gray-100">26.12. LinkedIn</td>
                              <td className="px-4 py-3">{miembro.linkedin}</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
                
                {/* Preguntas Finales */}
                <table className="w-full border border-gray-300">
                  <tbody className="bg-white">
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-3 font-semibold bg-gray-100 w-1/2">30. ¿Cómo te enteraste de StartUPC?</td>
                      <td className="px-4 py-3">{selectedStartup.comoSeEntero}</td>
                    </tr>
                    {selectedStartup.comoSeEnteroOther && (
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-3 font-semibold bg-gray-100">Cómo se enteró (Otro)</td>
                        <td className="px-4 py-3">{selectedStartup.comoSeEnteroOther}</td>
                      </tr>
                    )}
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-3 font-semibold bg-gray-100">31. Aviso de Privacidad y Consentimiento</td>
                      <td className="px-4 py-3">{selectedStartup.aceptaPrivacidad}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4 border-t">
                {selectedStartup.estado === 'PENDIENTE' && (
                  <>
                    <button
                      onClick={() => {
                        updateStatus(selectedStartup.id, 'ACEPTADA');
                        setShowModal(false);
                      }}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                      Aceptar Postulación
                    </button>
                    <button
                      onClick={() => {
                        updateStatus(selectedStartup.id, 'RECHAZADA');
                        setShowModal(false);
                      }}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Rechazar Postulación
                    </button>
                  </>
                )}
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
