import React from 'react'
import { useState } from 'react'
import { Text, Textarea } from '@chakra-ui/react'
import './style.css'

export default function NewPost() {
    let [value, setValue] = React.useState('')

    let handleInputChange = (event) => {
        let inputValue = event.target.value
        setValue(inputValue)
        console.log(inputValue)
    }

    return (
        <form className='new-post-form'>
            <label className='new-post-label' htmlFor='post'>Blow a new bubble</label>
            <Textarea
                value={value}
                onChange={handleInputChange}
                placeholder='Create your post here'
                size='sm'
            />
            <button className="submit-post" type='submit'>Blow Bubble</button>
        </form>
    )
}


// CASEY-TODO: saves to db on submit - as a new post or updating user?
// CASEY-TODO: on submit, takes you to home/feed where you can see your recent post

