type LoaderSize = 'sm' | 'md' | 'lg';
type LoaderColor = 'blue' | 'indigo' | 'purple' | 'pink' | 'green' | 'red' | 'yellow';

type LoaderProps = {
  size?: LoaderSize;
  color?: LoaderColor;
  className?: string;
};

const Loader = ({ size = 'md', color = 'blue', className = '' }: LoaderProps) => {
  const sizeClasses: Record<LoaderSize, string> = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const colorClasses: Record<LoaderColor, string> = {
    blue: 'text-blue-500',
    indigo: 'text-indigo-500',
    purple: 'text-purple-500',
    pink: 'text-pink-500',
    green: 'text-green-500',
    red: 'text-red-500',
    yellow: 'text-yellow-500',
  };

  return (
    <div className={`flex h-96 items-center justify-center ${className}`}>
      <div
        className={`
          ${sizeClasses[size]}
          ${colorClasses[color]}
          animate-spin rounded-full
          border-4 border-solid border-current border-t-transparent
        `}
        role='status'
        aria-label='Loading'
      >
        <span className='sr-only'>Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
