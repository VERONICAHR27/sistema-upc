import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    console.log('Testing database connection...');
    
    // Test basic connection
    const count = await prisma.convocatoria.count();
    console.log('Database connected, convocatorias count:', count);
    
    return NextResponse.json({
      success: true,
      message: 'API funcionando correctamente',
      convocatoriasCount: count,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Database test error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Error de conexión a la base de datos', 
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
