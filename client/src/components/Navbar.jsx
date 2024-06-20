import { NavLink } from "react-router-dom";


function Navbar({hidenav}){

    return (
        <nav className={hidenav}>
            <NavLink to='/'>
                <img src='./src/assets/chats.png' width='40px'/>
            </NavLink>
            <NavLink to='search'>
                <img src='./src/assets/search.png' width='40px'/>
            </NavLink>
            <NavLink to='plays'>
                <img src='./src/assets/plays.png' width='40px'/>
            </NavLink>
            <NavLink to='userprofile'>
                <img src='./src/assets/me.png' width='40px'/>
            </NavLink>
        </nav>
    )
}

export default Navbar;