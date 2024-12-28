import { axiosDB } from "../../utilities/axios.js";
import MessageExpanded from './MessageExpanded.jsx'
import MessageCollapsed from './MessageCollapsed.jsx'
import { useEffect, useState } from "react";
import { useAuthProvider } from '../../context/auth-context.jsx'
import { ActionIcon, Drawer, Title } from '@mantine/core'
import NewMessageForm from './NewMessageForm.jsx'
import { IoCreateOutline } from "react-icons/io5";
import BackButton from './BackButton.jsx'
import { useDispatch, useSelector } from 'react-redux'
import {
  setMessageHeadNodes,
  fetchMessages,
  fetchUserList,
  fetchAdminInfo
} from '../../features/messagesSlice.js'

const Messages = ({ opened, onClose }) => {
  const { user } = useAuthProvider()

  const messageHeadNodes = useSelector(state => state.messages.messageHeadNodes)
  const addressBook = useSelector(state => state.messages.addressBook)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchMessages())
    if (user.role === "management") {
      dispatch(fetchUserList())
    } else {
      dispatch(fetchAdminInfo())
    }
    window.scrollTo(0, 0)
  }, [])


  const [showCreateMessageForm, setShowCreateMessageForm] = useState(false)
  const [expandedConversation, setExpandedConversation] = useState(null)

  const toggleFlag = async (message) => {
    try {
      await axiosDB.patch("/messages/flag", message)
      const updatedMessageHeadNodes = [...messageHeadNodes]
      // replace message in state with updated message with appropriate flag for both collapsed/expanded message
      const messageIndex = updatedMessageHeadNodes.findIndex(currentMessage => currentMessage._id === message._id)
      updatedMessageHeadNodes[messageIndex] = { ...updatedMessageHeadNodes[messageIndex], flag: !updatedMessageHeadNodes[messageIndex].flag}
      setMessageHeadNodes(updatedMessageHeadNodes)
      setExpandedConversation(updatedMessageHeadNodes[messageIndex])
    } catch (error) {
      throw new Error(error)
    }
  }

  const markMessageRead = async (message) => {
    try {
      await axiosDB.patch("/messages/read", message)
      const updatedMailbox = [...messageHeadNodes]
      // replace message in state with updated message with appropriate read status
      const messageIndex = updatedMailbox.findIndex(currentMessage => currentMessage._id === message._id)
      updatedMailbox[messageIndex] = { ...updatedMailbox[messageIndex], read: true}
      setMessageHeadNodes(updatedMailbox)
      setExpandedConversation(updatedMailbox[messageIndex])
    } catch (error) {
      throw new Error(error)
    }
  }

  const markMessageUnread = async (message) => {
    try {
      await axiosDB.patch("/messages/unread", message)
      const updatedMailbox = [...messageHeadNodes]
      // replace message in state with updated message with appropriate read status
      const messageIndex = updatedMailbox.findIndex(currentMessage => currentMessage._id === message._id)
      updatedMailbox[messageIndex] = { ...updatedMailbox[messageIndex], read: false}
      setMessageHeadNodes(updatedMailbox)
      setExpandedConversation(updatedMailbox[messageIndex])
    } catch (error) {
      throw new Error(error)
    }
  }

  const backButtonFn = () => {
    if (expandedConversation) {
      return setExpandedConversation(null)
    } else if (showCreateMessageForm) {
      return setShowCreateMessageForm(false)
    }
    return onClose()
  }

  return (
    <Drawer opened={opened} onClose={onClose} position="right" withCloseButton={false}>
      <Title pt={36} pb={16}>Messages</Title>

      <BackButton fn={backButtonFn}/>

      {!expandedConversation && !showCreateMessageForm &&
        <ActionIcon
          onClick={() => setShowCreateMessageForm(true)}
          mb={6}
          size="lg"
          pos="absolute"
          right={16}
          top={56}
          style={{ zIndex: 100 }}
        >
          <IoCreateOutline size="24px" />
        </ActionIcon>
      }

      {showCreateMessageForm &&
        <NewMessageForm
          close={()=>setShowCreateMessageForm(false)}
          addressBook={addressBook}
        />
      }

      {messageHeadNodes?.length > 0
        && !expandedConversation
        && !showCreateMessageForm
        && messageHeadNodes.map((message, index) =>
        <MessageCollapsed
          key={message._id}
          messageHead={message}
          setExpandedConversation={setExpandedConversation}
          markMessageRead={markMessageRead}
          toggleFlag={toggleFlag}
          userID={user.id}
          bg={index % 2 === 0 ? "gray.3" : ""}
        />)
      }

      {expandedConversation && !showCreateMessageForm &&
        <MessageExpanded
          expandedConversation={expandedConversation}
          toggleFlag={toggleFlag}
          userID={user.id}
          markMessageUnread={markMessageUnread}
          setExpandedMessage={setExpandedConversation}
        />
      }


    </Drawer>

  );
};
export default Messages;