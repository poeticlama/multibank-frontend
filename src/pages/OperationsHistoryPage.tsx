import VirtualScroll from '../components/operations-history/VirtualScroll.tsx';
import { SETTINGS } from '../constants/settings.ts';
import { Operation } from '../components/operations-history/Operation.tsx';
import { getDataSlice } from '../mocks/get-data-slice.ts';
import CustomSelect from '../components/shared/CustomSelect.tsx';
import { useEffect } from 'react';

const OperationsHistoryPage = () => {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <main className="pt-4 sm:pt-6 lg:pt-8 px-3 xs:px-4 sm:px-6 lg:px-8 xl:px-25 text-blue-900 max-w-screen-2xl mx-auto">
      {/* Заголовок */}
      <div className="mb-4 sm:mb-6 lg:mb-8">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 lg:mb-5 px-2 sm:px-0 text-center">
          Операции
        </h1>
        
        {/* Фильтры */}
        <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 lg:gap-5 px-2 sm:px-0 justify-center items-center lg:items-stretch">
          <div className="flex-1 min-w-0 w-full lg:max-w-xs">
            <CustomSelect
              options={[{label: "a", value: "b"}, {label: "c", value: "b"}]}
              placeholder="Выбрать месяц"
            />
          </div>
          <div className="flex-1 min-w-0 w-full lg:max-w-xs">
            <CustomSelect
              options={[{label: "a", value: "b"}, {label: "c", value: "b"}]}
              placeholder="Счета и карты"
            />
          </div>
          <div className="flex-1 min-w-0 w-full lg:max-w-xs">
            <CustomSelect
              options={[{label: "a", value: "b"}, {label: "c", value: "b"}]}
              placeholder="Личные и бизнес траты"
            />
          </div>
        </div>
      </div>

      {/* Список операций */}
      <div className="px-1 sm:px-1 lg:px-1">
        <VirtualScroll settings={SETTINGS} template={Operation} get={getDataSlice} />
      </div>
    </main>
  )
}

export default OperationsHistoryPage;