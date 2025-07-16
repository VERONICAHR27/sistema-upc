import React from 'react';
import type { Step1Data } from '@/lib/validations';

interface Step1Props {
  data: Step1Data;
  errors: Record<string, string>;
  onChange: (field: string, value: string | File | null) => void;
}

export default function Step1({ data, errors, onChange }: Step1Props) {
  const handleFiscalNumberChange = (value: string) => {
    const sanitizedValue = value.replace(/[^0-9.-]/g, '');
    onChange('numeroFiscal', sanitizedValue);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Datos Generales</h2>
      <p className="text-gray-600 mb-6">
        En esta sección queremos conocer aspectos generales de tu emprendimiento.
      </p>

      <div className="space-y-6">
        {/* Nombre comercial */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            1. Nombre comercial de la empresa *
          </label>
          <p className="text-sm text-gray-500 mb-2">
            Nombre con el que opera públicamente tu empresa
          </p>
          <input
            type="text"
            value={data.nombreComercial || ''}
            onChange={(e) => onChange('nombreComercial', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 ${
              errors.nombreComercial ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Ingresa el nombre comercial"
          />
          {errors.nombreComercial && (
            <p className="text-red-500 text-sm mt-1">{errors.nombreComercial}</p>
          )}
        </div>

        {/* Razón social */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            2. Razón social (nombre legal registrado) *
          </label>
          <p className="text-sm text-gray-500 mb-2">
            Nombre legal completo según el registro oficial de tu país
          </p>
          <input
            type="text"
            value={data.razonSocial || ''}
            onChange={(e) => onChange('razonSocial', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 ${
              errors.razonSocial ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Ingresa la razón social"
          />
          {errors.razonSocial && (
            <p className="text-red-500 text-sm mt-1">{errors.razonSocial}</p>
          )}
        </div>

        {/* Número fiscal */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            3. Número de identificación fiscal de la empresa *
          </label>
          <p className="text-sm text-gray-500 mb-2">
            Indica el número oficial con el que tu empresa tributa en su país de origen (RUC, RUT, CUIT u otro). Solo números, puntos y guiones.
          </p>
          <input
            type="text"
            value={data.numeroFiscal || ''}
            onChange={(e) => handleFiscalNumberChange(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 ${
              errors.numeroFiscal ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Ej: 12345678-9 o 12.345.678-0"
            pattern="[0-9.-]*"
          />
          {errors.numeroFiscal && (
            <p className="text-red-500 text-sm mt-1">{errors.numeroFiscal}</p>
          )}
        </div>

        {/* Sitio web */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            4. Sitio web oficial o enlace a un perfil activo en redes sociales *
          </label>
          <p className="text-sm text-gray-500 mb-2">
            Ingresa una dirección web válida. Por ejemplo: LinkedIn, Instagram, Facebook o tu sitio web oficial
          </p>
          <input
            type="url"
            value={data.sitioWeb || ''}
            onChange={(e) => onChange('sitioWeb', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 ${
              errors.sitioWeb ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="https://www.tuempresa.com o https://linkedin.com/company/tuempresa"
          />
          {errors.sitioWeb && (
            <p className="text-red-500 text-sm mt-1">{errors.sitioWeb}</p>
          )}
        </div>

        {/* Logotipo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            5. Sube el logotipo de tu empresa *
          </label>
          <p className="text-sm text-gray-500 mb-2">
            Formato .PNG preferido. Asegúrate de que sea de buena calidad y fondo transparente si es posible
          </p>
          <input
            type="file"
            accept=".png,.jpg,.jpeg"
            onChange={(e) => onChange('logotipo', e.target.files?.[0] || null)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 ${
              errors.logotipo ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.logotipo && (
            <p className="text-red-500 text-sm mt-1">{errors.logotipo}</p>
          )}
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            6. Breve descripción de tu empresa *
          </label>
          <p className="text-sm text-gray-500 mb-2">
            ¿Qué hace tu empresa? ¿Qué problema resuelve? (Máximo 500 caracteres)
          </p>
          <textarea
            value={data.descripcion || ''}
            onChange={(e) => onChange('descripcion', e.target.value)}
            rows={4}
            maxLength={500}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 ${
              errors.descripcion ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Describe brevemente tu empresa..."
          />
          <div className="flex justify-between items-center mt-1">
            {errors.descripcion && (
              <p className="text-red-500 text-sm">{errors.descripcion}</p>
            )}
            <p className="text-sm text-gray-400 ml-auto">
              {(data.descripcion || '').length}/500 caracteres
            </p>
          </div>
        </div>

        {/* Industria */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            7. ¿A qué industria o sector pertenece tu empresa? *
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                value="Edtech"
                checked={data.industria === 'Edtech'}
                onChange={(e) => onChange('industria', e.target.value)}
                className="mr-2 text-fuchsia-500 focus:ring-fuchsia-500"
              />
              A. Edtech
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="Other"
                checked={data.industria === 'Other'}
                onChange={(e) => onChange('industria', e.target.value)}
                className="mr-2 text-fuchsia-500 focus:ring-fuchsia-500"
              />
              B. Other
            </label>
          </div>
          {errors.industria && (
            <p className="text-red-500 text-sm mt-1">{errors.industria}</p>
          )}
          
          {/* Conditional input for "Other" industry */}
          {data.industria === 'Other' && (
            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Especifica la industria *
              </label>
              <input
                type="text"
                value={data.industriaOther || ''}
                onChange={(e) => onChange('industriaOther', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 ${
                  errors.industriaOther ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ingresa la industria específica"
              />
              {errors.industriaOther && (
                <p className="text-red-500 text-sm mt-1">{errors.industriaOther}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

