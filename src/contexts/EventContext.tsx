'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Event = {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  status: string;
  type: string;
  featured?: boolean;
};

type EventContextType = {
  events: Event[];
  addEvent: (event: Omit<Event, 'id' | 'attendees' | 'featured'>) => Promise<void>;
  editEvent: (id: number, data: Partial<Event>) => Promise<void>;
  deleteEvent: (id: number) => Promise<void>;
  setFeaturedEvent: (id: number) => Promise<void>;
  loading: boolean;
};

const EventContext = createContext<EventContextType | undefined>(undefined);

export function EventProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  // Cargar eventos desde la base de datos
  const loadEvents = async () => {
    try {
      const response = await fetch('/api/events');
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      }
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const addEvent = async (event: Omit<Event, 'id' | 'attendees' | 'featured'>) => {
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
      });
      
      if (response.ok) {
        const newEvent = await response.json();
        setEvents(prev => [newEvent, ...prev]);
      }
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const editEvent = async (id: number, data: Partial<Event>) => {
    try {
      const response = await fetch(`/api/events/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        const updatedEvent = await response.json();
        setEvents(prev => prev.map(e => e.id === id ? updatedEvent : e));
      }
    } catch (error) {
      console.error('Error editing event:', error);
    }
  };

  const deleteEvent = async (id: number) => {
    try {
      const response = await fetch(`/api/events/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        setEvents(prev => prev.filter(e => e.id !== id));
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const setFeaturedEvent = async (id: number) => {
    try {
      const response = await fetch(`/api/events/${id}/featured`, {
        method: 'PUT'
      });
      
      if (response.ok) {
        await loadEvents(); // Recargar para reflejar cambios
      }
    } catch (error) {
      console.error('Error setting featured event:', error);
    }
  };

  return (
    <EventContext.Provider value={{ 
      events, 
      addEvent, 
      editEvent, 
      deleteEvent, 
      setFeaturedEvent,
      loading
    }}>
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventContext);
  if (!context) throw new Error('useEvents debe usarse dentro de EventProvider');
  return context;
}