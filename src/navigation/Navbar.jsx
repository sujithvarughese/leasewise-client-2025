
import { AppShellNavbar, Box, Button, Flex, List, NavLink } from '@mantine/core'
import { PiBuildingApartmentFill } from "react-icons/pi";
import { RiDashboardFill, RiMailAiFill } from "react-icons/ri";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { useEffect, useState } from 'react'
import { useAuthProvider } from '../context/auth-context.jsx'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const { role} = useAuthProvider()
  const [links, setLinks] = useState([])
  const navigate = useNavigate()
  const [active, setActive] = useState(0);

  const setActiveAndNavigate = (index) => {
    setActive(index)
    navigate(links[index].url)
  }
  useEffect(() => {
    if (role === "management") {
      setLinks(managementLinks)
    } else {
      setLinks(tenantLinks)
    }
  }, [role])

  return (
    <AppShellNavbar>
      <List component="nav">

        <Flex direction="column">

          {links.map((link, index) =>
          <NavLink
            key={index}
            active={index === active}
            onClick={() => setActiveAndNavigate(index)}
            label={link.name}
            leftSection={link.icon}
          />
          )}

        </Flex>

      </List>
    </AppShellNavbar>
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
    name: "Messages",
    icon: <RiMailAiFill />,
    url: "/messages"
  },


]

const tenantLinks = [
  {
    name: "Dashboard",
    icon: <RiDashboardFill />,
    url: "/"
  },
  {
    name: "Messages",
    icon: <RiMailAiFill />,
    url: "/messages"
  }
]

export default Navbar