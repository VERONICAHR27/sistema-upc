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
  featured?: boolean; // Nuevo campo
};

type EventContextType = {
  events: Event[];
  addEvent: (event: Event) => void;
  editEvent: (id: number, data: Partial<Event>) => void;
  deleteEvent: (id: number) => void;
  setFeaturedEvent: (id: number) => void;
};

const EventContext = createContext<EventContextType | undefined>(undefined);

export function EventProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<Event[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('events');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          localStorage.removeItem('events');
        }
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const addEvent = (event: Event) => setEvents(prev => [{ ...event, featured: false }, ...prev]);
  const editEvent = (id: number, data: Partial<Event>) =>
    setEvents(prev => prev.map(e => e.id === id ? { ...e, ...data } : e));
  const deleteEvent = (id: number) =>
    setEvents(prev => prev.filter(e => e.id !== id));
  const setFeaturedEvent = (id: number) =>
    setEvents(prev => prev.map(e => ({ ...e, featured: e.id === id })));

  return (
    <EventContext.Provider value={{ events, addEvent, editEvent, deleteEvent, setFeaturedEvent }}>
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventContext);
  if (!context) throw new Error('useEvents debe usarse dentro de EventProvider');
  return context;
}