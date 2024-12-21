import { Paper } from '@mantine/core'
import { useEffect, useState } from 'react'
import { Button, Code, Text, TextInput } from '@mantine/core';
import { hasLength, isEmail, useForm } from '@mantine/form';

const Login = () => {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { email: '', password: '' },
    validate: {
      email: isEmail('Invalid email'),
      password: hasLength({ min: 3 }, 'Must be at least 3 characters'),
    },
  });

  const [submittedValues, setSubmittedValues] = useState(null);

  useEffect(() => {
    console.log(submittedValues)
  }, [submittedValues])

  return (
    <Paper>
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

        <Text mt="md">Form values:</Text>
        <Code block>{JSON.stringify(form.values, null, 2)}</Code>

        <Text mt="md">Submitted values:</Text>
        <Code block>{submittedValues ? JSON.stringify(submittedValues, null, 2) : '–'}</Code>
      </form>

    </Paper>
  )
}

export default Login