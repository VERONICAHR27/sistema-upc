import { NextRequest, NextResponse } from 'next/server';

// Datos mock para demostración
const mockEvents = [
  {
    id: 1,
    title: "Conferencia de Innovación Tecnológica",
    date: "2025-08-15",
    time: "09:00",
    location: "Auditorio UPC",
    type: "Conferencia",
    status: "ACTIVO",
    featured: true,
    attendees: 150
  },
  {
    id: 2,
    title: "Workshop de Emprendimiento Digital",
    date: "2025-08-20",
    time: "14:00",
    location: "Sala de Conferencias",
    type: "Workshop",
    status: "ACTIVO",
    featured: false,
    attendees: 75
  }
];

export async function GET() {
  try {
    // En producción, esto vendría de la base de datos
    // const events = await prisma.event.findMany({...});
    
    return NextResponse.json(mockEvents);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ error: 'Error al obtener los eventos' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, date, time, location, type } = body;

    const newEvent = {
      id: Date.now(), // ID temporal
      title,
      date,
      time,
      location,
      type,
      status: 'ACTIVO',
      featured: false,
      attendees: 0
    };

    // En producción, esto se guardaría en la base de datos
    // const event = await prisma.event.create({...});
    
    return NextResponse.json(newEvent);
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json({ error: 'Error al crear el evento' }, { status: 500 });
  }
}
