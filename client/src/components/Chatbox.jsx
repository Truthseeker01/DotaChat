import { useEffect, useState } from "react";
import ViewProfileCard from "./ViewProfileCard";
import socket from "../socket";
import { useOutletContext } from "react-router-dom";
// import 'emoji-mart/dist/main.css';
import { Picker } from 'emoji-mart';

function Chatbox({ isClicked, setIsClicked, setHidenav, selectedFriend }) {
    const { currentUser } = useOutletContext();
    const [message, setMessage] = useState('');
    const [sentMessages, setSentMessages] = useState([]);
    const [receivedMessages, setReceivedMessages] = useState([]);
    const [isViewProfile, setIsViewProfile] = useState(true);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);


    useEffect(() => {
        fetch(`/api/get_messages/${selectedFriend.friend_id}`)
            .then(response => response.json())
            .then(data => {
                setSentMessages(data.sent_messages);
                setReceivedMessages(data.recieved_messages);
            });

        socket.on('message', (msg) => {
            console.log('Received message:', msg); // Debugging log
            if (msg.content && msg.sender_id && msg.recipient_id && msg.timestamp) {
                if (msg.sender_id === currentUser.id) {
                    setSentMessages(prevMessages => [...prevMessages, msg]);
                } else if (msg.recipient_id === currentUser.id) { // Ensure only recipient handles the message
                    setReceivedMessages(prevMessages => [...prevMessages, msg]);
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

    const sendMessage = () => {
        if (message.trim() && selectedFriend) {
            const newMessage = {
                content: message,  // Key is 'content'
                sender_id: currentUser.id,
                recipient_id: selectedFriend.friend_id,
                timestamp: new Date().toISOString()
            };
            console.log('Sending message:', newMessage); // Debugging log
            socket.emit('send_message', newMessage);
            // setSentMessages(prevMessages => [...prevMessages, newMessage]);
            setMessage('');
        }
    };
    

    const mappedMessages = [...sentMessages, ...receivedMessages]
        .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
        .map((msg, index) => (
            <div key={index} className={msg.sender_id === currentUser.id ? 'sent-message' : 'received-message'}>
                {msg.sender_id === currentUser.id ? `You: ${msg.content}` : `${selectedFriend.username}: ${msg.content}`} <em>({new Date(msg.timestamp).toLocaleTimeString()})</em>
            </div>
        ));

    const toggleEmojiPicker = () => {
        setShowEmojiPicker(!showEmojiPicker);
        };

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
                    <input
                        onChange={e => {setMessage(e.target.value); toggleEmojiPicker;}}
                        type="text" name="message" placeholder="" value={message} />
                    <button onClick={sendMessage}>send</button>
                    {/* {showEmojiPicker && (
                    <Picker
                        onSelect={(emoji) => {
                        setMessage(message + emoji.native);
                        setShowEmojiPicker(false);
                        }}
                    />
                    )} */}
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








// import { useEffect, useState } from "react"
// import ViewProfileCard from "./ViewProfileCard"
// import socket from "../socket"
// import { useOutletContext } from "react-router-dom"

// function Chatbox({isClicked, setIsClicked, setHidenav, selectedFriend}){
//     const { currentUser } = useOutletContext()
//     const [ message, setMessage ] = useState('')
//     const [ sentMessages, setSentMessages ] = useState([])
//     const [ receivedMessages, setReceivedMessages ] = useState([])
//     const [ isViewProfile, setIsViewProfile ] = useState(true)
   


//     useEffect(() => {

//         fetch(`/api/get_messages/${selectedFriend.friend_id}`)
//             .then(response => response.json())
//             .then(data => {
//                 setSentMessages(data.sent_messages)
//                 setReceivedMessages(data.recieved_messages);
//             });

//         socket.on('message', (msg) => {
//             if (msg.sender_id === currentUser.id) {
//                 setSentMessages(prevMessages => [...prevMessages, {"content": msg.content, "timestamp": new Date().toLocaleTimeString(), "sender_id": currentUser.id, "recipient_id": selectedFriend.friend_id }]);
//             } else {
//                 setReceivedMessages(prevMessages => [...prevMessages, {"content": msg.content, "timestamp": new Date().toLocaleTimeString(), "sender_id": selectedFriend.friend_id, "recipient_id": currentUser.id }]);
//             }
//         });

//         return () => {
//             socket.off('message');
//         };
//     }, [])

//     const sendMessage = () => {
//         if (message.trim() && selectedFriend) {
//             socket.emit('send_message', {content: message, sender_id: currentUser.id, recipient_id: selectedFriend.friend_id, timestamp: new Date().toISOString()});
//             setSentMessages(prevMessages => [...prevMessages, {"content": message, "sender_id": currentUser.id, "recipient_id": selectedFriend.friend_id, "timestamp": new Date().toISOString()} ])
//             setMessage('');
//         }
//     };

//     const mappedMessages = [...sentMessages, ...receivedMessages]
//         .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
//         .map((msg, index) =>
//             (<div key={index} className={msg.sender_id === currentUser.id ? 'sent-message' : 'recieved-message'}>
//                {/* {(msg.sender_id === currentUser.id) ? `You: ${msg.content}` : `${selectedFriend.username}: ${msg.content}`} <em>({new Date(msg.timestamp).toLocaleTimeString()})</em> */}
//                {(msg.sender_id === currentUser.id) ? `You: ${msg.content}` : `${selectedFriend.username}: ${msg.content}`} <em>({new Date(msg.timestamp).toLocaleTimeString()})</em>
//             </div>)
//             );

//         if(isViewProfile) {
//             return (
//         <div id="chatbox">
//             <div id="chat_header">
//                 <h1 onClick={e => setIsViewProfile(!isViewProfile)}>{selectedFriend.username}</h1>
//                 <button onClick={e => {
//                     setIsClicked(!isClicked)
//                     setHidenav('')
//                     }}>{'>>>'}</button>
//                 </div>
//             <div id="message_container">
//                 {mappedMessages}
//             </div>
//             <div id="send">
//                 <input 
//                 onChange={e => setMessage(e.target.value)}
//                 type="text" name="message" placeholder="" value={message}/>
//                 <button onClick={sendMessage}>send</button>
//             </div> 
            
//         </div>
//     )} else {
//         return (
//                 <ViewProfileCard setIsViewProfile={setIsViewProfile} isViewProfile={isViewProfile} />
//         )
//     }
// }

// export default Chatbox





  // useEffect(() => {
    //     if (selectedFriend) {
    //         const roomName = `user_${currentUser.id}_friend_${selectedFriend.id}`;
    //         setRoomName(roomName);
    //         socket.emit('join_room', { user_id: currentUser.id, friend_id: selectedFriend.id });
    //     }

    //     return () => {
    //         if (roomName) {
    //             socket.emit('leave_room', { user_id: currentUser.id, friend_id: selectedFriend.id });
    //         }
    //     };
    // }, [currentUser.id, selectedFriend]);

    // const [roomName, setRoomName] = useState('');