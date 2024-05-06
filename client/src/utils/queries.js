import {gql} from '@apollo/client'

export const QUERY_USERS = gql`
    query getUsers {
        users{
            _id
            username
            password
            name
            color
            avatar
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
//query for finding one user
export const QUERY_USER = gql`
    query user($_id: ID!){
        user(_id: $_id){
            _id
            username
            password
            name
            color
            avatar
            bio
            friends
            posts
        }
    }
`