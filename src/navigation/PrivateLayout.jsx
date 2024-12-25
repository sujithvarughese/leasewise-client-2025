import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuthProvider } from '../context/auth-context.jsx'
import Header from './Header.jsx'
import Navbar from './Navbar.jsx'
import { useDisclosure } from '@mantine/hooks'
import { AppShell } from '@mantine/core'
import UnauthorizedAlert from '../components/UnauthorizedAlert.jsx'

const PrivateLayout = () => {

  const { user, role, unauthorizedAlertShown } = useAuthProvider()
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 150,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      maw="1280px"
      m="auto"
      padding="md"
      disabled={user === null}
    >

      <Header opened={opened} toggle={toggle}/>
      <Navbar />
      <AppShell.Main><Outlet /></AppShell.Main>
      {unauthorizedAlertShown &&  <UnauthorizedAlert /> }

    </AppShell>

  )
}

export default PrivateLayout