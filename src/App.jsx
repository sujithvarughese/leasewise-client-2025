import { useState } from 'react'
import { AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Navbar from './components/Navbar.jsx'
import Header from './components/Header.jsx'
import RouterSwitcher from './components/RouterSwitcher.jsx'
import { useAuthProvider } from './context/auth-context.jsx'

const App = () => {

  const [opened, { toggle }] = useDisclosure();
  const { user } = useAuthProvider()
  console.log(user)
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
      disabled={user === null}
    >

      <Header opened={opened} toggle={toggle}/>
      <Navbar />
      <AppShell.Main><RouterSwitcher /></AppShell.Main>

    </AppShell>
  )
}

export default App
