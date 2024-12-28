import MessageContents from './MessageContents.jsx'
import ReplyMessageForm from './ReplyMessageForm.jsx'
import { axiosDB } from "../../utilities/axios.js";
import {useEffect, useRef, useState} from "react";
import { ActionIcon, Box, Button, Flex, Grid, Paper, Text, Textarea } from '@mantine/core'
import { IoIosArrowBack } from "react-icons/io";
import { TiFlag, TiFlagOutline } from 'react-icons/ti'
import { IoTrashOutline } from 'react-icons/io5'
import { useAuthProvider } from '../../context/auth-context.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMessages, fetchCurrentMessage, toggleFlag, setCurrentMessage } from '../../features/messagesSlice.js'
import useSubmit from '../../hooks/useSubmit.js'

const MessageExpanded = () => {

	const { user, showUnauthorizedAlert } = useAuthProvider()
	const currentMessage = useSelector(state => state.messages.currentMessage)
	const dispatch = useDispatch()


	const [value, setValue] = useState("")
	const { response, error, loading, submitForm } = useSubmit()

	const handleSubmit = async () => {
		const msg = {
			sender: user.id,
			recipient: currentMessage[0]?.sender._id === user._id ? currentMessage[0].recipient : currentMessage[0].sender,
			subject: currentMessage[0].subject,
			body: value,
			previousMessage: currentMessage[0]._id
		}
		submitForm({ method: "POST", url: "/messages", requestConfig: msg })
		setValue("")
	}

	useEffect(() => {
		if (response) {
			dispatch(fetchCurrentMessage(response.message._id))
			dispatch(fetchMessages())
		}
	}, [response])



	return (
		<Box>
			<Flex justify="space-between" align="center" pb={16}>
				<Flex gap={4}>
					<Text>Subject:</Text>
					<Text style={{ whiteSpace: "nowrap", overflow: "clip", textOverflow: "ellipsis", fontWeight: 600 }}>
						{currentMessage[0]?.subject}
					</Text>
				</Flex>

				<Flex gap={6}>
					<ActionIcon onClick={()=>dispatch(toggleFlag(currentMessage._id))} color="yellow" size="lg">
						{ currentMessage?.flag ? <TiFlag size="24px" /> : <TiFlagOutline size="24px" />}
					</ActionIcon>

					<ActionIcon onClick={()=>showUnauthorizedAlert()} color="red" size="lg">
						<IoTrashOutline size="24px" />
					</ActionIcon>
				</Flex>
			</Flex>

				{currentMessage?.length > 0 &&
				<Box>
					{currentMessage?.map(message =>
					<MessageContents
						key={message._id}
						lastName={message.sender.lastName}
						firstName={message.sender.firstName}
						senderID={message.sender._id}
						date={message.date}
						subject={message.subject}
						body={message.body}
						headNode={message.headNode}
					/>).reverse()}
				</Box>
				}

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
		</Box>
	);
};

export default MessageExpanded;