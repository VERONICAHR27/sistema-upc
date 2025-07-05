import Navbar from '@/components/Navbar';

export default function Convocatoria() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Inscripción Aceleración StartUPC 2025-1
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        StartUPC es la aceleradora de negocios de la Universidad Peruana de Ciencias Aplicadas, dedicada a potenciar startups innovadoras con alto potencial de crecimiento.
                    </p>
                    <p></p>
                </div>

                {/* Timeline */}
                <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Cronograma de la Convocatoria</h2>
                    <div className="space-y-6">
                        {[
                            { date: 'Del 23 de junio al 23 de julio.', title: 'Período de Inscripción', status: 'active' },
                            { date: 'del 04 de agosto al 22 de agosto.', title: 'Evaluación de Proyectos', status: 'upcoming' },
                            { date: '27 de agosto.', title: 'Presentación de Finalistas', status: 'upcoming' },
                            { date: '20 de febrero del 2025.', title: 'Anuncio de Ganadores', status: 'upcoming' }
                        ].map((item, index) => (
                            <div key={index} className="flex items-center">
                                <div className={`w-4 h-4 rounded-full mr-4 ${item.status === 'active' ? 'bg-pink-500' : 'bg-gray-300'
                                    }`}></div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                                    <p className="text-gray-600">{item.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Requirements */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Requisitos</h2>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <svg className="w-5 h-5 text-pink-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Ser estudiante o egresado de UPC
                            </li>
                            <li className="flex items-start">
                                <svg className="w-5 h-5 text-pink-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Proyecto innovador y viable
                            </li>
                            <li className="flex items-start">
                                <svg className="w-5 h-5 text-pink-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Plan de negocio completo
                            </li>
                            <li className="flex items-start">
                                <svg className="w-5 h-5 text-pink-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Equipo multidisciplinario
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Premios</h2>
                        <div className="space-y-4">
                            <div className="border-l-4 border-yellow-500 pl-4">
                                <h3 className="font-semibold text-gray-900">1er Lugar</h3>
                                <p className="text-gray-600">S/ 50,000 + Incubación por 6 meses</p>
                            </div>
                            <div className="border-l-4 border-gray-400 pl-4">
                                <h3 className="font-semibold text-gray-900">2do Lugar</h3>
                                <p className="text-gray-600">S/ 30,000 + Mentoría especializada</p>
                            </div>
                            <div className="border-l-4 border-orange-500 pl-4">
                                <h3 className="font-semibold text-gray-900">3er Lugar</h3>
                                <p className="text-gray-600">S/ 20,000 + Acceso a laboratorios</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="bg-gradient-to-r from-fuchsia-500 to-red-500 rounded-lg shadow-lg p-8 text-center text-white">
                    <h2 className="text-3xl font-bold mb-4">¿Listo para participar?</h2>
                    <p className="text-xl mb-6 opacity-90">
                        ¡No pierdas esta oportunidad única de hacer realidad tu proyecto!
                    </p>
                    <button className="bg-white text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-red-500 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors border-2 border-white hover:border-gray-200">
                        Inscríbete Ahora
                    </button>
                </div>
            </div>
        </div>
    );
}
