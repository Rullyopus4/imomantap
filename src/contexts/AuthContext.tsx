import React, { createContext, useContext, useEffect, useState } from 'react';
import { usersMockData } from '../data/mockData';

export type User = {
  id: string;
  username: string;
  name: string;
  role: 'admin' | 'nurse' | 'patient';
  email?: string;
  avatar?: string;
};

type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('imoMantapUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse stored user', e);
        localStorage.removeItem('imoMantapUser');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll use mock data
      const foundUser = usersMockData.find(
        u => u.username === username && password === '123456' // Simple password for demo
      );
      
      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem('imoMantapUser', JSON.stringify(foundUser));
        return true;
      } else {
        setError('Username atau password salah');
        return false;
      }
    } catch (err) {
      setError('Terjadi kesalahan, silakan coba lagi');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('imoMantapUser');
  };

  const value = {
    user,
    login,
    logout,
    isLoading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};