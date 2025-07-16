import { z } from 'zod';

// URL validation - simplified and safer
const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return url.startsWith('http://') || url.startsWith('https://');
  }
};

// Date validation regex (DD/MM/YYYY)
const datePattern = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;

// Custom date validator
const validateDate = (dateStr: string) => {
  const match = dateStr.match(datePattern);
  if (!match) return false;
  
  const day = parseInt(match[1]);
  const month = parseInt(match[2]);
  const year = parseInt(match[3]);
  
  if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1900 || year > new Date().getFullYear()) {
    return false;
  }
  
  const date = new Date(year, month - 1, day);
  return date.getDate() === day && date.getMonth() === month - 1 && date.getFullYear() === year;
};

export const teamMemberSchema = z.object({
  nombres: z.string().min(1, 'Este campo es obligatorio'),
  apellidos: z.string().min(1, 'Este campo es obligatorio'),
  rol: z.string().min(1, 'Este campo es obligatorio'),
  tiempoCompleto: z.enum(['SI', 'NO'], { message: 'Este campo es obligatorio' }),
  fechaNacimiento: z.string()
    .min(1, 'Este campo es obligatorio')
    .refine(validateDate, 'Formato de fecha inválido. Use DD/MM/AAAA'),
  lugarNacimiento: z.string().min(1, 'Este campo es obligatorio'),
  direccion: z.string().min(1, 'Este campo es obligatorio'),
  tipoDocumento: z.enum(['DNI', 'PASAPORTE', 'CARNET_EXTRANJERIA', 'OTROS'], { 
    message: 'Este campo es obligatorio' 
  }),
  numeroDocumento: z.string().min(1, 'Este campo es obligatorio'),
  telefono: z.string().min(1, 'Este campo es obligatorio'),
  email: z.string()
    .min(1, 'Este campo es obligatorio')
    .email('Formato de correo electrónico inválido'),
  linkedin: z.string()
    .optional()
    .refine((val) => !val || val.trim() === '' || isValidUrl(val), {
      message: 'Debe ser una URL válida'
    })
});

export const step1Schema = z.object({
  nombreComercial: z.string().min(1, 'Este campo es obligatorio'),
  razonSocial: z.string().min(1, 'Este campo es obligatorio'),
  numeroFiscal: z.string().min(1, 'Este campo es obligatorio'),
  sitioWeb: z.string()
    .optional()
    .refine((val) => !val || val.trim() === '' || isValidUrl(val), {
      message: 'Debe ser una URL válida'
    }),
  logotipo: z.any().optional(),
  descripcion: z.string()
    .min(1, 'Este campo es obligatorio')
    .max(500, 'Máximo 500 caracteres'),
  industria: z.enum(['Edtech', 'Other'], { message: 'Debes seleccionar una industria' }),
  industriaOther: z.string().optional()
}).refine((data) => {
  if (data.industria === 'Other' && !data.industriaOther?.trim()) {
    return false;
  }
  return true;
}, {
  message: 'Especifica la industria',
  path: ['industriaOther']
});

export const step2Schema = z.object({
  fechaFundacion: z.string().min(1, 'Este campo es obligatorio'),
  problemaOportunidad: z.string().min(1, 'Este campo es obligatorio'),
  solucion: z.string().min(1, 'Este campo es obligatorio'),
  modeloNegocio: z.string().min(1, 'Este campo es obligatorio'),
  ventajaCompetitiva: z.string().min(1, 'Este campo es obligatorio'),
  necesidades: z.array(z.string()).min(1, 'Selecciona al menos una necesidad'),
  necesidadesOther: z.string().optional(),
  programaAceleracion: z.string().refine((val) => ['SI', 'NO'].includes(val), {
    message: 'Este campo es obligatorio'
  }),
  nombrePrograma: z.string().optional(),
  aprendizajes: z.string().optional(),
  aplicacionAprendizajes: z.string().optional(),
  videoPresentacion: z.string()
    .optional()
    .refine((val) => !val || val.trim() === '' || isValidUrl(val), {
      message: 'Debe ser una URL válida'
    })
}).refine((data) => {
  if (data.necesidades.includes('OTHER') && !data.necesidadesOther?.trim()) {
    return false;
  }
  return true;
}, {
  message: 'Especifica la necesidad',
  path: ['necesidadesOther']
}).refine((data) => {
  if (data.programaAceleracion === 'SI') {
    if (!data.nombrePrograma?.trim() || !data.aprendizajes?.trim() || !data.aplicacionAprendizajes?.trim()) {
      return false;
    }
  }
  return true;
}, {
  message: 'Este campo es obligatorio cuando has participado en un programa',
  path: ['nombrePrograma']
});

export const step3Schema = z.object({
  tieneVentas: z.string().refine((val) => ['SI', 'NO'].includes(val), {
    message: 'Este campo es obligatorio'
  }),
  pilotoDemo: z.string().refine((val) => ['SI', 'NO'].includes(val), {
    message: 'Este campo es obligatorio'
  }),
  ubicacionSolucion: z.string().min(1, 'Este campo es obligatorio'),
  montoVentas: z.string().optional(),
  tecnologia: z.string().min(1, 'Este campo es obligatorio'),
  areaDesarrollo: z.string().refine((val) => ['SI', 'NO'].includes(val), {
    message: 'Este campo es obligatorio'
  }),
  inversionExterna: z.string().refine((val) => ['SI', 'NO'].includes(val), {
    message: 'Este campo es obligatorio'
  })
});

export const step4Schema = z.object({
  miembrosEquipo: z.array(teamMemberSchema)
    .min(2, 'Debes agregar al menos 2 miembros del equipo')
    .max(4, 'Máximo 4 miembros del equipo'),
  comoSeEntero: z.string().refine((val) => ['INSTAGRAM', 'FACEBOOK', 'LINKEDIN', 'RECOMENDACION', 'ALIADO', 'OTHER'].includes(val), {
    message: 'Este campo es obligatorio'
  }),
  comoSeEnteroOther: z.string().optional(),
  aceptaPrivacidad: z.string().refine((val) => val === 'I_ACCEPT', {
    message: 'Debes aceptar el Aviso de Privacidad'
  })
}).refine((data) => {
  if (data.comoSeEntero === 'OTHER' && !data.comoSeEnteroOther?.trim()) {
    return false;
  }
  return true;
}, {
  message: 'Especifica cómo te enteraste',
  path: ['comoSeEnteroOther']
});

export type TeamMember = z.infer<typeof teamMemberSchema>;
export type Step1Data = z.infer<typeof step1Schema>;
export type Step2Data = z.infer<typeof step2Schema>;
export type Step3Data = z.infer<typeof step3Schema>;
export type Step4Data = z.infer<typeof step4Schema>;
