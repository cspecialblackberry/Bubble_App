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
import { useState, useEffect } from 'react';
import Auth from '../../utils/auth';
import { useNavigate, useLocation } from 'react-router';
import './style.css'

function ReplyForm(props) {
    const { postId } = props;
    
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [replyContent, setReplyContent] = useState('');
    const [replyAdded, setReplyAdded] = useState(false);

    const [addReply] = useMutation(ADD_REPLY);
    const token = Auth.getProfile();
    const userId = token.data._id;

    let navigate = useNavigate();
    const location = useLocation();
    const currentPage = location.pathname;

    useEffect(() => {
        if (replyAdded) {
            // window.location.reload();
            if (currentPage === '/home') {
                navigate('/home')
            } else if (currentPage === '/profile') {
                navigate('/profile')
            }
        }
    }, [replyAdded]);

    const handleReply = async (event) => {
        event.preventDefault();
        try {
            const res = await addReply({
                variables: {
                    postId: postId,
                    userId: userId,
                    responseText: replyContent,
                }
            });
            onClose();
            setReplyAdded(true);
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

