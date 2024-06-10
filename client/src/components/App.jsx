import {Outlet} from 'react-router-dom'
import Navbar from './Navbar'
import { useState } from 'react'

function App() {

  const [hidenav, setHidenav] = useState('')
  const currentUser = 'a'

  return (
    <div id='app'>
      <Outlet context={{currentUser: currentUser, hidenav: hidenav, setHidenav: setHidenav}} />
      <Navbar hidenav={hidenav}/>
    </div>
  )
}

export default App
