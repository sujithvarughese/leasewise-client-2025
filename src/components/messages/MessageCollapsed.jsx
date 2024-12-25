import { TiFlag } from "react-icons/ti"
import { FcInfo } from "react-icons/fc"
import { GoDotFill } from "react-icons/go"
import { RiShareForwardFill } from "react-icons/ri"
import {useState} from "react";
import { ActionIcon, Avatar, Box, Button, Flex, Indicator, Text, Title, UnstyledButton } from '@mantine/core'

const MessageCollapsed = ({
	messageHead,
	setExpandedConversation,
	markMessageRead,
	showExpanded,
	userID,
	closeReply
}) => {

	const { sender, recipient, subject, body, read, flag } = messageHead

	const currentDate = new Date(messageHead.date)
	const date = currentDate.toLocaleString('en-US',{ year:'numeric', month:'short', day:'numeric', timeZone: 'UTC' })
	const time = currentDate.toLocaleTimeString("en-US")

	const selectMessage = async () => {
		setExpandedConversation(messageHead)
		markMessageRead(messageHead)
		closeReply()
	}

	return (
		// selecting anywhere on collapsed message will open expanded message, and mark as read
		<Button variant="default" radius="xs" onClick={selectMessage} h={100} w="100%" p={0} justify="space-between">
			{/* icons dynamically render to show flag and read status */}
			<Box direction="column">
				{recipient._id === userID && !read && <Avatar variant="transparent" color="blue" size={64} pos="absolute" left={-16} top={0}><GoDotFill /></Avatar>}
				{flag && <Avatar variant="transparent" color="orange" pos="absolute" left={-16} bottom={0} size={64}><TiFlag /></Avatar>}
			</Box>

			<Flex direction="column" justify="flex-start" align="flex-start" w="70%" pl={32}>
				{userID === recipient._id ? <Title order={4}>{sender.lastName}, {sender.firstName}</Title> : <Title order={4}>{recipient.lastName}, {recipient.firstName}</Title>}
				<Title order={6}>{subject}</Title>
				<Text maw="100%" truncate>{body}</Text>
			</Flex>

			<Flex pos="absolute" right={4} direction="column" align="flex-end">
				<Text size="14px">{date}</Text>
				<Text size="14px">{time}</Text>
			</Flex>
		</Button>

	);
};

export default MessageCollapsed;