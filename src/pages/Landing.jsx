import React from 'react'
import Login from '../components/Login.jsx'
import Hero from './landing/Hero.jsx'
import { Box, Flex } from '@mantine/core'
import Magazines from './landing/Magazines.jsx'
import Features from './landing/Features.jsx'
import Footer from './landing/Footer.jsx'

const Landing = () => {
  return (
    <Flex direction="column" m="auto" gap={72} maw="1280px">
      <Hero />
      <Magazines />
      <Features />
      <Footer />
    </Flex>
  )
}

export default Landing