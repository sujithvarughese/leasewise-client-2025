import { IoIosArrowBack } from 'react-icons/io'
import { ActionIcon } from '@mantine/core'
import { setCurrentMessage, setShowCreateMessageForm } from '../../features/messagesSlice.js'
import { useDispatch, useSelector } from 'react-redux'

const BackButton = ({ onClose }) => {

  const currentMessage = useSelector(state => state.messages.currentMessage)
  const showCreateMessageForm = useSelector(state => state.messages.showCreateMessageForm)

  const dispatch = useDispatch()

  console.log(currentMessage)
  console.log(showCreateMessageForm)
  const fn = () => {
    if (currentMessage.length) {
      return dispatch(setCurrentMessage([]))
    } else if (showCreateMessageForm) {
      return dispatch(setShowCreateMessageForm(false))
    }
    return onClose()
  }

  return (
    <ActionIcon
      variant="subtle"
      onClick={fn}
      pos="absolute"
      top={16}
      left={16}
      style={{ zIndex: 1000 }}
    >
      <IoIosArrowBack size="32px" />
    </ActionIcon>
  )
}

export default BackButton