import React, { useState } from 'react';
import { useAuth } from '../mocks/LoginMockContext.tsx';
import { useNavigate } from 'react-router-dom';



const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    login: '',
    password: ''
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();




  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (error) setError('');

  };

  const handleRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = async (e: React.FormEvent) => {

    if (!(loading)){

      e.preventDefault();
      setLoading(true);
      setError('');
      console.log("---------")

      try {
        const success = await login(formData.login, formData.password, rememberMe);
        
        if (success) {
          console.log('вход');
          navigate('/account');
        } else {
          setError('Неверное имя пользователя или пароль');
        }
      } catch (err) {
        setError('Error: ' + err);  //Это надо как-то нормально переделать
      } finally {
        setLoading(false);
      }

    }
  };




  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 text-blue-900">
        <h2 className="text-4xl font-bold text-center mb-8">Вход</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="login-field" className="block text-sm font-medium text-blue-900 mb-2">
              Имя пользователя
            </label>
            <input
              type="text"
              id="login-field"
              name="login"
              value={formData.login}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
              placeholder="Введите ваше имя"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-blue-900 mb-2">
              Пароль
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
              placeholder="Введите пароль"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={handleRememberMeChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
              Запомнить меня
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Войти
          </button>
          {(error.length > 0) && <p className="flex justify-center text-sm text-red-500">{error}</p>}
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Нет аккаунта?{' '}
            <a 
              href="/src/pages/RegisterPage"
              className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
            >
              Зарегистрируйтесь
            </a>
          </p>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;