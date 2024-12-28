import { TiFlag } from "react-icons/ti"
import { GoDotFill } from "react-icons/go"
import { Avatar, Box, Button, Flex, Text, Title } from '@mantine/core'
import { useDispatch } from 'react-redux'
import { fetchCurrentMessage, markMessageRead } from '../../features/messagesSlice.js'
import { useAuthProvider } from '../../context/auth-context.jsx'

const MessageCollapsed = ({ messageHead, bg }) => {
	const dispatch = useDispatch()

	const { _id, sender, recipient, subject, body, read, flag } = messageHead
	const { user } = useAuthProvider()
	const currentDate = new Date(messageHead.date)
	const date = currentDate.toLocaleString('en-US',{ year:'numeric', month:'short', day:'numeric', timeZone: 'UTC' })
	const time = currentDate.toLocaleTimeString("en-US")


	const selectMessage = () => {
		dispatch(fetchCurrentMessage(_id))
		dispatch(markMessageRead(_id))
	}

	return (
		// selecting anywhere on collapsed message will open expanded message, and mark as read
		<Button variant="default" bg={bg} radius="xs" onClick={selectMessage} h={100} w="100%" p={0} justify="space-between">
			{/* icons dynamically render to show flag and read status */}
			<Box direction="column">
				{recipient._id === user.id && !read && <Avatar variant="transparent" color="blue" size={64} pos="absolute" left={-16} top={0}><GoDotFill /></Avatar>}
				{flag && <Avatar variant="transparent" color="orange" pos="absolute" left={-16} bottom={0} size={64}><TiFlag /></Avatar>}
			</Box>

			<Flex direction="column" justify="flex-start" align="flex-start" w="70%" pl={32}>
				{user.id === recipient._id ? <Title order={4}>{sender.lastName}, {sender.firstName}</Title> : <Title order={4}>{recipient.lastName}, {recipient.firstName}</Title>}
				<Title order={6}>{subject}</Title>
				<Text maw="100%" truncate>{body}</Text>
			</Flex>

			<Flex pos="absolute" right={4} direction="column" align="flex-end" gap={6}>
				<Text size="14px">{date}</Text>
				<Text size="14px">{time}</Text>
			</Flex>
		</Button>

	);
};

export default MessageCollapsed;