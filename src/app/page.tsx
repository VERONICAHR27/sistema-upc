import Navbar from '@/components/Navbar';
import ImageCarousel from '@/components/ImageCarousel';
import ProgramCards from '@/components/ProgramCards';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navbar />
      
      {/* Hero Section with Carousel */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ImageCarousel />
        </div>
      </section>

      {/* Program Cards Section */}
      <ProgramCards />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">UPC Innovación</h3>
              <p className="text-gray-300">
                Impulsando el emprendimiento y la innovación en la comunidad universitaria.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="/convocatoria" className="hover:text-white transition-colors">Convocatoria</a></li>
                <li><a href="/testimonios" className="hover:text-white transition-colors">Testimonios</a></li>
                <li><a href="/conferencias" className="hover:text-white transition-colors">Conferencias</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contacto</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Email: innovacion@upc.edu.pe</li>
                <li>Teléfono: (01) 123-4567</li>
                <li>Dirección: Lima, Perú</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2025 Universidad Peruana de Ciencias Aplicadas. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
