import React from 'react';

const useDebounce = (
  value: string,
  delay = 500
): {
  value: string;
  loading: boolean;
} => {
  const [debouncedValue, setDebouncedValue] = React.useState(value);
  const [debouncedLoading, setDebouncedLoading] = React.useState(false);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      setDebouncedLoading(false);
    }, delay);

    setDebouncedLoading(true);

    // Cancel the timeout if value changes (also on delay change or unmount)
    return (): void => {
      clearTimeout(handler);
      setDebouncedLoading(true);
    };
  }, [value, delay]);

  return { value: debouncedValue, loading: debouncedLoading };
};

export default useDebounce;
