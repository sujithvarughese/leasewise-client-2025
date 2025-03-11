
import { AppShellNavbar, Button, NavLink } from '@mantine/core'
import { PiBuildingApartmentFill } from "react-icons/pi";
import { RiDashboardFill } from "react-icons/ri";
import { FaMoneyBillTrendUp, FaGlobe } from "react-icons/fa6";
import { useEffect, useState } from 'react'
import { useAuthProvider } from '../context/auth-context.jsx'
import { useNavigate } from 'react-router-dom'

const Navbar = ({ links, active, onClick, logout }) => {

  return (
    <AppShellNavbar>
      {links.map((link, index) =>
      <NavLink
        key={index}
        active={index === active}
        onClick={() => onClick(index)}
        label={link.name}
        leftSection={link.icon}
      />
      )}
      <Button m={12} variant="subtle" color="black" onClick={logout}>Log Out</Button>
    </AppShellNavbar>
  )
}



export default Navbar