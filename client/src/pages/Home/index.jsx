import YourPost from "../../components/YourPost";
import FriendPost from "../../components/FriendPost";
import './style.css';
import Auth from '../../utils/auth'
import { QUERY_USER, QUERY_POSTS } from '../../utils/queries';
import { useQuery, useLazyQuery } from '@apollo/client';

const name = ['Jimmy Smith', 'Marie Travolta', 'Billy Lou', 'Gren Thalamus', 'Kristine Sinclair', 'Benjamin Phonics'];
const image = ['/avatarImages/braedonMcCloud.jpg', '/avatarImages/davidClode.jpg', '/avatarImages/alexanderDummer.jpg', '/avatarImages/marcelStrauss.jpg', '/avatarImages/forestSimon.jpg', '/avatarImages/maxKleinen.jpg']
const color = ['#FFDAE7', '#FFD073', '#FFF0B5', '#D8FFA5', '#B9E5FF', '#D9C5FF']
const bubbles = ['Let\'s go Phillies! Big win tonight!',
  'Stop judging people for what they put on their bagels! Chocolate sauce is good!',
  'Anyone want to go to the mall later on?',
  'I cannot get used to the sun being up at this time. Crazy daylight savings lol',
  'Sushi night!',
  'Bubble is the new Myspace'];

export default function Home() {

  const token = Auth.getProfile()
  console.log(token.data._id)

  const { loading, data } = useQuery(
    QUERY_USER, { variables: { _id: token.data._id } }
  )

  const { loading:l, data:postData } = useQuery(
    QUERY_POSTS, { fetchPolicy: 'network-only' }
  )

  return (
    <>
      <h1>Here's what's poppin'</h1>

      {postData && data && postData.posts && data.user && postData.posts.filter(({user}) => user === token.data._id || data.user.friends.includes(user)).toReversed().map((post) => {
        if (post.user === token.data._id) {
          return (
            <YourPost key={post._id} name={data.user.name} url={data.user.avatar} text={post.postText} color={data.user.color} userId={data.user._id}></YourPost>
          )
        } else {
          return (
            <FriendPost key={post._id} postId={post._id} text={post.postText} userId={post.user}></FriendPost>
          )
        }
      })}

      {/* <YourPost name='Doug Hamilton' url='/avatarImages/alfredSchrock.jpg' text='Expand your mind with Bubbles' color='#FFF0B5'></YourPost>
      {bubbles.map((bubble, index) => {
        return (
          <FriendPost key={index} name={name[index]} url={image[index]} text={bubble} color={color[index]}></FriendPost>
        )
      })} */}
    </>
  );
}