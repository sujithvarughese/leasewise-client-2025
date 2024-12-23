
import { useEffect, useState } from 'react'
import useSubmit from '../../hooks/useSubmit.js'
import { MdExpandMore } from "react-icons/md";
import ListingCover from './ListingCover.jsx'

import { useNavigate } from 'react-router-dom'
import { Accordion, Box, Button, Collapse, Container, Flex, Text, TextInput, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'


const Listings = () => {

  const [zipCode, setZipCode] = useState("")
  const [listings, setListings] = useState(null)
  const { response, error, loading, submitForm } = useSubmit()
  const [opened, { toggle }] = useDisclosure(false);


  const handleSubmit = (e) => {
    e.preventDefault()
    submitForm({ method: "POST", url: "/research/listings", requestConfig: { zipCode }})
  }

  useEffect(() => {
    if (response) {
      const updatedHomes = response.homes.filter(home => !!home.address)
      setListings(updatedHomes)
      toggle()
    }
  }, [response])


  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Text>Search MLS Listings: </Text>
        <Flex justify="center" align="center" gap={3}>
          <TextInput
            type="text"
            name="zipCode"
            value={zipCode}
            placeholder="Zip Code"
            onChange={(e) => setZipCode(e.target.value)}
          />
          <Button loading={loading} type="submit">Submit</Button>
          {listings && <Button rightSection={<MdExpandMore />} onClick={toggle}></Button>}
        </Flex>
      </form>

      {listings &&
      <Collapse in={opened}>
        <Title>MLS Listings</Title>
        <Flex wrap="wrap" gap={6}>
          {listings?.map((listing, index) =>
            <ListingCover key={index} {...listing}/>)}
        </Flex>
      </Collapse>
      }
    </Box>
  )
}

export default Listings