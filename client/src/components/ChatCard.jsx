import { useEffect, useState } from "react";

function ChatCard({ setIsClicked, isClicked, friend, setSelectedFriend }) {
    const [messages, setMessages] = useState([]);
    
    useEffect(() => {
        fetch(`/api/get_messages/${friend.friend_id}`)
            .then(response => response.json())
            .then(data => {
                const allMessages = [...(data.sent_messages || []), ...(data.recieved_messages || [])];
                allMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
                setMessages(allMessages);
            });
    }, [friend.friend_id]);

    // Get the timestamp of the last message, if it exists
    const lastMessage = messages[messages.length - 1];
    const lastChatTime = lastMessage ? new Date(lastMessage.timestamp).toLocaleTimeString() : '';

    return (
        <div className="chat-card" onClick={() => {
            setIsClicked(!isClicked);
            setSelectedFriend(friend);
        }}>
            <img src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png" alt="none"/>
            <h2>{friend.username}</h2>
            <span>{lastChatTime}</span>
        </div>
    );
}

export default ChatCard;
