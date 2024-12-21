import React from 'react'
import { useAuthProvider } from '../context/auth-context.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Landing from '../pages/Landing.jsx'
import NotFound from '../pages/NotFound.jsx'




const RouterSwitcher = () => {
  const publicRouter = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
      errorElement: <NotFound />,
    }
  ])
  const { user, role } = useAuthProvider()





  return (
    <div>
      <RouterProvider router={publicRouter} />
    </div>
  )
}

export default RouterSwitcher