import React from 'react'
import { useAuthProvider } from '../context/auth-context.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Landing from '../pages/Landing.jsx'
import NotFound from '../pages/NotFound.jsx'
import DashboardAdmin from '../pages/admin/DashboardAdmin.jsx'
import DashboardTenant from '../pages/tenant/DashboardTenant.jsx'


const RouterSwitcher = () => {
  const publicRouter = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
      errorElement: <NotFound />,
    }
  ])

  const managementRouter = createBrowserRouter([
    {
      path: "/",
      element: <DashboardAdmin />,
      errorElement: <NotFound />,
    }
  ])

  const tenantRouter = createBrowserRouter([
    {
      path: "/",
      element: <DashboardTenant />,
      errorElement: <NotFound />,
    }
  ])

  const { user, role } = useAuthProvider()


  if (!!user && role === "admin") {
    return <RouterProvider router={managementRouter} />
  }

  if (!!user && role === "tenant") {
    return <RouterProvider router={tenantRouter} />
  }

  return <RouterProvider router={publicRouter} />
}

export default RouterSwitcher