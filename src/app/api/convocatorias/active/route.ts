import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    console.log('Fetching active convocatoria...');
    
    // Buscar la convocatoria activa y principal
    const convocatoria = await prisma.$queryRaw`
      SELECT *, COALESCE(principal, false) as principal 
      FROM convocatorias 
      WHERE status = 'ACTIVA' AND principal = true
      LIMIT 1
    `;
    
    const result = Array.isArray(convocatoria) ? convocatoria[0] : null;
    
    console.log('Active convocatoria found:', result);
    
    return NextResponse.json(result || null);
  } catch (error) {
    console.error('Error fetching active convocatoria:', error);
    return NextResponse.json({ error: 'Error al obtener la convocatoria activa' }, { status: 500 });
  }
}
