import { useForm } from 'react-hook-form';
import { useState } from 'react';
import PropTypes from 'prop-types';

import { UNITS } from '@/app/constants';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Loader from '@/components/Loader';
import Select from '@/components/Select';
import useIngredientDelete from '@/modules/ingredients/hooks/useIngredientDelete';
import useIngredients from '@/modules/ingredients/hooks/useIngredients';
import useIngredientUpdate from '@/modules/ingredients/hooks/useIngredientUpdate';

const IngredientListItem = ({ _id, name, quantity, unit }) => {
  const [editMode, setEditMode] = useState(false);

  const { mutate: updateIngredient } = useIngredientUpdate();

  const { mutate: deleteIngredient } = useIngredientDelete();

  const { handleSubmit, register, reset } = useForm({
    defaultValues: { _id, name, quantity, unit },
  });

  const handleToggleEditMode = () => setEditMode(!editMode);

  const handleCancel = () => {
    setEditMode(!editMode);
    reset({ _id, name, quantity, unit });
  };

  const handleUpdateIngredient = (data) => {
    updateIngredient(data);
    setEditMode(!editMode);
  };

  const handleDeleteIngredient = () => {
    deleteIngredient(_id);
  };

  return (
    <li className="flex items-center gap-2">
      {editMode ? (
        <form
          className="flex items-center w-full gap-2"
          onSubmit={handleSubmit(handleUpdateIngredient)}
        >
          <Input fullWidth name="quantity" register={register} required type="number" />
          <Select name="unit" options={UNITS} register={register} />
          <Button icon="close" onClick={handleCancel} />
          <Button icon="delete" onClick={handleDeleteIngredient} />
          <Button htmlType="submit" icon="done" />
        </form>
      ) : (
        <div className="flex items-center w-full gap-2">
          <div className="w-full h-full p-2 capitalize bg-white rounded-md shadow">{name}</div>
          <Button icon="edit" onClick={handleToggleEditMode} />
        </div>
      )}
    </li>
  );
};

IngredientListItem.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
};

const IngredientList = () => {
  const { data: ingredients, status: statusIngredients } = useIngredients();

  if (statusIngredients === 'idle' || statusIngredients === 'loading') {
    return <Loader />;
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {ingredients.map((ingredient) => (
        <IngredientListItem
          _id={ingredient._id}
          key={ingredient._id}
          name={ingredient.name}
          quantity={ingredient.quantity}
          unit={ingredient.unit}
        />
      ))}
    </ul>
  );
};

export default IngredientList;
