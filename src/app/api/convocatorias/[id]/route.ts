import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type CronoEtapa = {
  title: string;
  desde: string;
  hasta: string;
  status: string;
};

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const convocatoria = await prisma.convocatoria.findUnique({
      where: { id: params.id }
    });

    if (!convocatoria) {
      return NextResponse.json({ error: 'Convocatoria no encontrada' }, { status: 404 });
    }

    return NextResponse.json(convocatoria);
  } catch (error) {
    console.error('Error fetching convocatoria:', error);
    return NextResponse.json({ error: 'Error al obtener la convocatoria' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { title, deadline, type, basesUrl, cronograma, status, principal } = body;

    console.log('Updating convocatoria:', params.id, body);

    // Preparar los datos para la actualización
    const updateData: {
      title?: string;
      deadline?: string;
      type?: string;
      basesUrl?: string;
      cronograma?: CronoEtapa[];
      status?: string;
    } = {};
    
    if (title !== undefined) updateData.title = title;
    if (deadline !== undefined) updateData.deadline = deadline;
    if (type !== undefined) updateData.type = type;
    if (basesUrl !== undefined) updateData.basesUrl = basesUrl;
    if (cronograma !== undefined) updateData.cronograma = cronograma;
    if (status !== undefined) updateData.status = status;

    // Si se está marcando como principal, primero desmarcar todas las demás
    if (principal === true) {
      await prisma.$executeRaw`
        UPDATE convocatorias SET principal = false WHERE status = 'ACTIVA'
      `;
    }

    // Usar SQL raw para la actualización si incluye principal
    if (principal !== undefined) {
      const result = await prisma.$queryRaw`
        UPDATE convocatorias 
        SET 
          title = COALESCE(${title}, title),
          deadline = COALESCE(${deadline}, deadline),
          type = COALESCE(${type}, type),
          "basesUrl" = COALESCE(${basesUrl}, "basesUrl"),
          cronograma = COALESCE(${cronograma ? JSON.stringify(cronograma) : null}::json, cronograma),
          status = COALESCE(${status}, status),
          principal = COALESCE(${principal}, principal),
          "updatedAt" = NOW()
        WHERE id = ${params.id}
        RETURNING *
      `;
      
      const updatedConvocatoria = Array.isArray(result) ? result[0] : result;
      return NextResponse.json(updatedConvocatoria);
    } else {
      // Usar Prisma normal si no incluye principal
      const updatedConvocatoria = await prisma.convocatoria.update({
        where: { id: params.id },
        data: updateData
      });

      return NextResponse.json(updatedConvocatoria);
    }
  } catch (error) {
    console.error('Error updating convocatoria:', error);
    return NextResponse.json({ error: 'Error al actualizar la convocatoria' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log('Deleting convocatoria:', params.id);

    await prisma.convocatoria.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ message: 'Convocatoria eliminada exitosamente' });
  } catch (error) {
    console.error('Error deleting convocatoria:', error);
    return NextResponse.json({ error: 'Error al eliminar la convocatoria' }, { status: 500 });
  }
}
