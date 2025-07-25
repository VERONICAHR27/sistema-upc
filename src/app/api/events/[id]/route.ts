import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, date, time, location, type, status, featured } = body;

    const updatedEvent = await prisma.event.update({
      where: { id: id },
      data: {
        title,
        date,
        time,
        location,
        type,
        status,
        featured,
        updatedAt: new Date()
      }
    });

    return NextResponse.json(updatedEvent);
  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json({ error: 'Error al actualizar el evento' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.event.delete({
      where: { id: id }
    });
    
    return NextResponse.json({ message: 'Evento eliminado correctamente' });
  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json({ error: 'Error al eliminar el evento' }, { status: 500 });
  }
}
