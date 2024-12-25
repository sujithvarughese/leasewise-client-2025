

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
import { useDisclosure } from '@mantine/hooks'

const Unit = () => {

  const { state: unit } = useLocation()
  const { expenses, incomes, mortgages } = useLoaderData()
  const { showUnauthorizedAlert } = useAuthProvider()

  const unitExpenses = expenses?.filter(expense => expense.unit === unit._id)
  const unitIncomes = incomes?.filter(income => income.unit === unit._id)
  const unitMortgages = mortgages?.filter(mortgage => mortgage.unit === unit._id)

  const [showCreateIncomeForm, { open: openCreateIncomeForm, close: closeCreateIncomeForm }] = useDisclosure(false);
  const [showCreateExpenseForm, { open: openCreateExpenseForm, close: closeCreateExpenseForm }] = useDisclosure(false);
  const [showCreateMortgageForm, { open: openCreateMortgageForm, close: closeCreateMortgageForm }] = useDisclosure(false);
  const [showEditUnitForm, { open: openEditUnitForm, close: closeEditUnitForm }] = useDisclosure(false);



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
            <Button onClick={openEditUnitForm}>Edit Unit</Button>
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
        openCreateIncomeForm={openCreateIncomeForm}
        showCreateMortgageForm={showCreateMortgageForm}
        openCreateMortgageForm={openCreateMortgageForm}
        showCreateExpenseForm={showCreateExpenseForm}
        openCreateExpenseForm={openCreateExpenseForm}
      />

      <>
        <EditUnitForm unit={unit} opened={showEditUnitForm} onClose={closeEditUnitForm} />
        <CreateMortgageForm id={unit._id} opened={showCreateMortgageForm} onClose={closeCreateMortgageForm} />
        <CreateExpenseForm id={unit._id} opened={showCreateExpenseForm} onClose={closeCreateExpenseForm} />
        <CreateIncomeForm id={unit._id} opened={showCreateIncomeForm} onClose={closeCreateIncomeForm} />
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