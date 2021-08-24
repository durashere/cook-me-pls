import classNames from 'classnames';
import Input from '@/components/Input';
import PropTypes from 'prop-types';

const RecipeSearch = ({ searchQuery, setSearchQuery }) => {
  const handleSearch = (e) => setSearchQuery(e.target.value);

  return (
    <div className="relative">
      <Input
        fullWidth
        onChange={handleSearch}
        placeholder="Szukaj przepisu..."
        type="search"
        value={searchQuery}
      />
      <span
        className={classNames(
          'absolute top-0 right-2 w-10 h-10 p-2 text-gray-300 pointer-events-none transition-all material-icons-outlined',
          {
            'opacity-0': searchQuery,
            'opacity-100 ': !searchQuery,
          }
        )}
      >
        search
      </span>
    </div>
  );
};

RecipeSearch.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
};

export default RecipeSearch;
