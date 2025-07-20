'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Convocatoria = {
  id: string;
  title: string;
  status: 'ACTIVA' | 'CERRADA' | 'BORRADOR';
  principal?: boolean;
  deadline: string;
  type: string;
  basesUrl?: string;
  cronograma?: { 
    date?: string; 
    title: string; 
    status?: string; 
    desde?: string; 
    hasta?: string 
  }[];
  createdAt?: string;
  updatedAt?: string;
};

type ConvocatoriaContextType = {
  convocatorias: Convocatoria[];
  addConvocatoria: (convocatoria: Omit<Convocatoria, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  getActiva: () => Convocatoria | undefined;
  getPrincipal: () => Convocatoria | undefined;
  getActivas: () => Convocatoria[];
  getHistorial: () => Convocatoria[];
  activarConvocatoria: (id: string) => Promise<void>;
  marcarPrincipal: (id: string) => Promise<void>;
  activarYMarcarPrincipal: (id: string) => Promise<void>;
  editarConvocatoria: (id: string, data: Partial<Convocatoria>) => Promise<void>;
  eliminarConvocatoria: (id: string) => Promise<void>;
  reloadConvocatorias: () => Promise<void>;
  loading: boolean;
};

const ConvocatoriaContext = createContext<ConvocatoriaContextType | undefined>(undefined);

export function ConvocatoriaProvider({ children }: { children: ReactNode }) {
  const [convocatorias, setConvocatorias] = useState<Convocatoria[]>([]);
  const [loading, setLoading] = useState(true);

  // Cargar convocatorias desde la base de datos
  const loadConvocatorias = async () => {
    try {
      const response = await fetch('/api/convocatorias');
      if (response.ok) {
        const data = await response.json();
        console.log('Convocatorias cargadas:', data);
        setConvocatorias(data);
      }
    } catch (error) {
      console.error('Error loading convocatorias:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConvocatorias();
  }, []);

  const addConvocatoria = async (convocatoria: Omit<Convocatoria, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      console.log('Adding convocatoria:', convocatoria);
      
      const response = await fetch('/api/convocatorias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(convocatoria)
      });
      
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response text:', errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
      
      const responseData = await response.json();
      console.log('Response data:', responseData);
      
      console.log('Reloading convocatorias...');
      await loadConvocatorias(); // Recargar todas las convocatorias para reflejar el estado actual
    } catch (error) {
      console.error('Error adding convocatoria:', error);
      if (error instanceof Error) {
        if (error.message.includes('Unexpected end of JSON input')) {
          console.error('Server returned empty response. Check if the API is working.');
        }
      }
      throw error; // Re-throw para que el componente pueda manejarlo
    }
  };

  const getActiva = () => {
    // Buscar la convocatoria activa y principal
    const activa = convocatorias.find(c => c.status === 'ACTIVA' && c.principal);
    console.log('getActiva result:', activa);
    console.log('All convocatorias:', convocatorias);
    console.log('Active convocatorias:', convocatorias.filter(c => c.status === 'ACTIVA'));
    console.log('Principal convocatorias:', convocatorias.filter(c => c.principal));
    return activa;
  };

  const getPrincipal = () => convocatorias.find(c => c.status === 'ACTIVA' && c.principal);
  const getActivas = () => convocatorias.filter(c => c.status === 'ACTIVA');
  const getHistorial = () => convocatorias.filter(c => c.status !== 'ACTIVA');

  const activarConvocatoria = async (id: string) => {
    try {
      const response = await fetch(`/api/convocatorias/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'ACTIVA' })
      });
      
      if (response.ok) {
        await loadConvocatorias(); // Recargar para reflejar cambios
      }
    } catch (error) {
      console.error('Error activating convocatoria:', error);
    }
  };

  const marcarPrincipal = async (id: string) => {
    try {
      console.log('Marcando como principal:', id);
      const response = await fetch(`/api/convocatorias/${id}/principal`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (response.ok) {
        console.log('Principal marcado exitosamente');
        await loadConvocatorias(); // Recargar para reflejar cambios
      } else {
        console.error('Error response:', await response.text());
      }
    } catch (error) {
      console.error('Error marking as principal:', error);
    }
  };

  const activarYMarcarPrincipal = async (id: string) => {
    try {
      console.log('Activando y marcando como principal:', id);
      
      // Primero activar
      const activateResponse = await fetch(`/api/convocatorias/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'ACTIVA' })
      });
      
      if (!activateResponse.ok) {
        throw new Error('Error al activar convocatoria');
      }
      
      // Luego marcar como principal
      const principalResponse = await fetch(`/api/convocatorias/${id}/principal`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (!principalResponse.ok) {
        throw new Error('Error al marcar como principal');
      }
      
      console.log('Convocatoria activada y marcada como principal exitosamente');
      await loadConvocatorias();
    } catch (error) {
      console.error('Error activating and marking as principal:', error);
      throw error;
    }
  };

  const editarConvocatoria = async (id: string, data: Partial<Convocatoria>) => {
    try {
      const response = await fetch(`/api/convocatorias/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        await loadConvocatorias();
      }
    } catch (error) {
      console.error('Error editing convocatoria:', error);
    }
  };

  const eliminarConvocatoria = async (id: string) => {
    try {
      const response = await fetch(`/api/convocatorias/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        setConvocatorias(prev => prev.filter(c => c.id !== id));
      }
    } catch (error) {
      console.error('Error deleting convocatoria:', error);
    }
  };

  return (
    <ConvocatoriaContext.Provider value={{ 
      convocatorias, 
      addConvocatoria, 
      getActiva, 
      getPrincipal,
      getActivas,
      getHistorial, 
      activarConvocatoria, 
      marcarPrincipal,
      activarYMarcarPrincipal,
      editarConvocatoria, 
      eliminarConvocatoria,
      reloadConvocatorias: loadConvocatorias,
      loading
    }}>
      {children}
    </ConvocatoriaContext.Provider>
  );
}

export function useConvocatorias() {
  const context = useContext(ConvocatoriaContext);
  if (!context) {
    throw new Error('useConvocatorias debe usarse dentro de ConvocatoriaProvider');
  }
  return context;
}