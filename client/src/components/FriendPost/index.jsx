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
            display='flex'
            alignItems="center"
            flexDirection='row'
            marginTop={3}
        >
            
            <Stack className='name-container' display='flex' flexDirection='column' alignItems='center'>
                <h2>{name}</h2>
                <Avatar
                    size='md' src={url}
                />
            </Stack>
            <Stack>
                <CardBody>
                    <Text py='2'>
                        {text}
                    </Text>
                </CardBody>
                <CardFooter>
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