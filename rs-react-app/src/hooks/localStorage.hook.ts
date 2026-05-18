import { useState } from 'react';

const useLocalStorage = <T>(key: string, initialValue: T) => {
  const getStorageValue = (): T => {
    try {
      const storedValue = localStorage.getItem(key);

      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch {
      return initialValue;
    }
  };

  const [value, setValue] = useState<T>(getStorageValue);

  const setStorageValue = (newValue: T) => {
    setValue(newValue);

    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return { value, setStorageValue };
};

export default useLocalStorage;
