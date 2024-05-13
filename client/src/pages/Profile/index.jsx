import { Card, CardHeader, CardBody, CardFooter, Text, IconButton, Box } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import UserAvatar from '../../components/ProfileImage';
import EditForm from '../../components/EditForm';
import { useState, useEffect } from 'react';
import './style.css';
import { useLocation } from 'react-router-dom';
import { QUERY_USER } from '../../utils/queries';
import { DELETE_POST } from '../../utils/mutations';
import { useQuery, useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import Reply from '../../components/Reply';
import { ADD_FRIEND } from '../../utils/mutations';

const Profile = () => {
    if (Auth.loggedIn() === false) {
        console.log('hit')
        window.location.replace('/')
    }
    const [editIsOpen, setEditIsOpen] = useState(false);
    const [hasEditButton, setHasEditButton] = useState(false);
    const [postsArr, setPostsArr] = useState([])
    const [isFriend, setIsFriend] = useState(true);

    const location = useLocation();
    const { from } = location.state;
    console.log(from)
    const userId = from;

    const yourId = Auth.getProfile().data._id;

    useEffect(() => {
        if (userId === yourId) {
            setHasEditButton(true);
        }
    }, []);

    const yourInfo = useQuery(QUERY_USER, { variables: { _id: yourId }, fetchPolicy: 'network-only' })

    useEffect(() => {
        if (yourInfo.data) {
            console.log('hits yourinfo')
            console.log(yourInfo.data.user.friends, 'friends');
            if (yourId === userId || yourInfo.data.user.friends.includes(userId)) {
                setIsFriend(true)
            } else {
                setIsFriend(false)
            }
        }
    }, [yourInfo])

    console.log(isFriend, 'isFriend')

    const userInfo = useQuery(QUERY_USER, { variables: { _id: from }, fetchPolicy: 'network-only' })
    let posts = []

    useEffect(() => {
        if (userInfo?.data?.user?.posts) {
            setPostsArr(userInfo.data.user.posts.toReversed())
        }
    }, [userInfo])

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

    if (userInfo.data) {
        console.log(userInfo.data)
        console.log(userInfo)
        posts = userInfo.data.user.posts.toReversed()
        console.log(posts, 'posts')
    }

    const handleEditButtonClick = () => {
        if (editIsOpen) {
            setEditIsOpen(false);
        } else {
            setEditIsOpen(true);
        }
    }

    const [addFriend] = useMutation(ADD_FRIEND);


    const handleAdd = async (user, your) => {
        setIsFriend(true);
        try {
            console.log(userId, yourId)
            await addFriend({
                variables: { userId: your, friendId: user }
            })
        } catch (err) {
            console.error(err)
        }
    };

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
                    {!isFriend ? <button
                        variant='solid'
                        // style={{ backgroundColor: color }}
                        onClick={() => handleAdd(userId, yourId)}
                    >Add Friend</button> : <></>}
                    <h2>Recent Bubbles:</h2>
                    {postsArr.map((post, index) => {
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
                                    isFriend={isFriend}
                                >
                                </Reply>
                                {/* {post.replies.map(reply => (
                                    <Reply
                                        key={reply._id}
                                        type='reply'
                                        name={reply.username}
                                        text={reply.responseText}
                                        userId={reply.user}
                                    >
                                    </Reply>
                                ))
                                } */}
                            </article>
                        )
                    })}
                </>}
        </>

    )
}

export default Profile;
