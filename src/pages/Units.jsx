import {useEffect, useState} from "react";
import { useLoaderData } from "react-router-dom";
import { axiosDB } from "../utilities/axios.js";
import { useAuthProvider } from '../context/auth-context.jsx'
import { Box, Button, Container, Flex, Switch } from '@mantine/core'
import SearchUnits from '../components/units/SearchUnits.jsx'
import UnitCoverListMode from '../components/units/UnitCoverListMode.jsx'
import UnitCoverGalleryMode from '../components/units/UnitCoverGalleryMode.jsx'
import CreateUnitForm from '../components/forms/CreateUnitForm.jsx'
import { useDisclosure } from '@mantine/hooks'

const Units = () => {
  // units = [{ unit }, {},...]
  const units = useLoaderData()

  const { showUnauthorizedAlert } = useAuthProvider()
  // set in global state

  const [showCreateUnitForm, { openCreateUnitForm, closeCreateUnitForm }] = useDisclosure(false);

  // state to trigger show create unit form
  const [listMode, setListMode] = useState(false)

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
      unit.zip.toLowerCase().includes(query.toLowerCase())
    )
  })
  // scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  return (
    <Box>
      <Flex  justify="space-between" align="center">
        <Switch checked={!listMode} label="Gallery Mode" onChange={() => setListMode(!listMode)} />
        <SearchUnits query={query} setQuery={setQuery} />
        <Button onClick={showUnauthorizedAlert}>{!showCreateUnitForm ? "Create Unit" : "Hide Form"}</Button>
      </Flex>

      {showCreateUnitForm && <CreateUnitForm opened={showCreateUnitForm} close={closeCreateUnitForm}/>}

      {listMode ?
        <Flex direction="column">
          {queriedUnits?.map(unit => <UnitCoverListMode key={unit._id} unit={unit} />)}
        </Flex>
        :
        <Flex wrap="wrap" justify="center" gap={6}>
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