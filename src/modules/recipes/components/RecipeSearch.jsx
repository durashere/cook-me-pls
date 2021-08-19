import { useSession } from 'next-auth/client';
import Link from 'next/link';
import PropTypes from 'prop-types';

const RecipeSearch = ({ searchQuery, setSearchQuery }) => {
  const [session, loading] = useSession();

  const handleSearch = (e) => setSearchQuery(e.target.value);

  return (
    <div className="flex items-center gap-2">
      {!loading && session && (
        <Link href="/ingredients">
          <a className="p-2 material-icons-outlined">settings</a>
        </Link>
      )}
      <div className="relative w-full">
        <input
          className="w-full pr-8 truncate input"
          onChange={handleSearch}
          placeholder="Szukaj przepisu..."
          type="text"
          value={searchQuery}
        />
        <span className="absolute top-0 right-0 text-gray-300 pointer-events-none icon material-icons-outlined">
          search
        </span>
      </div>
      {!loading && session && (
        <Link href="/recipes/create">
          <a className="p-2 material-icons-outlined">add</a>
        </Link>
      )}
    </div>
  );
};

RecipeSearch.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
};

export default RecipeSearch;
