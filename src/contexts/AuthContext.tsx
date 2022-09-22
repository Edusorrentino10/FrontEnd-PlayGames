import { createContext, ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

interface AuthContextData {
  signIn(credentials: Credentials): Promise<boolean>;
  signOut: () => void;
  isSigningIn: boolean;
  token: string;
  user: User | undefined;
}

type Credentials = {
  email: string;
  password: string;
};

type User = {
  name: string;
  email: string;
  password: string
  avatar: string
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [token, setToken] = useState('');

  async function signIn({ email, password }: Credentials): Promise<boolean> {
    try {
      setIsSigningIn(true);
      const { data } = await api.post('/auth', {
        email,
        password,
      });

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
