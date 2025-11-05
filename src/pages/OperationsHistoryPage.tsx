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
    <main className="pt-4 sm:pt-6 lg:pt-8 text-blue-900 max-w-screen-2xl mx-auto">
      {/* Заголовок */}
      <div className="mb-4 sm:mb-6 lg:mb-5">
        <h1 className="text-2xl font-bold mb-5 lg:mb-10 lg:px-25 text-blue-900 text-center lg:text-left">
          Операции
        </h1>
        
        {/* Фильтры */}
        <div className="lg:ml-25 flex flex-col lg:flex-row gap-1 sm:gap-2 lg:gap-3 px-2 sm:px-0 items-center">
          <CustomSelect
              options={[{label: "a", value: "b"}, {label: "c", value: "b"}]}
              placeholder="Выбрать месяц"
            />
          <CustomSelect
              options={[{label: "a", value: "b"}, {label: "c", value: "b"}]}
              placeholder="Счета и карты"
            />
          <CustomSelect
              options={[{label: "a", value: "b"}, {label: "c", value: "b"}]}
              placeholder="Личные и бизнес траты"
            />
        </div>
      </div>

      {/* Список операций */}
      <div className=" px-3 xs:px-4 sm:px-6 lg:px-8 xl:px-25">
        <VirtualScroll settings={SETTINGS} template={Operation} get={getDataSlice} />
      </div>
    </main>
  )
}

export default OperationsHistoryPage;