interface IRecipeSection {
  children: React.ReactNode;
  label?: string;
}

const RecipeFormSection = ({
  children,
  label,
}: IRecipeSection): JSX.Element => (
  <div className="w-full space-y-4">
    {label && <h2 className="ml-4 text-2xl font-medium capitalize">{label}</h2>}
    {children}
  </div>
);

export default RecipeFormSection;
