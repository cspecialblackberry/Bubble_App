import React from 'react'
import { useState } from 'react'
import { Text, Textarea } from '@chakra-ui/react'
import './style.css'
import { useMutation } from '@apollo/client'
import { ADD_POST } from '../../utils/mutations'
import Auth from '../../utils/auth'

export default function NewPost() {
    let [value, setValue] = React.useState('')

    let handleInputChange = (event) => {
        let inputValue = event.target.value
        setValue(inputValue)
        console.log(inputValue)
    }

    const [addPost, {error}] = useMutation(ADD_POST)

    const handleSubmit = async () => {
        const token = Auth.getProfile()
        console.log(token)
        try{
            const res = await addPost({
                variables: {userId: token.data._id, postText: value}
            })
            console.log(res)
        }catch(error){
            console.error(error)
        }
    }

    return (
        <form className='new-post-form'>
            <label className='new-post-label' htmlFor='post'>Blow a new bubble</label>
            <Textarea
                value={value}
                onChange={handleInputChange}
                placeholder={`What's poppin'?`}
                size='sm'
            />
            <button className="submit-post" type="button" onClick={handleSubmit}>Blow Bubble</button>
        </form>
    )
}


// CASEY-TODO: saves to db on submit - post id added to user
// CASEY-TODO: on submit, takes you to home/feed
// CASEY-TODO: make outline the chosen user color?
// CASEY-TODO: bubble animation on click for new post

