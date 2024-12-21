import { useAuthProvider } from '../context/auth-context.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFound from '../pages/NotFound.jsx'
import DashboardAdmin from '../pages/admin/DashboardAdmin.jsx'
import DashboardTenant from '../pages/tenant/DashboardTenant.jsx'
import PrivateLayout from './PrivateLayout.jsx'
import Units from '../pages/Units.jsx'
import Accounting from '../pages/Accounting.jsx'
import Messages from '../pages/Messages.jsx'


const RouterSwitcher = () => {

  const adminRouter = createBrowserRouter([
    {
      path: "/",
      element: <PrivateLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <DashboardAdmin /> },
        { path: "/units", element: <Units /> },
        { path: "/accounting", element: <Accounting /> },
        { path: "/messages", element: <Messages /> },
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