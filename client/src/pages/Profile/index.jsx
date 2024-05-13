import { Card, CardHeader, CardBody, CardFooter, Text, IconButton, Box } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import UserAvatar from '../../components/ProfileImage';
import EditForm from '../../components/EditForm';
import YourPost from '../../components/YourPost';
import FriendPost from '../../components/FriendPost';
import { useState, useEffect } from 'react';
import './style.css';
import { useLocation } from 'react-router-dom';
import { QUERY_USER, QUERY_POST } from '../../utils/queries';
import { DELETE_POST } from '../../utils/mutations';
import { useQuery, useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import Reply from '../../components/Reply';

const Profile = () => {
    if (Auth.loggedIn() === false) {
        window.location.replace('/')
    }
    const [editIsOpen, setEditIsOpen] = useState(false);
    const [hasEditButton, setHasEditButton] = useState(false);
    const [postsArr, setPostsArr] = useState([])

    const location = useLocation();
    const { from } = location.state;
    const userId = from;

    const yourId = Auth.getProfile().data._id;

    useEffect(() => {
        if (userId === yourId) {
            setHasEditButton(true);
        }
    }, []);


    const userInfo = useQuery(QUERY_USER, { variables: { _id: from }, fetchPolicy: 'network-only' })
    let posts = []

    const postData = useQuery(
        QUERY_POST, { fetchPolicy: 'network-only' }
      )

    useEffect(() => {
        if (userInfo?.data?.user?.posts) {
            setPostsArr(userInfo.data.user.posts.toReversed())
            console.log(posts[0].replies)
        }
    }, [userInfo])

    const [deletePost] = useMutation(DELETE_POST)

    const handleDelete = async (userId, postId, index) => {
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

    if (userInfo.data) {
        posts = userInfo.data.user.posts.toReversed()
    }
    console.log(posts)

    const handleEditButtonClick = () => {
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
                    <Box padding={5} bgColor={userInfo.data.user.color} marginBottom={5} borderRadius='50%' minWidth={300}>
                        <h1>{userInfo.data.user.name || userInfo.data.user.username}</h1>
                        <UserAvatar url={userInfo.data.user.avatar} name={userInfo.data.user.name}></UserAvatar>
                        <Text color='black' bgColor='white' border='2px' borderColor={userInfo.data.user.color}>{userInfo.data.user.bio || "New to bubble!"}</Text>
                    </Box >
                    {hasEditButton ? editIsOpen ? <EditForm editIsOpen={editIsOpen} setEditIsOpen={setEditIsOpen} userInfo={userInfo.data.user}></EditForm>
                        : <IconButton aria-label='Edit Profile' icon={<EditIcon className='button-size' />} onClick={handleEditButtonClick} alignSelf='end'></IconButton> : <></>}
                    <h2>Recent Bubbles:</h2>
                    {postsArr.length && postsArr.map((post, index) => {
                        return (
                            <article key={post._id} className="post-block">
                                <Reply
                                    key={post._id}
                                    type='main'
                                    name={userInfo.data.user.name || userInfo.data.user.username}
                                    url={userInfo.data.user.avatar}
                                    text={post.postText}
                                    color={userInfo.data.user.color}
                                    userId={from}
                                    postId={post._id}
                                    index={index}
                                    handleDelete={handleDelete}
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
                                        // handleDeleteReply={handleDeleteReply}
                                        index={index}
                                    >
                                    </Reply>
                                ))
                                }
                            </article>
                        )
                    })}
                </>}
        </>

    )
}

export default Profile;
