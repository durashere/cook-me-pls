import RecipeCard from '@/modules/recipes/components/RecipeCard';
import useUserRecipes from '@/modules/users/hooks/useUserRecipes';

interface IUserRecipes {
  userId: string;
}

const UserRecipesList = ({ userId }: IUserRecipes): JSX.Element => {
  const { data: userRecipes } = useUserRecipes(userId);

  if (!userRecipes) {
    return (
      <div className="p-4 text-center bg-white rounded-md shadow-md">
        Użytkownik nie dodał jeszcze żadnego przepisu
      </div>
    );
  }

  return (
    <div>
      <ul className="space-y-4">
        {userRecipes.map((recipe) => (
          <RecipeCard recipe={recipe} />
        ))}
      </ul>
    </div>
  );
};

export default UserRecipesList;
