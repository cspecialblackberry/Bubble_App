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
    mutation login($username:String!, $password:String!){
        login(username: $username, password: $password){
            token
            user{
                _id
                color
                username
            }
        }
    }
`
export const ADD_POST = gql`
    mutation addPost($userId: ID!, $postText: String!){
        addPost(userId: $userId, postText: $postText){
            _id
            user
            postText
        }
    }
`