import React, { useEffect } from 'react'
import useSubmit from '../../../hooks/useSubmit.js'
import { convertToUSD } from '../../../utilities/financeCalculations.js'
import { Anchor, Box, Flex, Image, List, Modal, Text, Title } from '@mantine/core'


const ListingDetails = ({
  propertyId,
  closeDetails,
  showDetails,
  address,
  city,
  state,
  zipCode,
  bedrooms,
  bathrooms,
  listPrice,
  streetViewImage,
  description,
  yearBuilt,
  photos,
  listDate,
  lastSoldPrice,
  lastSoldDate,
  link
  }) => {

  const listDateString = new Date(listDate).toLocaleDateString()
  const lastSoldDateString = new Date(lastSoldDate).toLocaleDateString()

  return (
    <Modal opened={showDetails} onClose={closeDetails} title="Listing Details">
      <Title order={5}>{address}</Title>
      <Title order={6}>{city}, {state} {zipCode}</Title>


      <Text>{bedrooms} bed, {bathrooms} bath</Text>
      <Text>Built in {yearBuilt}</Text>


      <Box>
        <Text order={6}>List Price: <span style={{ fontWeight: 600 }}>{convertToUSD(listPrice)}</span></Text>
        <Text>Listed on {listDateString}</Text>
        <Text>Last sold for {convertToUSD(lastSoldPrice)} on {lastSoldDateString}</Text>
      </Box>

          <Text>{description}</Text>
          <Anchor href={link} target="_blank" rel="noreferrer">More Information</Anchor>
          <Flex wrap="wrap" justify="center" gap={6}>
            {photos?.map((item, index) => (
              <Image key={index} src={item} alt="photo"/>
            ))}
          </Flex>


          <Box>
            <Text>Google Street View</Text>
            <Image src={streetViewImage} alt="photo" />
          </Box>



    </Modal>
  )
}
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: "80vh",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflowY: "scroll"
};
export default ListingDetails