import PropTypes from 'prop-types';

import RecipeSection from '@/modules/recipes/components/RecipeSection';

const Step = ({ index, instruction }) => {
  return (
    <li>
      <p className="text-lg font-medium text-gray-600">Krok {index + 1}</p>
      <p className="p-4 my-4 ml-2 text-sm text-gray-500 border-l-2">{instruction}</p>
    </li>
  );
};

Step.propTypes = {
  index: PropTypes.number.isRequired,
  instruction: PropTypes.string.isRequired,
};

const RecipeSteps = ({ steps }) => {
  return (
    <RecipeSection>
      <ul className="space-y-4">
        {steps.map((step, index) => (
          <Step index={index} instruction={step.instruction} key={step._id} />
        ))}
      </ul>
    </RecipeSection>
  );
};

RecipeSteps.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      instruction: PropTypes.string,
    })
  ).isRequired,
};

export default RecipeSteps;
