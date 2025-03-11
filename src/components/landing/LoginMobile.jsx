import {Divider, Flex, Modal, Paper, Text} from '@mantine/core'
import { useEffect, useState } from 'react'
import { Button, TextInput } from '@mantine/core';
import { hasLength, isEmail, useForm } from '@mantine/form';
import useSubmit from '../../hooks/useSubmit.js'
import { useAuthProvider } from '../../context/auth-context.jsx'

const Login = ({ createAccountOpen }) => {

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

        <form onSubmit={form.onSubmit(setSubmittedValues)}>
          <Flex align="center" justify="center" gap={4}>

            <Flex direction="column" align="center" gap={8}>
              <TextInput
                {...form.getInputProps('email')}
                key={form.key('email')}
                placeholder="Email"
                size="xs"
                m={0}
              />
              <TextInput
                {...form.getInputProps('password')}
                key={form.key('password')}
                type="password"
                placeholder="Password"
                size="xs"
                m={0}
              />
            </Flex>


            <Flex direction="column" align="center" gap={4}>
              <Button variant="subtle" onClick={createAccountOpen} size="sm" color="green.6" m={0} p={0}>
                <Flex direction="column">
                  <Text size="xs">Don't have an account?</Text>
                  Register
                </Flex>
              </Button>

              <Button type="submit" size="sm" loading={loading} m={0}>
                Log In
              </Button>
            </Flex>
          </Flex>
        </form>

  )
}

export default Login