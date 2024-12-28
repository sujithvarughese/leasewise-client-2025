
import { useEffect, useState } from 'react'
import { useAuthProvider } from '../../context/auth-context.jsx'
import useSubmit from '../../hooks/useSubmit.js'
import { Button, Flex, Paper, Textarea } from '@mantine/core'
import { fetchCurrentMessage, setCurrentMessage, fetchMessages } from '../../features/messagesSlice.js'
import { useDispatch, useSelector } from 'react-redux'

const ReplyMessageForm = ({ message, otherUser, }) => {

	const { user } = useAuthProvider()
	const [value, setValue] = useState("")
	const { response, error, loading, submitForm } = useSubmit()

	const dispatch = useDispatch()
	const currentMessage = useSelector(state => state.messages.currentMessage)
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
			const updatedConversation = [response.message, ...currentMessage]
			dispatch(setCurrentMessage(updatedConversation))
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
					<Button onClick={handleSubmit} loading={loading} style={{ alignSelf: "flex-end"}}>Send</Button>
				</Flex>

			</Paper>

	);
};



export default ReplyMessageForm;