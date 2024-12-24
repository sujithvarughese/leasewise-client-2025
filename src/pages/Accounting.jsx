import { useState } from 'react'
import { axiosDB } from "../utilities/axios.js";
import { useLoaderData } from "react-router-dom";
import FinancesTotalCalculated from "../components/accounting/FinancesTotalCalculated.jsx"
import FinancesTotalUnitValues from "../components/accounting/FinancesTotalUnitValues.jsx"
import { totalProfit, convertToUSD } from "../utilities/financeCalculations.js";
import { Box, Container, NativeSelect, Table, Text } from '@mantine/core'


const Accounting = () => {

  // finances = array of each unit's financial data
  const { finances, units } = useLoaderData()
  // allow users to view summary per month or year
  const [selectedTerm, setSelectedTerm] = useState(1)

  // filter array we receive in loader to include address from {units} and only relevant data
  const [unitFinances, setUnitFinances] = useState(finances?.map(finance => {
    const unit = units.find(unitInArray => unitInArray._id === finance.unit)
    return {
      unitID: finance.unit,
      _id: finance.unit,
      financeID: finance._id,
      mortgage: finance.mortgage,
      propertyTax: finance.annualPropertyTax/12,
      insurance: finance.insurance.annualPremium/12,
      hoa: finance.hoa.annualFee/12,
      rent: finance.rent,
      houseNumber: unit.houseNumber,
      street: unit.street,
      apartmentNumber: unit.apartmentNumber,
      city: unit.city,
      state: unit.state,
      zip: unit.zip,
      image: unit.image,
      bedrooms: unit.bedrooms,
      bathrooms: unit.bathrooms,
      tenant: unit.tenant,
      user: unit.user
    }
  }))

  // user can remove unit using state to see potential changes in finances
  const removeUnit = (unitID) => {
    const updatedList = unitFinances.filter(unitFinance => unitFinance.financeID !== unitID)
    setUnitFinances(updatedList)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        style={{
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Container sx={{ mt: 4, mb: 4 }}>
          <Box>
            <NativeSelect
              name="term"
              label="Term"
              value={setSelectedTerm.label}
              sx={{ minWidth: 120 }}
              onChange={(e) => setSelectedTerm(e.target.value)}
            >
              <option value={1}>Monthly</option>
              <option value={12}>Annual</option>
            </NativeSelect>
          </Box>

          <Table aria-label="simple-table">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Address</Table.Th>
                <Table.Th sx={{ display: { xs: "none", md: "revert" }}}>Mortgage</Table.Th>
                <Table.Th sx={{ display: { xs: "none", md: "revert" }}}>Tax</Table.Th>
                <Table.Th sx={{ display: { xs: "none", md: "revert" }}}>Insurance</Table.Th>
                <Table.Th sx={{ display: { xs: "none", md: "revert" }}}>HOA</Table.Th>
                <Table.Th sx={{ display: { md: "none" }}}>Expenses</Table.Th>
                <Table.Th>Rent</Table.Th>
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              {
                unitFinances.map(unitFinance =>
                  <FinancesTotalUnitValues
                    key={unitFinance.financeID}
                    unitFinance={unitFinance}
                    selectedTerm={selectedTerm}
                    removeUnit={removeUnit}
                  />)
              }
              <FinancesTotalCalculated unitFinances={unitFinances} selectedTerm={selectedTerm}/>
            </Table.Tbody>
          </Table>

          <Box p={3}>
            <Text>Total Profit: {convertToUSD(totalProfit(unitFinances, selectedTerm))}</Text>
          </Box>
        </Container>
      </Box>



    </Box>

  );
};

export const accountingLoader = async () => {
  try {
    const responseFinances = await axiosDB("/finance")
    const responseUnits = await axiosDB("/units")
    const { finances } = responseFinances.data
    const { units } = responseUnits.data
    console.log(finances)
    return { finances, units }
  } catch (error) {
    console.log(error);
  }
}

export default Accounting;