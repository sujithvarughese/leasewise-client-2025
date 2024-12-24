
import { axiosDB } from '../../utilities/axios.js'
import { useAuthProvider } from '../../context/auth-context.jsx'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, NativeSelect, TextInput } from '@mantine/core'

const NewMessageForm = ({ close, addressBook, getMessages }) => {

  const { user } = useAuthProvider()

  // recipient is initially set to first name in address book (user has only one name in address book so default to admin)
  //const [values, setValues] = useState({ ...initialState, recipient: addressBook[0].value })
  const [buttonText, setButtonText] = useState("Send")
  /*
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  }
*/
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = { ...Object.fromEntries(formData)}
    console.log(data)
    try {
      // add sender info before passing to server
      const msg = await createMessage({ ...data, sender: user.userID })
      // navigate back to messages to update messages display
      if (msg === 'success') {
        setButtonText("Sent!")
      } else {
        setButtonText("Error")
      }
      await getMessages()
      setTimeout(() => {
        navigate("/messages");
        close()
      }, 1000)
    } catch (error) {
      throw new Error(error)
    }
  }

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Box>
          <NativeSelect name="recipient" label="To:" options={addressBook} />
          <TextInput name="subject" label="Subject" />
          <TextInput
            id="body"
            name="body"
            placeholder="Type new message here..."
            minRows={15}
            maxRows={15}
            sx={{
              '--Textarea-focusedInset': 'var(--any, )',
              '--Textarea-focusedThickness': '0.25rem',
              '--Textarea-focusedHighlight': 'rgba(13,110,253,.25)',
              '&::before': {
                transition: 'box-shadow .15s ease-in-out',
              },
              '&:focus-within': {
                borderColor: '#86b7fe',
              },
            }}
          />
          <Box>
            <Button type="submit">{buttonText}</Button>
            <Button type="button" onClick={close}>Cancel</Button>
          </Box>
        </Box>
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