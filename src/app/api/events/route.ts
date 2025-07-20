import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Event = {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  type: string;
  status: string;
  featured: boolean;
  attendees: number;
};

// Storage temporal en memoria (comentado para usar base de datos)
// const events: Event[] = [];
// let nextEventId = 1;

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ error: 'Error al obtener los eventos' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, date, time, location, type } = body;

    const newEvent = await prisma.event.create({
      data: {
        title,
        date,
        time,
        location,
        type,
        status: 'ACTIVO',
        featured: false
      }
    });
    
    return NextResponse.json(newEvent);
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json({ error: 'Error al crear el evento' }, { status: 500 });
  }
}
