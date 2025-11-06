import React, { useState, useEffect } from 'react';
import type { User } from '../types/account-types.ts';
import mockUsers from './users-mock.ts';

interface AuthContextType {
  user: User | null;
  login: (login: string, password: string, rememberMe: boolean) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
  switchStatus: () => void;
}

// Context для авторизации
export const AuthContext = React.createContext<AuthContextType>({
  user: null,
  login: async () => false,
  logout: () => {},
  isAuthenticated: false,
  loading: false,
  switchStatus: () => {},
});

export const registrate = ( login: string, password: string ) => {
  mockUsers.push(
    { id: mockUsers.length, login: login, password: password, name: login, status: "DEFAULT" },
  )
  return true;
};

// Hook для использования auth context
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  return context;
};


// Провайдер авторизации
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Проверяем сохраненные данные при загрузке
    const savedUser = localStorage.getItem('bankUser') || sessionStorage.getItem('bankUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing user data:', error);
        // Очищаем поврежденные данные
        localStorage.removeItem('bankUser');
        sessionStorage.removeItem('bankUser');
      }
    }
    setLoading(false);
  }, []);

  const login = async (login: string, password: string, rememberMe: boolean): Promise<boolean> => {
    // Поиск пользователя в mock данных
    const foundUser = mockUsers.find(
      user => user.login === login && user.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      if (rememberMe) {
        localStorage.setItem('bankUser', JSON.stringify(foundUser));
      } else {
        sessionStorage.setItem('bankUser', JSON.stringify(foundUser));
      }
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('bankUser');
    sessionStorage.removeItem('bankUser');
  };

  const switchStatus = () => {
    if (!user) return;

    const newStatus = user.status === "PREMIUM" ? "DEFAULT" : "PREMIUM";

    setUser((user) => user?  {...user, status: newStatus} : null);

    if (localStorage.getItem('bankUser')) {
      localStorage.setItem('bankUser', JSON.stringify({...user, status: newStatus}));
    }
    if (sessionStorage.getItem('bankUser')) {
      sessionStorage.setItem('bankUser', JSON.stringify({...user, status: newStatus}));
    }
  }

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    loading,
    switchStatus,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
