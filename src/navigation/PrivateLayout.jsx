import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuthProvider } from '../context/auth-context.jsx'
import Header from './Header.jsx'
import Navbar from './Navbar.jsx'
import { useDisclosure } from '@mantine/hooks'
import { AppShell } from '@mantine/core'

const PrivateLayout = () => {

  const { user, role } = useAuthProvider()
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 150,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
      disabled={user === null}
    >

      <Header opened={opened} toggle={toggle}/>
      <Navbar />
      <AppShell.Main><Outlet /></AppShell.Main>

    </AppShell>

  )
}

export default PrivateLayout