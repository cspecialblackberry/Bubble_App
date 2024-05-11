import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { SEARCH_USERS } from '../../utils/queries'
import { useQuery } from '@apollo/client'

import "./style.css";

export const SearchBar = ({ setResults }) => {

    const getUsers = useQuery(SEARCH_USERS)
    let users = []

    if (getUsers.data) {
        users = getUsers.data
        console.log(users)
    }

    const [filteredResults, setFilteredResults] = useState(users)
    const [searchQuery, setSearchQuery] = useState('')

    const handleSearch = (event) => {
        const query = event.target.value
        setSearchQuery(query)

        const results = filteredResults.filter((result) => {
            return result.username.toLowerCase().indexOf(query.toLowerCase()) !== -1
        })

        setFilteredResults(results)
    }

    // let users = []

    // if (getUsers.data) {
    //     users = getUsers.data
    //     console.log(users)
    // }

    return (
        <div className="input-wrapper">
            <FaSearch id="search-icon" />
            <input
                type="text"
                name="search"
                placeholder="Search people..."
                value={searchQuery}
                onChange={handleSearch}
            />
        </div>

    );
};
