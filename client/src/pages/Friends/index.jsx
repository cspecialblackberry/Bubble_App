import * as React from 'react';
import FriendList from "../../components/FriendList"
import Search from "../../components/SearchBar";
import './style.css';
import Auth from '../../utils/auth'
import { QUERY_USER, QUERY_USERS } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';

const name = ['Jimmy Smith', 'Marie Travolta', 'Billy Lou', 'Gren Thalamus', 'Kristine Sinclair', 'Benjamin Phonics'];
const avatar = ['/avatarImages/braedonMcCloud.jpg', '/avatarImages/davidClode.jpg', '/avatarImages/alexanderDummer.jpg', '/avatarImages/marcelStrauss.jpg', '/avatarImages/forestSimon.jpg', '/avatarImages/maxKleinen.jpg']
const color = ['#FFDAE7', '#FFD073', '#FFF0B5', '#D8FFA5', '#B9E5FF', '#D9C5FF']
const friends = ['1', '2', '3', '4', '5'];

export default function Friends() {
  const [usersState, setUsersState] = useState(true)
  console.log(usersState)

  let users = []
  let loading 

  useEffect(() => {
    console.log(users)
  }, [users])

  const navigate = useNavigate

  if (Auth.loggedIn() === false) {
    navigate('/')
  }

  const userId = Auth.getProfile().data._id

  let { loading: loading1, data: userData } = useQuery(QUERY_USER, {
    variables: { _id: userId }
  })

  let { loading: loading2, data: users1 } = useQuery(
    QUERY_USERS, { fetchPolicy: 'network-only' })

  if (userData) userData = userData.user

  if (users1) {
    console.log('hit')
    users = users1.users.filter((user) => userData.friends.includes(user._id)).toReversed()
    console.log(users)
  }

  if (loading1 || loading2) {
    return (
      <h2>...Loading</h2>
    )
  }

  return (
    <>
      <Search />
      <h1>Your Friends</h1>

      {users.map((user, index) => {
        return (
          <FriendList
            key={user._id}
            friendId={user._id}
            userId={userId}
            name={user.name || user.username}
            avatar={user.avatar}
            color={user.color}
            state={usersState}
            setUsersState={setUsersState}
            index={index}
            arr={users}>
          </FriendList>
        )
      })}
    </>
  );
}