
import Fmr from '../components/dashboard/research/Fmr.jsx'
import { convertToUSD } from '../utilities/financeCalculations.js'
import Listings from '../components/dashboard/research/Listings.jsx'
import { Box, Container, Paper, Tabs } from '@mantine/core'
import { useState } from 'react'


const Research = () => {
  const [activeTab, setActiveTab] = useState("1");

  return (
    <Box>
      <Paper shadow="xl" p={24}>
        <Tabs value={activeTab} onChange={setActiveTab}>

          <Tabs.List aria-label="research tabs" justify="center">
            <Tabs.Tab value="1">MLS Search</Tabs.Tab>
            <Tabs.Tab value="2">Fair Market Rents</Tabs.Tab>
          </Tabs.List>


          <Tabs.Panel value="1"  sx={{ p: 0 }}>
            <Listings />
          </Tabs.Panel>

          <Tabs.Panel value="2" sx={{ p: 0 }}>
            <Fmr />
          </Tabs.Panel>

        </Tabs>
      </Paper>
    </Box>




  );
};


export default Research;