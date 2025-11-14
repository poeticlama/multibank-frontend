import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterForm } from '../components/register/RegisterForm';
import { LoginLink } from '../components/register/LoginLink';
import { useAuth } from '../hooks/useAuth.ts';
import { ContentCard } from '../components/shared/ContentCard.tsx';

type RegisterFormData = {
  login: string;
  password: string;
  confirmPassword: string;
};

const RegisterPage = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleRegisterSubmit = async (formData: RegisterFormData) => {
    if (loading) return;

    // Валидация паролей
    if (formData.password !== formData.confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    if (formData.password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const success = await register(formData.login, formData.password);

      if (success) {
        console.log('Регистрация успешна');
        navigate('/account');
      } else {
        setError('Пользователь с таким именем уже существует');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка при регистрации');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8'>
      <ContentCard>
        <h2 className='text-4xl font-bold text-center mb-8'>Регистрация</h2>
        <RegisterForm onSubmit={handleRegisterSubmit} loading={loading} error={error} />
        <LoginLink />
      </ContentCard>
    </main>
  );
};

export default RegisterPage;
