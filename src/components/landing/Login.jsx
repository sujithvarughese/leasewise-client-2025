import { Divider, Flex, Paper } from '@mantine/core'
import { useEffect, useState } from 'react'
import { Button, TextInput } from '@mantine/core';
import { hasLength, isEmail, useForm } from '@mantine/form';
import useSubmit from '../../hooks/useSubmit.js'
import { useAuthProvider } from '../../context/auth-context.jsx'

const Login = ({ open }) => {

  const { logInUser } = useAuthProvider()
  const { response, error, loading, submitForm } = useSubmit()
  const [submittedValues, setSubmittedValues] = useState(null);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { email: '', password: '' },
    validate: {
      email: isEmail('Invalid email address'),
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
    if (!submittedValues) return
    handleSubmit()
  }, [submittedValues])

  useEffect(() => {
    if (response) {
      logInUser(response.data)
    }
  }, [response])

  return (
    <Paper shadow="lg" radius="md" px="lg" py="xl" w={360}>
      <form onSubmit={form.onSubmit(setSubmittedValues)}>
        <Flex direction="column" gap={12}>
          <TextInput
            {...form.getInputProps('email')}
            key={form.key('email')}
            placeholder="Email"
            size="lg"
            radius="md"
          />
          <TextInput
            {...form.getInputProps('password')}
            key={form.key('password')}
            type="password"
            placeholder="Password"
            size="lg"
            radius="md"
          />
          <Button type="submit" size="md" loading={loading}>
            Log In
          </Button>
        </Flex>
      </form>
      <Divider my="sm"/>
      <Flex justify="center">
        <Button onClick={open} size="md" color="green.6">
          Create new Account
        </Button>
      </Flex>
    </Paper>
  )
}

export default Login