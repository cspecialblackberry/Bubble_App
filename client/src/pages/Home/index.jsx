import YourPost from "../../components/YourPost";
import FriendPost from "../../components/FriendPost";
import './style.css';
import Auth from '../../utils/auth'
import { QUERY_USER, QUERY_POSTS, QUERY_USER_INFO } from '../../utils/queries';
import { DELETE_POST, DELETE_REPLY } from "../../utils/mutations";
import { useQuery, useMutation } from '@apollo/client';
import Reply from "../../components/Reply";
import { useState, useEffect } from 'react'

export default function Home() {
  if (Auth.loggedIn() === false) {
    window.location.replace('/')
  }

  const [postsArr, setPostsArr] = useState([])
  const [repliesArr, setRepliesArr] = useState([])

  const token = Auth.getProfile()

  const { loading, data } = useQuery(
    QUERY_USER, { variables: { _id: token.data._id } }
  )

  const { loading: l, data: postData } = useQuery(
    QUERY_POSTS, { fetchPolicy: 'network-only' }
  )

  useEffect(() => {
    if (postData && postData.posts && data && data.user) {
      let filteredPosts = postData.posts.filter(({ user }) => user === token.data._id || data.user.friends.includes(user)).toReversed()
      setPostsArr(filteredPosts)
    }
  }, [data, postData])
  console.log(postData)
  
  const [deletePost] = useMutation(DELETE_POST)
  const [deleteReply] = useMutation(DELETE_REPLY)

  const handleDelete = async (userId, postId, replyId, index) => {
    try {
      await deletePost({
        variables: { userId: userId, postId: postId }
      })
      let updatedPosts = [...postsArr]
      updatedPosts.splice(index, 1)
      setPostsArr(updatedPosts)
    } catch (err) {
      console.error(err)
    }
  }

  const handleDeleteReply = async ( postId, replyId, index) => {
    try {
      await deleteReply({
        variables: { postId: postId, replyId: replyId }
      })
      let updatedReplies = [...repliesArr]
      updatedReplies.splice(index, 1)
      setRepliesArr(updatedReplies)
    } catch (err) {
      console.error(err)
    }
  }

  if (loading || l) {
    return (
      <h2>...loading</h2>
    )
  }

  return (
    <>
      <h1>Here's what's poppin'</h1>
      {postsArr.length && postsArr.map((post, index) => {
        if (post.user === token.data._id) {
          return (
            <article key={post._id} className="post-block">
              <Reply
                type='main'
                name={data.user.name}
                url={data.user.avatar}
                text={post.postText}
                color={data.user.color}
                userId={data.user._id}
                postId={post._id}
                handleDelete={handleDelete}
                index={index}
              >
              </Reply>
              {post.replies.map(reply => (
                <Reply
                  key={reply._id}
                  replyId={reply._id}
                  postId={post._id}
                  type='reply'
                  name={reply.username}
                  text={reply.responseText}
                  userId={reply.user}
                  handleDeleteReply={handleDeleteReply}
                  index={index}
                >
                </Reply>
              ))
              }
            </article>
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