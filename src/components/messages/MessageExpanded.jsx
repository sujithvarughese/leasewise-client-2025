import MessageContents from './MessageContents.jsx'
import ReplyMessageForm from './ReplyMessageForm.jsx'
import { axiosDB } from "../../utilities/axios.js";
import {useEffect, useRef, useState} from "react";
import { ActionIcon, Box, Flex, Grid, Text } from '@mantine/core'
import { IoIosArrowBack } from "react-icons/io";
import { TiFlag, TiFlagOutline } from 'react-icons/ti'
import { IoTrashOutline } from 'react-icons/io5'
import { useAuthProvider } from '../../context/auth-context.jsx'

const MessageExpanded = ({
	expandedConversation,
	toggleFlag,
	userID,
	setShowCreateReply,
	setExpandedMessage,
	getMessages,
	closeExpanded
}) => {

	const { user, showUnauthorizedAlert } = useAuthProvider()
	const [currentConversation, setCurrentConversation] = useState([])
	const [otherUser, setOtherUser] = useState(null)

	useEffect(() => {
		getMessages()
	}, [currentConversation])

	const fetchCurrentConversation = async (messageID) => {
		try {
			const response = await axiosDB(`/messages/previous/${messageID}`)
			const { previousMessages } = response.data
			setCurrentConversation(previousMessages)
		} catch (error) {
			throw new Error(error)
		}
	}

	const getOtherUser = () => {
		if (expandedConversation.sender._id === userID) {
			setOtherUser(expandedConversation.recipient)
		} else {
			setOtherUser(expandedConversation.sender)
		}
	}

	const deleteMessage = async () => {
		try {
			await axiosDB.delete(`/messages/${expandedConversation._id}`)
			const updatedConversation = currentConversation.filter(item => item._id !== expandedConversation._id)
			setCurrentConversation(updatedConversation)
		} catch (error) {
			throw new Error(error)
		}
	}

	useEffect(() => {
		fetchCurrentConversation(expandedConversation._id)
		getOtherUser()
		return () => setCurrentConversation([])
	}, [expandedConversation])


	return (
		<Box>

			<Flex justify="space-between" align="center" p={1}>
				<Flex gap={4}>
					<Text>Subject:</Text>
					<Text style={{ whiteSpace: "nowrap", overflow: "clip", textOverflow: "ellipsis", fontWeight: 600 }}>
						{expandedConversation.subject}
					</Text>
				</Flex>

				<Flex gap={6}>
					<ActionIcon onClick={()=>toggleFlag(expandedConversation)} color="yellow">
						{ expandedConversation.flag ? <TiFlag /> : <TiFlagOutline />}
					</ActionIcon>

					<ActionIcon onClick={()=>showUnauthorizedAlert()} color="red">
						<IoTrashOutline />
					</ActionIcon>
				</Flex>
			</Flex>

			<Box>

				{currentConversation?.length > 0 &&
				<Box>
					{currentConversation?.map(message =>
					<MessageContents
						key={message._id}
						lastName={message.sender.lastName}
						firstName={message.sender.firstName}
						senderID={message.sender._id}
						date={message.date}
						subject={message.subject}
						body={message.body}
						headNode={message.headNode}
						otherUser={otherUser}
						deleteMessage={deleteMessage}
					/>).reverse()}
				</Box>
				}
				<ReplyMessageForm
					message={expandedConversation}
					otherUser={otherUser}
					closeReply={()=>setShowCreateReply(false)}
					getMessages={getMessages}
					setCurrentConversation={setCurrentConversation}
					currentConversation={currentConversation}
					setExpandedMessage={setExpandedMessage}
				/>
			</Box>
		</Box>
	);
};

export default MessageExpanded;