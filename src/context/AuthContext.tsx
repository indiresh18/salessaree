import React, { createContext, useContext, useState, useEffect } from 'react';
import { OWNER_PASSWORD } from '../config/authConfig';
import { getAdminAuthStatus, setAdminAuthStatus } from '../utils/storage';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => getAdminAuthStatus());

  useEffect(() => {
    setIsAuthenticated(getAdminAuthStatus());
  }, []);

  const login = (password: string): boolean => {
    if (password === OWNER_PASSWORD) {
      setAdminAuthStatus(true);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setAdminAuthStatus(false);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
