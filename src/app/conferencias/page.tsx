import Navbar from '@/components/Navbar';

export default function Conferencias() {
  const upcomingEvents = [
    {
      date: '25 Jul',
      title: 'Innovación Tecnológica en el Siglo XXI',
      speaker: 'Dr. Roberto Silva',
      time: '6:00 PM - 8:00 PM',
      type: 'Presencial',
      location: 'Auditorio Principal UPC'
    },
    {
      date: '10 Ago',
      title: 'Fintech y el Futuro de las Finanzas',
      speaker: 'Ana Mendoza, CEO de PayTech',
      time: '7:00 PM - 9:00 PM',
      type: 'Virtual',
      location: 'Zoom'
    },
    {
      date: '20 Ago',
      title: 'Sostenibilidad e Innovación Social',
      speaker: 'Ing. Carlos Vega',
      time: '5:30 PM - 7:30 PM',
      type: 'Híbrido',
      location: 'UPC + Online'
    }
  ];

  const pastEvents = [
    {
      date: '15 Jun',
      title: 'Inteligencia Artificial en los Negocios',
      speaker: 'Dr. María Torres',
      views: '2,500',
      duration: '90 min'
    },
    {
      date: '28 May',
      title: 'Blockchain y Criptomonedas',
      speaker: 'Luis García',
      views: '1,800',
      duration: '75 min'
    },
    {
      date: '10 May',
      title: 'Marketing Digital para Startups',
      speaker: 'Sofía López',
      views: '3,200',
      duration: '60 min'
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
            <div>
              <div className="text-sm font-medium opacity-90 mb-2">PRÓXIMO EVENTO DESTACADO</div>
              <h2 className="text-3xl font-bold mb-4">Summit de Innovación UPC 2025</h2>
              <p className="text-lg opacity-90 mb-6">
                Un evento de 3 días con los mejores speakers internacionales en tecnología, emprendimiento e innovación.
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="bg-white/20 px-3 py-1 rounded-full">📅 15-17 Septiembre</span>
                <span className="bg-white/20 px-3 py-1 rounded-full">📍 Campus UPC</span>
                <span className="bg-white/20 px-3 py-1 rounded-full">👥 500+ Asistentes</span>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/10 rounded-lg p-8">
                <div className="text-6xl mb-4">🎯</div>
                <button className="bg-white text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-red-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors border-2 border-white">
                  Reservar Lugar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Próximas Conferencias</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm font-medium">
                      {event.date}
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      event.type === 'Presencial' ? 'bg-green-100 text-green-600' :
                      event.type === 'Virtual' ? 'bg-purple-100 text-purple-600' :
                      'bg-orange-100 text-orange-600'
                    }`}>
                      {event.type}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-2">{event.speaker}</p>
                  <p className="text-sm text-gray-500 mb-2">⏰ {event.time}</p>
                  <p className="text-sm text-gray-500 mb-4">📍 {event.location}</p>
                  <button className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-2 rounded-lg hover:from-pink-600 hover:to-red-600 transition-all">
                    Registrarse
                  </button>
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
