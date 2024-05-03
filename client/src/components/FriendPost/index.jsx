import { Card, Avatar, CardHeader, CardBody, CardFooter, Stack, Heading, Button, Text } from '@chakra-ui/react';

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
            
            <Stack display='flex' flexDirection='column' alignItems='center'>
                <Heading size='md'>{name}</Heading>
                <Avatar
                    size='md' src={url} name={name}
                />
            </Stack>
            <Stack>
                <CardBody>
                    <Text py='2'>
                        {text}
                    </Text>
                </CardBody>
                <CardFooter>
                    <Button variant='solid' bgColor={color} border={0}>
                        REPLY
                    </Button>
                </CardFooter>
            </Stack>
        </Card>
    )
}

export default FriendPost;