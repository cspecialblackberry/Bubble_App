import { Card, Avatar, CardHeader, CardBody, CardFooter, Stack, Heading, Button, Text } from '@chakra-ui/react';

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
            display='flex'
            alignItems="center"
            flexDirection='row'
            marginTop={3}
        >
            <Stack width={250}>
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
            <Stack display='flex' flexDirection='column' alignItems='center'>
                <Heading size='md'>{name}</Heading>
                <Avatar
                    size='md' src={url}
                />
            </Stack>
            
        </Card>
    )
}

export default YourPost;