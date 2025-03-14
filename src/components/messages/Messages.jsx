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
  fetchMessages,
  fetchUserList,
  fetchAdminInfo,
  setShowCreateMessageForm
} from '../../features/messagesSlice.js'

const Messages = ({ opened, onClose }) => {
  const { user } = useAuthProvider()

  const messageHeadNodes = useSelector(state => state.messages.messageHeadNodes)
  const currentMessage = useSelector(state => state.messages.currentMessage)
  const showCreateMessageForm = useSelector(state => state.messages.showCreateMessageForm)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchMessages(user.id))
    if (user.role === "management") {
      dispatch(fetchUserList())
    } else {
      dispatch(fetchAdminInfo())
    }
    }, [])

  return (
    <Drawer opened={opened} onClose={onClose} position="right" withCloseButton={false}>
      <Title pt={36} pb={16}>Messages</Title>

      <BackButton onClose={onClose}/>

      {!currentMessage.length && !showCreateMessageForm &&
        <ActionIcon mb={6} size="lg" pos="absolute" right={16} top={56} style={{ zIndex: 100 }}
                    onClick={() => dispatch(setShowCreateMessageForm(true))}
        >
          <IoCreateOutline size="24px" />
        </ActionIcon>
      }

      {showCreateMessageForm && <NewMessageForm />}

      {!currentMessage.length && messageHeadNodes?.length && !showCreateMessageForm
        && messageHeadNodes.map((message, index) =>
        <MessageCollapsed
          key={message._id}
          messageHead={message}
          bg={index % 2 === 0 ? "gray.3" : ""}
        />)
      }
      {!!currentMessage.length && <MessageExpanded />}
    </Drawer>

  );
};
export default Messages;