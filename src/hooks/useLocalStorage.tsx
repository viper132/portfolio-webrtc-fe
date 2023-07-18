import LocalStorage from '@data/localStorage';
import { useEffect, useState } from 'react';

type DataType = 'JSON' | 'string';

const useLocalStorage = (storageKey: LocalStorage, storageType: DataType = 'string') => {
  const [data, setData] = useState<unknown>();

  useEffect(() => {
    const item = localStorage.getItem(storageKey as string);
    if (item)
      switch (storageType) {
        case 'JSON':
          setData(JSON.parse(item));
          break;
        case 'string':
          setData(item);
          break;
        default:
          throw new Error('Unknown Storage Type');
      }
  }, [storageKey, storageType]);

  const set = (newValue: unknown) => {
    let result;
    switch (storageType) {
      case 'JSON':
        result = JSON.stringify(newValue);
        break;
      case 'string':
        result = newValue;
        break;
      default:
        break;
    }
    localStorage.setItem(storageKey, result as string);
    setData(result);
  };

  const remove = () => localStorage.removeItem(storageKey);
  return {
    data,
    set,
    remove,
  };
};

export default useLocalStorage;
