import { Card, CardBody, CardFooter, Stack } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import './style.css';

const Reply = (props) => {
    const { url, name, color, text, userId } = props;

    return (
        <Card
            className='reply-container'
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
            border='1px'
            borderColor={color}
            borderRadius={35}
            width={325}
            minHeight={150}
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
                    <button
                        className='reply-button'
                        variant='solid'
                        style={{ backgroundColor: color }}
                    >
                        DELETE
                    </button>
                </CardFooter>
            </Stack>
            <Stack className='name-container' display='flex' flexDirection='column' alignItems='center'>
                <Link to="/profile" state={{ from: userId }}>
                    <h2>{name}</h2>
                </Link>
            </Stack>
        </Card>
    )
}

export default Reply;