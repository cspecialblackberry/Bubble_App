import YourPost from "../../components/YourPost";
import FriendPost from "../../components/FriendPost";
import './style.css';

//array of posts

//array of users
const name = ['Jimmy Smith', 'Marie Travolta', 'Billy Lou', 'Gren Thalamus', 'Kristine Sinclair', 'Benjamin Phonics'];
const image = ['/profile-icon.svg', '/login-icon.svg', '/friends-icon.svg', '/bubbles-icon.svg', '/bubble-wand-icon.svg', '/bubble-app-logo.svg']
const color = ['#FFDAE7', '#FFD073', '#FFF0B5', '#D8FFA5', '#B9E5FF', '#D9C5FF']
const bubbles = ['Let\'s go Phillies! Big win tonight!',
 'Stop judging people for what they put on their bagels! Chocolate sauce is good!',
  'Anyone want to go to the mall later on?',
   'I cannot get used to the sun being up at this time. Crazy daylight savings lol',
    'Sushi night!',
     'I must be trippin frfr, I thought you were an elk for a minute'];

export default function Home() {
  return (
    <>
    <YourPost name='Bryan Schneller' url='/bubbles-icon.svg' text='Expand your mind with Bubbles' color='#FFF0B5'></YourPost>
      {bubbles.map((bubble, index) => {
        return (
          <FriendPost key={index} name={name[index]} url={image[index]} text={bubbles[index]} color={color[index]}></FriendPost>
        )
      })}
    </>
  );
}
