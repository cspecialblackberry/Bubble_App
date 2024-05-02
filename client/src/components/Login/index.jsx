import { Card, CardBody, Tabs, TabList, TabPanels, Tab, TabPanel, FormControl, FormLabel, Input, Button } from '@chakra-ui/react'


function LoginCreateAccount() {

    return (
        <>
<Card boxShadow='lg' p='6' rounded='md' bg='white'>
  <CardBody>
            <Tabs isFitted variant='enclosed'>
                <TabList mb='1em'>
                    <Tab _selected={{ color: 'blue', bg: '#B9E5FF' }}>LOGIN</Tab>
                    <Tab _selected={{ color: 'blue', bg: '#B9E5FF' }}>CREATE ACCOUNT</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <FormControl>
                            <FormLabel>Username</FormLabel>
                            <Input placeholder='Username' />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Password</FormLabel>
                            <Input placeholder='Password' />
                        </FormControl>

                        <Button colorScheme='blue'>
                            Login
                        </Button>
                    </TabPanel>
                    <TabPanel>
                        <FormControl>
                            <FormLabel>Full Name</FormLabel>
                            <Input placeholder='Full Name' />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Username</FormLabel>
                            <Input placeholder='Username' />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Password</FormLabel>
                            <Input placeholder='Password' />
                        </FormControl>

                        <Button colorScheme='blue'>
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