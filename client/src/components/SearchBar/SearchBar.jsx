import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { SEARCH_FRIEND_PAGE, SEARCH_USERS } from '../../utils/queries'
import { useQuery } from '@apollo/client'

import "./style.css";

export const SearchBar = ({ setResults }) => {

    const [input, setInput] = useState("");

    const userSearch = useQuery(SEARCH_USERS)
    let users = []

    if (userSearch.data) {
        users = userSearch.data
        console.log(users)
    }

    const fetchData = (value) => {

        const results = users.filter((user) => {
            return (
                {
                    _id,
                    username
                }
            );
        });
        setResults(results);
    };

    const handleChange = (event) => {
        setInput(event.target.value);
        fetchData(input);
    };

    return (
        <div className="input-wrapper">
            <FaSearch id="search-icon" />
            <input
                placeholder="Search people..."
                value={input}
                onChange={(e) => handleChange(e.target.value)}
            />
        </div>
    );
};