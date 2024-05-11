import { Card, Avatar, CardHeader, CardBody, CardFooter, Stack, Heading, Button, Text } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import './style.css';
import { ADD_REPLY } from '../../utils/mutations';
import { useState } from 'react'
import Auth from '../../utils/auth';
import { QUERY_USER_INFO } from '../../utils/queries';

const Reply = (props) => {
    const { url, name, color, text, userId, type } = props;

    const [openReply, setOpenReply] = useState(false);
    const [replyContent, setReplyContent] = useState();

    const [addReply, addReplyStatus] = useMutation(ADD_REPLY)

    const openReplyForm = () => setOpenReply(true);

    const token = Auth.getProfile();
    console.log(token)

    const isReply = type === 'reply';
    const isOwnPost = userId === token.data._id;
    const isMainPost = type === 'main';
    // const canReply = isMainPost && !isOwnPost;


    const userQuery = useQuery(QUERY_USER_INFO, {
        variables: { _id: userId }
    })


    const handleReply = async () => {
        try {
            const res = await addReply({
                variables: { name: name, color: color }
            })
            console.log('reply:', res)
        } catch (error) {
            console.error(error)
        }
    }

    // click reply, blank card appears beneath
    // submit reply button

    let userData
    if (userQuery.data) {
        userData = userQuery.data.user
    }
    if (userQuery.error) {
        console.log(userQuery.error)
    }
    if (userQuery.loading) {
        return (
            <h1>...loading</h1>
        )
    } else {

    return (
        <>
            {/* on the home page - put a post and all replies into a box */}

            {/* classname changes based on boolean conditions */}
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
                marginTop={3}
            >
                <Stack className='content-container' textAlign={isOwnPost ? 'left' : 'right'}>
                    <CardBody padding={0}>
                        <p className='bubble-text'>
                            {text}
                        </p>
                    </CardBody>
                    <CardFooter padding={0}>
                        {openReply ? 'show form' : ''}
                        {isMainPost ? <button
                            className='reply-button'
                            type='button'
                            variant='solid'
                            style={{ backgroundColor: userData.color }}
                            onClick={openReplyForm}
                        >
                            REPLY
                        </button> : ''}
                        {isOwnPost ? <button
                            className='reply-button'
                            variant='solid'
                            style={{ backgroundColor: userData.color }}
                        >
                            DELETE
                        </button> : ''}
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
}}

export default Reply;