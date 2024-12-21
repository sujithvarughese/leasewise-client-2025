
import { AppShellNavbar } from '@mantine/core'
import { PiBuildingApartmentFill } from "react-icons/pi";
import { RiDashboardFill, RiMailAiFill } from "react-icons/ri";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
const Navbar = () => {
  return (
    <AppShellNavbar>
      Navbar
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