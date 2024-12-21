import { Paper } from '@mantine/core'
import { useEffect, useState } from 'react'
import { Button, Code, Text, TextInput } from '@mantine/core';
import { hasLength, isEmail, useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom'
import useSubmit from '../hooks/useSubmit.js'
import { useAuthProvider } from '../context/auth-context.jsx'
import { useDisclosure } from '@mantine/hooks'

const Login = ({ open }) => {

  const { logInUser } = useAuthProvider()
  const { response, error, loading, submitForm } = useSubmit()
  const navigate = useNavigate()
  const [submittedValues, setSubmittedValues] = useState(null);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { email: '', password: '' },
    validate: {
      email: isEmail('Invalid email'),
      password: hasLength({ min: 3 }, 'Must be at least 3 characters'),
    },
  });

  const handleSubmit = async () => {
    try {
      await submitForm({
        method: "post",
        url: "/auth/login",
        requestConfig: submittedValues
      })
    } catch (e) {
      console.log(e)
      console.log(error)
    } finally {
      form.reset()
    }
  }

  useEffect(() => {
    console.log(submittedValues)
    handleSubmit()
  }, [submittedValues])

  useEffect(() => {
    if (response) {
      logInUser(response.data)
      navigate("/")
    }
  }, [response])

  return (
    <Paper shadow="lg" radius="md" p="lg">
      <form onSubmit={form.onSubmit(setSubmittedValues)}>
        <TextInput
          {...form.getInputProps('email')}
          key={form.key('email')}
          mt="md"
          label="Email"
          placeholder="Email"
        />
        <TextInput
          {...form.getInputProps('password')}
          key={form.key('password')}
          label="Password"
          type="password"
          placeholder="Password"
        />
        <Button type="submit" mt="md">
          Submit
        </Button>


      </form>

      <Button mt="md" onClick={open}>
        Create new Account
      </Button>
    </Paper>
  )
}

export default Login