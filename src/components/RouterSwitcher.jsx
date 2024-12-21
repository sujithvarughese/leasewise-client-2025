import React from 'react'
import { useAuthProvider } from '../context/auth-context.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Landing from '../pages/Landing.jsx'
import NotFound from '../pages/NotFound.jsx'
import DashboardAdmin from '../pages/admin/DashboardAdmin.jsx'
import DashboardTenant from '../pages/tenant/DashboardTenant.jsx'
import PrivateLayout from './PrivateLayout.jsx'


const RouterSwitcher = () => {

  const adminRouter = createBrowserRouter([
    {
      path: "/",
      element: <PrivateLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <DashboardAdmin /> },
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