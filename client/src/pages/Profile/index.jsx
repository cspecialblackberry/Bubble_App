import { Card, CardHeader, CardBody, CardFooter, Text, IconButton } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import UserAvatar from '../../components/ProfileImage';
import EditForm from '../../components/EditForm';
import YourPost from '../../components/YourPost';
import FriendPost from '../../components/FriendPost';
import { useState } from 'react';
import './style.css';
import { useLocation } from 'react-router-dom';
import { QUERY_USER } from '../../utils/queries'
import { useQuery } from '@apollo/client'

//Profile will contain:
//A given user ID (yours, or the person you clicked on)
//Boolean about whether it's your profile or not (compare user in question ID to logged-in user ID)
//Display:
//User's name
//User avatar
//User Bio
//User's "bubbles"


//Hardcoded information:
const name = 'Jimmy Smith';
const image = '/avatarImages/forestSimon2.jpg';
const bio = 'I am a React coder from Cleveland, Ohio. Excited to meet more friends on this site.';
const color = '#FFD073';
const bubbles = ['Let\'s go Phillies! Big win tonight!', 'Stop judging people for what they put on their bagels! Chocolate sauce is good!', 'Anyone want to go to the mall later on?'];

const Profile = () => {
    const [editIsOpen, setEditIsOpen] = useState(false);
    const location = useLocation();
    const { from } = location.state;
    console.log(from);
    const userId = from.data._id
    console.log(userId)

    const userInfo = useQuery(QUERY_USER, { variables: { _id: from.data._id } })
    let posts =[]

    if (userInfo.data) {
        console.log(userInfo.data)
        posts = userInfo.data.user.posts
        console.log(posts)
    }

    const handleEditButtonClick = () => {
        console.log('hit');
        if (editIsOpen) {
            setEditIsOpen(false);
        } else {
            setEditIsOpen(true);
        }
    }

    return (
        <>
            {userInfo.loading ? 
            <h2>...loading</h2>
            : 
            <>
            <h1>{userInfo.data.user.name || userInfo.data.user.username}</h1>
            <UserAvatar url={userInfo.data.user.avatar} name={userInfo.data.user.name}></UserAvatar>
            <Text bgColor={userInfo.data.user.color}>{userInfo.data.user.bio || "New to bubble!"}</Text>
            {editIsOpen ? <EditForm editIsOpen={editIsOpen} setEditIsOpen={setEditIsOpen}></EditForm> : <IconButton aria-label='Edit Profile' icon={<EditIcon />} onClick={handleEditButtonClick} ></IconButton>}
            <h2>Recent Bubbles:</h2>
            {posts.map((post, index) => {
                return (
                    <YourPost key={post._id} name={userInfo.data.user.name || userInfo.data.user.username} url={userInfo.data.user.avatar} text={post.postText} color={userInfo.data.user.color}></YourPost>
                )
            })}
            </>}
        </>

    )
}

export default Profile;
