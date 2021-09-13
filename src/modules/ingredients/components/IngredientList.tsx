import { useForm } from 'react-hook-form';
import { useState } from 'react';

import { UNITS } from '@/app/constants';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Loader from '@/components/Loader';
import Select from '@/components/Select';
import useIngredientDelete from '@/modules/ingredients/hooks/useIngredientDelete';
import useIngredients from '@/modules/ingredients/hooks/useIngredients';
import useIngredientUpdate from '@/modules/ingredients/hooks/useIngredientUpdate';
import { IIngredient } from '@/backend/models/ingredient';

const IngredientListItem = ({
  _id,
  name,
  quantity,
  unit,
}: IIngredient): JSX.Element => {
  const [editMode, setEditMode] = useState(false);

  const { mutate: updateIngredient } = useIngredientUpdate();

  const { mutate: deleteIngredient } = useIngredientDelete();

  const { handleSubmit, register, reset } = useForm({
    defaultValues: { _id, name, quantity, unit },
  });

  const handleToggleEditMode = (): void => setEditMode(!editMode);

  const handleCancel = (): void => {
    setEditMode(!editMode);
    reset({ _id, name, quantity, unit });
  };

  const handleUpdateIngredient = (data: IIngredient): void => {
    updateIngredient(data);
    setEditMode(!editMode);
  };

  const handleDeleteIngredient = (): void => {
    deleteIngredient(_id);
  };

  return (
    <li className="flex items-center gap-2">
      {editMode ? (
        <form
          className="flex items-center w-full gap-2"
          onSubmit={handleSubmit(handleUpdateIngredient)}
        >
          <Input fullWidth required type="number" {...register('quantity')} />
          <Select options={UNITS} {...register('unit')} />
          <Button icon="close" onClick={handleCancel} />
          <Button icon="delete" onClick={handleDeleteIngredient} />
          <Button htmlType="submit" icon="done" />
        </form>
      ) : (
        <div className="flex items-center w-full gap-2">
          <div className="w-full h-full p-2 capitalize bg-white rounded-md shadow">
            {name}
          </div>
          <Button icon="edit" onClick={handleToggleEditMode} />
        </div>
      )}
    </li>
  );
};

const IngredientList = (): JSX.Element => {
  const { data: ingredients, status: statusIngredients } = useIngredients();

  if (statusIngredients === 'idle' || statusIngredients === 'loading') {
    return <Loader />;
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {ingredients?.map((ingredient: IIngredient) => (
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
