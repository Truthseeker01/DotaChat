

function ChatCard({setIsClicked, isClicked}){

    return (
        <div className="chat-card" onClick={e => setIsClicked(!isClicked)}>
            <img src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png" alt="none"/>
            <h2>User</h2>
        </div>
    )
}

export default ChatCard