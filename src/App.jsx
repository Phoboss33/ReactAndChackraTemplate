import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { createBrowserRouter, createRoutesFromElements, Route, Link, RouterProvider } from 'react-router-dom'

const ROLES = {
  'User' : 2001,
  'Editor' : 1984,
  'Admin' : 5150
}

import RootLayout from '../layouts/RootLayout'
import Login from '../pages/Login'
import Signin from '../pages/Signup'
import Home from '../pages/Home'
import Editor from '../pages/Editor'
import Lounge from '../pages/Lounge'
import Admin from '../pages/Admin'
import Protect from '../pages/ProtectPage'
import RequireAuth from '../components/RequireAuth'
import Unauthorized from '../pages/unauth'

function App() {
  const myRouter = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        {/* Public routes*/}
        <Route index element={<Home />}/>
        <Route path="login"element={<Login />} /> 
        <Route path="signup" element={<Signin />}/>
        <Route path="unauth" element={<Unauthorized />}/>

        {/* Protect routes*/}
        <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}> 
          <Route path="editor" element={<Editor />}/>
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}> 
          <Route path="lounge" element={<Lounge />}/>
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}> 
          <Route path="admin" element={<Admin />}/>
          <Route path="protect" element={<Protect />}/>
        </Route>


      </Route>
    )
  )

  return (
      <RouterProvider router={myRouter} />
  )
}


export default App