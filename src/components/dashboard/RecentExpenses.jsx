
import { convertToUSD } from '../../utilities/financeCalculations.js'

import { Box, Table, Title } from '@mantine/core'

const RecentExpenses = ({ expenses }) => {

  return (
    <Box bg="white" p={24} sx={{ borderRadius: 10 }}>
      <Title>Payments</Title>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Date</Table.Th>
            <Table.Th>Category</Table.Th>
            <Table.Th>Pay To</Table.Th>
            <Table.Th display={{ base: "none", sm: "initial" }}>Payment Method</Table.Th>
            <Table.Th>Payment Amount</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {expenses.map((expense) => (
            <Table.Tr key={expense._id}>
              <Table.Td>{expense.dateDue?.substring(0, 10) || expense.datePaid?.substring(0, 10)}</Table.Td>
              <Table.Td>{expense.category[0].toUpperCase() + expense.category.substring(1)}</Table.Td>
              <Table.Td>{expense.companyName}</Table.Td>
              <Table.Td display={{ base: "none", sm: "initial" }}>{expense.paymentMethod}</Table.Td>
              <Table.Td align="right">{convertToUSD(expense.amount)}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Box>
  );
}

export default RecentExpenses

