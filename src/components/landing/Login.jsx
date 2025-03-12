import {Divider, Flex, Modal, Paper, Text} from '@mantine/core'
import { useEffect, useState } from 'react'
import { Button, TextInput } from '@mantine/core';
import { hasLength, isEmail, useForm } from '@mantine/form';
import useSubmit from '../../hooks/useSubmit.js'
import { useAuthProvider } from '../../context/auth-context.jsx'

const Login = ({ createAccountOpen, opened, close }) => {

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
    <Modal opened={opened} onClose={close}>
      <Flex direction="column" align="center" justify="center">
        <form onSubmit={form.onSubmit(setSubmittedValues)}>
          <Text fz={36} ta="center" pb={16}>Login</Text>
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
        <Flex justify="center" direction="column" gap={4} style={{ textAlign: "center"}}>
          <Text>Not yet registered?</Text>
          <Button onClick={() => {close();createAccountOpen()}} size="md" color="green.6">
            Create new Account
          </Button>
        </Flex>
      </Flex>

    </Modal>
  )
}

export default Login