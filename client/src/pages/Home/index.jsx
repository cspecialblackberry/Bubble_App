import YourPost from "../../components/YourPost";
import FriendPost from "../../components/FriendPost";
import './style.css';
import Auth from '../../utils/auth'
import { QUERY_USER, QUERY_POSTS, QUERY_USER_INFO } from '../../utils/queries';
import { DELETE_POST } from "../../utils/mutations";
import { useQuery, useMutation } from '@apollo/client';
import Reply from "../../components/Reply";
import { useState, useEffect } from 'react'

export default function Home() {
  if (Auth.loggedIn() === false) {
    window.location.replace('/')
  }

  const [postsArr, setPostsArr] = useState([])

  const token = Auth.getProfile()
  console.log(token.data._id)

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

  const [deletePost] = useMutation(DELETE_POST)

  const handleDelete = async (userId, postId, index) => {
    try {
      console.log(userId, postId, index)
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

  if (loading || l) {
    return (
      <h2>...loading</h2>
    )
  }

  console.log(postsArr)

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
                  type='reply'
                  name={reply.username}
                  text={reply.responseText}
                  userId={reply.user}
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