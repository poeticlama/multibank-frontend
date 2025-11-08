import React, { useCallback, useEffect, useRef } from 'react';

interface RequisitesProps {
  isOpen: boolean;
  setIsModalOpen: (arg0: boolean) => void,
  accountData: {
    identification: string;
    name: string;
    /*bankName?: string;
    bik?: string;
    correspondentAccount?: string;*/
  };
}

const Requisites = ({ isOpen, setIsModalOpen, accountData }: RequisitesProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const onClose = useCallback(() => {
    setIsModalOpen(false);
  }, [setIsModalOpen]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const requisites = [
    { label: 'Владелец', value: accountData.name },
    { label: 'Идентификатор', value: accountData.identification },
    //{ label: 'Банк', value: accountData.bankName || 'Мультибанк' },
    //{ label: 'БИК', value: accountData.bik || '044525999' },
    //{ label: 'Корр. счет', value: accountData.correspondentAccount || '30101810000000000999' },
  ];

  const handleCopyRequisites = async () => {
    const requisitesText = requisites.map(item => `${item.label}: ${item.value}`).join('\n');
    try {
      await navigator.clipboard.writeText(requisitesText);
    } catch (err) {
      console.error('Ошибка копирования: ', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-black/20 to-black/40 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-xl max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()} // Предотвращаем закрытие при клике внутри модалки
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-blue-900">Реквизиты счета</h3>
        </div>

        <div className="space-y-4 mb-6">
          {requisites.map((requisite, index) => (
            <div key={index} className="flex justify-between items-start border-b border-gray-100 pb-3">
              <span className="text-sm font-medium text-gray-600 flex-1">{requisite.label}</span>
              <span className="text-sm text-blue-900 font-mono text-right flex-1 break-all">
                {requisite.value}
              </span>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleCopyRequisites}
          >
            Копировать все
          </button>
          <button
            onClick={onClose}
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};

export default Requisites;