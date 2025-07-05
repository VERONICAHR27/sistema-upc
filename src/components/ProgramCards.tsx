import Link from 'next/link';

const programCards = [
    {
        id: 'incubalab',
        title: 'Incubalab',
        description: 'Laboratorio de incubación de ideas innovadoras donde convertimos conceptos en prototipos funcionales.',
        features: [
            'Mentoría especializada',
            'Acceso a laboratorios',
            'Financiamiento inicial',
            'Red de contactos'
        ],
        icon: '🧪',
        color: 'from-pink-500 to-red-500',
        href: '/programas/incubalab'
    },
    {
        id: 'idea-feedback',
        title: 'Idea Feedback',
        description: 'Plataforma de validación y retroalimentación para perfeccionar tu propuesta de valor.',
        features: [
            'Evaluación de expertos',
            'Feedback de mercado',
            'Análisis de viabilidad',
            'Mejora continua'
        ],
        icon: '💡',
        color: 'from-fuchsia-500 to-pink-500',
        href: '/programas/idea-feedback'
    },
    {
        id: 'aceleracion',
        title: 'Programa de Aceleración',
        description: 'Acelera el crecimiento de tu startup con nuestro programa intensivo de 6 meses.',
        features: [
            'Plan de negocio avanzado',
            'Acceso a inversores',
            'Escalamiento comercial',
            'Internacionalización'
        ],
        icon: '🚀',
        color: 'from-red-500 to-pink-600',
        href: '/programas/aceleracion'
    }
];

export default function ProgramCards() {
    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Nuestros Programas
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        StartUPC es la aceleradora de negocios de la Universidad Peruana de Ciencias
                        Aplicadas, cuyo propósito es impulsar la innovación y potenciar la capacidad
                        emprendedora de nuestra comunidad.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {programCards.map((card) => (
                        <div
                            key={card.id}
                            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-2"
                        >
                            {/* Header with gradient */}
                            <div className={`bg-gradient-to-r ${card.color} p-6 text-white`}>
                                <div className="text-4xl mb-3">{card.icon}</div>
                                <h3 className="text-xl font-bold">{card.title}</h3>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    {card.description}
                                </p>

                                {/* Features */}
                                <ul className="space-y-2 mb-6">
                                    {card.features.map((feature, index) => (
                                        <li key={index} className="flex items-center text-sm text-gray-700">
                                            <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA Button */}
                                <Link
                                    href={card.href}
                                    className={`block w-full text-center bg-gradient-to-r ${card.color} text-white py-3 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity`}
                                >
                                    Conocer más
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="text-center mt-12">
                    <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            ¿Listo para comenzar tu journey emprendedor?
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Únete a nuestra comunidad de innovadores y transforma tu idea en realidad
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/convocatoria"
                                className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-3 rounded-lg font-medium hover:from-pink-600 hover:to-red-600 transition-all"
                            >
                                Ver Convocatoria Actual
                            </Link>
                            <Link
                                href="/auth/signin"
                                className="border border-pink-500 text-pink-500 px-6 py-3 rounded-lg font-medium hover:bg-pink-50 transition-colors"
                            >
                                Registrarse
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
