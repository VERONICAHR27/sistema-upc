'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Convocatoria = {
  id: number;
  title: string;
  status: 'Activa' | 'Cerrada' | 'Borrador';
  applicants: number;
  deadline: string;
  type: string;
  cronograma?: { date: string; title: string; status: string }[];
};

type ConvocatoriaContextType = {
  convocatorias: Convocatoria[];
  addConvocatoria: (convocatoria: Convocatoria) => void;
  getActiva: () => Convocatoria | undefined;
  getHistorial: () => Convocatoria[];
  activarConvocatoria: (id: number) => void;
  editarConvocatoria: (id: number, data: Partial<Convocatoria>) => void;
  eliminarConvocatoria: (id: number) => void;
};

const ConvocatoriaContext = createContext<ConvocatoriaContextType | undefined>(undefined);

// ⛔️ Elimina el contenido estático inicial, deja el array vacío
const initialConvocatorias: Convocatoria[] = [];

export function ConvocatoriaProvider({ children }: { children: ReactNode }) {
  const [convocatorias, setConvocatorias] = useState<Convocatoria[]>(() => {
    // Leer de localStorage si existe
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('convocatorias');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          localStorage.removeItem('convocatorias');
        }
      }
    }
    return initialConvocatorias;
  });

  // Guardar en localStorage cada vez que cambian las convocatorias
  useEffect(() => {
    localStorage.setItem('convocatorias', JSON.stringify(convocatorias));
  }, [convocatorias]);

  const addConvocatoria = (convocatoria: Convocatoria) => {
    setConvocatorias(prev => [convocatoria, ...prev]);
  };

  const getActiva = () => convocatorias.find(c => c.status === 'Activa');
  const getHistorial = () => convocatorias.filter(c => c.status !== 'Activa');

  const activarConvocatoria = (id: number) => {
    setConvocatorias(prev =>
      prev.map(c =>
        c.id === id
          ? { ...c, status: 'Activa' }
          : c.status === 'Activa'
            ? { ...c, status: 'Cerrada' }
            : c
      )
    );
  };

  const editarConvocatoria = (id: number, data: Partial<Convocatoria>) => {
    setConvocatorias(prev =>
      prev.map(c => c.id === id ? { ...c, ...data } : c)
    );
  };

  const eliminarConvocatoria = (id: number) => {
    setConvocatorias(prev => prev.filter(c => c.id !== id));
  };

  return (
    <ConvocatoriaContext.Provider value={{ convocatorias, addConvocatoria, getActiva, getHistorial, activarConvocatoria, editarConvocatoria, eliminarConvocatoria }}>
      {children}
    </ConvocatoriaContext.Provider>
  );
}

export function useConvocatorias() {
  const context = useContext(ConvocatoriaContext);
  if (!context) throw new Error('useConvocatorias debe usarse dentro de ConvocatoriaProvider');
  return context;
}