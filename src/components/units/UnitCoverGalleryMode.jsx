
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Card, Image, Text } from '@mantine/core'

const UnitCoverGalleryMode = ({ unit }) => {

  const {
    _id,
    houseNumber,
    street,
    city,
    apartmentNumber,
    state,
    zip,
    image,
    bedrooms,
    bathrooms,
    tenant,
    user
  } = unit


  const navigate = useNavigate()
  const navigateToUnit = () => {
    navigate(`/unit/${_id}`, { state: unit })
  }

  return (
      <Card onClick={navigateToUnit}>
        <Card.Section>
          <Image src={image} alt={`${houseNumber} ${street}`} h={200} w={200}/>
        </Card.Section>
        <Card.Section>
          <Text>{houseNumber} {street} {apartmentNumber}</Text>
          <Text>{city} {state}, {zip}</Text>
          <Text fontWeight={700}>{tenant?.lastName}, {tenant?.firstName}</Text>
        </Card.Section>
      </Card>

  )
}

export default UnitCoverGalleryMode