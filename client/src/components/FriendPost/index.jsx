import { Card, Avatar, CardHeader, CardBody, CardFooter, Stack, Heading, Button, Text } from '@chakra-ui/react';
import './style.css'

const FriendPost = (props) => {
    const { url, name, color, text, userId } = props;
    return (
        <Card
            className='friend-bubble'
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
            border='1px'
            borderColor={color}
            borderRadius={35}
            width={350}
            minHeight={200}
            display='flex'
            // alignItems="center"
            flexDirection='row'
            padding={5}
            marginTop={3}
        >
            
            <Stack className='name-container' display='flex' flexDirection='column' alignItems='center'>
                <h2>{name}</h2>
                <Avatar
                    size='md' src={url}
                />
            </Stack>
            <Stack className='content-container'>
                <CardBody padding={0}>
                    <p className='bubble-text'>
                        {text}
                    </p>
                </CardBody>
                <CardFooter className='friend-bubble-footer' padding={0}>
                <button
                        className='reply-button'
                        variant='solid'
                        style= {{backgroundColor: color}}
                    >
                        REPLY
                    </button>
                </CardFooter>
            </Stack>
        </Card>
    )
}

export default FriendPost;

// CASEY-TODO: PADDING ON CARD BODY, CARD FLEX