import { useState, Component } from "react";
import { FaSearch } from "react-icons/fa";
import { SEARCH_PEOPLE } from '../../utils/queries'
import { useQuery } from '@apollo/client'

import "./style.css";

export const SearchBar = ({ setResults }) => {

    const userSearch = useQuery(SEARCH_PEOPLE)
    let users = []

    if (userSearch.data) {
        users = userSearch.data
        console.log(users)
    }

    const [filteredResults, setFilteredResults] = useState(users)
    const [searchQuery, setSearchQuery] = useState('')

    const handleSearch = (event) => {
        event.preventDefault()
        const query = event.target.value
        setSearchQuery(query)
        console.log(query)

        const results = filteredResults.filter((result) => {
            return result.username.toLowerCase().indexOf(query.toLowerCase()) !== -1
        })

        console.log(results)

        setFilteredResults(results)
        console.log(setFilteredResults(results))
    }

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
