import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react';
import { ADD_REPLY } from '../../utils/mutations';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import Auth from '../../utils/auth';
import './style.css'

function ReplyForm(props) {
    const { postId } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [replyContent, setReplyContent] = useState('');
    const [addReply] = useMutation(ADD_REPLY);
    const token = Auth.getProfile();
    const userId = token.data._id;

    const handleReply = async () => {
        try {
            console.log('POSTID', postId)
            const res = await addReply({
                variables: {
                    postId: postId,
                    userId: userId,
                    responseText: replyContent,
                }
            });
            console.log('hit');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <button onClick={onOpen}>Open Modal</button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent className='reply-modal'>
                    <h2>Add a reply</h2>
                    <ModalCloseButton className='close-btn' />
                    <ModalBody>
                        <textarea
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            placeholder='Enter your reply'
                        />
                        <div>
                            {/* <button type='button' mr={3} onClick={onClose}>Close</button> */}
                            <button type='button' className='submit-reply' onClick={handleReply}>Submit Reply</button>
                        </div>
                    </ModalBody>

                    <ModalFooter>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ReplyForm

