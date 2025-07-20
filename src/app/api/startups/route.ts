import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Startup = {
  id: string;
  nombreComercial: string;
  razonSocial: string;
  estado: string;
  descripcion: string;
  industria: string;
  createdAt: string;
  convocatoria?: {
    title: string;
  };
  miembrosEquipo: {
    nombres: string;
    apellidos: string;
    email: string;
    rol: string;
  }[];
};

// Storage temporal en memoria (comentado para usar base de datos)
// const startups: Startup[] = [];

export async function GET() {
  try {
    const startups = await prisma.startup.findMany({
      include: {
        convocatoria: { select: { title: true } },
        miembrosEquipo: true
      },
      orderBy: { createdAt: 'desc' }
    });
    
    return NextResponse.json(startups);
  } catch (error) {
    console.error('Error fetching startups:', error);
    return NextResponse.json({ error: 'Error al obtener las postulaciones' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, estado } = body;

    const startup = await prisma.startup.update({
      where: { id },
      data: { estado }
    });
    
    return NextResponse.json({ success: true, message: 'Estado actualizado correctamente', data: startup });
  } catch (error) {
    console.error('Error updating startup:', error);
    return NextResponse.json({ error: 'Error al actualizar la postulación' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    return NextResponse.json({ 
      error: 'Use /api/formulario para crear postulaciones' 
    }, { status: 400 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Error en la solicitud' }, { status: 500 });
  }
}
