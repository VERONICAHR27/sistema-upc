import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    console.log('Testing database connection...');
    
    // Test basic connection
    const count = await prisma.convocatoria.count();
    console.log('Total convocatorias count:', count);
    
    // Get all convocatorias with raw SQL
    const convocatorias = await prisma.$queryRaw`
      SELECT id, title, status, principal, deadline, type, "createdAt"
      FROM convocatorias 
      ORDER BY "createdAt" DESC
    `;
    
    console.log('Raw convocatorias:', convocatorias);

    // Also try with Prisma client
    const prismaConvocatorias = await prisma.convocatoria.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    console.log('Prisma convocatorias:', prismaConvocatorias);

    return NextResponse.json({
      success: true,
      totalCount: count,
      rawQuery: convocatorias,
      prismaQuery: prismaConvocatorias,
      message: 'Database connection working'
    });
  } catch (error) {
    console.error('Database test error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Database connection failed', 
        details: error 
      }, 
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
