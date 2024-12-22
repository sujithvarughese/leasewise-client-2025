import React, { useEffect, useState } from 'react'

import ListingDetails from './ListingDetails.jsx'
import useSubmit from '../../hooks/useSubmit.js'
import { Box, Card, Image, Loader, Paper, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'


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
        <Card onClick={handleClick}>
          <Card.Section>
            <Image src={primaryImage} height={100}></Image>
          </Card.Section>
          <Card.Section>
            <Box>
              <Text height={60}>{address}</Text>
              <Text>{city}, {state} {zipCode}</Text>
            </Box>
            <Text>{bedrooms} bedrooms {bathrooms} bathrooms</Text>
            <Text>List Price: ${listPrice}</Text>
            {loading && <Loader />}
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