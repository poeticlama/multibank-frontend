import VirtualScroll from '../components/operations-history/VirtualScroll.tsx';
import { SETTINGS as DEFAULT_SETTINGS } from '../constants/settings.ts';
import { Operation } from '../components/operations-history/Operation.tsx';
import { useEffect, useState, useRef } from 'react';
import { useAuth } from '../hooks/useAuth.ts';
import Loader from '../components/shared/Loader.tsx';
import { useTransactions } from '../hooks/useTransactions.ts';
import CustomSelect from '../components/shared/CustomSelect.tsx';

const OperationsHistoryPage = () => {
  const { user } = useAuth();
  const [accountFilter, setAccountFilter] = useState('');
  const { transactions, isError, isLoading, accounts } = useTransactions(accountFilter);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  useEffect(() => {
    const sumFixedHeights = (where: 'top' | 'bottom') => {
      const els = Array.from(document.querySelectorAll<HTMLElement>('*'));
      return els.reduce((acc, el) => {
        const cs = getComputedStyle(el);
        if (cs.position !== 'fixed') return acc;
        if (el.offsetWidth === 0 || el.offsetHeight === 0) return acc;
        const r = el.getBoundingClientRect();
        if (where === 'top') {
          if (r.bottom <= 0) return acc;
          if (Math.abs(r.top) <= 2 || cs.top === '0px') return acc + r.height;
        } else {
          if (Math.abs(window.innerHeight - (r.bottom || 0)) <= 2 || cs.bottom === '0px')
            return acc + r.height;
        }
        return acc;
      }, 0);
    };

    const calc = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const elementTopDoc = rect.top + window.scrollY;
      const viewportBottomY = window.scrollY + window.innerHeight;
      const fixedTop = sumFixedHeights('top');
      const fixedBottom = sumFixedHeights('bottom');
      const availableHeight = Math.max(0, viewportBottomY - elementTopDoc - fixedTop - fixedBottom);
      const newAmount = Math.max(1, Math.floor(availableHeight / settings.itemHeight));
      setSettings(prev => (prev.amount === newAmount ? prev : { ...prev, amount: newAmount }));
    };

    const scheduleCalc = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        calc();
        rafRef.current = null;
      });
    };

    scheduleCalc();
    window.addEventListener('resize', scheduleCalc);
    window.addEventListener('scroll', scheduleCalc, { passive: true });

    const ro = new ResizeObserver(scheduleCalc);
    if (containerRef.current) ro.observe(containerRef.current);
    const mo = new MutationObserver(scheduleCalc);
    mo.observe(document.body, { childList: true, subtree: true, attributes: true });

    return () => {
      window.removeEventListener('resize', scheduleCalc);
      window.removeEventListener('scroll', scheduleCalc);
      ro.disconnect();
      mo.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [settings.itemHeight]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div className='text-lg text-red-600 text-center mt-10'>Ошибка загрузки транзакций</div>;
  }

  return (
    <main className='pt-4 sm:pt-6 lg:pt-8 text-blue-900 max-w-screen-2xl mx-auto'>
      <div className='mb-4 sm:mb-6 lg:mb-5'>
        <h1 className='text-2xl font-bold mb-5 lg:mb-10 lg:px-25 text-blue-900 text-center lg:text-left'>
          Операции
        </h1>
        <div className='lg:ml-25 flex flex-col lg:flex-row gap-1 sm:gap-2 lg:gap-3 px-2 sm:px-0 items-center'>
          <CustomSelect
            options={accounts.map(account => ({
              label: account.accountId + ' - ' + account.bankId,
              value: account.account[0].identification,
            }))}
            onChange={value => setAccountFilter(value)}
          />
        </div>
      </div>

      <div ref={containerRef} className='px-3 xs:px-4 sm:px-6 lg:px-8 xl:px-25'>
        {!!user && (
          <VirtualScroll
            settings={settings}
            template={Operation}
            premium={user.status === 'PREMIUM'}
            transactions={transactions}
          />
        )}
      </div>
    </main>
  );
};

export default OperationsHistoryPage;
