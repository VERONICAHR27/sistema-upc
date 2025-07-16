import React from 'react';
import type { Step2Data } from '@/lib/validations';

interface Step2Props {
  data: Step2Data;
  errors: Record<string, string>;
  onChange: (field: string, value: string | string[]) => void;
}

export default function Step2({ data, errors, onChange }: Step2Props) {
  const handleCheckboxChange = (value: string) => {
    const currentNeeds = data.necesidades || [];
    if (currentNeeds.includes(value)) {
      onChange('necesidades', currentNeeds.filter(item => item !== value));
    } else if (currentNeeds.length < 4) {
      onChange('necesidades', [...currentNeeds, value]);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Información sobre la Startup</h2>
      <p className="text-gray-600 mb-6">
        Detalles específicos sobre tu startup y su desarrollo.
      </p>

      <div className="space-y-6">
        {/* Fecha de fundación */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            8. ¿Cuándo fue fundada la startup? *
          </label>
          <p className="text-sm text-gray-500 mb-2">
            Indica mes y año (ej: Enero 2023) o fecha completa (ej: 01/01/2023)
          </p>
          <input
            type="text"
            value={data.fechaFundacion || ''}
            onChange={(e) => onChange('fechaFundacion', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 ${
              errors.fechaFundacion ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enero 2023 o 01/01/2023"
            maxLength={10}
          />
          {errors.fechaFundacion && (
            <p className="text-red-500 text-sm mt-1">{errors.fechaFundacion}</p>
          )}
        </div>

        {/* Problema u oportunidad */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            9. ¿Qué problema u oportunidad aborda tu startup en el mercado? *
          </label>
          <p className="text-sm text-gray-500 mb-2">
            Describe brevemente el contexto o necesidad que identificaron
          </p>
          <textarea
            value={data.problemaOportunidad || ''}
            onChange={(e) => onChange('problemaOportunidad', e.target.value)}
            rows={4}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 ${
              errors.problemaOportunidad ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Describe el problema u oportunidad..."
          />
          {errors.problemaOportunidad && (
            <p className="text-red-500 text-sm mt-1">{errors.problemaOportunidad}</p>
          )}
        </div>

        {/* Solución */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            10. ¿Cuál es la solución que ofrecen y qué la hace especial o innovadora? *
          </label>
          <p className="text-sm text-gray-500 mb-2">
            Explica tu propuesta de valor y qué la diferencia de otras soluciones
          </p>
          <textarea
            value={data.solucion || ''}
            onChange={(e) => onChange('solucion', e.target.value)}
            rows={4}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 ${
              errors.solucion ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Describe tu solución..."
          />
          {errors.solucion && (
            <p className="text-red-500 text-sm mt-1">{errors.solucion}</p>
          )}
        </div>

        {/* Modelo de negocio */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            11. ¿Cuál es su modelo de negocio? *
          </label>
          <p className="text-sm text-gray-500 mb-2">
            ¿Cómo genera ingresos la empresa? ¿Cuál es su estrategia comercial?
          </p>
          <textarea
            value={data.modeloNegocio || ''}
            onChange={(e) => onChange('modeloNegocio', e.target.value)}
            rows={4}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 ${
              errors.modeloNegocio ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Describe tu modelo de negocio..."
          />
          {errors.modeloNegocio && (
            <p className="text-red-500 text-sm mt-1">{errors.modeloNegocio}</p>
          )}
        </div>

        {/* Ventaja competitiva */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            12. ¿Cuál es su ventaja competitiva? *
          </label>
          <p className="text-sm text-gray-500 mb-2">
            ¿Qué hace que tu startup sea difícil de copiar o reemplazar?
          </p>
          <textarea
            value={data.ventajaCompetitiva || ''}
            onChange={(e) => onChange('ventajaCompetitiva', e.target.value)}
            rows={4}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 ${
              errors.ventajaCompetitiva ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Describe tu ventaja competitiva..."
          />
          {errors.ventajaCompetitiva && (
            <p className="text-red-500 text-sm mt-1">{errors.ventajaCompetitiva}</p>
          )}
        </div>

        {/* Necesidades */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            13. ¿Cuáles son las principales necesidades o áreas de mejora que tiene actualmente tu startup? *
          </label>
          <p className="text-sm text-gray-500 mb-2">
            Puedes seleccionar hasta 4 opciones
          </p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { value: 'VENTAS_B2B', label: 'A. VENTAS B2B' },
              { value: 'VENTAS_B2C', label: 'B. VENTAS B2C' },
              { value: 'BUSQUEDA_TALENTO', label: 'C. BÚSQUEDA DE TALENTO' },
              { value: 'LEVANTAR_CAPITAL', label: 'D. LEVANTAR CAPITAL' },
              { value: 'POSICIONAMIENTO', label: 'E. POSICIONAMIENTO' },
              { value: 'MARKETING_DIGITAL', label: 'F. MARKETING DIGITAL' },
              { value: 'UX_UI', label: 'G. UX/UI' },
              { value: 'OTHER', label: 'H. OTHER' }
            ].map((option) => (
              <label key={option.value} className="flex items-center">
                <input
                  type="checkbox"
                  checked={(data.necesidades || []).includes(option.value)}
                  onChange={() => handleCheckboxChange(option.value)}
                  disabled={!(data.necesidades || []).includes(option.value) && (data.necesidades || []).length >= 4}
                  className="mr-2 text-fuchsia-500 focus:ring-fuchsia-500"
                />
                {option.label}
              </label>
            ))}
          </div>
          <p className="text-sm text-gray-400 mt-1">
            Seleccionadas: {(data.necesidades || []).length}/4
          </p>
          {errors.necesidades && (
            <p className="text-red-500 text-sm mt-1">{errors.necesidades}</p>
          )}
          
          {/* Conditional input for "Other" needs */}
          {(data.necesidades || []).includes('OTHER') && (
            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Especifica la necesidad *
              </label>
              <input
                type="text"
                value={data.necesidadesOther || ''}
                onChange={(e) => onChange('necesidadesOther', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 ${
                  errors.necesidadesOther ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Describe la necesidad específica"
              />
              {errors.necesidadesOther && (
                <p className="text-red-500 text-sm mt-1">{errors.necesidadesOther}</p>
              )}
            </div>
          )}
        </div>

        {/* Programa de aceleración */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            14. ¿Han sido parte de algún programa de aceleración? *
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                value="SI"
                checked={data.programaAceleracion === 'SI'}
                onChange={(e) => onChange('programaAceleracion', e.target.value)}
                className="mr-2 text-fuchsia-500 focus:ring-fuchsia-500"
              />
              Sí
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="NO"
                checked={data.programaAceleracion === 'NO'}
                onChange={(e) => onChange('programaAceleracion', e.target.value)}
                className="mr-2 text-fuchsia-500 focus:ring-fuchsia-500"
              />
              No
            </label>
          </div>
          {errors.programaAceleracion && (
            <p className="text-red-500 text-sm mt-1">{errors.programaAceleracion}</p>
          )}
        </div>

        {/* Preguntas condicionales */}
        {data.programaAceleracion === 'SI' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                15. Si la respuesta fue sí, ¿en qué programa(s) participaron? *
              </label>
              <p className="text-sm text-gray-500 mb-2">
                Nombre del programa, país y año
              </p>
              <input
                type="text"
                value={data.nombrePrograma || ''}
                onChange={(e) => onChange('nombrePrograma', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 ${
                  errors.nombrePrograma ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ejemplo: Techstars Berlin 2023"
              />
              {errors.nombrePrograma && (
                <p className="text-red-500 text-sm mt-1">{errors.nombrePrograma}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                16. ¿Qué aprendizajes o beneficios obtuvieron de esa experiencia? *
              </label>
              <p className="text-sm text-gray-500 mb-2">
                Por ejemplo: mentoría, inversión, validación del modelo de negocio, redes de contacto, etc.
              </p>
              <textarea
                value={data.aprendizajes || ''}
                onChange={(e) => onChange('aprendizajes', e.target.value)}
                rows={4}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 ${
                  errors.aprendizajes ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Describe los aprendizajes obtenidos..."
              />
              {errors.aprendizajes && (
                <p className="text-red-500 text-sm mt-1">{errors.aprendizajes}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                17. ¿Cómo aplicaron esos aprendizajes para mejorar su startup? *
              </label>
              <p className="text-sm text-gray-500 mb-2">
                Describe brevemente los cambios, mejoras o resultados que obtuvieron
              </p>
              <textarea
                value={data.aplicacionAprendizajes || ''}
                onChange={(e) => onChange('aplicacionAprendizajes', e.target.value)}
                rows={4}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 ${
                  errors.aplicacionAprendizajes ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Describe cómo aplicaron los aprendizajes..."
              />
              {errors.aplicacionAprendizajes && (
                <p className="text-red-500 text-sm mt-1">{errors.aplicacionAprendizajes}</p>
              )}
            </div>
          </>
        )}

        {/* Video presentación */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            18. Sube un video de presentación en formato &quot;elevator pitch&quot; *
          </label>
          <p className="text-sm text-gray-500 mb-2">
            El objetivo es conocer de forma clara y concisa tu propuesta de valor, el problema que resuelves, 
            a quién va dirigida tu solución, tu mercado, tu equipo y qué te diferencia de la competencia. 
            Duración máxima de 3 minutos. Ingresa una dirección web válida del video.
          </p>
          <input
            type="url"
            value={data.videoPresentacion || ''}
            onChange={(e) => onChange('videoPresentacion', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 ${
              errors.videoPresentacion ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="https://youtube.com/watch?v=... o https://drive.google.com/..."
          />
          {errors.videoPresentacion && (
            <p className="text-red-500 text-sm mt-1">{errors.videoPresentacion}</p>
          )}
        </div>
      </div>
    </div>
  );
}
