import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    console.log('Fetching convocatorias...');
    
    // Usar SQL raw para obtener todas las convocatorias con el campo principal
    const convocatorias = await prisma.$queryRaw`
      SELECT *, COALESCE(principal, false) as principal 
      FROM convocatorias 
      ORDER BY "createdAt" DESC
    `;
    
    console.log('Convocatorias found:', convocatorias);
    return NextResponse.json(convocatorias);
  } catch (error) {
    console.error('Error fetching convocatorias:', error);
    return NextResponse.json({ error: 'Error al obtener las convocatorias' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, deadline, type, basesUrl, cronograma } = body;

    console.log('Creating convocatoria:', { title, deadline, type, basesUrl, cronograma });

    if (!title || !deadline || !type) {
      return NextResponse.json({ 
        error: 'Faltan campos requeridos: title, deadline, type' 
      }, { status: 400 });
    }

    // Crear nueva convocatoria usando Prisma
    const newConvocatoria = await prisma.convocatoria.create({
      data: {
        title,
        deadline,
        type,
        basesUrl,
        cronograma: cronograma || [],
        status: 'BORRADOR'
      }
    });

    console.log('Convocatoria created:', newConvocatoria);
    
    return NextResponse.json(newConvocatoria);
  } catch (error) {
    console.error('Error creating convocatoria:', error);
    return NextResponse.json({ 
      error: 'Error al crear la convocatoria', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
