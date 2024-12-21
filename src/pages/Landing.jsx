import React from 'react'
import Login from '../components/Login.jsx'
import Hero from './landing/Hero.jsx'
import { Box } from '@mantine/core'
import Magazines from './landing/Magazines.jsx'

const Landing = () => {
  return (
    <Box m="auto" maw="1280px">
      <Hero />
      <Magazines />
    </Box>
  )
}

export default Landing