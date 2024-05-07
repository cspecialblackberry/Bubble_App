import { Card, CardHeader, CardBody, CardFooter, Text, IconButton } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import UserAvatar from '../../components/ProfileImage';
import EditForm from '../../components/EditForm';
import YourPost from '../../components/YourPost';
import FriendPost from '../../components/FriendPost';
import { useState } from 'react';
import './style.css';

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

const Profile = (props) => {
    const [editIsOpen, setEditIsOpen] = useState(false);

    const handleEditButtonClick = () => {
        console.log('hit');
        if(editIsOpen){
            setEditIsOpen(false);
        } else {
            setEditIsOpen(true);
        }
    }

    return (
        <>  
            <h1>{name}</h1>
            <UserAvatar url={image} name={name}></UserAvatar>
            <Text bgColor={color}>{bio}</Text>
            {editIsOpen ? <EditForm editIsOpen={editIsOpen} setEditIsOpen={setEditIsOpen}></EditForm> : <IconButton aria-label='Edit Profile' icon={<EditIcon/>} onClick={handleEditButtonClick} ></IconButton>}
            <h2>Recent Bubbles:</h2>
            {bubbles.map((bubble, index) => {
                return(
                    <YourPost key={index} name={name} url={image} text={bubble} color={color}></YourPost>
                )
            })}
        </>
    )
}

export default Profile;
