import {useEffect, useState} from "react";
import { useLoaderData } from "react-router-dom";
import { axiosDB } from "../utilities/axios.js";
import { useAuthProvider } from '../context/auth-context.jsx'
import { ActionIcon, Box, Button, Container, Flex, Switch } from '@mantine/core'
import SearchUnits from '../components/units/SearchUnits.jsx'
import UnitCoverListMode from '../components/units/UnitCoverListMode.jsx'
import UnitCoverGalleryMode from '../components/units/UnitCoverGalleryMode.jsx'
import CreateUnitForm from '../components/forms/CreateUnitForm.jsx'
import { useDisclosure } from '@mantine/hooks'
import { IoAddOutline } from "react-icons/io5";

const Units = () => {
  // units = [{ unit }, {},...]
  const units = useLoaderData()

  const { showUnauthorizedAlert } = useAuthProvider()
  // set in global state

  const [showCreateUnitForm, { open: openCreateUnitForm, close: closeCreateUnitForm }] = useDisclosure(false);

  // state to trigger show create unit form
  const [listMode, setListMode] = useState(true)

  // state for search function
  const [query, setQuery] = useState("")

  // filter units by search by using derived state;
  // -convert query to lower case and check if any part of the address contains the search
  const queriedUnits = units.filter(unit => {
    return (
      unit.houseNumber.toLowerCase().includes(query.toLowerCase())  ||
      unit.street.toLowerCase().includes(query.toLowerCase()) ||
      unit.apartmentNumber?.toLowerCase().includes(query.toLowerCase()) ||
      unit.city.toLowerCase().includes(query.toLowerCase()) ||
      unit.state.toLowerCase().includes(query.toLowerCase()) ||
      unit.zip.toLowerCase().includes(query.toLowerCase()) ||
      unit.tenant?.firstName.toLowerCase().includes(query.toLowerCase()) ||
      unit.tenant?.lastName.toLowerCase().includes(query.toLowerCase())
    )
  })
  // scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  return (
    <Box>
      <Switch
        display={{ base: "none", sm: "initial" }}
        checked={!listMode} label="Gallery Mode"
        onChange={() => setListMode(!listMode)}
      />

      <Flex justify="space-between" align="center" p={24} gap={16}>
        <SearchUnits query={query} setQuery={setQuery} />
        <ActionIcon onClick={openCreateUnitForm} size="lg"><IoAddOutline size="24px"/></ActionIcon>
      </Flex>
      <CreateUnitForm opened={showCreateUnitForm} onClose={closeCreateUnitForm}/>

      {listMode ?
        <Flex direction="column" gap={6}>
          {queriedUnits?.map(unit => <UnitCoverListMode key={unit._id} unit={unit} />)}
        </Flex>
        :
        <Flex wrap="wrap" gap={6}>
          {queriedUnits?.map(unit => <UnitCoverGalleryMode key={unit._id} unit={unit} />)}
        </Flex>
      }
    </Box>
  );
};

export const unitsLoader = async () => {
  try {
    // all units
    const response = await axiosDB("/units")
    const { units } = response.data
    return units
  } catch (error) {
    throw new Error(error)
  }
}

export default Units;