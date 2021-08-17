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

const RecipeHeader = ({ author, cookTime, difficulty, imageUrl, name }) => {
  return (
    <div className="overflow-hidden rounded-md shadow-sm">
      <div className="relative pb-2/3">
        <Image
          alt="Picture of the dish"
          layout="fill"
          objectFit="cover"
          src={imageUrl}
          unoptimized
        />
      </div>
      <div className="flex flex-col items-center gap-8 p-4 bg-white">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-4xl font-bold">{name}</h1>
          <div className="flex items-center gap-2">
            <div className="relative overflow-hidden rounded-md w-7 h-7">
              <Image
                src={author.image}
                layout="fill"
                objectFit="cover"
                alt="User avatar"
                unoptimized
              />
            </div>
            <h2 className="text-lg">{author.name}</h2>
          </div>
        </div>
        <div className="grid w-full grid-flow-col gap-4 select-none auto-cols-fr">
          <RecipeDetailsItem icon="schedule">{cookTime}</RecipeDetailsItem>
          <RecipeDetailsItem icon="people">1 porcja</RecipeDetailsItem>
          <RecipeDetailsItem icon="bar_chart">{difficulty}</RecipeDetailsItem>
        </div>
      </div>
    </div>
  );
};

RecipeHeader.defaultProps = { imageUrl: 'https://via.placeholder.com/640x427?text=Image' };

RecipeHeader.propTypes = {
  author: PropTypes.shape({ image: PropTypes.string, name: PropTypes.string }).isRequired,
  cookTime: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  name: PropTypes.string.isRequired,
};

export default RecipeHeader;
