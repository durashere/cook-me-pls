import { ReactElement } from 'react';

import RecipeSection from '@/modules/recipes/components/RecipeSection';

interface IRecipeInfo {
  children: React.ReactNode;
  icon: ReactElement;
}

const RecipeInfo = ({ children, icon }: IRecipeInfo): ReactElement => (
  <RecipeSection>
    <div className="flex flex-col items-center justify-center">
      {icon}
      <span className="font-bold text-yellow-500">{children}</span>
    </div>
  </RecipeSection>
);

export default RecipeInfo;
