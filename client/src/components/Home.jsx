import Login from "./Login"
import Chats from "./Chats"
import { useOutletContext } from "react-router-dom"

function Home(){

        const { currentUser, setHidenav, setUserFriends } = useOutletContext()

    if (currentUser == null){
        function update() {
            setHidenav('hidenav')
        }
        return (
            <Login />
    )
    } else {
        setUserFriends(currentUser.friends)
        return (
            <>
                <Chats />
            </>
    )
    }
}

export default Home