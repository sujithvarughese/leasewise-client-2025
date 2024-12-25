import { ActionIcon, AppShellHeader, Box, Burger, Button, Flex, Image } from '@mantine/core'
import logo from "../assets/images/logos/lease-wise-logo.png"
import { useAuthProvider } from '../context/auth-context.jsx'
import { TiMessages } from "react-icons/ti";

const Header = ({ opened, toggle, openMessages }) => {
  const { logOutUser } = useAuthProvider()

  return (
    <AppShellHeader>
      <Flex justify="space-between" align="center">
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
        />
        <Box>
          <Image src={logo} alt="logo" height={50}/>
        </Box>
        <Flex align="center" gap={12}>
          <ActionIcon
            aria-label="Messages action icon"
            size="xl"
            radius="xl"
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
            onClick={openMessages}
          ><TiMessages />
          </ActionIcon>
          <Button onClick={logOutUser}>Logout</Button>
        </Flex>
      </Flex>

    </AppShellHeader>
  )
}

export default Header