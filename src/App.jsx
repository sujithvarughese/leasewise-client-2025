import React, { useState } from 'react'
import { AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Navbar from './components/Navbar.jsx'
import Header from './components/Header.jsx'
import RouterSwitcher from './components/RouterSwitcher.jsx'
import { useAuthProvider } from './context/auth-context.jsx'
import PrivateLayout from './components/PrivateLayout.jsx'
import Landing from './pages/Landing.jsx'

const App = () => {


  const { user } = useAuthProvider()

  return (
    <>
      {user ? <RouterSwitcher /> : <Landing />}
    </>
  )
}

export default App
