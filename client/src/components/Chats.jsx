import { useOutletContext } from "react-router-dom"
import ChatCard from "./ChatCard"
import Chatbox from "./Chatbox"
import { useState } from "react"

function Chats(){

    const { userFriends, setHidenav } = useOutletContext()
    const [ isClicked, setIsClicked ] = useState(false)
    const [ selectedFriend, setSelectedFriend ] = useState(null)

    const mappedFriends = userFriends.map(friend => <ChatCard key={friend.id} setSelectedFriend={setSelectedFriend} friend={friend} isClicked={isClicked} setIsClicked={setIsClicked}/>)
    

    if (!isClicked){
        setHidenav(pre => (''))
    return (
        <div id="chats-container">
            <h1>Chats</h1>
            {mappedFriends}
        </div>
    )
    } else {
        setHidenav( pre => ('hidenav'))
        return (
        <Chatbox setIsClicked={setIsClicked} isClicked={isClicked} setHidenav={setHidenav} selectedFriend={selectedFriend} />
    )  
    }
}

export default Chats