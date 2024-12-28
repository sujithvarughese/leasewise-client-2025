import { useAuthProvider } from '../../context/auth-context.jsx'
import { Avatar, Box, Paper, Text } from '@mantine/core'

const MessageContents = ({ senderID, lastName, firstName, date, body }) => {

    const { showUnauthorizedAlert } = useAuthProvider()

    const currentDate = new Date(date)
    const dateStr = currentDate.toLocaleString('en-US',{ year:'numeric', month:'short', day:'numeric', timeZone: 'UTC' })
    const time = currentDate.toLocaleTimeString("en-US")
    const { user } = useAuthProvider()

    return (
      <Box pos="relative">
        <Text size="xs" inline style={{ textAlign: "center" }}>{dateStr} {time}</Text>
        <Paper
          shadow="lg"
          radius="md"
          mx={16}
          mt={4}
          mb={16}
          p={8}
          w="80%"
          bg={`${user.id === senderID ? "blue.4" : "lightgray"}`}
          style={{ justifySelf: `${user.id === senderID ? "flex-end" : "flex-start"}` }}
        >
          <Text p={2}>{body}</Text>
        </Paper>
        <Avatar
          name={`${firstName} ${lastName}`}
          color="initials"
          size="sm"
          pos="absolute"
          left={user.id !== senderID && -12}
          right={user.id === senderID && -12}
          bottom={-16}
        />
      </Box>


    );
};

export default MessageContents;