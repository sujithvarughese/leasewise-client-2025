
import { axiosDB } from '../../utilities/axios.js'
import { useAuthProvider } from '../../context/auth-context.jsx'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Flex, NativeSelect, Textarea, TextInput, Title } from '@mantine/core'
import useSubmit from '../../hooks/useSubmit.js'
import { useForm } from '@mantine/form'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAdminInfo, fetchMessages, fetchUserList } from '../../features/messagesSlice.js'

const NewMessageForm = () => {

  const { user } = useAuthProvider()
  const addressBook = useSelector(state => state.messages.addressBook)
  const dispatch = useDispatch()

  const { response, error, loading, submitForm } = useSubmit()
  const [submittedValues, setSubmittedValues] = useState(null);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      sender: user._id,
      recipient: "",
      subject: "",
      body: ""
    },
  });

  useEffect(() => {
    if (user.role === "management") {
      dispatch(fetchUserList())
    } else {
      dispatch(fetchAdminInfo())
    }
  }, [])

  const handleSubmit = async () => {
    try {
      await submitForm({ method: "POST", url: "/messages", requestConfig: submittedValues })
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

  return (
    <Box>
      <form onSubmit={form.onSubmit(setSubmittedValues)}>
        <Title order={5}>New Message</Title>
        <Flex direction="column" gap={12}>
          <NativeSelect name="recipient" data={addressBook} />
          <TextInput name="subject" placeholder="Subject" />
          <Textarea
            name="body"
            placeholder="Type new message here..."
            autosize
            minRows={4}
          />
          <Button type="submit">Send</Button>

        </Flex>
      </form>
    </Box>
  )
}
const createMessage = async (message) => {
  try {
    const response = await axiosDB.post("/messages", message)
    const { msg } = response.data
    return msg
  } catch (error) {
    console.log(error);
  }
}

export default NewMessageForm