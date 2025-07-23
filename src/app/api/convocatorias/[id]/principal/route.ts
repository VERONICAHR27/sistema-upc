import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log('Marcando como principal:', id);

    // Primero, desmarcar todas las demás como principal
    await prisma.$executeRaw`
      UPDATE convocatorias SET principal = false WHERE status = 'ACTIVA'
    `;

    // Luego, marcar esta como principal y activarla si no está activa
    const result = await prisma.$queryRaw`
      UPDATE convocatorias 
      SET principal = true, status = 'ACTIVA', "updatedAt" = NOW()
      WHERE id = ${id}
      RETURNING *
    `;

    const updatedConvocatoria = Array.isArray(result) ? result[0] : result;
    
    console.log('Convocatoria marcada como principal:', updatedConvocatoria);
    
    return NextResponse.json(updatedConvocatoria);
  } catch (error) {
    console.error('Error marking as principal:', error);
    return NextResponse.json({ error: 'Error al marcar como principal' }, { status: 500 });
  }
}
