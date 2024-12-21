import React, { useEffect } from 'react'
import { useAuthProvider } from '../context/auth-context.jsx'
import useSubmit from '../hooks/useSubmit.js'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mantine/core'

const credentials = {
  email: import.meta.env.VITE_ADMIN_LOGIN,
  password: import.meta.env.VITE_ADMIN_PASSWORD
}

const PreviewButton = () => {

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
      variant="gradient"
      gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
      onClick={handleSubmit}
    >
      Preview Site
    </Button>
  )
}

export default PreviewButton