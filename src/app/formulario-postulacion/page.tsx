'use client';

import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, CheckIcon } from '@heroicons/react/24/outline';

interface TeamMember {
  nombres: string;
  apellidos: string;
  rol: string;
  tiempoCompleto: string;
  fechaNacimiento: string;
  lugarNacimiento: string;
  direccion: string;
  tipoDocumento: string;
  numeroDocumento: string;
  telefono: string;
  email: string;
  linkedin: string;
}

interface FormData {
  // Datos generales
  nombreComercial: string;
  razonSocial: string;
  numeroFiscal: string;
  sitioWeb: string;
  logotipo: File | null;
  descripcion: string;
  industria: string;
  
  // Información sobre la Startup
  fechaFundacion: string;
  problemaOportunidad: string;
  solucion: string;
  modeloNegocio: string;
  ventajaCompetitiva: string;
  necesidades: string[];
  programaAceleracion: string;
  nombrePrograma: string;
  aprendizajes: string;
  aplicacionAprendizajes: string;
  videoPresentacion: string;

  // Ventas y Operaciones
  tieneVentas: string;
  pilotoDemo: string;
  ubicacionSolucion: string;
  montoVentas: string;
  tecnologia: string;
  areaDesarrollo: string;
  inversionExterna: string;

  // Información del equipo
  miembroEquipo1: TeamMember;
  comoSeEntero: string;
  aceptaPrivacidad: string;
}

export default function FormularioPostulacion() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    nombreComercial: '',
    razonSocial: '',
    numeroFiscal: '',
    sitioWeb: '',
    logotipo: null,
    descripcion: '',
    industria: '',
    fechaFundacion: '',
    problemaOportunidad: '',
    solucion: '',
    modeloNegocio: '',
    ventajaCompetitiva: '',
    necesidades: [],
    programaAceleracion: '',
    nombrePrograma: '',
    aprendizajes: '',
    aplicacionAprendizajes: '',
    videoPresentacion: '',
    tieneVentas: '',
    pilotoDemo: '',
    ubicacionSolucion: '',
    montoVentas: '',
    tecnologia: '',
    areaDesarrollo: '',
    inversionExterna: '',
    miembroEquipo1: {
      nombres: '',
      apellidos: '',
      rol: '',
      tiempoCompleto: '',
      fechaNacimiento: '',
      lugarNacimiento: '',
      direccion: '',
      tipoDocumento: '',
      numeroDocumento: '',
      telefono: '',
      email: '',
      linkedin: ''
    },
    comoSeEntero: '',
    aceptaPrivacidad: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const steps = [
    { id: 1, name: 'Datos Generales', description: 'Aspectos generales de tu emprendimiento' },
    { id: 2, name: 'Información sobre la Startup', description: 'Detalles específicos de tu startup' },
    { id: 3, name: 'Ventas y Operaciones', description: 'Información comercial y tecnológica' },
    { id: 4, name: 'Información del Equipo', description: 'Datos del equipo fundador' }
  ];

  const handleInputChange = (field: keyof FormData, value: string | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleTeamMemberChange = (field: keyof TeamMember, value: string) => {
    setFormData(prev => ({
      ...prev,
      miembroEquipo1: {
        ...prev.miembroEquipo1,
        [field]: value
      }
    }));
    if (errors[`miembroEquipo1.${field}`]) {
      setErrors(prev => ({ ...prev, [`miembroEquipo1.${field}`]: '' }));
    }
  };

  const handleCheckboxChange = (value: string) => {
    setFormData(prev => {
      const currentNeeds = prev.necesidades;
      if (currentNeeds.includes(value)) {
        return { ...prev, necesidades: currentNeeds.filter(item => item !== value) };
      } else if (currentNeeds.length < 4) {
        return { ...prev, necesidades: [...currentNeeds, value] };
      }
      return prev;
    });
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.nombreComercial.trim()) newErrors.nombreComercial = 'Este campo es obligatorio';
    if (!formData.razonSocial.trim()) newErrors.razonSocial = 'Este campo es obligatorio';
    if (!formData.numeroFiscal.trim()) newErrors.numeroFiscal = 'Este campo es obligatorio';
    if (!formData.sitioWeb.trim()) newErrors.sitioWeb = 'Este campo es obligatorio';
    if (!formData.logotipo) newErrors.logotipo = 'Debes subir el logotipo de tu empresa';
    if (!formData.descripcion.trim()) newErrors.descripcion = 'Este campo es obligatorio';
    if (formData.descripcion.length > 500) newErrors.descripcion = 'Máximo 500 caracteres';
    if (!formData.industria) newErrors.industria = 'Debes seleccionar una industria';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fechaFundacion.trim()) newErrors.fechaFundacion = 'Este campo es obligatorio';
    if (!formData.problemaOportunidad.trim()) newErrors.problemaOportunidad = 'Este campo es obligatorio';
    if (!formData.solucion.trim()) newErrors.solucion = 'Este campo es obligatorio';
    if (!formData.modeloNegocio.trim()) newErrors.modeloNegocio = 'Este campo es obligatorio';
    if (!formData.ventajaCompetitiva.trim()) newErrors.ventajaCompetitiva = 'Este campo es obligatorio';
    if (formData.necesidades.length === 0) newErrors.necesidades = 'Selecciona al menos una necesidad';
    if (!formData.programaAceleracion) newErrors.programaAceleracion = 'Este campo es obligatorio';
    if (formData.programaAceleracion === 'YES' && !formData.nombrePrograma.trim()) {
      newErrors.nombrePrograma = 'Este campo es obligatorio cuando has participado en un programa';
    }
    if (!formData.videoPresentacion.trim()) newErrors.videoPresentacion = 'Este campo es obligatorio';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.tieneVentas) newErrors.tieneVentas = 'Este campo es obligatorio';
    if (!formData.pilotoDemo.trim()) newErrors.pilotoDemo = 'Este campo es obligatorio';
    if (!formData.ubicacionSolucion.trim()) newErrors.ubicacionSolucion = 'Este campo es obligatorio';
    if (!formData.montoVentas.trim()) newErrors.montoVentas = 'Este campo es obligatorio';
    if (!formData.tecnologia.trim()) newErrors.tecnologia = 'Este campo es obligatorio';
    if (!formData.areaDesarrollo) newErrors.areaDesarrollo = 'Este campo es obligatorio';
    if (!formData.inversionExterna.trim()) newErrors.inversionExterna = 'Este campo es obligatorio';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep4 = () => {
    const newErrors: Record<string, string> = {};
    const member = formData.miembroEquipo1;
    
    if (!member.nombres.trim()) newErrors['miembroEquipo1.nombres'] = 'Este campo es obligatorio';
    if (!member.apellidos.trim()) newErrors['miembroEquipo1.apellidos'] = 'Este campo es obligatorio';
    if (!member.rol.trim()) newErrors['miembroEquipo1.rol'] = 'Este campo es obligatorio';
    if (!member.tiempoCompleto) newErrors['miembroEquipo1.tiempoCompleto'] = 'Este campo es obligatorio';
    if (!member.fechaNacimiento.trim()) newErrors['miembroEquipo1.fechaNacimiento'] = 'Este campo es obligatorio';
    if (!member.lugarNacimiento.trim()) newErrors['miembroEquipo1.lugarNacimiento'] = 'Este campo es obligatorio';
    if (!member.direccion.trim()) newErrors['miembroEquipo1.direccion'] = 'Este campo es obligatorio';
    if (!member.tipoDocumento) newErrors['miembroEquipo1.tipoDocumento'] = 'Este campo es obligatorio';
    if (!member.numeroDocumento.trim()) newErrors['miembroEquipo1.numeroDocumento'] = 'Este campo es obligatorio';
    if (!member.telefono.trim()) newErrors['miembroEquipo1.telefono'] = 'Este campo es obligatorio';
    if (!member.email.trim()) newErrors['miembroEquipo1.email'] = 'Este campo es obligatorio';
    if (!member.linkedin.trim()) newErrors['miembroEquipo1.linkedin'] = 'Este campo es obligatorio';
    
    if (!formData.comoSeEntero) newErrors.comoSeEntero = 'Este campo es obligatorio';
    if (!formData.aceptaPrivacidad) newErrors.aceptaPrivacidad = 'Debes aceptar el Aviso de Privacidad';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    let isValid = false;
    
    switch (currentStep) {
      case 1:
        isValid = validateStep1();
        break;
      case 2:
        isValid = validateStep2();
        break;
      case 3:
        isValid = validateStep3();
        break;
      case 4:
        isValid = validateStep4();
        if (isValid) {
          console.log('Formulario completado:', formData);
          alert('Formulario enviado exitosamente!');
          return;
        }
        break;
    }
    
    if (isValid && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Formulario de Postulación
          </h1>
          <p className="text-gray-600">
            Completa tu aplicación para unirte a nuestro programa de aceleración
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`
                    flex items-center justify-center w-10 h-10 rounded-full border-2 
                    ${currentStep >= step.id 
                      ? 'bg-gradient-to-r from-fuchsia-500 to-red-500 border-fuchsia-500 text-white' 
                      : 'border-gray-300 text-gray-500'
                    }
                  `}>
                    {currentStep > step.id ? (
                      <CheckIcon className="w-6 h-6" />
                    ) : (
                      <span className="text-sm font-medium">{step.id}</span>
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <p className={`text-sm font-medium ${
                      currentStep >= step.id ? 'text-fuchsia-600' : 'text-gray-500'
                    }`}>
                      {step.name}
                    </p>
                    <p className="text-xs text-gray-400 max-w-32">
                      {step.description}
                    </p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-24 h-1 mx-4 ${
                    currentStep > step.id ? 'bg-fuchsia-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {currentStep === 1 && (
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
                    value={formData.nombreComercial}
                    onChange={(e) => handleInputChange('nombreComercial', e.target.value)}
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
                    value={formData.razonSocial}
                    onChange={(e) => handleInputChange('razonSocial', e.target.value)}
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
                    Indica el número oficial con el que tu empresa tributa en su país de origen (RUC, RUT, CUIT u otro)
                  </p>
                  <input
                    type="text"
                    value={formData.numeroFiscal}
                    onChange={(e) => handleInputChange('numeroFiscal', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 ${
                      errors.numeroFiscal ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Ingresa el número de identificación fiscal"
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
                    Por ejemplo: LinkedIn, Instagram, Facebook o similar
                  </p>
                  <input
                    type="url"
                    value={formData.sitioWeb}
                    onChange={(e) => handleInputChange('sitioWeb', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 ${
                      errors.sitioWeb ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="https://www.tuempresa.com"
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
                    onChange={(e) => handleInputChange('logotipo', e.target.files?.[0] || null)}
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
                    value={formData.descripcion}
                    onChange={(e) => handleInputChange('descripcion', e.target.value)}
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
                      {formData.descripcion.length}/500 caracteres
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
                        checked={formData.industria === 'Edtech'}
                        onChange={(e) => handleInputChange('industria', e.target.value)}
                        className="mr-2 text-fuchsia-500 focus:ring-fuchsia-500"
                      />
                      A. Edtech
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="Other"
                        checked={formData.industria === 'Other'}
                        onChange={(e) => handleInputChange('industria', e.target.value)}
                        className="mr-2 text-fuchsia-500 focus:ring-fuchsia-500"
                      />
                      B. Other
                    </label>
                  </div>
                  {errors.industria && (
                    <p className="text-red-500 text-sm mt-1">{errors.industria}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Información sobre la Startup</h2>
              <p className="text-gray-600 mb-6">
                Detalles específicos sobre tu startup y su desarrollo.
              </p>

              <div className="space-y-6">
                {/* Fecha de fundación */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    8. ¿Cuándo fue fundada la startup? *
                  </label>
                  <p className="text-sm text-gray-500 mb-2">
                    Indica mes y año. Por ejemplo: Enero 2023
                  </p>
                  <input
                    type="text"
                    value={formData.fechaFundacion}
                    onChange={(e) => handleInputChange('fechaFundacion', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 ${
                      errors.fechaFundacion ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enero 2023"
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
                    value={formData.problemaOportunidad}
                    onChange={(e) => handleInputChange('problemaOportunidad', e.target.value)}
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
                    value={formData.solucion}
                    onChange={(e) => handleInputChange('solucion', e.target.value)}
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
                    value={formData.modeloNegocio}
                    onChange={(e) => handleInputChange('modeloNegocio', e.target.value)}
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
                    value={formData.ventajaCompetitiva}
                    onChange={(e) => handleInputChange('ventajaCompetitiva', e.target.value)}
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
                          checked={formData.necesidades.includes(option.value)}
                          onChange={() => handleCheckboxChange(option.value)}
                          disabled={!formData.necesidades.includes(option.value) && formData.necesidades.length >= 4}
                          className="mr-2 text-fuchsia-500 focus:ring-fuchsia-500"
                        />
                        {option.label}
                      </label>
                    ))}
                  </div>
                  <p className="text-sm text-gray-400 mt-1">
                    Seleccionadas: {formData.necesidades.length}/4
                  </p>
                  {errors.necesidades && (
                    <p className="text-red-500 text-sm mt-1">{errors.necesidades}</p>
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
                        value="YES"
                        checked={formData.programaAceleracion === 'YES'}
                        onChange={(e) => handleInputChange('programaAceleracion', e.target.value)}
                        className="mr-2 text-fuchsia-500 focus:ring-fuchsia-500"
                      />
                      Sí
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="NO"
                        checked={formData.programaAceleracion === 'NO'}
                        onChange={(e) => handleInputChange('programaAceleracion', e.target.value)}
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
                {formData.programaAceleracion === 'YES' && (
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
                        value={formData.nombrePrograma}
                        onChange={(e) => handleInputChange('nombrePrograma', e.target.value)}
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
                        16. ¿Qué aprendizajes o beneficios obtuvieron de esa experiencia?
                      </label>
                      <p className="text-sm text-gray-500 mb-2">
                        Por ejemplo: mentoría, inversión, validación del modelo de negocio, redes de contacto, etc.
                      </p>
                      <textarea
                        value={formData.aprendizajes}
                        onChange={(e) => handleInputChange('aprendizajes', e.target.value)}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                        placeholder="Describe los aprendizajes obtenidos..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        17. ¿Cómo aplicaron esos aprendizajes para mejorar su startup?
                      </label>
                      <p className="text-sm text-gray-500 mb-2">
                        Describe brevemente los cambios, mejoras o resultados que obtuvieron
                      </p>
                      <textarea
                        value={formData.aplicacionAprendizajes}
                        onChange={(e) => handleInputChange('aplicacionAprendizajes', e.target.value)}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                        placeholder="Describe cómo aplicaron los aprendizajes..."
                      />
                    </div>
                  </>
                )}

                {/* Video presentación */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    18. Sube un video de presentación en formato "elevator pitch" *
                  </label>
                  <p className="text-sm text-gray-500 mb-2">
                    El objetivo es conocer de forma clara y concisa tu propuesta de valor, el problema que resuelves, 
                    a quién va dirigida tu solución, tu mercado, tu equipo y qué te diferencia de la competencia. 
                    Duración máxima de 3 minutos. Puedes utilizar cualquier recurso audiovisual que consideres pertinente.
                  </p>
                  <input
                    type="url"
                    value={formData.videoPresentacion}
                    onChange={(e) => handleInputChange('videoPresentacion', e.target.value)}
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
          )}

          {currentStep === 3 && (
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
                        value="YES"
                        checked={formData.tieneVentas === 'YES'}
                        onChange={(e) => handleInputChange('tieneVentas', e.target.value)}
                        className="mr-2 text-fuchsia-500 focus:ring-fuchsia-500"
                      />
                      Sí
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="NO"
                        checked={formData.tieneVentas === 'NO'}
                        onChange={(e) => handleInputChange('tieneVentas', e.target.value)}
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
                  <p className="text-sm text-gray-500 mb-2">
                    Puedes incluir un enlace a un demo o prototipo de la solución
                  </p>
                  <textarea
                    value={formData.pilotoDemo}
                    onChange={(e) => handleInputChange('pilotoDemo', e.target.value)}
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 ${
                      errors.pilotoDemo ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Describe tu piloto o incluye enlace al demo..."
                  />
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
                    value={formData.ubicacionSolucion}
                    onChange={(e) => handleInputChange('ubicacionSolucion', e.target.value)}
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
                    value={formData.montoVentas}
                    onChange={(e) => handleInputChange('montoVentas', e.target.value)}
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
                    value={formData.tecnologia}
                    onChange={(e) => handleInputChange('tecnologia', e.target.value)}
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
                        value="YES"
                        checked={formData.areaDesarrollo === 'YES'}
                        onChange={(e) => handleInputChange('areaDesarrollo', e.target.value)}
                        className="mr-2 text-fuchsia-500 focus:ring-fuchsia-500"
                      />
                      Sí
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="NO"
                        checked={formData.areaDesarrollo === 'NO'}
                        onChange={(e) => handleInputChange('areaDesarrollo', e.target.value)}
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
                  <p className="text-sm text-gray-500 mb-2">
                    Si la respuesta es sí, indica el monto recibido (en USD) y la fuente de inversión (inversionistas ángeles, fondos, concursos, etc.)
                  </p>
                  <textarea
                    value={formData.inversionExterna}
                    onChange={(e) => handleInputChange('inversionExterna', e.target.value)}
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 ${
                      errors.inversionExterna ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Ej: No / Sí, $100,000 USD de inversionistas ángeles..."
                  />
                  {errors.inversionExterna && (
                    <p className="text-red-500 text-sm mt-1">{errors.inversionExterna}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Información del Equipo</h2>
              <p className="text-gray-600 mb-6">
                Por favor, ingresa la información completa (tal como figura en su documento) de cada miembro de tu equipo. Esta información es obligatoria para validar su inscripción.
              </p>

              <div className="space-y-6">
                {/* Información del Miembro 1 */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    26. Información Miembro del Equipo 1
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Por favor, ingresa la información completa (tal como figura en su documento). Esta información es obligatoria para validar su inscripción.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Nombres */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nombres completos *
                      </label>
                      <input
                        type="text"
                        value={formData.miembroEquipo1.nombres}
                        onChange={(e) => handleTeamMemberChange('nombres', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 ${
                          errors['miembroEquipo1.nombres'] ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Nombres completos"
                      />
                      {errors['miembroEquipo1.nombres'] && (
                        <p className="text-red-500 text-sm mt-1">{errors['miembroEquipo1.nombres']}</p>
                      )}
                    </div>

                    {/* Apellidos */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Apellidos completos *
                      </label>
                      <input
                        type="text"
                        value={formData.miembroEquipo1.apellidos}
                        onChange={(e) => handleTeamMemberChange('apellidos', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 ${
                          errors['miembroEquipo1.apellidos'] ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Apellidos completos"
                      />
                      {errors['miembroEquipo1.apellidos'] && (
                        <p className="text-red-500 text-sm mt-1">{errors['miembroEquipo1.apellidos']}</p>
                      )}
                    </div>

                    {/* Rol */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Rol en la Startup *
                      </label>
                      <input
                        type="text"
                        value={formData.miembroEquipo1.rol}
                        onChange={(e) => handleTeamMemberChange('rol', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 ${
                          errors['miembroEquipo1.rol'] ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Ej.: CEO, CTO, COO, CMO, Cofundador, etc."
                      />
                      {errors['miembroEquipo1.rol'] && (
                        <p className="text-red-500 text-sm mt-1">{errors['miembroEquipo1.rol']}</p>
                      )}
                    </div>

                    {/* Tiempo completo */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ¿Te dedicas tiempo completo a la startup? *
                      </label>
                      <div className="flex space-x-4 mt-2">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            value="YES"
                            checked={formData.miembroEquipo1.tiempoCompleto === 'YES'}
                            onChange={(e) => handleTeamMemberChange('tiempoCompleto', e.target.value)}
                            className="mr-2 text-fuchsia-500 focus:ring-fuchsia-500"
                          />
                          Sí
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            value="NO"
                            checked={formData.miembroEquipo1.tiempoCompleto === 'NO'}
                            onChange={(e) => handleTeamMemberChange('tiempoCompleto', e.target.value)}
                            className="mr-2 text-fuchsia-500 focus:ring-fuchsia-500"
                          />
                          No
                        </label>
                      </div>
                      {errors['miembroEquipo1.tiempoCompleto'] && (
                        <p className="text-red-500 text-sm mt-1">{errors['miembroEquipo1.tiempoCompleto']}</p>
                      )}
                    </div>

                    {/* Fecha de nacimiento */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Fecha de nacimiento *
                      </label>
                      <input
                        type="text"
                        value={formData.miembroEquipo1.fechaNacimiento}
                        onChange={(e) => handleTeamMemberChange('fechaNacimiento', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 ${
                          errors['miembroEquipo1.fechaNacimiento'] ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="DD/MM/AAAA"
                      />
                      {errors['miembroEquipo1.fechaNacimiento'] && (
                        <p className="text-red-500 text-sm mt-1">{errors['miembroEquipo1.fechaNacimiento']}</p>
                      )}
                    </div>

                    {/* Lugar de nacimiento */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Lugar de nacimiento *
                      </label>
                      <input
                        type="text"
                        value={formData.miembroEquipo1.lugarNacimiento}
                        onChange={(e) => handleTeamMemberChange('lugarNacimiento', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 ${
                          errors['miembroEquipo1.lugarNacimiento'] ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Ciudad y país"
                      />
                      {errors['miembroEquipo1.lugarNacimiento'] && (
                        <p className="text-red-500 text-sm mt-1">{errors['miembroEquipo1.lugarNacimiento']}</p>
                      )}
                    </div>

                    {/* Dirección de residencia */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Dirección de residencia actual *
                      </label>
                      <input
                        type="text"
                        value={formData.miembroEquipo1.direccion}
                        onChange={(e) => handleTeamMemberChange('direccion', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 ${
                          errors['miembroEquipo1.direccion'] ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Dirección completa de residencia"
                      />
                      {errors['miembroEquipo1.direccion'] && (
                        <p className="text-red-500 text-sm mt-1">{errors['miembroEquipo1.direccion']}</p>
                      )}
                    </div>

                    {/* Tipo de documento */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tipo de documento de identidad *
                      </label>
                      <select
                        value={formData.miembroEquipo1.tipoDocumento}
                        onChange={(e) => handleTeamMemberChange('tipoDocumento', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 ${
                          errors['miembroEquipo1.tipoDocumento'] ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Selecciona el tipo</option>
                        <option value="DNI">DNI</option>
                        <option value="PASAPORTE">PASAPORTE</option>
                        <option value="CARNET_EXTRANJERIA">CARNET DE EXTRANJERÍA</option>
                        <option value="OTROS">OTROS</option>
                      </select>
                      {errors['miembroEquipo1.tipoDocumento'] && (
                        <p className="text-red-500 text-sm mt-1">{errors['miembroEquipo1.tipoDocumento']}</p>
                      )}
                    </div>

                    {/* Número de documento */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Número de documento *
                      </label>
                      <input
                        type="text"
                        value={formData.miembroEquipo1.numeroDocumento}
                        onChange={(e) => handleTeamMemberChange('numeroDocumento', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 ${
                          errors['miembroEquipo1.numeroDocumento'] ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Número del documento"
                      />
                      {errors['miembroEquipo1.numeroDocumento'] && (
                        <p className="text-red-500 text-sm mt-1">{errors['miembroEquipo1.numeroDocumento']}</p>
                      )}
                    </div>

                    {/* Teléfono */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Teléfono de contacto *
                      </label>
                      <input
                        type="text"
                        value={formData.miembroEquipo1.telefono}
                        onChange={(e) => handleTeamMemberChange('telefono', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 ${
                          errors['miembroEquipo1.telefono'] ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Incluye código de país"
                      />
                      {errors['miembroEquipo1.telefono'] && (
                        <p className="text-red-500 text-sm mt-1">{errors['miembroEquipo1.telefono']}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Correo electrónico personal *
                      </label>
                      <input
                        type="email"
                        value={formData.miembroEquipo1.email}
                        onChange={(e) => handleTeamMemberChange('email', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 ${
                          errors['miembroEquipo1.email'] ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="correo@ejemplo.com"
                      />
                      {errors['miembroEquipo1.email'] && (
                        <p className="text-red-500 text-sm mt-1">{errors['miembroEquipo1.email']}</p>
                      )}
                    </div>

                    {/* LinkedIn */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Enlace al perfil de LinkedIn *
                      </label>
                      <input
                        type="url"
                        value={formData.miembroEquipo1.linkedin}
                        onChange={(e) => handleTeamMemberChange('linkedin', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 ${
                          errors['miembroEquipo1.linkedin'] ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="https://linkedin.com/in/tuperfil"
                      />
                      {errors['miembroEquipo1.linkedin'] && (
                        <p className="text-red-500 text-sm mt-1">{errors['miembroEquipo1.linkedin']}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Cómo se enteró */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    30. ¿Cómo te enteraste de StartUPC? *
                  </label>
                  <select
                    value={formData.comoSeEntero}
                    onChange={(e) => handleInputChange('comoSeEntero', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 ${
                      errors.comoSeEntero ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="INSTAGRAM">Instagram</option>
                    <option value="FACEBOOK">Facebook</option>
                    <option value="LINKEDIN">LinkedIn</option>
                    <option value="RECOMENDACION">Recomendación de un amigo o contacto</option>
                    <option value="ALIADO">A través de un aliado o institución</option>
                    <option value="OTHER">Otro</option>
                  </select>
                  {errors.comoSeEntero && (
                    <p className="text-red-500 text-sm mt-1">{errors.comoSeEntero}</p>
                  )}
                </div>

                {/* Aviso de privacidad */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    31. He leído y acepto el Aviso de Privacidad y Consentimiento *
                  </label>
                  <p className="text-sm text-gray-500 mb-2">
                    <a 
                      href="https://docs.google.com/document/d/1ODb2mC5epq6ebCxb1YbpuTVUVwzvWeSLESwpe4IhbgE/edit?usp=sharing" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-fuchsia-600 hover:text-fuchsia-800 underline"
                    >
                      Ver Aviso de Privacidad
                    </a>
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="I_ACCEPT"
                        checked={formData.aceptaPrivacidad === 'I_ACCEPT'}
                        onChange={(e) => handleInputChange('aceptaPrivacidad', e.target.value)}
                        className="mr-2 text-fuchsia-500 focus:ring-fuchsia-500"
                      />
                      Acepto
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="I_DONT_ACCEPT"
                        checked={formData.aceptaPrivacidad === 'I_DONT_ACCEPT'}
                        onChange={(e) => handleInputChange('aceptaPrivacidad', e.target.value)}
                        className="mr-2 text-fuchsia-500 focus:ring-fuchsia-500"
                      />
                      No acepto
                    </label>
                  </div>
                  {errors.aceptaPrivacidad && (
                    <p className="text-red-500 text-sm mt-1">{errors.aceptaPrivacidad}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={`flex items-center px-6 py-2 rounded-md transition-colors ${
                currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <ChevronLeftIcon className="w-5 h-5 mr-2" />
              Anterior
            </button>

            <button
              onClick={handleNext}
              className="flex items-center px-6 py-2 bg-gradient-to-r from-fuchsia-500 to-red-500 text-white rounded-md hover:from-fuchsia-600 hover:to-red-600 transition-colors"
            >
              {currentStep === 4 ? 'Enviar Formulario' : 'Siguiente'}
              {currentStep < 4 && <ChevronRightIcon className="w-5 h-5 ml-2" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}