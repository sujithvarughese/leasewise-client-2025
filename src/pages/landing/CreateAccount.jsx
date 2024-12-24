import { Anchor, Box, Button, Flex, Grid, Modal, Text, TextInput, Title } from '@mantine/core'
import { useEffect, useState } from 'react'
import { hasLength, isEmail, useForm } from '@mantine/form'
import useSubmit from '../../hooks/useSubmit.js'
import { useAuthProvider } from '../../context/auth-context.jsx'

const CreateAccount = ({ opened, close }) => {

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
    <Modal opened={opened} onClose={close} title="Sign Up">
      <Title>Sign up</Title>
      <form onSubmit={form.onSubmit(setSubmittedValues)}>
          <TextInput
            {...form.getInputProps('firstName')}
            key={form.key('firstName')}
            placeholder="FirstName"
          />
          <TextInput
            {...form.getInputProps('lastName')}
            key={form.key('lastName')}
            placeholder="Last Name"
          />
          <TextInput
            {...form.getInputProps('email')}
            key={form.key('email')}
            placeholder="Email Address"
          />
          <TextInput
            {...form.getInputProps('password')}
            key={form.key('password')}
            placeholder="Password"
          />
          <TextInput
            {...form.getInputProps('passwordConfirm')}
            key={form.key('passwordConfirm')}
            placeholder="Re-Enter Password"
          />
          <Button
            type="submit"
            loading={loading}
          >
            Sign Up
          </Button>
      </form>
    </Modal>
  )
}

export default CreateAccount