import { useForm } from 'react-hook-form';
import { useState } from 'react';

import { UNITS } from '@/app/constants';
import Input from '@/components/Input';
import Select from '@/components/Select';
import useIngredientCreate from '@/modules/ingredients/hooks/useIngredientCreate';

const IngredientCreate = () => {
  const [createMode, setCreateMode] = useState(false);

  const { mutate: createIngredient } = useIngredientCreate();

  const { reset, handleSubmit, register } = useForm();

  const onCancel = () => {
    setCreateMode(!createMode);
    reset();
  };

  const onSubmit = (data) => {
    createIngredient(data);
    setCreateMode(!createMode);
    reset();
  };

  return (
    <>
      {createMode ? (
        <form className="flex items-end gap-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col w-full gap-2">
            <Input
              fullWidth
              name="name"
              placeholder="Nazwa składnika..."
              register={register}
              required
            />
            <Input
              fullWidth
              name="quantity"
              placeholder="Domyślna ilość..."
              register={register}
              required
              type="number"
            />
            <Select
              fullWidth
              name="unit"
              options={UNITS}
              placeholder="Domyślna jednostka..."
              register={register}
            />
          </div>
          <div className="flex flex-col gap-2">
            <button className="button material-icons-outlined" type="button" onClick={onCancel}>
              close
            </button>
            <button className="button material-icons-outlined" type="submit">
              done
            </button>
          </div>
        </form>
      ) : (
        <div className="flex items-center justify-between">
          <h1 className="ml-2 text-2xl font-medium">Składniki</h1>
          <button
            className="button material-icons-outlined"
            onClick={() => setCreateMode(!createMode)}
            type="button"
          >
            add
          </button>
        </div>
      )}
    </>
  );
};

export default IngredientCreate;
