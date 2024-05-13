import { Card, Avatar, CardHeader, CardBody, CardFooter, Stack, Heading, Button, Text } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import './style.css';
import { ADD_REPLY } from '../../utils/mutations';
import { useState } from 'react'
import Auth from '../../utils/auth';
import { QUERY_POSTS, QUERY_USER_INFO } from '../../utils/queries';
import ReplyForm from '../ReplyForm';

const Reply = (props) => {
    const { url, isFriend, name, color, text, userId, type, postId, handleDelete, index, replyId, handleDeleteReply, repliesArr, setRepliesArr, isOnYourPost } = props;

    console.log('userid', userId)

    const [openReply, setOpenReply] = useState(false);

    const token = Auth.getProfile();

    const isReply = type === 'reply';
    const isOwnPost = userId === token.data._id;
    const isMainPost = type === 'main';


    const userQuery = useQuery(QUERY_USER_INFO, {
        variables: { _id: userId }
    })

    let userData
    if (userQuery.data) {
        userData = userQuery.data.user
    }
    if (userQuery.error) {
        console.error(userQuery.error)
    }
    if (userQuery.loading) {
        return (
            <h1>...loading</h1>
        )
    } else {

        return (
            <>
                <Card
                    className={isMainPost ? 'your-bubble' : 'reply-bubble'}
                    direction={{ base: 'column', sm: 'row' }}
                    overflow='hidden'
                    variant='outline'
                    border='1px'
                    borderColor={userData.color}
                    borderRadius={35}
                    display='flex'
                    flexDirection={isOwnPost ? 'row' : 'row-reverse'}
                    padding={5}
                    marginTop={-.4}
                >
                    <Stack className='content-container' textAlign={isOwnPost ? 'left' : 'right'}>
                        <CardBody padding={0}>
                            <p className='bubble-text'>
                                {text}
                            </p>
                        </CardBody>
                        <CardFooter padding={0}>
                            {isFriend ? isMainPost ? <ReplyForm
                                openReply={openReply}
                                setOpenReply={setOpenReply}
                                postId={postId}
                                repliesArr={repliesArr}
                                setRepliesArr={setRepliesArr}
                                color={userData.color}
                            ></ReplyForm> : <></> :<></>
                            }
                            {(isOwnPost || isOnYourPost) && <button
                                className='reply-button'
                                variant='solid'
                                style={{ backgroundColor: userData.color }}
                                onClick={() => {
                                    if (isMainPost) {
                                        handleDelete(userId, postId, index);
                                    } else {
                                        handleDeleteReply(postId, replyId, index);
                                    }
                                }}
                            >
                                BURST
                            </button>
                            }
                            {/* add in something if both are empty */}
                        </CardFooter>
                    </Stack>
                    <Stack className='name-container' display='flex' flexDirection='column' alignItems='center'>
                        <Link to="/profile" state={{ from: userData._id }}>
                            <h3>{userData.name || userData.username}</h3>
                            <Avatar
                                size={isMainPost ? 'lg' : 'md'} src={userData.avatar} name={name}
                            />
                        </Link>
                    </Stack>
                </Card>
            </>
        )
    }
}

export default Reply;

// CASEY-TODO:
// replies on profile page refresh
// ensure friends' profile + replies show up using Reply component
// reply sizing - smaller delete & padding?
// remove console logs
// comment out YourPost + FriendPost to ensure it works without them
// auto login?

// media queries:
// logo bigger
// h1 bigger
// posts wider
// edit button to center
// footer more compact - text
