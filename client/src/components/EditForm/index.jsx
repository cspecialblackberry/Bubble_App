import { useState } from 'react';
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Radio,
    RadioGroup,
    Stack,
    SimpleGrid
} from '@chakra-ui/react'

const EditForm = () => {
    const [nameInput, setNameInput] = useState('');
    const [bioInput, setBioInput] = useState('');
    const [value, setColorValue] = useState('');

    const handleNameInputChange = (e) => {
        setNameInput(e.target.value);
    }
    const handleBioInputChange = (e) => {
        setBioInput(e.target.value);
    }
    const handleSubmit = () => {
        console.log(nameInput, bioInput, value);
    }

    return (
        <>
            <h1>Edit Profile</h1>
            <h2>Choose an avatar</h2>
            <FormControl>
                <FormLabel>Edit Name</FormLabel>
                <Input type="text"
                    value={nameInput}
                    onChange={handleNameInputChange}>
                </Input>

                <FormLabel>Choose Accent Color</FormLabel>
                <RadioGroup onChange={setColorValue} value={value}>
                    <SimpleGrid direction='row' columns={3}>
                        <Radio value='#FFDAE7' color='#FFDAE7' colorScheme='#FFDAE7' bg='#FFDAE7' borderColor='#FFDAE7'>Red</Radio>
                        <Radio value='#FFD073' color='#FFD073' colorScheme='#FFD073' bg='#FFD073' borderColor='#FFD073'>Orange</Radio>
                        <Radio value='#FFF0B5' color='#FFF0B5' colorScheme='#FFF0B5' bg='#FFF0B5' borderColor='#FFF0B5'>Yellow</Radio>
                        <Radio value='#D8FFA5' color='#D8FFA5' colorScheme='#D8FFA5' bg='#D8FFA5' borderColor='#D8FFA5'>Green</Radio>
                        <Radio value='#B9E5FF' color='#B9E5FF' colorScheme='#B9E5FF' bg='#B9E5FF' borderColor='#B9E5FF'>Blue</Radio>
                        <Radio value='#D9C5FF' color='#D9C5FF' colorScheme='#D9C5FF' bg='#D9C5FF' borderColor='#D9C5FF'>Purple</Radio>
                    </SimpleGrid>
                </RadioGroup>

                <FormLabel>Edit Bio</FormLabel>
                <Input type="text"
                    value={bioInput}
                    onChange={handleBioInputChange}>
                </Input>

                


                <Button colorScheme='blue' onClick={handleSubmit}>Submit</Button>
            </FormControl>
        </>
    )
}

export default EditForm;