import { useAuthProvider } from '../context/auth-context.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFound from '../pages/NotFound.jsx'
import DashboardAdmin, { dashboardLoader } from '../pages/DashboardAdmin.jsx'
import DashboardTenant from '../pages/DashboardTenant.jsx'
import PrivateLayout from './PrivateLayout.jsx'
import Units, { unitsLoader } from '../pages/Units.jsx'
import Accounting, { accountingLoader } from '../pages/Accounting.jsx'
import Unit, { unitLoader } from '../pages/Unit.jsx'
import Research from '../pages/Research.jsx'


const RouterSwitcher = () => {

  const adminRouter = createBrowserRouter([
    {
      path: "/",
      element: <PrivateLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <DashboardAdmin />, loader: dashboardLoader  },
        { path: "/research", element: <Research /> },
        { path: "/units", element: <Units />, loader: unitsLoader },
        { path: "/unit/:id", element: <Unit />, loader: unitLoader },
        { path: "/accounting", element: <Accounting />, loader: accountingLoader },
      ]
    }
  ])

  const tenantRouter = createBrowserRouter([
    {
      path: "/",
      element: <PrivateLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <DashboardTenant /> },
      ]
    }
  ])

  const { user, role } = useAuthProvider()

  if (!!user && role === "management") {
    return <RouterProvider router={adminRouter} />
  }

  if (!!user && role === "tenant") {
    return <RouterProvider router={tenantRouter} />
  }
}

export default RouterSwitcher