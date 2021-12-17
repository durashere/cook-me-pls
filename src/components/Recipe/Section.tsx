import { ReactElement } from 'react';

interface IRecipeSection {
  children: React.ReactNode;
  label?: string;
}

const RecipeSection = ({ children, label }: IRecipeSection): ReactElement => (
  <div className="w-full space-y-2">
    {label && <h2 className="ml-4 text-2xl font-medium capitalize">{label}</h2>}
    <div className="p-4 space-y-4 bg-white rounded-md shadow-md">
      {children}
    </div>
  </div>
);

export default RecipeSection;
