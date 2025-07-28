'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type User = {
  id: string;
  username: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void; // <-- added this line
  loading: boolean;
  error: string | null;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {}, // <-- default no-op
  loading: true,
  error: null,
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const logout = async () => {
    await axios.post('/api/logout', {}, { withCredentials: true });
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, error, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
