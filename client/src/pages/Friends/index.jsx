import * as React from 'react';
import FriendList from "../../components/FriendList"
import Search from "../../components/SearchBar";
import './style.css';
import Auth from '../../utils/auth'
import { QUERY_USER, QUERY_USERS } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router';

const name = ['Jimmy Smith', 'Marie Travolta', 'Billy Lou', 'Gren Thalamus', 'Kristine Sinclair', 'Benjamin Phonics'];
const avatar = ['/avatarImages/braedonMcCloud.jpg', '/avatarImages/davidClode.jpg', '/avatarImages/alexanderDummer.jpg', '/avatarImages/marcelStrauss.jpg', '/avatarImages/forestSimon.jpg', '/avatarImages/maxKleinen.jpg']
const color = ['#FFDAE7', '#FFD073', '#FFF0B5', '#D8FFA5', '#B9E5FF', '#D9C5FF']
const friends = ['1', '2', '3', '4', '5'];

export default function Friends() {

  const navigate = useNavigate

  if (Auth.loggedIn() === false) {
    console.log('hit')
    navigate('/')
  }

  const userId = Auth.getProfile().data._id
  console.log(userId)

  let { loading: loading1, data: userData } = useQuery(QUERY_USER, {
    variables: { _id: userId }
  })

  let { loading: loading2, data: users } = useQuery(
    QUERY_USERS, { fetchPolicy: 'network-only' })

  if (userData) {
    userData = userData.user
    console.log(userData)
  }

  if (users) {
    users = users.users
    console.log(users)
  }

  if (loading1 || loading2) {
    return (
      <h2>...Loading</h2>
    )
  }

  console.log(users.filter((user) => userData.friends.includes(user._id)))

  return (
    <>
      <Search />
      <h1>Your Friends</h1>

      {/* {userData.friends.toReversed().map((friend) => {
        return (
          <FriendList key={friend} userId={friend}></FriendList>
        )
      })} */}
      {users.filter((user) => userData.friends.includes(user._id)).toReversed().map((user) => {
        return (
          <FriendList
            key={user._id}
            userId={user._id}
            name={user.name || user.username}
            avatar={user.avatar}
            color={user.color}>
          </FriendList>
        )
      })}
    </>
  );
}