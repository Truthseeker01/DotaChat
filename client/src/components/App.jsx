import {Outlet} from 'react-router-dom'
import Navbar from './Navbar'
import { useState, useEffect } from 'react'
import {isMobile} from 'react-device-detect'
import Chats from './Chats'

function App() {

  const [ currentUser, setCurrentUser ] = useState(null);
  const [ userFriends, setUserFriends ] = useState([]);
  const [ users, setUsers ] = useState([]);
  const [ selectedFriend, setSelectedFriend ] = useState(null);

  const [hidenav, setHidenav] = useState('');

  useEffect( () => {

    // Handling the currentUser
    fetch('/api/check-session')
    .then(response => {
      if (response.status === 200) {
        response.json()
        .then(loggedUser => {
          setCurrentUser(loggedUser);
          // setUserFriends(loggedUser.friends || [])
        })
      }
    }
    );
    // fetching all users
    fetch('/api/users')
    .then(response => {
      if (response.status === 200) {
        response.json()
        .then(data => {
          setUsers(data);
          // console.log(data);
        })
      }
    }
    );

  }, [])

  return (
    <div id='app'>
      <Outlet context={{currentUser: currentUser, setCurrentUser: setCurrentUser, hidenav: hidenav, setHidenav: setHidenav, userFriends: userFriends,setUserFriends: setUserFriends, users: users, setSelectedFriend: setSelectedFriend,selectedFriend: selectedFriend }} />
      <Navbar hidenav={hidenav}/>
    </div>
  )
}

export default App;
