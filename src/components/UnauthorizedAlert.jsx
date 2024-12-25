
import { useAuthProvider } from '../context/auth-context.jsx'
import { Dialog, Text } from '@mantine/core'


const UnauthorizedAlert = () => {

  const { unauthorizedAlertShown } = useAuthProvider()

  return <Dialog shadow="xl" bg="red.7" opened={unauthorizedAlertShown}><Text>Unauthorized</Text></Dialog>

}

export default UnauthorizedAlert