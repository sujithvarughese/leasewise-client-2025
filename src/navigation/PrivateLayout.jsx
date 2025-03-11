import {Outlet, useNavigate} from 'react-router-dom'
import { useAuthProvider } from '../context/auth-context.jsx'
import Header from './Header.jsx'
import Navbar from './Navbar.jsx'
import { useDisclosure } from '@mantine/hooks'
import { AppShell } from '@mantine/core'
import UnauthorizedAlert from '../components/UnauthorizedAlert.jsx'
import Messages from '../components/messages/Messages.jsx'
import {useEffect, useState} from "react";
import {RiDashboardFill} from "react-icons/ri";
import {FaGlobe, FaMoneyBillTrendUp} from "react-icons/fa6";
import {PiBuildingApartmentFill} from "react-icons/pi";

const PrivateLayout = () => {

  const { user, unauthorizedAlertShown } = useAuthProvider()
  const [opened, { toggle }] = useDisclosure();
  const [messagesOpened, { open: openMessages, close: closeMessages }] = useDisclosure(false);

  const { role, logOutUser } = useAuthProvider()
  const [links, setLinks] = useState([])
  const navigate = useNavigate()
  const [active, setActive] = useState(0);

  const setActiveAndNavigate = (index) => {
    setActive(index)
    navigate(links[index].url)
    toggle()
  }

  const logOutAndNavigate = () => {
    logOutUser()
    navigate("/")
  }

  useEffect(() => {
    if (role === "management") {
      setLinks(managementLinks)
    } else {
      setLinks(tenantLinks)
    }
  }, [role])


  return (
    <AppShell
      header={{ height: 80 }}
      navbar={{
        width: 150,
        layout: 'alt',
        breakpoint: 'sm',
        collapsed: { mobile: !opened, desktop: true },
      }}
      maw="1280px"
      m="auto"
      padding="xl"
      disabled={user === null}
    >

      <Header opened={opened} toggle={toggle} openMessages={openMessages} links={links} active={active} onClick={(index) => setActiveAndNavigate(index)} logout={logOutAndNavigate} />
      <Navbar links={links} active={active} onClick={(index) => setActiveAndNavigate(index)} logout={logOutAndNavigate}/>
      <AppShell.Main><Outlet /></AppShell.Main>
      {unauthorizedAlertShown &&  <UnauthorizedAlert /> }
      <Messages opened={messagesOpened} onClose={closeMessages} />
    </AppShell>
  )
}

const managementLinks = [
  {
    name: "Dashboard",
    icon: <RiDashboardFill />,
    url: "/"
  },
  {
    name: "Units",
    icon: <PiBuildingApartmentFill />,
    url: "/units"
  },
  {
    name: "Accounting",
    icon: <FaMoneyBillTrendUp />,
    url: "/accounting"
  },
  {
    name: "Research",
    icon: <FaGlobe />,
    url: "/research"
  },
]

const tenantLinks = [
  {
    name: "Dashboard",
    icon: <RiDashboardFill />,
    url: "/"
  },
]

export default PrivateLayout