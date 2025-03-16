import {Box, Flex, Modal, Text} from "@mantine/core";
import ListingCover from "../research/ListingCover.jsx";

const ListingsModal = ({ opened, close, listings, zipCode }) => {
  return (
    <Modal opened={opened} onClose={close} size="xl">
      <Box py={16}>
        <Text size="xl" fw={600}>Search Results for {zipCode}:</Text>
        {!listings.length && <Text size="lg">No listings found for zip code: {zipCode}</Text>}
        <Flex wrap="wrap" gap={12} justify="center">
          {listings?.map((listing, index) =>
            <ListingCover key={index} {...listing}/>)}
        </Flex>
      </Box>
    </Modal>
  );
};

export default ListingsModal;