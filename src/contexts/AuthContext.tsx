'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type User = {
  id: number;
  name: string;
  email: string;
  role: 'Coordinador' | 'Startup';
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Usuarios de ejemplo para simular autenticación
const MOCK_USERS = [
  { 
    id: 1, 
    name: 'Veronica H.', 
    email: 'admin@startupc.com', 
    password: '123456', 
    role: 'Coordinador' as const 
  },
  { 
    id: 2, 
    name: 'Johel C.', 
    email: 'johel@startupc.com', 
    password: '123456', 
    role: 'Coordinador' as const 
  },
  { 
    id: 3, 
    name: 'EcoSolutions Team', 
    email: 'startup@test.com', 
    password: '123456', 
    role: 'Startup' as const 
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Verificar si hay usuario en localStorage al cargar
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );
    
    if (foundUser) {
      const { ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      // ✅ Guardar en localStorage para persistencia
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}