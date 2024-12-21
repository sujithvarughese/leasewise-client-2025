import { useState } from 'react'
import { AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Navbar from './components/Navbar.jsx'
import Header from './components/Header.jsx'
import RouterSwitcher from './components/RouterSwitcher.jsx'

const App = () => {

  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >

      <Header opened={opened} toggle={toggle}/>
      <Navbar />
      <AppShell.Main><RouterSwitcher /></AppShell.Main>

    </AppShell>
  )
}

export default App
