import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import "./styles/main.sass"

/*IMPORT PAGES*/
import { Login } from './login.tsx'
import {App} from './App.tsx'
import {Home} from './pages/home.tsx'
import { Spotify } from './pages/spotify.tsx'


const router = createBrowserRouter([
  {path: '/', element: <Login/>},
  {path: '/app', element: <App/>, children:[
    {path: 'home', element: <Home/>},
    {path: 'spotify', element: <Spotify/>}
  ]}
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)