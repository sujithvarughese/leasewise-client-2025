import { useEffect, useState } from 'react'
import { Box, Flex, Paper, Text, Title } from '@mantine/core'
import { PieChart } from '@mantine/charts'

const PieChartExpenses = ({ expenses }) => {

  const createData = () => {
    const expensesObj = {}
    expenses.forEach((expense, index) => {
      if (expense.category in expensesObj) {
        expensesObj[expense.category] = { ...expensesObj[expense.category], value: expensesObj[expense.category].value += expense.amount }
        return
      }
      expensesObj[expense.category] = {
        name: expense.category[0].toUpperCase() + expense.category.substring(1),
        value: expense.amount,
        color: colors[expense.category]
      }
    })
    return Object.values(expensesObj)
  }
  const [data, setData] = useState(createData())

  return (
    <Box w="100%" bg="white" p={24} rounded="md" shadow="md">
      <Title>Expenses</Title>
      {data &&
        <Flex>
          <PieChart
            labelsType="percent"
            size={240}
            withLabels
            withTooltip
            tooltipDataSource="segment"
            data={data}/>
          <Box>
            {data.map((category, index) =>
              <Flex key={index} align="center" gap={6}>
                <Box style={{ height: "16px", width: "16px" }} bg={category.color}></Box>
                <Text>{category.name}</Text>
              </Flex>
            )}
          </Box>

        </Flex>
      }
    </Box>

  )
}

const colors = { tax: "indigo.6", insurance: "yellow.6", hoa: "teal.6", maintenance: "gray.6", repairs: "red.6" }

export default PieChartExpenses