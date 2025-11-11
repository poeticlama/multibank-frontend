import React, { type ChangeEvent, useState } from 'react';
import { FormInput } from './FormInput';
import { Button } from '../shared/LoadingButton';

type RegisterFormData = {
  login: string;
  password: string;
  confirmPassword: string;
};

type RegisterFormProps = {
  onSubmit: (data: RegisterFormData) => Promise<void>;
  loading?: boolean;
  error?: string;
};

export const RegisterForm = ({ onSubmit, loading = false, error = '' }: RegisterFormProps) => {
  const [formData, setFormData] = useState<RegisterFormData>({
    login: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <FormInput
        label='Логин'
        type='text'
        name='login'
        value={formData.login}
        onChange={handleChange}
        placeholder='Введите логин'
        required
        autoComplete='username'
      />

      <FormInput
        label='Пароль'
        type='password'
        name='password'
        value={formData.password}
        onChange={handleChange}
        placeholder='Введите пароль'
        required
        minLength={6}
        autoComplete='new-password'
      >
        <p className='mt-1 text-sm text-gray-500'>Минимум 6 символов</p>
      </FormInput>

      <FormInput
        label='Подтвердите пароль'
        type='password'
        name='confirmPassword'
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder='Повторите пароль'
        required
        minLength={6}
        autoComplete='new-password'
      />

      <Button type='submit' loading={loading} disabled={loading}>
        Зарегистрироваться
      </Button>

      {error && <p className='flex justify-center text-sm text-red-500'>{error}</p>}
    </form>
  );
};
