import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/login/Card';
import { LoginForm } from '../components/login/LoginForm';
import { RegisterLink } from '../components/login/RegisterLink';
import { useAuth } from '../hooks/auth/useAuth.ts';

type LoginFormData = {
  login: string;
  password: string;
};

const LoginPage = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLoginSubmit = async (formData: LoginFormData, rememberMe: boolean) => {
    if (loading) return;

    setLoading(true);
    setError('');

    try {
      const success = await login(formData.login, formData.password, rememberMe);

      if (success) {
        console.log('Вход выполнен успешно');
        navigate('/account');
      } else {
        setError('Неверное имя пользователя или пароль');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка при входе');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8'>
      <Card>
        <h2 className='text-4xl font-bold text-center mb-8'>Вход</h2>

        <LoginForm onSubmit={handleLoginSubmit} loading={loading} error={error} />

        <RegisterLink />
      </Card>
    </main>
  );
};

export default LoginPage;
