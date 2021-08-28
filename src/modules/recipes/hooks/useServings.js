import { useEffect, useState } from 'react';

const useServings = ({ defaultServings }) => {
  const [servings, setServings] = useState();

  useEffect(() => {
    setServings(defaultServings);
  }, [defaultServings]);

  const addServing = () => setServings(servings + 1);

  const removeServing = () => servings > 1 && setServings(servings - 1);

  return { servings, addServing, removeServing };
};

export default useServings;
