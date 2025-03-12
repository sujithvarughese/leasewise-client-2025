import {Button, Divider, Flex, Modal, NativeSelect, Text, TextInput, Title} from '@mantine/core'
import { useEffect, useState } from 'react'
import { hasLength, isEmail, useForm } from '@mantine/form'
import useSubmit from '../../hooks/useSubmit.js'
import { useAuthProvider } from '../../context/auth-context.jsx'

const CreateAccount = ({ loginOpen, opened, close }) => {

  const { logInUser } = useAuthProvider()
  const { response, error, loading, submitForm } = useSubmit()
  const [submittedValues, setSubmittedValues] = useState(null);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { email: '', password: '' },
    validate: {
      firstName: (value) => (value.trim().length < 2 ? 'Too short' : null),
      lastName: (value) => (value.trim().length < 2 ? 'Too short' : null),
      email: isEmail('Invalid email'),
      password: hasLength({ min: 6 }, 'Must be at least 6 characters'),
      passwordConfirm: hasLength({ min: 6 }, 'Must be at least 6 characters')
    },
  });

  const handleSubmit = async () => {
    try {
      await submitForm({
        method: "post",
        url: "/auth/signup",
        requestConfig: submittedValues
      })
    } catch (e) {
      console.log(e)
      console.log(error)
    } finally {
      form.reset()
    }
  };

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
          <Flex direction="column" gap={12} style={{ textAlign: "center"}}>
            <Text fz={36} ta="center" pb={16}>Create Account</Text>
            <NativeSelect size="lg" radius="md">
              <option value="admin">Management</option>
              <option value="tenant">Tenant</option>
            </NativeSelect>
            <TextInput
              {...form.getInputProps('firstName')}
              key={form.key('firstName')}
              placeholder="FirstName"
              size="lg"
              radius="md"
            />
            <TextInput
              {...form.getInputProps('lastName')}
              key={form.key('lastName')}
              placeholder="Last Name"
              size="lg"
              radius="md"
            />
            <TextInput
              {...form.getInputProps('email')}
              key={form.key('email')}
              placeholder="Email Address"
              size="lg"
              radius="md"
            />
            <TextInput
              {...form.getInputProps('password')}
              key={form.key('password')}
              placeholder="Password"
              type="password"
              size="lg"
              radius="md"
            />
            <TextInput
              {...form.getInputProps('passwordConfirm')}
              key={form.key('passwordConfirm')}
              placeholder="Re-Enter Password"
              type="password"
              size="lg"
              radius="md"
            />
            <Button type="submit" size="md" loading={loading}>
              Create Account
            </Button>
          </Flex>
        </form>
        <Divider my="sm"/>
        <Flex justify="center" direction="column" gap={4} style={{ textAlign: "center"}}>
          <Text>Already have an account?</Text>
          <Button onClick={() => {close();loginOpen()}} size="md" color="green.6">
            Login
          </Button>
        </Flex>
      </Flex>
    </Modal>
  )
}

export default CreateAccount