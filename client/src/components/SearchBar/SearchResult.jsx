import { Link } from 'react-router-dom';
import "./style.css";

export const SearchResult = ({ result }) => {

  return (
    <Link to="/profile" state={{ from: result.id }}
      className="search-result"
    >
      {result}
    </Link>
  );
};