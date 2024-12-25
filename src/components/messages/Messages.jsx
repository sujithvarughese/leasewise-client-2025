import { axiosDB } from "../../utilities/axios.js";
import { useLoaderData } from "react-router-dom";
import MessageExpanded from './MessageExpanded.jsx'
import MessageCollapsed from './MessageCollapsed.jsx'
import { useEffect, useState } from "react";
import { BiMessageSquareEdit } from "react-icons/bi"
import { TfiControlBackward } from "react-icons/tfi"

import { useAuthProvider } from '../../context/auth-context.jsx'
import { Box, Button, Container, Drawer, Flex, Grid, Text, Title } from '@mantine/core'
import NewMessageForm from './NewMessageForm.jsx'


const Messages = ({ opened, onClose }) => {
  // messages = { inbox, outbox }	// message = { sender: { lastName, firstName, _id }, recipient, subject, body, read, flag, date, previousMessage
  const { user } = useAuthProvider()

  const [messageHeadNodes, setMessageHeadNodes] = useState([])
  const [showCreateMessageForm, setShowCreateMessageForm] = useState(false)
  const [addressBook, setAddressBook] = useState([])
  const [expandedConversation, setExpandedConversation] = useState(null)
  const [showCreateReply, setShowCreateReply] = useState(false)
  const [showExpanded, setShowExpanded] = useState(false)

  const getMessages = async () => {
    try {
      // retrieve all messages where sender or recipient matches using req.user info that is stored at login
      const response = await axiosDB("/messages")
      const { messages } = response.data
      setMessageHeadNodes(messages)
    } catch (error) {
      throw new Error(error)
    }
  }
  // fetch address book for admin
  const getUserList = async () => {
    try {
      const response = await axiosDB("/auth/getUserList")
      const { userList } = response.data
      setAddressBook(userList)
    } catch (error) {
      console.log(error);
    }
  }
  // fetch admin info so user can send messages
  const getAdminInfo = async () => {
    try {
      const response = await axiosDB("/auth/getAdminInfo")
      const { adminInfo } = response.data
      setAddressBook(adminInfo)
    } catch (error) {
      console.log(error);
    }
  }

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

  useEffect(() => {
    // determine which address book to get based on role (we don't want to give tenant access to other user data)
    // addr book returned from backend as array of objects { text: "lastName, firstName", value: user._id }
    getMessages()
    if (user.role === "management") {
      getUserList()
    } else {
      getAdminInfo()
    }
    window.scrollTo(0, 0)
  }, [user.isAdmin, user.id]);

  return (
    <Drawer opened={opened} onClose={onClose} position="right">
      <Title>Messages</Title>
      {showCreateMessageForm && <NewMessageForm close={()=>setShowCreateMessageForm(false)} addressBook={addressBook} getMessages={getMessages}/>}
      {messageHeadNodes.length > 0 && !expandedConversation ? messageHeadNodes.map((message, index) =>
        <MessageCollapsed
          key={message._id}
          messageHead={message}
          setExpandedConversation={setExpandedConversation}
          markMessageRead={markMessageRead}
          toggleFlag={toggleFlag}
          userID={user.id}
          closeReply={()=>setShowCreateReply(false)}
          bg={index % 2 === 0 ? "gray.3" : ""}
        />)
        :
        <Text>No Messages in this Mailbox</Text>
      }

      {expandedConversation && !showCreateMessageForm &&
        <MessageExpanded
          expandedConversation={expandedConversation}
          messages={messageHeadNodes}
          toggleFlag={toggleFlag}
          userID={user.id}
          markMessageUnread={markMessageUnread}
          showCreateReply={showCreateReply}
          setShowCreateReply={setShowCreateReply}
          getMessages={getMessages}
          setExpandedMessage={setExpandedConversation}
          closeExpanded={() => setShowExpanded(false)}
        />
      }


    </Drawer>

  );
};
export default Messages;