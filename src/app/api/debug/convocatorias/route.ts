import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const convocatorias = await prisma.convocatoria.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({
      count: convocatorias.length,
      convocatorias: convocatorias
    });
  } catch (error) {
    console.error('Error fetching convocatorias for debug:', error);
    return NextResponse.json({ error: 'Error al obtener convocatorias' }, { status: 500 });
  }
}
