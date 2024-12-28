import MessageContents from './MessageContents.jsx'
import ReplyMessageForm from './ReplyMessageForm.jsx'
import { axiosDB } from "../../utilities/axios.js";
import {useEffect, useRef, useState} from "react";
import { ActionIcon, Box, Flex, Grid, Text } from '@mantine/core'
import { IoIosArrowBack } from "react-icons/io";
import { TiFlag, TiFlagOutline } from 'react-icons/ti'
import { IoTrashOutline } from 'react-icons/io5'
import { useAuthProvider } from '../../context/auth-context.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMessages, fetchCurrentMessage, toggleFlag } from '../../features/messagesSlice.js'

const MessageExpanded = ({
	expandedConversation,
	userID,
	setExpandedMessage,
	getMessages,
}) => {

	const currentMessage = useSelector(state => state.messages.currentMessage)
	const dispatch = useDispatch()

	const { user, showUnauthorizedAlert } = useAuthProvider()
	const [currentConversation, setCurrentConversation] = useState([])
	const [otherUser, setOtherUser] = useState(null)

	console.log(expandedConversation)

	const getOtherUser = () => {
		if (currentMessage[0]?.sender._id === userID) {
			setOtherUser(currentMessage[0].recipient)
		} else {
			setOtherUser(currentMessage[0].sender)
		}
	}


	useEffect(() => {
		dispatch(fetchMessages())
		dispatch(fetchCurrentMessage(expandedConversation._id))
		getOtherUser()
		return () => setCurrentConversation([])
	}, [expandedConversation])


	return (
		<Box>
			<Flex justify="space-between" align="center" pb={16}>
				<Flex gap={4}>
					<Text>Subject:</Text>
					<Text style={{ whiteSpace: "nowrap", overflow: "clip", textOverflow: "ellipsis", fontWeight: 600 }}>
						{currentMessage?.subject}
					</Text>
				</Flex>

				<Flex gap={6}>
					<ActionIcon onClick={()=>dispatch(toggleFlag(currentMessage))} color="yellow" size="lg">
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
				<ReplyMessageForm
					message={expandedConversation}
					otherUser={otherUser}
					getMessages={getMessages}
					setCurrentConversation={setCurrentConversation}
					currentConversation={currentConversation}
					setExpandedMessage={setExpandedMessage}
				/>

		</Box>
	);
};

export default MessageExpanded;