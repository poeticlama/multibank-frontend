import VirtualScroll from '../components/operations-history/VirtualScroll.tsx';
import { SETTINGS } from '../constants/settings.ts';
import { RowTemplate } from '../components/operations-history/RowTemplate.tsx';
import { getDataSlice } from '../mocks/get-data-slice.ts';

const OperationsHistory = () => {
  return <VirtualScroll settings={SETTINGS} template={RowTemplate} get={getDataSlice} />
  // В дальнейшем надо в get как-то передавать функцию, достающую данные из запроса
}

export default OperationsHistory