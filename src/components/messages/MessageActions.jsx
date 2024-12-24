import { RiReplyLine } from "react-icons/ri"
import { TiFlag, TiFlagOutline } from "react-icons/ti"
import { CiUnread } from "react-icons/ci"
import { IoTrashOutline } from "react-icons/io5"
import { axiosDB } from "../../utilities/axios.js";
import {TfiControlBackward} from "react-icons/tfi";
import { useAuthProvider } from '../../context/auth-context.jsx'
import { ActionIcon, Box, Button, Flex, Text } from '@mantine/core'


const MessageActions = ({ message, toggleFlag  }) => {

	const { user, showUnauthorizedAlert } = useAuthProvider()
	const { date, sender, recipient, subject, body, read, flag } = message

	return (
		<Flex justify="space-between" align="center" p={1}>
			<Box>
				<Flex gap={4}>
					<Text>Subject:</Text>
					<Text style={{ whiteSpace: "nowrap", overflow: "clip", textOverflow: "ellipsis", fontWeight: 600 }}>
						{subject}
					</Text>
				</Flex>
			</Box>

			<Flex gap={6}>
				<ActionIcon onClick={()=>toggleFlag(message)} color="yellow">
					{ flag ? <TiFlag /> : <TiFlagOutline />}
				</ActionIcon>

				<ActionIcon onClick={()=>showUnauthorizedAlert()} color="red">
					<IoTrashOutline />
				</ActionIcon>
			</Flex>

		</Flex>
	);
};



const deleteMessage = async (message) => {
	console.log(message);
	try {
		await axiosDB.delete("/messages", message)
	} catch (error) {
		throw new Error(error)
	}
}

export default MessageActions;