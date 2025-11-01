import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registrate } from '../mocks/LoginMockContext.tsx';


const Register: React.FC = () => {

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    login: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (error) setError('');
  };


  const handleSubmit = async (e: React.FormEvent) => {

    if (!(loading)){

      e.preventDefault();
      setLoading(true);
      setError('');
      console.log("=======")

      try {
        const success = await registrate(formData.login, formData.password);
        
        if (success) {
          console.log('вход');
          navigate('/login');
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
        <h2 className="text-4xl font-bold text-center mb-8">Регистрация</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="login-field" className="block text-sm font-medium text-gray-700 mb-2">
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
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Пароль
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
              placeholder="Введите пароль"
            />
            <p className="mt-1 text-sm text-gray-500">Минимум 6 символов</p>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Подтвердите пароль
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
              placeholder="Повторите пароль"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Зарегистрироваться
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Уже есть аккаунт?{' '}
            <a 
              href="/login" 
              className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
            >
              Войдите
            </a>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Register;