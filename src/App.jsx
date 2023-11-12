import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { createBrowserRouter, createRoutesFromElements, Route, Link, RouterProvider } from 'react-router-dom'


import RootLayout from '../layouts/RootLayout'
import Login from '../pages/Login'
import Signin from '../pages/Signup'
import Home from '../pages/Home'

function App() {
  const myRouter = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />}/>
        <Route path="login"element={<Login />} /> 
        <Route path="signup" element={<Signin />}/>
      </Route>
    )
  )

  return (
      <RouterProvider router={myRouter} />
  )
}


export default App