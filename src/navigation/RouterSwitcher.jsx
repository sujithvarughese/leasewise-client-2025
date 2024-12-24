import { useAuthProvider } from '../context/auth-context.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFound from '../pages/NotFound.jsx'
import DashboardAdmin, { dashboardLoader } from '../pages/admin/DashboardAdmin.jsx'
import DashboardTenant from '../pages/tenant/DashboardTenant.jsx'
import PrivateLayout from './PrivateLayout.jsx'
import Units, { unitsLoader } from '../pages/Units.jsx'
import Accounting, { accountingLoader } from '../pages/Accounting.jsx'
import Messages, { messagesLoader } from '../pages/Messages.jsx'
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
        { path: "/messages", element: <Messages />, loader: messagesLoader },
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
        { path: "/messages", element: <Messages /> },
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