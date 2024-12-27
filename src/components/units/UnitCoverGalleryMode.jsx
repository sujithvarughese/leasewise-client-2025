
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Card, HoverCard, Image, Text, Title, UnstyledButton } from '@mantine/core'

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
    <HoverCard>
      <HoverCard.Target>
        <UnstyledButton onClick={navigateToUnit}>
          <Image src={image} alt={`${houseNumber} ${street}`} h={200} w={200} radius="sm"/>
        </UnstyledButton>
      </HoverCard.Target>
      <HoverCard.Dropdown>
        <Title order={5}>{houseNumber} {street} {apartmentNumber}</Title>
        <Title order={6}>{city} {state}, {zip}</Title>
        {tenant && <Text fontWeight={700}>Tenant: {tenant?.lastName}, {tenant?.firstName}</Text>}
      </HoverCard.Dropdown>
    </HoverCard>



  )
}

export default UnitCoverGalleryMode