import {gql} from '@apollo/client'

export const QUERY_USERS = gql`
    query getUsers {
        users{
            _id
            username
            password
            name
            color
            bio
            friends
            posts
        }
    }
`
//query for friend search feature
export const SEARCH_USERS = gql`
    query searchUsers{
        users{
            _id
            username
            avatar
        }
    }
`