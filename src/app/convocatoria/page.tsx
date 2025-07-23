'use client';

import { useConvocatorias, type Convocatoria } from '@/contexts/ConvocatoriaContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState } from 'react';

export default function Convocatoria() {
  const { getActiva, getActivas, getHistorial, convocatorias, loading } = useConvocatorias();
  const convocatoriaPrincipal = getActiva();
  const convocatoriasActivas = getActivas();
  const convocatoriasFinalizadas = getHistorial().filter(c => c.status === 'CERRADA');
  const [showExpiredModal, setShowExpiredModal] = useState(false);
  const [showEarlyModal, setShowEarlyModal] = useState(false);
  const [showResultsModal, setShowResultsModal] = useState(false);
  /*const [selectedConvocatoriaId, setSelectedConvocatoriaId] = useState<string>('');*/
  const [aceptadas, setAceptadas] = useState<{id: string, nombreComercial: string, razonSocial: string}[]>([]);

  const handleVerResultados = async (convocatoriaId: string) => {
    try {
      const response = await fetch('/api/startups');
      if (response.ok) {
        const data = await response.json();
        const aceptadasFiltradas = data.filter((startup: {id: string, nombreComercial: string, razonSocial: string, estado: string, convocatoriaId: string}) => 
          startup.estado === 'ACEPTADA' && startup.convocatoriaId === convocatoriaId
        );
        setAceptadas(aceptadasFiltradas);
        /* setSelectedConvocatoriaId(convocatoriaId); */
        setShowResultsModal(true);
      }
    } catch (error) {
      console.error('Error loading results:', error);
    }
  };

  // Función para verificar si una convocatoria está expirada
  const isConvocatoriaExpired = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    return today > deadlineDate;
  };

  // Función para verificar si una convocatoria aún no ha iniciado
  const isConvocatoriaNotStarted = (convocatoria: Convocatoria) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Buscar la primera etapa del cronograma
    const firstStage = convocatoria.cronograma?.[0];
    if (!firstStage?.desde) return false;
    
    const startDate = new Date(firstStage.desde);
    startDate.setHours(0, 0, 0, 0);
    
    return today < startDate;
  };

  // Función para determinar el estado automático de una etapa del cronograma
  const getCronogramaItemStatus = (item: { title: string; status?: string; desde?: string; hasta?: string }) => {
    if (!item.desde || !item.hasta) {
      return 'pending'; // Si no tiene fechas, está pendiente
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalizar la fecha de hoy
    
    const startDate = new Date(item.desde);
    const endDate = new Date(item.hasta);
    
    // Normalizar las fechas para comparar solo el día
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    if (today < startDate) {
      return 'pending'; // Aún no ha iniciado
    } else if (today >= startDate && today <= endDate) {
      return 'active'; // Está en progreso
    } else {
      return 'completed'; // Ya terminó
    }
  };

  // Función para obtener el color del estado
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500'; // Verde para completado
      case 'active':
        return 'bg-pink-500'; // Rosa para activo
      case 'pending':
        return 'bg-gray-300'; // Gris para pendiente
      default:
        return 'bg-gray-300';
    }
  };

 

  const handlePostularClick = (convocatoria: Convocatoria) => {
    if (isConvocatoriaExpired(convocatoria.deadline)) {
      setShowExpiredModal(true);
    } else if (isConvocatoriaNotStarted(convocatoria)) {
      setShowEarlyModal(true);
    } else {
      window.location.href = `/formulario-postulacion?convocatoria=${convocatoria.id}`;
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500"></div>
          <p className="mt-4 text-lg text-gray-600">Cargando convocatorias...</p>
        </div>
        <Footer />
      </div>
    );
  }


  // Si no hay convocatorias activas, mostrar mensaje
  if (convocatoriasActivas.length === 0) {
    return (
      <div className="bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">¡Pronto abriremos nuevas convocatorias!</h1>
          <p className="text-lg text-gray-600 mb-6 text-center">
            Te invitamos a estar atento a nuestras redes sociales para conocer las próximas oportunidades.<br />
            Síguenos en <a href="https://www.facebook.com/StartUPC.pe" target="_blank" rel="noopener noreferrer" className="text-pink-600 font-semibold underline">Facebook</a> y <a href="https://www.instagram.com/start_upc/" target="_blank" rel="noopener noreferrer" className="text-pink-600 font-semibold underline">Instagram</a>.
          </p>
          
          {convocatorias.length > 0 && (
            <div className="text-center mt-6">
              <p className="text-sm text-gray-500">
                Información para administradores: Hay {convocatorias.length} convocatoria(s) en el sistema, 
                pero ninguna está activa.
              </p>
            </div>
          )}
        </div>
        <Footer />
      </div>
    );
  }

  // Función para formatear la fecha a "18 de julio del 2025"
  function formatFecha(fecha: string) {
    if (!fecha) return '';
    const meses = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
    const [anio, mes, dia] = fecha.split('-');
    if (!anio || !mes || !dia) return fecha;
    return `${parseInt(dia)} de ${meses[parseInt(mes, 10) - 1]} del ${anio}`;
  }

  // Renderizar componente para una convocatoria finalizada
  const ConvocatoriaFinalizadaCard = ({ convocatoria }: { convocatoria: Convocatoria }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow opacity-75">
      <div className="bg-gradient-to-r from-gray-400 to-gray-500 py-4 px-6 text-center">
        <h3 className="text-xl font-bold text-white mb-1">{convocatoria.title}</h3>
        <p className="text-gray-100 text-sm">
          {convocatoria.type}
        </p>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
            📅 {convocatoria.deadline}
          </span>
          <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
            ❌ Finalizada
          </span>
        </div>

        {/* Cronograma compacto */}
        <div className="bg-gray-50 rounded-lg p-4 mt-6">
          <h4 className="font-semibold text-gray-700 mb-3">Cronograma:</h4>
          <div className="space-y-3">
            {convocatoria.cronograma?.map((item: { title: string; status?: string; desde?: string; hasta?: string }, index: number) => {
              const autoStatus = getCronogramaItemStatus(item);
              return (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${getStatusColor(autoStatus)}`}></div>
                    <div>
                      <span className="text-gray-700 font-medium">{item.title}</span>
                      {item.desde && item.hasta && (
                        <div className="text-gray-500 text-sm">
                          Del {formatFecha(item.desde)} al {formatFecha(item.hasta)}
                        </div>
                      )}
                    </div>
                  </div>
                  
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex gap-2 mt-6">
          <button
            onClick={() => handleVerResultados(convocatoria.id)}
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg text-center hover:bg-blue-600 transition"
          >
            Ver Resultados
          </button>
        </div>
      </div>
    </div>
  );

  // Renderizar componente para una convocatoria individual (card pequeña)
  const ConvocatoriaCard = ({ convocatoria }: { convocatoria: Convocatoria }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="bg-gradient-to-r from-pink-500 to-red-500 py-4 px-6 text-center">
        <h3 className="text-xl font-bold text-white mb-1">{convocatoria.title}</h3>
        <p className="text-pink-100 text-sm">
          {convocatoria.type}
        </p>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm font-medium">
            📅 {convocatoria.deadline}
          </span>
          <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
            ✅ Activa
          </span>
        </div>

        {/* Cronograma compacto */}
       <div className="bg-white rounded-lg p-4 mt-6">
            <h4 className="font-semibold text-gray-900 mb-3">Cronograma:</h4>
            <div className="space-y-3">
              {convocatoria.cronograma?.map((item: { title: string; status?: string; desde?: string; hasta?: string }, index: number) => {
                const autoStatus = getCronogramaItemStatus(item);
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-3 ${getStatusColor(autoStatus)}`}></div>
                      <div>
                        <span className="text-gray-900 font-medium">{item.title}</span>
                        {item.desde && item.hasta && (
                          <div className="text-gray-600 text-sm">
                            Del {formatFecha(item.desde)} al {formatFecha(item.hasta)}
                          </div>
                        )}
                      </div>
                    </div>
                    
                  </div>
                );
              })}
            </div>
          </div>
       
       
       

        <div className="flex gap-2">
          <button
            onClick={() => handlePostularClick(convocatoria)}
            className="flex-1 bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold py-2 px-4 rounded-lg text-center block hover:from-pink-600 hover:to-red-600 transition"
          >
            Postular
          </button>
          
          {convocatoria.basesUrl && (
            <a
              href={convocatoria.basesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-white text-pink-600 font-bold py-2 px-4 rounded-lg text-center block hover:bg-gray-50 transition border-2 border-pink-500"
            >
              📄 Bases
            </a>
          )}
        </div>
      </div>
    </div>
  );

  // Componente para la convocatoria principal (card grande)
  const ConvocatoriaPrincipalCard = ({ convocatoria }: { convocatoria: Convocatoria }) => (
    <div className="bg-gradient-to-r from-pink-500 to-red-500 rounded-lg shadow-lg p-8 text-white mb-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4 text-white">{convocatoria.title}</h2>
          <p className="text-lg opacity-90 mb-6">
            Tipo de convocatoria: <span className="font-semibold">{convocatoria.type}</span>
          </p>
          <div className="flex flex-wrap gap-4 text-sm mb-6">
            <span className="bg-white/20 px-3 py-1 rounded-full">📅 Fecha límite: {convocatoria.deadline}</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">✅ Estado: Activa</span>
          </div>
          
          {/* Cronograma en la card principal */}
          <div className="bg-white rounded-lg p-4 mt-6">
            <h4 className="font-semibold text-gray-900 mb-3">Cronograma:</h4>
            <div className="space-y-3">
              {convocatoria.cronograma?.map((item: { title: string; status?: string; desde?: string; hasta?: string }, index: number) => {
                const autoStatus = getCronogramaItemStatus(item);
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-3 ${getStatusColor(autoStatus)}`}></div>
                      <div>
                        <span className="text-gray-900 font-medium">{item.title}</span>
                        {item.desde && item.hasta && (
                          <div className="text-gray-600 text-sm">
                            Del {formatFecha(item.desde)} al {formatFecha(item.hasta)}
                          </div>
                        )}
                      </div>
                    </div>
                    
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <div className="bg-white/10 rounded-lg p-8">
            <div className="text-6xl mb-4">🚀</div>
            <h3 className="text-xl font-bold mb-3">¿Listo para transformar tu idea?</h3>
            <p className="text-pink-100 mb-6">
              Completa el formulario y da el primer paso para ser parte del ecosistema StartUPC.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handlePostularClick(convocatoria)}
                className="bg-white text-pink-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors border-2 border-white flex-1 text-center"
              >
                Ir al formulario de postulación
              </button>
              
              {convocatoria.basesUrl && (
                <a
                  href={convocatoria.basesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                className="bg-white text-pink-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors border-2 border-white flex-1 text-center"
                >
                  Descargar Bases
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Convocatorias Activas
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Únete a nuestro ecosistema de innovación y transforma tu idea en una startup exitosa.
          </p>
        </div>

        {/* Convocatoria Principal */}
        {convocatoriaPrincipal && (
          <ConvocatoriaPrincipalCard convocatoria={convocatoriaPrincipal} />
        )}

        {/* Otras Convocatorias Activas */}
        {convocatoriasActivas.filter(conv => !conv.principal).length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Otras Convocatorias Disponibles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {convocatoriasActivas
                .filter(conv => !conv.principal)
                .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
                .map((conv) => (
                  <ConvocatoriaCard 
                    key={conv.id} 
                    convocatoria={conv} 
                  />
                ))}
            </div>
          </div>
        )}

        {/* Si no hay convocatoria principal pero sí hay activas */}
        {!convocatoriaPrincipal && convocatoriasActivas.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Convocatorias Disponibles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {convocatoriasActivas
                .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
                .map((conv) => (
                <ConvocatoriaCard 
                  key={conv.id} 
                  convocatoria={conv} 
                />
              ))}
            </div>
          </div>
        )}

        {/* Convocatorias Finalizadas */}
        {convocatoriasFinalizadas.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Convocatorias Finalizadas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {convocatoriasFinalizadas.map((conv) => (
                <ConvocatoriaFinalizadaCard 
                  key={conv.id} 
                  convocatoria={conv} 
                />
              ))}
            </div>
          </div>
        )}

        
      </div>
      
      {/* Modal de convocatoria expirada */}
      {showExpiredModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="text-center">
              <div className="text-6xl mb-4">⏰</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Convocatoria Finalizada
              </h3>
              <p className="text-gray-600 mb-6">
                La fecha límite para esta convocatoria ya ha culminado. 
                Mantente atento a nuestras próximas oportunidades.
              </p>
              <button
                onClick={() => setShowExpiredModal(false)}
                className="bg-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-600 transition-colors"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal de convocatoria no iniciada */}
      {showEarlyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="text-center">
              <div className="text-6xl mb-4">🚀</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Pronto se Apertura el Formulario
              </h3>
              <p className="text-gray-600 mb-6">
                La convocatoria aún no ha iniciado. El formulario de postulación estará disponible próximamente según el cronograma establecido.
              </p>
              <button
                onClick={() => setShowEarlyModal(false)}
                className="bg-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-600 transition-colors"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal de resultados */}
      {showResultsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900">Startups Aceptadas</h3>
                <button
                  onClick={() => setShowResultsModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {aceptadas.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No hay startups aceptadas para esta convocatoria.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {aceptadas.map((startup, index) => (
                    <div key={startup.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {index + 1}. {startup.nombreComercial}
                          </h4>
                          <p className="text-gray-600 text-sm">{startup.razonSocial}</p>
                        </div>
                        <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                          ✅ Aceptada
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
}
