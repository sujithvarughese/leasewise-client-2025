import React, { useState } from 'react'
import { convertToUSD } from '../../utilities/financeCalculations.js'
import { ActionIcon, Box, Table, Tabs } from '@mantine/core'
import { IoMdAdd } from "react-icons/io";


const UnitTabs = ({
  unitIncomes,
  unitExpenses,
  unitMortgages,
  showCreateExpenseForm,
  showCreateIncomeForm,
  showCreateMortgageForm,
  toggleShowCreateExpenseForm,
  toggleShowCreateIncomeForm,
  toggleShowCreateMortgageForm
}) => {

  const [value, setValue] = useState("1")

  const forms = {
    "1": toggleShowCreateIncomeForm,
    "2": toggleShowCreateExpenseForm,
    "3": toggleShowCreateMortgageForm
  }

  const openForm = () => {forms[value]()}



  return (
    <Box>
      <Tabs defaultValue="1">

        <Tabs.List justify="center">
          <ActionIcon style={{ position: "absolute" }} right={0} onClick={openForm}><IoMdAdd /></ActionIcon>
          <Tabs.Tab value="1" onClick={()=>setValue("1")}>Incomes</Tabs.Tab>
          <Tabs.Tab value="2" onClick={()=>setValue("2")}>Expenses</Tabs.Tab>
          <Tabs.Tab value="3" onClick={()=>setValue("3")}>Mortgages</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="1">
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Date Paid</Table.Th>
                <Table.Th>Category</Table.Th>
                <Table.Th>Amount</Table.Th>
                <Table.Th>Balance</Table.Th>
                <Table.Th style={{ display: { xs: "none", sm: "revert" }}}>Payment Method</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {unitIncomes?.map(income =>
                <Table.Tr key={income._id}>
                  <Table.Td>{income?.datePaid?.substring(0, 10)}</Table.Td>
                  <Table.Td>{income?.category[0].toUpperCase() + income.category.substring(1)}</Table.Td>
                  <Table.Td>{convertToUSD(income?.amount)}</Table.Td>
                  <Table.Td>{convertToUSD(income?.balance)}</Table.Td>
                  <Table.Td style={{ display: { xs: "none", sm: "revert" }}}>{income?.paymentMethod}</Table.Td>
                </Table.Tr>
              )}
            </Table.Tbody>
          </Table>
        </Tabs.Panel>

        <Tabs.Panel value="2" sx={{ p: 0 }}>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Date Due</Table.Th>
                <Table.Th>Category</Table.Th>
                <Table.Th style={{ display: { xs: "none", sm: "revert" }}}>Pay To</Table.Th>
                <Table.Th style={{ display: { xs: "none", sm: "revert" }}}>Amount</Table.Th>
                <Table.Th>Balance</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {unitExpenses?.map(expense =>
                <Table.Tr  key={expense._id}>
                  <Table.Td>{expense?.dateDue?.substring(0, 10)}</Table.Td>
                  <Table.Td>{expense?.category[0].toUpperCase() + expense.category.substring(1)}</Table.Td>
                  <Table.Td style={{ display: { xs: "none", sm: "revert" }}}>{expense?.companyName}</Table.Td>
                  <Table.Td style={{ display: { xs: "none", sm: "revert" }}}>{convertToUSD(expense?.amount)}</Table.Td>
                  <Table.Td>{convertToUSD(expense?.balance)}</Table.Td>
                </Table.Tr>
              )}
            </Table.Tbody>
          </Table>
        </Tabs.Panel>

        <Tabs.Panel value="3" sx={{ p: 0 }}>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th style={{ display: { xs: "none", sm: "revert" }}}>Bank</Table.Th>
                <Table.Th>Purchase Price</Table.Th>
                <Table.Th>Principal</Table.Th>
                <Table.Th>APR</Table.Th>
                <Table.Th>Term</Table.Th>
                <Table.Th style={{ display: { xs: "none", sm: "revert" }}}>Payments Made</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {unitMortgages?.map(mortgage =>
                <Table.Tr  key={mortgage._id}>
                  <Table.Td style={{ display: { xs: "none", sm: "revert" }}}>{mortgage?.bank}</Table.Td>
                  <Table.Td>{convertToUSD(mortgage?.purchasePrice)}</Table.Td>
                  <Table.Td>{convertToUSD(mortgage?.principal)}</Table.Td>
                  <Table.Td>{mortgage?.interest}%</Table.Td>
                  <Table.Td>{mortgage?.term} months</Table.Td>
                  <Table.Td style={{ display: { xs: "none", sm: "revert" }}}>{mortgage?.numPaymentsMade}</Table.Td>

                </Table.Tr>
              )}
            </Table.Tbody>

          </Table>
        </Tabs.Panel>
      </Tabs>
    </Box>

  )
}

export default UnitTabs