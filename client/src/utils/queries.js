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