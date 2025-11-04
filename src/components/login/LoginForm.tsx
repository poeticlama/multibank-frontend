import React, { useState } from 'react';
import { FormInput } from './FormInput';
import { Checkbox } from './Checkbox';
import { Button } from '../shared/LoadingButton';


interface LoginFormData {
  login: string;
  password: string;
}

interface LoginFormProps {
  onSubmit: (data: LoginFormData, rememberMe: boolean) => Promise<void>;
  loading?: boolean;
  error?: string;
}


export const LoginForm: React.FC<LoginFormProps> = ({ 
  onSubmit, 
  loading = false, 
  error = '' 
}) => {
  const [formData, setFormData] = useState<LoginFormData>({
    login: '',
    password: ''
  });
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData, rememberMe);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormInput
        label="Имя пользователя"
        type="text"
        name="login"
        value={formData.login}
        onChange={handleChange}
        placeholder="Введите ваше имя"
        required
        autoComplete="username"
      />

      <FormInput
        label="Пароль"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Введите пароль"
        required
        autoComplete="current-password"
      />

      <Checkbox
        label="Запомнить меня"
        name="rememberMe"
        checked={rememberMe}
        onChange={(e) => setRememberMe(e.target.checked)}
      />

      <Button
        type="submit"
        disabled={loading}
      >
        Войти
      </Button>

      {error && (
        <p className="flex justify-center text-sm text-red-500">
          {error}
        </p>
      )}
    </form>
  );
};