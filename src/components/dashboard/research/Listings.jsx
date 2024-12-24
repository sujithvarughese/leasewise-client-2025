
import { useEffect, useState } from 'react'
import useSubmit from '../../../hooks/useSubmit.js'
import { MdExpandMore, MdExpandLess } from "react-icons/md";
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
    <Flex direction="column" align="center">
      <Title order={4}>Search MLS Listings: </Title>
      <Flex justify="center" align="center" gap={3}>
        <TextInput
          type="text"
          name="zipCode"
          value={zipCode}
          placeholder="Zip Code"
          onChange={(e) => setZipCode(e.currentTarget.value)}
        />
        <Button loading={loading} onClick={handleSubmit}>Submit</Button>

        {listings && <ActionIcon onClick={toggle}>{opened ? <MdExpandLess /> : <MdExpandMore />}</ActionIcon>}
      </Flex>

      {listings &&
      <Collapse in={opened}>
        <Title>MLS Listings</Title>
        <Flex wrap="wrap" gap={6}>
          {listings?.map((listing, index) =>
            <ListingCover key={index} {...listing}/>)}
        </Flex>
      </Collapse>
      }
    </Flex>
  )
}

export default Listings