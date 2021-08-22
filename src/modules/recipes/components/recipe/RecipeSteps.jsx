import PropTypes from 'prop-types';

import RecipeSection from '@/modules/recipes/components/RecipeSection';

const Step = ({ index, instruction }) => {
  return (
    <li className="flex gap-4">
      <span className="flex items-center justify-center w-6 h-6 p-3 text-xs font-bold text-yellow-500 ring-2 ring-yellow-500 rounded-3xl">
        {index + 1}
      </span>
      <p className="text-gray-600">{instruction}</p>
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
      <ul className="space-y-8">
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
