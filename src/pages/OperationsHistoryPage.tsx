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
    <main className="pt-10 px-25 text-blue-900">
      <div>
        <h1 className="text-2xl font-bold mb-3">Операции</h1>
        <div className="flex justify-center gap-5 px-5">
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
      <VirtualScroll settings={SETTINGS} template={Operation} get={getDataSlice} />
    </main>
  )
  // В дальнейшем надо в get как-то передавать функцию, достающую данные из запроса
}

export default OperationsHistoryPage