
import { AppShellNavbar, Button, NavLink } from '@mantine/core'
import { PiBuildingApartmentFill } from "react-icons/pi";
import { RiDashboardFill } from "react-icons/ri";
import { FaMoneyBillTrendUp, FaGlobe } from "react-icons/fa6";
import { useEffect, useState } from 'react'
import { useAuthProvider } from '../context/auth-context.jsx'
import { useNavigate } from 'react-router-dom'

const Navbar = ({ toggle }) => {

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
    <AppShellNavbar>
      {links.map((link, index) =>
      <NavLink
        key={index}
        active={index === active}
        onClick={() => setActiveAndNavigate(index)}
        label={link.name}
        leftSection={link.icon}
      />
      )}
      <Button m={12} variant="subtle" color="black" onClick={logOutAndNavigate}>Log Out</Button>
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
    name: "Research",
    icon: <FaGlobe />,
    url: "/research"
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
]

const tenantLinks = [
  {
    name: "Dashboard",
    icon: <RiDashboardFill />,
    url: "/"
  },
]

export default Navbar