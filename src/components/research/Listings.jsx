import { useEffect, useState } from 'react'
import useSubmit from '../../hooks/useSubmit.js'
import ListingCover from './ListingCover.jsx'

import { useNavigate } from 'react-router-dom'
import { Accordion, ActionIcon, Box, Button, Collapse, Container, Flex, Text, TextInput, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'


const Listings = () => {

  const [zipCode, setZipCode] = useState("")
  const [listings, setListings] = useState(null)
  const { response, error, loading, submitForm } = useSubmit()
  const [opened, { toggle }] = useDisclosure(false);


  const handleSubmit = () => {
    submitForm({ method: "POST", url: "/research/listings", requestConfig: { zipCode }})
  }

  useEffect(() => {
    if (response) {
      const updatedHomes = response.homes.filter(home => !!home.address)
      setListings(updatedHomes)
      if (!opened) {
        toggle()
      }
    }
  }, [response])


  return (
    <Box>
      <Title m={16} order={4} style={{ textAlign: "center" }}>Search for Fair Market Rent Values:</Title>
      <Flex justify="center" align="center" gap={12}>
        <TextInput
          type="text"
          name="zipCode"
          value={zipCode}
          placeholder="Zip Code"
          onChange={(e) => setZipCode(e.currentTarget.value)}
        />
        <Button loading={loading} onClick={handleSubmit}>Search</Button>
      </Flex>

      {listings &&
      <Box py={16}>
        <Title order={3}>Search Results: </Title>
        <Flex wrap="wrap" gap={6} justify="center">
          {listings?.map((listing, index) =>
            <ListingCover key={index} {...listing}/>)}
        </Flex>
      </Box>
      }
    </Box>
  )
}

export default Listings