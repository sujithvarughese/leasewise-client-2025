import { axiosDB } from '../../utilities/axios.js'
import { Box, Container, Grid } from '@mantine/core'
import { useLoaderData } from 'react-router-dom'
import NewsSection from '../../components/NewsSection.jsx'
import Research from '../../components/Research.jsx'

const DashboardAdmin = () => {

  const { expenses, incomes, mortgages, filteredArticles } = useLoaderData()

  return (
    <Box>
      <NewsSection articles={filteredArticles}/>

      <Research />


      {/*<Grid item xs={12} md={8} lg={9} height={240}>
              <PieChartExpenses expenses={expenses}/>
            </Grid>

            <Grid item xs={12} md={4} lg={3}>
              <Deposits incomes={incomes} expenses={expenses}/>
            </Grid>

            <Grid item xs={12}>
              <RecentExpenses expenses={expenses}/>
            </Grid>*/}
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