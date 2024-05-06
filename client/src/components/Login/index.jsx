import { Card, CardBody, Tabs, TabList, TabPanels, Tab, TabPanel, FormControl, FormLabel, Input, Button, InputGroup, InputRightElement, FormHelperText, FormErrorMessage, useToast } from '@chakra-ui/react'
import * as React from 'react'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../../utils/mutations'
import Auth from '../../utils/auth'

function LoginCreateAccount() {

    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const usernameChange = (e) => setUsername(e.target.value)
    const passwordChange = (e) => setPassword(e.target.value)

    const usernameError = username === ''
    const passwordError = password === ''

    const toast = useToast()
    const statuses = ['success', 'error', 'loading']

    const [login, { error }] = useMutation(LOGIN)
  
    const handleLogin = async () => {
        try{
            const res = await login({
                variables: {username: username, password: password}
            })
            console.log(res)
            const token = res.data.login.token;
            Auth.login(token)
        }catch(err){
            console.error(err)
        }
    }

    return (
        <>
            <Card boxShadow='lg' p='6' rounded='md' bg='white'>
                <CardBody>
                    <Tabs isFitted variant='enclosed'>
                        <TabList mb='1em'>
                            <Tab _selected={{ color: 'blue', bg: '#B9E5FF' }} className="tab">Login</Tab>
                            <Tab _selected={{ color: 'blue', bg: '#B9E5FF' }} className="tab">Create Account</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>

                                <FormControl isInvalid={usernameError}>
                                    <FormLabel>Username</FormLabel>
                                    <Input value={username} onChange={usernameChange} placeholder='Enter username' />
                                    {!usernameError ? (
                                        <FormHelperText>
                        
                                        </FormHelperText>
                                    ) : (
                                        <FormErrorMessage>Username is required.</FormErrorMessage>
                                    )}
                                </FormControl>

                                <FormControl isInvalid={passwordError}>
                                    <FormLabel>Password</FormLabel>
                                    <InputGroup size='md'>
                                        <Input 
                                            value={password} 
                                            onChange={passwordChange}
                                            pr='4.5rem'
                                            type={show ? 'text' : 'password'}
                                            placeholder='Enter password'
                                        />
                                        <InputRightElement width='4.5rem'>
                                            <Button h='1.75rem' size='sm' onClick={handleClick} mr={1}>
                                                {show ? 'Hide' : 'Show'}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                    {!passwordError ? (
                                        <FormHelperText>
                        
                                        </FormHelperText>
                                    ) : (
                                        <FormErrorMessage>Password is required.</FormErrorMessage>
                                    )}
                                </FormControl>

                                <Button mt={5} onClick={handleLogin}>
                                    Login
                                </Button>
                            </TabPanel>
                            <TabPanel>
                                <FormControl isRequired>
                                    <FormLabel>Full Name</FormLabel>
                                    <Input placeholder='Enter your full name' />
                                </FormControl>

                                <FormControl isRequired>
                                    <FormLabel>Username</FormLabel>
                                    <Input placeholder='Create a username' />
                                </FormControl>

                                <FormControl isRequired>
                                    <FormLabel>Password</FormLabel>
                                <InputGroup size='md'>
                                        <Input 
                                            pr='4.5rem'
                                            type={show ? 'text' : 'password'}
                                            placeholder='Create a password'
                                        />
                                        <InputRightElement width='4.5rem'>
                                            <Button h='1.75rem' size='sm' onClick={handleClick} mr={1}>
                                                {show ? 'Hide' : 'Show'}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                    </FormControl>

                                <Button mt={5}
                                onClick={() => {
                                    const examplePromise = new Promise((resolve, reject) => {
                                      setTimeout(() => resolve(200), 3000)
                                    })
                            
                                    toast.promise(examplePromise, {
                                      success: { title: 'Success!', description: 'Your account has been created' },
                                      error: { title: 'Error', description: 'There was a probelm creating your account. Please try again.' },
                                      loading: { title: 'Sit tight...', description: 'We are creating your account' },
                                    })
                                  }}
                                >
                                    Create Account
                                </Button>

                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </CardBody>
            </Card>

        </>
    )
}

export default LoginCreateAccount