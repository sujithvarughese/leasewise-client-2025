import { AppShellHeader, Box, Burger, Button, Flex, Image } from '@mantine/core'
import logo from "../assets/images/logos/lease-wise-logo.png"
import { useAuthProvider } from '../context/auth-context.jsx'

const Header = ({ opened, toggle }) => {
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
        <Button onClick={logOutUser}>Logout</Button>
      </Flex>

    </AppShellHeader>
  )
}

export default Header