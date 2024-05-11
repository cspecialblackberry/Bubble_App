import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { ADD_REPLY } from '../../utils/mutations';
import { useMutation } from '@apollo/client';
import './style.css';

function ReplyForm() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Button onClick={onOpen}>Open Modal</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Lorem count={2} />
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant='ghost'>Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

// const ReplyForm = () => {
//     return (
//         <>
//             <form className='reply-form' onSubmit={handleReply}>
//                 <textarea
//                     value={replyContent}
//                     onChange={(e) => setReplyContent(e.target.value)}
//                     placeholder='Reply to the bubble'
//                 />
//                 <button type='submit'>Submit</button>
//             </form>
//         </>
//     )
// }

export default ReplyForm

