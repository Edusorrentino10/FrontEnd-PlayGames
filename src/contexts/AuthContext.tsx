import { createContext, ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

interface AuthContextData {
  signIn(credentials: Credentials): Promise<boolean>;
  signOut: () => void;
  isSigningIn: boolean;
  token: string;
  user: User | any;
}

type Credentials = {
  email: string;
  password: string;
};

type User = {
  name: string | null;
  email: string | null;
  password: string | null;
  avatar: string | null;
  id: string | null;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [token, setToken] = useState('');


  useEffect(() => {
    const validateToken = async () => {
        const storageData = localStorage.getItem('authToken');
        if(storageData) {
          const response = await api.post("/users", { token });
            if(response.data) {
                console.log(response.data)
            }
        }
    }
    validateToken();
}, []);

  async function signIn({ email, password }: Credentials): Promise<boolean> {
    try {
      const { data } = await api.post('/auth', {
        email,
        password,
      });
      setIsSigningIn(true);

      const { user, token } = data;
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      localStorage.setItem('token', token);
      setToken(token);
      setUser(user);
      return true;

    } catch (err) {
      console.log('🚀 ~ file: AuthContext.tsx ~ signIn ~ err', err)
      return false;
    }
    finally {
      setIsSigningIn(false);
    }
  }

  async function signOut(): Promise<void> {
    localStorage.removeItem('token');
    setUser(null);
    setToken('');
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        isSigningIn,
        token,
        user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
