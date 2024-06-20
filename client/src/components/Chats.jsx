import { useOutletContext } from "react-router-dom"
import ChatCard from "./ChatCard"
import Chatbox from "./Chatbox"
import { useEffect, useState } from "react"

function Chats(){

    const { userFriends, setHidenav, setSelectedFriend, selectedFriend } = useOutletContext()
    const [ isClicked, setIsClicked ] = useState(false)
    

    const mappedFriends = userFriends.map(friend => <ChatCard key={friend.id} setSelectedFriend={setSelectedFriend} friend={friend} isClicked={isClicked} setIsClicked={setIsClicked} />)

    useEffect(() => {
        if (isClicked === true){
            setHidenav('hidenav')
        } else {
            setHidenav('')
        }
    }, [isClicked, setHidenav])

    if (!isClicked){
    return (
        <div id="chats-container">
            <h1>Chats</h1>
            {mappedFriends}
        </div>
    )
    } else {
        return (
        <Chatbox setIsClicked={setIsClicked} isClicked={isClicked} setHidenav={setHidenav} selectedFriend={selectedFriend} />
    )  
    }
}

export default Chats