import { axiosDB } from '../utilities/axios.js'
import { Box, Flex } from '@mantine/core'
import { useLoaderData } from 'react-router-dom'
import NewsSection from '../components/NewsSection.jsx'
import Research from './Research.jsx'
import PieChartExpenses from '../components/dashboard/PieChartExpenses.jsx'
import '@mantine/charts/styles.css';
import Deposits from '../components/dashboard/Deposits.jsx'
import RecentExpenses from '../components/dashboard/RecentExpenses.jsx'
const DashboardAdmin = () => {

  const { expenses, incomes, mortgages, filteredArticles } = useLoaderData()

  return (
    <Flex direction="column" gap={24}>
      <NewsSection articles={filteredArticles}/>
      <Flex direction={{ base: "column-reverse", xs: "row" }} justify="space-around" align={ "flex-start" } w="100%">
        <PieChartExpenses expenses={expenses}/>
        <Deposits incomes={incomes} expenses={expenses}/>
      </Flex>
      <RecentExpenses expenses={expenses}/>
    </Flex>
  )
}

export const dashboardLoader = async () => {
  try {
    let response = await axiosDB("/expenses")
    const { expenses } = response.data
    response = await axiosDB("/incomes")
    const { incomes } = response.data
    response = await axiosDB("/mortgages")
    const { mortgages } = response.data
    response = await axiosDB("/news")
    const { filteredArticles } = response.data
    return { expenses, incomes, mortgages, filteredArticles }
  } catch (error) {
    throw new Error(error)
  }
}

export default DashboardAdmin