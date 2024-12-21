import {  AppShellHeader, Burger, Flex, Image } from '@mantine/core'
import logo from "../assets/images/logos/lease-wise-logo.png"

const Header = ({ opened, toggle }) => {

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
      </Flex>

    </AppShellHeader>
  )
}

export default Header