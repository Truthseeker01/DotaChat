import {Outlet} from 'react-router-dom'
import Navbar from './Navbar'
import { useState, useEffect } from 'react'
import {isMobile} from 'react-device-detect'
import Chats from './Chats'

function App() {

  const [ currentUser, setCurrentUser ] = useState(null)
  const [ userFriends, setUserFriends ] = useState([])

  const [hidenav, setHidenav] = useState('')

  useEffect( () => {
    fetch('/api/check-session')
    .then(response => {
      if (response.status === 200) {
        response.json()
        .then(loggedUser => {
          setCurrentUser(loggedUser)
          // setUserFriends(loggedUser.friends)
        })
      }
    }
    );
      // fetch(`https://api.opendota.com/api/players/76561199221134863/matches`)
      // .then(res => res.json())
      // .then(data => console.log(data))
  }, [])

  return (
    <div id='app'>
      <Outlet context={{currentUser: currentUser, setCurrentUser: setCurrentUser, hidenav: hidenav, setHidenav: setHidenav, userFriends: userFriends,setUserFriends: setUserFriends }} />
      <Navbar hidenav={hidenav}/>
    </div>
  )
}

export default App
