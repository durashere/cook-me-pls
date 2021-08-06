import { useState } from 'react';

const useServings = () => {
  const [servings, setServings] = useState(1);

  const addServing = () => setServings(servings + 1);

  const removeServing = () => servings > 1 && setServings(servings - 1);

  return { servings, addServing, removeServing };
};

export default useServings;
