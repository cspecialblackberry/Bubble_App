import "./style.css";
import { SearchResult } from "./SearchResult";

export const SearchResultsList = ({ results }) => {
  return (
    <div className="results-list">
      {results && results.length == 0 && <p className="no-users">No users found</p>}
      {results.map((result, id) => {
        return <SearchResult result={result.username} key={id} />;
      })}
    </div>
  );
};