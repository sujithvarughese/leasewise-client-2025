import { useAuthProvider } from '../../context/auth-context.jsx'
import { useState } from 'react'
import { Box, Button, Flex, Paper, Text } from '@mantine/core'


const MessageContents = ({
  senderID,
  lastName,
  firstName,
  otherUser,
  date,
  subject,
  body,
  headNode,
  deleteMessage
}) => {

    const { showUnauthorizedAlert } = useAuthProvider()

    const currentDate = new Date(date)
    const dateStr = currentDate.toLocaleString('en-US',{ year:'numeric', month:'short', day:'numeric', timeZone: 'UTC' })
    const time = currentDate.toLocaleTimeString("en-US")
    const { user } = useAuthProvider()

    const [isHovering, setIsHovering] = useState(false)

    const handleDeleteMessage = () => {
      showUnauthorizedAlert()
    //  deleteMessage()
    }

    return (
        <Paper
          shadow="lg"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          radius="md"
          my={6}
          p={6}
          w="80%"
          bg={`${user.id === senderID ? "dodgerblue" : "lightgray"}`}
          style={{ justifySelf: `${user.id === senderID ? "flex-end" : "flex-start"}` }}
        >
          <Box>
            <Text variant="body2">On {`${dateStr} ${time}, ${firstName} ${lastName}`} wrote:</Text>
            <Box p={2}>
                <Text variant="subtitle2">{body}</Text>
            </Box>
          </Box>
        </Paper>

    );
};

export default MessageContents;