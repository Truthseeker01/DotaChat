import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

function ChatCard({ setIsClicked, isClicked, friend, setSelectedFriend }) {

    const [messages, setMessages] = useState([]);
    const { currentUser } = useOutletContext();

    useEffect(() => {
        fetch(`/api/get_messages/${friend.friend_id}`)
            .then(response => response.json())
            .then(data => {
                const allMessages = [...(data.sent_messages || []), ...(data.recieved_messages || [])];
                allMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
                setMessages(allMessages);
            });
    }, [friend.friend_id]);

    const lastMessage = messages[messages.length - 1];
    const lastChatTime = lastMessage ? new Date(lastMessage.timestamp).toLocaleTimeString() : '';

    const lm = messages[messages.length - 1] || {'content': ''};
    console.log(lm);

    return (
        <div className="chat-card" onClick={() => {
            setIsClicked(!isClicked);
            setSelectedFriend(friend);
        }}>
            <img src={friend.profile_img} alt="none"/>
            <h2>{friend.username}
                <p style={{
                    color: 'rgba(255, 255, 255, 0.5)',
                    fontSize: 'small'
                }}>
                {lm.content}
                </p>
            </h2>
            <span>{lastChatTime}</span>
        </div>
    );
}

export default ChatCard;
