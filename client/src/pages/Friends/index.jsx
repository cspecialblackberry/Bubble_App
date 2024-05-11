import * as React from 'react';
import FriendList from "../../components/FriendList"
import Search from "../../components/SearchBar";
import './style.css';
import Auth from '../../utils/auth'
import { QUERY_USER } from '../../utils/queries';
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

  const userQuery = useQuery(QUERY_USER, {
    variables: { _id: userId }
  })
  let userData

  if (userQuery.data) {
    userData = userQuery.data.user
  }

  if(userQuery.loading){
    return(
      <h2>...Loading</h2>
    )
  }

  return (
    <>
      <Search />
      <h1>Your Friends</h1>

      {userData.friends.map((friend, index) => {
        return (
          <FriendList key={friend} userId={friend}></FriendList>
        )
      })}
    </>
  );
}