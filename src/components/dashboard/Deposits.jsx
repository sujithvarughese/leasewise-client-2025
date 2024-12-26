import { convertToUSD } from '../../utilities/financeCalculations.js'
import { useState } from 'react'
import { Box, Button, Flex, Text, Title } from '@mantine/core'


const Deposits = ({ incomes, expenses }) => {

  const calculateTotalIncome = incomes?.reduce((acc, item) => acc + Number(item.amount), 0)
  const calculateTotalExpense = expenses?.reduce((acc, item) => acc + Number(item.amount), 0)
  const calculateProfit = calculateTotalIncome - calculateTotalExpense

  const [viewBalance, setViewBalance] = useState(false)

  return (
    <Flex direction="column" align={{ base: "flex-start", xs: "flex-end" }}>
      <Title>Recent Rental Income</Title>
      <Text>{convertToUSD(incomes[incomes.length - 1].amount)}</Text>
      <Text>on {incomes[incomes.length - 1].datePaid.substring(0, 10)}</Text>

      <Box>
        {viewBalance && <Text>{convertToUSD(calculateProfit)}</Text>}
        <Button onClick={() => setViewBalance(!viewBalance)}>
          { viewBalance ? "Hide" : "View"} balance
        </Button>
      </Box>
    </Flex>
  );
}

export default Deposits