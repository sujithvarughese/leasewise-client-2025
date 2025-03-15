import logo from "../../assets/images/landing/logos/lease-wise-logo.png"
import tos from "../../assets/terms-and-conditions.pdf"
import { ActionIcon, Anchor, Box, Flex, Image, Text } from '@mantine/core'
import { SiLinkedin, SiGithub } from "react-icons/si";
import { BsTwitterX } from "react-icons/bs";

const logoStyle = {
  width: '80px',
  height: 'auto',
};

const Copyright = () => {
  return (
    <Text mt={1}>
      {'Copyright © Sujith Varughese '}
      {new Date().getFullYear()}
    </Text>
  );
}
const Footer = () => {
  return (
    <Flex direction="column" justify="center" align="center" gap={12}>
      <Image
        src={logo}
        style={logoStyle}
        alt="logo of sitemark"
      />
      <Anchor href={tos}>Terms of Service</Anchor>

      <Flex gap={6}>
        <ActionIcon component="a" href="https://github.com/sujithvarughese" aria-label="GitHub">
          <SiGithub />
        </ActionIcon>

        <ActionIcon component="a" href="https://www.linkedin.com/in/sujithvarughese/" aria-label="LinkedIn">
          <SiLinkedin />
        </ActionIcon>
      </Flex>

      <Copyright />
    </Flex>


  )
}

export default Footer