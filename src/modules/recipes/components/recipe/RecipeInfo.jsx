import PropTypes from 'prop-types';

import RecipeSection from '@/modules/recipes/components/RecipeSection';

const RecipeInfo = ({ children, icon }) => {
  return (
    <RecipeSection>
      <div className="aspect-w-16 aspect-h-9">
        <div className="flex flex-col items-center justify-center">
          <span className="text-4xl text-yellow-500 material-icons-outlined">{icon}</span>
          <span className="font-bold text-yellow-500">{children}</span>
        </div>
      </div>
    </RecipeSection>
  );
};

RecipeInfo.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.string.isRequired,
};

export default RecipeInfo;
