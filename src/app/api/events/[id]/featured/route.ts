import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    // Quitar featured de todos los eventos primero
    await prisma.event.updateMany({
      data: { featured: false }
    });

    // Destacar solo este evento
    const updatedEvent = await prisma.event.update({
      where: { id: id },
      data: { featured: true }
    });

    return NextResponse.json({
      ...updatedEvent,
      message: 'Evento destacado correctamente'
    });
  } catch (error) {
    console.error('Error setting featured event:', error);
    return NextResponse.json({ error: 'Error al destacar el evento' }, { status: 500 });
  }
}
