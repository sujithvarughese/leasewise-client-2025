
import { AppShellNavbar, Box, Button, Flex, List } from '@mantine/core'
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
  const [heading, setHeading] = useState("Dashboard")

  const setHeadingAndNavigate = (name, url) => {
    setHeading(name)
    navigate(url)
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

          {links.map(link =>
          <Button key={link} onClick={() => setHeadingAndNavigate(link.name, link.url)}>
            <List.Item icon={link.icon}>{link.name}</List.Item>
          </Button>
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