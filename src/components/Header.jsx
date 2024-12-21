import { AppShellHeader, Burger, Button, Flex, Image } from '@mantine/core'
import logo from "../assets/images/logos/lease-wise-logo.png"
import { useAuthProvider } from '../context/auth-context.jsx'

const Header = ({ opened, toggle }) => {
  const { logOutUser} = useAuthProvider()

  return (
    <AppShellHeader>
      <Flex justify="space-between" align="center">
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
        />
        <Image src={logo} alt="logo" height={50}/>
        <div>Leasewise</div>
        <Button onClick={logOutUser}>Logout</Button>
      </Flex>

    </AppShellHeader>
  )
}

export default Header