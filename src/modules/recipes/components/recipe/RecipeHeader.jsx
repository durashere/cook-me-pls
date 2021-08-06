import Image from 'next/image';
import PropTypes from 'prop-types';

const RecipeDetailsItem = ({ children, icon }) => {
  return (
    <div className="flex flex-col items-center justify-center p-1 border-2 border-yellow-500 rounded-md">
      <span className="text-5xl text-yellow-500 material-icons-outlined">{icon}</span>
      <span className="font-bold text-yellow-500">{children}</span>
    </div>
  );
};

RecipeDetailsItem.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.string.isRequired,
};

const RecipeHeader = ({ name, cookTime, difficulty }) => {
  return (
    <div className="overflow-hidden rounded-md shadow-sm">
      <div className="relative pb-2/3">
        <Image
          src="https://via.placeholder.com/640x480?text=Image"
          layout="fill"
          objectFit="cover"
          alt="Picture of the dish"
          unoptimized
        />
      </div>
      <div className="p-4 space-y-8 bg-white">
        <h1 className="text-4xl font-bold text-center">{name}</h1>
        <div className="grid grid-flow-col gap-4 select-none auto-cols-fr">
          <RecipeDetailsItem icon="schedule">{cookTime}</RecipeDetailsItem>
          <RecipeDetailsItem icon="people">servings</RecipeDetailsItem>
          <RecipeDetailsItem icon="bar_chart">{difficulty}</RecipeDetailsItem>
        </div>
      </div>
    </div>
  );
};

RecipeHeader.propTypes = {
  name: PropTypes.string.isRequired,
  cookTime: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
};

export default RecipeHeader;
