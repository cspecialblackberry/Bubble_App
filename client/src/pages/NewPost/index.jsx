import React from 'react'
import { useState } from 'react'
import { Text, Textarea } from '@chakra-ui/react'

export default function NewPost() {
    let [value, setValue] = React.useState('')

    let handleInputChange = (event) => {
        let inputValue = event.target.value
        setValue(inputValue)
    }

    return (
        <>
            <Text mb='8px'>Value: {value}</Text>
            <Textarea
                value={value}
                onChange={handleInputChange}
                placeholder='Here is a sample placeholder'
                size='sm'
            />
        </>
    )
}


// on submit, takes you to home/feed where you can see your recent post

