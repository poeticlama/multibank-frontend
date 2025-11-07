import { useState, useEffect } from 'react';
import type { AccountData } from '../../../types/account-types.ts';
import RubleIcon from './RubleIcon.tsx';
import getCurrency from '../../../constants/get-currency.ts';
import Requisites from './Requisites.tsx';

type AccountCardProps = {
  accountData: AccountData;
  onDescriptionUpdate?: (accountId: string, newDescription: string) => void;    //  Потом следует убрать ?опциональность
}

const AccountCard = ({ accountData, onDescriptionUpdate }: AccountCardProps) => {
  
  const [iconSize, setIconSize] = useState(20);
  const [requisitesIsOpen, setRequisitesIsOpen] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(accountData.description || 'Добавьте описание');
  const [newDescription, setNewDescription] = useState(accountData.description || 'Добавьте описание');
  
  useEffect(() => {
    const calculateIconSize = () => {
      const screenWidth = window.innerWidth;
      const tenthOfScreen = Math.floor(screenWidth / 35);
      const size = Math.min(tenthOfScreen, 25);
      const finalSize = Math.max(size, 16);
      setIconSize(finalSize);
    };


    calculateIconSize();
    window.addEventListener('resize', calculateIconSize);
    
    return () => window.removeEventListener('resize', calculateIconSize);
  }, []);


  const truncateDescription = (text: string, maxLength: number = 60) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
    setIsDescriptionExpanded(true);
  };

  const handleSave = () => {
    if (onDescriptionUpdate) {
      setNewDescription(editedDescription);
      onDescriptionUpdate(accountData.accountId || '', editedDescription);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedDescription(accountData.description || '');
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className="px-3 xs:px-4 sm:px-5 py-2 sm:py-3 bg-blue-200 w-full min-h-20 xs:min-h-22 sm:min-h-25 flex flex-col justify-between rounded-xl transition-all duration-200 hover:shadow-md">

      {/* Верхняя часть с балансом и валютой */}
      <div className="flex items-center gap-3 mb-2">
        <RubleIcon size={iconSize}/>
        <h3 className="text-lg sm:text-xl font-bold break-words">
          {accountData.amount + " " + getCurrency(accountData.currency)}
        </h3>
      </div>

      {/* Блок с описанием счета */}
      {newDescription && (
        <div className="mb-2 relative">
          {isEditing ? (
            <div className="space-y-2">
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full text-xs xs:text-sm text-gray-700 p-2 border border-blue-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                autoFocus
                placeholder="Введите описание счета..."
              />
              <div className="flex gap-2 justify-end">
                <button
                  onClick={handleCancel}
                  className="text-xs px-3 py-1 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Отмена
                </button>
                <button
                  onClick={handleSave}
                  className="text-xs px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Сохранить
                </button>
              </div>
              <div className="text-xs text-gray-500 text-center">
                Ctrl+Enter для сохранения, Esc для отмены
              </div>
            </div>
          ) : (
            <>
              <div
                className={`
                  text-xs xs:text-sm text-gray-700 leading-tight 
                  break-words break-all word-wrap-break-word overflow-wrap-break-word
                  ${isDescriptionExpanded ? '' : 'line-clamp-2'}
                  cursor-pointer hover:bg-blue-300 hover:bg-opacity-30 rounded px-1 py-1 transition-colors
                `}
                onClick={handleEditClick}
                title="Кликните для редактирования"
              >
                {isDescriptionExpanded ?
                  newDescription :
                  truncateDescription(newDescription)
                }
              </div>
              {newDescription.length > 60 && (
                <div className="flex justify-between items-center mt-1">
                  <button
                    onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                    className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  >
                    {isDescriptionExpanded ? 'Свернуть' : 'Подробнее'}
                  </button>



                </div>
              )}
            </>
          )}
        </div>
      )}


      {/* Нижняя часть с названием банка и кнопкой реквизитов */}
      <div className="mt-auto font-light flex justify-between items-center gap-2">
        <span className="text-sm xs:text-base truncate flex-1">
          {accountData.bank}
        </span>
        <button
          onClick={() => setRequisitesIsOpen(true)}
          className="text-xs xs:text-sm font-semibold hover:underline whitespace-nowrap flex-shrink-0 px-1 xs:px-2 py-1 rounded transition-colors bg-white bg-opacity-50 hover:bg-opacity-70"
        >
          Реквизиты
        </button>

        <Requisites
          isOpen={requisitesIsOpen}
          setIsModalOpen={setRequisitesIsOpen}
          accountData={{
            identification: accountData.account.identification,
            name: accountData.account.name
          }}
        />
      </div>

    </div>
  )
}

export default AccountCard;