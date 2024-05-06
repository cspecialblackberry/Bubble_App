import { Card, CardBody, Tabs, TabList, TabPanels, Tab, TabPanel, FormControl, FormLabel, Input, Button, InputGroup, InputRightElement, FormHelperText, FormErrorMessage, useToast } from '@chakra-ui/react'
import * as React from 'react'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../../utils/mutations'
import Auth from '../../utils/auth'
import './style.css'

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
            <Card boxShadow='lg' p='6' rounded='md' bg='white' padding={3}>
                <CardBody padding={3}>
                    <Tabs isFitted variant='enclosed'>
                        <TabList className='tab-selectors' mb='1em'>
                            <Tab className='tab' _selected={{ bg: 'var(--pink)' }} fontSize={'1em'}>Login</Tab>
                            <Tab className='tab' _selected={{ bg: 'var(--pink)' }} fontSize={'1em'}>Create Account</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel padding={3}>

                                <FormControl isInvalid={usernameError}>
                                    <FormLabel>Username</FormLabel>
                                    <Input value={username} onChange={usernameChange} placeholder='Enter username' borderRadius={20} />
                                    {!usernameError ? (
                                        <FormHelperText>
                        
                                        </FormHelperText>
                                    ) : (
                                        <FormErrorMessage marginBottom={5}>Username is required.</FormErrorMessage>
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
                                            borderRadius={20}
                                        />
                                        <InputRightElement width='4.5rem'>
                                            <button className='show-button' h='1.75rem' size='sm' onClick={handleClick} mr={1}>
                                                {show ? 'Hide' : 'Show'}
                                            </button>
                                        </InputRightElement>
                                    </InputGroup>
                                    {!passwordError ? (
                                        <FormHelperText>
                        
                                        </FormHelperText>
                                    ) : (
                                        <FormErrorMessage marginBottom={5}>Password is required.</FormErrorMessage>
                                    )}
                                </FormControl>

                                <button className='login-create-button' mt={5} onClick={handleLogin}>
                                    Login
                                </button>
                            </TabPanel>
                            <TabPanel padding={3}>
                                <FormControl isRequired marginBottom={5}>
                                    <FormLabel>Full Name</FormLabel>
                                    <Input placeholder='Enter your full name' borderRadius={20} />
                                </FormControl>

                                <FormControl isRequired marginBottom={5}>
                                    <FormLabel>Username</FormLabel>
                                    <Input placeholder='Create a username' borderRadius={20} />
                                </FormControl>

                                <FormControl isRequired marginBottom={5}>
                                    <FormLabel>Password</FormLabel>
                                <InputGroup size='md'>
                                        <Input 
                                            pr='4.5rem'
                                            type={show ? 'text' : 'password'}
                                            placeholder='Create a password'
                                            borderRadius={20}
                                        />
                                        <InputRightElement width='4.5rem'>
                                            <button className='show-button' h='1.75rem' size='sm' onClick={handleClick} mr={1}>
                                                {show ? 'Hide' : 'Show'}
                                            </button>
                                        </InputRightElement>
                                    </InputGroup>
                                    </FormControl>

                                <button className='login-create-button' mt={5}
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
                                </button>

                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </CardBody>
            </Card>

        </>
    )
}

export default LoginCreateAccount