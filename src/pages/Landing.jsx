import React from 'react'
import Login from '../components/landing/Login.jsx'
import Hero from '../components/landing/Hero.jsx'
import { Box, Flex } from '@mantine/core'
import Magazines from '../components/landing/Magazines.jsx'
import Features from '../components/landing/Features.jsx'
import Footer from '../components/landing/Footer.jsx'
import features from '../components/landing/features.js'
import FeatureItem from '../components/landing/FeatureItem.jsx'

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