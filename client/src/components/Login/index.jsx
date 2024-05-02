function LoginCreateAccount() {

    return (
        <>

            <Tabs isFitted variant='enclosed'>
                <TabList mb='1em'>
                    <Tab>LOGIN</Tab>
                    <Tab>CREATE ACCOUNT</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <FormControl mt={4}>
                            <FormLabel>Username</FormLabel>
                            <Input placeholder='Username' />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Password</FormLabel>
                            <Input placeholder='Password' />
                        </FormControl>

                        <Button
                            isLoading
                            loadingText='Submitting'
                            colorScheme='blue'
                            variant='outline'
                        >
                            Submit
                        </Button>
                    </TabPanel>
                    <TabPanel>
                        <FormControl>
                            <FormLabel>Full Name</FormLabel>
                            <Input ref={initialRef} placeholder='Full Name' />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Username</FormLabel>
                            <Input placeholder='Username' />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Password</FormLabel>
                            <Input placeholder='Password' />
                        </FormControl>

                        <Button
                            isLoading
                            loadingText='Submitting'
                            colorScheme='blue'
                            variant='outline'
                        >
                            Submit
                        </Button>

                    </TabPanel>
                </TabPanels>
            </Tabs>


        </>
    )
}

export default LoginCreateAccount