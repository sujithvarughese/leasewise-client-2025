
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { axiosDB } from "../../utilities/axios.js";
import { TfiClose } from "react-icons/tfi";
import { useAuthProvider } from '../../context/auth-context.jsx'
import MessageForm from '../../components/forms/MessageForm.jsx'
import useSubmit from '../../hooks/useSubmit.js'

import { Button, Card, Flex, Paper, Textarea, TextInput } from '@mantine/core'

const ReplyMessageForm = ({
	message,
	otherUser,
	closeReply,
	getMessages,
	setCurrentConversation,
	currentConversation,
	setExpandedMessage
}) => {

	const { date } = message
	const { user, account } = useAuthProvider()
	const [value, setValue] = useState("")
	const { response, error, loading, submitForm } = useSubmit()

	const navigate = useNavigate()

	const handleSubmit = async () => {
		const msg = {
			sender: user.id,
			recipient: otherUser._id,
			subject: message.subject,
			body: value,
			previousMessage: message._id
		}
		submitForm({ method: "POST", url: "/messages", requestConfig: msg })
		setValue("")
	}

	useEffect(() => {
		if (response) {
			const updatedConversation = [response.message, ...currentConversation]
			setExpandedMessage(response.message)
			setCurrentConversation(updatedConversation)
			getMessages()
		}
	}, [response])

	return (
			<Paper>
				<Flex direction="column" gap={6}>
					<Textarea
						autosize
						minRows={4}
						name="body"
						placeholder="Create Message"
						value={value}
						onChange={(e) => setValue(e.currentTarget.value)}
					/>
					<Button onClick={handleSubmit} style={{ alignSelf: "flex-end"}}>Send</Button>
				</Flex>

			</Paper>

	);
};



export default ReplyMessageForm;