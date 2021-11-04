import { useEffect, useState } from 'react';

interface Servings {
  defaultServings?: number;
}

const useServings = ({
  defaultServings,
}: Servings): {
  servings: number;
  addServing: () => void;
  removeServing: () => false | void;
} => {
  const [servings, setServings] = useState(0);

  useEffect(() => {
    if (defaultServings) {
      setServings(defaultServings);
    }
  }, [defaultServings]);

  const addServing = (): void => setServings(servings + 1);

  const removeServing = (): false | void =>
    servings > 1 && setServings(servings - 1);

  return { servings, addServing, removeServing };
};

export default useServings;
