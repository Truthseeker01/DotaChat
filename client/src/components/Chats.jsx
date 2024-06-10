import { useOutletContext } from "react-router-dom"
import ChatCard from "./ChatCard"
import Chatbox from "./Chatbox"
import { useState } from "react"

function Chats(){

    const [ isClicked, setIsClicked ] = useState(false)
    const { setHidenav } = useOutletContext()

    if (!isClicked){
        setHidenav('')
    return (
        <div id="chats-container">
            <h1>Chats</h1>
            <ChatCard isClicked={isClicked} setIsClicked={setIsClicked} />
            <ChatCard />
            <ChatCard />
            <ChatCard />
            <ChatCard />
            <ChatCard />
            <ChatCard />
            <ChatCard />
            <ChatCard />
        </div>
    )
    } else {
        setHidenav('hidenav')
        return (
        <Chatbox setIsClicked={setIsClicked} isClicked={isClicked} setHidenav={setHidenav}/>
    )  
    }
}

export default Chats