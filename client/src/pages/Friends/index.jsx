import * as React from 'react';
import FriendList from "../../components/FriendList"
import Search from "../../components/SearchBar";
import './style.css';
import Auth from '../../utils/auth'
import { QUERY_USER, QUERY_USERS } from '../../utils/queries';
import { useQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { REMOVE_FRIEND } from '../../utils/mutations';

export default function Friends() {
  const navigate = useNavigate()

  useEffect(() => {
    if (!Auth.loggedIn()) {
      navigate('/')
    }
  }, [navigate]);

  const userId = Auth.getProfile().data._id;

  const { loading: loading1, data: userData } = useQuery(QUERY_USER, {
    variables: { _id: userId }
  });

  const { loading: loading2, data: usersData, refetch } = useQuery(
    QUERY_USERS, { fetchPolicy: 'network-only' }
  );

  const [usersState, setUsersState] = useState([])

  useEffect(() => {
    if (usersData && usersData.users) {
      const filteredUsers = usersData.users.filter(user => userData.user.friends.includes(user._id))
      setUsersState(filteredUsers.reverse())
    }
  }, [userData, usersData]);

  const [removeFriend] = useMutation(REMOVE_FRIEND)

  const handleRemove = async (userId, friendId, index) => {
    try {
      await removeFriend({
        variables: { userId: userId, friendId: friendId }
      })

      const updatedUsers = [...usersState]
      updatedUsers.splice(index, 1)
      setUsersState(updatedUsers)
    } catch (err) {
      console.error(err)
    }
  };

  if (loading1 || loading2) {
    return <h2>Loading...</h2>
  }

  return (
    <>
      <Search />
      <h1>Your Friends</h1>

      {usersState.map((user, index) => (
        <FriendList
          key={user._id}
          friendId={user._id}
          userId={userId}
          name={user.name || user.username}
          avatar={user.avatar}
          color={user.color}
          index={index}
          handleRemove={handleRemove}
        />
      ))}
    </>
  )
}