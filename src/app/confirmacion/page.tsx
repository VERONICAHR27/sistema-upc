'use client';

import { useEffect, useState } from 'react';
import { CheckCircleIcon, HomeIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function ConfirmacionPage() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Animación para mostrar el contenido gradualmente
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-50 via-white to-red-50">
      <div className="container mx-auto px-4 py-16">
        <div className={`max-w-2xl mx-auto text-center transition-all duration-1000 ${
          showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          
          {/* Icono de éxito */}
          <div className="mb-8">
            <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircleIcon className="w-16 h-16 text-green-600" />
            </div>
          </div>

          {/* Encabezado principal */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            ¡Formulario Enviado 
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-red-600">
              Exitosamente!
            </span>
          </h1>

          {/* Mensaje principal */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Gracias por tu postulación
            </h2>
            
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              <strong>¡Hemos recibido tu postulación exitosamente!</strong><br />
              <br />
              <span className="text-fuchsia-700 font-semibold">
                &ldquo;Gracias por tu interés en formar parte de nuestra aceleradora. Hemos recibido tu postulación 
                y comenzaremos el proceso de evaluación. Te contactaremos pronto con más información sobre 
                los siguientes pasos.&rdquo;
              </span>
              <br /><br />
              Nuestro equipo revisará tu información cuidadosamente y te mantendremos informado del progreso.
            </p>

          </div>

          {/* Información de contacto */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h3 className="font-semibold text-gray-800 mb-3">¿Tienes preguntas?</h3>
            <p className="text-gray-600 mb-3">
              Si necesitas actualizar alguna información o tienes consultas sobre tu postulación:
            </p>
            <div className="text-fuchsia-600 font-medium">
              📧 contacto@upc.edu.pe<br />
              📱 +51 1 234-5678
            </div>
          </div>

          {/* Botones de navegación */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-fuchsia-600 to-red-600 text-white font-medium rounded-lg hover:from-fuchsia-700 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <HomeIcon className="w-5 h-5 mr-2" />
              Volver al Inicio
            </Link>
            
            <Link
              href="/convocatoria"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <DocumentTextIcon className="w-5 h-5 mr-2" />
              Ver Convocatoria
            </Link>
          </div>

          {/* Mensaje adicional */}
          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm">
              ID de confirmación: <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                {new Date().getTime().toString(36).toUpperCase()}
              </span>
            </p>
            <p className="text-gray-400 text-xs mt-2">
              Guarda este ID para futuras referencias
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
