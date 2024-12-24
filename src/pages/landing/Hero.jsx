import { BackgroundImage, Box, Container, Flex, Image, Title } from '@mantine/core'
import Login from '../../components/Login.jsx'
import bgImage from "../../assets/images/landing/leasewise-landing-bg.png"
import { useDisclosure } from '@mantine/hooks'
import SignUp from '../../components/SignUp.jsx'
import PreviewButton from '../../components/PreviewButton.jsx'

const Hero = () => {

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <BackgroundImage src={bgImage} radius="md" py={128}>
        <Flex
          justify="space-between"
          align="center"
          direction={{ base: "column", md: "row" }}
        >
        <Box m="xl">
          <Title textWrap="balance" style={{ color: "white" }}>LeaseWise</Title>
          <Title order={5} textWrap="balance" style={{ color: "white" }}>Make managing rentals simple.</Title>
          <PreviewButton />
        </Box>

        <Box m="xl">
          <Login open={open}/>
        </Box>

        </Flex>
      </BackgroundImage>
      <SignUp opened={opened} close={close}/>
    </>
  )
}

export default Hero