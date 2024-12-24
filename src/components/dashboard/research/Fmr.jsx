import { axiosHUD } from "../../../utilities/axios.js";
import { useState } from "react";
import { Box, Container, Flex, NativeSelect, Table, Text, Title } from '@mantine/core'

const Fmr = () => {

  const [counties, setCounties] = useState([])
  const [fmrByZip, setFmrByZip] = useState([])
  const [fmrData, setFmrData] = useState(null)

  const [county, setCounty] = useState("")
  const [zip, setZip] = useState("")
  const year = 2023
  // after user selects a state, fetch a list of counties and the county code, then prompt user for county
  const getCountyList = (stateCode) => {
    const fetchData = async () => {
      try {
        // retrieves list of counties { state_code, fips_code, county_name, town_name, category }
        const response = await axiosHUD(`/listCounties/${stateCode}`)
        // we need only county_name to populate list and fips_code to then fetch by code
        const counties = response.data.map(county => {
          return {
            label: county.county_name,
            value: county.fips_code
          }
        })
        // form will only populate list if counties state array length > 0
        setCounties(counties)
      } catch (error) {
        console.log(error);
      }
    }
    fetchData()
  }

  // after user selects county, fetch a list of zip codes(if metro county) with FMR list
  const getZipCodeList = (county) => {
    setCounty(county.label)
    setZip("")
    const fetchData = async () => {
      try {
        // retrieve list { zip_code, Efficiency, One-Bedroom, Two-Bedroom, Three-Bedroom, Four-Bedroom }
        const response = await axiosHUD(`/data/${county.value}?year=${year}`)
        console.log(response.data.data)
        // if classified as small area, data is not seperated by zipcodes
        if (response.data.data.smallarea_status === "0") {
          setFmrData(response.data.data.basicdata)
        } else {
          const zipCodes = response.data.data.basicdata
          // form will only display zip codes to user once state array is populated
          if (zipCodes.length > 0) {
            setFmrByZip(zipCodes)
          } else {
            setFmrData(zipCodes)
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData()
  }

  const handleChangeStateCode = (e) => {
    // to clear values in case user picks different state after selecting zip
    setFmrByZip([])
    setFmrData(null)
    getCountyList(e.currentTarget.value)
  }

  const handleChangeCounty =(e) => {
    setFmrByZip([])
    setFmrData(null)
    const county = counties.find(county => county.value === e.currentTarget.value)
    getZipCodeList(county);
  }

  // set our final data to display
  const handleSelectZipCode = (e) => {
    console.log(e.currentTarget.value)
    const data = fmrByZip.find(zip => zip.zip_code === e.currentTarget.value)
    setZip(e.currentTarget.value)
    setFmrData(data)
  }

  return (
    <Box>
      <Flex direction="column" align="center">
        <Title order={4}>Search for Fair Market Rent Values:</Title>
        <Box>
          <NativeSelect
            label="State"
            data={states}
            onChange={handleChangeStateCode}
          />
          {counties.length > 0 &&
            <NativeSelect
              label="County"
              data={counties}
              onChange={handleChangeCounty}
            />
          }
          {fmrByZip?.length > 0 &&
            <NativeSelect
              label="Zip"
              data={fmrByZip.map(zip => zip.zip_code)}
              onChange={handleSelectZipCode}
            />
          }
        </Box>
      </Flex>


      {fmrData &&
        <Container>
          <Table aria-label="simple-table">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>
                  Fair Market Rent Values for {county}
                  { zip && `: ${zip}`}
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td>Efficiency</Table.Td>
                <Table.Td>${fmrData["Efficiency"]}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>One-Bedroom</Table.Td>
                <Table.Td>${fmrData["One-Bedroom"]}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Two-Bedroom</Table.Td>
                <Table.Td>${fmrData["Two-Bedroom"]}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Three-Bedroom</Table.Td>
                <Table.Td>${fmrData["Three-Bedroom"]}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Four-Bedroom</Table.Td>
                <Table.Td>${fmrData["Four-Bedroom"]}</Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        </Container>

      }
    </Box>


  );
};

const states = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY']

export default Fmr;