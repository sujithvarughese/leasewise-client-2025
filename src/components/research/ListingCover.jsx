import React, { useEffect, useState } from 'react'

import ListingDetails from './ListingDetails.jsx'
import useSubmit from '../../hooks/useSubmit.js'
import { Box, Card, Image, Loader, Paper, Text, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { convertToUSD } from '../../utilities/financeCalculations.js'

const ListingCover = ({
  propertyId,
  address,
  city,
  state,
  zipCode,
  streetViewImage,
  primaryImage,
  bedrooms,
  bathrooms,
  listPrice
}) => {

  const [listingDetails, setListingDetails] = useState(null)
  const { response, error, loading, submitForm } = useSubmit()
  const [showDetails, { open, close }] = useDisclosure(false);


  const handleClick = () => {
    submitForm({ method: "GET", url: `/research/listings/${propertyId}`, requestConfig: null })
  }

  useEffect(() => {
    if (response) {
      setListingDetails(response.home)
      open()
    }
  }, [response])

  return (
    <>
      <Card onClick={handleClick} p={36}>
        <Card.Section>
          <Image src={primaryImage} h={120} w={200}></Image>
        </Card.Section>
        <Card.Section>
          <Box >
            <Title order={4}>{address}</Title>
            <Title order={6}>{city}, {state} {zipCode}</Title>
          </Box>
          <Text>{bedrooms} br / {bathrooms} ba</Text>

          <Title order={5} style={{ textAlign: "end", paddingTop: "16px"}}>{ !!listPrice && convertToUSD(listPrice)}</Title>

          <Box style={{  justifySelf: "center" }}>{loading && <Loader />}</Box>
        </Card.Section>
      </Card>


      {showDetails &&
        <ListingDetails
          closeDetails={close}
          showDetails={showDetails}
          address={address}
          city={city}
          state={state}
          zipCode={zipCode}
          bedrooms={bedrooms}
          bathrooms={bathrooms}
          listPrice={listPrice}
          streetViewImage={streetViewImage}
          {...listingDetails}
        />}
    </>


  )
}

export default ListingCover