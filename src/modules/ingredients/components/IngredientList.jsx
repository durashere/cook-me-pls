import { useForm } from 'react-hook-form';
import { useState } from 'react';
import PropTypes from 'prop-types';

import { UNITS } from '@/app/constants';
import Input from '@/components/Input';
import Loader from '@/components/Loader';
import Select from '@/components/Select';
import useIngredients from '@/modules/ingredients/hooks/useIngredients';
import useIngredientUpdate from '@/modules/ingredients/hooks/useIngredientUpdate';

const IngredientListItem = ({ ingredient }) => {
  const [editMode, setEditMode] = useState(false);

  const { mutate: updateIngredient } = useIngredientUpdate();

  const { handleSubmit, register, reset } = useForm({ defaultValues: ingredient });

  const onCancel = () => {
    setEditMode(!editMode);
    reset(ingredient);
  };

  const onSubmit = (data) => {
    updateIngredient(data);
    setEditMode(!editMode);
  };

  return (
    <li className="flex items-center gap-2">
      {editMode ? (
        <form className="flex items-center gap-2" onSubmit={handleSubmit(onSubmit)}>
          <Input fullWidth name="quantity" register={register} required type="number" />
          <Select name="unit" options={UNITS} register={register} />
          <button className="button material-icons-outlined" type="button" onClick={onCancel}>
            close
          </button>
          <button className="button material-icons-outlined" type="submit">
            done
          </button>
        </form>
      ) : (
        <div className="flex items-center w-full gap-2">
          <div className="w-full h-full p-2 capitalize bg-white rounded-md shadow-sm">
            {ingredient.name}
          </div>
          <button
            className="button material-icons-outlined"
            onClick={() => setEditMode(!editMode)}
            type="button"
          >
            edit
          </button>
        </div>
      )}
    </li>
  );
};

IngredientListItem.propTypes = {
  ingredient: PropTypes.shape({
    name: PropTypes.string,
    quantity: PropTypes.number,
    unit: PropTypes.string,
  }).isRequired,
};

const IngredientList = () => {
  const { data: ingredients, status: statusIngredients } = useIngredients();

  if (statusIngredients === 'idle' || statusIngredients === 'loading') {
    return <Loader />;
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {ingredients.map((ingredient) => (
        <IngredientListItem ingredient={ingredient} key={ingredient._id} />
      ))}
    </ul>
  );
};

export default IngredientList;
