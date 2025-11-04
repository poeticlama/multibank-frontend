interface PaymentHeaderProps {
  title: string;
}

export const PaymentHeader: React.FC<PaymentHeaderProps> = ({ title }) => {
  return (
    <header className="mb-8 border-b border-gray-200 pb-4">
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
    </header>
  );
};