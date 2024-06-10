import { NavLink, useOutletContext } from "react-router-dom";


function Navbar({hidenav}){

    // const { hidenav } = useOutletContext()
    return (
        <nav className={hidenav}>
            <NavLink to='/'>Chats</NavLink>
            <NavLink to='search'>Search</NavLink>
            <NavLink to='plays'>Plays</NavLink>
            <NavLink to='userprofile'>Me</NavLink>
        </nav>
    )
}

export default Navbar