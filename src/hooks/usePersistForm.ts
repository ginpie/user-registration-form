import { useEffect } from 'react';

type UsePersistFormProps = {
  value: unknown; // Replace with the appropriate type for your form data
  localStorageKey: string;
};

export default function usePersistForm({
  value,
  localStorageKey,
}: UsePersistFormProps) {
  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(value));
  }, [value, localStorageKey]);

  return;
}
