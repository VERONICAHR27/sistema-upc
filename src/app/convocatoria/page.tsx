'use client';

import { useConvocatorias } from '@/contexts/ConvocatoriaContext';
import Navbar from '@/components/Navbar';

export default function Convocatoria() {
  const { getActiva } = useConvocatorias();
  const convocatoria = getActiva();

  if (!convocatoria) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">¡Pronto abriremos nuevas convocatorias!</h1>
          <p className="text-lg text-gray-600 mb-6 text-center">
            Te invitamos a estar atento a nuestras redes sociales para conocer las próximas oportunidades.<br />
            Síguenos en <a href="https://www.facebook.com/startupc" target="_blank" rel="noopener noreferrer" className="text-pink-600 font-semibold underline">Facebook</a> y <a href="https://www.instagram.com/startupc" target="_blank" rel="noopener noreferrer" className="text-pink-600 font-semibold underline">Instagram</a>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <header className="bg-gradient-to-r from-pink-500 to-red-500 py-12 mb-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-extrabold text-white mb-4">{convocatoria.title}</h1>
          <p className="text-xl text-white mb-2">
            Fecha límite:{' '}
            <span className="font-semibold">{convocatoria.deadline}</span>
          </p>
          <p className="text-lg text-white mb-4">
            Tipo de convocatoria: <span className="font-semibold">{convocatoria.type}</span>
          </p>
          <a
            href="#postula"
            className="inline-block bg-white text-pink-600 font-bold px-8 py-3 rounded-lg shadow hover:bg-pink-50 transition"
          >
            ¡Postula ahora!
          </a>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Requisitos para participar</h2>
        <ul className="list-disc pl-6 text-gray-700 mb-8 space-y-2">
          <li>Ser estudiante, egresado o docente de la UPC.</li>
          <li>Tener una idea o proyecto innovador con potencial de impacto.</li>
          <li>Completar el formulario de postulación antes de la fecha límite.</li>
          <li>Contar con un equipo de trabajo (mínimo 2 personas).</li>
          <li>Disponibilidad para participar en las actividades del programa.</li>
        </ul>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Cronograma de la Convocatoria</h2>
        <div className="space-y-6 mb-12">
          {convocatoria.cronograma?.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className={`w-4 h-4 rounded-full mr-4 ${item.status === 'active' ? 'bg-pink-500' : 'bg-gray-300'}`}></div>
              <div>
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
        {/* CTA sección */}
        <section id="postula" className="bg-pink-50 rounded-lg p-8 text-center shadow">
          <h2 className="text-2xl font-bold text-pink-600 mb-4">¿Listo para transformar tu idea?</h2>
          <p className="text-lg text-gray-700 mb-6">
            Completa el formulario y da el primer paso para ser parte del ecosistema StartUPC.
          </p>
          <a
            href="https://forms.gle/tu-formulario"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold px-8 py-3 rounded-lg shadow hover:from-pink-600 hover:to-red-600 transition"
          >
            Ir al formulario de postulación
          </a>
        </section>
      </div>
    </div>
  );
}
