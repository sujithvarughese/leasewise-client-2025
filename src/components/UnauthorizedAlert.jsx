
import { useAuthProvider } from '../context/auth-context.jsx'
import { Dialog, Text } from '@mantine/core'


const UnauthorizedAlert = () => {

  const { unauthorizedAlertShown } = useAuthProvider()

  return <Dialog opened={unauthorizedAlertShown}><Text>Unauthorized</Text></Dialog>

}

export default UnauthorizedAlert