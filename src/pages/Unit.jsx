

import { useLoaderData, useLocation } from 'react-router-dom'
import { axiosDB } from '../utilities/axios.js'
import CreateExpenseForm from '../components/forms/CreateExpenseForm.jsx'
import CreateIncomeForm from '../components/forms/CreateIncomeForm.jsx'
import CreateMortgageForm from '../components/forms/CreateMortgageForm.jsx'
import { useState } from 'react'
import UnitTabs from '../components/units/UnitTabs.jsx'
import EditUnitForm from '../components/forms/EditUnitForm.jsx'
import { useAuthProvider } from '../context/auth-context.jsx'
import { Box, Button, Flex, Image, Text } from '@mantine/core'

const Unit = () => {

  const { state: unit } = useLocation()
  console.log(unit)
  const { expenses, incomes, mortgages } = useLoaderData()
  const { showUnauthorizedAlert } = useAuthProvider()

  const unitExpenses = expenses?.filter(expense => expense.unit === unit._id)
  const unitIncomes = incomes?.filter(income => income.unit === unit._id)
  const unitMortgages = mortgages?.filter(mortgage => mortgage.unit === unit._id)

  const [showCreateExpenseForm, setShowCreateExpenseForm] = useState(false)
  const [showCreateIncomeForm, setShowCreateIncomeForm] = useState(false)
  const [showCreateMortgageForm, setShowCreateMortgageForm] = useState(false)
  const [showEditUnitForm, setShowEditUnitForm] = useState(false)


  return (
    <Box>
      <Image src={unit?.image} alt="image" />

      <Box justifyContent="center" alignItems="center" margin={3}>
        <Box justifyContent="space-around">
          <Box>
            <Text variant="h5">{unit?.houseNumber} {unit?.street} {unit?.apartmentNumber}</Text>
            <Text variant="h6">{unit?.city}, {unit?.state} {unit?.zip}</Text>
          </Box>
          <Box>
            <Text>{unit?.bedrooms} bd / {unit?.bathrooms}ba</Text>
          </Box>
        </Box>
        <br/>
        <Box justifyContent="space-around">
          <Box>
            <Text variant="body2">{unit?.tenant?.lastName}, {unit?.tenant?.firstName}</Text>
            <Text variant="body2">{unit?.tenant?.email}</Text>
          </Box>
          <Text variant="body2">Rent: ${unit?.tenant?.rent}</Text>
        </Box>
      </Box>

      <Button variant="contained" onClick={() => showUnauthorizedAlert()}>Edit Unit</Button>
      {showEditUnitForm && <EditUnitForm id={unit._id} open={showEditUnitForm} onClose={() => setShowEditUnitForm(false)}/>}


      <UnitTabs unitIncomes={unitIncomes} unitExpenses={unitExpenses} unitMortgages={unitMortgages}/>


      <Flex sx={{ display: "flex", flexDirection: { xs: "column", sm: "row"}, gap: 2, justifyContent: "space-around", my: 3}}>
        <Button variant="contained" onClick={() => setShowCreateMortgageForm(!showCreateMortgageForm)}>Create Mortgage</Button>
        {showCreateMortgageForm && <CreateMortgageForm id={unit._id} open={showCreateMortgageForm} onClose={() => setShowCreateMortgageForm(false)}/>}
        <Button variant="contained" onClick={() => setShowCreateExpenseForm(!showCreateExpenseForm)}>Create Expense</Button>
        {showCreateExpenseForm && <CreateExpenseForm id={unit._id} open={showCreateExpenseForm} onClose={() => setShowCreateExpenseForm(false)}/>}
        <Button variant="contained" onClick={() => setShowCreateIncomeForm(!showCreateIncomeForm)}>Create Income</Button>
        {showCreateIncomeForm && <CreateIncomeForm id={unit._id} open={showCreateIncomeForm} onClose={() => setShowCreateIncomeForm(false)}/>}
      </Flex>


    </Box>
  )
}

export const unitLoader = async () => {
  try {
    let response = await axiosDB("/expenses")
    const { expenses } = response.data
    response = await axiosDB("/incomes")
    const { incomes } = response.data
    response = await axiosDB("/mortgages")
    const { mortgages } = response.data
    return { expenses, incomes, mortgages }
  } catch (error) {
    throw new Error(error)
  }
}

export default Unit