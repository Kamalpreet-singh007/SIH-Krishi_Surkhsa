import React from 'react';
import { User } from './types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  accessToken: string;
  refreshToken: string;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
  const [accessToken, setAccesstoken] = React.useState<string>('');
  const [refreshToken, setRefreshtoken] = React.useState<string>('');
  // Mock authentication functions
  const login = async (email: string, password: string) => {
    // In a real app, this would make an API call to authenticate
    try {
      const response = await fetch('http://127.0.0.1:8000/api/users/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setAccesstoken(data.access);
      setRefreshtoken(data.refresh);
      localStorage.setItem('accessToken', data.access);
      localStorage.setItem('refreshToken', data.refresh);

      const User = {
        id: 'user-123',
        name: 'John Doe',
        email,
      };
      setUser(User);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(User));
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: name,
          email: email,
          password: password,
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      await login(email, password);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  // Check if user is already logged in
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        accessToken,
        refreshToken,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
