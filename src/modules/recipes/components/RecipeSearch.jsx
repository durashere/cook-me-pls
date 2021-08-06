import Link from 'next/link';
import PropTypes from 'prop-types';

const RecipeSearch = ({ searchQuery, setSearchQuery }) => {
  const handleSearch = (e) => setSearchQuery(e.target.value);

  return (
    <div className="flex items-center gap-2">
      <Link href="/ingredients">
        <a className="material-icons-outlined button">settings</a>
      </Link>
      <div className="relative w-full">
        <input
          className="w-full pr-8 truncate input"
          onChange={handleSearch}
          placeholder="Search for a recipe..."
          type="text"
          value={searchQuery}
        />
        <span className="absolute top-0 right-0 text-gray-300 pointer-events-none icon material-icons-outlined">
          search
        </span>
      </div>
      <Link href="/recipes/create">
        <a className="material-icons-outlined button">add</a>
      </Link>
    </div>
  );
};

RecipeSearch.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
};

export default RecipeSearch;
