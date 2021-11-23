import { ReactElement } from 'react';

import RecipeSection from '@/modules/recipes/components/RecipeSection';

interface IRecipeInfo {
  children: React.ReactNode;
  icon: ReactElement;
}

const RecipeInfo = ({ children, icon }: IRecipeInfo): ReactElement => (
  <RecipeSection>
    <div className="aspect-w-16 aspect-h-9">
      <div className="flex flex-col items-center justify-center">
        {icon}
        <span className="font-bold text-yellow-500">{children}</span>
      </div>
    </div>
  </RecipeSection>
);

export default RecipeInfo;
