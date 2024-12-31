import { BackgroundImage, Box, Flex, Title } from '@mantine/core'
import Login from './Login.jsx'
import bgImage from "../../assets/images/landing/leasewise-landing-bg.png"
import { useDisclosure } from '@mantine/hooks'
import CreateAccount from './CreateAccount.jsx'
import PreviewButton from './PreviewButton.jsx'

const Hero = () => {

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Box h="100vh">
      <BackgroundImage src={bgImage} h="100%" radius={{ base: "xs", md: "md"}}>
        <Flex
          justify="space-around"
          align="center"
          h="100%"
          direction={{ base: "column", md: "row" }}
        >
        <Flex direction="column" m="xl" align={{ base: "center", md: "flex-start" }}>
          <Title style={{ color: "white" }}>LeaseWise</Title>
          <Title order={3} style={{ color: "white" }}>Make managing rentals simple.</Title>
          <Box my={12}>
            <PreviewButton />
          </Box>

        </Flex>
        <Box m="xl">
          <Login open={open}/>
        </Box>

        </Flex>
      </BackgroundImage>
      <CreateAccount opened={opened} close={close}/>
    </Box>
  )
}

export default Hero