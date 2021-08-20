import PropTypes from 'prop-types';

const Step = ({ index, instruction }) => {
  return (
    <li className="flex items-center gap-4">
      <div className="flex flex-col items-center justify-center w-2 h-2 p-2 text-xs font-bold text-yellow-500 ring-2 ring-yellow-500 rounded-3xl">
        {index + 1}
      </div>
      <span className="w-full font-medium text-gray-600 break-all">{instruction}</span>
    </li>
  );
};

Step.propTypes = {
  index: PropTypes.number.isRequired,
  instruction: PropTypes.string.isRequired,
};

const RecipeSteps = ({ steps }) => {
  return (
    <ul className="flex flex-col gap-4">
      {steps.map((step, index) => (
        <Step index={index} instruction={step.instruction} key={step._id} />
      ))}
    </ul>
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
