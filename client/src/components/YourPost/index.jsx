import { Card, Avatar, CardHeader, CardBody, CardFooter, Stack } from '@chakra-ui/react';

const YourPost = (props) => {
    const { url, name, text, userId } = props;
    return (
        <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
        >
            <Stack>
                <CardBody>
                    <Heading size='md'>{name}</Heading>
                    <Text py='2'>
                        {text}
                    </Text>
                </CardBody>

                <CardFooter>
                    <Button variant='solid' colorScheme='blue'>
                        REPLY
                    </Button>
                </CardFooter>
            </Stack>
            <Avatar
                size='md' name={name} src={{url}}
            />
        </Card>
    )
}

export default YourPost;