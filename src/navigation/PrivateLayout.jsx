import { Outlet } from 'react-router-dom'
import { useAuthProvider } from '../context/auth-context.jsx'
import Header from './Header.jsx'
import Navbar from './Navbar.jsx'
import { useDisclosure } from '@mantine/hooks'
import { AppShell } from '@mantine/core'
import UnauthorizedAlert from '../components/UnauthorizedAlert.jsx'
import Messages from '../components/messages/Messages.jsx'

const PrivateLayout = () => {

  const { user, unauthorizedAlertShown } = useAuthProvider()
  const [opened, { toggle }] = useDisclosure();
  const [messagesOpened, { open: openMessages, close: closeMessages }] = useDisclosure(false);

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

      <Header opened={opened} toggle={toggle} openMessages={openMessages}/>
      <Navbar toggle={toggle} />
      <AppShell.Main><Outlet /></AppShell.Main>
      {unauthorizedAlertShown &&  <UnauthorizedAlert /> }
      <Messages opened={messagesOpened} onClose={closeMessages} />
    </AppShell>

  )
}

export default PrivateLayout