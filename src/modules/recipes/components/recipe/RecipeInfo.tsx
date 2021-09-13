import RecipeSection from '@/modules/recipes/components/RecipeSection';

interface IRecipeInfo {
  children: React.ReactNode;
  icon: string;
}

const RecipeInfo = ({ children, icon }: IRecipeInfo): JSX.Element => (
  <RecipeSection>
    <div className="aspect-w-16 aspect-h-9">
      <div className="flex flex-col items-center justify-center">
        <span className="text-4xl text-yellow-500 material-icons-outlined">
          {icon}
        </span>
        <span className="font-bold text-yellow-500">{children}</span>
      </div>
    </div>
  </RecipeSection>
);

export default RecipeInfo;
