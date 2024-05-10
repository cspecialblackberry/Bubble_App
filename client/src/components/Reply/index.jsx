import { Card, Avatar, CardHeader, CardBody, CardFooter, Stack, Heading, Button, Text } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import './style.css';
import { ADD_REPLY } from '../../utils/mutations';
import { useState } from 'react'
import Auth from '../../utils/auth';

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
    const canReply = isMainPost && !isOwnPost;


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


    return (
        <>
            {/* <div>
        {post.replies.map(reply => (
          <div key={reply.id}>
            <p>{reply.content}</p>
            <p>By: {reply.author}</p>
          </div>
        ))}
      </div> */}

            {/* on the home page - put a post and all replies into a box */}

            {/* classname changes based on boolean conditions */}
            <Card
                className='your-bubble'
                direction={{ base: 'column', sm: 'row' }}
                overflow='hidden'
                variant='outline'
                border='1px'
                borderColor={color}
                borderRadius={35}
                width={350}
                minHeight={200}
                display='flex'
                flexDirection='row'
                padding={5}
                marginTop={3}
            >
                <Stack className='content-container'>
                    <CardBody padding={0}>
                        <p className='bubble-text'>
                            {text}
                        </p>
                    </CardBody>
                    <CardFooter padding={0}>
                        {openReply ? 'show form' : ''}
                        {canReply ? <button
                            className='reply-button'
                            type='button'
                            variant='solid'
                            style={{ backgroundColor: color }}
                            onClick={openReplyForm}
                        >
                            REPLY
                        </button> : ''}
                        {isOwnPost ? <button
                            className='reply-button'
                            variant='solid'
                            style={{ backgroundColor: color }}
                        >
                            DELETE
                        </button> : ''}
                        {/* add in something if both are empty */}
                    </CardFooter>
                </Stack>
                <Stack className='name-container' display='flex' flexDirection='column' alignItems='center'>
                    <Link to="/profile" state={{ from: userId }}>
                        <h2>{name}</h2>
                        <Avatar
                            size='lg' src={url} name={name}
                        />
                    </Link>
                </Stack>
            </Card>
        </>
    )
}

export default Reply;