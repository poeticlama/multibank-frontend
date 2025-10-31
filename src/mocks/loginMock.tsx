import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Mock данные пользователей
const mockUsers = [
  { id: 1, login: 'user1', password: '1111', name: 'Пенис Денисович' },
  { id: 2, login: 'user2', password: '2222', name: 'Иван Говнов' },
  { id: 3, login: 'admin', password: 'admin123', name: 'Админисратор' },
];

// Типы для авторизации
interface User {
  id: number;
  login: string;
  password: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (login: string, password: string, rememberMe: boolean) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Context для авторизации
export const AuthContext = React.createContext<AuthContextType>({
  user: null,
  login: async () => false,
  logout: () => {},
  isAuthenticated: false,
});

// Hook для использования auth context
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  return context;
};

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();


  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, []);


  console.log("isAuthenticated -", isAuthenticated);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Нет аккаунта?{' '}
            <a href="/register" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200">
              Зарегистрируйтесь
            </a>
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export const GuestRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  console.log("isAuthenticated -", isAuthenticated);
  //Тут по хорошему перекидывать на аналогичный ProtectedRoute, чтобы подтягивать данные пльзователя, ну или хз
  return <>{children}</>;
};

// Провайдер авторизации
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

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

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};