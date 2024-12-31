import { ActionIcon, AppShellHeader, Box, Burger, Button, Flex, Image, Indicator } from '@mantine/core'
import logo from "../assets/images/logos/lease-wise-logo.png"
import { useAuthProvider } from '../context/auth-context.jsx'
import { TiMessages } from "react-icons/ti";
import { useSelector } from 'react-redux'

const Header = ({ opened, toggle, openMessages }) => {

  const unread = useSelector(state => state.messages.unread)

  console.log(unread)
  return (
    <AppShellHeader>
      <Flex justify="space-between" align="center" h="100%" mx="12">
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
        />
        <Image src={logo} alt="logo" height={50}/>
        <Flex align="center" gap={12}>
          <Indicator  label={unread} disabled={unread === 0} size={22} position="top-start" color="red" withBorder>
            <ActionIcon
              aria-label="Messages action icon"
              size="lg"
              radius="md"
              variant="gradient"
              gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
              onClick={openMessages}
            ><TiMessages size={20}/>
            </ActionIcon>
          </Indicator>

        </Flex>
      </Flex>

    </AppShellHeader>
  )
}

export default Header