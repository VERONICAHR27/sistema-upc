import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

type ConvocatoriaRaw = {
  id: string;
  title: string;
  status: string;
  principal: boolean;
};

// Función para convertir fecha DD/MM/YYYY a Date válido
const parseDate = (dateStr: string): Date => {
  if (!dateStr) throw new Error('Fecha vacía');
  
  // Si ya es un formato ISO, usarlo directamente
  if (dateStr.includes('T') || dateStr.match(/^\d{4}-\d{2}-\d{2}/)) {
    return new Date(dateStr);
  }
  
  // Parsear formato DD/MM/YYYY
  const ddmmyyyy = dateStr.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (ddmmyyyy) {
    const day = parseInt(ddmmyyyy[1], 10);
    const month = parseInt(ddmmyyyy[2], 10);
    const year = parseInt(ddmmyyyy[3], 10);
    
    if (isNaN(day) || isNaN(month) || isNaN(year)) {
      throw new Error(`Fecha con valores no numéricos: ${dateStr}`);
    }
    
    // Crear fecha (mes es 0-indexado en JavaScript)
    const date = new Date(year, month - 1, day);
    
    // Verificar que la fecha sea válida
    if (date.getDate() !== day || date.getMonth() !== month - 1 || date.getFullYear() !== year) {
      throw new Error(`Fecha inválida: ${dateStr}`);
    }
    
    return date;
  }
  
  // Para fechas de fundación en formato libre como "Enero 2023"
  // Intentar parsear como texto y crear una fecha aproximada
  const textDate = parseTextDate(dateStr);
  if (textDate) {
    return textDate;
  }
  
  throw new Error(`Formato de fecha no reconocido: ${dateStr}. Use DD/MM/YYYY o texto como "Enero 2023"`);
};

// Función auxiliar para parsear fechas en texto libre
const parseTextDate = (dateStr: string): Date | null => {
  // Mapeo de meses en español
  const meses: { [key: string]: number } = {
    'enero': 0, 'febrero': 1, 'marzo': 2, 'abril': 3, 'mayo': 4, 'junio': 5,
    'julio': 6, 'agosto': 7, 'septiembre': 8, 'octubre': 9, 'noviembre': 10, 'diciembre': 11
  };
  
  const mesRegex = /^(\w+)\s+(\d{4})$/i;
  const match = dateStr.trim().match(mesRegex);
  
  if (match) {
    const mesTexto = match[1].toLowerCase();
    const año = parseInt(match[2], 10);
    
    if (meses.hasOwnProperty(mesTexto) && !isNaN(año)) {
      return new Date(año, meses[mesTexto], 1); // Primer día del mes
    }
  }
  
  return null;
};

const FormularioSchema = z.object({
  nombreComercial: z.string().min(1, "Nombre comercial es requerido"),
  razonSocial: z.string().min(1, "Razón social es requerida"),
  numeroFiscal: z.string().min(1, "Número fiscal es requerido"),
  sitioWeb: z.string().optional().transform(val => val && val.trim() !== '' ? val : null),
  descripcion: z.string().min(10, "Descripción debe tener al menos 10 caracteres"),
  industria: z.string().min(1, "Industria es requerida"),
  industriaOther: z.string().optional().transform(val => val && val.trim() !== '' ? val : null),
  fechaFundacion: z.string().min(1, "Fecha de fundación es requerida"),
  problemaOportunidad: z.string().min(10, "Problema/oportunidad es requerido"),
  solucion: z.string().min(10, "Solución es requerida"),
  modeloNegocio: z.string().min(10, "Modelo de negocio es requerido"),
  ventajaCompetitiva: z.string().min(10, "Ventaja competitiva es requerida"),
  necesidades: z.array(z.string()).default([]),
  necesidadesOther: z.string().optional().transform(val => val && val.trim() !== '' ? val : null),
  // Esquemas más flexibles que aceptan cualquier valor y lo convierten
  programaAceleracion: z.any().transform(val => {
    if (val === true || val === "true" || val === "SI" || val === "1") return "SI";
    if (val === false || val === "false" || val === "NO" || val === "0") return "NO";
    return String(val) || "NO";
  }),
  nombrePrograma: z.string().optional().transform(val => val && val.trim() !== '' ? val : null),
  aprendizajes: z.string().optional().transform(val => val && val.trim() !== '' ? val : null),
  aplicacionAprendizajes: z.string().optional().transform(val => val && val.trim() !== '' ? val : null),
  videoPresentacion: z.string().optional().transform(val => val && val.trim() !== '' ? val : null),
  tieneVentas: z.any().transform(val => {
    if (val === true || val === "true" || val === "SI" || val === "1") return "SI";
    if (val === false || val === "false" || val === "NO" || val === "0") return "NO";
    return String(val) || "NO";
  }),
  pilotoDemo: z.any().transform(val => {
    if (val === true || val === "true" || val === "SI" || val === "1") return "SI";
    if (val === false || val === "false" || val === "NO" || val === "0") return "NO";
    return String(val) || "NO";
  }),
  ubicacionSolucion: z.string().min(1, "Ubicación es requerida"),
  montoVentas: z.string().optional().transform(val => val && val.trim() !== '' ? val : null),
  tecnologia: z.string().min(1, "Tecnología es requerida"),
  areaDesarrollo: z.any().transform(val => {
    if (val === true || val === "true" || val === "SI" || val === "1") return "SI";
    if (val === false || val === "false" || val === "NO" || val === "0") return "NO";
    return String(val) || "NO";
  }),
  inversionExterna: z.any().transform(val => {
    if (val === true || val === "true" || val === "SI" || val === "1") return "SI";
    if (val === false || val === "false" || val === "NO" || val === "0") return "NO";
    return String(val) || "NO";
  }),
  comoSeEntero: z.string().min(1, "Cómo se enteró es requerido"),
  comoSeEnteroOther: z.string().optional().transform(val => val && val.trim() !== '' ? val : null),
  aceptaPrivacidad: z.enum(["I_ACCEPT"]),
  miembrosEquipo: z.array(z.object({
    nombres: z.string().min(1, "Nombres son requeridos"),
    apellidos: z.string().min(1, "Apellidos son requeridos"),
    rol: z.string().min(1, "Rol es requerido"),
    tiempoCompleto: z.string().min(1, "Tiempo completo es requerido"),
    fechaNacimiento: z.string().min(1, "Fecha de nacimiento es requerida"),
    lugarNacimiento: z.string().min(1, "Lugar de nacimiento es requerido"),
    direccion: z.string().min(1, "Dirección es requerida"),
    tipoDocumento: z.string().min(1, "Tipo de documento es requerido"),
    numeroDocumento: z.string().min(1, "Número de documento es requerido"),
    telefono: z.string().min(1, "Teléfono es requerido"),
    email: z.string().email("Email inválido"),
    linkedin: z.string().optional().transform(val => val && val.trim() !== '' ? val : null)
  })).min(2, "Mínimo 2 miembros del equipo").max(4, "Máximo 4 miembros del equipo")
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar datos con Zod
    const validatedData = FormularioSchema.parse(body);
    
    // Buscar convocatoria específica o activa principal
    let convocatoria = null;
    
    if (body.convocatoriaId) {
      // Buscar por ID específico
      const convocatoriaEspecifica = await prisma.$queryRaw`
        SELECT * FROM convocatorias 
        WHERE id = ${body.convocatoriaId}
        LIMIT 1
      `;
      convocatoria = Array.isArray(convocatoriaEspecifica) ? convocatoriaEspecifica[0] : null;
    } else {
      // Buscar la convocatoria activa principal como fallback
      const convocatoriaActiva = await prisma.$queryRaw`
        SELECT * FROM convocatorias 
        WHERE status = 'ACTIVA' AND principal = true 
        LIMIT 1
      `;
      convocatoria = Array.isArray(convocatoriaActiva) ? convocatoriaActiva[0] : null;
    }
    
    // Crear startup en la base de datos
    const startup = await prisma.startup.create({
      data: {
        nombreComercial: validatedData.nombreComercial,
        razonSocial: validatedData.razonSocial,
        numeroFiscal: validatedData.numeroFiscal,
        sitioWeb: validatedData.sitioWeb || null,
        descripcion: validatedData.descripcion,
        industria: validatedData.industria,
        industriaOther: validatedData.industriaOther || null,
        fechaFundacion: parseDate(validatedData.fechaFundacion),
        problemaOportunidad: validatedData.problemaOportunidad,
        solucion: validatedData.solucion,
        modeloNegocio: validatedData.modeloNegocio,
        ventajaCompetitiva: validatedData.ventajaCompetitiva,
        necesidades: validatedData.necesidades,
        necesidadesOther: validatedData.necesidadesOther || null,
        programaAceleracion: validatedData.programaAceleracion,
        nombrePrograma: validatedData.nombrePrograma || null,
        aprendizajes: validatedData.aprendizajes || null,
        aplicacionAprendizajes: validatedData.aplicacionAprendizajes || null,
        videoPresentacion: validatedData.videoPresentacion || null,
        tieneVentas: validatedData.tieneVentas,
        pilotoDemo: validatedData.pilotoDemo,
        ubicacionSolucion: validatedData.ubicacionSolucion,
        montoVentas: validatedData.montoVentas || null,
        tecnologia: validatedData.tecnologia,
        areaDesarrollo: validatedData.areaDesarrollo,
        inversionExterna: validatedData.inversionExterna,
        comoSeEntero: validatedData.comoSeEntero,
        comoSeEnteroOther: validatedData.comoSeEnteroOther || null,
        aceptaPrivacidad: validatedData.aceptaPrivacidad,
        convocatoriaId: (convocatoria as ConvocatoriaRaw)?.id || null, // Conectar con convocatoria activa
        miembrosEquipo: {
          create: validatedData.miembrosEquipo.map(member => ({
            nombres: member.nombres,
            apellidos: member.apellidos,
            rol: member.rol,
            tiempoCompleto: member.tiempoCompleto,
            fechaNacimiento: parseDate(member.fechaNacimiento),
            lugarNacimiento: member.lugarNacimiento,
            direccion: member.direccion,
            tipoDocumento: member.tipoDocumento,
            numeroDocumento: member.numeroDocumento,
            telefono: member.telefono,
            email: member.email,
            linkedin: member.linkedin || null
          }))
        }
      },
      include: {
        miembrosEquipo: true,
        convocatoria: true
      }
    });

    return NextResponse.json({
      success: true,
      message: "Formulario enviado exitosamente",
      data: startup
    }, { status: 201 });

  } catch (error) {
    console.error('Error al procesar formulario:', error);
    
    if (error instanceof z.ZodError) {
      // Mostrar errores específicos
      console.error('Errores de validación detallados:', error.issues);
      
      return NextResponse.json({
        success: false,
        message: "Datos de formulario inválidos",
        errors: error.issues,
        fieldsWithErrors: error.issues.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
          received: 'received' in err ? err.received : undefined
        }))
      }, { status: 400 });
    }

    // Error de parsing de fechas
    if (error instanceof Error && error.message.includes('Fecha')) {
      return NextResponse.json({
        success: false,
        message: "Error en formato de fecha: " + error.message,
        fieldsWithErrors: [{
          field: 'fecha',
          message: error.message,
          received: 'formato incorrecto'
        }]
      }, { status: 400 });
    }

    // Error de Prisma o base de datos
    if (error instanceof Error) {
      console.error('Error detallado:', error.message);
      console.error('Stack trace:', error.stack);
      
      return NextResponse.json({
        success: false,
        message: "Error de base de datos: " + error.message
      }, { status: 500 });
    }

    return NextResponse.json({
      success: false,
      message: "Error interno del servidor desconocido"
    }, { status: 500 });
  }
}

// Endpoint de prueba para verificar conectividad
export async function GET() {
  try {
    // Test simple de conexión a la base de datos
    await prisma.$connect();
    
    return NextResponse.json({
      success: true,
      message: "API y base de datos funcionando correctamente",
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error en conexión de prueba:', error);
    
    return NextResponse.json({
      success: false,
      message: "Error de conexión a la base de datos",
      error: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  }
}