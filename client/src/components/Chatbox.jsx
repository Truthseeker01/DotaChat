import { useEffect, useState } from "react"
import ViewProfileCard from "./ViewProfileCard"


function Chatbox({isClicked, setIsClicked, setHidenav}){
    
    const [ message, setMessage ] = useState('')
    const [ messages, setMessages ] = useState([])
    const [ isViewProfile, setIsViewProfile ] = useState(true)

    useEffect(() => {
        fetch('http://localhost:3000/messages')
        .then(res => {
            if (res.ok) {
                res.json()
                .then(messages => setMessages(messages))
            }
        })
    }, [])

    function handlesubmit(e){
        e.preventDefault()
        fetch('http://localhost:3000/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(
                {
                    "message": message
                }
            )
        })
        .then(res => res.json())
        .then(m => {
            setMessages([...messages, m])
            setMessage('')
        })

    }
    
    const mappedMessages = messages.map(message => <div key={message.id}>{message.message}</div>)

    function handleViewUserProfile(){

    }

        if(isViewProfile) {
            return (
        <div id="chatbox">
            <div id="chat_header">
                <h1 onClick={e => setIsViewProfile(!isViewProfile)}>User</h1>
                <button onClick={e => {
                    setIsClicked(!isClicked)
                    setHidenav('')
                    }}>{'>>>'}</button>
                </div>
            <div id="message_container">
                {/* messages will be displayed here! */}
                {mappedMessages}
            </div>
            <div id="send">
                <input onChange={e => setMessage(e.target.value)} type="text" name="message" placeholder="" value={message} />
                <button onClick={handlesubmit} type="submit">send</button>
            </div> 
            
        </div>
    )} else {
        return (
                <ViewProfileCard setIsViewProfile={setIsViewProfile} isViewProfile={isViewProfile} />
        )
    }
}

export default Chatbox