

import { useLocation } from 'react-router-dom'
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

  const { state: id } = useLocation()

  const { units, expenses, incomes, mortgages } = useManagementProvider()
  const { showUnauthorizedAlert } = useAuthProvider()

  const unitDetails = units?.find(unit => unit._id === id)
  const unitExpenses = expenses?.filter(expense => expense.unit === id)
  const unitIncomes = incomes?.filter(income => income.unit === id)
  const unitMortgages = mortgages?.filter(mortgage => mortgage.unit === id)

  const [showCreateExpenseForm, setShowCreateExpenseForm] = useState(false)
  const [showCreateIncomeForm, setShowCreateIncomeForm] = useState(false)
  const [showCreateMortgageForm, setShowCreateMortgageForm] = useState(false)
  const [showEditUnitForm, setShowEditUnitForm] = useState(false)


  return (
    <Box>
      <Image src={unitDetails?.image} alt="image" />

      <Box justifyContent="center" alignItems="center" margin={3}>
        <Box justifyContent="space-around">
          <Box>
            <Text variant="h5">{unitDetails?.houseNumber} {unitDetails?.street} {unitDetails?.apartmentNumber}</Text>
            <Text variant="h6">{unitDetails?.city}, {unitDetails?.state} {unitDetails?.zip}</Text>
          </Box>
          <Box>
            <Text>{unitDetails?.bedrooms} bd / {unitDetails?.bathrooms}ba</Text>
          </Box>
        </Box>
        <br/>
        <Box justifyContent="space-around">
          <Box>
            <Text variant="body2">{unitDetails?.tenant?.lastName}, {unitDetails?.tenant?.firstName}</Text>
            <Text variant="body2">{unitDetails?.tenant?.email}</Text>
          </Box>
          <Text variant="body2">Rent: ${unitDetails?.tenant?.rent}</Text>
        </Box>
      </Box>

      <Button variant="contained" onClick={() => showUnauthorizedAlert()}>Edit Unit</Button>
      {showEditUnitForm && <EditUnitForm id={id} open={showEditUnitForm} onClose={() => setShowEditUnitForm(false)}/>}


      <UnitTabs unitIncomes={unitIncomes} unitExpenses={unitExpenses} unitMortgages={unitMortgages}/>


      <Flex sx={{ display: "flex", flexDirection: { xs: "column", sm: "row"}, gap: 2, justifyContent: "space-around", my: 3}}>
        <Button variant="contained" onClick={() => setShowCreateMortgageForm(!showCreateMortgageForm)}>Create Mortgage</Button>
        {showCreateMortgageForm && <CreateMortgageForm id={id} open={showCreateMortgageForm} onClose={() => setShowCreateMortgageForm(false)}/>}
        <Button variant="contained" onClick={() => setShowCreateExpenseForm(!showCreateExpenseForm)}>Create Expense</Button>
        {showCreateExpenseForm && <CreateExpenseForm id={id} open={showCreateExpenseForm} onClose={() => setShowCreateExpenseForm(false)}/>}
        <Button variant="contained" onClick={() => setShowCreateIncomeForm(!showCreateIncomeForm)}>Create Income</Button>
        {showCreateIncomeForm && <CreateIncomeForm id={id} open={showCreateIncomeForm} onClose={() => setShowCreateIncomeForm(false)}/>}
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