import { useEffect, useState } from "react";
import ViewProfileCard from "./ViewProfileCard";
import socket from "../socket";
import { useOutletContext } from "react-router-dom";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

function Chatbox({ isClicked, setIsClicked, setHidenav, selectedFriend}) {
    const { currentUser } = useOutletContext();
    const [message, setMessage] = useState('');
    const [sentMessages, setSentMessages] = useState([]);
    const [receivedMessages, setReceivedMessages] = useState([]);
    const [isViewProfile, setIsViewProfile] = useState(true);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [ emoji, setEmoji ] = useState(null);

    // To request notification permission
    useEffect(() => {
        if (Notification.permission === 'default') {
            Notification.requestPermission();
        }
    }, []);
    // Getting the messages between the currentUser and selectedFriend
    useEffect(() => {
        fetch(`/api/get_messages/${selectedFriend.friend_id}`)
            .then(response => response.json())
            .then(data => {
                setSentMessages(data.sent_messages);
                setReceivedMessages(data.recieved_messages);
            });
        // Sending messages to the back-end using socketio
        socket.on('message', (msg) => {
            if (msg.content && msg.sender_id && msg.recipient_id && msg.timestamp) {
                if (msg.sender_id === currentUser.id) {
                    setSentMessages(prevMessages => [...prevMessages, msg]);
                } else if (msg.recipient_id === currentUser.id) {
                    setReceivedMessages(prevMessages => [...prevMessages, msg]);
                    sendNotification(msg); // Sending notification for received message
                }
            } else {
                console.error('Invalid message format received:', msg);
            }
        });

        socket.on('message_error', (error) => {
            console.error('Message error:', error);
        });

        return () => {
            socket.off('message');
            socket.off('message_error');
        };
    }, [selectedFriend.friend_id, currentUser.id]);

    function sendMessage (){
        if (message.trim() && selectedFriend) {
            const newMessage = {
                content: message,
                sender_id: currentUser.id,
                recipient_id: selectedFriend.friend_id,
                timestamp: new Date().toISOString()
            };
            console.log('Sending message:', newMessage); 
            socket.emit('send_message', newMessage);
            setMessage('');
        }
    };

    function sendNotification(msg){
        if (Notification.permission === 'granted') {
            new Notification('New Message', {
                body: `${msg.sender_id === currentUser.id ? 'You' : selectedFriend.username}: ${msg.content}`,
                timestamp: new Date(msg.timestamp).toLocaleTimeString(),
            });
        }
    };

    const mappedMessages = [...sentMessages, ...receivedMessages]
        .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
        .map((msg, index) => (
            <div key={index} className={msg.sender_id === currentUser.id ? 'sent-message' : 'received-message'}>
                {(msg.sender_id === currentUser.id) ? `${msg.content}`: `${msg.content}`}
                <span><em>{new Date(msg.timestamp).toLocaleTimeString()}</em></span>
            </div>
        ));

    function scrollToBottom() {
        const messagesContainer = document.getElementById('message_container');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

    useEffect(() => {
        scrollToBottom();
    }, [sentMessages, receivedMessages])

    if (isViewProfile) {
        return (
            <div id="chatbox">
                <div id="chat_header">
                    <p onClick={() => setIsViewProfile(!isViewProfile)}>··</p>
                    <h1>{selectedFriend.username}</h1>
                    <button onClick={() => {
                        setIsClicked(!isClicked);
                        setHidenav('');
                    }}>{'>'}</button>
                </div>
                <div id="message_container">
                    {mappedMessages}
                </div>
                <div id="send">
                    <button style={{
                        background: 'none',
                        width: '8%',
                        border: 'none',
                        marginRight: '5px',
                         marginLeft: '5px',
                    }} onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                        <img src='./src/assets/emoji.png'  width='35px' />
                    </button>
                    <input
                        onChange={e => { setMessage(e.target.value); toggleEmojiPicker(); }}
                        type="text" name="message" placeholder="" value={message} />
                    <button onClick={sendMessage}>
                        <img src='./src/assets/send.png'  width='35px' />
                    </button>
                </div>
                <div className={showEmojiPicker ? 'show-emoji' : 'hide-emoji'}>
                    <Picker 
                        data={data} 
                        previewPosition='none' 
                        onEmojiSelect={ e => {
                            setEmoji(e.native);
                            setShowEmojiPicker(!showEmojiPicker);
                        }} 
                    />
                </div>
            </div>
        );
    } else {
        return (
            <ViewProfileCard setIsViewProfile={setIsViewProfile} isViewProfile={isViewProfile} />
        );
    }
}

export default Chatbox;