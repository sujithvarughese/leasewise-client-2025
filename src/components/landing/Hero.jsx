import {BackgroundImage, Box, Flex, Grid, Image, Paper, Text, Title, UnstyledButton} from '@mantine/core'
import Login from './Login.jsx'
import bgImage from "../../assets/images/landing/leasewise-landing-bg.png"
import { useDisclosure } from '@mantine/hooks'
import CreateAccount from './CreateAccount.jsx'
import PreviewButton from './PreviewButton.jsx'
import previewImage from "../../assets/images//landing/cover.jpg"
import { motion } from "motion/react"
import LoginMobile from "./LoginMobile.jsx";
import logo from "../../assets/images/logos/lease-wise-logo.png"
import SearchListings from "./SearchListings.jsx";

const Hero = () => {

  const [createAccountOpened, { open: createAccountOpen, close: createAccountClose }] = useDisclosure(false);
  const [loginOpened, { open: loginOpen, close: loginClose }] = useDisclosure(false);
  return (
    <Box>
      <Flex
        component={motion.div}
        initial={{ y: "-20%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        display={{ base: "none", md: "flex"}}  direction="row" m="md" justify="space-between" align="center">
        <Flex direction="column" align={{ base: "center", sm: "flex-start" }}>
          <Text style={{ fontWeight: 600 }} fz={{ base: "md", md: 48 }} lh={1.2} >LeaseWise</Text>
          <Text style={{ fontWeight: 600 }} fz={{ base: "sm", md: 24 }} lh={1} c="gray">Streamlined Property Management.</Text>
        </Flex>
        <Image src={logo} alt="logo" w={60}/>
        <Flex justify="center" align="center" gap={16}>
          <UnstyledButton onClick={loginOpen} fw={600}>Login</UnstyledButton>
          <UnstyledButton onClick={createAccountOpen} fw={600}>Register</UnstyledButton>
          <PreviewButton />
        </Flex>
      </Flex>

      <Flex display={{ base: "flex", md: "none"}} justify="space-between" align="center" w="100%" p="sm" >
        <Image src={logo} alt="logo" w={60}/>
        <LoginMobile createAccountOpen={createAccountOpen} />
      </Flex>

      <Flex
        w="100%"
        direction={{ base: "column-reverse", md: "row" }}
        px="sm"
        py="xs"
        pos="relative"
        align="center"
        justify="space-between"
      >
        <Box
          component={motion.div}
          display={{ base: "none", md: "flex" }}
          initial={{ x: "-100%" }}
          animate={{ x: "15%" }}
          transition={{ duration: 1, ease: "easeInOut" }}
          w="50%"
          style={{ border: "5px solid white", borderRadius: 5}}
        >
          <Image src={previewImage} alt="preview" h="100%"/>
        </Box>

        <Flex
          component={motion.div}
          initial={{ scale: 0.5, originX: 1, originY: 1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          direction="column"
          h={{ base: "initial", md: 600 }} w={{ base: "100%", md: "70%" }} p="xl"
          bg="blue.5"
          style={{ borderRadius: 5}}
        >
          <Flex
            component={motion.div}
            initial={{ y: "30%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            direction="column" justify="center" h="100%" gap={24}
            ta={{ base: "center", sm: "left" }}
          >

            <Text pl={{ base: "initial", md: 120 }} c="white" style={{ fontSize: 42, fontWeight: 600, lineHeight: 1.3 }}>
              Get the Highest Performing Property Management Application In the Industry.
            </Text>

            <Text pl={{ base: "initial", md: 120 }} c="white" style={{ fontSize: 24, fontWeight: 400, lineHeight: 1.1 }}>
              Enhance Your Reach with Our Comprehensive Digital Organization Tools and Financial Tracking Data.
            </Text>

            <Flex pl={{ base: "initial", md: 120 }} justify={{ base: "center", md: "flex-start" }}>
              <PreviewButton variant="filled" color="green" size="xl" />
            </Flex>

            <Flex display={{ base: "initial", md: "none"}}>
              <Image src={previewImage} alt="preview" w="80%" m="auto" radius="5" />
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      <Flex justify="center" align="center" w="100%" p="md">
        <SearchListings />
      </Flex>



      <Login createAccountOpen={createAccountOpen} opened={loginOpened} close={loginClose} />
      <CreateAccount loginOpen={loginOpen} opened={createAccountOpened} close={createAccountClose}/>
    </Box>
  )
}

export default Hero