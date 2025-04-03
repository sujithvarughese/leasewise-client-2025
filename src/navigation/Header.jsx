import {ActionIcon, AppShellHeader, Burger, Button, Flex, Image, Indicator, NavLink} from '@mantine/core'
import logo from "../assets/images/logos/lease-wise-logo.png"
import { TiMessages } from "react-icons/ti";
import { useSelector } from 'react-redux'

const Header = ({ opened, toggle, openMessages, links, active, onClick, logout }) => {

  const unread = useSelector(state => state.messages.unread)

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


        <Flex display={{ base: 'none', sm: 'flex' }} align="center" >
          <Flex align="center">
            {links.map((link, index) =>
              <NavLink
                key={index}
                active={index === active}
                onClick={() => onClick(index)}
                label={link.name}
                leftSection={link.icon}
              />
            )}
          </Flex>
          <Button variant="subtle" color="black" onClick={logout}>Log Out</Button>
        </Flex>

        <Indicator  label={unread} disabled={unread === 0} size={24} position="top-start" color="red" withBorder>
          <ActionIcon
            aria-label="Messages action icon"
            size="xl"
            radius="md"
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
            onClick={openMessages}
          ><TiMessages size={24}/>
          </ActionIcon>
        </Indicator>

      </Flex>


    </AppShellHeader>
  )
}

export default Header