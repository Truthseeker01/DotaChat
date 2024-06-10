import Login from "./Login"
import Chats from "./Chats"
import { useOutletContext } from "react-router-dom"

function Home(){

        const { currentUser, setHidenav } = useOutletContext()

    if (currentUser == ''){
        setHidenav('hidenav')
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

export default Home