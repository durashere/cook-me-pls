import React from 'react';

export default function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);
  const [debouncedLoading, setDebouncedLoading] = React.useState(false);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      setDebouncedLoading(false);
    }, delay);

    setDebouncedLoading(true);

    // Cancel the timeout if value changes (also on delay change or unmount)
    return () => {
      clearTimeout(handler);
      setDebouncedLoading(true);
    };
  }, [value, delay]);

  return { value: debouncedValue, loading: debouncedLoading };
}
