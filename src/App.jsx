import RouterSwitcher from './components/RouterSwitcher.jsx'
import { useAuthProvider } from './context/auth-context.jsx'
import Landing from './pages/Landing.jsx'

const App = () => {

  const { user } = useAuthProvider()
  console.log(user)

  return (
    <>
      {user ? <RouterSwitcher /> : <Landing />}
    </>
  )
}

export default App
