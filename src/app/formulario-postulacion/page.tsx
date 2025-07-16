'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeftIcon, ChevronRightIcon, CheckIcon } from '@heroicons/react/24/outline';
import { ZodError } from 'zod';
import { 
  step1Schema, 
  step2Schema, 
  step3Schema, 
  step4Schema, 
  teamMemberSchema,
  TeamMember,
  Step1Data
} from '@/lib/validations';
import Step1 from '@/components/FormSteps/Step1';
import Step2 from '@/components/FormSteps/Step2';
import Step3 from '@/components/FormSteps/Step3';
import TeamMemberModal from '@/components/TeamMember/TeamMemberModal';

interface ApiError {
  field: string;
  message: string;
  received?: string;
}

// Tipos para el estado del formulario (más flexibles que permiten strings vacíos)
interface FormTeamMember {
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

interface FormDataState {
  // Step 1
  nombreComercial: string;
  razonSocial: string;
  numeroFiscal: string;
  sitioWeb: string;
  logotipo: File | null;
  descripcion: string;
  industria: Step1Data['industria'];
  industriaOther: string;
  // Step 2
  fechaFundacion: string;
  problemaOportunidad: string;
  solucion: string;
  modeloNegocio: string;
  ventajaCompetitiva: string;
  necesidades: string[];
  necesidadesOther: string;
  programaAceleracion: string;
  nombrePrograma: string;
  aprendizajes: string;
  aplicacionAprendizajes: string;
  videoPresentacion: string;
  // Step 3
  tieneVentas: string;
  pilotoDemo: string;
  ubicacionSolucion: string;
  montoVentas: string;
  tecnologia: string;
  areaDesarrollo: string;
  inversionExterna: string;
  // Step 4
  miembrosEquipo: TeamMember[];
  comoSeEntero: string;
  comoSeEnteroOther: string;
  aceptaPrivacidad: string;
}

export default function FormularioPostulacion() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [showMemberForm, setShowMemberForm] = useState(false);
  const [editingMemberIndex, setEditingMemberIndex] = useState<number | null>(null);
  const [currentMember, setCurrentMember] = useState<FormTeamMember>({
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
  });
  
  const [formData, setFormData] = useState<FormDataState>({
    nombreComercial: '',
    razonSocial: '',
    numeroFiscal: '',
    sitioWeb: '',
    logotipo: null,
    descripcion: '',
    industria: 'Edtech',
    industriaOther: '',
    fechaFundacion: '',
    problemaOportunidad: '',
    solucion: '',
    modeloNegocio: '',
    ventajaCompetitiva: '',
    necesidades: [],
    necesidadesOther: '',
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
    miembrosEquipo: [],
    comoSeEntero: '',
    comoSeEnteroOther: '',
    aceptaPrivacidad: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stepSuccessMessage, setStepSuccessMessage] = useState<string>('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const steps = [
    { id: 1, name: 'Datos Generales', description: 'Aspectos generales de tu emprendimiento' },
    { id: 2, name: 'Información sobre la Startup', description: 'Detalles específicos de tu startup' },
    { id: 3, name: 'Ventas y Operaciones', description: 'Información comercial y tecnológica' },
    { id: 4, name: 'Información del Equipo', description: 'Datos del equipo fundador' }
  ];

  // ✅ PERSISTENCIA DE DATOS - Cargar datos del localStorage al inicializar
  useEffect(() => {
    const savedFormData = localStorage.getItem('formulario-postulacion-data');
    const savedCurrentStep = localStorage.getItem('formulario-postulacion-step');
    
    if (savedFormData) {
      try {
        const parsedData = JSON.parse(savedFormData);
        setFormData(parsedData);
      } catch (error) {
        console.error('Error al cargar datos guardados:', error);
      }
    }
    
    if (savedCurrentStep) {
      const step = parseInt(savedCurrentStep, 10);
      if (step >= 1 && step <= 4) {
        setCurrentStep(step);
      }
    }

    // ✅ SCROLL AL INICIO al cargar la página
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 200);
  }, []);

  // ✅ PERSISTENCIA DE DATOS - Guardar automáticamente en localStorage
  useEffect(() => {
    // Solo guardar si hay datos relevantes (no vacío inicial)
    if (formData.nombreComercial || formData.razonSocial || formData.descripcion || formData.miembrosEquipo.length > 0) {
      localStorage.setItem('formulario-postulacion-data', JSON.stringify(formData));
    }
  }, [formData]);

  // ✅ PERSISTENCIA DE PASO ACTUAL
  useEffect(() => {
    localStorage.setItem('formulario-postulacion-step', currentStep.toString());
  }, [currentStep]);

  const handleInputChange = (field: string, value: string | File | null | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    
    // Validate field immediately for certain types
    if (typeof value === 'string' && value.length > 0) {
      validateSingleField(field, value);
    }
  };

  const validateSingleField = (field: string, value: string | File | null | string[] | TeamMember[]) => {
    const newErrors: Record<string, string> = {};
    
    // Email validation for team member fields
    if (field.includes('email') && typeof value === 'string') {
      if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        newErrors[field] = 'Ingresa un email válido';
      }
    }
    
    // URL validation
    if ((field === 'sitioWeb' || field === 'videoPresentacion' || field.includes('linkedin')) && typeof value === 'string') {
      if (value && !/^https?:\/\/.+/.test(value)) {
        newErrors[field] = 'Ingresa una URL válida (debe comenzar con http:// o https://)';
      }
    }
    
    // Required field validation on blur
    const requiredFields = [
      'nombreComercial', 'razonSocial', 'numeroFiscal', 'descripcion', 
      'industria', 'fechaFundacion', 'problemaOportunidad', 'solucion',
      'modeloNegocio', 'ventajaCompetitiva', 'programaAceleracion',
      'tieneVentas', 'pilotoDemo', 'ubicacionSolucion', 'tecnologia',
      'areaDesarrollo', 'inversionExterna', 'comoSeEntero', 'aceptaPrivacidad'
    ];
    
    if (requiredFields.includes(field) && (!value || (typeof value === 'string' && !value.trim()))) {
      newErrors[field] = 'Este campo es requerido';
    }
    
    // Conditional required fields - usar formData actual
    const currentFormData = formData;
    
    if (field === 'industriaOther' && currentFormData.industria === 'Other' && (!value || !value.toString().trim())) {
      newErrors[field] = 'Este campo es requerido cuando seleccionas "Otro"';
    }
    
    if (field === 'necesidadesOther' && currentFormData.necesidades?.includes('OTHER') && (!value || !value.toString().trim())) {
      newErrors[field] = 'Este campo es requerido cuando seleccionas "Otro"';
    }
    
    // Validaciones condicionales para programa de aceleración
    if (field === 'nombrePrograma' && currentFormData.programaAceleracion === 'SI' && (!value || !value.toString().trim())) {
      newErrors[field] = 'Este campo es requerido cuando has participado en un programa';
    }
    
    if (field === 'aprendizajes' && currentFormData.programaAceleracion === 'SI' && (!value || !value.toString().trim())) {
      newErrors[field] = 'Este campo es requerido cuando has participado en un programa';
    }
    
    if (field === 'aplicacionAprendizajes' && currentFormData.programaAceleracion === 'SI' && (!value || !value.toString().trim())) {
      newErrors[field] = 'Este campo es requerido cuando has participado en un programa';
    }
    
    if (field === 'montoVentas' && currentFormData.tieneVentas === 'SI' && (!value || !value.toString().trim())) {
      newErrors[field] = 'Este campo es requerido cuando tienes ventas';
    }
    
    if (field === 'comoSeEnteroOther' && currentFormData.comoSeEntero === 'OTHER' && (!value || !value.toString().trim())) {
      newErrors[field] = 'Este campo es requerido cuando seleccionas "Otro"';
    }
    
    setErrors(prev => ({ ...prev, ...newErrors }));
  };

  const validateWithZod = (schema: { parse: (data: unknown) => void }, data: Record<string, unknown>) => {
    try {
      schema.parse(data);
      
      // Validaciones adicionales para campos condicionales
      const conditionalErrors: Record<string, string> = {};
      
      // Validar campos condicionales del Step 2
      if (data.programaAceleracion === 'SI') {
        if (!data.nombrePrograma || !(data.nombrePrograma as string).trim()) {
          conditionalErrors.nombrePrograma = 'Este campo es requerido cuando has participado en un programa';
        }
        if (!data.aprendizajes || !(data.aprendizajes as string).trim()) {
          conditionalErrors.aprendizajes = 'Este campo es requerido cuando has participado en un programa';
        }
        if (!data.aplicacionAprendizajes || !(data.aplicacionAprendizajes as string).trim()) {
          conditionalErrors.aplicacionAprendizajes = 'Este campo es requerido cuando has participado en un programa';
        }
      }
      
      // Validar campos condicionales del Step 3
      if (data.tieneVentas === 'SI') {
        if (!data.montoVentas || !(data.montoVentas as string).trim()) {
          conditionalErrors.montoVentas = 'Este campo es requerido cuando tienes ventas';
        }
      }
      
      // Validar otros campos condicionales
      if (data.industria === 'Other' && (!data.industriaOther || !(data.industriaOther as string).trim())) {
        conditionalErrors.industriaOther = 'Este campo es requerido cuando seleccionas "Otro"';
      }
      
      if ((data.necesidades as string[])?.includes('OTHER') && (!data.necesidadesOther || !(data.necesidadesOther as string).trim())) {
        conditionalErrors.necesidadesOther = 'Este campo es requerido cuando seleccionas "Otro"';
      }
      
      if (data.comoSeEntero === 'OTHER' && (!data.comoSeEnteroOther || !(data.comoSeEnteroOther as string).trim())) {
        conditionalErrors.comoSeEnteroOther = 'Este campo es requerido cuando seleccionas "Otro"';
      }
      
      if (Object.keys(conditionalErrors).length > 0) {
        setErrors(conditionalErrors);
        return false;
      }
      
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        const newErrors: Record<string, string> = {};
        error.issues.forEach((issue) => {
          if (issue.path && issue.path.length > 0) {
            const path = issue.path.join('.');
            newErrors[path] = issue.message;
          }
        });
        setErrors(newErrors);
      } else {
        console.error('Validation error:', error);
        setErrors({ general: 'Error de validación' });
      }
      return false;
    }
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return validateWithZod(step1Schema, formData as unknown as Record<string, unknown>);
      case 2:
        return validateWithZod(step2Schema, formData as unknown as Record<string, unknown>);
      case 3:
        return validateWithZod(step3Schema, formData as unknown as Record<string, unknown>);
      case 4:
        return validateWithZod(step4Schema, formData as unknown as Record<string, unknown>);
      default:
        return false;
    }
  };

  const handleNext = async () => {
    if (validateCurrentStep()) {
      // ✅ MOSTRAR MENSAJE DE ÉXITO al completar cada paso
      const stepNames = {
        1: 'Datos Generales',
        2: 'Información sobre la Startup', 
        3: 'Ventas y Operaciones',
        4: 'Información del Equipo'
      };
      
      const currentStepName = stepNames[currentStep as keyof typeof stepNames];
      setStepSuccessMessage(`✅ ${currentStepName} guardados correctamente`);
      setShowSuccessMessage(true);
      
      // Ocultar mensaje después de 3 segundos
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
      
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
        
        // ✅ SCROLL AUTOMÁTICO AL INICIO DEL FORMULARIO
        setTimeout(() => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }, 100); // Pequeño delay para que React actualice el DOM
      } else {
        // Enviar formulario a la base de datos
        await handleSubmitForm();
      }
    }
  };

  const handleSubmitForm = async () => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/formulario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      // Verificar si la respuesta tiene contenido
      const responseText = await response.text();
      
      if (!responseText) {
        throw new Error('El servidor devolvió una respuesta vacía');
      }
      
      let result;
      try {
        result = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        console.error('Response text that failed to parse:', responseText);
        throw new Error('El servidor devolvió una respuesta inválida');
      }

      if (response.ok && result.success) {
        // ✅ LIMPIAR DATOS GUARDADOS al envío exitoso
        localStorage.removeItem('formulario-postulacion-data');
        localStorage.removeItem('formulario-postulacion-step');
        
        // Redirigir a la página de confirmación
        router.push('/confirmacion');
      } else {
        console.error('Error en el servidor:', result.message || 'Error desconocido');
        
        // Verificar si hay errores detallados antes de loggear
        if (result.errors) {
          console.error('Errores detallados:', result.errors);
        }
        
        if (result.fieldsWithErrors) {
          console.error('Campos con errores:', result.fieldsWithErrors);
        }
        
        // Mostrar errores específicos
        if (result.fieldsWithErrors && Array.isArray(result.fieldsWithErrors) && result.fieldsWithErrors.length > 0) {
          const errorMessages = result.fieldsWithErrors.map((err: ApiError) => 
            `Campo "${err.field}": ${err.message}`
          ).join('\n');
          alert(`Errores de validación:\n\n${errorMessages}`);
        } else {
          alert(`Error: ${result.message || 'Error desconocido al procesar el formulario'}`);
        }
      }
    } catch (error) {
      console.error('Error al enviar formulario:', error);
      alert(`Error de conexión: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      
      // ✅ SCROLL AUTOMÁTICO AL INICIO DEL FORMULARIO
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }, 100); // Pequeño delay para que React actualice el DOM
    }
  };

  // ✅ FUNCIÓN PARA LIMPIAR DATOS GUARDADOS
  const clearSavedData = () => {
    localStorage.removeItem('formulario-postulacion-data');
    localStorage.removeItem('formulario-postulacion-step');
    
    // Resetear formulario
    setFormData({
      nombreComercial: '',
      razonSocial: '',
      numeroFiscal: '',
      sitioWeb: '',
      logotipo: null,
      descripcion: '',
      industria: 'Edtech',
      industriaOther: '',
      fechaFundacion: '',
      problemaOportunidad: '',
      solucion: '',
      modeloNegocio: '',
      ventajaCompetitiva: '',
      necesidades: [],
      necesidadesOther: '',
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
      miembrosEquipo: [],
      comoSeEntero: '',
      comoSeEnteroOther: '',
      aceptaPrivacidad: ''
    });
    
    setCurrentStep(1);
    setErrors({});
    
    alert('Datos del formulario limpiados correctamente');
  };

  // Team member functions
  const handleAddMember = () => {
    setCurrentMember({
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
    });
    setEditingMemberIndex(null);
    setShowMemberForm(true);
  };

  const handleEditMember = (index: number) => {
    setCurrentMember({ 
      ...formData.miembrosEquipo![index],
      linkedin: formData.miembrosEquipo![index].linkedin || ''
    });
    setEditingMemberIndex(index);
    setShowMemberForm(true);
  };

  const handleSaveMember = () => {
    if (validateWithZod(teamMemberSchema, currentMember as unknown as Record<string, unknown>)) {
      setFormData(prev => {
        const newMembers = [...(prev.miembrosEquipo || [])];
        
        // Convertir FormTeamMember a TeamMember con tipos correctos
        const memberToSave: TeamMember = {
          ...currentMember,
          tiempoCompleto: currentMember.tiempoCompleto as 'SI' | 'NO',
          tipoDocumento: currentMember.tipoDocumento as 'DNI' | 'PASAPORTE' | 'CARNET_EXTRANJERIA' | 'OTROS',
          linkedin: currentMember.linkedin || undefined
        };
        
        if (editingMemberIndex !== null) {
          newMembers[editingMemberIndex] = memberToSave;
        } else {
          newMembers.push(memberToSave);
        }
        return { ...prev, miembrosEquipo: newMembers };
      });
      setShowMemberForm(false);
      setErrors({});
    }
  };

  const handleRemoveMember = (index: number) => {
    setFormData(prev => ({
      ...prev,
      miembrosEquipo: prev.miembrosEquipo?.filter((_, i) => i !== index) || []
    }));
  };

  const handleMemberInputChange = (field: keyof TeamMember, value: string) => {
    setCurrentMember(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* ✅ MENSAJE DE ÉXITO AL COMPLETAR PASO */}
        {showSuccessMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
            <CheckIcon className="w-6 h-6 text-green-600 mr-3 flex-shrink-0" />
            <div>
              <p className="text-green-800 font-medium">{stepSuccessMessage}</p>
              <p className="text-green-600 text-sm">Los datos se han guardado automáticamente</p>
            </div>
          </div>
        )}

        {/* ✅ PANEL DE PERSISTENCIA - Mostrar solo si hay datos guardados */}
        {(formData.nombreComercial || formData.razonSocial || formData.descripcion || formData.miembrosEquipo.length > 0) && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3 animate-pulse"></div>
                <div>
                  <p className="text-blue-800 font-medium">Datos guardados automáticamente</p>
                  <p className="text-blue-600 text-sm">Tu progreso se conservará aunque recargues la página</p>
                </div>
              </div>
              <button
                onClick={clearSavedData}
                className="px-4 py-2 text-sm border border-blue-300 rounded text-blue-700 hover:bg-blue-100 transition-colors"
              >
                Limpiar Todo
              </button>
            </div>
          </div>
        )}

        
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
            <Step1 
              data={formData} 
              errors={errors} 
              onChange={handleInputChange}
            />
          )}

          {currentStep === 2 && (
            <Step2 
              data={formData} 
              errors={errors} 
              onChange={handleInputChange}
            />
          )}

          {currentStep === 3 && (
            <Step3 
              data={formData} 
              errors={errors} 
              onChange={handleInputChange}
            />
          )}

          {currentStep === 4 && (
            <>
              <TeamMemberModal
                isOpen={showMemberForm}
                member={currentMember}
                errors={errors}
                isEditing={editingMemberIndex !== null}
                onClose={() => setShowMemberForm(false)}
                onChange={handleMemberInputChange}
                onSave={handleSaveMember}
              />

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Información del Equipo</h2>
                <p className="text-gray-600 mb-6">
                  Por favor, ingresa la información completa de cada miembro de tu equipo.
                </p>

                {/* Team Members Section */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        26. Miembros del Equipo
                      </h3>
                      <p className="text-sm text-gray-500">
                        Mínimo 2 miembros, máximo 4 miembros. ({formData.miembrosEquipo?.length || 0}/4)
                      </p>
                    </div>
                    <button
                      onClick={handleAddMember}
                      disabled={(formData.miembrosEquipo?.length || 0) >= 4}
                      className={`px-4 py-2 rounded-md text-white ${
                        (formData.miembrosEquipo?.length || 0) >= 4
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-fuchsia-500 to-red-500 hover:from-fuchsia-600 hover:to-red-600'
                      }`}
                    >
                      Agregar Miembro
                    </button>
                  </div>

                  {!formData.miembrosEquipo?.length ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <p className="text-gray-500">No hay miembros agregados. Agrega al menos 2 miembros del equipo.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {formData.miembrosEquipo.map((member, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900">
                                {member.nombres} {member.apellidos}
                              </h4>
                              <p className="text-sm text-gray-600">{member.rol}</p>
                              <p className="text-sm text-gray-500">{member.email}</p>
                            </div>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEditMember(index)}
                                className="px-3 py-1 text-sm border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                              >
                                Ver/Editar
                              </button>
                              <button
                                onClick={() => handleRemoveMember(index)}
                                className="px-3 py-1 text-sm border border-red-300 rounded text-red-700 hover:bg-red-50"
                              >
                                Eliminar
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {errors.miembrosEquipo && (
                    <p className="text-red-500 text-sm mt-2">{errors.miembrosEquipo}</p>
                  )}
                </div>

                {/* Question 30: Cómo se enteró */}
                <div className="mb-6">
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
                  
                  {/* Conditional input for "Other" source */}
                  {formData.comoSeEntero === 'OTHER' && (
                    <div className="mt-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Especifica cómo te enteraste *
                      </label>
                      <input
                        type="text"
                        value={formData.comoSeEnteroOther}
                        onChange={(e) => handleInputChange('comoSeEnteroOther', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 ${
                          errors.comoSeEnteroOther ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Describe cómo te enteraste de StartUPC"
                      />
                      {errors.comoSeEnteroOther && (
                        <p className="text-red-500 text-sm mt-1">{errors.comoSeEnteroOther}</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Question 31: Aviso de privacidad */}
                <div className="mb-6">
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
            </>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1 || isSubmitting}
              className={`flex items-center px-6 py-2 rounded-md transition-colors ${
                currentStep === 1 || isSubmitting
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <ChevronLeftIcon className="w-5 h-5 mr-2" />
              Anterior
            </button>

            <button
              onClick={handleNext}
              disabled={isSubmitting}
              className={`flex items-center px-6 py-2 rounded-md transition-colors ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-fuchsia-500 to-red-500 hover:from-fuchsia-600 hover:to-red-600'
              } text-white`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Enviando...
                </>
              ) : (
                <>
                  {currentStep === 4 ? 'Enviar Formulario' : 'Siguiente'}
                  {currentStep < 4 && <ChevronRightIcon className="w-5 h-5 ml-2" />}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}