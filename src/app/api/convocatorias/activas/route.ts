import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const convocatorias = await prisma.convocatoria.findMany({
      where: {
        status: 'ACTIVA'
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(convocatorias);
  } catch (error) {
    console.error('Error fetching active convocatorias:', error);
    return NextResponse.json({ error: 'Error al obtener convocatorias activas' }, { status: 500 });
  }
}
