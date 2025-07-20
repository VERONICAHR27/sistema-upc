import { NextRequest, NextResponse } from 'next/server';

// Datos mock para demostración
const mockStartups = [
  {
    id: "1",
    nombreComercial: "TechStart Solutions",
    razonSocial: "TechStart Solutions S.A.C.",
    estado: "PENDIENTE",
    descripcion: "Plataforma de gestión tecnológica para pequeñas empresas",
    industria: "Tecnología",
    createdAt: "2025-07-15T10:30:00Z",
    convocatoria: {
      title: "Convocatoria StartupUPC 2025"
    },
    miembrosEquipo: [
      {
        nombres: "Carlos",
        apellidos: "González",
        email: "carlos@techstart.com",
        rol: "CEO"
      },
      {
        nombres: "María",
        apellidos: "López",
        email: "maria@techstart.com",
        rol: "CTO"
      }
    ]
  },
  {
    id: "2",
    nombreComercial: "EcoVerde",
    razonSocial: "EcoVerde Innovaciones E.I.R.L.",
    estado: "EN_REVISION",
    descripcion: "Soluciones sostenibles para el manejo de residuos urbanos",
    industria: "Medio Ambiente",
    createdAt: "2025-07-18T14:20:00Z",
    convocatoria: {
      title: "Convocatoria StartupUPC 2025"
    },
    miembrosEquipo: [
      {
        nombres: "Ana",
        apellidos: "Rodríguez",
        email: "ana@ecoverde.com",
        rol: "Founder"
      },
      {
        nombres: "Luis",
        apellidos: "Martínez",
        email: "luis@ecoverde.com",
        rol: "COO"
      }
    ]
  },
  {
    id: "3",
    nombreComercial: "HealthTech Peru",
    razonSocial: "HealthTech Peru S.A.C.",
    estado: "ACEPTADA",
    descripcion: "Aplicación móvil para monitoreo de salud en tiempo real",
    industria: "Salud",
    createdAt: "2025-07-10T09:15:00Z",
    convocatoria: {
      title: "Convocatoria StartupUPC 2025"
    },
    miembrosEquipo: [
      {
        nombres: "Pedro",
        apellidos: "Sánchez",
        email: "pedro@healthtech.com",
        rol: "CEO"
      },
      {
        nombres: "Sofia",
        apellidos: "Vargas",
        email: "sofia@healthtech.com",
        rol: "CMO"
      }
    ]
  }
];

export async function GET() {
  try {
    // En producción, esto vendría de la base de datos
    // const startups = await prisma.startup.findMany({
    //   include: {
    //     convocatoria: { select: { title: true } },
    //     miembrosEquipo: { select: { nombres: true, apellidos: true, email: true, rol: true } }
    //   },
    //   orderBy: { createdAt: 'desc' }
    // });
    
    return NextResponse.json(mockStartups);
  } catch (error) {
    console.error('Error fetching startups:', error);
    return NextResponse.json({ error: 'Error al obtener las postulaciones' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, estado } = body;

    // En producción, esto actualizaría la base de datos
    // const startup = await prisma.startup.update({
    //   where: { id },
    //   data: { estado }
    // });

    // Mock de respuesta exitosa
    const updatedStartup = mockStartups.find(s => s.id === id);
    if (updatedStartup) {
      updatedStartup.estado = estado;
    }
    
    return NextResponse.json({ success: true, message: 'Estado actualizado correctamente' });
  } catch (error) {
    console.error('Error updating startup:', error);
    return NextResponse.json({ error: 'Error al actualizar la postulación' }, { status: 500 });
  }
}
