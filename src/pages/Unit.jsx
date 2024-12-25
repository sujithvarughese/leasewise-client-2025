

import { useLoaderData, useLocation } from 'react-router-dom'
import { axiosDB } from '../utilities/axios.js'
import CreateExpenseForm from '../components/forms/CreateExpenseForm.jsx'
import CreateIncomeForm from '../components/forms/CreateIncomeForm.jsx'
import CreateMortgageForm from '../components/forms/CreateMortgageForm.jsx'
import { useState } from 'react'
import UnitTabs from '../components/units/UnitTabs.jsx'
import EditUnitForm from '../components/forms/EditUnitForm.jsx'
import { useAuthProvider } from '../context/auth-context.jsx'
import { Box, Button, Flex, Image, Text, Title } from '@mantine/core'

const Unit = () => {

  const { state: unit } = useLocation()
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
    <Flex direction="column" align="center">
      <Image src={unit?.image} alt="image" w={480} h={480}/>

        <Box justifyContent="space-around">
          <Box>
            <Title>{unit?.houseNumber} {unit?.street} {unit?.apartmentNumber}</Title>
            <Title order={4}>{unit?.city}, {unit?.state} {unit?.zip}</Title>
          </Box>
          <Flex justify="space-between" align="center">
            <Title order={6}>{unit?.bedrooms} bd / {unit?.bathrooms}ba</Title>
            <Button variant="contained" onClick={() => showUnauthorizedAlert()}>Edit Unit</Button>
            {showEditUnitForm && <EditUnitForm id={unit._id} open={showEditUnitForm} onClose={() => setShowEditUnitForm(false)}/>}
          </Flex>
        </Box>

        <br/>

        <Box>
          <Text>{unit?.tenant?.lastName}, {unit?.tenant?.firstName}</Text>
          <Text>{unit?.tenant?.email}</Text>
          <Text variant="body2">Rent: ${unit?.tenant?.rent}</Text>
        </Box>

      <UnitTabs
        unitIncomes={unitIncomes}
        unitExpenses={unitExpenses}
        unitMortgages={unitMortgages}
        showCreateIncomeForm={showCreateIncomeForm}
        toggleShowCreateIncomeForm={() => setShowCreateIncomeForm(true)}
        showCreateMortgageForm={setShowCreateMortgageForm}
        toggleShowCreateMortgageForm={() => setShowCreateMortgageForm(true)}
        showCreateExpenseForm={setShowCreateExpenseForm}
        toggleShowCreateExpenseForm={() => setShowCreateExpenseForm(true)}
      />

      <>
        {showCreateMortgageForm && <CreateMortgageForm id={unit._id} open={showCreateMortgageForm} onClose={() => setShowCreateMortgageForm(false)}/>}
        {showCreateExpenseForm && <CreateExpenseForm id={unit._id} open={showCreateExpenseForm} onClose={() => setShowCreateExpenseForm(false)}/>}
        {showCreateIncomeForm && <CreateIncomeForm id={unit._id} open={showCreateIncomeForm} onClose={() => setShowCreateIncomeForm(false)}/>}
      </>
    </Flex>
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