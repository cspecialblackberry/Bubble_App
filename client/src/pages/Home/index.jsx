import YourPost from "../../components/YourPost";
import FriendPost from "../../components/FriendPost";
import './style.css';
import Auth from '../../utils/auth'
import { QUERY_USER, QUERY_POSTS } from '../../utils/queries';
import { useQuery, useLazyQuery } from '@apollo/client';
import Reply from "../../components/Reply";

export default function Home() {
  if (Auth.loggedIn() === false) {
    console.log('hit')
    window.location.replace('/')
  }

  const token = Auth.getProfile()
  console.log(token.data._id)

  const { loading, data } = useQuery(
    QUERY_USER, { variables: { _id: token.data._id } }
  )

  const { loading: l, data: postData } = useQuery(
    QUERY_POSTS, { fetchPolicy: 'network-only' }
  )

  return (
    <>
      <h1>Here's what's poppin'</h1>
      {postData && data && postData.posts && data.user && postData.posts.filter(({ user }) => user === token.data._id || data.user.friends.includes(user)).toReversed().map((post) => {
        if (post.user === token.data._id) {
          return (
            <div key={post._id}>
              <Reply type='main' name={data.user.name} url={data.user.avatar} text={post.postText} color={data.user.color} userId={data.user._id}></Reply>
              {post.replies.map(reply => (
                <Reply key={reply._id} type='reply' name={reply.user.name} url={reply.userAvatar} text={reply.responseText} color={reply.user.color} userId={reply.userId} ></Reply>
              ))}
            </div>


            //  <div key={post._id}>
            //    <Reply type='main' name={userData.user.name} url={userData.user.avatar} text={post.postText} color={userData.user.color} userId={userData.user._id} />
            //    {post.replies.map(reply => (
            //    <Reply key={reply._id} type='reply' name={reply.userName} url={reply.userAvatar} text={reply.replyText} color={reply.userColor} userId={reply.userId} />
            //    )}
            //</div>

          )
        } else {
          return (
            <FriendPost key={post._id} postId={post._id} text={post.postText} userId={post.user}></FriendPost>
          )
        }
      })}
    </>
  );
}