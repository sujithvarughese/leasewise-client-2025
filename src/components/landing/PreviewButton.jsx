import { useEffect } from 'react'
import { useAuthProvider } from '../../context/auth-context.jsx'
import useSubmit from '../../hooks/useSubmit.js'
import { Button } from '@mantine/core'

const credentials = {
  email: import.meta.env.VITE_ADMIN_LOGIN,
  password: import.meta.env.VITE_ADMIN_PASSWORD
}

const PreviewButton = ({ variant = "gradient", color = "blue", gradient = ["blue", "cyan"], size = "lg" }) => {

  const { logInUser } = useAuthProvider()
  const { response, error, loading, submitForm } = useSubmit()

  const handleSubmit = async () => {
    try {
      await submitForm({
        method: "post",
        url: "/auth/login",
        requestConfig: credentials
      })
    } catch (e) {
      console.log(e)
      console.log(error)
    }
  }

  useEffect(() => {
    if (response) {
      logInUser(response.data)
    }
  }, [response])

  return (
    <Button
      variant={variant}
      color={color}
      gradient={{ from: gradient[0], to: gradient[1], deg: 90 }}
      size={size}
      onClick={handleSubmit}
      loading={loading}
    >
      Preview Site
    </Button>
  )
}

export default PreviewButton