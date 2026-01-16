import React, { createContext, useContext, useState, useEffect } from 'react';
import { clearGuestName } from '../utils/guest';

export interface AuthUser {
  id: string;
  email: string;
  username: string;
}

interface AuthContextType {
  authUser: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  register: (email: string, password: string, username: string) => Promise<{ token: string; user: AuthUser }>;
  login: (email: string, password: string) => Promise<{ token: string; user: AuthUser }>;
  logout: () => void;
  bootstrap: () => Promise<void>;
  forceGuestMode: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';
const TOKEN_KEY = 'zing_auth_token';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Bootstrap on mount
  useEffect(() => {
    bootstrap();
  }, []);

  const bootstrap = async () => {
    // Check if user explicitly wants to be guest in this tab
    const forceGuestMode = sessionStorage.getItem('zing_force_guest_mode');
    
    if (forceGuestMode === 'true') {
      // User chose "Play as Guest" - skip authentication for this tab only
      setAuthUser(null);
      setToken(null);
      setIsLoading(false);
      return;
    }
    
    const storedToken = localStorage.getItem(TOKEN_KEY);
    if (storedToken) {
      try {
        const res = await fetch(`${BACKEND_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
        if (res.ok) {
          const data = await res.json();
          setAuthUser(data.user);
          setToken(storedToken);
        } else {
          // Token invalid, clear it
          localStorage.removeItem(TOKEN_KEY);
          setAuthUser(null);
          setToken(null);
        }
      } catch (error) {
        console.error('[AUTH] bootstrap error:', error);
        localStorage.removeItem(TOKEN_KEY);
        setAuthUser(null);
        setToken(null);
      }
    }
    setIsLoading(false);
  };

  const register = async (email: string, password: string, username: string) => {
    const res = await fetch(`${BACKEND_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, username }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'registration failed');
    }

    const data = await res.json();
    localStorage.setItem(TOKEN_KEY, data.token);
    setToken(data.token);
    setAuthUser(data.user);
    // Clear guest mode flag and guest name since we're now authenticated
    sessionStorage.removeItem('zing_force_guest_mode');
    clearGuestName();
    return data;
  };

  const login = async (email: string, password: string) => {
    const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'login failed');
    }

    const data = await res.json();
    localStorage.setItem(TOKEN_KEY, data.token);
    setToken(data.token);
    setAuthUser(data.user);
    // Clear guest mode flag and guest name since we're now authenticated
    sessionStorage.removeItem('zing_force_guest_mode');
    clearGuestName();
    
    return data;
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setAuthUser(null);
  };

  const forceGuestMode = () => {
    // Set flag for this tab and clear auth state immediately
    sessionStorage.setItem('zing_force_guest_mode', 'true');
    setToken(null);
    setAuthUser(null);
  };

  return (
    <AuthContext.Provider value={{ authUser, token, isLoading, register, login, logout, bootstrap, forceGuestMode }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
