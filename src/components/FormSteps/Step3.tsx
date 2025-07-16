import React from 'react';
import type { Step3Data } from '@/lib/validations';

interface Step3Props {
  data: Step3Data;
  errors: Record<string, string>;
  onChange: (field: string, value: string) => void;
}

export default function Step3({ data, errors, onChange }: Step3Props) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Ventas y Operaciones</h2>
      <p className="text-gray-600 mb-6">
        Información comercial y tecnológica de tu startup.
      </p>

      <div className="space-y-6">
        {/* Tiene ventas */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            19. ¿Tu startup ha tenido ventas? *
          </label>
          <p className="text-sm text-gray-500 mb-2">
            Este reto será clave para guiar tu participación en el programa y será evaluado junto al equipo de StartUPC como parte de tu North Star Metric.
          </p>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                value="SI"
                checked={data.tieneVentas === 'SI'}
                onChange={(e) => onChange('tieneVentas', e.target.value)}
                className="mr-2 text-fuchsia-500 focus:ring-fuchsia-500"
              />
              Sí
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="NO"
                checked={data.tieneVentas === 'NO'}
                onChange={(e) => onChange('tieneVentas', e.target.value)}
                className="mr-2 text-fuchsia-500 focus:ring-fuchsia-500"
              />
              No
            </label>
          </div>
          {errors.tieneVentas && (
            <p className="text-red-500 text-sm mt-1">{errors.tieneVentas}</p>
          )}
        </div>

        {/* Piloto o demo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            20. ¿Cuentas con un piloto o prueba en marcha? *
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                value="SI"
                checked={data.pilotoDemo === 'SI'}
                onChange={(e) => onChange('pilotoDemo', e.target.value)}
                className="mr-2 text-fuchsia-500 focus:ring-fuchsia-500"
              />
              Sí
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="NO"
                checked={data.pilotoDemo === 'NO'}
                onChange={(e) => onChange('pilotoDemo', e.target.value)}
                className="mr-2 text-fuchsia-500 focus:ring-fuchsia-500"
              />
              No
            </label>
          </div>
          {errors.pilotoDemo && (
            <p className="text-red-500 text-sm mt-1">{errors.pilotoDemo}</p>
          )}
        </div>

        {/* Ubicación de la solución */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            21. ¿Dónde se está aplicando actualmente tu solución? *
          </label>
          <p className="text-sm text-gray-500 mb-2">
            Menciona país(es), ciudad(es), sector, empresa(s), etc.
          </p>
          <textarea
            value={data.ubicacionSolucion || ''}
            onChange={(e) => onChange('ubicacionSolucion', e.target.value)}
            rows={3}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 ${
              errors.ubicacionSolucion ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Describe dónde se aplica tu solución..."
          />
          {errors.ubicacionSolucion && (
            <p className="text-red-500 text-sm mt-1">{errors.ubicacionSolucion}</p>
          )}
        </div>

        {/* Monto de ventas */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            22. Desde su fundación, ¿Cuál ha sido el monto total de ventas realizadas? *
          </label>
          <input
            type="text"
            value={data.montoVentas || ''}
            onChange={(e) => onChange('montoVentas', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 ${
              errors.montoVentas ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Ej: $50,000 USD"
          />
          {errors.montoVentas && (
            <p className="text-red-500 text-sm mt-1">{errors.montoVentas}</p>
          )}
        </div>

        {/* Tecnología */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            23. ¿Qué tecnología utilizas para el desarrollo de tu producto o servicio? *
          </label>
          <p className="text-sm text-gray-500 mb-2">
            Por ejemplo: plataforma web, app móvil, inteligencia artificial, herramientas no-code, servicios en la nube, etc.
          </p>
          <textarea
            value={data.tecnologia || ''}
            onChange={(e) => onChange('tecnologia', e.target.value)}
            rows={3}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 ${
              errors.tecnologia ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Describe las tecnologías que utilizas..."
          />
          {errors.tecnologia && (
            <p className="text-red-500 text-sm mt-1">{errors.tecnologia}</p>
          )}
        </div>

        {/* Área de desarrollo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            24. ¿Cuentas con un área de desarrollo tecnológico dentro de tu startup? *
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                value="SI"
                checked={data.areaDesarrollo === 'SI'}
                onChange={(e) => onChange('areaDesarrollo', e.target.value)}
                className="mr-2 text-fuchsia-500 focus:ring-fuchsia-500"
              />
              Sí
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="NO"
                checked={data.areaDesarrollo === 'NO'}
                onChange={(e) => onChange('areaDesarrollo', e.target.value)}
                className="mr-2 text-fuchsia-500 focus:ring-fuchsia-500"
              />
              No
            </label>
          </div>
          {errors.areaDesarrollo && (
            <p className="text-red-500 text-sm mt-1">{errors.areaDesarrollo}</p>
          )}
        </div>

        {/* Inversión externa */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            25. ¿Han recibido inversión externa? *
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                value="SI"
                checked={data.inversionExterna === 'SI'}
                onChange={(e) => onChange('inversionExterna', e.target.value)}
                className="mr-2 text-fuchsia-500 focus:ring-fuchsia-500"
              />
              Sí
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="NO"
                checked={data.inversionExterna === 'NO'}
                onChange={(e) => onChange('inversionExterna', e.target.value)}
                className="mr-2 text-fuchsia-500 focus:ring-fuchsia-500"
              />
              No
            </label>
          </div>
          {errors.inversionExterna && (
            <p className="text-red-500 text-sm mt-1">{errors.inversionExterna}</p>
          )}
        </div>
      </div>
    </div>
  );
}
