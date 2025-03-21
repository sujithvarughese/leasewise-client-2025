import RouterSwitcher from './navigation/RouterSwitcher.jsx'
import { useAuthProvider } from './context/auth-context.jsx'
import Landing from './pages/Landing.jsx'

const App = () => {

  const { user } = useAuthProvider()

  return (
    <>
      {user ? <RouterSwitcher /> : <Landing />}
    </>
  )
}

export default App
