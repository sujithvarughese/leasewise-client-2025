import { useEffect, useState } from 'react'

import ListingDetails from './ListingDetails.jsx'
import useSubmit from '../../hooks/useSubmit.js'
import {Box, Card, Flex, Image, Loader, Paper, Text, Title} from '@mantine/core'
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
      <Card onClick={handleClick} p={24} withBorder shadow="xl" radius="sm" style={{ cursor: "pointer" }}>

        <Card.Section>
          {loading ?  <Flex justify="center" align="center" h="100%">{loading && <Loader type="dots" ta="center" h={120} />}</Flex> :
          <Image src={primaryImage} h={120} radius="sm"></Image>
          }
        </Card.Section>

        <Card.Section>
          <Box >
            <Text fz={18} fw={900} order={4} >{address}</Text>
            <Text fz={14} fw={700} order={4} lh={1.2}>{city}, {state} {zipCode}</Text>
          </Box>
          <Text fz={14}>{bedrooms} br / {bathrooms} ba</Text>

          <Title order={5} style={{ textAlign: "end", paddingTop: "12px"}}>{ !!listPrice && convertToUSD(listPrice)}</Title>

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