import { Card, Avatar, CardHeader, CardBody, CardFooter, Stack, Heading, Button, Text } from '@chakra-ui/react';
import './style.css'

const YourPost = (props) => {
    const { url, name, color, text, userId } = props;
    return (
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
            // alignItems="center"
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
                    <button
                        className='reply-button'
                        variant='solid'
                        style= {{backgroundColor: color}}
                    >
                        REPLY
                    </button>
                </CardFooter>
            </Stack>
            <Stack className='name-container' display='flex' flexDirection='column' alignItems='center'>
                {/* <Heading size='md'>{name}</Heading> */}
                <h2>{name}</h2>
                <Avatar
                    size='lg' src={url} name={name}
                />
            </Stack>

        </Card>
    )
}

export default YourPost;