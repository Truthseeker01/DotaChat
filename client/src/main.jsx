import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.jsx'
import './index.css'
import Home from './components/Home.jsx'
import UserProfile from './components/UserProfile.jsx'
import Chats from './components/Chats.jsx'
import Search from './components/Search.jsx'
import Plays from './components/Plays.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const routes = [{
  path: '/',
  element: <App />,
  children: [
    {
      index: true,
      element: <Home />
    },
    {
      path: 'userprofile',
      element: <UserProfile />
    },
    {
      path: 'chats',
      element: <Chats />
    },
    {
      path: 'search',
      element: <Search />
    },
    {
      path: 'plays',
      element: <Plays />
    }
  ]
}]

const router =createBrowserRouter(routes)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router = {router} />
  </React.StrictMode>,
)