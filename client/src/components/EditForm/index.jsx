import { useState } from 'react';
import {
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Button
} from '@chakra-ui/react'

const EditForm = () => {
    const [nameInput, setNameInput] = useState('');
    const [BioInput, setBioInput] = useState('');
    const handleNameInputChange = (e) => {
        setNameInput(e.target.value);
    }
    const handleBioInputChange = (e) => {
        setBioInput(e.target.value);
    }

    return (
        <>
            <h1>Edit Profile</h1>
            <h2>Choose an avatar</h2>
            <h2>Choose accent color</h2>
            <FormControl>
                <FormLabel>Edit Name</FormLabel>
                <Input type="text"
                    value={nameInput}
                    onChange={handleNameInputChange}>
                </Input>

                <FormLabel>Edit Bio</FormLabel>
                <Input type="text"
                    value={bioInput}
                    onChange={handleBioInputChange}>
                </Input>

                <FormLabel>Your Message:</FormLabel>
                
                
                <Button colorScheme='blue' onClick={handleSubmit}>Submit</Button>
            </FormControl>
        </>
    )
}