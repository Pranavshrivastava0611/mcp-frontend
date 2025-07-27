'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type User = {
  id: string;
  name: string;
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

  // Uncomment when you want to auto-fetch user session on load
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const res = await axios.get('/api/me', { withCredentials: true });
  //       setUser(res.data.user);
  //     } catch (err: any) {
  //       console.error(err);
  //       setUser(null);
  //       setError(err.response?.data?.message || 'Failed to fetch user');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchUser();
  // }, []);

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
