import {gql} from '@apollo/client'

export const ADD_USER = gql`
    mutation addUser($username: String!, $password: String!, $name: String){
        addUser(username: $username, password: $password, name: $name){
            _id
            username
            password
            name
        }
    }
`

export const LOGIN = gql`

`