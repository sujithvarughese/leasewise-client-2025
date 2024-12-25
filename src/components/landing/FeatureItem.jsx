import React from 'react'
import { Box, Flex, Grid, Image, Paper, Text, Title } from '@mantine/core'

const FeatureItem = ({ feature, bg }) => {
  return (
    <Paper bg={bg} p={{base: 36, sm: 72}}>
      <Grid justify="space-around">
        <Grid.Col my={12} span={{ base: 12, sm: 5 }}>
          <Title order={3}>{feature.title}</Title>
          <Title my={24}>{feature.heading}</Title>
          <Text>{feature.description}</Text>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 4 }}>
          <Image src={feature.image} alt="feature" h={320} w={320} m="auto"/>
        </Grid.Col>

      </Grid>
    </Paper>
  )
}

export default FeatureItem