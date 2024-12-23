import { axiosDB } from '../../utilities/axios.js'
import { Box } from '@mantine/core'
import { useLoaderData } from 'react-router-dom'
import NewsSection from '../../components/NewsSection.jsx'
import Research from '../../components/Research.jsx'
import PieChartExpenses from '../../components/dashboard/PieChartExpenses.jsx'
import '@mantine/charts/styles.css';
import Deposits from '../../components/dashboard/Deposits.jsx'
import RecentExpenses from '../../components/dashboard/RecentExpenses.jsx'
const DashboardAdmin = () => {

  const { expenses, incomes, mortgages, filteredArticles } = useLoaderData()

  return (
    <Box>
      <NewsSection articles={filteredArticles}/>

      <Research />
      <PieChartExpenses expenses={expenses}/>
      <Deposits incomes={incomes} expenses={expenses}/>
      <RecentExpenses expenses={expenses}/>

    </Box>
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