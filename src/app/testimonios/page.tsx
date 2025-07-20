import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function Testimonios() {
  const testimonials = [
    {
      name: 'María González',
      role: 'CEO de TechStart',
      image: '👩‍💼',
      quote: 'StarUPC fue fundamental para el desarrollo de mi startup. La mentoría y el apoyo recibido fueron invaluables.',
      company: 'TechStart'
    },
    {
      name: 'Carlos Mendoza',
      role: 'Fundador de EcoSolutions',
      image: '👨‍💻',
      quote: 'El programa de aceleración me ayudó a llevar mi idea de un prototipo a una empresa rentable.',
      company: 'EcoSolutions'
    },
    {
      name: 'Ana Rojas',
      role: 'Co-fundadora de HealthTech',
      image: '👩‍⚕️',
      quote: 'La red de contactos y la experiencia adquirida en StarUPC fueron clave para nuestro éxito.',
      company: 'HealthTech'
    }
  ];

  return (
    <div className="bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Testimonios
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conoce las historias de éxito de emprendedores que transformaron sus ideas en realidades exitosas con el apoyo de StarUPC.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-4xl font-bold text-pink-500 mb-2">150+</div>
            <div className="text-gray-600">Empresas Incubadas</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">85%</div>
            <div className="text-gray-600">Tasa de Supervivencia</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">S/ 50M</div>
            <div className="text-gray-600">Inversión Levantada</div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-4">
                <div className="text-4xl mr-4">{testimonial.image}</div>
                <div>
                  <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  <p className="text-pink-500 text-sm font-medium">{testimonial.company}</p>
                </div>
              </div>
              <blockquote className="text-gray-700 italic">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
            </div>
          ))}
        </div>

        {/* Video Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Historias de Éxito en Video
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🎥</div>
                <p className="text-gray-600">Video: &ldquo;De la Idea al Mercado&rdquo;</p>
                <p className="text-sm text-gray-500">Duración: 5:30 min</p>
              </div>
            </div>
            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🎥</div>
                <p className="text-gray-600">Video: &ldquo;Casos de Éxito UPC&rdquo;</p>
                <p className="text-sm text-gray-500">Duración: 8:15 min</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-fuchsia-500 to-red-500 rounded-lg shadow-lg p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">¿Quieres ser el próximo caso de éxito?</h2>
          <p className="text-xl mb-6 opacity-90">
            Únete a nuestra comunidad de emprendedores y comienza tu journey hacia el éxito.
          </p>
          <Link 
            href="/convocatoria"
            className="inline-block bg-white text-fuchsia-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors border-2 border-white hover:border-gray-200"
          >
            Ver Convocatorias
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
