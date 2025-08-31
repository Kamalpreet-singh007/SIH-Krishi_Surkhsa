import React from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);

  // Mock authentication functions
  const login = async (email: string, password: string) => {
    // In a real app, this would make an API call to authenticate
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const mockUser = {
          id: "user-123",
          name: "Test Farmer",
          email,
        };
        setUser(mockUser);
        setIsAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(mockUser));
        resolve();
      }, 1000);
    });
  };

  const signup = async (name: string, email: string, password: string) => {
    // In a real app, this would make an API call to register
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const mockUser = {
          id: "user-" + Math.floor(Math.random() * 1000),
          name,
          email,
        };
        setUser(mockUser);
        setIsAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(mockUser));
        resolve();
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  // Check if user is already logged in
  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};