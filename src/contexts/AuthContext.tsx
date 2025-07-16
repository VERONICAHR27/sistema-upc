'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// ✅ Actualiza el tipo User para incluir lastname y password
export type User = {
  id: number;
  name: string;
  lastname: string;
  email: string;
  password: string;
  role: 'Coordinador' | 'Usuario' | 'Startup';
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Usuarios de ejemplo para simular autenticación
const MOCK_USERS: User[] = [
  { 
    id: 1, 
    name: 'Veronica',
    lastname: 'H.',
    email: 'admin@startupc.com', 
    password: '123456', 
    role: 'Coordinador'
  },
  { 
    id: 2, 
    name: 'Johel',
    lastname: 'C.',
    email: 'johel@startupc.com', 
    password: '123456', 
    role: 'Coordinador'
  },
  { 
    id: 3, 
    name: 'EcoSolutions',
    lastname: 'Team',
    email: 'startup@test.com', 
    password: '123456', 
    role: 'Startup'
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
    await new Promise(resolve => setTimeout(resolve, 1000));
    const foundUser = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );
    if (foundUser) {
      const { ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
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