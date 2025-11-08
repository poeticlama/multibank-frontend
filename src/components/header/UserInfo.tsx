import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/auth/useAuth.ts';

const UserInfo = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Закрытие меню при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleUserClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
  };

  const handleNavigatePremium = () => {
    navigate('/account/premium');
    setIsMenuOpen(false);
  };

  return (
    <div className='relative' ref={menuRef}>
      <button
        onClick={handleUserClick}
        className='flex items-center gap-4 py-2 px-5 rounded-lg bg-white hover:bg-blue-200 transition-colors'
      >
        <span className='text-blue-900 font-semibold text-md'>{user?.username}</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='25'
          height='25'
          fill='currentColor'
          className='bi bi-person'
          viewBox='0 0 16 16'
        >
          <path d='M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z' />
        </svg>
      </button>

      {isMenuOpen && (
        <div className='absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50'>
          <button
            onClick={handleNavigatePremium}
            className='w-full px-4 py-2 text-left text-blue-900 hover:bg-gray-100 transition-colors cursor-pointer'
          >
            Мой аккаунт
          </button>
          <button
            onClick={handleLogout}
            className='w-full px-4 py-2 text-left text-blue-900 hover:bg-gray-100 transition-colors cursor-pointer'
          >
            Выйти из системы
          </button>
        </div>
      )}
    </div>
  );
};

export default UserInfo;