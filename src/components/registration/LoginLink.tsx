export const LoginLink: React.FC = () => {
  return (
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
  );
};