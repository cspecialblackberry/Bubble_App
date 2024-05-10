

const replyForm = () => {
    return (
        <>
            <form onSubmit={handleReplySubmit}>
                <textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="Write your reply here"
                />
                <button type="submit">Submit Reply</button>
            </form>
        </>
    )
}

export default replyForm
