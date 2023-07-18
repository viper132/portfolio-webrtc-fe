import LocalStorage from '@data/localStorage';
import useLocalStorage from './useLocalStorage';
import { useEffect } from 'react';

const useTheme = () => {
  const { data, set } = useLocalStorage(LocalStorage.THEME);

  useEffect(() => {
    if (data) document.body.className = data as string;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const toggle = () => {
    set(data === 'dark' ? 'light' : 'dark');
  };
  return { currentTheme: data, toggle };
};

export default useTheme;
