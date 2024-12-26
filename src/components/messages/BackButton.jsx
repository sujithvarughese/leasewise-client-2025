import { IoIosArrowBack } from 'react-icons/io'
import { ActionIcon } from '@mantine/core'

const BackButton = ({ fn }) => {
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