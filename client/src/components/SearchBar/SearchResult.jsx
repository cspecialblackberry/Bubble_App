import { Link } from 'react-router-dom';
import "./style.css";

export const SearchResult = ({ result, id }) => {

  return (
    <Link to="/profile" state={{ from: id }}
      className="search-result"
    >
      {result}
    </Link>
  );
};