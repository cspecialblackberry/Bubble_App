import { Card, CardHeader, CardBody, CardFooter, Text } from '@chakra-ui/react'; //for Bio section
import UserAvatar from '../../components/ProfileImage';
// import EditForm from '../../components/EditForm';
import YourPost from '../../components/YourPost';
import FriendPost from '../../components/FriendPost';
import './style.css';

//Profile will contain:
//A given user ID (yours, or the person you clicked on)
//Boolean about whether it's your profile or not (compare user in question ID to logged-in user ID)
//Display:
//User's name
//User avatar
//User Bio
//User's "bubbles"

//EDIT (If it's your profile):
//Give edit options:
//Edit name
//Edit avatar
//Edit mycolor
//Edit bio
//Delete my posts

//Hardcoded information:
const name = 'Jimmy Smith';
const image = '/profile-icon.svg';
const bio = 'I am a React coder from Cleveland, Ohio. Excited to meet more friends on this site.';
const color = '#FFD073';
const bubbles = ['Let\'s go Phillies! Big win tonight!', 'Stop judging people for what they put on their bagels! Chocolate sauce is good!', 'Anyone want to go to the mall later on?'];

const Profile = () => {
    return (
        <>
            <h1>{name}</h1>
            {/* <EditForm></EditForm> */}
            <UserAvatar url={image} name={name}></UserAvatar>
            <Text bgColor={color}>{bio}</Text>
            <h2>Recent Bubbles:</h2>
            {/*Needs a ternary for whether the user's id matches the logged in user's id or not*/}
            {bubbles.map((bubble, index) => {
                return(
                    <YourPost key={index} name={name} url={image} text={bubble} color={color}></YourPost>
                )
            })}
        </>
    )
}

export default Profile;
