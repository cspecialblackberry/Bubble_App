const ReplyForm = () => {
    return (
        <>
            <form className='reply-form' onSubmit={handleReply}>
                <textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder='Reply to the bubble'
                />
                <button type='submit'>Submit</button>
            </form>
        </>
    )
}

export default ReplyForm
