import Login from "./Login"
import Chats from "./Chats"
import { useOutletContext } from "react-router-dom"
import { useEffect } from "react"

function Home(){

        const { currentUser, setHidenav, setUserFriends } = useOutletContext();

        useEffect(() => {
            if (currentUser === null){
                setHidenav('hidenav');
                setUserFriends([]);
            } else {
                setUserFriends(currentUser.friends)
            }
        }, [currentUser, setHidenav, setUserFriends])

    if (currentUser == null){
        return (
            <Login />
    )
    } else {
        return (
            <>
                <Chats />
            </>
    )
    }
}

export default Home;