import { ActionIcon, AppShellHeader, Box, Burger, Button, Flex, Image } from '@mantine/core'
import logo from "../assets/images/logos/lease-wise-logo.png"
import { useAuthProvider } from '../context/auth-context.jsx'
import { TiMessages } from "react-icons/ti";

const Header = ({ opened, toggle, openMessages }) => {

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
          <ActionIcon
            aria-label="Messages action icon"
            size="xl"
            radius="md"
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
            onClick={openMessages}
          ><TiMessages />
          </ActionIcon>
        </Flex>
      </Flex>

    </AppShellHeader>
  )
}

export default Header